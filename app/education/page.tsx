"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Brain,
  Bot,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Network,
  BarChart3,
  Zap,
  Clock,
  FileCheck2,
  Lock,
  Check,
  Calendar,
  MessageSquare,
} from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CtaSection from "@/components/sections/cta-section";
import { useAuthModal } from "@/components/auth/auth-context";
import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";

/* ------------------------------------------------------------------ */
/* Mock Data & Types                                                  */
/* ------------------------------------------------------------------ */

interface AgentCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const AGENTS: AgentCard[] = [
  {
    id: "tutor",
    title: "Socratic AI Tutor",
    description:
      "Step-by-step guidance through complex problem sets with adaptive hints.",
    image: "/images/education/agent-yellow.jpg",
  },
  {
    id: "curriculum",
    title: "Curriculum Architect",
    description:
      "Generates accredited syllabi, lesson plans, and exercises in seconds.",
    image: "/images/education/agent-pink.jpg",
  },
  {
    id: "grader",
    title: "Instant Rubric Grader",
    description:
      "Line-by-line feedback and rubric grading for code, essays, and proofs.",
    image: "/images/education/agent-purple.jpg",
  },
  {
    id: "retention",
    title: "Retention Sentinel",
    description:
      "Real-time alerts on student bottlenecks and engagement drops before exams.",
    image: "/images/education/agent-green.jpg",
  },
];

const INSTITUTION_LOGOS = [
  { name: "Stanford AI Lab", initial: "ST" },
  { name: "MIT OpenLearning", initial: "MIT" },
  { name: "Oxford EdTech", initial: "OX" },
  { name: "UC Berkeley", initial: "UCB" },
  { name: "Harvard Innovation Lab", initial: "HAR" },
  { name: "Canvas LMS", initial: "CNV" },
  { name: "Blackboard", initial: "BB" },
  { name: "Moodle", initial: "MDL" },
  { name: "Coursera for Campus", initial: "CRS" },
];

const EDUCATION_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Our faculty saved over 16 hours every week on grading and administrative tasks. Student office hour engagement became 3x more productive, and drop-out rates in introductory STEM classes fell dramatically.",
    name: "Dr. Aris Thorne",
    role: "Dean of Computing & Information Sciences",
    company: "Pacific Institute of Technology",
    avatar: "AT",
    stats: "16 hrs saved / faculty / wk",
    verified: true,
  },
  {
    id: "2",
    quote:
      "The Socratic AI Tutor feels like having 200 patient teaching assistants available at 2 AM. Students receive immediate, personalized conceptual hints without ever having direct answers leaked.",
    name: "Elena Rostova",
    role: "Director of Academic Excellence",
    company: "St. Jude Collegiate University",
    avatar: "ER",
    stats: "38% Drop in Course Withdrawals",
    verified: true,
  },
  {
    id: "3",
    quote:
      "Integrating directly with our Canvas LMS took under 20 minutes. Students love the instant coding feedback, and professors retain 100% control over final rubric grade postings.",
    name: "Prof. Marcus Vance",
    role: "Chair of Engineering Curriculum",
    company: "Metro State University",
    avatar: "MV",
    stats: "99.4% Student Satisfaction",
    verified: true,
  },
  {
    id: "4",
    quote:
      "Strict zero-data-retention and FERPA compliance gave our institutional board complete confidence. Rivinity grounds every single explanation directly within our approved textbooks and lecture slides.",
    name: "David Chen",
    role: "Chief Information Officer",
    company: "Northwest University System",
    avatar: "DC",
    stats: "FERPA & SOC 2 Type II Certified",
    verified: true,
  },
  {
    id: "5",
    quote:
      "The adaptive knowledge graphs helped our pre-med students visualize prerequisite dependencies and master complex biochemistry modules with unprecedented clarity.",
    name: "Dr. Maya Al-Mansoor",
    role: "Clinical Professor of Medicine",
    company: "Emirates College of Health",
    avatar: "MA",
    stats: "+24% Higher Exam Medians",
    verified: true,
  },
  {
    id: "6",
    quote:
      "Teaching assistants no longer burn out answering the same syntax questions repeatedly. They now focus on deep research mentorship, thesis guidance, and creative capstones.",
    name: "Kavita Nair",
    role: "Senior Lecturer in Informatics",
    company: "Singapore Institute of Tech",
    avatar: "KN",
    stats: "3.2x Faster Grading Turnaround",
    verified: true,
  },
];

