import { useLayoutEffect, useRef, useState } from "react";
import ScrollReveal from "../components/ui/ScrollReveal";
import { MessageSquare, Wand2, GraduationCap, Bot, Sparkles, CheckCircle2 } from "lucide-react";

const leftPartners  = [
  { name: "AI Chat",     icon: MessageSquare },
  { name: "RivinityLM",  icon: GraduationCap },
];
const rightPartners = [
  { name: "App Builder", icon: Wand2 },
  { name: "Agents",      icon: Bot   },
];

const features = [
  {
    icon: Sparkles,
    title: "Unified workspace",
    body: "Every studio shares the same canvas, memory, and history — nothing to stitch together.",
    preview: (
      <div className="rounded-xl border border-glass glass-strong p-3 shadow-float">
        <div className="text-[10px] font-semibold text-foreground/60 mb-2">Active canvas</div>
        <div className="flex items-baseline gap-1.5">
          <div className="text-[26px] font-semibold tracking-tight gradient-accent-text">12</div>
          <div className="text-[10px] text-foreground/55">studios</div>
        </div>
        <div className="text-[9.5px] text-foreground/50 mt-1">one connected surface</div>
      </div>
    ),
  },
  {
    icon: CheckCircle2,
    title: "Persistent memory",
    body: "Context, files, and decisions carry from chat to agent to app — no restarts, no re-uploads.",
    preview: (
      <div className="rounded-xl border border-glass glass-strong p-3 shadow-float">
        <div className="text-[10px] font-semibold text-foreground/60 mb-2">Memory graph</div>
        <div className="space-y-1.5">
          {["Research", "Threads", "Assets"].map((k, i) => (
            <div key={k} className="flex items-center gap-2">
              <div className="text-[9.5px] w-14 text-foreground/60">{k}</div>
              <div className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${[82, 64, 48][i]}%`,
                    background: "linear-gradient(90deg,#FD881F,#F5A9D0,#BFA7F8)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Bot,
    title: "Autonomous workflows",
    body: "Route prompts, tools, and models automatically — Rivinity picks the right path per turn.",
    preview: (
      <div className="rounded-xl border border-glass glass-strong p-3 shadow-float">
        <div className="text-[10px] font-semibold text-foreground/60 mb-2">Router uptime</div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { v: "8",  l: "Models" },
            { v: "15", l: "Tools"  },
            { v: "23", l: "Agents" },
            { v: "12", l: "Flows"  },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-[15px] font-semibold tracking-tight">{s.v}</div>
              <div className="text-[8.5px] text-foreground/55">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

type TrunkGeometry = {
  width: number;
  height: number;
  top: number;
  pillX: number;
  cardXs: number[];
};

/**
 * WhyRivinity — ecosystem map matching the reference screenshot:
 * dark central pill with the Rivinity mark, orthogonal connectors branching
 * to two side pills on each edge, and a vertical trunk that fans into three
 * feature cards beneath.
 *
 * The trunk connector below the pill is measured from real DOM positions
 * (pill center + each card's center) rather than hardcoded viewBox
 * fractions, so the lines always land exactly on each card regardless of
 * gap width, padding, or screen size.
 */
const WhyRivinity = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [trunk, setTrunk] = useState<TrunkGeometry | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const mapEl = mapRef.current;
      const pillEl = pillRef.current;
      if (!mapEl || !pillEl) return;

      const mapRect = mapEl.getBoundingClientRect();
      const pillRect = pillEl.getBoundingClientRect();

      const cards = cardRefs.current
        .map((el) => (el ? el.getBoundingClientRect() : null))
        .filter((r): r is DOMRect => r !== null);

      if (cards.length === 0) return;

      const cardXs = cards.map((r) => r.left + r.width / 2 - mapRect.left);
      const cardTop = Math.min(...cards.map((r) => r.top)) - mapRect.top;
      const pillBottom = pillRect.bottom - mapRect.top;

      setTrunk({
        width: mapRect.width,
        height: Math.max(cardTop - pillBottom, 1),
        top: pillBottom,
        pillX: pillRect.left + pillRect.width / 2 - mapRect.left,
        cardXs,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 200); // catch late-settling fonts/layout
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="why"
      data-testid="why-rivinity"
      className="mx-auto max-w-6xl px-5 lg:px-8 pt-16 pb-24"
    >
      <ScrollReveal className="max-w-4xl mx-auto text-center mb-14">
        <div className="text-[34px] lg:text-[52px] font-semibold tracking-tight leading-[1.15]">
          One canvas connects every studio you already love.
        </div>
        <div className="mt-9 text-[15px] text-foreground/65 leading-relaxed max-w-3xl mx-auto">
          Integrate with the AI surfaces you use every day — Rivinity handles the intelligence
          behind the scenes.
        </div>
      </ScrollReveal>

      {/* Ecosystem map — center pill, side pills, orthogonal connectors,
          then a vertical trunk fanning into the three feature cards. */}
      <div ref={mapRef} className="relative mx-auto w-full max-w-[960px]" data-testid="ecosystem-map">
        {/* --- Pills row with side connectors overlay --- */}
        <div className="relative">
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient id="rvLineH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#FD881F" stopOpacity="0.55" />
                <stop offset="50%"  stopColor="#F5A9D0" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#BFA7F8" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="rvPulse" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#FD881F" />
                <stop offset="55%"  stopColor="#F5A9D0" />
                <stop offset="100%" stopColor="#BFA7F8" />
              </linearGradient>
            </defs>
            {(() => {
              const paths = [
                { id: "l-top", d: "M 427 100 L 305 100 Q 290 100 290 85 L 290 75 Q 290 60 275 60 L 158 60" },
                { id: "l-bot", d: "M 427 100 L 305 100 Q 290 100 290 115 L 290 125 Q 290 140 275 140 L 158 140" },
                { id: "r-top", d: "M 573 100 L 695 100 Q 710 100 710 85 L 710 75 Q 710 60 725 60 L 842 60" },
                { id: "r-bot", d: "M 573 100 L 695 100 Q 710 100 710 115 L 710 125 Q 710 140 725 140 L 842 140" },
              ];
              return (
                <>
                  {paths.map((p) => (
                    <path key={p.id} d={p.d} fill="none" stroke="url(#rvLineH)" strokeWidth="1.25" />
                  ))}
                  {paths.map((p, i) => (
                    <g key={`pulse-${p.id}`}>
                      <circle r="3.2" fill="url(#rvPulse)" opacity="0.95">
                        <animateMotion dur="3.6s" begin={`-${(i * 0.85) % 3.6}s`} repeatCount="indefinite" path={p.d} />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="3.6s" begin={`-${(i * 0.85) % 3.6}s`} repeatCount="indefinite" />
                      </circle>
                      <circle r="6.5" fill="url(#rvPulse)" opacity="0.35">
                        <animateMotion dur="3.6s" begin={`-${(i * 0.85) % 3.6}s`} repeatCount="indefinite" path={p.d} />
                        <animate attributeName="opacity" values="0;0.35;0.35;0" keyTimes="0;0.12;0.88;1" dur="3.6s" begin={`-${(i * 0.85) % 3.6}s`} repeatCount="indefinite" />
                      </circle>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>

          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6 min-h-50">
            {/* Left pills */}
            <div className="flex flex-col gap-8 items-start pl-2">
              {leftPartners.map(({ name, icon: Icon }) => (
                <div key={name} className="glass-strong border border-glass rounded-2xl shadow-float px-4 h-12 flex items-center gap-2.5 min-w-36">
                  <Icon className="w-4 h-4 text-foreground/75" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-medium tracking-tight">{name}</span>
                </div>
              ))}
            </div>

            {/* Center dark pill with Rivinity mark */}
            <div className="flex items-center justify-center" data-testid="rivinity-center-pill">
              <div
                ref={pillRef}
                className="relative rounded-full pl-4 pr-5 h-14 flex items-center gap-2.5 shadow-float border border-white/10"
                style={{ background: "linear-gradient(135deg,#141422 0%,#1c1c2e 55%,#0f0f1a 100%)" }}
              >
                <span
                  aria-hidden
                  className="absolute -inset-4 rounded-full -z-10 opacity-70 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 50%, rgba(253,136,31,0.35), rgba(245,169,208,0.25) 55%, rgba(191,167,248,0.18) 80%, transparent 100%)",
                  }}
                />
                <svg
                  viewBox="0 0 40 40"
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  aria-hidden
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 45} 20 20)`}>
                      <path d="M20 6 C 24 12, 24 18, 20 22 C 16 18, 16 12, 20 6 Z" />
                    </g>
                  ))}
                  <path d="M20 14 l4 3 -1.5 5 h-5 L16 17 z" />
                </svg>
                <span className="text-white font-semibold tracking-tight text-[16px]">Rivinity</span>
              </div>
            </div>

            {/* Right pills */}
            <div className="flex flex-col gap-8 items-end pr-2">
              {rightPartners.map(({ name, icon: Icon }) => (
                <div key={name} className="glass-strong border border-glass rounded-2xl shadow-float px-4 h-12 flex items-center gap-2.5 min-w-36">
                  <Icon className="w-4 h-4 text-foreground/75" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-medium tracking-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Trunk spacer: reserves the vertical gap the overlay draws into --- */}
        <div className="relative h-10" aria-hidden />

        {/* --- Measured trunk overlay: drawn only once real card/pill
            positions are known, so it always lands exactly on target. --- */}
        {trunk && (
          <svg
            aria-hidden
            className="absolute left-0 pointer-events-none hidden md:block"
            style={{ top: trunk.top, width: trunk.width, height: trunk.height }}
            viewBox={`0 0 ${trunk.width} ${trunk.height}`}
          >
            {(() => {
              const busY = trunk.height * 0.55;
              const bend = 14;
              const trunkPaths = trunk.cardXs.map((cx, i) => {
                if (Math.abs(cx - trunk.pillX) < 1) {
                  return { id: `trunk-${i}`, d: `M ${trunk.pillX} 0 L ${cx} ${trunk.height}` };
                }
                const dir = cx > trunk.pillX ? 1 : -1;
                return {
                  id: `trunk-${i}`,
                  d: `M ${trunk.pillX} 0
                      L ${trunk.pillX} ${busY - bend}
                      Q ${trunk.pillX} ${busY} ${trunk.pillX + dir * bend} ${busY}
                      L ${cx - dir * bend} ${busY}
                      Q ${cx} ${busY} ${cx} ${busY + bend}
                      L ${cx} ${trunk.height}`,
                };
              });
              return (
                <>
                  {trunkPaths.map((p) => (
                    <path key={p.id} d={p.d} fill="none" stroke="url(#rvLineH)" strokeWidth="1.25" />
                  ))}
                  {trunkPaths.map((p, i) => (
                    <g key={`pulse-${p.id}`}>
                      <circle r="3.2" fill="url(#rvPulse)" opacity="0.95">
                        <animateMotion dur="3.6s" begin={`-${(i * 0.9) % 3.6}s`} repeatCount="indefinite" path={p.d} />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="3.6s" begin={`-${(i * 0.9) % 3.6}s`} repeatCount="indefinite" />
                      </circle>
                      <circle r="6.5" fill="url(#rvPulse)" opacity="0.35">
                        <animateMotion dur="3.6s" begin={`-${(i * 0.9) % 3.6}s`} repeatCount="indefinite" path={p.d} />
                        <animate attributeName="opacity" values="0;0.35;0.35;0" keyTimes="0;0.12;0.88;1" dur="3.6s" begin={`-${(i * 0.9) % 3.6}s`} repeatCount="indefinite" />
                      </circle>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        )}

        {/* Feature cards row */}
        <div data-reveal-group className="relative grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="glass border border-glass rounded-2xl shadow-float p-5 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <f.icon className="w-4 h-4 text-foreground/75" strokeWidth={1.75} />
                <h3 className="text-[14.5px] font-semibold tracking-tight">{f.title}</h3>
              </div>
              <p className="text-[12.5px] text-foreground/60 leading-relaxed">{f.body}</p>
              <div className="mt-4">{f.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRivinity;