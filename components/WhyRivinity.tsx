"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Bot,
  MessageSquare,
  GraduationCap,
  Wand2,
  MonitorCloud,
  Database,
  Workflow,
} from "lucide-react";
import Image from "next/image";

/* ============================================================
   TYPES & DATA DEFINITIONS
============================================================ */

const leftPartners = [
  { name: "AI Chat", icon: MessageSquare },
  { name: "RivinityLM", icon: GraduationCap },
];

const rightPartners = [
  { name: "App Builder", icon: Wand2 },
  { name: "Agents", icon: Bot },
];

const features = [
  {
    icon: MonitorCloud,
    title: "Unified Workspace",
    body: "Every studio shares the same canvas, memory, and history — nothing to stitch together manually.",
    badge: "Canvas V2",
    preview: (
      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 shadow-xs transition-all group-hover:border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Active Canvas
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F97316]/10 px-2 py-0.5 text-[9px] font-semibold text-[#F97316]">
            <span className="h-1 w-1 rounded-full bg-[#F97316] animate-pulse" />
            Live Sync
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">12</span>
          <span className="text-xs font-medium text-gray-500">studios connected</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-1 font-mono">one unified surface</div>
      </div>
    ),
  },
  {
    icon: Database,
    title: "Persistent Memory",
    body: "Context, files, and decisions carry from chat to agent to app — no restarts, no re-uploads.",
    badge: "ZERO LOSS",
    preview: (
      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 shadow-xs transition-all group-hover:border-gray-300">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
          Memory Graph State
        </div>
        <div className="space-y-2">
          {[
            { label: "Research", pct: 88, color: "bg-[#F97316]" },
            { label: "Threads", pct: 64, color: "bg-gray-800" },
            { label: "Assets", pct: 48, color: "bg-gray-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-[#1A1A1A] w-14 truncate">
                {item.label}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-gray-500">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Workflow,
    title: "Autonomous Workflows",
    body: "Route prompts, tools, and models automatically — Rivinity picks the right path per turn.",
    badge: "Smart Route",
    preview: (
      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 shadow-xs transition-all group-hover:border-gray-300">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
          Router Execution Engine
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {[
            { v: "8", l: "Models" },
            { v: "15", l: "Tools" },
            { v: "23", l: "Agents" },
            { v: "12", l: "Flows" },
          ].map((s) => (
            <div key={s.l} className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-xs">
              <div className="text-xs font-extrabold text-[#1A1A1A]">{s.v}</div>
              <div className="text-[8px] font-semibold text-gray-500 truncate uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

type ConnectorGeometry = {
  pillBottom: { x: number; y: number };
  cardTops: { x: number; y: number }[];
};

/* ============================================================
   WHY RIVINITY COMPONENT
============================================================ */
export function WhyRivinity() {
  const mapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [connectors, setConnectors] = useState<ConnectorGeometry | null>(null);

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

      const pillBottom = {
        x: pillRect.left + pillRect.width / 2 - mapRect.left,
        y: pillRect.bottom - mapRect.top,
      };

      const cardTops = cards.map((r) => ({
        x: r.left + r.width / 2 - mapRect.left,
        y: r.top - mapRect.top,
      }));

      setConnectors({ pillBottom, cardTops });
    };

    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 200);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="why"
      data-testid="why-rivinity"
      className="section-sm py-16 md:py-24 bg-gray-50 border rounded-2xl border-gray-200 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl w-full max-w-none text-center">
            One canvas connects every studio <span className="text-[#F97316]">you love</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Integrate with the AI surfaces you use every day Rivinity handles orchestration, persistent memory, and intelligence behind the scenes.
          </p>
        </div>

        {/* Master Connected Canvas */}
        <div ref={mapRef} className="relative mx-auto w-full max-w-5xl">

          {/* Top Node Row */}
          <div className="relative z-10 hidden md:block">
            {/* Top Side Connectors SVG */}
            <svg
              aria-hidden
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
            >
              <defs>
                <linearGradient id="neutralGradH" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D1D5DB" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F97316" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#D1D5DB" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {(() => {
                /* Updated paths with extended offsets clearing the central logo */
                const paths = [
                  { id: "l-top", d: "M 475 100 L 290 100 Q 275 100 275 85 L 275 75 Q 275 60 260 60 L 110 60" },
                  { id: "l-bot", d: "M 380 100 L 290 100 Q 275 100 275 115 L 275 125 Q 275 140 260 140 L 110 140" },
                  { id: "r-top", d: "M 525 100 L 710 100 Q 725 100 725 85 L 725 75 Q 725 60 740 60 L 890 60" },
                  { id: "r-bot", d: "M 620 100 L 710 100 Q 725 100 725 115 L 725 125 Q 725 140 740 140 L 890 140" },
                ];
                return (
                  <>
                    {paths.map((p) => (
                      <path key={p.id} d={p.d} fill="none" stroke="url(#neutralGradH)" strokeWidth="1.5" />
                    ))}
                    {paths.map((p, i) => (
                      <g key={`pulse-${p.id}`}>
                        <circle r="3.5" fill="#F97316">
                          <animateMotion dur="3.2s" begin={`-${(i * 0.8) % 3.2}s`} repeatCount="indefinite" path={p.d} />
                        </circle>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>

            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6 min-h-40 z-10">
              <div className="flex flex-row md:flex-col gap-3 justify-center items-center md:items-start">
                {leftPartners.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="bg-white border border-gray-200 rounded-2xl shadow-xs ml-12 p-3 hover:border-gray-400 transition-all hover:-translate-y-0.5"
                  >
                    {/* <div className="w-8 h-8 rounded-xl bg-gray-100 text-[#1A1A1A] flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div> */}
                    <span className="text-xs font-bold text-[#1A1A1A] truncate">{name}</span>
                  </div>
                ))}
              </div>

              {/* Central Rivinity Engine Pill */}
              <div className="flex items-center justify-center my-4 md:my-0" data-testid="rivinity-center-pill">
                <div
                  ref={pillRef}
                  className="relative rounded-full px-6 py-3 flex items-center justify-center z-10"
                >
                  <span
                    aria-hidden
                    className="absolute -inset-1.5 rounded-full -z-10 opacity-50 blur-lg animate-pulse"
                    style={{
                      background: "radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 80%)",
                    }}
                  />
                  <Image
                    src="/logo.png"
                    alt="Rivinity Logo"
                    width={120}
                    height={32}
                    className="h-30 w-auto object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3 justify-center items-center md:items-end">
                {rightPartners.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="bg-white border border-gray-200 rounded-2xl shadow-xs mr-12 p-3  hover:border-gray-400 transition-all hover:-translate-y-0.5"
                  >
                    {/* <div className="w-8 h-8 rounded-xl bg-gray-100 text-[#1A1A1A] flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div> */}
                    <span className="text-xs font-bold text-[#1A1A1A] truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block h-16 md:h-24" />

          {/* Bottom SVG Overlay Lines & Subtle Orange Traveling Pulse Dots */}
          {connectors && (
            <svg
              aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
            >
              {(() => {
                const { pillBottom, cardTops } = connectors;
                const busY = pillBottom.y + (cardTops[0].y - pillBottom.y) * 0.5;
                const bend = 16;

                const paths = cardTops.map((ct, i) => {
                  const startY = pillBottom.y - 40; // Shift start point higher up

                  if (Math.abs(ct.x - pillBottom.x) < 30) {
                    return {
                      id: `trunk-${i}`,
                      d: `M ${pillBottom.x} ${startY} L ${ct.x} ${ct.y}`,
                    };
                  }

                  const dir = ct.x > pillBottom.x ? 1 : -1;
                  return {
                    id: `trunk-${i}`,
                    d: `M ${pillBottom.x} ${startY}
                        L ${pillBottom.x} ${busY - bend}
                        Q ${pillBottom.x} ${busY} ${pillBottom.x + dir * bend} ${busY}
                        L ${ct.x - dir * bend} ${busY}
                        Q ${ct.x} ${busY} ${ct.x} ${busY + bend}
                        L ${ct.x} ${ct.y}`,
                  };
                });

                return (
                  <>
                    <defs>
                      <linearGradient id="neutralGradV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D1D5DB" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#F97316" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#D1D5DB" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Path Lines */}
                    {paths.map((p) => (
                      <path
                        key={p.id}
                        d={p.d}
                        fill="none"
                        stroke="url(#neutralGradV)"
                        strokeWidth="1.5"
                      />
                    ))}

                    {/* Animated Traveling Orange Dots */}
                    {paths.map((p, i) => (
                      <g key={`pulse-bottom-${p.id}`}>
                        <circle r="3.5" fill="#F97316">
                          <animateMotion
                            dur="3.2s"
                            begin={`-${(i * 1.1) % 3.2}s`}
                            repeatCount="indefinite"
                            path={p.d}
                          />
                        </circle>
                        <circle r="7" fill="#F97316" opacity="0.25">
                          <animateMotion
                            dur="3.2s"
                            begin={`-${(i * 1.1) % 3.2}s`}
                            repeatCount="indefinite"
                            path={p.d}
                          />
                        </circle>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          )}

          {/* Bottom Cards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
            {features.map((f, i) => {
              const IconComp = f.icon;
              return (
                <div
                  key={f.title}
                  ref={(el) => {
                    if (el) cardRefs.current[i] = el;
                  }}
                  className="group bg-white border border-gray-200 rounded-3xl p-6 shadow-xs hover:border-gray-400 transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-2xl text-black flex items-center justify-center shrink-0 bg-orange-400/50 group-hover:bg-orange-400 transition-colors">
                        <IconComp size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                      {f.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      {f.body}
                    </p>
                  </div>

                  <div>{f.preview}</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}