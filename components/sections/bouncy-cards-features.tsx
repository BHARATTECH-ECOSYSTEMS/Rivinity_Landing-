"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const BouncyCardsFeatures = () => {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:py-24 text-slate-800">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-4">
        <div>
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl text-slate-900 leading-tight">
            Accelerate your career with accredited AI certifications
          </h2>
        </div>
        <Link
          href="#courses"
          className="whitespace-nowrap rounded-xl bg-[#FF6B00] hover:bg-[#E66000] px-6 py-3 font-semibold text-white shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer text-sm"
        >
          Explore All Tracks
        </Link>
      </div>

      {/* Row 1: 4 col (Purple) + 8 col (Orange) */}
      <div className="mb-6 grid grid-cols-12 gap-6 items-stretch">
        <BounceCard className="col-span-12 md:col-span-4">
          <div>
            <CardTitle>Interactive Lab Sandboxes</CardTitle>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Complete hands-on coding challenges in browser sandboxes with automated test suites and instant grading feedback.
            </p>
          </div>
          <div className="mt-6 flex-1 min-h-[200px] flex flex-col justify-between rounded-t-2xl bg-gradient-to-br from-purple-100/90 via-violet-100/70 to-indigo-100/80 border-t border-x border-purple-200/90 p-5 translate-y-3.5 group-hover:translate-y-1 transition-transform duration-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-purple-900 font-medium border-b border-purple-200/80 pb-2.5">
              <span className="font-mono font-semibold text-[11px] sm:text-xs">Lab 04: Multi-Agent Tool Calling</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-800 bg-white/90 px-2 py-0.5 rounded-full border border-purple-200 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Lab
              </span>
            </div>
            <p className="text-xs text-purple-950 font-semibold leading-relaxed my-3">
              “Memory schema validated. Deterministic state compaction pattern successfully implemented.”
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-bold bg-white/90 text-purple-900 px-2.5 py-1 rounded-md border border-purple-200/70 shadow-2xs">
                Automated Grading: 100%
              </span>
              <span className="text-[10px] font-bold bg-white/90 text-purple-900 px-2.5 py-1 rounded-md border border-purple-200/70 shadow-2xs">
                Curriculum Verified
              </span>
            </div>
          </div>
        </BounceCard>

        <BounceCard className="col-span-12 md:col-span-8">
          <div>
            <CardTitle>Production Capstone Curriculum</CardTitle>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-2xl">
              Build real-world agentic systems from scratch — multi-model routing, retrieval pipelines, and enterprise tool execution.
            </p>
          </div>
          <div className="mt-6 flex-1 min-h-[200px] flex flex-col justify-between rounded-t-2xl bg-gradient-to-br from-amber-100/90 via-orange-100/70 to-orange-100/90 border-t border-x border-orange-200/90 p-5 translate-y-3.5 group-hover:translate-y-1 transition-transform duration-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-orange-950 font-medium border-b border-orange-200/80 pb-2.5">
              <span className="font-mono font-semibold text-[11px] sm:text-xs">Capstone: Autonomous Agent Dispatcher</span>
              <span className="bg-white/90 text-orange-800 font-bold px-2 py-0.5 rounded text-[10px] border border-orange-200 shadow-2xs shrink-0">
                Level 4 Capstone
              </span>
            </div>
            <div className="my-3 grid grid-cols-3 gap-3 text-xs">
              <div className="bg-white/85 p-3 rounded-xl border border-orange-200/70 shadow-2xs">
                <span className="text-[10px] text-orange-800 font-semibold block">Curriculum</span>
                <span className="text-sm font-extrabold font-mono text-orange-950">18 Modules</span>
              </div>
              <div className="bg-white/85 p-3 rounded-xl border border-orange-200/70 shadow-2xs">
                <span className="text-[10px] text-orange-800 font-semibold block">Real Capstones</span>
                <span className="text-sm font-extrabold font-mono text-orange-950">4 Production Apps</span>
              </div>
              <div className="bg-white/85 p-3 rounded-xl border border-orange-200/70 shadow-2xs">
                <span className="text-[10px] text-orange-800 font-semibold block">Review SLA</span>
                <span className="text-sm font-extrabold font-mono text-emerald-700">&lt; 24 Hours</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold bg-white/90 text-orange-900 px-2.5 py-1 rounded-md border border-orange-200/70 shadow-2xs">
                Industry Aligned Syllabus
              </span>
            </div>
          </div>
        </BounceCard>
      </div>

      {/* Row 2: 8 col (Light Green) + 4 col (Light Pink) */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        <BounceCard className="col-span-12 md:col-span-8">
          <div>
            <CardTitle>Rigorous Certification Exams</CardTitle>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-2xl">
              Demonstrate mastery through practical sandbox assessments covering prompt defense, SOC 2 compliance, and latency benchmarks.
            </p>
          </div>
          <div className="mt-6 flex-1 min-h-[200px] flex flex-col justify-between rounded-t-2xl bg-gradient-to-br from-emerald-100/90 via-teal-100/70 to-green-100/80 border-t border-x border-emerald-200/90 p-5 translate-y-3.5 group-hover:translate-y-1 transition-transform duration-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-950 font-medium border-b border-emerald-200/80 pb-2.5">
              <span className="font-mono font-semibold text-[11px] sm:text-xs">Exam: Certified AI Systems Architect (CAISA)</span>
              <span className="bg-white/90 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200 shadow-2xs shrink-0">
                Proctored & Scored
              </span>
            </div>
            <div className="my-3 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="bg-white/90 text-emerald-900 font-bold px-3 py-1.5 rounded-lg border border-emerald-200/70 shadow-2xs">
                ✓ Prompt Defense & Guardrails
              </span>
              <span className="bg-white/90 text-emerald-900 font-bold px-3 py-1.5 rounded-lg border border-emerald-200/70 shadow-2xs">
                ✓ Sub-50ms Routing Benchmark
              </span>
              <span className="bg-white/90 text-emerald-900 font-bold px-3 py-1.5 rounded-lg border border-emerald-200/70 shadow-2xs">
                ✓ Cryptographic Audit Trail
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold bg-white/90 text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-200/70 shadow-2xs">
                Benchmark: 85%+ Score to Pass
              </span>
            </div>
          </div>
        </BounceCard>

        <BounceCard className="col-span-12 md:col-span-4">
          <div>
            <CardTitle>Verifiable Certifications</CardTitle>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Earn cryptographic credentials with permanent verification IDs and 1-click LinkedIn License sync.
            </p>
          </div>
          <div className="mt-6 flex-1 min-h-[200px] flex flex-col justify-between rounded-t-2xl bg-gradient-to-br from-pink-100/90 via-rose-100/70 to-pink-100/80 border-t border-x border-pink-200/90 p-5 translate-y-3.5 group-hover:translate-y-1 transition-transform duration-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-pink-950 font-medium border-b border-pink-200/80 pb-2.5">
              <span className="font-mono font-semibold text-[11px] sm:text-xs">ID: #RIV-CAISA-2026</span>
              <span className="bg-white/90 text-pink-800 font-bold px-2 py-0.5 rounded text-[10px] border border-pink-200 shadow-2xs shrink-0">
                Verified
              </span>
            </div>
            <div className="my-3">
              <p className="text-xs sm:text-sm text-pink-950 font-bold leading-snug">
                Certified AI Systems Architect (CAISA)
              </p>
              <p className="text-[11px] text-pink-800/90 font-medium mt-1">
                Accredited by Rivinity Academy Board
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-pink-800 bg-white/90 px-2.5 py-1 rounded-md border border-pink-200/70 w-fit shadow-2xs pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              1-Click LinkedIn License Sync
            </div>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 0.985, y: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative flex flex-col justify-between min-h-[410px] sm:min-h-[430px] cursor-pointer overflow-hidden rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-7 pb-0 sm:pb-0 shadow-xs hover:shadow-md transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
      {children}
    </h3>
  );
};

export default BouncyCardsFeatures;
