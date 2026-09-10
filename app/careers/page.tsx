"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CtaSection from "@/components/sections/cta-section";
import { Search, ArrowUpRight } from "lucide-react";

/* ==========================================================================
   DATA STRUCTURES & CONSTANTS (Pure White & Gray-50 Minimal)
   ========================================================================== */

interface JobRole {
  id: string;
  title: string;
  department:
    | "AI & Machine Learning"
    | "Full-Stack Engineering"
    | "Product & Design"
    | "Go-to-Market";
  location: string;
  type: string;
  shortDesc: string;
  techStack: string[];
}

const JOB_OPENINGS: JobRole[] = [
  {
    id: "ai-research-agentic",
    title: "AI Research Engineer (Agentic Workflows)",
    department: "AI & Machine Learning",
    location: "Remote",
    type: "Full-time",
    shortDesc:
      "Design recursive multi-agent planning frameworks, context pruning heuristics, and autonomous tool-use orchestration at scale.",
    techStack: [
      "PyTorch",
      "vLLM",
      "Triton",
      "LangGraph",
      "CUDA",
      "Python",
      "Vector DBs",
    ],
  },
  {
    id: "sr-fullstack-systems",
    title: "Senior Full-Stack Engineer (Next.js & Systems)",
    department: "Full-Stack Engineering",
    location: "Hybrid (SF) or Remote",
    type: "Full-time",
    shortDesc:
      "Architect sub-second reactive web canvases, streaming server-sent telemetry, and resilient distributed worker pipelines.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Node.js",
      "Redis",
      "Framer Motion",
    ],
  },
  {
    id: "distributed-mlops-engineer",
    title: "Distributed Systems / MLOps Engineer",
    department: "AI & Machine Learning",
    location: "Remote",
    type: "Full-time",
    shortDesc:
      "Scale our multi-region H100 inference infrastructure, autoscaling GPU nodes, and continuous quantization clusters.",
    techStack: [
      "Kubernetes",
      "CUDA",
      "Triton",
      "vLLM",
      "Terraform",
      "Go",
      "Docker",
      "ClickHouse",
    ],
  },
  {
    id: "product-designer-ai",
    title: "Product Designer (AI Interactions)",
    department: "Product & Design",
    location: "Remote",
    type: "Full-time",
    shortDesc:
      "Invent new visual languages for non-deterministic AI outputs, confidence visualizers, and human-in-the-loop steering.",
    techStack: [
      "Figma",
      "Design Systems",
      "Prototyping",
      "Design Tokens",
      "CSS/HTML",
      "Motion Design",
    ],
  },
  {
    id: "growth-devrel-lead",
    title: "Growth & Developer Relations Lead",
    department: "Go-to-Market",
    location: "Remote",
    type: "Full-time",
    shortDesc:
      "Champion Rivinity across global AI hacker communities, produce world-class reference architectures, and accelerate adoption.",
    techStack: [
      "Technical Writing",
      "TypeScript",
      "Python",
      "Community Building",
      "GitHub",
      "Discord",
    ],
  },
];

// Values cards: Left side is text, Right side is interactive shape (Sunburst, Circle, Upward Arrow, Hex Flower)
const VALUES = [
  {
    title: "Signal Over Noise",
    desc: "We prioritize raw empirical throughput, reproducible benchmarks, and radical focus. No vanity metrics or cosmetic demos; only relentless engineering velocity that holds up in production.",
    shape: "sunburst" as const,
  },
  {
    title: "Joyful by Design",
    desc: "Developer tooling should feel tactile, fast, and exhilarating. We obsess over milliseconds of latency, subtle micro-interactions, and intuitive mental models that turn complex tasks into effortless flow.",
    shape: "circle" as const,
  },
  {
    title: "Less Chaos, More Clarity",
    desc: "High autonomy demands radical transparency. Clear architecture decision records, written debriefs, and crisp API contracts replace bureaucratic meetings and organizational sprawl.",
    shape: "arrow" as const,
  },
  {
    title: "Compute First",
    desc: "Never bottleneck curiosity on infrastructure. Every engineer has immediate provisioning rights to multi-node H100 clusters, synthetic data pipelines, and distributed benchmark harnesses.",
    shape: "flower" as const,
  },
];

// Section 3: 4 Vertical Oval Cards (Image 2 style)
interface OvalSystem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
}

