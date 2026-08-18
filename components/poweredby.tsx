"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type PoweredByRivinityType = {
  className?: string;
};

/* -------------------------------------------------------------------- */
/*  Original illustrations — all hand-built for Rivinity, no borrowed    */
/*  artwork or icon paths. Motion is scoped locally via styled-jsx so    */
/*  this file works as a drop-in without touching the Tailwind config.   */
/* -------------------------------------------------------------------- */

const AgentIllustration = () => (
  <div className="relative w-full max-w-[240px] h-[190px] flex flex-col items-center justify-center gap-5">
    <span className="orbit-ring absolute top-1 w-36 h-36 rounded-full border-2 border-dashed border-[#FF7A1A]/45" />
    <div className="relative flex items-center gap-1.5 rounded-full bg-white/95 border border-black/10 shadow-sm px-3.5 py-2">
      <span className="text-[11px] font-medium tracking-tight text-[#191818]">
        Build me a waitlist page
        <span className="inline-block w-[3px] h-3.5 bg-current ml-1 align-middle animate-pulse" />
      </span>
    </div>
    <div className="relative flex items-center gap-2">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
        style={{ background: "linear-gradient(135deg,#FF7A1A,#FF3C00)" }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M8 2v12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="h-9 rounded-full bg-[#141414] text-white flex items-center px-3.5 text-[10.5px] font-medium tracking-tight">
        Ship it
      </div>
    </div>
  </div>
);

const INFRA_ROWS = ["Auth", "Database", "Hosting", "Monitor"];

const InfraIllustration = () => (
  <div className="relative w-full max-w-[220px] h-[190px] flex items-center justify-center">
    <div className="relative flex flex-col gap-2.5 w-full">
      <span className="flow-line absolute left-[18px] top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-[#FF7A1A] via-[#F5A9D0] to-[#BFA7F8] opacity-40" />
      <span className="flow-dot absolute left-[14px] w-2.5 h-2.5 rounded-full shadow-md" style={{ background: "linear-gradient(135deg,#FF7A1A,#BFA7F8)" }} />
      {INFRA_ROWS.map((row) => (
        <div key={row} className="relative pl-10 pr-3 h-9 rounded-xl bg-white/90 border border-black/10 shadow-sm flex items-center">
          <span className="w-2 h-2 rounded-full bg-[#FF7A1A]/70 absolute left-[13px]" />
          <span className="text-[11px] font-medium tracking-tight text-[#191818]">{row}</span>
        </div>
      ))}
    </div>
  </div>
);

const ORBIT_ICONS = [
  { angle: 0, color: "#FF7A1A", d: "M3 8h10M8 3v10" },
  { angle: 120, color: "#F5A9D0", d: "M4 4l8 8M12 4l-8 8" },
  { angle: 240, color: "#BFA7F8", d: "M8 3l1.7 3.5L13 8l-3.3 1.5L8 13l-1.7-3.5L3 8l3.3-1.5L8 3z" },
];

const IntegrationsIllustration = () => (
  <div className="relative w-full max-w-[220px] h-[190px] flex items-center justify-center">
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: "linear-gradient(135deg,#141422,#1c1c2e)" }}>
      <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 20 20)`}>
            <path d="M20 6 C 24 12, 24 18, 20 22 C 16 18, 16 12, 20 6 Z" />
          </g>
        ))}
      </svg>
    </div>
    <div className="orbit-cw absolute inset-0">
      {ORBIT_ICONS.map((icon) => (
        <div
          key={icon.angle}
          className="absolute top-1/2 left-1/2 w-9 h-9 -mt-4.5 -ml-4.5"
          style={{ transform: `rotate(${icon.angle}deg) translate(72px) rotate(-${icon.angle}deg)` }}
        >
          <div className="orbit-ccw w-9 h-9 rounded-xl bg-white shadow-md border border-black/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={icon.d} stroke={icon.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EnterpriseIllustration = () => (
  <div className="relative w-full max-w-[220px] h-[190px] flex items-center justify-center">
    <span className="absolute w-32 h-32 rounded-full blur-2xl opacity-40" style={{ background: "radial-gradient(circle,#FF7A1A,transparent 70%)" }} />
    <svg width="88" height="104" viewBox="0 0 88 104" fill="none" className="relative">
      <path
        d="M44 2 84 16v34c0 30-18 44-40 50C22 94 4 80 4 50V16L44 2Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        className="draw-in"
        d="M27 51l12 12 22-24"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

type CardData = {
  key: string;
  bgClass: string;
  textClass: string;
  label: string;
  title: React.ReactNode;
  illustration: React.ReactNode;
  description: string;
};

const CARDS: CardData[] = [
  {
    key: "agent",
    bgClass: "bg-white",
    textClass: "text-[#191818]",
    label: "Prompt-native building",
    title: <>Describe it.<br />Ship it.</>,
    illustration: <AgentIllustration />,
    description: "Tell Rivinity what you want and it writes, tests, and deploys production-ready code — then keeps iterating alongside you.",
  },
  {
    key: "infra",
    bgClass: "bg-[#F3EDE3]",
    textClass: "text-[#191818]",
    label: "Managed infrastructure",
    title: "Scale without touching config.",
    illustration: <InfraIllustration />,
    description: "Auth, database, hosting, and monitoring come wired in from the first prompt — nothing to provision, nothing to babysit.",
  },
  {
    key: "integrations",
    bgClass: "bg-[#FBEAF0]",
    textClass: "text-[#191818]",
    label: "Connected by default",
    title: "Plug into what you already use.",
    illustration: <IntegrationsIllustration />,
    description: "Wire up models, payments, and workspace tools in minutes — Rivinity keeps every integration in sync across studios.",
  },
  {
    key: "enterprise",
    bgClass: "bg-[#141414]",
    textClass: "text-white",
    label: "Enterprise-grade trust",
    title: "Secure by default, audited by design.",
    illustration: <EnterpriseIllustration />,
    description: "SSO/SAML, SOC 2 controls, and workspace-level permissions keep every studio safe as your team grows.",
  },
];

function Card({ card, index }: { card: CardData; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl ${card.bgClass} ${card.textClass} overflow-hidden flex flex-col items-start justify-between p-6 gap-5 shadow-sm`}
    >
      <div className="flex flex-col items-start gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-60">
          {card.label}
        </span>
        <h3 className="text-2xl lg:text-[27px] font-semibold tracking-tight leading-[1.15]">
          {card.title}
        </h3>
      </div>
      <div className="w-full flex items-center justify-center py-2">{card.illustration}</div>
      <p className="text-[13.5px] leading-relaxed opacity-70">{card.description}</p>
    </motion.article>
  );
}

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const total = CARDS.length;
  const goTo = (index: number) => setActive((index + total) % total);

  return (
    <div className="lg:hidden flex flex-col gap-3">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${active * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          {CARDS.map((card, i) => (
            <div key={card.key} className="w-full shrink-0 px-1">
              <Card card={card} index={i} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {CARDS.map((card, i) => (
            <button
              key={card.key}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-5 bg-[#141414]" : "w-2 bg-[#141414]/25"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="w-10 h-10 rounded-xl bg-[#F3EDE3] flex items-center justify-center hover:bg-[#ece3d5] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.47 11.47a.75.75 0 0 0 0 1.06l7 7a.75.75 0 1 0 1.06-1.06l-5.72-5.72H19a.75.75 0 0 0 0-1.5H6.81l5.72-5.72a.75.75 0 0 0-1.06-1.06l-7 7Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="w-10 h-10 rounded-xl bg-[#F3EDE3] flex items-center justify-center hover:bg-[#ece3d5] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H5a.75.75 0 0 1 0-1.5h12.19l-5.72-5.72a.75.75 0 0 1 1.06-1.06l7 7Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const PoweredByRivinity: NextPage<PoweredByRivinityType> = ({ className = "" }) => {
  return (
    <section className={`relative w-full flex flex-col items-center px-6 md:px-12 lg:px-16 font-[Inter] ${className}`}>
      <div className="w-full max-w-345 mx-auto flex flex-col items-center pt-12 md:pt-20 lg:pt-24 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 max-w-2xl"
        >
          {/* <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50">
            The engine underneath
          </span> */}
          <h2 className="text-[28px] md:text-[38px] lg:text-[46px] font-semibold tracking-tight leading-[1.1]">
            Everything Rivinity runs on.
          </h2>
        </motion.div>

        <div className="hidden lg:grid w-full grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <Card key={card.key} card={card} index={i} />
          ))}
        </div>

        <div className="w-full">
          <MobileCarousel />
        </div>
      </div>

      <style jsx>{`
        .orbit-ring {
          animation: spin-slow 16s linear infinite;
        }
        .orbit-cw {
          animation: spin-cw 14s linear infinite;
        }
        .orbit-ccw {
          animation: spin-ccw 14s linear infinite;
        }
        .flow-dot {
          animation: flow-down 3.2s ease-in-out infinite;
        }
        .draw-in {
          stroke-dasharray: 46;
          stroke-dashoffset: 46;
          animation: dash 2.4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes flow-down {
          0% { top: 4px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: calc(100% - 14px); opacity: 0; }
        }
        @keyframes dash {
          0% { stroke-dashoffset: 46; }
          40% { stroke-dashoffset: 0; }
          75% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -46; }
        }
      `}</style>
    </section>
  );
};

export default PoweredByRivinity;