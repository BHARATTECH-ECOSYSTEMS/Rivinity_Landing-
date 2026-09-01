"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Globe,
  Mic,
  Users,
  Sparkles,
  Cpu,
  ShieldCheck,
  Layers,
  Eye,
  BarChart3,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";

/* =====================================================
   DATA: RESEARCH PROGRAMS
===================================================== */

const RESEARCH_PROGRAMS = [
  {
    number: "01",
    title: "Foundation Models",
    subtitle: "Reasoning & Indic Scale",
    description:
      "Researching large foundation models with advanced chain-of-thought reasoning, deep multilingual comprehension, and sovereign training pipelines optimized for 22+ Indic languages.",
    topics: ["LLMs", "Reasoning", "Multilingual", "Token Efficiency"],
    gradient: "from-[#FF5A1F] via-[#FF8A00] to-[#7928CA]",
    bgTint: "bg-orange-50/40",
    accentColor: "#FF5A1F",
    stats: { papers: "24 Papers", researchers: "18 Scientists", compute: "2T Tokens" },
  },
  {
    number: "02",
    title: "Autonomous Agents",
    subtitle: "Planning & Tool Synthesis",
    description:
      "Building intelligent agent architectures that autonomously decompose complex goals, synthesize executable code, navigate browser DOMs, and safely orchestrate multi-agent workflows.",
    topics: ["Agent Swarms", "Plan Mode", "Tool Execution", "Memory"],
    gradient: "from-[#2563EB] via-[#6366F1] to-[#06B6D4]",
    bgTint: "bg-blue-50/40",
    accentColor: "#2563EB",
    stats: { papers: "18 Papers", researchers: "14 Scientists", compute: "500k Agent Runs" },
  },
  {
    number: "03",
    title: "Multimodal Intelligence",
    subtitle: "Cross-Modal Reasoning",
    description:
      "Developing unified neural models that jointly perceive, correlate, and generate across high-resolution imagery, streaming audio, video frames, and complex Indic document layouts.",
    topics: ["Vision-Language", "Acoustic Modeling", "Document OCR", "Diffusion"],
    gradient: "from-[#059669] via-[#10B981] to-[#F59E0B]",
    bgTint: "bg-emerald-50/40",
    accentColor: "#059669",
    stats: { papers: "16 Papers", researchers: "12 Scientists", compute: "50M Images" },
  },
  {
    number: "04",
    title: "AI Safety & Alignment",
    subtitle: "Constitutional & Sovereign AI",
    description:
      "Formulating rigorous evaluation benchmarks, constitutional alignment rules, and automated red-teaming harnesses specifically tailored to Indian cultural contexts and legal norms.",
    topics: ["Safety", "Red Teaming", "Alignment", "Evaluation"],
    gradient: "from-[#EC4899] via-[#8B5CF6] to-[#4F46E5]",
    bgTint: "bg-pink-50/40",
    accentColor: "#EC4899",
    stats: { papers: "19 Papers", researchers: "15 Scientists", compute: "100k Safety Tests" },
  },
];

/* =====================================================
   DATA: RESEARCH FOCUS AREAS
===================================================== */

const researchAreas = [
  {
    title: "Foundation Models",
    description:
      "Large-scale language and reasoning architectures optimized for Indian languages, dialects, and sovereign datasets.",
    papers: 24,
    researchers: 18,
    icon: Brain,
    gradient: "from-[#FF5A1F] to-[#FF8A00]",
  },
  {
    title: "Speech & Audio Intelligence",
    description:
      "Zero-shot voice cloning and speech synthesis supporting 50+ Indian accents and regional dialects with sub-50ms latency.",
    papers: 16,
    researchers: 12,
    icon: Mic,
    gradient: "from-[#0284C7] to-[#06B6D4]",
  },
  {
    title: "AI Safety & Constitutional ",
    description:
      "Ensuring systems are robustly aligned, culturally attuned, and legally compliant with sovereign regulatory standards.",
    papers: 19,
    researchers: 14,
    icon: ShieldCheck,
    gradient: "from-[#7C3AED] to-[#EC4899]",
  },
  {
    title: "Distributed Edge Inference",
    description:
      "High-throughput kernel optimization and edge caching to serve over 1M+ concurrent AI requests with predictable SLAs.",
    papers: 21,
    researchers: 15,
    icon: Cpu,
    gradient: "from-[#059669] to-[#10B981]",
  },
  {
    title: "Multimodal Intelligence",
    description:
      "Cross-modal comprehension across documents, complex forms, architectural diagrams, video, and audio streams.",
    papers: 17,
    researchers: 13,
    icon: Layers,
    gradient: "from-[#D97706] to-[#F59E0B]",
  },
  {
    title: "Document & Media Forensics",
    description:
      "Visual intelligence systems for forensic validation of identity docs, signatures, and synthetic media detection.",
    papers: 14,
    researchers: 11,
    icon: Eye,
    gradient: "from-[#2563EB] to-[#4F46E5]",
  },
  {
    title: "Autonomous Agent Systems",
    description:
      "Hierarchical planning, tool calling, and long-horizon memory networks for agentic software engineering.",
    papers: 18,
    researchers: 16,
    icon: Sparkles,
    gradient: "from-[#FF5A1F] to-[#E11D48]",
  },
  {
    title: "Global AI Infrastructure",
    description:
      "Next-gen GPU cluster orchestrators, model sharding, and sovereign cloud infrastructure for enterprise scale.",
    papers: 22,
    researchers: 17,
    icon: Globe,
    gradient: "from-[#475569] to-[#0F172A]",
  },
];