const OVAL_SYSTEMS: OvalSystem[] = [
  {
    id: "rag",
    title: "RAG & Vector Pipelines",
    subtitle: "Retrieval Core",
    desc: "Sub-20ms hybrid dense-sparse vector indexing & semantic cache layers.",
  },
  {
    id: "adaptation",
    title: "Fine-Tuning & Adaptation",
    subtitle: "Model Specialization",
    desc: "Automated weight quantization & high-rank LoRA adapter dispatch at scale.",
  },
  {
    id: "latency",
    title: "Latency Optimization",
    subtitle: "Kernel Serving",
    desc: "Custom Triton kernel fusion, continuous batching & chunked prefill routines.",
  },
  {
    id: "evals",
    title: "Evals & Red-Teaming",
    subtitle: "Integrity & Safety",
    desc: "Cryptographic trace logs, real-time jailbreak guardrails & deterministic gates.",
  },
];

// Hiring Roadmap: Design of Image 2 (Gradients: Orange/White, Purple/White, Green/White, Pink/White, No Extra Space)
interface HiringStep {
  num: string;
  step: string;
  title: string;
  duration: string;
  desc: string;
  gradientClass: string;
  numColor: string;
  badgeBg: string;
  bulletColor: string;
  notchPosition?: "high" | "low";
  notchFill?: string;
  highlights: string[];
}

const HIRING_STEPS: HiringStep[] = [
  {
    num: "1",
    step: "01",
    title: "Exploratory Chat",
    duration: "30 Mins",
    desc: "Unscripted conversation with our founders or engineering leads. We align on mutual ambitions, technical interests, and team culture.",
    gradientClass:
      "bg-gradient-to-b from-orange-100/90 via-orange-50/50 to-white",
    numColor: "!text-orange-950",
    badgeBg: "bg-orange-500/10 text-orange-900 border-orange-200/80",
    bulletColor: "text-orange-600",
    notchPosition: "high",
    notchFill: "#fed7aa",
    highlights: [
      "Founder & Lead Engineer sync",
      "Team culture & vision alignment",
      "Open Q&A on technical roadmap",
    ],
  },
  {
    num: "2",
    step: "02",
    title: "Deep Dive & Architecture",
    duration: "60 Mins",
    desc: "Collaborative session on realistic systems: high-concurrency model routing or streaming agent state. Zero trick trivia.",
    gradientClass:
      "bg-gradient-to-b from-purple-100/90 via-purple-50/50 to-white",
    numColor: "!text-purple-950",
    badgeBg: "bg-purple-500/10 text-purple-900 border-purple-200/80",
    bulletColor: "text-purple-600",
    notchPosition: "high",
    notchFill: "#e9d5ff",
    highlights: [
      "Real-world systems problem",
      "Interactive pair whiteboarding",
      "Zero algorithmic puzzle trivia",
    ],
  },
  {
    num: "3",
    step: "03",
    title: "Async Paid Spike",
    duration: "Compensated",
    desc: "A take-home technical challenge reflecting day-to-day problems. Fully compensated to respect your craftsmanship and time.",
    gradientClass:
      "bg-gradient-to-b from-emerald-100/90 via-emerald-50/50 to-white",
    numColor: "!text-emerald-950",
    badgeBg: "bg-emerald-500/10 text-emerald-900 border-emerald-200/80",
    bulletColor: "text-emerald-600",
    notchPosition: "high",
    notchFill: "#a7f3d0",
    highlights: [
      "Asynchronous & flexible schedule",
      "100% paid for your engineering time",
      "Reflects real day-to-day work",
    ],
  },
  {
    num: "4",
    step: "04",
    title: "The Transparent Offer",
    duration: "48 Hours",
    desc: "Prompt decisions with fully open salary and equity bands, benchmarked against top industry tiers. No exploding deadlines.",
    gradientClass: "bg-gradient-to-b from-pink-100/90 via-rose-50/50 to-white",
    numColor: "!text-pink-950",
    badgeBg: "bg-pink-500/10 text-pink-900 border-pink-200/80",
    bulletColor: "text-pink-600",
    highlights: [
      "Decision window within 48 hours",
      "Transparent salary & equity bands",
      "No high-pressure exploding offers",
    ],
  },
];

const CATEGORIES = [
  "All Roles",
  "AI & Machine Learning",
  "Full-Stack Engineering",
  "Product & Design",
  "Go-to-Market",
] as const;

/* ==========================================================================
   INTERACTIVE GRADIENT SHAPES (Orange, Pink, Purple, and Fuchsia/Magenta)
   Each shape has unique interactive hover states and fluid micro-animations
   ========================================================================== */

