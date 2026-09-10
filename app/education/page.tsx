"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Brain,
  Bot,
  CheckCircle2,
  ArrowRight,
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
import { TestimonialsSection, type TestimonialItem } from "@/components/sections/testimonials-section";

/* ------------------------------------------------------------------ */
/* Mock Data & Types                                                  */
/* ------------------------------------------------------------------ */

interface AgentCard {
  id: string;
  title: string;
  role: string;
  badge: string;
  description: string;
  metrics: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  samplePrompt: string;
  theme: "orange";
}

const AGENTS: AgentCard[] = [
  {
    id: "tutor",
    title: "Socratic AI Tutor",
    role: "24/7 Personalized Student Guide",
    badge: "Active • Sub-40ms",
    description:
      "Guides students step-by-step through complex problem sets using Socratic dialogue without revealing direct answers prematurely.",
    metrics: "94% Concept Retention",
    icon: Brain,
    tags: ["STEM & Humanities", "LaTeX & Code", "Adaptive Hinting"],
    samplePrompt: "Explain Dijkstra's algorithm step-by-step using an intuitive city subway network analogy.",
    theme: "orange",
  },
  {
    id: "curriculum",
    title: "Curriculum Architect",
    role: "Syllabus & Problem-Set Generator",
    badge: "Accredited Standards",
    description:
      "Synthesizes 16-week semester syllabi, interactive lesson plans, coding exercises, and lecture slide outlines in seconds.",
    metrics: "12x Faster Course Prep",
    icon: BookOpen,
    tags: ["ABET / AACSB Ready", "Custom Rubrics", "Prerequisite Mapping"],
    samplePrompt: "Generate a 4-week module on Distributed Consensus algorithms with weekly lab challenges.",
    theme: "orange",
  },
  {
    id: "grader",
    title: "Instant Rubric Grader",
    role: "Automated Feedback & AST Analysis",
    badge: "Canvas & Moodle Synced",
    description:
      "Evaluates student code, essays, and mathematical proofs against instructor rubrics with actionable, line-by-line feedback.",
    metrics: "99.2% Rubric Alignment",
    icon: FileCheck2,
    tags: ["AST Code Testing", "Plagiarism Defense", "Formative Critique"],
    samplePrompt: "Analyze this Python sorting algorithm for edge cases and time complexity adherence.",
    theme: "orange",
  },
  {
    id: "retention",
    title: "Retention Sentinel",
    role: "Early Warning & Student Care",
    badge: "Predictive Analytics",
    description:
      "Tracks engagement drops and comprehension bottlenecks in real-time, proactively alerting teaching assistants before exams.",
    metrics: "+38% Course Completion",
    icon: BarChart3,
    tags: ["Bottleneck Alerts", "Intervention Flags", "Cohort Trends"],
    samplePrompt: "Flag students struggling with Week 3 Recursion and draft individualized review material.",
    theme: "orange",
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
/* Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function EducationPage() {
  const { openAuth } = useAuthModal();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");

  return (
    <div className="w-full relative overflow-x-clip flex flex-col items-start bg-white text-[#0f172a] selection:bg-orange-100 selection:text-orange-900">
      <Header />

      <main className="w-full bg-white">
        {/* =========================================================
            SECTION 1: HERO SECTION (Pure White, No Gradients)
        ========================================================= */}
        <section className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-24 overflow-hidden bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            {/* Pill Tag with Solid Orange Dot */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 mb-6 shadow-2xs"
            >
            </motion.div>

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
              Empower colleges, schools, and self-directed learners with 24/7 Socratic AI tutors, instant rubric grading, adaptive curriculum maps, and institutional guardrails.
            </motion.p>

            {/* Dual CTAs (Solid Signature Buttons, No Gradients) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => openAuth("signup")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF6B00] hover:bg-[#E66000] text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Deploy Campus Agents</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-sm font-semibold tracking-wide shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#FF6B00]" />
                <span>Schedule Institutional Demo</span>
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
                    <span>rivinity.edu/cs106a/agent-studio</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="hidden md:inline px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-semibold">
                    FALL SEMESTER 2026
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#FF6B00] flex items-center justify-center text-[10px] text-white font-bold">
                    DR
                  </div>
                </div>
              </div>

              {/* Main OS Mockup Body */}
              <div className="rounded-xl border border-slate-200/70 bg-white overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[380px] sm:min-h-[440px]">
                {/* Left Mini Sidebar */}
                <div className="hidden md:flex md:col-span-3 border-r border-slate-100 bg-slate-50/40 p-3 flex-col justify-between text-xs">
                  <div className="space-y-4">
                    <div className="px-2 pt-1 font-semibold text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
                        <span>CS 106A Studio</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-800 rounded font-mono font-medium border border-orange-200/60">
                        LIVE
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="px-2 py-1.5 rounded-lg bg-white border border-orange-200 text-orange-900 font-medium flex items-center justify-between shadow-2xs">
                        <span className="flex items-center gap-2">
                          <Brain className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Knowledge Graph</span>
                        </span>
                        <span className="text-[10px] bg-orange-50 px-1.5 py-0.5 rounded text-orange-800 font-mono font-bold">
                          92%
                        </span>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-orange-50/60 hover:text-orange-800 flex items-center gap-2 cursor-pointer transition-colors">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>Socratic Tutor</span>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-orange-50/60 hover:text-orange-800 flex items-center gap-2 cursor-pointer transition-colors">
                        <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Rubric Grader</span>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-orange-50/60 hover:text-orange-800 flex items-center gap-2 cursor-pointer transition-colors">
                        <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Cohort Retention</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-orange-50/70 border border-orange-200/60 space-y-1">
                    <div className="text-[11px] font-bold text-orange-900 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
                      <span>Academic Agent Active</span>
                    </div>
                    <p className="text-[10px] text-orange-700/90 leading-tight">
                      Orchestrator routed 4,120 queries with 0% hallucination today.
                    </p>
                  </div>
                </div>

                {/* Right Main Stage */}
                <div className="col-span-12 md:col-span-9 p-4 sm:p-6 flex flex-col justify-between bg-white">
                  {/* Top Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>Module 4: Graph Theory & Heuristic Search</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          240 Students Enrolled
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Interactive Socratic tutor active with textbook groundings
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-orange-800 font-medium bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                      <span>Canvas 2-Way Sync Active</span>
                    </div>
                  </div>

                  {/* Split Visual Interactive Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
                    {/* Visual Concept Nodes */}
                    <div className="lg:col-span-6 space-y-2.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Adaptive Prerequisite Mastery</span>
                        <span className="text-[#FF6B00] font-mono text-[11px] font-bold">88% Cohort Average</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-white rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                            <span className="font-medium text-slate-800">1. Graph Traversal (BFS & DFS)</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-500">100%</span>
                        </div>

                        <div className="p-2 bg-white rounded-lg border border-orange-300 shadow-2xs flex items-center justify-between ring-1 ring-orange-400/25">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#FF6B00] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                              ★
                            </div>
                            <span className="font-semibold text-slate-900">2. A* Search & Admissible Heuristics</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#FF6B00]">84% Current</span>
                        </div>

                        <div className="p-2 bg-white rounded-lg border border-slate-200/60 flex items-center justify-between text-slate-400">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                            <span>3. Minimax & Alpha-Beta Pruning</span>
                          </div>
                          <span className="text-[10px] font-mono">Unlocks Thu</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Socratic Tutor Box */}
                    <div className="lg:col-span-6 bg-[#0f172a] text-slate-100 rounded-xl p-3.5 font-mono text-xs flex flex-col justify-between shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                          <Bot className="w-3.5 h-3.5" />
                          <span>Rivinity Socratic Tutor</span>
                        </span>
                        <span className="text-[10px] text-slate-500">Latency: 28ms</span>
                      </div>

                      <div className="space-y-2 py-2 text-[11px]">
                        <div className="bg-slate-800/80 p-2 rounded text-slate-300 border border-slate-700/60">
                          <span className="text-slate-200 font-bold">Student:</span> "Why does my heuristic overestimate the distance in Manhattan grid search?"
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded text-slate-300 border border-slate-800 space-y-1">
                          <span className="text-orange-300 font-bold">Tutor:</span> Remember: for A* to guarantee optimality, your heuristic must be admissible:{" "}
                          <span className="text-orange-200 bg-orange-950/60 px-1 rounded">h(n) ≤ h*(n)</span>. Did you account for diagonal steps?
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                        <span>Rubric: Admissibility Verified</span>
                        <span className="text-orange-400">✓ No Solution Leaked</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tool Sync Bar */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="font-medium text-slate-600">
                      Connected to Stanford CS Course Repo • Auto-grades on git push
                    </span>
                    <span className="text-[#FF6B00] font-semibold cursor-pointer hover:underline">
                      View Full Lecture Workflow →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: LOGO SOCIAL PROOF MARQUEE
        ========================================================= */}
        <section className="w-full py-12 border-y border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-8">
              Empowering top universities, accredited colleges & edtech leaders
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-75 hover:opacity-100 transition-opacity">
              {INSTITUTION_LOGOS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-slate-500 font-semibold text-sm sm:text-base hover:text-slate-900 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                    {item.initial}
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: BENTO GRID (Clean Solid Highlights, No Gradients)
        ========================================================= */}
        <section className="w-full py-12 sm:py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                One Dashboard. Infinite Learning Possibilities.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Everything an academic department needs to deliver individualized mastery, automated assessment, and seamless curriculum deployment.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Adaptive Knowledge Graph & Pathing (Orange Accent) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:border-orange-300 transition-all group shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Brain className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Adaptive Knowledge Graphs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Automatically deconstruct textbooks and lecture videos into prerequisite concept trees that tailor practice to each student’s gaps.
                  </p>
                </div>

                {/* Visual Concept Flow */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Linear Algebra ➔ Neural Nets</span>
                    <span className="text-[#FF6B00] font-bold text-[11px]">89% Cleared</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-200/80 overflow-hidden">
                      <div className="h-full bg-[#FF6B00] rounded-full w-[89%]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Vectors & Matrices ✓</span>
                    <span>Eigenvalues ✓</span>
                    <span className="text-[#FF6B00] font-semibold">Backpropagation (Next)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Ecosystem & LMS Integrations (Orange Accent) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:border-orange-300 transition-all group shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Network className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Connects to Your Entire Academic Stack
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Zero migration friction. Two-way synchronization with Canvas, Moodle, Blackboard, Google Classroom, JupyterHub, and Discord.
                  </p>
                </div>

                {/* Integrations Grid */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-wrap items-center justify-around gap-2 text-xs">
                  {[
                    { name: "Canvas", dot: "bg-[#FF6B00]" },
                    { name: "Blackboard", dot: "bg-[#FF6B00]" },
                    { name: "Moodle", dot: "bg-[#FF6B00]" },
                    { name: "Google Classroom", dot: "bg-[#FF6B00]" },
                    { name: "Jupyter", dot: "bg-[#FF6B00]" },
                    { name: "GitHub Classroom", dot: "bg-[#FF6B00]" },
                  ].map((app, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-medium text-slate-700 flex items-center gap-1.5 shadow-2xs"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${app.dot}`} />
                      {app.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Instant Rubric Grading & Code Analysis (Orange Accent) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:border-orange-300 transition-all group shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Automated Rubric & Proof Grading
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Grade hundreds of student submissions in seconds. Detailed constructive critique with AST static analysis and citation checking.
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1.5">
                    <span>rubric_evaluation.json</span>
                    <span className="text-[#FF6B00] font-bold">Score: 98/100</span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div className="text-slate-700">✓ Time Complexity: O(N log N) - Optimal</div>
                    <div className="text-slate-700">✓ Edge Cases: Empty array, duplicates handled</div>
                    <div className="text-orange-800 font-medium">⚡ Style: Consider descriptive variable naming at L42</div>
                  </div>
                </div>
              </div>

              {/* Card 4: Cohort Analytics & Early-Warning Milestones (Warm Orange Accent) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:border-orange-300 transition-all group shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Proactive Retention Sentinels
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Identify students at risk of falling behind 3 weeks before midterms. Automated nudges and personalized review assignments.
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-700 font-semibold">
                    <span>Retention Projection</span>
                    <span className="text-[#FF6B00] font-mono font-bold">+18% vs Last Fall</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px] text-slate-500 pt-1">
                    <div className="p-1.5 bg-slate-50 rounded text-slate-800 font-bold border border-slate-200/60">Week 1-4: 98%</div>
                    <div className="p-1.5 bg-orange-50 rounded text-orange-800 font-bold border border-orange-200/60">Midterm: 94%</div>
                    <div className="p-1.5 bg-orange-50 rounded text-orange-800 font-bold border border-orange-200/60">Week 9-12: 91%</div>
                    <div className="p-1.5 bg-orange-100 rounded text-orange-900 font-bold border border-orange-300/60">Finals: 93%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: AGENT HIERARCHY TREE (Solid Badges & Colors)
        ========================================================= */}
        <section className="w-full py-12 sm:py-16 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                Run Smarter Courses. With Education AI Agents.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Specialized autonomous agents coordinated by a centralized academic orchestrator that honors instructor guidelines and FERPA privacy.
              </p>
            </div>

            {/* Central Top Orchestrator Node (Solid Orange Accent) */}
            <div className="flex flex-col items-center">
              <div className="px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-md text-center text-slate-900 font-bold text-sm sm:text-base z-10 relative group hover:border-orange-400 transition-colors">
                <div className="text-xs text-[#FF6B00] font-mono font-semibold uppercase tracking-wider">
                  Core Router
                </div>
                <div>Rivinity Academic Orchestrator</div>
              </div>

              {/* Connecting Tree Lines to 4 Bottom Boxes */}
              <div className="w-full hidden lg:flex flex-col items-center">
                {/* Vertical stem from Router */}
                <div className="w-0.5 h-8 bg-slate-300 -mb-[1px] relative z-10" />

                {/* Horizontal branch bar and 4 vertical drop lines directly into cards */}
                <div className="w-full relative h-8">
                  <div className="grid grid-cols-4 gap-5 w-full h-full">
                    {/* Column 1 Dropdown */}
                    <div className="relative h-full flex justify-center">
                      {/* Horizontal branch from center to Col 2 */}
                      <div className="absolute top-0 left-1/2 -right-[21px] h-0.5 bg-slate-300" />
                      {/* Junction dot */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FF6B00] z-20" />
                      {/* Vertical line dropping into card */}
                      <div className="w-0.5 h-[calc(100%+1px)] bg-slate-300" />
                    </div>

                    {/* Column 2 Dropdown */}
                    <div className="relative h-full flex justify-center">
                      {/* Horizontal branch across Col 2 and gap to Col 3 */}
                      <div className="absolute top-0 left-0 -right-[21px] h-0.5 bg-slate-300" />
                      {/* Junction dot */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FF6B00] z-20" />
                      {/* Vertical line dropping into card */}
                      <div className="w-0.5 h-[calc(100%+1px)] bg-slate-300" />
                    </div>

                    {/* Column 3 Dropdown */}
                    <div className="relative h-full flex justify-center">
                      {/* Horizontal branch across Col 3 and gap to Col 4 */}
                      <div className="absolute top-0 left-0 -right-[21px] h-0.5 bg-slate-300" />
                      {/* Junction dot */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FF6B00] z-20" />
                      {/* Vertical line dropping into card */}
                      <div className="w-0.5 h-[calc(100%+1px)] bg-slate-300" />
                    </div>

                    {/* Column 4 Dropdown */}
                    <div className="relative h-full flex justify-center">
                      {/* Horizontal branch from left edge to center */}
                      <div className="absolute top-0 left-0 w-1/2 h-0.5 bg-slate-300" />
                      {/* Junction dot */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FF6B00] z-20" />
                      {/* Vertical line dropping into card */}
                      <div className="w-0.5 h-[calc(100%+1px)] bg-slate-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile / Tablet Connector fallback */}
              <div className="w-full flex lg:hidden flex-col items-center mb-6">
                <div className="w-0.5 h-8 bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
              </div>

              {/* 4 Agent Cards with Clean Orange Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                {AGENTS.map((agent) => {
                  return (
                    <div
                      key={agent.id}
                      className="rounded-2xl p-5 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between text-left"
                    >
                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">{agent.title}</h4>
                        <div className="text-xs font-medium mb-2.5 text-orange-700">
                          {agent.role}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{agent.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">Impact Metric:</span>
                        <span className="font-mono font-bold text-slate-800">{agent.metrics}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: WORKFLOW BUILDER
        ========================================================= */}
        <section className="w-full py-12 sm:py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Descriptions & Bullet points */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                  Design AI Workflows. Without The Complexity.
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Compose high-impact learning experiences with drag-and-drop clarity. Connect student submissions to AI evaluation chains, automated video walkthroughs, and LMS gradebooks without writing glue code.
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Visual Course & Quiz Builder</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Build dynamic branching assessments that automatically adjust difficulty based on live performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Bi-Directional LMS Sync</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Post grades, rubric feedback, and engagement metrics directly into Canvas or Moodle with instructor review gates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Strict Hallucination Safeguards</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Constrain models strictly to university textbooks, syllabus guidelines, and verified lecture recordings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Node Canvas Mockup */}
              <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-lg relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
                    <span>Live Automated Grading Pipeline</span>
                  </span>
                  <span className="text-[#FF6B00] font-mono text-[11px] font-bold">Workflow ID: #WF-8820</span>
                </div>

                {/* Node Pipeline Diagram */}
                <div className="py-6 space-y-4">
                  {/* Step 1 Node */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B00] flex items-center justify-center font-mono text-xs font-bold border border-orange-200/60">
                        1
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Trigger: Student Submits Homework 5</div>
                        <div className="text-[11px] text-slate-500">GitHub Classroom Push or Canvas File Upload</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-orange-50 text-orange-800 px-2 py-0.5 rounded font-mono font-medium border border-orange-200/60">
                      EVENT
                    </span>
                  </div>

                  {/* Connecting Line */}
                  <div className="w-0.5 h-6 bg-slate-200 mx-auto" />

                  {/* Step 2 Node */}
                  <div className="p-3.5 rounded-xl bg-white border-2 border-orange-400 shadow-md flex items-center justify-between ring-1 ring-orange-400/20">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
                        2
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Agent: Code Verification & AST Check</div>
                        <div className="text-[11px] text-orange-800">Unit tests executed in secure ephemeral sandbox</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-orange-50 text-orange-800 px-2 py-0.5 rounded font-mono font-bold border border-orange-200">
                      AGENT
                    </span>
                  </div>

                  {/* Connecting Line */}
                  <div className="w-0.5 h-6 bg-slate-200 mx-auto" />

                  {/* Step 3 Node */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B00] flex items-center justify-center font-mono text-xs font-bold border border-orange-200/60">
                        3
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Action: Canvas Gradebook Sync & Video Tip</div>
                        <div className="text-[11px] text-slate-500">Student receives private feedback with line annotations</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-orange-50 text-orange-800 px-2 py-0.5 rounded font-mono font-medium border border-orange-200/60">
                      OUTPUT
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-800">
                  <span className="font-semibold">Pipeline Execution Speed: 140ms</span>
                  <span className="font-mono text-[11px] text-[#FF6B00] font-bold">100% Reliable</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: TESTIMONIALS (Landing Page Style Master Card)
        ========================================================= */}
        <TestimonialsSection
          title="Don’t Just Take Our Word For It"
          subtitle="Hear how leading provosts, professors, and academic department chairs rely on Rivinity to scale high-touch teaching."
          items={EDUCATION_TESTIMONIALS}
          className="w-full py-16 sm:py-24 bg-white border-b border-slate-100"
        />

        {/* =========================================================
            SECTION 7: PRICING TIERS (Solid Colors, No Gradients)
        ========================================================= */}
        <section className="w-full py-12 sm:py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                Fair Pricing. No Funny Business.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Predictable plans designed for independent teachers, growing departments, and university-wide deployments.
              </p>
            </div>

            {/* Monthly / Annual Toggle with Clean Solid Active State */}
            <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 mb-12 shadow-2xs">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  billingPeriod === "monthly"
                    ? "bg-[#0f172a] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingPeriod === "annual"
                    ? "bg-[#0f172a] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] bg-[#FF6B00] px-1.5 py-0.2 rounded-full text-white font-mono">
                  Save 20%
                </span>
              </button>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left items-stretch">
              {/* Plan 1: Individual Educator */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Individual Educator</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For individual professors, instructors, and tutors teaching single courses.
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
                  Most Popular for Colleges
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">Department & Campus</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For academic departments, multi-faculty teams, and degree programs.
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {billingPeriod === "annual" ? "$79" : "$99"}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">/ month / department</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span className="font-semibold text-slate-900">Unlimited students & courses</span>
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
                  <h3 className="text-xl font-bold text-slate-900">University System</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For campus-wide rollouts, state systems, and research institutions.
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                    <span className="text-xs text-slate-500 ml-1">/ annual agreement</span>
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