/* =====================================================
   DATA: BENCHMARKS
===================================================== */

const benchmarks = [
  {
    benchmark: "IndicGLUE-22 (Language Understanding)",
    rivinity: "91.4%",
    competitorA: "84.2%",
    competitorB: "79.8%",
    category: "Indic NLP",
  },
  {
    benchmark: "MMLU Indic Translated (Reasoning)",
    rivinity: "88.6%",
    competitorA: "81.9%",
    competitorB: "76.4%",
    category: "Reasoning",
  },
  {
    benchmark: "Voice Naturalness (MOS Score / 5.0)",
    rivinity: "4.82",
    competitorA: "4.21",
    competitorB: "3.95",
    category: "Speech AI",
  },
  {
    benchmark: "Edge Inference Latency (P99 ms)",
    rivinity: "42 ms",
    competitorA: "118 ms",
    competitorB: "165 ms",
    category: "Performance",
  },
];

/* =====================================================
   DATA: RESEARCH PAPERS
===================================================== */

const researchPapers = [
  {
    title: "Rivinity-LLM: Scaling Language Models for 22 Indic Languages",
    authors: ["Dr. Priya Sharma", "Arjun Mehta", "Dr. Kavita Rao"],
    date: "February 2026",
    category: "Language Models",
    description:
      "We present Rivinity-LLM, a family of foundation models trained on 2 trillion tokens of curated Indic language data, setting new state-of-the-art accuracy benchmarks on 22 Indian languages.",
    citations: 234,
    icon: BookOpen,
  },
  {
    title: "Zero-Shot Voice Synthesis with 50+ Regional Accents",
    authors: ["Vikram Singh", "Dr. Ananya Patel", "Rahul Kumar"],
    date: "January 2026",
    category: "Speech & Audio",
    description:
      "A novel acoustic diffusion approach supporting 50+ Indian regional accents from just 3 seconds of reference audio, enabling real-time personalized conversational voice systems.",
    citations: 156,
    icon: Mic,
  },
  {
    title: "Distributed Edge Inference: Serving 1M+ Concurrent Agent Requests",
    authors: ["Dr. Sanjay Gupta", "Neha Krishnan", "Amit Verma"],
    date: "December 2025",
    category: "Infrastructure",
    description:
      "Architectural blueprint of our sub-50ms distributed inference engine that scales to over 1,000,000 concurrent agent requests across sovereign edge nodes.",
    citations: 189,
    icon: Globe,
  },
  {
    title: "Constitutional AI Alignment for Indian Cultural & Legal Norms",
    authors: ["Dr. Meera Iyer", "Ravi Shankar", "Pooja Desai"],
    date: "November 2025",
    category: "AI Safety",
    description:
      "Adapting constitutional self-correction principles to ensure AI systems strictly adhere to Indian jurisdictional regulations, safety guidelines, and multi-cultural sensibilities.",
    citations: 312,
    icon: Brain,
  },
];

/* =====================================================
   DATA: RESEARCH BLOG & ARTICLES
===================================================== */