function ShapeSunburst() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
      {/* Soft atmospheric ambient glow that brightens on hover */}
      <div className="absolute inset-1 rounded-full bg-orange-500/25 blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 transition-all duration-600 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:rotate-45 group-hover:scale-110 drop-shadow-[0_4px_14px_rgba(249,115,22,0.25)] group-hover:drop-shadow-[0_12px_28px_rgba(234,88,12,0.45)] cursor-pointer"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sunGrad" x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="40%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        <path
          d="M 45.60 11.08 Q 50.00 5.00 54.40 11.08 Q 58.80 17.16 65.65 14.09 Q 72.50 11.03 73.27 18.49 Q 74.04 25.96 81.51 26.73 Q 88.97 27.50 85.91 34.35 Q 82.84 41.20 88.92 45.60 Q 95.00 50.00 88.92 54.40 Q 82.84 58.80 85.91 65.65 Q 88.97 72.50 81.51 73.27 Q 74.04 74.04 73.27 81.51 Q 72.50 88.97 65.65 85.91 Q 58.80 82.84 54.40 88.92 Q 50.00 95.00 45.60 88.92 Q 41.20 82.84 34.35 85.91 Q 27.50 88.97 26.73 81.51 Q 25.96 74.04 18.49 73.27 Q 11.03 72.50 14.09 65.65 Q 17.16 58.80 11.08 54.40 Q 5.00 50.00 11.08 45.60 Q 17.16 41.20 14.09 34.35 Q 11.03 27.50 18.49 26.73 Q 25.96 25.96 26.73 18.49 Q 27.50 11.03 34.35 14.09 Q 41.20 17.16 45.60 11.08 Z"
          fill="url(#sunGrad)"
        />
      </svg>
    </div>
  );
}

function ShapeCircle() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
      {/* Expanding concentric pink ripple ring on hover */}
      <div className="absolute inset-1 rounded-full border-2 border-pink-300/60 scale-90 opacity-0 group-hover:scale-125 group-hover:opacity-80 transition-all duration-700 ease-out pointer-events-none" />
      {/* Soft atmospheric ambient glow */}
      <div className="absolute inset-1 rounded-full bg-pink-500/25 blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-110 drop-shadow-[0_4px_14px_rgba(236,72,153,0.25)] group-hover:drop-shadow-[0_12px_28px_rgba(236,72,153,0.45)] cursor-pointer"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circleGrad" x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="45%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#circleGrad)" />
      </svg>
    </div>
  );
}

function ShapeArrow() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
      {/* Ground elevation shadow that softens when arrow levitates */}
      <div className="absolute bottom-2 w-16 h-3 rounded-full bg-purple-600/20 blur-sm scale-100 group-hover:scale-75 group-hover:opacity-40 transition-all duration-400 pointer-events-none" />
      {/* Soft atmospheric ambient glow */}
      <div className="absolute inset-1 rounded-full bg-purple-500/25 blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 transition-all duration-400 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:-translate-y-3 group-hover:scale-105 drop-shadow-[0_4px_14px_rgba(139,92,246,0.25)] group-hover:drop-shadow-[0_14px_30px_rgba(124,58,237,0.45)] cursor-pointer"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arrowGrad" x1="15%" y1="85%" x2="85%" y2="15%">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="45%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path
          d="M 50 13
             C 54 13 57 16 60 19
             L 87 49
             C 92 54 88 61 81 61
             L 68 61
             L 68 82
             C 68 87 64 90 59 90
             L 41 90
             C 36 90 32 87 32 82
             L 32 61
             L 19 61
             C 12 61 8 54 13 49
             L 40 19
             C 43 16 46 13 50 13 Z"
          fill="url(#arrowGrad)"
        />
      </svg>
    </div>
  );
}