/* ------------------------------------------------------------------ */
/* Neo-Geometric Architectural Vector Art (Image 2 Style)              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Futuristic 3D Vector Symbols (Matching User Image in Pastel Tones) */
/* ------------------------------------------------------------------ */

/**
 * Symbol 1 (Top-Left in Image): 3D Sphere with Curved Orbital Swoop Ribbon
 * Rendered in soft pastel Orange
 */
function SphereOrbitSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sphereGradOrange" cx="36%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="35%" stopColor="#FDBA74" />
          <stop offset="75%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
        <linearGradient
          id="orbitRibbonBack"
          x1="0.2"
          y1="0.8"
          x2="0.9"
          y2="0.2"
        >
          <stop offset="0%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="orbitRibbonFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="30%" stopColor="#FED7AA" />
          <stop offset="70%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <filter
          id="softShadowOrange"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="4"
            floodColor="#EA580C"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter="url(#softShadowOrange)">
        {/* Rear section of orbital swoop */}
        <path
          d="M 28 68 C 16 66 12 56 26 48 C 42 38 74 36 94 48 C 104 54 102 62 92 68"
          stroke="url(#orbitRibbonBack)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* 3D Sphere */}
        <circle cx="58" cy="58" r="32" fill="url(#sphereGradOrange)" />

        {/* Front section of wrapping spiral / fluid swoop */}
        <path
          d="M 98 46 C 112 54 108 64 92 72 C 70 82 32 86 16 76 C 8 70 12 62 26 56 C 42 50 78 54 94 66"
          fill="url(#orbitRibbonFront)"
        />
        <path
          d="M 24 74 C 40 82 76 80 96 68 C 108 60 106 52 96 46"
          stroke="#FFF7ED"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </g>
    </svg>
  );
}

/**
 * Symbol 2 (Bottom-Right in Image): Interlocking Staggered Rounded Pill Chain Loop
 * Rendered in soft pastel Pink
 */
