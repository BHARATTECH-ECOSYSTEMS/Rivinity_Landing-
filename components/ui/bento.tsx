"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, GitFork, Cpu, Zap, Database, ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 3 Core Pillars Data Definition                                     */
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
      "Automatically route prompts to the optimal model. Cut inference costs by up to 60%. Dynamically analyzes task complexity and dispatches queries across top frontier and lightweight models in sub-50ms with zero manual configuration.",
  },
  {
    id: "persistent-memory",
    title: "Persistent Memory",
    description:
      "Context that survives across sessions, tools, and team members. Never re-prompt. Shared schema contracts, engineering decisions, and active state survive indefinitely across team workflows, completely stopping repetitive hallucinations.",
  },
  {
    id: "production-security",
    title: "Production Security",
    description:
      "SOC 2, PII redaction, and compliance auditing out of the box. In-line token guardrails automatically detect prompt injection, redact sensitive PII, and maintain a tamper-proof cryptographic audit trail.",
  },
];

/* ------------------------------------------------------------------ */
/* Visual Graphic Banners for Each Pillar (With Rich Hover Motion)     */
/* ------------------------------------------------------------------ */

// 1. Orange Blueprint Grid with Floating Nodes
function RoutingGraphic({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF4E6] to-[#FFE8D1] flex items-center justify-center overflow-hidden">
      {/* Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,146,60,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,146,60,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Diagonal Guide Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="rgba(251,146,60,0.22)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="rgba(251,146,60,0.22)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Outer Concentric Blueprint Circle */}
      <motion.div
        animate={
          isHovered
            ? { scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }
            : { scale: 1, opacity: 0.5 }
        }
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute w-44 h-44 rounded-full border border-orange-300/40"
      />

      {/* Middle Rotating Dashed Circle */}
      <motion.div
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 16,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute w-32 h-32 rounded-full border border-dashed border-orange-400/50"
      />

      {/* Inner Concentric Circle */}
      <div className="absolute w-20 h-20 rounded-full border border-orange-300/50 bg-orange-400/5" />

      {/* Signal Transmission Pulse along Axis */}
      {isHovered && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-48 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent pointer-events-none"
        />
      )}

      {/* Floating Badges */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Left Badge */}
        <motion.div
          animate={isHovered ? { y: [-2, 2, -2], x: -2 } : { y: 0, x: 0 }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-xs border border-orange-200 shadow-xs flex items-center justify-center text-orange-500 transition-transform"
        >
          <Layers className="w-4 h-4" />
        </motion.div>

        {/* Center Prominent Badge with Expanding Aura Pulse */}
        <div className="relative flex items-center justify-center">
          {isHovered && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl border-2 border-orange-400/80 pointer-events-none"
            />
          )}
          <motion.div
            animate={
              isHovered
                ? {
                    scale: 1.1,
                    y: -2,
                    boxShadow: "0 12px 28px -4px rgba(251,146,60,0.45)",
                  }
                : {
                    scale: 1,
                    y: 0,
                    boxShadow: "0 8px 20px -6px rgba(251,146,60,0.35)",
                  }
            }
            transition={{ duration: 0.3 }}
            className="w-13 h-13 rounded-2xl bg-white backdrop-blur-xs border border-orange-300 flex items-center justify-center text-orange-500 relative z-10"
          >
            <GitFork className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Right Badge */}
        <motion.div
          animate={isHovered ? { y: [2, -2, 2], x: 2 } : { y: 0, x: 0 }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-xs border border-orange-200 shadow-xs flex items-center justify-center text-orange-500 transition-transform"
        >
          <Cpu className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}