function ShapeFlower() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
      {/* Soft atmospheric ambient glow */}
      <div className="absolute inset-1 rounded-full bg-fuchsia-500/25 blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 transition-all duration-600 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:rotate-60 group-hover:scale-110 drop-shadow-[0_4px_14px_rgba(217,70,239,0.25)] group-hover:drop-shadow-[0_14px_28px_rgba(217,70,239,0.45)] cursor-pointer"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flowerGrad" x1="15%" y1="85%" x2="85%" y2="15%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M 32.22 27.31 Q 39.00 30.95 39.24 23.26 Q 39.47 15.57 44.74 9.79 Q 50.00 4.00 55.26 9.79 Q 60.53 15.57 60.76 23.26 Q 61.00 30.95 67.78 27.31 Q 74.55 23.67 82.19 25.34 Q 89.84 27.00 87.46 34.45 Q 85.08 41.90 78.54 45.95 Q 72.00 50.00 78.54 54.05 Q 85.08 58.10 87.46 65.55 Q 89.84 73.00 82.19 74.66 Q 74.55 76.33 67.78 72.69 Q 61.00 69.05 60.76 76.74 Q 60.53 84.43 55.26 90.21 Q 50.00 96.00 44.74 90.21 Q 39.47 84.43 39.24 76.74 Q 39.00 69.05 32.22 72.69 Q 25.45 76.33 17.81 74.66 Q 10.16 73.00 12.54 65.55 Q 14.92 58.10 21.46 54.05 Q 28.00 50.00 21.46 45.95 Q 14.92 41.90 12.54 34.45 Q 10.16 27.00 17.81 25.34 Q 25.45 23.67 32.22 27.31 Z"
          fill="url(#flowerGrad)"
        />
      </svg>
    </div>
  );
}