const researchBlogPosts = [
  {
    category: "Autonomous Systems",
    title: "Building Multi-Agent Systems for Next-Generation Workflows",
    description:
      "An in-depth look at hierarchical task decomposition, shared context buffers, and tool synthesis in autonomous software development.",
    authors: "Rivinity Agent Lab",
    date: "August 2026",
    readTime: "8 min read",
    gradient: "from-[#FF5A1F] via-[#FF8A00] to-[#E11D48]",
  },
  {
    category: "Foundation Models",
    title: "Rivinity Bharat: Architecting Sovereign Foundation Models",
    description:
      "How specialized tokenizers, curated Indic linguistic datasets, and cultural alignment create truly sovereign foundation models.",
    authors: "Rivinity Foundation Lab",
    date: "July 2026",
    readTime: "10 min read",
    gradient: "from-[#2563EB] via-[#6366F1] to-[#3B82F6]",
  },
  {
    category: "Hardware & Kernels",
    title: "Accelerating GPU Kernels for Low-Latency Streaming Inference",
    description:
      "Custom Triton kernels and memory-efficient attention layers that reduce transformer inference latency by over 60%.",
    authors: "Rivinity Infrastructure",
    date: "June 2026",
    readTime: "7 min read",
    gradient: "from-[#059669] via-[#10B981] to-[#047857]",
  },
];

/* =====================================================
   DATA: RESEARCH TEAM
===================================================== */

