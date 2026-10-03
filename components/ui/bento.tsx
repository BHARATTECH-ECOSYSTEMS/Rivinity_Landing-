"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* 3 Core Pillars Data Definition (Minimized, Punchy Text)             */
/* ------------------------------------------------------------------ */
interface PillarItem {
  id: string;
  title: string;
  description: string;
}

const PILLARS: PillarItem[] = [
  {
    id: "intelligent-routing",
    title: "Intelligent Routing",
    description:
      "Route every prompt to the optimal model. Cut inference costs by up to 60% with sub-50ms dynamic dispatch.",
  },
  {
    id: "persistent-memory",
    title: "Persistent Memory",
    description:
      "Shared context that persists across sessions, tools, and teams. Eliminate repetitive re-prompting.",
  },
  {
    id: "production-security",
    title: "Production Security",
    description:
      "Enterprise-grade token guardrails, automated PII redaction, and tamper-proof cryptographic audit trails.",
  },
];

/* ------------------------------------------------------------------ */
/* Image 2 Inspired Minimal Geometric Shapes                          */
/* ------------------------------------------------------------------ */

// 1. Four-Petal Rosette (Charcoal Navy #233441 & Olive Green #475029)
function RosetteShapeGraphic({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#FEFAF1] flex items-center justify-center overflow-hidden select-none">
      {/* Subtle ambient backdrop disc */}
      <div className="absolute w-44 h-44 rounded-full bg-amber-50/60 pointer-events-none" />

      <motion.div
        animate={
          isHovered
            ? { scale: 1.08, rotate: [0, 8, -4, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Left Petal (Charcoal Navy) */}
          <path
            d="M 60 12 A 48 48 0 0 0 12 60 L 32 60 Q 60 60 60 32 Z"
            fill="#233441"
          />

          {/* Top-Right Petal (Olive Green) */}
          <path
            d="M 60 12 A 48 48 0 0 1 108 60 L 88 60 Q 60 60 60 32 Z"
            fill="#475029"
          />

          {/* Bottom-Right Petal (Charcoal Navy) */}
          <path
            d="M 108 60 A 48 48 0 0 1 60 108 L 60 88 Q 60 60 88 60 Z"
            fill="#233441"
          />

          {/* Bottom-Left Petal (Olive Green) */}
          <path
            d="M 12 60 A 48 48 0 0 0 60 108 L 60 88 Q 60 60 32 60 Z"
            fill="#475029"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// 2. Four-Blade Pinwheel (Slate Blue #6B91A6)
function PinwheelShapeGraphic({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#FEFAF1] flex items-center justify-center overflow-hidden select-none">
      {/* Subtle ambient backdrop disc */}
      <div className="absolute w-44 h-44 rounded-full bg-sky-50/50 pointer-events-none" />

      <motion.div
        animate={
          isHovered
            ? { rotate: 90, scale: 1.08 }
            : { rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Blade (arcs right) */}
          <path
            d="M 60 60 L 60 12 A 24 24 0 0 1 60 60 Z"
            fill="#6B91A6"
          />

          {/* Right Blade (arcs down) */}
          <path
            d="M 60 60 L 108 60 A 24 24 0 0 1 60 60 Z"
            fill="#6B91A6"
          />

          {/* Bottom Blade (arcs left) */}
          <path
            d="M 60 60 L 60 108 A 24 24 0 0 1 60 60 Z"
            fill="#6B91A6"
          />

          {/* Left Blade (arcs up) */}
          <path
            d="M 60 60 L 12 60 A 24 24 0 0 1 60 60 Z"
            fill="#6B91A6"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// 3. Three-Leaf Clover with Stem (Charcoal Navy #233441 on #FEFAF1)
// Animation: The upper leaves smoothly float up a little bit and come back down
function CloverShapeGraphic({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#FEFAF1] flex items-center justify-center overflow-hidden select-none">
      {/* Subtle ambient backdrop disc */}
      <div className="absolute w-44 h-44 rounded-full bg-slate-100/50 pointer-events-none" />

      <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-xs overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Anchored Base Stem */}
          <path
            d="M 60 55 L 72 102 L 48 102 Z"
            fill="#233441"
          />

          {/* Upper Leaves: elevate up on hover, return down to stem when unhovered */}
          <motion.g
            animate={{ y: isHovered ? -9 : 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
          >
            {/* Top Leaf */}
            <circle cx="60" cy="35" r="19" fill="#233441" />

            {/* Left Leaf */}
            <circle cx="37" cy="57" r="19" fill="#233441" />

            {/* Right Leaf */}
            <circle cx="83" cy="57" r="19" fill="#233441" />

            {/* Center Junction */}
            <circle cx="60" cy="50" r="11" fill="#233441" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single Pillar Card Component                                       */
/* ------------------------------------------------------------------ */
function PillarCard({ pillar, idx }: { pillar: PillarItem; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.5,
        delay: idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl bg-white border border-gray-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer select-none"
    >
      {/* Top Half: Minimalist Geometric Shape Graphic */}
      <div className="relative h-52 sm:h-56 w-full shrink-0 border-b border-gray-100/90 overflow-hidden">
        {idx === 0 && <RosetteShapeGraphic isHovered={isHovered} />}
        {idx === 1 && <PinwheelShapeGraphic isHovered={isHovered} />}
        {idx === 2 && <CloverShapeGraphic isHovered={isHovered} />}
      </div>

      {/* Bottom Half: Minimized Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 bg-white justify-between">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-[22px] font-bold text-[#0f172a] tracking-tight leading-snug group-hover:text-black transition-colors">
            {pillar.title}
          </h3>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-normal leading-relaxed">
            {pillar.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main BentoGrid Component Export (3-Column Grid)                    */
/* ------------------------------------------------------------------ */
export function BentoGrid() {
  return (
    <div className="section-sm w-full py-12 sm:py-16" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl sm:rounded-[36px] bg-gray-50 border border-gray-100/80 p-6 sm:p-10 md:p-12 lg:p-14 overflow-hidden">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0f172a]">
              Built for engineering teams, optimized for production
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Three foundational systems designed to unify model routing,
              eliminate context resets, and guarantee enterprise-grade security.
            </p>
          </motion.div>

          {/* 3 Core Pillars Cards Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {PILLARS.map((pillar, idx) => (
              <PillarCard key={pillar.id} pillar={pillar} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BentoGrid;