/* ==========================================================================
   MAIN CAREERS PAGE COMPONENT (Simple, Pure White & Gray-50)
   ========================================================================== */

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Roles");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered job openings
  const filteredJobs = useMemo(() => {
    return JOB_OPENINGS.filter((job) => {
      const matchesCategory =
        selectedCategory === "All Roles" || job.department === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        job.title.toLowerCase().includes(query) ||
        job.shortDesc.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen text-gray-900 font-sans antialiased">
      {/* Site Global Header (preserved) */}
      <Header />

      {/* Main Careers Content */}
      <main className="section w-full relative overflow-x-clip  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================================================================
              SECTION 1: HERO BANNER & METRICS BENTO (Pure White & Gray-50)
              ================================================================ */}
          <section className="section section-hero text-center relative pt-4">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              {/* Headline: Clean black text */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.1] mb-6">
                Build autonomous systems. Push frontier models to reality.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mb-8">
                We are engineering the orchestration layer for agentic
                intelligence. High runway, tier-1 compute access, and a lean
                15-person core team shipping code straight into production.
              </p>

              {/* CTA Buttons (Clean text-only or single action, no conflicting number/icon) */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="text-white">
                  <a
                    href="#open-positions"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gray-950 text-sm font-semibold hover:bg-black transition-colors"
                  >
                    Explore Open Positions
                  </a>
                </div>

                <a
                  href="#core-values"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white text-gray-800 text-sm font-semibold border border-gray-200 shadow-xs hover:bg-gray-50 transition-colors"
                >
                  Our Engineering Principles
                </a>
              </div>
            </div>

            {/* Hero Metrics Bento Grid: 3 Cards using Capsule Gradient Design (Image 1 style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 sm:mt-26 text-left">
              {/* Card 1: Orange & White Gradient */}
              <div className="relative rounded-3xl sm:rounded-[32px] bg-white border border-gray-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
                {/* Top: Stadium Capsule Graphic */}
                <div className="py-6 sm:py-8 flex items-center justify-center">
                  <div className="relative w-44 sm:w-52 h-14 sm:h-16 rounded-full overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_25px_-8px_rgba(255,107,0,0.35)] border border-orange-200/60 bg-[#FF6B00]">
                    {/* Layered fluid mesh & white highlights */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF5500] via-[#FF8A3D] to-[#FFAA6C]" />
                    <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/85 blur-md" />
                    <div className="absolute top-1 right-2 w-32 h-20 rounded-full bg-[#FF4500] blur-sm opacity-90" />
                    <div className="absolute -bottom-6 left-1/3 w-36 h-20 rounded-full bg-white/95 blur-md" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
                  </div>
                </div>

                {/* Bottom: Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-2 tracking-tight">
                    Frontier Compute
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Dedicated multi-node GPU clusters available for your custom
                    model evaluations, synthetic generation, and experiments.
                  </p>
                </div>
              </div>

              {/* Card 2: Purple & White Gradient */}
              <div className="relative rounded-3xl sm:rounded-[32px] bg-white border border-gray-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
                {/* Top: Stadium Capsule Graphic */}
                <div className="py-6 sm:py-8 flex items-center justify-center">
                  <div className="relative w-44 sm:w-52 h-14 sm:h-16 rounded-full overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_25px_-8px_rgba(139,92,246,0.35)] border border-purple-200/60 bg-[#8B5CF6]">
                    {/* Layered fluid mesh & white highlights */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]" />
                    <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/85 blur-md" />
                    <div className="absolute top-1 right-2 w-32 h-20 rounded-full bg-[#6D28D9] blur-sm opacity-90" />
                    <div className="absolute -bottom-6 left-1/3 w-36 h-20 rounded-full bg-white/95 blur-md" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
                  </div>
                </div>

                {/* Bottom: Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-2 tracking-tight">
                    High Autonomy
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Zero management bureaucracy. You own entire systems
                    end-to-end with direct deployment rights and instant
                    feedback loops.
                  </p>
                </div>
              </div>

              {/* Card 3: Pink & White Gradient */}
              <div className="relative rounded-3xl sm:rounded-[32px] bg-white border border-gray-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
                {/* Top: Stadium Capsule Graphic */}
                <div className="py-6 sm:py-8 flex items-center justify-center">
                  <div className="relative w-44 sm:w-52 h-14 sm:h-16 rounded-full overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_25px_-8px_rgba(236,72,153,0.35)] border border-pink-200/60 bg-[#EC4899]">
                    {/* Layered fluid mesh & white highlights */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#DB2777] via-[#F472B6] to-[#FBCFE8]" />
                    <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/85 blur-md" />
                    <div className="absolute top-1 right-2 w-32 h-20 rounded-full bg-[#BE185D] blur-sm opacity-90" />
                    <div className="absolute -bottom-6 left-1/3 w-36 h-20 rounded-full bg-white/95 blur-md" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
                  </div>
                </div>

                {/* Bottom: Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-2 tracking-tight">
                    Global & Transparent
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Remote-first with competitive global salaries, transparent
                    equity bands, full healthcare, and quarterly team retreats.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 2: CORE VALUES (Bento Cards with NUMBERS -> NO ICONS!)
              ================================================================ */}
          <section id="core-values" className="section-sm scroll-mt-32">
            <div className="flex flex-col mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                Engineering Principles
              </h2>
              <div className="text-sm text-gray-600 max-w-5xl">
                We craft mission-critical infrastructure. These principles guide
                our technical architecture, code reviews, and everyday
                decisions.
              </div>
            </div>

            {/* 4-Card Grid: Left text, Right interactive 4 shapes from Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map((val) => (
                <div
                  key={val.title}
                  className="group relative rounded-3xl sm:rounded-[32px] bg-white border border-gray-200/90 p-6 sm:p-8 shadow-xs hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-row items-center justify-between gap-4 sm:gap-6 overflow-hidden cursor-default"
                >
                  {/* Left: Text */}
                  <div className="flex-1 text-left z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2.5 group-hover:text-black transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  {/* Right: Shape with Hover Animation */}
                  <div className="shrink-0 flex items-center justify-center z-10">
                    {val.shape === "sunburst" && <ShapeSunburst />}
                    {val.shape === "circle" && <ShapeCircle />}
                    {val.shape === "arrow" && <ShapeArrow />}
                    {val.shape === "flower" && <ShapeFlower />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
              SECTION 3: HOW WE ENGINEER SYSTEMS (4 Oval Cards - Image 2 Style)
              ================================================================ */}
          <section id="philosophy" className="section-sm scroll-mt-32">
            <div className="p-8 sm:p-12">
              {/* Section Header */}
              <div className="max-w-2xl mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-3">
                  How We Engineer Systems
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  High-throughput retrieval, kernel fusion, and deterministic
                  evals architected from first principles.
                </p>
              </div>

              {/* 4 Vertical Oval Cards (Image 2 Design in Light Theme, No Arrows, No Numbering, Uniform Style, Hover: Bigger) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
                {OVAL_SYSTEMS.map((card) => (
                  <div
                    key={card.id}
                    className="relative rounded-[9999px] min-h-[450px] sm:min-h-[480px] pt-12 sm:pt-14 pb-8 sm:pb-10 px-6 sm:px-7 flex flex-col justify-between items-center text-center transition-all duration-300 ease-out hover:scale-105 cursor-pointer select-none bg-gray-50/70 hover:bg-white border border-gray-200/90 hover:border-gray-300 text-gray-950 shadow-xs hover:shadow-md"
                  >
                    {/* Upper/Center Content: Title + Subtitle */}
                    <div className="my-auto py-4 space-y-2.5 max-w-[190px]">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug !text-gray-950">
                        {card.title}
                      </h3>
                      <p className="text-xs font-medium tracking-wide !text-gray-500">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Bottom Content: Divider + Description */}
                    <div className="w-full space-y-4">
                      <div className="w-2/3 mx-auto border-t border-gray-200" />
                      <p className="text-[11px] sm:text-xs leading-relaxed max-w-[175px] mx-auto !text-gray-600">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 4: OPEN POSITIONS (Image 2 Minimalist Rows in Light Theme)
              ================================================================ */}
          <section id="open-positions" className="section scroll-mt-28">
            {/* Centered Pill + Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-3">
                Open Engineering & Design Positions
              </h2>
              <p className="text-sm text-gray-600">
                We are looking for passionate builders. Select any role to apply
                directly via email.
              </p>
            </div>
            {/* Minimalist Rows Table (Image 2 style in Light Theme) */}
            <div className="rounded-3xl bg-white border border-gray-200 p-4 sm:p-8 shadow-xs">
              {filteredJobs.length === 0 ? (
                <div className="py-12 text-center">
                  <h3 className="text-lg font-bold text-gray-950 mb-1">
                    No roles match your search
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                    Try adjusting your query or send a general pitch.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Roles");
                    }}
                    className="text-xs font-semibold text-gray-950 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200/70">
                  {filteredJobs.map((role) => (
                    <a
                      key={role.id}
                      href={`mailto:careers@rivinity.com?subject=Application%20for%20${encodeURIComponent(role.title)}`}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 sm:py-5 px-3 sm:px-4 -mx-2 sm:-mx-3 rounded-xl hover:bg-gray-50/90 transition-all duration-200 cursor-pointer block"
                    >
                      {/* Left: Role Title + Department */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0 pr-4">
                        <h3 className="text-sm sm:text-base font-normal sm:font-medium text-gray-900 group-hover:text-gray-950 transition-colors">
                          {role.title}
                        </h3>
                        <span className="text-xs text-gray-400 font-normal">
                          {role.department}
                        </span>
                      </div>

                      {/* Right: Location + Apply now ↗ */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0 text-xs sm:text-sm">
                        <span className="text-gray-400 sm:text-gray-500 font-normal">
                          {role.location}
                        </span>
                        <span className="font-semibold text-gray-950 flex items-center gap-1 group-hover:text-orange-600 transition-colors">
                          <span>Apply now</span>
                          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ================================================================
              SECTION 5: THE HIRING ROADMAP (Image 2 Contiguous Gradient Design)
              ================================================================ */}
          <section id="roadmap" className="section scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-3">
                The Transparent Roadmap
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Respectful, high-signal, and fast. No LeetCode puzzles, no panel
                fatigue.
              </p>
            </div>

            {/* Contiguous 4-Column Pipeline (Image 2 Design: Edge-to-edge gradients, No blank gaps) */}
            <div className="relative rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 bg-white">
              {HIRING_STEPS.map((step, idx) => (
                <div
                  key={step.title}
                  className={`relative ${step.gradientClass} p-7 sm:p-9 flex flex-col justify-start transition-all duration-200 group`}
                >
                  {/* Arrow Notch pointing into adjacent column on desktop (Image 2 signature chevron) */}
                  {idx < 3 && step.notchFill && (
                    <div className="hidden lg:block absolute -right-3.5 top-[22%] z-20 pointer-events-none drop-shadow-xs">
                      <svg
                        width="14"
                        height="24"
                        viewBox="0 0 14 24"
                        fill="none"
                      >
                        <path d="M0 0L14 12L0 24V0Z" fill={step.notchFill} />
                      </svg>
                    </div>
                  )}

                  {/* Large Bold Display Number (Image 2 Style - No Icons) */}
                  <div className="mb-4">
                    <span
                      className={`font-display text-5xl sm:text-6xl font-extrabold tracking-tight select-none ${step.numColor}`}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold !text-gray-950 mb-2.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm !text-gray-700 leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  {/* Highlights / Signal Checklist */}
                  <div className="space-y-2 pt-4 border-t border-gray-950/10">
                    {step.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start text-xs !text-gray-700 leading-snug"
                      >
                        <span
                          className={`mr-2 font-bold select-none ${step.bulletColor}`}
                        >
                          •
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
              SECTION 6: DYNAMIC CTA SECTION (Standardized CtaSection)
              ================================================================ */}
          <CtaSection
            variant="subpage"
            title="Don't see a perfect match? Pitch your dream role."
            description="We are always eager to meet world-class builders. If you obsess over agentic architectures, low-level systems, or pioneering interface paradigms, tell us what you want to build."
            primaryText="View open roles"
            primaryHref="#open-positions"
            className="section"
          />
        </div>
      </main>

      {/* Site Global Footer (preserved) */}
      <Footer />
    </div>
  );
}
