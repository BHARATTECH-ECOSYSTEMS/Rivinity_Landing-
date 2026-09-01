"use client";

import React, { useEffect, useRef, useState } from "react";
import { GlassAssistant, type AssistantState } from "./GlassAssistant";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUp,
  Bot,
  Code2,
  FileText,
  Globe,
  Image as ImageIcon,
  Mic,
  Music,
  Search,
  Sparkles,
  Video,
  Workflow,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Product routing                                                     */
/* ------------------------------------------------------------------ */

type ProductId =
  | "website"
  | "agent"
  | "chat"
  | "video"
  | "image"
  | "audio"
  | "research"
  | "workflow"
  | "code"
  | "document"
  | "lm";

type Product = {
  id: ProductId;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string; // hex used for glow tint
  reply: string;
};

const PRODUCTS: Product[] = [
  { id: "website", label: "Website Builder", icon: Globe, accent: "#7CC1E4", reply: "Spinning up a fresh site canvas." },
  { id: "agent", label: "Agent Studio", icon: Bot, accent: "#B48BFF", reply: "Designing your autonomous agent." },
  { id: "chat", label: "AI Chat", icon: Sparkles, accent: "#FFB199", reply: "Opening a new intelligent conversation." },
  { id: "video", label: "Prompt to Video", icon: Video, accent: "#FF8A5C", reply: "Great choice. Let's create your video." },
  { id: "image", label: "Image Studio", icon: ImageIcon, accent: "#F7A8C8", reply: "Warming up the image canvas." },
  { id: "audio", label: "Audio Lab", icon: Music, accent: "#7FE7C4", reply: "Tuning voices and soundscapes." },
  { id: "research", label: "Deep Research", icon: Search, accent: "#96C6FF", reply: "Assembling a research plan." },
  { id: "workflow", label: "Workflow Automation", icon: Workflow, accent: "#FFD48A", reply: "Mapping the workflow steps." },
  { id: "code", label: "AI Coding", icon: Code2, accent: "#8FD3A6", reply: "Booting the coding copilot." },
  { id: "document", label: "Document Studio", icon: FileText, accent: "#E6C79C", reply: "Preparing your document workspace." },
  { id: "lm", label: "Rivinity LM", icon: Mic, accent: "#C9A8FF", reply: "Routing to the Rivinity language model." },
];

const ROTATING_PROMPTS = [
  "Create a landing page",
  "Generate an AI agent",
  "Build a website",
  "Create a marketing campaign",
  "Generate a video",
  "Analyze my PDF",
  "Create an HR workflow",
];

const QUICK_ACTIONS: { label: string; product: ProductId }[] = [
  { label: "Generate image", product: "image" },
  { label: "Make a video", product: "video" },
  { label: "Build a website", product: "website" },
  { label: "Draft a plan", product: "workflow" },
  { label: "Analyze a PDF", product: "document" },
  { label: "Write code", product: "code" },
];