const teamMembers = [
  {
    name: "Dr. Priya Sharma",
    role: "Chief Research Scientist",
    focus: "NLP & Foundation Models",
    initials: "PS",
    gradient: "from-[#FF5A1F] to-[#FF8A00]",
  },
  {
    name: "Dr. Sanjay Gupta",
    role: "VP of Infrastructure",
    focus: "Distributed Edge Computing",
    initials: "SG",
    gradient: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Head of AI Safety",
    focus: "Alignment & Constitutional AI",
    initials: "MI",
    gradient: "from-[#7C3AED] to-[#EC4899]",
  },
  {
    name: "Vikram Singh",
    role: "Principal Scientist",
    focus: "Speech & Acoustic Models",
    initials: "VS",
    gradient: "from-[#059669] to-[#10B981]",
  },
];
function ResearchProgramRail({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const activeIndex = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 3]
  );

  return (
    <div className="relative hidden lg:block">
      <div className="relative space-y-2">
        {RESEARCH_PROGRAMS.map((program, index) => (
          <ResearchProgramRailItem
            key={program.number}
            program={program}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
function ResearchProgramRailItem({
  program,
  index,
  activeIndex,
}: {
  program: (typeof RESEARCH_PROGRAMS)[number];
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const distance = useTransform(activeIndex, (value) =>
    Math.abs(value - index)
  );

  const scale = useTransform(distance, [0, 1, 2], [1, 1, 0.98]);

  const opacity = useTransform(
    distance,
    [0, 1, 2],
    [1, 0.65, 0.4]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className="relative"
    >
      <div className="group flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300">
        {/* NUMBER */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-white"
          style={{
            backgroundColor: program.accentColor,
          }}
        >
          {program.number}
        </div>

        {/* TEXT */}
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-neutral-900">
            {program.title}
          </div>

          <div className="mt-0.5 truncate text-[10px] font-mono uppercase tracking-wider text-neutral-400">
            {program.subtitle}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
/* =====================================================
   RESEARCH PROGRAMS — RESPONSIVE COMPONENT
===================================================== */

function ResearchProgramMobile() {
  const [active, setActive] = useState(0);
  const program = RESEARCH_PROGRAMS[active];

  return (
    <div className="block lg:hidden">
      {/* Header */}
      <div className="mb-6 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Core Research Divisions
        </h2>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600">
          Four foundational research programs exploring the next generation of autonomous intelligence.
        </p>
      </div>

      {/* Program Selector Pills */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none [-webkit-overflow-scrolling:touch]">
        {RESEARCH_PROGRAMS.map((prog, index) => (
          <button
            key={prog.number}
            type="button"
            onClick={() => setActive(index)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${active === index
              ? "border border-neutral-900 bg-neutral-900 text-white shadow-sm"
              : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold text-white"
              style={{ backgroundColor: prog.accentColor }}
            >
              {prog.number}
            </span>
            <span>{prog.title}</span>
          </button>
        ))}
      </div>

      {/* Program Active Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={program.number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7 shadow-sm"
        >
          {/* Subtle Ambient Glow */}
          <div
            className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${program.gradient} opacity-15 blur-2xl`}
          />

          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-600">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: program.accentColor }}
              />
              Program /{program.number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              {program.subtitle}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
            {program.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm font-medium text-neutral-500">
            {program.subtitle}
          </p>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-600">
            {program.description}
          </p>

          {/* Topics */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {program.topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-medium text-neutral-600"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-4">
            <ResearchStat label="Publications" value={program.stats.papers} />
            <ResearchStat label="Scientists" value={program.stats.researchers} />
            <ResearchStat label="Scale Tested" value={program.stats.compute} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ResearchProgramTabs() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <ResearchProgramMobile />

      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{
          height: "360vh",
        }}
      >
        {/* =====================================================
            STICKY VIEWPORT (DESKTOP)
        ===================================================== */}

        <div className="sticky top-28 flex h-[calc(100vh-7rem)] items-center sm:top-32 sm:h-[calc(100vh-8rem)]">
          <div className="w-full">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-7 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Core Research Divisions
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                Four foundational research programs exploring the next
                generation of autonomous and sovereign intelligence.
              </p>
            </div>

            {/* =====================================================
                EXPLORER
            ===================================================== */}

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
              {/* LEFT PROGRAM RAIL */}
              <ResearchProgramRail progress={scrollYProgress} />

              {/* RIGHT STAGE */}
              <div
                className="
                  relative
                  h-[500px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-neutral-200
                  bg-white
                  shadow-[0_20px_70px_rgba(0,0,0,0.06)]
                  sm:h-[520px]
                "
              >
                {/* BACKGROUND GLOW */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(
                        80% 80% at 100% 50%,
                        rgba(249,115,22,0.10),
                        transparent 60%
                      ),
                      radial-gradient(
                        60% 60% at 90% 100%,
                        rgba(124,58,237,0.08),
                        transparent 65%
                      )
                    `,
                  }}
                />

                {/* GRID */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.25]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                      "linear-gradient(to bottom, black, transparent 90%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black, transparent 90%)",
                  }}
                />

                {/* PROGRAM PANELS */}
                {RESEARCH_PROGRAMS.map((program, index) => (
                  <ResearchOrbitProgram
                    key={program.number}
                    program={program}
                    index={index}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                Scroll to explore
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                04 Research Programs
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =====================================================
   ORBIT PROGRAM PANEL
===================================================== */

const ResearchOrbitProgram = ({
  program,
  index,
  progress,
}: {
  program: (typeof RESEARCH_PROGRAMS)[number];
  index: number;
  progress: MotionValue<number>;
}) => {

  const total = RESEARCH_PROGRAMS.length;

  const start = index / total;
  const end = (index + 1) / total;

  const local = useTransform(
    progress,
    [start, end],
    [0, 1],
    {
      clamp: true,
    }
  );

  /* -----------------------------------------------------
     ORBIT MOTION

     0     = bottom/right
     0.5   = center
     1     = top/right
  ----------------------------------------------------- */

  const orbit = useTransform(local, (value) => {
    if (value <= 0.28) {
      const t = value / 0.28;
      return 0.25 * (1 - Math.cos(t * Math.PI));
    }

    if (value >= 0.72) {
      const t = (value - 0.72) / 0.28;
      return 0.5 + 0.25 * (1 - Math.cos(t * Math.PI));
    }

    return 0.5;
  });


  const radius = 48;

  const x = useTransform(
    orbit,
    (value) =>
      `${radius * (1 - Math.sin(value * Math.PI))}%`
  );

  const y = useTransform(
    orbit,
    (value) =>
      `${radius * Math.cos(value * Math.PI)}%`
  );

  const rotate = useTransform(
    orbit,
    (value) =>
      (value - 0.5) * 10
  );

  const opacity = useTransform(
    local,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    local,
    [0, 0.18, 0.5, 0.82, 1],
    [0.92, 1, 1, 1, 0.94]
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        scale,
      }}
      className="absolute inset-0 flex items-center p-6 sm:p-8 md:p-10"
    >

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative z-10 w-full">

        {/* Program label */}

        <div className="mb-5 flex items-center justify-between">

          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-neutral-500">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  program.accentColor,
              }}
            />

            Program /{program.number}
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
            {program.subtitle}
          </span>

        </div>


        {/* =================================================
            CONTENT CARD
        ================================================= */}

        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur-md sm:p-8">

          {/* Accent glow */}

          <div
            className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${program.gradient} opacity-[0.10] blur-3xl`}
          />

          <div
            className={`pointer-events-none absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-gradient-to-br ${program.gradient} opacity-[0.07] blur-3xl`}
          />


          {/* Small status */}

          <div className="relative mb-4 flex items-center gap-2">

            <span
              className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${program.gradient}`}
            />

            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Active Research Division
            </span>

          </div>


          {/* Title */}

          <h3 className="relative max-w-2xl text-2xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-3xl md:text-[36px]">
            {program.title}
          </h3>


          {/* Subtitle */}

          <p className="relative mt-2 text-sm font-medium text-neutral-500">
            {program.subtitle}
          </p>


          {/* Description */}

          <p className="relative mt-4 max-w-2xl text-xs leading-7 text-neutral-600 sm:text-sm">
            {program.description}
          </p>


          {/* =================================================
              TOPICS
          ================================================= */}

          <div className="relative mt-6 flex flex-wrap gap-2">

            {program.topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-medium text-neutral-600"
              >
                {topic}
              </span>
            ))}

          </div>


          {/* =================================================
              STATS
          ================================================= */}

          <div className="relative mt-7 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-5">

            <ResearchStat
              label="Publications"
              value={program.stats.papers}
            />

            <ResearchStat
              label="Scientists"
              value={program.stats.researchers}
            />

            <ResearchStat
              label="Scale Tested"
              value={program.stats.compute}
            />

          </div>

        </div>


        {/* =================================================
            PROGRAM VISUAL SIGNAL
        ================================================= */}

        <ResearchProgramVisual
          program={program}
          index={index}
        />

      </div>

    </motion.div>
  );
};


/* =====================================================
   STAT
===================================================== */

const ResearchStat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <div className="text-xs font-bold text-neutral-900 sm:text-sm">
      {value}
    </div>

    <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
      {label}
    </div>
  </div>
);


/* =====================================================
   CSS / SVG RESEARCH VISUAL
===================================================== */

const ResearchProgramVisual = ({
  program,
  index,
}: {
  program: (typeof RESEARCH_PROGRAMS)[number];
  index: number;
}) => {

  if (index === 0) {
    return (
      <div className="pointer-events-none absolute bottom-8 right-8 hidden h-28 w-28 sm:block">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-orange-200"
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-3 rounded-full border border-purple-200"
        />

        <div
          className={`absolute inset-8 rounded-full bg-gradient-to-br ${program.gradient} shadow-lg`}
        />

      </div>
    );
  }


  if (index === 1) {
    return (
      <div className="pointer-events-none absolute bottom-8 right-8 hidden h-32 w-40 sm:block">

        {[
          "Agent",
          "Planner",
          "Memory",
          "Tool",
        ].map((label, i) => (
          <motion.div
            key={label}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="absolute rounded-xl border border-neutral-200 bg-white px-3 py-2 text-[9px] font-semibold text-neutral-500 shadow-sm"
            style={{
              left:
                i % 2 === 0
                  ? "0%"
                  : "48%",
              top:
                i < 2
                  ? "5%"
                  : "52%",
            }}
          >
            <div className="flex items-center gap-1.5">

              <Sparkles className="h-3 w-3 text-[#F97316]" />

              {label}

            </div>
          </motion.div>
        ))}

      </div>
    );
  }


  if (index === 2) {
    return (
      <div className="pointer-events-none absolute bottom-7 right-8 hidden h-32 w-44 sm:block">

        <svg
          viewBox="0 0 200 120"
          className="h-full w-full"
          aria-hidden
        >
          <defs>

            <linearGradient
              id="research-network-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#F97316"
                stopOpacity="0.65"
              />

              <stop
                offset="100%"
                stopColor="#7C3AED"
                stopOpacity="0.15"
              />
            </linearGradient>

          </defs>

          {[
            [20, 20, 100, 60],
            [100, 60, 180, 20],
            [20, 20, 30, 100],
            [180, 20, 170, 100],
            [30, 100, 100, 60],
            [170, 100, 100, 60],
          ].map((line, i) => (
            <line
              key={i}
              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}
              stroke="url(#research-network-gradient)"
              strokeWidth="1"
            />
          ))}

          {[
            [20, 20],
            [100, 60],
            [180, 20],
            [30, 100],
            [170, 100],
          ].map((node, i) => (
            <circle
              key={i}
              cx={node[0]}
              cy={node[1]}
              r="5"
              fill="white"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          ))}

          <circle
            cx="100"
            cy="60"
            r="13"
            fill="#F97316"
            opacity="0.9"
          />

        </svg>

      </div>
    );
  }


  /* =====================================================
     PROGRAM 04 — SAFETY / ALIGNMENT
  ===================================================== */

  return (
    <div className="pointer-events-none absolute bottom-7 right-8 hidden h-32 w-36 sm:block">

      <div className="absolute inset-0 flex items-center justify-center">

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-28 w-28 rounded-full bg-pink-100 blur-2xl"
        />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-pink-200 bg-white shadow-md">

          <ShieldCheck
            className="h-9 w-9 text-[#DB2777]"
            strokeWidth={1.5}
          />

        </div>

      </div>

    </div>
  );
};/* =====================================================
   MAIN RESEARCH PAGE
===================================================== */

/* =====================================================
   MAIN RESEARCH PAGE
===================================================== */

export default function ResearchPage() {
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null);

  const scrollFocusTrack = (dir: "left" | "right") => {
    const el = document.getElementById("focus-areas-track");
    if (el) {
      const scrollStep = el.clientWidth * 0.75;
      el.scrollBy({ left: dir === "left" ? -scrollStep : scrollStep, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <main className="w-full pt-28 sm:pt-32 pb-16">

        {/* =====================================================
    1. HERO SECTION — LIGHT RESEARCH HERO
===================================================== */}
        <div className="relative overflow-hidden border-b border-neutral-200/70 bg-white py-20 sm:py-28 lg:py-32">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* =================================================
        HERO CONTENT
    ================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-5xl"
            >

              {/* =================================================
          HEADLINE
      ================================================= */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.55 }}
                className="max-w-5xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-neutral-950 sm:text-5xl md:text-6xl lg:text-[72px]"
              >
                Pioneering the Frontiers of{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#DB2777] bg-clip-text text-transparent">
                    Autonomous Intelligence.
                  </span>

                  {/* Soft underline */}
                  <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-orange-400/50 via-orange-300/30 to-transparent" />
                </span>
              </motion.h1>

              {/* =================================================
          DESCRIPTION
      ================================================= */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mt-7 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8"
              >
                We conduct fundamental and applied research in foundation models,
                autonomous multi-agent systems, multimodal intelligence, and
                sovereign AI infrastructure.
              </motion.p>

              {/* =================================================
          CTA BUTTONS
      ================================================= */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                {/* Primary */}
                <a
                  href="#programs"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-[#C2410C] shadow-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-100 hover:shadow-md"
                >
                  Explore Programs

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Secondary */}
                <a
                  href="#publications"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-[#C2410C] hover:shadow-md"
                >
                  View Publications

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </motion.div>

            {/* =================================================
        RESEARCH SIGNAL / METRICS
    ================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-16 border-t border-neutral-200/80 pt-8 sm:mt-20 sm:pt-10"
            >
              <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">

                {/* Metric 01 */}
                <div className="group border-neutral-200 md:border-r md:pr-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                      22
                    </span>
                    <span className="text-xl font-bold text-[#F97316]">+</span>
                  </div>

                  <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-sm">
                    Indic Languages Modeled
                  </p>
                </div>

                {/* Metric 02 */}
                <div className="group md:border-r md:px-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                      50
                    </span>
                    <span className="text-xl font-bold text-[#F97316]">+</span>
                  </div>

                  <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-sm">
                    Regional Voice Accents
                  </p>
                </div>

                {/* Metric 03 */}
                <div className="group border-neutral-200 md:border-r md:px-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                      &lt;50
                    </span>
                    <span className="text-xl font-bold text-[#F97316]">ms</span>
                  </div>

                  <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-sm">
                    Edge Inference Latency
                  </p>
                </div>

                {/* Metric 04 */}
                <div className="group md:pl-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                      100
                    </span>
                    <span className="text-xl font-bold text-[#F97316]">%</span>
                  </div>

                  <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-sm">
                    Sovereign Data Privacy
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
        BOTTOM RESEARCH STATUS
    ================================================= */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-5"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Research Systems Online
              </div>

              <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                <span>Foundation Models</span>
                <span className="hidden h-3 w-px bg-neutral-200 sm:block" />
                <span>Agents</span>
                <span className="hidden h-3 w-px bg-neutral-200 sm:block" />
                <span>Multimodal</span>
              </div>
            </motion.div>
          </div>
        </div>
        {/* =====================================================
            2. INTERACTIVE RESEARCH PROGRAMS
        ===================================================== */}
        <section id="programs" className="py-16 sm:py-24 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ResearchProgramTabs />
          </div>
        </section>
        {/* =====================================================
    3. RESEARCH FOCUS AREAS
===================================================== */}

        <section className="border-b border-neutral-200 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* =================================================
        MAIN LIGHT BOX
    ================================================= */}

            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-[#F7F8FA] p-5 shadow-sm sm:p-8 lg:p-10">

              {/* SUBTLE BACKGROUND GLOW */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white opacity-80 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-neutral-100 opacity-70 blur-3xl" />

              {/* CONTENT */}
              <div className="relative">

                {/* =================================================
            HEADER
        ================================================= */}

                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                  {/* HEADER TEXT */}
                  <div className="max-w-2xl">

                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                      Domains & Specializations
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                      Research Focus Areas
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                      Specialized laboratories solving key bottlenecks across the modern AI stack.
                    </p>

                  </div>

                  {/* =================================================
              NAVIGATION
          ================================================= */}

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollFocusTrack("left")}
                      aria-label="Previous research areas"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollFocusTrack("right")}
                      aria-label="Next research areas"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>

                {/* =================================================
            CAROUSEL
        ================================================= */}

                <div className="overflow-hidden">
                  <div
                    id="focus-areas-track"
                    className="flex gap-4 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none [-webkit-overflow-scrolling:touch]"
                  >
                    {researchAreas.map((area, index) => {
                      const IconComponent = area.icon;

                      return (
                        <div
                          key={area.title}
                          className="w-[85%] sm:w-[48%] lg:w-[calc(25%-12px)] shrink-0 snap-start"
                        >
                          {/* =================================================
                              RESEARCH CARD
                          ================================================= */}

                          <div className="group relative flex h-[290px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md">
                            {/* CARD HOVER LIGHT */}
                            <div
                              className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${area.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.08]`}
                            />

                            {/* CARD CONTENT */}
                            <div className="relative flex min-h-0 flex-1 flex-col">
                              {/* ICON + NUMBER */}
                              <div className="mb-4 sm:mb-5 flex shrink-0 items-center justify-between">
                                <div
                                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br ${area.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}
                                >
                                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>

                                <span className="font-mono text-xs font-semibold tracking-wider text-neutral-300">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>

                              {/* TITLE */}
                              <h3 className="shrink-0 text-base sm:text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-200 group-hover:text-neutral-700">
                                {area.title}
                              </h3>

                              {/* DESCRIPTION */}
                              <p className="mt-2 line-clamp-3 sm:line-clamp-4 overflow-hidden text-xs leading-[1.7] text-neutral-500">
                                {area.description}
                              </p>
                            </div>

                            {/* FIXED STATS */}
                            <div className="relative mt-auto grid shrink-0 grid-cols-2 border-t border-neutral-100 pt-3 sm:pt-4">
                              <div>
                                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                                  Publications
                                </p>
                                <p className="mt-1 text-xs sm:text-sm font-bold text-neutral-800">
                                  {area.papers}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                                  Scientists
                                </p>
                                <p className="mt-1 text-xs sm:text-sm font-bold text-neutral-800">
                                  {area.researchers}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
            CAROUSEL FOOTER
        ================================================= */}

                <div className="mt-6 flex items-center justify-between border-t border-neutral-200/80 pt-5">
                  {/* LEFT LABEL */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                    Scroll or swipe to explore
                  </span>

                  {/* RIGHT INDICATOR */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                    {String(researchAreas.length).padStart(2, "0")} Domains
                  </span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            4. MODELS & BENCHMARKS
        ===================================================== */}
        <section className="py-16 sm:py-24 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Evaluation & Comparative Performance
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600">
                Tested against open industry benchmarks across Indic comprehension, reasoning, and speech synthesis.
              </p>
            </div>

            {/* Benchmark Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm scrollbar-none [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-neutral-50 text-xs font-semibold uppercase text-neutral-700 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4">Benchmark / Metric</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-[#FF5A1F] font-bold">
                      Rivinity-LLM
                    </th>
                    <th className="px-6 py-4 text-neutral-500">
                      Standard Open Model A
                    </th>
                    <th className="px-6 py-4 text-neutral-500">
                      Standard Open Model B
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {benchmarks.map((row) => (
                    <tr key={row.benchmark} className="hover:bg-neutral-50/60 transition">
                      <td className="px-6 py-4 font-semibold text-neutral-900">
                        {row.benchmark}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-neutral-500">
                        {row.category}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#FF5A1F] bg-orange-50/40">
                        {row.rivinity}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {row.competitorA}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {row.competitorB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* =====================================================
    5. LATEST PUBLICATIONS
===================================================== */}
        <section
          id="publications"
          className="bg-[#FAFAFA] border-b border-neutral-200 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* HEADER */}
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Latest Publications
              </h2>

              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Peer-reviewed research papers and technical reports published by our teams.
              </p>
            </div>

            {/* FOLDING PUBLICATION LIST */}
            <div className="space-y-3">
              {researchPapers.map((paper, idx) => {
                const Icon = paper.icon;
                const isExpanded = expandedPaper === idx;

                return (
                  <motion.div
                    key={paper.title}
                    layout
                    transition={{
                      layout: {
                        duration: 0.35,
                        ease: "easeInOut",
                      },
                    }}
                    className={`group overflow-hidden rounded-2xl border bg-white shadow-2xs transition-all duration-300 ${isExpanded
                      ? "border-orange-200 shadow-md"
                      : "border-neutral-200/90 hover:border-neutral-300 hover:shadow-sm"
                      }`}
                  >
                    {/* COMPACT HEADER / CLICK AREA */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPaper(isExpanded ? null : idx)
                      }
                      aria-expanded={isExpanded}
                      className="w-full cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-4 p-5 sm:p-6">

                        {/* ICON */}
                        <div
                          className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:flex ${isExpanded
                            ? "bg-[#FF5A1F] text-white"
                            : "bg-orange-50 text-[#FF5A1F] group-hover:bg-orange-100"
                            }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* MAIN INFO */}
                        <div className="min-w-0 flex-1">

                          {/* META */}
                          <div className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                              {paper.category}
                            </span>

                            <span className="text-xs font-mono text-neutral-400">
                              {paper.date}
                            </span>

                            <span className="text-xs font-medium text-orange-600">
                              {paper.citations} citations
                            </span>
                          </div>

                          {/* TITLE */}
                          <h3
                            className={`text-base font-bold leading-snug transition-colors duration-200 sm:text-lg ${isExpanded
                              ? "text-[#FF5A1F]"
                              : "text-neutral-900 group-hover:text-[#FF5A1F]"
                              }`}
                          >
                            {paper.title}
                          </h3>
                        </div>

                        {/* FOLD INDICATOR */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isExpanded
                            ? "rotate-180 border-orange-200 bg-orange-50 text-[#FF5A1F]"
                            : "border-neutral-200 bg-neutral-50 text-neutral-500 group-hover:border-orange-200 group-hover:text-[#FF5A1F]"
                            }`}
                        >
                          <ArrowRight className="h-4 w-4 rotate-90" />
                        </div>
                      </div>
                    </button>

                    {/* EXPANDED CONTENT */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            height: {
                              duration: 0.35,
                              ease: "easeInOut",
                            },
                            opacity: {
                              duration: 0.2,
                              ease: "easeOut",
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">

                            {/* DESCRIPTION */}
                            <p className="max-w-4xl text-xs leading-relaxed text-neutral-600 sm:text-sm">
                              {paper.description}
                            </p>

                            {/* BOTTOM ROW */}
                            <div className="mt-4 flex flex-col gap-4 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                              {/* AUTHORS */}
                              <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-neutral-500">
                                <Users className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                                <span className="truncate">
                                  {paper.authors.join(", ")}
                                </span>
                              </div>

                              {/* READ PAPER */}
                              <div className="shrink-0">
                                <span
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-100 hover:text-black"
                                >
                                  Read Paper
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* SMALL FOOTER INDICATOR */}
            <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {expandedPaper !== null
                  ? `Publication ${String(expandedPaper + 1).padStart(2, "0")} Expanded`
                  : "Select a publication to expand"}
              </span>

              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {String(researchPapers.length).padStart(2, "0")} Publications
              </span>
            </div>

          </div>
        </section>


        {/* =====================================================
            6. RESEARCH BLOG & INSIGHTS
        ===================================================== */}
        <section className="py-16 sm:py-24 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Research Insights
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600">
                Engineering deep-dives and laboratory retrospectives from our scientists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchBlogPosts.map((post) => (
                <div
                  key={post.title}
                  className="group flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all"
                >
                  {/* Vibrant Gradient Art Top (No Image) */}
                  <div
                    className={`h-40 w-full bg-gradient-to-br ${post.gradient} p-6 flex flex-col justify-between relative overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <span className="relative z-10 self-start rounded-full bg-black/30 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-semibold text-white">
                      {post.category}
                    </span>
                    <span className="relative z-10 text-xs font-mono text-white/80">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#FF5A1F] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-mono text-neutral-500">
                      <span>{post.authors}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            7. RESEARCH LEADERSHIP
        ===================================================== */}
        <section className="py-16 sm:py-24 bg-[#FAFAFA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Research Leadership
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600">
                World-class scientists and engineers leading the sovereign AI revolution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center rounded-2xl bg-white border border-neutral-200/90 p-7 shadow-2xs hover:shadow-md transition"
                >
                  {/* Dynamic Gradient Avatar Initials (No Image) */}
                  <div
                    className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-xl font-bold text-white shadow-sm`}
                  >
                    {member.initials}
                  </div>

                  <h3 className="text-base font-bold text-neutral-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF5A1F] mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-500 mt-2 font-mono">
                    {member.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}