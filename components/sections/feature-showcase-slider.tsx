"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Globe,
  Bot,
  Sparkles,
  Video,
  Image as ImageIcon,
  Music,
  Search,
  Workflow,
  Code2,
  FileText,
  Play,
  ArrowRight,
  Check,
  Clock,
  SlidersHorizontal,
  Puzzle,
  ChevronDown,
  Copy,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

/* ==========================================================================
   FEATURE DEFINITIONS (EXACT WIREFRAME SKELETON CARDS MATCHING REFERENCE)
========================================================================== */

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  cardBorder?: string;
  preview: React.ReactNode;
}

const SKELETON_FEATURES: FeatureItem[] = [
  // 1. Website Builder
  {
    id: "website-builder",
    title: "Website Builder",
    subtitle: "Create and publish stunning websites with AI, no coding needed.",
    icon: Globe,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border border-blue-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Browser Top Dots */}
        <div className="flex items-center gap-1.5 pb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" />
        </div>

        {/* Top Nav Bar Skeleton Capsule */}
        <div className="w-full h-5 rounded-lg bg-[#e2e8f0]/80 border border-slate-200/60" />

        {/* Hero Area: Left Text Lines + Right Image Box */}
        <div className="flex items-center justify-between gap-3 py-1.5 my-auto">
          <div className="flex-1 space-y-2">
            <div className="w-26 h-3.5 rounded-md bg-[#94a3b8]" />
            <div className="w-16 h-2 rounded-md bg-[#cbd5e1]" />
            <div className="w-20 h-2 rounded-md bg-[#cbd5e1]" />
          </div>

          {/* Large vertical image box */}
          <div className="w-20 h-24 rounded-2xl bg-[#e2e8f0]/90 border border-slate-200/60 shrink-0" />
        </div>

        {/* Bottom 3 Cards Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded-xl bg-[#e2e8f0]/90" />
          <div className="h-8 rounded-xl bg-[#e2e8f0]/90" />
          <div className="h-8 rounded-xl bg-[#e2e8f0]/90" />
        </div>
      </div>
    ),
  },

  // 2. Agent Studio
  {
    id: "agent-studio",
    title: "Agent Studio",
    subtitle: "Build, customize, and deploy AI agents for any workflow.",
    icon: Bot,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border border-indigo-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Main Area: Left Flowchart Tree + Right Panel */}
        <div className="grid grid-cols-5 gap-2.5 my-auto items-center">
          {/* Left Tree Flowchart */}
          <div className="col-span-3 flex flex-col items-center">
            {/* Top Node */}
            <div className="w-16 h-6 rounded-lg bg-[#e2e8f0]/90 border border-slate-200/60" />
            {/* Vertical Line */}
            <div className="w-0.5 h-2.5 bg-[#cbd5e1]" />
            {/* Branching Line */}
            <div className="w-24 h-0.5 bg-[#cbd5e1]" />
            {/* 3 Child Nodes */}
            <div className="flex items-center justify-between w-24 pt-1 gap-1">
              <div className="w-7 h-7 rounded-lg bg-[#e2e8f0]/90 border border-slate-200/60" />
              <div className="w-7 h-7 rounded-lg bg-[#e2e8f0]/90 border border-slate-200/60" />
              <div className="w-7 h-7 rounded-lg bg-[#e2e8f0]/90 border border-slate-200/60" />
            </div>
            {/* Bottom Node */}
            <div className="w-0.5 h-2.5 bg-[#cbd5e1]" />
            <div className="w-14 h-6 rounded-lg bg-[#e2e8f0]/90 border border-slate-200/60" />
          </div>

          {/* Right Sidebar Panel */}
          <div className="col-span-2 p-2 rounded-xl bg-slate-50 border border-slate-150 flex flex-col gap-2">
            <div className="w-11 h-2 rounded bg-[#94a3b8]" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1] shrink-0" />
              <div className="w-9 h-1.5 rounded bg-[#cbd5e1]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1] shrink-0" />
              <div className="w-9 h-1.5 rounded bg-[#cbd5e1]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1] shrink-0" />
              <div className="w-9 h-1.5 rounded bg-[#cbd5e1]" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Skeleton Line + Dark Button */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
          <div className="w-18 h-2 rounded bg-[#cbd5e1]" />
          <div className="w-12 h-5 rounded-lg bg-[#94a3b8]" />
        </div>
      </div>
    ),
  },

  // 3. AI Chat
  {
    id: "ai-chat",
    title: "AI Chat",
    subtitle: "Get instant answers, explore ideas, and solve problems with conversational AI.",
    icon: Sparkles,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50 border border-orange-100",
    cardBorder: "ring-2 ring-orange-400/40 border-orange-300",
    preview: (
      <div className="w-full h-full flex gap-2.5 bg-white select-none p-3 rounded-2xl border border-orange-200/80 shadow-2xs">
        {/* Left Sidebar with Orange Top Pill */}
        <div className="w-20 rounded-xl bg-orange-50/60 p-2 flex flex-col gap-2.5 shrink-0">
          <div className="w-14 h-3.5 rounded-full bg-orange-200/80" />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <div className="w-9 h-1.5 rounded bg-slate-200" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <div className="w-9 h-1.5 rounded bg-slate-200" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <div className="w-9 h-1.5 rounded bg-slate-200" />
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col justify-between">
          {/* User Message Bubble with Avatar */}
          <div className="flex items-center justify-end gap-1.5 pt-0.5">
            <div className="p-2 rounded-xl bg-slate-100 flex flex-col gap-1 w-22">
              <div className="w-14 h-1.5 rounded bg-[#94a3b8]" />
              <div className="w-10 h-1.5 rounded bg-[#cbd5e1]" />
            </div>
            <div className="w-4 h-4 rounded-full bg-[#cbd5e1] shrink-0" />
          </div>

          {/* Assistant Response Bubble with Orange Avatar & Text Lines */}
          <div className="flex items-start gap-1.5 my-auto">
            <div className="w-4 h-4 rounded-full bg-orange-300 shrink-0 mt-0.5" />
            <div className="flex-1 p-2.5 rounded-xl bg-orange-50/80 border border-orange-100 flex flex-col gap-1.5 shadow-2xs">
              <div className="w-full h-1.5 rounded bg-orange-200/80" />
              <div className="w-5/6 h-1.5 rounded bg-orange-200/80" />
              <div className="w-4/5 h-1.5 rounded bg-orange-200/80" />
              <div className="w-1/2 h-1.5 rounded bg-orange-200/60" />
            </div>
          </div>

          {/* Bottom Search / Prompt Input with Orange Send Button */}
          <div className="flex items-center justify-between px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">
            <div className="w-18 h-2 rounded bg-slate-300" />
            <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 4. Prompt to Video (EXACT MATCH TO ZOOMED IMAGE)
  {
    id: "prompt-to-video",
    title: "Prompt to Video",
    subtitle: "Turn your ideas into stunning videos with simple prompts.",
    icon: Video,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 border border-rose-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Top Prompt Capsule with Dark Border */}
        <div className="w-full border-[1.5px] border-slate-900 rounded-xl px-2.5 py-1.5 flex items-center justify-between bg-white">
          <div className="w-7/12 h-2.5 rounded-full bg-[#cbd5e1]" />
          <div className="w-14 h-5 rounded-lg bg-[#94a3b8]" />
        </div>

        {/* Video Player Box with Scrubber and Play Button */}
        <div className="w-full h-[122px] rounded-2xl bg-[#e2e8f0]/90 my-2 relative flex flex-col justify-between p-2.5">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-[#64748b] text-[#64748b] ml-0.5" />
            </div>
          </div>
          {/* Scrubber inside video box */}
          <div className="flex items-center gap-1.5 w-full px-0.5">
            <div className="w-3/5 h-1 rounded-full bg-[#94a3b8]" />
            <div className="w-2/5 h-1 rounded-full bg-[#cbd5e1]" />
          </div>
        </div>

        {/* Bottom 3 Cards Row */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-9 rounded-xl bg-[#e2e8f0]/90" />
          <div className="h-9 rounded-xl bg-[#e2e8f0]/90" />
          <div className="h-9 rounded-xl bg-[#e2e8f0]/90" />
        </div>
      </div>
    ),
  },

  // 5. Image Studio (EXACT MATCH TO ZOOMED IMAGE)
  {
    id: "image-studio",
    title: "Image Studio",
    subtitle: "Create, edit, and transform images with AI.",
    icon: ImageIcon,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border border-emerald-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Top Prompt Capsule with Dark Border */}
        <div className="w-full border-[1.5px] border-slate-900 rounded-xl px-2.5 py-1.5 flex items-center justify-between bg-white">
          <div className="w-7/12 h-2.5 rounded-full bg-[#cbd5e1]" />
          <div className="w-14 h-5 rounded-lg bg-[#94a3b8]" />
        </div>

        {/* 2x2 Grid of 4 Equal Rounded Boxes */}
        <div className="grid grid-cols-2 gap-2.5 w-full my-2 flex-1">
          <div className="rounded-2xl bg-[#e2e8f0]/90 h-full min-h-[74px]" />
          <div className="rounded-2xl bg-[#e2e8f0]/90 h-full min-h-[74px]" />
          <div className="rounded-2xl bg-[#e2e8f0]/90 h-full min-h-[74px]" />
          <div className="rounded-2xl bg-[#e2e8f0]/90 h-full min-h-[74px]" />
        </div>
      </div>
    ),
  },

  // 6. Audio Lab
  {
    id: "audio-lab",
    title: "Audio Lab",
    subtitle: "Generate realistic voiceovers, transcribe, and edit audio.",
    icon: Music,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border border-violet-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Top Script Skeleton */}
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-150 space-y-1.5">
          <div className="w-28 h-2 rounded bg-[#94a3b8]" />
          <div className="w-18 h-1.5 rounded bg-[#cbd5e1]" />
        </div>

        {/* Waveform Player Skeleton */}
        <div className="p-2 rounded-xl bg-violet-50/70 border border-violet-100 flex items-center gap-2 my-auto shadow-2xs">
          <div className="w-6 h-6 rounded-full bg-violet-400/80 flex items-center justify-center shrink-0">
            <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
          </div>
          {/* Waveform Bars */}
          <div className="flex-1 flex items-center justify-between gap-1 h-6 px-0.5">
            {[30, 55, 80, 95, 45, 85, 60, 90, 70, 85, 50, 65, 80, 45, 90, 60, 30].map(
              (h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${i < 9 ? "bg-violet-400" : "bg-violet-200"}`}
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
          <div className="w-8 h-2 rounded bg-violet-300" />
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between px-2">
            <div className="w-12 h-2 rounded bg-slate-300" />
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </div>
          <div className="h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between px-2">
            <div className="w-10 h-2 rounded bg-slate-300" />
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="w-full h-6 rounded-xl bg-violet-400/80 flex items-center justify-center shadow-xs">
          <div className="w-20 h-2 rounded bg-white/90" />
        </div>
      </div>
    ),
  },

  // 7. Deep Research
  {
    id: "deep-research",
    title: "Deep Research",
    subtitle: "Get in-depth, source-backed research on any topic.",
    icon: Search,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border border-blue-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Top Search Input with Button */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-full bg-slate-50 border border-slate-200">
          <div className="w-32 h-2 rounded bg-[#cbd5e1]" />
          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Steps Checklist + Research Report Card */}
        <div className="grid grid-cols-2 gap-2.5 my-auto items-center">
          {/* Left Checklist */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[7px]">
                <Check className="w-2 h-2 stroke-[3]" />
              </span>
              <div className="w-16 h-2 rounded bg-[#cbd5e1]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[7px]">
                <Check className="w-2 h-2 stroke-[3]" />
              </span>
              <div className="w-14 h-2 rounded bg-[#cbd5e1]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-blue-600 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </span>
              <div className="w-18 h-2 rounded bg-[#94a3b8]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-slate-300" />
              <div className="w-12 h-2 rounded bg-[#cbd5e1]" />
            </div>
          </div>

          {/* Right Report with Bar Chart */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2 shadow-2xs">
            <div className="w-16 h-2.5 rounded bg-[#94a3b8]" />
            <div className="w-full h-1.5 rounded bg-[#cbd5e1]" />
            <div className="w-3/4 h-1.5 rounded bg-[#cbd5e1]" />

            {/* Mini Bar Chart */}
            <div className="flex items-end justify-between gap-1 h-7 pt-1">
              <div className="flex-1 bg-blue-400 rounded-t h-[35%]" />
              <div className="flex-1 bg-blue-400 rounded-t h-[60%]" />
              <div className="flex-1 bg-blue-400 rounded-t h-[85%]" />
              <div className="flex-1 bg-blue-500 rounded-t h-[100%]" />
              <div className="flex-1 bg-blue-400 rounded-t h-[70%]" />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 8. Workflow Automation
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    subtitle: "Automate repetitive tasks and connect your favorite tools.",
    icon: Workflow,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border border-indigo-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="grid grid-cols-2 gap-2.5 my-auto items-center">
          {/* Left Step Stack */}
          <div className="space-y-2">
            <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded bg-emerald-400 shrink-0" />
              <div className="w-16 h-2 rounded bg-[#94a3b8]" />
            </div>
            <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded bg-purple-400 shrink-0" />
              <div className="w-16 h-2 rounded bg-[#94a3b8]" />
            </div>
            <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded bg-slate-800 shrink-0" />
              <div className="w-16 h-2 rounded bg-[#94a3b8]" />
            </div>
            <div className="text-center pt-0.5">
              <div className="w-14 h-3 rounded-full border border-dashed border-slate-300 mx-auto" />
            </div>
          </div>

          {/* Right Automation Panel */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="w-12 h-2.5 rounded bg-[#94a3b8]" />
              <div className="w-6 h-3.5 rounded-full bg-blue-600" />
            </div>
            <div className="space-y-1.5 text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <div className="w-12 h-2 rounded bg-[#cbd5e1]" />
              </div>
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3 h-3" />
                <div className="w-10 h-2 rounded bg-[#cbd5e1]" />
              </div>
              <div className="flex items-center gap-1.5">
                <Puzzle className="w-3 h-3" />
                <div className="w-14 h-2 rounded bg-[#cbd5e1]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 9. AI Coding
  {
    id: "ai-coding",
    title: "AI Coding",
    subtitle: "Write, debug, and improve code with AI assistance.",
    icon: Code2,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border border-emerald-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-[#111827] rounded-2xl p-3.5 select-none text-white font-mono shadow-2xs">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 font-sans">
          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
            <span className="text-emerald-400 font-mono text-[8px]">&lt;/&gt;</span>
            <span>main.py</span>
          </div>
          <Copy className="w-2.5 h-2.5 text-slate-600" />
        </div>

        {/* Code Skeleton Lines with Indentation */}
        <div className="space-y-2 my-auto py-1">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[8.5px] w-2">1</span>
            <div className="w-22 h-2.5 rounded bg-rose-400/80" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[8.5px] w-2">2</span>
            <div className="w-16 h-2.5 rounded bg-[#cbd5e1] pl-2" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[8.5px] w-2">3</span>
            <div className="w-12 h-2.5 rounded bg-amber-400/80 pl-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[8.5px] w-2">4</span>
            <div className="w-26 h-2.5 rounded bg-blue-400/80 pl-2" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-[8.5px] w-2">5</span>
            <div className="w-18 h-2.5 rounded bg-blue-400/80 pl-4" />
            <div className="w-9 h-2 rounded bg-emerald-400/60" />
          </div>
        </div>

        {/* Bottom Run Button */}
        <div className="flex justify-end pt-1 font-sans">
          <div className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[8px] font-semibold flex items-center gap-1 shadow-xs">
            <Play className="w-2 h-2 fill-white" />
            Run
          </div>
        </div>
      </div>
    ),
  },

  // 10. Document Studio
  {
    id: "document-studio",
    title: "Document Studio",
    subtitle: "Summarize, analyze, and transform your documents.",
    icon: FileText,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border border-amber-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* PDF Header */}
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <div className="w-5 h-5 rounded bg-rose-100 text-rose-600 flex items-center justify-center text-[8px] font-bold">
            PDF
          </div>
          <div className="space-y-0.5">
            <div className="w-22 h-2.5 rounded bg-[#94a3b8]" />
            <div className="w-14 h-1.5 rounded bg-[#cbd5e1]" />
          </div>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 text-[8px] font-medium text-slate-400 pt-0.5">
          <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5">Summary</span>
          <span>Key Points</span>
          <span>Q&amp;A</span>
          <span>Translate</span>
        </div>

        {/* Content Area with 4 Skeleton Paragraph Lines */}
        <div className="grid grid-cols-2 gap-2.5 my-auto pt-1">
          <div className="space-y-2">
            <div className="w-14 h-2.5 rounded bg-[#94a3b8]" />
            <div className="w-full h-1.5 rounded bg-[#cbd5e1]" />
            <div className="w-4/5 h-1.5 rounded bg-[#cbd5e1]" />
            <div className="w-full h-1.5 rounded bg-[#cbd5e1]" />
            <div className="w-3/5 h-1.5 rounded bg-[#cbd5e1]" />
          </div>

          <div className="space-y-1.5">
            <div className="h-5 rounded bg-blue-50 border border-blue-200 flex items-center px-2">
              <div className="w-14 h-2 rounded bg-blue-400" />
            </div>
            <div className="h-5 rounded bg-slate-50 border border-slate-200 flex items-center px-2">
              <div className="w-12 h-2 rounded bg-slate-300" />
            </div>
            <div className="h-5 rounded bg-slate-50 border border-slate-200 flex items-center px-2">
              <div className="w-14 h-2 rounded bg-slate-300" />
            </div>
            <div className="h-5 rounded bg-slate-50 border border-slate-200 flex items-center px-2">
              <div className="w-12 h-2 rounded bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 11. Rivinity LM
  {
    id: "rivinity-lm",
    title: "Rivinity LM",
    subtitle: "Experience our flagship model built for real-world intelligence.",
    icon: Sparkles,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 border border-purple-100",
    preview: (
      <div className="w-full h-full flex flex-col justify-between bg-white select-none p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600" />
            <div className="w-16 h-2.5 rounded bg-[#94a3b8]" />
          </div>
          <div className="w-12 h-3.5 rounded-full bg-slate-100" />
        </div>

        {/* Chat Conversation */}
        <div className="space-y-2 my-auto py-1">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-slate-300 shrink-0" />
            <div className="p-2 rounded-xl bg-slate-100 w-28">
              <div className="w-20 h-2 rounded bg-[#cbd5e1]" />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-600 shrink-0 mt-0.5" />
            <div className="flex-1 p-2.5 rounded-xl bg-white border border-slate-150 space-y-1.5 shadow-2xs">
              <div className="w-full h-1.5 rounded bg-[#cbd5e1]" />
              <div className="w-4/5 h-1.5 rounded bg-[#cbd5e1]" />
              <div className="w-14 h-1.5 rounded bg-purple-300" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="w-12 h-3.5 rounded bg-slate-100 border border-slate-200" />
          <div className="w-12 h-3.5 rounded bg-slate-100 border border-slate-200" />
          <div className="w-12 h-3.5 rounded bg-slate-100 border border-slate-200" />
        </div>
      </div>
    ),
  },
];

/* ==========================================================================
   FEATURE THEMES & ACCENTS
========================================================================== */

const FEATURE_ACCENTS: Record<
  string,
  { ring: string; border: string; glow: string; badgeBg: string; text: string }
> = {
  "website-builder": {
    ring: "ring-2 ring-blue-500/35",
    border: "border-blue-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(59,130,246,0.22)]",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    text: "text-blue-600",
  },
  "agent-studio": {
    ring: "ring-2 ring-indigo-500/35",
    border: "border-indigo-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(99,102,241,0.22)]",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    text: "text-indigo-600",
  },
  "ai-chat": {
    ring: "ring-2 ring-orange-500/35",
    border: "border-orange-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(251,146,60,0.22)]",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    text: "text-orange-600",
  },
  "prompt-to-video": {
    ring: "ring-2 ring-rose-500/35",
    border: "border-rose-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(244,63,94,0.22)]",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    text: "text-rose-600",
  },
  "image-studio": {
    ring: "ring-2 ring-emerald-500/35",
    border: "border-emerald-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(16,185,129,0.22)]",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    text: "text-emerald-600",
  },
  "audio-lab": {
    ring: "ring-2 ring-amber-500/35",
    border: "border-amber-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(245,158,11,0.22)]",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    text: "text-amber-600",
  },
  "deep-research": {
    ring: "ring-2 ring-cyan-500/35",
    border: "border-cyan-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(6,182,212,0.22)]",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    text: "text-cyan-600",
  },
  "workflow-automation": {
    ring: "ring-2 ring-violet-500/35",
    border: "border-violet-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(139,92,246,0.22)]",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
    text: "text-violet-600",
  },
  "ai-coding": {
    ring: "ring-2 ring-sky-500/35",
    border: "border-sky-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(14,165,233,0.22)]",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    text: "text-sky-600",
  },
  "document-studio": {
    ring: "ring-2 ring-teal-500/35",
    border: "border-teal-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(20,184,166,0.22)]",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    text: "text-teal-600",
  },
  "rivinity-lm": {
    ring: "ring-2 ring-purple-500/35",
    border: "border-purple-400",
    glow: "shadow-[0_20px_50px_-12px_rgba(168,85,247,0.22)]",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    text: "text-purple-600",
  },
};

export function FeatureShowcaseSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cardWidth, setCardWidth] = useState(325);
  const [gap, setGap] = useState(24);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setCardWidth(290);
          setGap(16);
        } else if (window.innerWidth < 1024) {
          setCardWidth(310);
          setGap(20);
        } else {
          setCardWidth(325);
          setGap(24);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
    restDelta: 0.001,
  });

  const totalShift = (cardWidth + gap) * (SKELETON_FEATURES.length - 1);
  const xTranslate = useTransform(smoothProgress, [0, 1], [0, -totalShift]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const stepIndex = Math.min(
      SKELETON_FEATURES.length - 1,
      Math.max(0, Math.round(latest * (SKELETON_FEATURES.length - 1)))
    );
    setActiveStep(stepIndex);
  });

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;
    const targetProgress = index / (SKELETON_FEATURES.length - 1);
    const targetScrollY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fafbfc] border-b border-slate-100"
      style={{ height: "300vh" }}
      id="capabilities"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen min-h-[580px] max-h-[1080px] w-full flex flex-col justify-center py-8 sm:py-12 md:py-14 overflow-hidden select-none">
        {/* 1. Header Area */}
        <div className="text-center max-w-3xl mx-auto px-4 shrink-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            One platform. Every intelligent capability.
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto font-normal">
            From autonomous multi-agent studios to generative video, neural audio labs, and
            full-stack website builders.
          </p>
        </div>

        {/* 2. Sliding Cards Track */}
        <div className="relative w-full z-10 overflow-hidden my-auto py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="flex items-center w-max"
            style={{
              paddingLeft: mounted ? `calc(50vw - ${cardWidth / 2}px)` : "1.5rem",
              paddingRight: mounted ? `calc(50vw - ${cardWidth / 2}px)` : "1.5rem",
            }}
          >
            <motion.div
              style={{ x: xTranslate }}
              className="flex items-center will-change-transform"
            >
              {SKELETON_FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                const isCurrent = activeStep === idx;
                const accent = FEATURE_ACCENTS[feature.id] || {
                  ring: "ring-2 ring-indigo-400/40",
                  border: "border-indigo-300",
                  glow: "shadow-lg",
                  badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
                  text: "text-indigo-600",
                };

                return (
                  <div
                    key={feature.id}
                    onClick={() => scrollToStep(idx)}
                    style={{
                      width: `${cardWidth}px`,
                      height: "405px",
                      marginRight: idx === SKELETON_FEATURES.length - 1 ? 0 : `${gap}px`,
                    }}
                    className={`shrink-0 flex flex-col justify-between will-change-transform rounded-3xl bg-white p-5 cursor-pointer transition-all duration-300 ${
                      isCurrent
                        ? `${accent.border} ${accent.ring} ${accent.glow} scale-[1.03] z-20`
                        : "border border-slate-200/85 shadow-xs opacity-75 hover:opacity-100 hover:scale-[1.01] hover:border-slate-300 hover:shadow-md z-10"
                    }`}
                  >
                    {/* CARD TOP: Header with Icon + Title + Subtitle */}
                    <div className="w-full text-left space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${feature.iconBg} ${feature.iconColor}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-[16px] font-bold text-slate-950 tracking-tight leading-none">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-slate-500 font-normal leading-relaxed line-clamp-2 min-h-[38px]">
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* CARD BOTTOM: Wireframe / Skeleton Mockup Container */}
                    <div className="relative w-full h-[250px] rounded-2xl overflow-hidden flex flex-col mt-3">
                      {feature.preview}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureShowcaseSlider;
