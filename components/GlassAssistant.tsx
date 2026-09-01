"use client";

import React, {
  Profiler,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export const PERF_IDS = {
  thinkingRings: "thinkingRings",
  listeningWaves: "listeningWaves",
  orbitParticles: "orbitParticles",
  convergingParticles: "convergingParticles",
  petalKeyframes: "petalKeyframes",
};

export const RENDER_IDS = {
  glassAssistant: "glassAssistant",
};

export const glassAssistantPerf = {
  record: (..._args: unknown[]) => {},
};

export const glassAssistantPointerPerf = {
  recordFrame: (..._args: unknown[]) => {},
  recordConvergence: (..._args: unknown[]) => {},
};

export function useTrackRender(..._args: unknown[]) {}

export const emptySim: { lowEnd: boolean | null; reduce: boolean | null } = {
  lowEnd: null,
  reduce: null,
};

export const glassAssistantSimulate = {
  subscribe: (..._args: unknown[]) => () => {},
  snapshot: () => emptySim,
};

/** Dev-only <Profiler> wrapper. Compiles down to a passthrough in production. */
function PerfLayer({ id, children }: { id: string; children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return <>{children}</>;
  return (
    <Profiler
      id={id}
      onRender={(_id, phase, actualDuration) => {
        glassAssistantPerf.record(id, actualDuration, phase);
      }}
    >
      {children}
    </Profiler>
  );
}

/** Detect low-end devices once. */
function useLowEnd() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const coarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;
    setLow(mem <= 4 || cores <= 4 || !!coarse);
  }, []);
  return low;
}

export type AssistantState = "idle" | "listening" | "thinking" | "speaking";

/**
 * GlassAssistant — a premium, glass-based intelligent assistant.
 *
 * Each of the six petals derived from the Rivinity mark is rendered as an
 * independent translucent glass layer with its own blur, refraction tint,
 * specular reflection and depth shadow.
 */