// 2. Pink Concentric Radar with Elevated Zap Badge
function MemoryGraphic({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#FFFDFE] via-[#FFEBF0] to-[#FFDDE6] flex items-center justify-center overflow-hidden">
      {/* Radar Crosshair Lines */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-pink-300/45" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-pink-300/45" />

      {/* Concentric Radar Rings */}
      <motion.div
        animate={
          isHovered
            ? { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }
            : { scale: 1, opacity: 0.6 }
        }
        transition={{
          duration: 2.8,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute w-56 h-56 rounded-full border border-pink-200/50"
      />

      {/* Middle Rotating Dashed Ring */}
      <motion.div
        animate={isHovered ? { rotate: -360 } : { rotate: 0 }}
        transition={{
          duration: 18,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute w-44 h-44 rounded-full border border-dashed border-pink-300/60"
      />

      <div className="absolute w-32 h-32 rounded-full border border-pink-300/50" />
      <div className="absolute w-20 h-20 rounded-full border border-pink-300/60 bg-pink-400/5" />

      {/* Sweeping Radar Scanner Beam */}
      {isHovered && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(244,114,182,0.2) 360deg)",
          }}
        />
      )}

      {/* Center Elevated Badge with Pulsing Glow */}
      <div className="relative flex items-center justify-center">
        {isHovered && (
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-2xl border-2 border-pink-400/80 pointer-events-none"
          />
        )}
        <motion.div
          animate={
            isHovered
              ? {
                  scale: 1.12,
                  y: -2,
                  boxShadow: "0 12px 30px -4px rgba(244,114,182,0.5)",
                }
              : {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 8px 24px -6px rgba(244,114,182,0.4)",
                }
          }
          transition={{ duration: 0.3 }}
          className="relative z-10 w-13 h-13 rounded-2xl bg-white backdrop-blur-xs border border-pink-200 flex items-center justify-center text-pink-500"
        >
          <motion.div
            animate={
              isHovered
                ? { scale: [1, 1.18, 1], rotate: [0, -6, 6, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{
              duration: 1.8,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Zap className="w-6 h-6 fill-pink-500/20 text-pink-500" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// 3. Purple Intersecting Orbitals with Dual Badges
function SecurityGraphic({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#FDFBFF] via-[#F4EEFF] to-[#EAE0FF] flex items-center justify-center overflow-hidden">
      {/* Diagonal Guide Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="rgba(168,85,247,0.18)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="rgba(168,85,247,0.18)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Center Soft Purple Backdrop Disc */}
      <motion.div
        animate={
          isHovered
            ? { scale: 1.08, opacity: 0.95 }
            : { scale: 1, opacity: 0.75 }
        }
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-28 h-28 rounded-full bg-purple-200/50 border border-purple-300/40 pointer-events-none"
      />

      {/* Left Elliptical Ring (Down at rest -> Lifts up on hover) */}
      <motion.div
        animate={
          isHovered ? { rotate: -40, scale: 1.05 } : { rotate: -12, scale: 1 }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-56 h-24 rounded-[100%] border border-purple-400/60 pointer-events-none"
      />

      {/* Right Elliptical Ring (Down at rest -> Lifts up on hover) */}
      <motion.div
        animate={
          isHovered ? { rotate: 40, scale: 1.05 } : { rotate: 12, scale: 1 }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-56 h-24 rounded-[100%] border border-purple-400/60 pointer-events-none"
      />

      {/* Dual Badges in Center */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={
            isHovered
              ? {
                  y: -2,
                  scale: 1.05,
                  boxShadow: "0 8px 22px -3px rgba(168,85,247,0.35)",
                }
              : {
                  y: 0,
                  scale: 1,
                  boxShadow: "0 4px 12px -3px rgba(168,85,247,0.2)",
                }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-11 h-11 rounded-2xl bg-white backdrop-blur-xs border border-purple-200/90 flex items-center justify-center text-purple-600 shadow-sm"
        >
          <ShieldCheck className="w-5 h-5" />
        </motion.div>

        <motion.div
          animate={
            isHovered
              ? {
                  y: -2,
                  scale: 1.05,
                  boxShadow: "0 8px 22px -3px rgba(168,85,247,0.35)",
                }
              : {
                  y: 0,
                  scale: 1,
                  boxShadow: "0 4px 12px -3px rgba(168,85,247,0.2)",
                }
          }
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.03 }}
          className="w-11 h-11 rounded-2xl bg-white backdrop-blur-xs border border-purple-200/90 flex items-center justify-center text-purple-600 shadow-sm"
        >
          <Database className="w-5 h-5" />
        </motion.div>
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
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl bg-white border border-gray-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_45px_-12px_rgba(0,0,0,0.09)] hover:border-gray-300/90 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer select-none"
    >
      {/* Top Half: Visual Graphic Banner */}
      <div className="relative h-56 sm:h-60 w-full shrink-0 border-b border-gray-100/90 overflow-hidden">
        {idx === 0 && <RoutingGraphic isHovered={isHovered} />}
        {idx === 1 && <SecurityGraphic isHovered={isHovered} />}
        {idx === 2 && <MemoryGraphic isHovered={isHovered} />}
      </div>

      {/* Bottom Half: Content Body */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 bg-white justify-between">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug group-hover:text-black transition-colors">
            {pillar.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
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