function StaggeredPillLoopSvg({ className = "" }: { className?: string }) {
  // 6 isometric pill capsules woven into a staggered loop
  const pills = [
    { x: 42, y: 22, rot: -28 },
    { x: 74, y: 24, rot: -28 },
    { x: 26, y: 46, rot: -28 },
    { x: 88, y: 48, rot: -28 },
    { x: 38, y: 72, rot: -28 },
    { x: 70, y: 74, rot: -28 },
  ];

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pillGradPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCE7F3" />
          <stop offset="40%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
        <linearGradient id="pillHighlightPink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0.1" />
        </linearGradient>
        <filter
          id="softShadowPink"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="3.5"
            floodColor="#DB2777"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter="url(#softShadowPink)">
        {pills.map((p, idx) => (
          <g key={idx} transform={`translate(${p.x}, ${p.y}) rotate(${p.rot})`}>
            {/* Pill Body */}
            <rect
              x="-22"
              y="-9"
              width="44"
              height="18"
              rx="9"
              fill="url(#pillGradPink)"
            />
            {/* Top Sheen Highlight */}
            <rect
              x="-18"
              y="-7"
              width="36"
              height="7"
              rx="3.5"
              fill="url(#pillHighlightPink)"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * Symbol 3 (Bottom-Left in Image): 4-Directional Symmetrical Radial Cross Node
 * Rendered in soft pastel Blue
 */
function RadialCrossNodeSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="radialCrossGrad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#DBEAFE" />
          <stop offset="65%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </radialGradient>
        <radialGradient id="lobeGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="45%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
        <filter
          id="softShadowBlue"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="4"
            floodColor="#2563EB"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter="url(#softShadowBlue)">
        {/* 4 Outer Radial Capsule Lobes */}
        {[
          { cx: 34, cy: 34, rx: 17, ry: 9, rot: 45 },
          { cx: 86, cy: 34, rx: 17, ry: 9, rot: -45 },
          { cx: 34, cy: 86, rx: 17, ry: 9, rot: -45 },
          { cx: 86, cy: 86, rx: 17, ry: 9, rot: 45 },
        ].map((lobe, i) => (
          <ellipse
            key={i}
            cx={lobe.cx}
            cy={lobe.cy}
            rx={lobe.rx}
            ry={lobe.ry}
            transform={`rotate(${lobe.rot} ${lobe.cx} ${lobe.cy})`}
            fill="url(#lobeGrad)"
          />
        ))}

        {/* Central 4-pointed Starburst Core */}
        <path
          d="M 60 26 C 60 44 44 60 26 60 C 44 60 60 76 60 94 C 60 76 76 60 94 60 C 76 60 60 44 60 26 Z"
          fill="url(#radialCrossGrad)"
        />

        {/* Soft Center Sheen */}
        <circle cx="60" cy="60" r="10" fill="#FFFFFF" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

/**
 * Symbol 4 (Top-Right in Image): Orbital Ring with Tilted Play Button Slicing Through
 * Rendered in soft pastel Purple
 */
function RingPlaySvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ringTorusGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <linearGradient id="orbitRingSwoop" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F3E8FF" />
          <stop offset="40%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="playBtnGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#D8B4FE" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <filter
          id="softShadowPurple"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="4"
            floodColor="#7E22CE"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter="url(#softShadowPurple)">
        {/* Outer Circular Ring */}
        <circle
          cx="60"
          cy="60"
          r="34"
          stroke="url(#ringTorusGrad)"
          strokeWidth="7"
          fill="none"
        />

        {/* Tilted Angled Ellipse Ring Slicing Through */}
        <ellipse
          cx="60"
          cy="60"
          rx="48"
          ry="11"
          transform="rotate(-34 60 60)"
          stroke="url(#orbitRingSwoop)"
          strokeWidth="6"
          fill="none"
        />

        {/* Tilted Rounded Play Button */}
        <path
          d="M 44 42 C 44 38 48 36 52 38 L 78 54 C 82 56 82 61 78 63 L 52 79 C 48 81 44 79 44 75 Z"
          fill="url(#playBtnGrad)"
          transform="rotate(-15 60 60)"
        />

        {/* Top Rim Sheen */}
        <circle
          cx="60"
          cy="60"
          r="34"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="40 180"
          fill="none"
          strokeOpacity="0.75"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pixel Mosaic Heatmap Grid Art (Matching User Image 1)               */
/* ------------------------------------------------------------------ */

const PIXEL_GRID_MATRIX = [
  [1, 2, 2, 3, 3, 4, 4, 4, 3, 2, 1, 1],
  [1, 1, 2, 3, 4, 5, 5, 5, 4, 3, 2, 1],
  [0, 1, 2, 4, 5, 5, 5, 5, 4, 3, 2, 2],
  [0, 1, 2, 3, 4, 5, 5, 4, 4, 3, 2, 2],
  [0, 1, 1, 2, 3, 4, 4, 3, 3, 2, 2, 1],
  [0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1],
];

const PIXEL_COLOR_PALETTES = {
  orange: ["#FB923C", "#FDBA74", "#FED7AA", "#FFEDD5", "#FFF7ED", "#FFFFFF"],
  pink: ["#F472B6", "#F9A8D4", "#FBCFE8", "#FCE7F3", "#FDF2F8", "#FFFFFF"],
  purple: ["#C084FC", "#D8B4FE", "#E9D5FF", "#F3E8FF", "#FAF5FF", "#FFFFFF"],
};

function PixelHeatGrid({
  color,
  className = "",
}: {
  color: "orange" | "pink" | "purple";
  className?: string;
}) {
  const palette = PIXEL_COLOR_PALETTES[color];
  const cols = 12;
  const rows = 6;
  const cellWidth = 240 / cols;
  const cellHeight = 100 / rows;

  return (
    <svg
      viewBox="0 0 240 100"
      preserveAspectRatio="none"
      className={`w-full h-full block select-none ${className}`}
      aria-hidden="true"
    >
      {PIXEL_GRID_MATRIX.map((row, rIdx) =>
        row.map((val, cIdx) => (
          <rect
            key={`${rIdx}-${cIdx}`}
            x={cIdx * cellWidth}
            y={rIdx * cellHeight}
            width={cellWidth}
            height={cellHeight}
            fill={palette[val]}
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        ))
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function EducationPage() {
  const { openAuth } = useAuthModal();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "annual",
  );

  return (
    <div className="w-full relative overflow-x-clip flex flex-col items-start bg-white text-[#0f172a] selection:bg-orange-100 selection:text-orange-900">
      <Header />

      <main className="w-full pt-20 sm:pt-24 md:pt-28 flex-1 bg-white">
        {/* =========================================================
            SECTION 1: HERO SECTION (Pure White, No Gradients)
        ========================================================= */}
        <section className="relative w-full pt-20 sm:pt-28 pb-12 sm:pb-16 md:pb-24 overflow-hidden bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            {/* Main Headline (Clean solid typography) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0f172a] leading-[1.12] max-w-4xl mx-auto font-display"
            >
              Don’t Let Your Students Wait For Help Ever Again.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Empower colleges, schools, and self-directed learners with 24/7
              Socratic AI tutors, instant rubric grading, adaptive curriculum
              maps, and institutional guardrails.
            </motion.p>

            {/* Dual CTAs (Signature Rivinity CTA Buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => openAuth("signup")}
                style={{ color: "#ffffff" }}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-[#0f172a] hover:bg-slate-800 !text-white text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2"
              >
                <span
                  className="!text-white text-white font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  Deploy Campus Agents
                </span>
                <ArrowUpRight
                  className="w-4 h-4 !text-white text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                  style={{ color: "#ffffff", stroke: "#ffffff" }}
                />
              </button>
              <Link
                href="/contact"
                style={{ color: "#1e293b" }}
                className="w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 !text-slate-800 text-slate-800 text-sm font-semibold tracking-wide shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                <span
                  className="!text-slate-800 text-slate-800 font-semibold"
                  style={{ color: "#1e293b" }}
                >
                  Schedule Institutional Demo
                </span>
                <ArrowUpRight
                  className="w-4 h-4 !text-slate-500 text-slate-500 group-hover:text-slate-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                  style={{ color: "#64748b", stroke: "#64748b" }}
                />
              </Link>
            </motion.div>

            {/* Security & Compliance Highlights
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                <span>FERPA & GDPR Compliant</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#FF6B00]" />
                <span>Zero Student Data Training</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                <span>Instant Canvas & Moodle Sync</span>
              </div>
            </motion.div> */}

            {/* =========================================================
                EDUCATION OS MOCKUP WINDOW (Clean Slate & White Surfaces)
            ========================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-14 sm:mt-16 max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-sm p-2 sm:p-3 text-left"
            >
              {/* Browser / App Titlebar */}
              <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/90 p-2.5 sm:p-3.5 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  <div className="hidden sm:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500">
                    <Lock className="w-3 h-3 text-[#FF6B00]" />
                    <span>rivinity.edu/cs106a/agent-playground</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="hidden md:inline px-2 py-0.5 rounded bg-orange-50 border border-orange-200/80 text-orange-800 text-[11px] font-semibold">
                    FALL SEMESTER 2026
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#FF6B00] flex items-center justify-center text-[10px] text-white font-bold">
                    DR
                  </div>
                </div>
              </div>

              {/* Main OS Mockup Body: Fake Skeleton Design */}
              <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[380px] sm:min-h-[440px]">
                {/* Left Mini Sidebar - Skeleton Design */}
                <div className="hidden md:flex md:col-span-3 border-r border-slate-100 bg-slate-50/50 p-3.5 flex-col justify-between text-xs">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="px-1.5 pt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
                        <span className="font-semibold text-slate-700 text-[13px]">
                          CS 106A
                        </span>
                      </div>
                    </div>

                    {/* Nav Items with Skeletons */}
                    <div className="space-y-1.5">
                      {/* Active Item */}
                      <div className="px-2.5 py-2 rounded-xl bg-white border border-orange-200 shadow-2xs flex items-center justify-between ring-1 ring-orange-400/20">
                        <div className="flex items-center gap-2">
                          <Brain className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <div className="w-20 h-2.5 bg-slate-200 rounded animate-pulse" />
                        </div>
                        <span className="text-[10px] bg-orange-50 text-orange-800 border border-orange-200/70 px-1.5 py-0.5 rounded font-mono font-bold">
                          92%
                        </span>
                      </div>

                      {/* Nav Item 2 */}
                      <div className="px-2.5 py-2 rounded-xl text-slate-500 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <div className="w-24 h-2.5 bg-slate-200/80 rounded animate-pulse" />
                        </div>
                        <div className="w-7 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>

                      {/* Nav Item 3 */}
                      <div className="px-2.5 py-2 rounded-xl text-slate-500 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                          <div className="w-20 h-2.5 bg-slate-200/80 rounded animate-pulse" />
                        </div>
                        <div className="w-5 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>

                      {/* Nav Item 4 */}
                      <div className="px-2.5 py-2 rounded-xl text-slate-500 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                          <div className="w-22 h-2.5 bg-slate-200/80 rounded animate-pulse" />
                        </div>
                        <div className="w-8 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Bottom Skeleton Status */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                        <Zap className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
                        <span>Academic Agent</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="w-full h-2 bg-slate-200 rounded animate-pulse" />
                      <div className="w-4/5 h-2 bg-slate-200/70 rounded animate-pulse" />
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-[#FF6B00] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Right Main Stage - Skeleton Grid Design */}
                <div className="col-span-12 md:col-span-9 p-4 sm:p-6 flex flex-col justify-between bg-white">
                  {/* Top Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-44 sm:w-60 h-3.5 sm:h-4 bg-slate-200 rounded-md animate-pulse" />
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 font-medium">
                          240 Students
                        </span>
                      </div>
                      <div className="w-56 sm:w-72 h-2.5 bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-orange-800 font-medium bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/70">
                      <span>Canvas 2-Way Sync</span>
                    </div>
                  </div>

                  {/* Skeleton 2x2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                    {/* Grid Cell 1: Adaptive Knowledge Graph */}
                    <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                          <Brain className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <div className="w-18 h-4 rounded-full bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200/70 flex items-center justify-center">
                          92% Graph
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-4/5 h-3 bg-slate-200/90 rounded animate-pulse" />
                        <div className="w-3/5 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-slate-300 rounded-full" />
                      </div>
                    </div>

                    {/* Grid Cell 2: Socratic Reasoning Engine */}
                    <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <div className="w-18 h-4 rounded-full bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200/70 flex items-center justify-center">
                          28ms TTFT
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-5/6 h-3 bg-slate-200/90 rounded animate-pulse" />
                        <div className="w-1/2 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-slate-300 rounded-full" />
                      </div>
                    </div>

                    {/* Grid Cell 3: Rubric Assessment & Grading (Subtle Orange Accent Highlight) */}
                    <div className="bg-white border border-orange-200 rounded-xl p-3.5 shadow-2xs space-y-3 ring-1 ring-orange-400/20">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00]" />
                        </div>
                        <div className="w-18 h-4 rounded-full bg-orange-50 text-[10px] font-mono font-bold text-orange-800 border border-orange-200 flex items-center justify-center">
                          84% Current
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-3/4 h-3 bg-slate-200 rounded animate-pulse" />
                        <div className="w-2/3 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>
                      <div className="w-full h-1.5 bg-orange-50 rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-[#FF6B00] rounded-full" />
                      </div>
                    </div>

                    {/* Grid Cell 4: Cohort Retention Analytics */}
                    <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                          <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <div className="w-18 h-4 rounded-full bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200/70 flex items-center justify-center">
                          99.4% Sync
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-4/5 h-3 bg-slate-200/90 rounded animate-pulse" />
                        <div className="w-2/5 h-2 bg-slate-100 rounded animate-pulse" />
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-11/12 h-full bg-slate-300 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Skeleton Rows / Activity Queue */}
                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="w-24 h-2.5 bg-slate-200 rounded animate-pulse" />
                      <div className="w-16 h-2 bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="space-y-1.5 pt-0.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] inline-block" />
                          <div className="w-40 sm:w-56 h-2 bg-slate-200/90 rounded animate-pulse" />
                        </div>
                        <div className="w-14 h-2 bg-slate-200/60 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
                          <div className="w-48 sm:w-64 h-2 bg-slate-200/90 rounded animate-pulse" />
                        </div>
                        <div className="w-12 h-2 bg-slate-200/60 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: BENTO GRID (Image 2 Style - 4 Light-Shaded Geometric Cards)
        ========================================================= */}
        <section className="w-full py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                One Dashboard. Infinite Learning Possibilities.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Everything an academic department needs to deliver
                individualized mastery, automated assessment, and seamless
                curriculum deployment.
              </p>
            </div>

            {/* 2x2 Grid Layout with Compact Height & 3D Icons from User Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Card 1: Knowledge Graphs (Soft Orange - 3D Sphere & Orbit Ribbon) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group min-h-[210px] sm:min-h-[225px]">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug mb-2">
                    Knowledge Graphs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                    Map course syllabi, textbooks, and lecture transcripts into
                    adaptive prerequisite trees.
                  </p>
                </div>

                {/* Bottom Right: 3D Sphere & Orbit Ribbon */}
                <div className="flex items-end justify-end mt-4">
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 -mr-4 -mb-4 sm:-mr-5 sm:-mb-5 pointer-events-none flex items-end justify-end">
                    <SphereOrbitSvg className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Card 2: Stack Integration (Soft Pink - 3D Interlocking Pills) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-pink-200 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group min-h-[210px] sm:min-h-[225px]">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug mb-2">
                    Stack Integration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                    Two-way synchronization with Canvas, Moodle, Blackboard, and
                    campus workspaces.
                  </p>
                </div>

                {/* Bottom Right: 3D Interlocking Pills */}
                <div className="flex items-end justify-end mt-4">
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 -mr-4 -mb-4 sm:-mr-5 sm:-mb-5 pointer-events-none flex items-end justify-end">
                    <StaggeredPillLoopSvg className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Card 3: Rubric Grading (Soft Blue - 3D Radial Cross Node) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group min-h-[210px] sm:min-h-[225px]">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug mb-2">
                    Rubric Grading
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                    Instant constructive critique with AST static analysis and
                    citation validation.
                  </p>
                </div>

                {/* Bottom Right: 3D Radial Cross Node */}
                <div className="flex items-end justify-end mt-4">
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 -mr-4 -mb-4 sm:-mr-5 sm:-mb-5 pointer-events-none flex items-end justify-end">
                    <RadialCrossNodeSvg className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Card 4: Cohort Retention (Soft Purple - 3D Ring with Play Button) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group min-h-[210px] sm:min-h-[225px]">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug mb-2">
                    Cohort Retention
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                    Identify students needing review weeks before exams with
                    automated interventions.
                  </p>
                </div>

                {/* Bottom Right: 3D Ring with Play Button */}
                <div className="flex items-end justify-end mt-4">
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 -mr-4 -mb-4 sm:-mr-5 sm:-mb-5 pointer-events-none flex items-end justify-end">
                    <RingPlaySvg className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: AGENT HIERARCHY TREE (Solid Badges & Colors)
        ========================================================= */}
        <section className="w-full py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                Run Smarter Courses. With Education AI Agents.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Specialized autonomous agents coordinated by a centralized
                academic orchestrator that honors instructor guidelines.
              </p>
            </div>

            {/* 4 Agent Cards in Image 2 Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {AGENTS.map((agent) => {
                return (
                  <div
                    key={agent.id}
                    className="group rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col text-left"
                  >
                    {/* Top Aesthetic Banner with Gentle Blur */}
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100">
                      <Image
                        src={agent.image}
                        alt={agent.title}
                        fill
                        className="object-cover blur-[10px] scale-110 group-hover:scale-115 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 bg-white">
                      {/* Card Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-display tracking-tight">
                        {agent.title}
                      </h3>

                      {/* Minimal Necessary Text */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: WORKFLOW BUILDER
        ========================================================= */}
        {/* =========================================================
            SECTION 4: WORKFLOW ARCHITECTURE & INTEGRATIONS
        ========================================================= */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                Design AI Workflows. Without The Complexity.
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Connect student submissions directly to multi-agent evaluation chains, automated code sandboxes, and campus LMS gradebooks without writing glue code.
              </p>
            </div>

            {/* 3 Pillars Grid (Pixel Grid Flush to Bottom, Left & Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {/* Pillar 1: Visual Course & Quiz Builder (Orange Pixel Grid) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="p-6 sm:p-7 pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                    Visual Course &amp; Quiz Builder
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Build dynamic branching assessments that adjust difficulty based on live student performance. Students receive Socratic hints and step-by-step guidance rather than blunt solutions.
                  </p>
                </div>

                {/* Bottom Pixel Heatmap Grid (Orange - Flush to Bottom/Left/Right) */}
                <div className="w-full h-22 sm:h-26 border-t border-slate-100 mt-auto overflow-hidden">
                  <PixelHeatGrid color="orange" />
                </div>
              </div>

              {/* Pillar 2: Bi-Directional LMS Sync (Pink Pixel Grid) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="p-6 sm:p-7 pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                    Bi-Directional LMS Sync
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Two-way synchronization with Canvas, Moodle, and Blackboard. Student grades, rubric annotations, and participation analytics sync seamlessly with instructor review gates.
                  </p>
                </div>

                {/* Bottom Pixel Heatmap Grid (Pink - Flush to Bottom/Left/Right) */}
                <div className="w-full h-22 sm:h-26 border-t border-slate-100 mt-auto overflow-hidden">
                  <PixelHeatGrid color="pink" />
                </div>
              </div>

              {/* Pillar 3: Strict Hallucination Safeguards (Purple Pixel Grid) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="p-6 sm:p-7 pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                    Strict Hallucination Safeguards
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Constrain models strictly to university textbooks, syllabus guidelines, and verified lecture recordings. Every insight includes traceable provenance citations.
                  </p>
                </div>

                {/* Bottom Pixel Heatmap Grid (Purple - Flush to Bottom/Left/Right) */}
                <div className="w-full h-22 sm:h-26 border-t border-slate-100 mt-auto overflow-hidden">
                  <PixelHeatGrid color="purple" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: TESTIMONIALS (Landing Page Style Master Card)
        ========================================================= */}
        <TestimonialsSection
          title="Don’t Just Take Our Word For It"
          subtitle="Hear how leading provosts, professors, and academic department chairs rely on Rivinity to scale high-touch teaching."
          items={EDUCATION_TESTIMONIALS}
          className="w-full py-16 sm:py-24 bg-white"
        />

        {/* =========================================================
            SECTION 6: PRICING TIERS (Solid Colors, No Gradients)
        ========================================================= */}
        <section className="w-full py-12 sm:py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                Fair Pricing. No Funny Business.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Predictable plans designed for independent teachers, growing
                departments, and university-wide deployments.
              </p>
            </div>

            {/* Monthly / Yearly Toggle (Image 1 Style) */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#EEF2F6] border border-slate-200/80 mb-12 shadow-2xs">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  billingPeriod === "monthly"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  billingPeriod === "annual"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Yearly</span>
                <span className="text-xs font-semibold text-[#FF6B00] bg-[#FFF4EC] px-2.5 py-0.5 rounded-full border border-orange-100/70">
                  Up to 20% off
                </span>
              </button>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left items-stretch">
              {/* Plan 1: Individual Educator */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Individual Educator
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For individual professors, instructors, and tutors teaching
                    single courses.
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {billingPeriod === "annual" ? "$19" : "$24"}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">/ month</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Up to 150 enrolled students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>24/7 Socratic AI Tutor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Basic Rubric Autograder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>CSV & Grade export</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/signup"
                  className="mt-8 w-full py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold text-center block transition-colors shadow-2xs"
                >
                  Start 14-Day Trial
                </Link>
              </div>

              {/* Plan 2: Department & Campus (Orange Accent) */}
              <div className="rounded-3xl border-2 border-orange-400 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-xl relative ring-4 ring-orange-400/10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#FF6B00] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
                  Most Popular
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Department & Campus
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For academic departments, multi-faculty teams, and degree
                    programs.
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {billingPeriod === "annual" ? "$79" : "$99"}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">
                      / month / department
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span className="font-semibold text-slate-900">
                        Unlimited students & courses
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Direct 2-Way Canvas & Moodle Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>All 4 Autonomous Academic Agents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Adaptive Knowledge Graph generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Predictive Student Retention alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>FERPA & GDPR BAA Agreement</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="mt-8 w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white text-xs font-bold text-center block transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Deploy Department Agents
                </button>
              </div>

              {/* Plan 3: University Enterprise */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    University System
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For campus-wide rollouts, state systems, and research
                    institutions.
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      Custom
                    </span>
                    <span className="text-xs text-slate-500 ml-1">
                      / annual agreement
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Campus-wide SSO & SAML (Okta, Shibboleth)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Dedicated private cloud VPC deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Custom fine-tuned academic models</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Dedicated EdTech Solution Architect</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>Custom SLA with 99.99% uptime guarantee</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 w-full py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold text-center block transition-colors shadow-2xs"
                >
                  Contact Institutional Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Footer Dynamic CTA Section */}
        <CtaSection
          title="Bring frontier AI systems to your academic institution"
          description="Empower students, professors, and lab researchers with dedicated compute sandboxes, automated grading, and collaborative AI workspaces."
          buttonText="Request Campus Access"
          buttonHref="/contact"
          secondaryText="Schedule Department Demo"
          secondaryHref="/contact"
        />
      </main>

      <Footer />
    </div>
  );
}