export function GlassAssistant({
  state,
  accent = "#ff8b28",
  size = 260,
  reduce: reduceProp,
  petals: petalItems,
  label = "Rivinity intelligent assistant",
}: {
  state: AssistantState;
  accent?: string;
  size?: number;
  reduce?: boolean;
  petals?: { label: string; onSelect?: () => void }[];
  label?: string;
}) {
  useTrackRender(RENDER_IDS.glassAssistant);
  const reduceMotion = useReducedMotion();

  const lowEndReal = useLowEnd();
  const sim = useSyncExternalStore(
    glassAssistantSimulate.subscribe,
    glassAssistantSimulate.snapshot,
    () => emptySim,
  );
  const reduce = sim.reduce ?? reduceProp ?? !!reduceMotion;
  const lowEnd = sim.lowEnd ?? lowEndReal;

  const containerRef = useRef<HTMLDivElement>(null);

  const pxRaw = useMotionValue(0);
  const pyRaw = useMotionValue(0);
  const px = useSpring(pxRaw, { stiffness: 50, damping: 20, mass: 0.6 });
  const py = useSpring(pyRaw, { stiffness: 50, damping: 20, mass: 0.6 });

  const flowerX = useTransform(px, (v) => v * 4.5);
  const flowerY = useTransform(py, (v) => v * 3.5);

  useEffect(() => {
    if (reduce) {
      let lastEventTime = 0;
      const MIN_SAMPLE_MS = 32;
      const onMoveReduced = (e: PointerEvent) => {
        if (e.timeStamp - lastEventTime < MIN_SAMPLE_MS) return;
        lastEventTime = e.timeStamp;
        const el = containerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
        pxRaw.set(nx);
        pyRaw.set(ny);
      };
      window.addEventListener("pointermove", onMoveReduced, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMoveReduced);
        pxRaw.set(0);
        pyRaw.set(0);
      };
    }

    let targetX = 0,
      targetY = 0;
    let prevX = 0,
      prevY = 0;
    let sampleTime = 0,
      prevSampleTime = 0;
    let hasSample = false;

    let raf = 0;
    let lastFrameTime = 0;
    const TAU = lowEnd ? 140 : 90;
    const MAX_LEAD = lowEnd ? 0 : 0.08;
    const EPS = lowEnd ? 0.002 : 0.0004;
    const MIN_SAMPLE_MS = lowEnd ? 32 : 0;
    let lastEventTime = 0;

    const DEV = process.env.NODE_ENV !== "production";
    let oldestSampleAt = 0;
    let samplesSinceFrame = 0;
    let burstStartAt = 0;
    let framesInBurst = 0;

    let throttleMsAcc = 0;
    let predictionMsAcc = 0;
    let lastSampleAt = 0;

    const pump = (now: number) => {
      raf = 0;
      const dt = lastFrameTime === 0 ? 16 : Math.min(64, now - lastFrameTime);
      lastFrameTime = now;

      if (DEV) {
        const latency = oldestSampleAt > 0 ? Math.max(0, now - oldestSampleAt) : 0;
        glassAssistantPointerPerf.recordFrame(latency, samplesSinceFrame);
        oldestSampleAt = 0;
        samplesSinceFrame = 0;
        framesInBurst += 1;
      }

      const alpha = 1 - Math.exp(-dt / TAU);

      let leadX = 0,
        leadY = 0;
      if (MAX_LEAD > 0) {
        const vdt = sampleTime - prevSampleTime;
        if (vdt > 0 && vdt < 100) {
          const vx = (targetX - prevX) / vdt;
          const vy = (targetY - prevY) / vdt;
          leadX = Math.max(-MAX_LEAD, Math.min(MAX_LEAD, vx * (dt * 0.5)));
          leadY = Math.max(-MAX_LEAD, Math.min(MAX_LEAD, vy * (dt * 0.5)));
        }
      }
      if (DEV && (leadX !== 0 || leadY !== 0)) {
        predictionMsAcc += dt;
      }

      const tx = Math.max(-1, Math.min(1, targetX + leadX));
      const ty = Math.max(-1, Math.min(1, targetY + leadY));

      const curX = pxRaw.get();
      const curY = pyRaw.get();
      const nextX = curX + (tx - curX) * alpha;
      const nextY = curY + (ty - curY) * alpha;
      pxRaw.set(nextX);
      pyRaw.set(nextY);

      if (Math.abs(tx - nextX) > EPS || Math.abs(ty - nextY) > EPS) {
        raf = requestAnimationFrame(pump);
      } else {
        lastFrameTime = 0;
        if (DEV && burstStartAt > 0) {
          const lerpTailMs = lastSampleAt > 0 ? Math.max(0, now - lastSampleAt) : 0;
          glassAssistantPointerPerf.recordConvergence(
            Math.max(0, now - burstStartAt),
            framesInBurst,
            {
              throttleMs: throttleMsAcc,
              predictionMs: predictionMsAcc,
              lerpTailMs,
            },
          );
          burstStartAt = 0;
          framesInBurst = 0;
          throttleMsAcc = 0;
          predictionMsAcc = 0;
          lastSampleAt = 0;
        }
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(pump);
    };

    const onMove = (e: PointerEvent) => {
      if (MIN_SAMPLE_MS > 0 && e.timeStamp - lastEventTime < MIN_SAMPLE_MS) {
        if (DEV) throttleMsAcc += e.timeStamp - lastEventTime;
        return;
      }
      lastEventTime = e.timeStamp;

      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));

      if (hasSample) {
        prevX = targetX;
        prevY = targetY;
        prevSampleTime = sampleTime;
      } else {
        prevX = nx;
        prevY = ny;
        prevSampleTime = e.timeStamp;
        hasSample = true;
      }
      targetX = nx;
      targetY = ny;
      sampleTime = e.timeStamp;

      if (DEV) {
        const nowPerf = performance.now();
        lastSampleAt = nowPerf;
        if (oldestSampleAt === 0) oldestSampleAt = nowPerf;
        samplesSinceFrame += 1;
        if (burstStartAt === 0) {
          burstStartAt = nowPerf;
          framesInBurst = 0;
          throttleMsAcc = 0;
          predictionMsAcc = 0;
        }
      }

      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pxRaw, pyRaw, reduce, lowEnd]);

  // Six petals, rotated around the center.
  const petals = useMemo(
    () => [0, 60, 120, 180, 240, 300].map((deg, i) => ({ deg, i })),
    [],
  );

  const separation =
    state === "listening" ? 8 : state === "thinking" ? 4 : state === "speaking" ? 5 : 0;
  const coreScale =
    state === "listening" ? 1.14 : state === "speaking" ? 1.07 : state === "thinking" ? 1.04 : 1;

  const interactive = !!petalItems && petalItems.length > 0;

  return (
    <div
      ref={containerRef}
      className="relative grid place-items-center"
      role={interactive ? "toolbar" : undefined}
      aria-label={interactive ? label : undefined}
      style={{ width: size, height: size }}
    >

      {/* Thinking rings */}
      <PerfLayer id={PERF_IDS.thinkingRings}>
        <AnimatePresence>
          {state === "thinking" && !reduce && (
            <>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  aria-hidden
                  className="absolute rounded-full pointer-events-none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: size * (0.78 + i * 0.14),
                    height: size * (0.78 + i * 0.14),
                    border: `1px solid rgba(15,23,42,0.06)`,
                    boxShadow: `inset 0 0 30px ${accent}12`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </PerfLayer>

      {/* Listening radial waves */}
      <PerfLayer id={PERF_IDS.listeningWaves}>
        <AnimatePresence>
          {state === "listening" && !reduce && (
            <motion.div
              aria-hidden
              className="absolute inset-0 grid place-items-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size * 0.45,
                    height: size * 0.45,
                    border: `1px solid ${accent}33`,
                    willChange: "transform, opacity",
                  }}
                  initial={{ scale: 1, opacity: 0.55 }}
                  animate={{ scale: 1.05 / 0.45, opacity: 0 }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </PerfLayer>

      {/* Orbiting particles */}
      {!reduce && !lowEnd && state === "thinking" && (
        <PerfLayer id={PERF_IDS.orbitParticles}>
          <OrbitParticles size={size} accent={accent} />
        </PerfLayer>
      )}

      {/* Converging particles */}
      {!reduce && !lowEnd && state === "listening" && (
        <PerfLayer id={PERF_IDS.convergingParticles}>
          <ConvergingParticles size={size} accent={accent} />
        </PerfLayer>
      )}

      {/* The glass petal cluster */}
      <PerfLayer id={PERF_IDS.petalKeyframes}>
        <motion.div
          className="relative"
          style={{
            width: size,
            height: size,
            x: flowerX,
            y: flowerY,
            willChange: reduce ? undefined : "transform",
          }}
        >
          {petals.map(({ deg, i }) => {
            const item = petalItems?.[i];
            return (
              <GlassPetal
                key={deg}
                deg={deg}
                index={i}
                size={size}
                accent={accent}
                state={state}
                separation={separation}
                reduce={reduce}
                lowEnd={lowEnd}
                interactiveLabel={item?.label}
                onSelect={item?.onSelect}
              />
            );
          })}

          {/* Intelligence Core — locked precisely in the center of the petals */}
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full pointer-events-none z-10"
            style={{
              width: size * 0.29,
              height: size * 0.29,
              marginLeft: -(size * 0.145),
              marginTop: -(size * 0.145),
              background: `
                radial-gradient(circle at 38% 34%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 34%, rgba(255,238,220,0.85) 60%, ${accent}77 92%, ${accent}33 100%)
              `,
              boxShadow: `
                0 0 0 1.5px rgba(255,255,255,0.9),
                0 8px 22px -8px rgba(15,23,42,0.24),
                0 0 18px ${accent}22,
                inset 0 1px 3px rgba(255,255,255,1),
                inset 0 -7px 14px ${accent}1c
              `,
            }}
            initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            animate={{
              scale: coreScale,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Inner gentle ambient breathing pulse */}
            <motion.div
              className="w-full h-full rounded-full relative"
              animate={
                reduce
                  ? undefined
                  : {
                      scale: [1, 1.025, 1],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Specular highlight */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "8% 40% 55% 12%",
                  background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%)",
                  filter: "blur(2px)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </PerfLayer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One glass petal                                                     */
/* ------------------------------------------------------------------ */

function GlassPetal({
  deg,
  index,
  size,
  accent,
  separation,
  reduce,
  lowEnd,
  interactiveLabel,
  onSelect,
}: {
  deg: number;
  index: number;
  size: number;
  accent: string;
  state: AssistantState;
  separation: number;
  reduce: boolean;
  lowEnd: boolean;
  interactiveLabel?: string;
  onSelect?: () => void;
}) {
  const petalW = size * 0.22;
  const petalH = size * 0.36;

  const breathDelay = (index * 0.2) % 1.2;
  const isInteractive = !!onSelect;
  const bloomDelay = reduce ? 0 : 0.15 + (index % 6) * 0.07;

  return (
    <motion.div
      className={
        "absolute left-1/2 top-1/2 rounded-[50%/62%] " +
        (isInteractive
          ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-ink"
          : "pointer-events-none")
      }
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? interactiveLabel : undefined}
      onClick={isInteractive ? onSelect : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.();
              }
            }
          : undefined
      }
      whileHover={isInteractive ? { scale: 1.05 } : undefined}
      whileTap={isInteractive ? { scale: 0.96 } : undefined}
      style={{
        width: petalW,
        height: petalH,
        marginLeft: -petalW / 2,
        marginTop: -petalH / 2,
        transformOrigin: "50% 100%",
        rotate: deg,
      }}
      initial={
        reduce
          ? { opacity: 1, translateY: -petalH / 2, scale: 1 }
          : {
              opacity: 0,
              translateY: 0,
              scale: 0.15,
            }
      }
      animate={{
        opacity: 1,
        translateY: -petalH / 2 - separation,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.6, delay: bloomDelay, ease: "easeOut" },
        translateY: { duration: 0.95, delay: bloomDelay, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.95, delay: bloomDelay, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Inner continuous breathing motion */}
      <motion.div
        className="w-full h-full relative"
        style={{ transformOrigin: "50% 100%" }}
        animate={
          reduce
            ? undefined
            : {
                translateY: [0, -2.5, 0],
                scale: [1, 1.02, 1],
                rotate: [-0.5, 0.5, -0.5],
              }
        }
        transition={{
          translateY: {
            duration: 5.2 + breathDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: breathDelay,
          },
          scale: {
            duration: 5.2 + breathDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: breathDelay,
          },
          rotate: {
            duration: 6.5 + breathDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: breathDelay * 0.5,
          },
        }}
      >
        {/* Glass body */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "50% 50% 45% 45% / 62% 62% 38% 38%",
            background: lowEnd
              ? `linear-gradient(160deg,
                  rgba(255,255,255,0.94) 0%,
                  rgba(255,255,255,0.82) 42%,
                  ${accent}30 78%,
                  ${accent}3a 100%)`
              : `linear-gradient(160deg,
                  rgba(255,255,255,0.90) 0%,
                  rgba(255,255,255,0.78) 42%,
                  ${accent}2e 78%,
                  ${accent}38 100%)`,
            backdropFilter: lowEnd ? undefined : "blur(10px) saturate(140%)",
            WebkitBackdropFilter: lowEnd ? undefined : "blur(10px) saturate(140%)",
            border: "1.5px solid rgba(255,255,255,0.95)",
            boxShadow: `
              0 10px 22px -12px rgba(15,23,42,0.22),
              0 2px 6px -2px rgba(15,23,42,0.10),
              inset 0 1px 0 rgba(255,255,255,1),
              inset 0 -6px 18px ${accent}18
            `,
          }}
        />

        {/* Specular reflection */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "6%",
            left: "16%",
            width: "42%",
            height: "34%",
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0) 72%)",
          }}
          animate={reduce || lowEnd ? undefined : { opacity: [0.55, 0.85, 0.55] }}
          transition={{
            duration: 5.5 + breathDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: breathDelay,
          }}
        />

        {/* Warm edge glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 0,
            borderRadius: "50% 50% 45% 45% / 62% 62% 38% 38%",
            boxShadow: `inset 0 0 24px ${accent}12`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Particle systems                                                    */
/* ------------------------------------------------------------------ */

function OrbitParticles({ size, accent }: { size: number; accent: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        radius: size * (0.44 + (i % 3) * 0.05),
        start: (i / 10) * 360,
        duration: 12 + (i % 4) * 3,
        s: 1.4 + (i % 3) * 0.5,
      })),
    [size],
  );
  return (
    <>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [d.start, d.start + 360] }}
          transition={{ duration: d.duration, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute rounded-full"
            style={{
              width: d.s,
              height: d.s,
              left: d.radius,
              top: -d.s / 2,
              background: "white",
              boxShadow: `0 0 6px ${accent}88, 0 0 2px rgba(255,255,255,0.9)`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

function ConvergingParticles({ size, accent }: { size: number; accent: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2 + (i % 3) * 0.2;
        const r = size * (0.45 + ((i * 13) % 7) * 0.02);
        return {
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          delay: (i * 0.09) % 1.2,
          s: 1.4 + (i % 3) * 0.5,
        };
      }),
    [size],
  );
  return (
    <>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: d.s,
            height: d.s,
            background: "white",
            boxShadow: `0 0 6px ${accent}aa`,
          }}
          initial={{ x: d.x, y: d.y, opacity: 0 }}
          animate={{
            x: [d.x, 0],
            y: [d.y, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeIn",
            delay: d.delay,
          }}
        />
      ))}
    </>
  );
}

export default GlassAssistant;
