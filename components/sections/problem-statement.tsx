"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Database, GitBranch, Cpu, ShieldCheck } from "lucide-react";

// --- Problem Card Visuals with Smooth Hover Micro-Animations ---

function OrangeContextVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Geometric Architectural Grid & Arcs */}
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full opacity-80"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        <line x1="40" y1="0" x2="40" y2="180" stroke="#F97316" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="160" y1="0" x2="160" y2="180" stroke="#F97316" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="280" y1="0" x2="280" y2="180" stroke="#F97316" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="0" y1="90" x2="320" y2="90" stroke="#F97316" strokeOpacity="0.2" strokeWidth="1" />

        {/* Sweeping Arcs with Animated Draw/Pulse on Hover */}
        <motion.path
          d="M -20,180 A 190,190 0 0,1 260,-20"
          fill="none"
          stroke="#F97316"
          strokeWidth="1.5"
          animate={{
            strokeOpacity: isHovered ? 0.6 : 0.35,
            strokeWidth: isHovered ? 2 : 1.5,
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.path
          d="M 340,180 A 160,160 0 0,0 120,-20"
          fill="none"
          stroke="#F97316"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          animate={{
            strokeOpacity: isHovered ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Center Focal Ring */}
        <motion.circle
          cx="160"
          cy="90"
          r="32"
          fill="#F97316"
          animate={{
            fillOpacity: isHovered ? 0.14 : 0.08,
            r: isHovered ? 36 : 32,
          }}
          stroke="#F97316"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.circle
          cx="160"
          cy="90"
          r="48"
          fill="none"
          stroke="#F97316"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="3 4"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 6, repeat: isHovered ? Infinity : 0, ease: "linear" }}
          style={{ transformOrigin: "160px 90px" }}
        />
      </svg>

      {/* Floating Semantic Flow Icon Nodes */}
      <div className="absolute inset-0 flex items-center justify-center gap-5 sm:gap-6 text-[#EA580C]">
        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.02 }}
          className="p-2 sm:p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-[#F97316]/20 shadow-2xs flex items-center justify-center"
        >
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#EA580C]" />
        </motion.div>

        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.18 : 1.1,
            boxShadow: isHovered
              ? "0 10px 25px -5px rgba(249, 115, 22, 0.3)"
              : "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="p-2.5 sm:p-3 rounded-xl bg-white backdrop-blur-md border border-[#F97316]/40 flex items-center justify-center ring-2 ring-[#F97316]/20"
        >
          <GitBranch className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#F97316]" />
        </motion.div>

        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.04 }}
          className="p-2 sm:p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-[#F97316]/20 shadow-2xs flex items-center justify-center"
        >
          <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[#EA580C]" />
        </motion.div>
      </div>
    </div>
  );
}

function PinkSpendVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Mathematical Concentric Rings / Radar */}
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full opacity-80"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Axis Crosshairs */}
        <motion.line
          x1="160"
          y1="0"
          x2="160"
          y2="180"
          stroke="#EC4899"
          animate={{ strokeOpacity: isHovered ? 0.35 : 0.2 }}
          strokeWidth="1"
          transition={{ duration: 0.3 }}
        />
        <motion.line
          x1="0"
          y1="90"
          x2="320"
          y2="90"
          stroke="#EC4899"
          animate={{ strokeOpacity: isHovered ? 0.35 : 0.2 }}
          strokeWidth="1"
          transition={{ duration: 0.3 }}
        />

        {/* Concentric Radar Circles with Ripple Animation on Hover */}
        <motion.circle
          cx="160"
          cy="90"
          r="26"
          fill="#EC4899"
          animate={{
            fillOpacity: isHovered ? 0.16 : 0.08,
            r: isHovered ? 29 : 26,
          }}
          stroke="#EC4899"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
        />
        <motion.circle
          cx="160"
          cy="90"
          r="54"
          fill="none"
          stroke="#EC4899"
          animate={{
            strokeOpacity: isHovered ? 0.55 : 0.35,
            scale: isHovered ? 1.05 : 1,
          }}
          strokeWidth="1.2"
          style={{ transformOrigin: "160px 90px" }}
          transition={{ duration: 0.4 }}
        />
        <motion.circle
          cx="160"
          cy="90"
          r="82"
          fill="none"
          stroke="#EC4899"
          animate={{
            strokeOpacity: isHovered ? 0.45 : 0.25,
            scale: isHovered ? 1.08 : 1,
          }}
          strokeWidth="1"
          strokeDasharray="5 5"
          style={{ transformOrigin: "160px 90px" }}
          transition={{ duration: 0.4 }}
        />
        <motion.circle
          cx="160"
          cy="90"
          r="110"
          fill="none"
          stroke="#EC4899"
          animate={{
            strokeOpacity: isHovered ? 0.3 : 0.15,
            scale: isHovered ? 1.1 : 1,
          }}
          strokeWidth="1"
          style={{ transformOrigin: "160px 90px" }}
          transition={{ duration: 0.4 }}
        />
      </svg>

      {/* Center Cost Optimization Pulsing Node */}
      <div className="absolute inset-0 flex items-center justify-center text-[#DB2777]">
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            y: isHovered ? -4 : 0,
            boxShadow: isHovered
              ? "0 12px 30px -5px rgba(236, 72, 153, 0.35)"
              : "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 18 }}
          className="p-3 sm:p-3.5 rounded-2xl bg-white backdrop-blur-md border border-[#EC4899]/40 flex items-center justify-center ring-2 ring-[#EC4899]/20"
        >
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#EC4899]" />
        </motion.div>
      </div>
    </div>
  );
}

function PurpleMemoryVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Memory Mesh / Orbital Nested Ellipses */}
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full opacity-80"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Diagonal Guides */}
        <line x1="0" y1="0" x2="320" y2="180" stroke="#8B5CF6" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="320" y1="0" x2="0" y2="180" stroke="#8B5CF6" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />

        {/* Nested Orbital Rings with Opposite Rotation on Hover */}
        <motion.ellipse
          cx="160"
          cy="90"
          rx="90"
          ry="42"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          animate={{
            rotate: isHovered ? -35 : -15,
            strokeOpacity: isHovered ? 0.55 : 0.3,
          }}
          style={{ transformOrigin: "160px 90px" }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />
        <motion.ellipse
          cx="160"
          cy="90"
          rx="90"
          ry="42"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          animate={{
            rotate: isHovered ? 35 : 15,
            strokeOpacity: isHovered ? 0.55 : 0.3,
          }}
          style={{ transformOrigin: "160px 90px" }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />
        <motion.circle
          cx="160"
          cy="90"
          r="30"
          fill="#8B5CF6"
          animate={{
            fillOpacity: isHovered ? 0.18 : 0.1,
            r: isHovered ? 34 : 30,
          }}
          stroke="#8B5CF6"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
        />
      </svg>

      {/* Center Memory & Security Nodes */}
      <div className="absolute inset-0 flex items-center justify-center gap-5 sm:gap-6 text-[#7C3AED]">
        <motion.div
          animate={{
            y: isHovered ? -6 : 0,
            scale: isHovered ? 1.08 : 1,
            x: isHovered ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#8B5CF6]/25 shadow-xs flex items-center justify-center"
        >
          <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />
        </motion.div>

        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.18 : 1.1,
            x: isHovered ? 2 : 0,
            boxShadow: isHovered
              ? "0 12px 30px -5px rgba(124, 58, 237, 0.3)"
              : "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.02 }}
          className="p-2.5 sm:p-3 rounded-xl bg-white backdrop-blur-md border border-[#8B5CF6]/40 flex items-center justify-center ring-2 ring-[#8B5CF6]/20"
        >
          <Database className="w-5 h-5 text-[#7C3AED]" />
        </motion.div>
      </div>
    </div>
  );
}

interface ProblemItem {
  id: string;
  topBg: string;
  headline: string;
  description: string;
  renderVisual: (isHovered: boolean) => React.ReactNode;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: "context-fragmentation",
    topBg: "bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]/50",
    headline: "Unified Model Orchestration",
    description:
      "Connect directly to leading frontier models through a single low-latency gateway. Eliminate fragmented SDKs, duplicated schemas, and manual prompt maintenance.",
    renderVisual: (isHovered) => <OrangeContextVisual isHovered={isHovered} />,
  },
  {
    id: "runaway-spend",
    topBg: "bg-gradient-to-br from-[#FDF2F8] via-[#FCE7F3] to-[#FBCFE8]/50",
    headline: "Intelligent Dynamic Routing",
    description:
      "Automatically evaluate prompt complexity and dispatch to the optimal model. Maximize developer velocity and eliminate wasted inference spend.",
    renderVisual: (isHovered) => <PinkSpendVisual isHovered={isHovered} />,
  },
  {
    id: "session-amnesia",
    topBg: "bg-gradient-to-br from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]/50",
    headline: "Shared Context & Persistent Memory",
    description:
      "Preserve project state, architecture contracts, and team conventions across workflows and sessions. Never restart from scratch or lose active context.",
    renderVisual: (isHovered) => <PurpleMemoryVisual isHovered={isHovered} />,
  },
];

function ProblemCardItem({ item, index }: { item: ProblemItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
    >
      {/* TOP SECTION: Colored Architectural Graphic Visual (Orange / Pink / Purple) with Hover Animation */}
      <div className={`w-full h-48 sm:h-52 ${item.topBg} border-b border-black/5 relative overflow-hidden`}>
        {item.renderVisual(isHovered)}
      </div>

      {/* BOTTOM SECTION: Clean Content Area */}
      <div className="p-6 sm:p-8 flex flex-col justify-start space-y-3.5 flex-1 bg-white">
        <h3 className="text-lg sm:text-xl font-semibold text-[#0f172a] tracking-tight leading-snug">
          {item.headline}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal pt-1">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Problem Statement Section                                     */
/* ------------------------------------------------------------------ */
export function ProblemStatement() {
  return (
    <section className="section bg-white" id="problem">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0f172a] leading-tight">
            Deploy autonomous AI agents in minutes, not weeks
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Rivinity unifies model routing, persistent memory, and global deployment into a single orchestration layer — so your team ships faster and spends less.
          </p>
        </motion.div>

        {/* 3 Split Cards with Dynamic Hover Animations */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PROBLEMS.map((item, idx) => (
            <ProblemCardItem key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
