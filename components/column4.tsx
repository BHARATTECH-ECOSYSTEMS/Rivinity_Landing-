"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Layers, 
  Wand2, 
  Globe, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Database, 
  Cpu, 
  Code2 
} from "lucide-react";

export default function AIBentoFeatures() {
  const [activeTab, setActiveTab] = useState<"preview" | "prompt">("preview");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#FCFCFD] text-slate-900 rounded-3xl my-10 overflow-hidden relative border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#7C3AED]/5 via-[#EC4899]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#7C3AED] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>NEXT-GEN AI ENGINE</span>
        </div> */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
          Built for scale. Powered by intelligence.
        </h2>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
          A complete suite of AI tools designed to seamlessly orchestrate models, retain full contextual memory, and deploy code instantly.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

        {/* ---------------- CARD 1: Intelligent Orchestrator (Span 2) ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 group relative rounded-3xl bg-white border border-slate-200 p-8 hover:border-[#7C3AED]/40 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.15)] overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#7C3AED]/10 transition-colors duration-500" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-[#7C3AED] group-hover:scale-110 group-hover:border-[#7C3AED]/20 transition-all duration-500 shadow-sm">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20">
                Dynamic Routing
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Intelligent Orchestrator</h3>
            <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
              Automatically evaluates incoming prompts and routes them to the optimal model based on latency, complexity, and cost constraints.
            </p>
          </div>

          {/* Visual UI Mockup */}
          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Input Prompt Chip */}
              <div className="w-full sm:w-auto px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center gap-3 text-xs font-mono text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
                <span className="truncate max-w-[160px]">"Generate React API hook"</span>
              </div>

              {/* Router Processing */}
              <div className="flex items-center gap-2 text-slate-400">
                <ArrowRight className="w-4 h-4 hidden sm:block text-slate-300" />
                <div className="px-3 py-1.5 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-semibold flex items-center gap-1.5 shadow-sm bg-white">
                  <Zap className="w-3.5 h-3.5 text-[#7C3AED] fill-[#7C3AED]" />
                  <span>Router</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>

              {/* Target Model Cards */}
              <div className="w-full sm:w-auto flex flex-col gap-2">
                <div className="px-3.5 py-2 bg-white border border-[#7C3AED]/30 rounded-xl flex items-center justify-between gap-4 text-xs font-medium text-slate-800 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Claude 3.5 Sonnet</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded border border-[#7C3AED]/20">
                    99.4% Match
                  </span>
                </div>

                <div className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between gap-4 text-xs text-slate-400 opacity-80">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>GPT-4o</span>
                  </div>
                  <span className="text-[10px] font-mono">Bypassed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------- CARD 2: Infinite Context Memory (Span 1) ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1 group relative rounded-3xl bg-white border border-slate-200 p-8 hover:border-[#EC4899]/40 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.15)] overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#EC4899]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#EC4899]/10 transition-colors duration-500" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-[#EC4899] group-hover:scale-110 group-hover:border-[#EC4899]/20 transition-all duration-500 shadow-sm">
                <Layers className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20">
                Vector DB
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Infinite Memory</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Persists design preferences, brand guidelines, and previous session code state forever.
            </p>
          </div>

          {/* Visual Vector Memory Index */}
          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2 border-b border-slate-200">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#EC4899]" /> Context Index
              </span>
              <span className="text-slate-400">Active</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <span className="text-slate-700 font-mono">User Design System</span>
              <span className="text-[10px] text-[#EC4899] bg-[#EC4899]/10 px-2 py-0.5 rounded border border-[#EC4899]/20">
                Retrieved
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">Brand Colors & Icons</span>
              <span className="text-[10px] text-slate-400">Cached</span>
            </div>
          </div>
        </motion.div>

        {/* ---------------- CARD 3: Prompt to UI (Span 1) ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-1 group relative rounded-3xl bg-white border border-slate-200 p-8 hover:border-[#F97316]/40 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F97316]/10 transition-colors duration-500" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-[#F97316] group-hover:scale-110 group-hover:border-[#F97316]/20 transition-all duration-500 shadow-sm">
                <Wand2 className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20">
                JSX Engine
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Prompt to UI</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Turn plain natural language into production-grade React & Tailwind components instantly.
            </p>
          </div>

          {/* Interactive Code/Preview Toggle Mockup */}
          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between bg-white px-3 py-2 border-b border-slate-200 text-xs">
              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 rounded-md transition-colors font-medium ${
                    activeTab === "preview" ? "bg-white text-[#F97316] shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("prompt")}
                  className={`px-3 py-1 rounded-md transition-colors font-medium ${
                    activeTab === "prompt" ? "bg-white text-[#F97316] shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Code
                </button>
              </div>
              <Code2 className="w-4 h-4 text-slate-400 mr-1" />
            </div>

            <div className="p-4 h-32 flex items-center justify-center bg-slate-50">
              {activeTab === "preview" ? (
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#F97316] text-white font-bold text-xs shadow-lg shadow-[#F97316]/20 hover:scale-105 transition-transform flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>Interactive Button</span>
                </button>
              ) : (
                <div className="w-full h-full bg-slate-900 rounded-lg p-3 overflow-hidden">
                  <pre className="text-[11px] font-mono text-[#F97316] leading-relaxed">
                    {`<Button variant="glow">\n  <Sparkles /> Deploy\n</Button>`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ---------------- CARD 4: One-Click Deploy (Span 2) ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 group relative rounded-3xl bg-white border border-slate-200 p-8 hover:border-slate-300 transition-all duration-500 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between"
        >
          {/* Multi-color gradient representing the full suite of colors */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#7C3AED]/5 via-[#EC4899]/5 to-[#F97316]/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-slate-900 group-hover:scale-110 transition-all duration-500 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-[#EC4899]/10 to-[#F97316]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Globe className="w-6 h-6 relative z-10" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                Zero DevOps
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">One-Click Edge Deploy</h3>
            <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
              Ship directly from chat to a global edge network distributed across 280+ cities in under 3 seconds.
            </p>
          </div>

          {/* Terminal Console Mockup (Kept dark for high contrast / realistic dev feel) */}
          <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-5 font-mono text-xs overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3 mb-3.5">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-semibold text-slate-200">Deployment Logs</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] tracking-widest text-emerald-400 font-bold">LIVE</span>
              </div>
            </div>

            <div className="space-y-2 text-slate-400 text-[11px] leading-relaxed">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                <span>Bundle compiled in <strong className="text-white">840ms</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                <span>Pushed to Edge POPs: <span className="text-slate-300">SFO, LHR, TYO, FRA</span></span>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-800/50 flex items-center justify-between text-[#F97316] font-semibold">
                <span>🚀 Status: Deployed (https://app.rivinity.ai)</span>
                <span className="text-slate-500 text-[10px] font-normal">12ms latency</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}