"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Layers, Wand2, Globe, Zap, ArrowRight } from "lucide-react";

export default function AIBentoFeatures() {
  const features = [
    {
      title: "Intelligent Orchestrator",
      description: "Automatically routes your prompts to the most capable model for the task, balancing speed, cost, and complex reasoning in real-time.",
      icon: BrainCircuit,
      colSpan: "md:col-span-2",
      delay: 0.1,
      visual: (
        <div className="mt-6 flex items-center justify-center w-full h-32 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
          <div className="flex items-center gap-3 z-10">
            <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 shadow-sm">User Prompt</div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-md animate-pulse">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex flex-col gap-2">
              <div className="px-3 py-1 bg-white border border-[#7C3AED]/30 rounded-lg text-[10px] font-medium text-[#7C3AED] shadow-sm">Logic Model</div>
              <div className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-medium text-gray-400 opacity-50">Vision Model</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Infinite Context Memory",
      description: "Never repeat yourself. The AI remembers your past sessions and preferences.",
      icon: Layers,
      colSpan: "md:col-span-1",
      delay: 0.2,
      visual: (
        <div className="mt-6 flex items-center justify-center w-full h-32 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative">
          <div className="flex flex-col gap-2 w-3/4 z-10">
            <div className="h-2 w-full bg-gray-200 rounded-full" />
            <div className="h-2 w-4/5 bg-gray-200 rounded-full" />
            <div className="h-2 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full opacity-80" />
            <div className="h-2 w-3/5 bg-gray-200 rounded-full" />
          </div>
        </div>
      )
    },
    {
      title: "Prompt to UI",
      description: "Generate production-ready React components simply by describing them in plain English.",
      icon: Wand2,
      colSpan: "md:col-span-1",
      delay: 0.3,
      visual: (
        <div className="mt-6 flex items-center justify-center w-full h-32 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative p-4">
          <div className="w-full h-full border border-dashed border-[#EC4899]/40 rounded-lg flex items-center justify-center bg-white/50">
            <span className="text-xs font-mono text-[#EC4899]">{'<GeneratedComponent />'}</span>
          </div>
        </div>
      )
    },
    {
      title: "One-Click Deploy",
      description: "From a local development environment to a globally distributed edge network in seconds. Zero DevOps required.",
      icon: Globe,
      colSpan: "md:col-span-2",
      delay: 0.4,
      visual: (
        <div className="mt-6 flex items-center justify-center w-full h-32 bg-[#0F172A] rounded-xl border border-gray-800 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="z-10 flex items-center gap-2 px-4 py-2 bg-black/40 border border-gray-700 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-gray-300">deployed to edge network</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Everything you need to build faster
        </h2>
        <p className="text-lg text-gray-500">
          A complete suite of AI-powered tools designed to supercharge your workflow from idea to production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className={`relative group rounded-[2rem] bg-gray-200/50 p-[3px] transition-all duration-500 shadow-xl shadow-gray-200/60 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(124,58,237,0.45)] ${feature.colSpan}`}
            >
              {/* Gradient Border Background (visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              
              {/* Inner Card Content */}
              <div className="relative h-full w-full bg-white rounded-[calc(2rem-3px)] p-8 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-gray-700 group-hover:text-[#EC4899] transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Optional Visual Element */}
                {feature.visual && (
                  <div className="mt-auto pt-6">
                    {feature.visual}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}