function routePrompt(text: string): ProductId {
  const t = text.toLowerCase();
  if (/video|reel|clip|film/.test(t)) return "video";
  if (/image|photo|logo|poster|illustration/.test(t)) return "image";
  if (/website|landing|site|page/.test(t)) return "website";
  if (/agent|assistant|bot/.test(t)) return "agent";
  if (/audio|voice|music|podcast|song/.test(t)) return "audio";
  if (/research|analy[sz]e|study|report/.test(t)) return "research";
  if (/workflow|automation|hr|process/.test(t)) return "workflow";
  if (/code|api|function|script/.test(t)) return "code";
  if (/pdf|document|contract|doc/.test(t)) return "document";
  if (/model|llm|lm|reason/.test(t)) return "lm";
  return "chat";
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const [state, setState] = useState<AssistantState>("idle");
  const [active, setActive] = useState<ProductId | null>(null);
  const [reply, setReply] = useState<string>("");
  const [input, setInput] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const reduce = useReducedMotion();

  // Rotating placeholder prompts
  useEffect(() => {
    if (input) return;
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % ROTATING_PROMPTS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [input]);

  function submit(text: string) {
    if (!text.trim()) return;
    const productId = routePrompt(text);
    setState("listening");
    setActive(productId);
    setReply("");
    window.setTimeout(() => setState("thinking"), 550);
    window.setTimeout(() => {
      setState("speaking");
      const p = PRODUCTS.find((x) => x.id === productId)!;
      setReply(p.reply);
    }, 1600);
    window.setTimeout(() => setState("idle"), 5200);
  }

  const activeProduct = active ? PRODUCTS.find((p) => p.id === active) ?? null : null;

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-28">
      <HeroAmbient />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mt-6 mx-auto max-w-4xl text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.035em] font-semibold text-ink">
            One intelligence.
            <br />
            Every surface you work in.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mt-5 mx-auto max-w-xl text-[15px] md:text-[16px] text-ink-muted leading-relaxed">
            Rivinity routes every request chat, code, video, research, workflows through a single, living intelligence that understands your work.
          </p>
        </motion.div>

        {/* Living assistant */}
        <div className="relative mt-2 md:mt-5 flex flex-col items-center">
          <LivingAssistant
            state={state}
            accent={activeProduct?.accent}
            reduce={!!reduce}
            petals={[
              { label: "Website Builder", onSelect: () => submit("Website Builder") },
              { label: "Agent Studio", onSelect: () => submit("Agent Studio") },
              { label: "Image Studio", onSelect: () => submit("Image Studio") },
              { label: "Prompt to Video", onSelect: () => submit("Prompt to Video") },
              { label: "Deep Research", onSelect: () => submit("Deep Research") },
              { label: "AI Coding", onSelect: () => submit("AI Coding") },
            ]}
          />

          {/* Reply bubble */}
          <div className="h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {state === "speaking" && reply && (
                <motion.div
                  key={reply}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="px-4 h-9 inline-flex items-center rounded-full bg-white/80 backdrop-blur border border-black/[0.06] text-[13px] text-ink shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)]"
                >
                  {reply}
                </motion.div>
              )}
              {state === "thinking" && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[12.5px] text-ink-muted inline-flex items-center gap-2"
                >
                  <span className="inline-flex gap-1">
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </span>
                  Routing to {activeProduct?.label ?? "the right product"}…
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <Composer
            input={input}
            setInput={setInput}
            onSubmit={submit}
            placeholder={ROTATING_PROMPTS[placeholderIdx]}
          />

          {/* Product chips — floating glass capsules */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {PRODUCTS.map((p) => {
              const isActive = active === p.id;
              const dimmed = active !== null && !isActive;
              const Icon = p.icon;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => submit(p.label)}
                  whileHover={{ y: -2, rotate: -0.3 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: dimmed ? 0.4 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[12px] text-ink transition-colors cursor-pointer"
                  style={{
                    background: isActive
                      ? `linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.7))`
                      : "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(24px) saturate(160%)",
                    WebkitBackdropFilter: "blur(24px) saturate(160%)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    boxShadow: isActive
                      ? `0 10px 28px -12px ${p.accent}80, 0 0 0 1px ${p.accent}55, inset 0 1px 0 rgba(255,255,255,0.9)`
                      : "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -18px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <Icon
                    className="h-3.5 w-3.5 transition-transform group-hover:scale-110"
                    strokeWidth={1.75}
                  />
                  {p.label}
                </motion.button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {QUICK_ACTIONS.map((q) => (
              <button
                key={q.label}
                onClick={() => submit(q.label)}
                className="h-8.5 px-3.5 sm:px-4 rounded-full text-[13px] text-[#6B7280] font-normal hover:text-[#18181B] hover:bg-[#EBECEF] active:scale-[0.97] transition-all duration-200 cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient background — pure white with soft warm/cool glows           */
/* ------------------------------------------------------------------ */

function HeroAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-x-[-20%] top-[4%] h-[820px]"
        style={{
          background: `
            radial-gradient(42% 55% at 22% 48%, rgba(255,147,57,0.06) 0%, rgba(255,190,140,0.03) 46%, transparent 78%),
            radial-gradient(44% 55% at 78% 48%, rgba(96,150,230,0.055) 0%, rgba(165,208,255,0.028) 46%, transparent 78%)
          `,
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Living Assistant — uses the actual Rivinity SVG mark               */
/* ------------------------------------------------------------------ */

function LivingAssistant({
  state,
  accent,
  reduce,
  petals,
}: {
  state: AssistantState;
  accent?: string;
  reduce: boolean;
  petals?: { label: string; onSelect?: () => void }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: morphProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const morphScale = useTransform(morphProgress, [0, 0.6, 1], [1, 0.82, 0.55]);
  const morphOpacity = useTransform(morphProgress, [0, 0.55, 0.9], [1, 0.55, 0]);
  const morphBlur = useTransform(morphProgress, [0, 0.6, 1], ["blur(0px)", "blur(2px)", "blur(6px)"]);
  const layersProgress = useTransform(morphProgress, [0.35, 0.95], [0, 1]);
  const layersOpacity = useTransform(morphProgress, [0.35, 0.7, 1], [0, 0.7, 1]);
  const layersScaleX = useTransform(layersProgress, [0, 1], [0.35, 1]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 42, damping: 22, mass: 0.8 });
  const ty = useSpring(my, { stiffness: 42, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      mx.set(dx * 10);
      my.set(dy * 8);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const tint = accent ?? "#ff8b28";

  return (
    <div
      ref={containerRef}
      className="relative h-[405px] w-[405px] md:h-[486px] md:w-[486px] grid place-items-center"
    >
      {/* Outer Hero bloom — smooth accent aurora */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full -z-10 pointer-events-none"
        initial={{ opacity: 0.55 }}
        animate={{
          opacity: state === "idle" ? 0.55 : 0.68,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          background: `
            radial-gradient(60% 60% at 30% 35%, ${tint}99, transparent 68%),
            radial-gradient(55% 55% at 72% 40%, #96C6FF77, transparent 70%),
            radial-gradient(55% 55% at 50% 78%, #F7A8C866, transparent 72%),
            radial-gradient(48% 48% at 20% 78%, #B48BFF66, transparent 74%)
          `,
          filter: "blur(60px)",
        }}
      />

      {/* The premium glass-based intelligent assistant */}
      <motion.div style={{ x: tx, y: ty, scale: morphScale, opacity: morphOpacity, filter: morphBlur }} className="relative">
        <div className="block sm:hidden">
          <GlassAssistant state={state} accent={tint} size={269} reduce={reduce} petals={petals} />
        </div>
        <div className="hidden sm:block lg:hidden">
          <GlassAssistant state={state} accent={tint} size={329} reduce={reduce} petals={petals} />
        </div>
        <div className="hidden lg:block">
          <GlassAssistant state={state} accent={tint} size={434} reduce={reduce} petals={petals} />
        </div>
      </motion.div>

      {/* Scroll-morph layered architecture */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center"
        style={{ opacity: layersOpacity }}
      >
        <div className="flex w-[78%] max-w-[440px] flex-col gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <LayerBar
              key={i}
              i={i}
              layersProgress={layersProgress}
              layersScaleX={layersScaleX}
              tint={tint}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function LayerBar({
  i,
  layersProgress,
  layersScaleX,
  tint,
}: {
  i: number;
  layersProgress: MotionValue<number>;
  layersScaleX: MotionValue<number>;
  tint: string;
}) {
  const y = useTransform(layersProgress, [0, 1], [(2 - i) * 24, 0]);
  return (
    <motion.div
      className="h-8 md:h-10 rounded-xl glass-card border border-white/60"
      style={{
        scaleX: layersScaleX,
        y,
        background: `linear-gradient(90deg, ${tint}22, #96C6FF22, #B48BFF22)`,
        boxShadow: "0 8px 24px -12px rgba(15,23,42,0.18)",
      }}
    />
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-ink/60"
      animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Composer                                                            */
/* ------------------------------------------------------------------ */

function Composer({
  input,
  setInput,
  onSubmit,
  placeholder,
}: {
  input: string;
  setInput: (v: string) => void;
  onSubmit: (text: string) => void;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
        setInput("");
      }}
      className="relative mt-4 w-full max-w-2xl"
    >
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 30px 80px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,139,40,0.35), inset 0 1px 0 rgba(255,255,255,0.95)"
            : "0 30px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.9)",
          background: focused ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.65)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative rounded-full p-1.5 pl-5 flex items-center gap-2"
        style={{ backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)" }}
      >
        <div className="relative flex-1 h-11 flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full h-11 bg-transparent outline-none border-0 text-[14px] text-ink placeholder:text-transparent"
            aria-label="Ask Rivinity"
          />
          {!input && (
            <div className="pointer-events-none absolute inset-0 flex items-center text-[14px] text-ink-muted">
              <span className="mr-1.5">What would you like to build today?</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={placeholder}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: focused ? 0.35 : 0.75, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="text-ink/60"
                >
                  {placeholder}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="h-10 w-10 rounded-full bg-ink text-white grid place-items-center transition shadow-[0_10px_24px_-8px_rgba(15,23,42,0.45)] cursor-pointer"
          aria-label="Send"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2} />
        </motion.button>
      </motion.div>
    </form>
  );
}

export default Hero;