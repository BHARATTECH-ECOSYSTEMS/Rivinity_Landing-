"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  FileCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Globe2,
  Lock,
  MessageSquare,
  Mic,
  Network,
  Palette,
  Search,
  Server,
  Sparkles,
  Workflow,
  Plus,
  type LucideIcon,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/sections/cta-section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import orbImage from "@/components/assets/rivinity-orb.png";
import FaqSection from "@/components/sections/faq-section";

/* =========================================================
   01 — TYPES
========================================================= */

type Tone = "peach" | "pink" | "purple" | "sky";

type Capability = {
  label: string;
  icon: LucideIcon;
  tone: Tone;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

/* =========================================================
   02 — HERO / GLOBE DATA
========================================================= */

const CAPS: Capability[] = [
  {
    label: "AI Chat",
    icon: MessageSquare,
    tone: "purple",
    x: 48,
    y: 14,
    dx: 80,
    dy: 24,
  },
  {
    label: "AI Search",
    icon: Search,
    tone: "peach",
    x: 36,
    y: 22,
    dx: 78,
    dy: 33,
  },
  {
    label: "AI Studio",
    icon: Palette,
    tone: "purple",
    x: 28,
    y: 36,
    dx: 76,
    dy: 42,
  },
  {
    label: "AI Coder",
    icon: Code2,
    tone: "sky",
    x: 25,
    y: 50,
    dx: 75,
    dy: 50,
  },
  {
    label: "AI Voice",
    icon: Mic,
    tone: "purple",
    x: 28,
    y: 64,
    dx: 76,
    dy: 58,
  },
  {
    label: "AI Analytics",
    icon: BarChart3,
    tone: "pink",
    x: 36,
    y: 78,
    dx: 78,
    dy: 67,
  },
  {
    label: "AI Workflows",
    icon: Workflow,
    tone: "peach",
    x: 52,
    y: 86,
    dx: 80,
    dy: 76,
  },
];

const CONNECTORS = CAPS.map((item) => {
  const path = `M ${item.x} ${item.y} C ${item.x + 14} ${item.y}, ${item.dx - 12} ${item.dy}, ${item.dx} ${item.dy}`;
  return {
    ...item,
    path,
  };
});

/* =========================================================
   04 — SHARED COLORS
========================================================= */

const toneStyles: Record<
  Tone,
  {
    bg: string;
    ring: string;
    icon: string;
  }
> = {
  peach: {
    bg: "#FFF4EC",
    ring: "#FFD9BF",
    icon: "#FF6B00",
  },
  pink: {
    bg: "#FFF0F5",
    ring: "#FFD1E0",
    icon: "#E85D9E",
  },
  purple: {
    bg: "#F4F0FF",
    ring: "#DED3FF",
    icon: "#7C5CFC",
  },
  sky: {
    bg: "#EFF6FF",
    ring: "#CFE2FF",
    icon: "#4F8FEF",
  },
};

const toneGradient: Record<Tone, string> = {
  peach: "linear-gradient(135deg, #FF6B00 0%, #FF8C42 100%)",
  pink: "linear-gradient(135deg, #F973A8 0%, #E85D9E 100%)",
  purple: "linear-gradient(135deg, #8B6CFF 0%, #6D4AFF 100%)",
  sky: "linear-gradient(135deg, #65A9FF 0%, #4F8FEF 100%)",
};



/* =========================================================
   06 — ENTERPRISE DATA
========================================================= */

const enterpriseCapabilities = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Deploy intelligent agents that understand context, reason through complex tasks, and take action across your organization.",
  },
  {
    icon: Workflow,
    title: "Intelligent Workflows",
    description:
      "Connect people, AI, and systems into automated workflows that continuously improve how your teams operate.",
  },
  {
    icon: BrainCircuit,
    title: "Enterprise Intelligence",
    description:
      "Turn organizational knowledge and data into actionable intelligence with AI-powered search and reasoning.",
  },
  {
    icon: Code2,
    title: "Developer Platform",
    description:
      "Give engineering teams the infrastructure and APIs they need to build and deploy intelligent applications.",
  },
  {
    icon: Search,
    title: "Knowledge & Search",
    description:
      "Make information discoverable across your organization with contextual search and intelligent retrieval.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Understand performance, usage, and outcomes across your AI-powered workflows.",
  },
];

const integrations = [
  { icon: Cloud, name: "Cloud" },
  { icon: Database, name: "Databases" },
  { icon: Code2, name: "Developer Tools" },
  { icon: Network, name: "APIs" },
  { icon: Server, name: "Infrastructure" },
  { icon: Globe2, name: "Enterprise Apps" },
  { icon: Sparkles, name: "OpenAI" },
  { icon: Database, name: "PostgreSQL" },
  { icon: Cloud, name: "AWS" },
  { icon: MessageSquare, name: "Slack" },
  { icon: Palette, name: "Notion" },
  { icon: Network, name: "API" },
];

/* =========================================================
   07 — TESTIMONIALS
========================================================= */

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Rivinity gives our teams the infrastructure and intelligence they need to move from experimentation to production with confidence.",
    name: "Priya Sharma",
    role: "Head of Data",
    company: "Enterprise Technology",
    initials: "PS",
  },
  {
    quote:
      "Rivinity has helped our teams bring intelligent workflows into production while maintaining the control and visibility we need.",
    name: "Marcus Johnson",
    role: "VP of Engineering",
    company: "Technology",
    initials: "MJ",
  },
  {
    quote:
      "The combination of AI capabilities, developer tooling, and enterprise governance makes Rivinity a powerful platform for our organization.",
    name: "Isabella Rossi",
    role: "Director of AI",
    company: "Enterprise Systems",
    initials: "IR",
  },
];

/* =========================================================
   08 — FAQ
========================================================= */

const enterpriseFAQs = [
  {
    question: "What is Rivinity for Enterprise?",
    answer:
      "Rivinity for Enterprise provides AI agents, intelligent workflows, developer infrastructure, and enterprise intelligence through a unified platform. It helps organizations deploy AI across teams while maintaining control over data, access, and governance.",
  },
  {
    question: "Can Rivinity integrate with our existing systems?",
    answer:
      "Yes. Rivinity is designed to work alongside your existing infrastructure, including cloud platforms, databases, APIs, developer tools, and enterprise applications.",
  },
  {
    question: "How does Rivinity handle enterprise security?",
    answer:
      "Rivinity is designed with enterprise security in mind, providing controls for data protection, identity, access management, governance, and secure AI workflows.",
  },
  {
    question: "Can we deploy Rivinity across multiple teams?",
    answer:
      "Yes. Rivinity can scale across departments, teams, workflows, and business units, allowing organizations to expand AI adoption progressively.",
  },
  {
    question: "Does Rivinity support custom enterprise solutions?",
    answer:
      "Yes. Enterprise deployments can be tailored around your organization's infrastructure, workflows, security requirements, and specific AI use cases.",
  },
  {
    question: "How do we get started with Rivinity Enterprise?",
    answer:
      "Start by speaking with our enterprise team. We'll understand your requirements, identify the right use cases, and help design a deployment path that fits your organization.",
  },
];

/* =========================================================
   09 — SHARED COMPONENTS
========================================================= */

const SectionHeading = memo(
  ({
    eyebrow,
    title,
    description,
    centered = false,
  }: {
    eyebrow?: string;
    title: string;
    description?: string;
    centered?: boolean;
  }) => (
    <div
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      {eyebrow && (
        <div
          className={`mb-5 flex items-center gap-2 text-sm font-medium text-[#6B7280] ${centered ? "justify-center" : ""
            }`}
        >
          <span className="h-px w-6 bg-[#FF6B00]" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-4xl font-semibold tracking-[-0.045em] text-[#1A1A1A] sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-8 text-[#6B7280] ${centered ? "mx-auto" : ""
            }`}
        >
          {description}
        </p>
      )}
    </div>
  )
);

SectionHeading.displayName = "SectionHeading";

/* =========================================================
   10 — TESTIMONIAL SLIDER
========================================================= */

function useTestimonialSlider(length: number) {
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((current) => (current + 1) % length),
    [length]
  );

  const previous = useCallback(
    () =>
      setActive(
        (current) => (current - 1 + length) % length
      ),
    [length]
  );

  useEffect(() => {
    const timer = window.setInterval(next, 8000);

    return () => window.clearInterval(timer);
  }, [next]);

  return {
    active,
    next,
    previous,
    setActive,
  };
}



/* =========================================================
   12 — ENTERPRISE TABS
========================================================= */

function EnterpriseTabs() {
  const [activeTab, setActiveTab] = useState("agents");

  const tabs = [
    {
      id: "agents",
      label: "AI Agents",
      icon: Bot,
      image: "/images/enterprise/agents.png",
      eyebrow: "INTELLIGENT AUTOMATION",
      title: "AI agents that understand and execute real work.",
      description:
        "Deploy intelligent agents that understand context, reason across your enterprise data, and execute multi-step workflows.",
      features: [
        "Autonomous task execution",
        "Context-aware reasoning",
        "Tool and API connectivity",
        "Human-in-the-loop controls",
      ],
    },
    {
      id: "data",
      label: "Data",
      icon: Database,
      image: "/images/enterprise/data.png",
      eyebrow: "CONNECTED DATA",
      title: "Turn enterprise data into intelligence.",
      description:
        "Connect your organization's data sources and give AI systems the context they need to make better decisions.",
      features: [
        "Unified data access",
        "Real-time information",
        "Secure data connections",
        "Enterprise knowledge",
      ],
    },
    {
      id: "workflows",
      label: "Workflows",
      icon: Workflow,
      image: "/images/enterprise/workflows.png",
      eyebrow: "AUTOMATED WORKFLOWS",
      title: "Automate complex business workflows.",
      description:
        "Build intelligent workflows that connect people, systems, AI agents, and business processes into one continuous flow.",
      features: [
        "Visual workflow automation",
        "Multi-step processes",
        "AI-powered decisions",
        "Cross-system execution",
      ],
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: Server,
      image: "/images/enterprise/infrastructure.png",
      eyebrow: "ENTERPRISE INFRASTRUCTURE",
      title: "Infrastructure built for intelligent systems.",
      description:
        "Run AI workloads, applications, APIs, and enterprise services on infrastructure designed for scale and reliability.",
      features: [
        "Scalable infrastructure",
        "Secure environments",
        "API-first architecture",
        "Enterprise reliability",
      ],
    },
  ];

  const active =
    tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const ActiveIcon = active.icon;

  return (
    <div className="mt-12 sm:mt-14">
      {/* =================================================
          TAB NAVIGATION (COMPACT SEGMENTED PILL)
      ================================================= */}

      <div className="mb-6 flex w-full justify-start sm:justify-center overflow-x-auto pb-2 pt-1 px-4 sm:px-0 scrollbar-none [-webkit-overflow-scrolling:touch]">
        <div className="inline-flex shrink-0 mx-auto items-center gap-1 rounded-2xl border border-[#E5E7EB] bg-white p-1 sm:p-1.5 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="relative flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="enterprise-active-tab"
                    className="absolute inset-0 rounded-xl bg-[#1A1A1A] shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 flex items-center gap-1.5 sm:gap-2 transition-colors duration-150 ${isActive
                    ? "text-white"
                    : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================
          TAB CONTENT
      ================================================= */}

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-[#E5E7EB]
            bg-white
            shadow-[0_25px_80px_-45px_rgba(20,20,40,0.25)]
          "
        >
          {/* Background glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-96
              w-96
              rounded-full
              opacity-70
              blur-3xl
            "
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,0,0.18), rgba(232,93,158,0.08), transparent 70%)",
            }}
          />

          <div className="relative p-7 sm:p-10 lg:p-14">
            {/* Header: Icon & Eyebrow */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4EC] ring-1 ring-[#FFD9BF]"
                >
                  <ActiveIcon className="h-6 w-6 text-[#FF6B00]" />
                </motion.div>
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="text-xs font-semibold tracking-[0.16em] text-[#9CA3AF]"
                  >
                    {active.eyebrow}
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="mt-1 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#1A1A1A] sm:text-3xl lg:text-4xl"
                  >
                    {active.title}
                  </motion.h3>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#integrations"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ x: 4 }}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#E55F00] active:scale-[0.98]"
              >
                Explore platform
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-3xl text-[15px] leading-7 text-[#6B7280] sm:text-base"
            >
              {active.description}
            </motion.p>

            {/* Features 4-card grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {active.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.06 }}
                  className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-sm font-medium text-[#374151] transition-colors hover:border-[#D1D5DB] hover:bg-white hover:shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF4EC]">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  </span>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   13 — AMBIENT GLOW
========================================================= */

const AmbientGlow = ({
  side,
}: {
  side: "left" | "right";
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute ${side === "right"
      ? "-right-40 top-20 h-[420px] w-[420px]"
      : "-left-40 bottom-0 h-[360px] w-[360px]"
      } rounded-full blur-3xl`}
    style={{
      background:
        side === "right"
          ? "radial-gradient(circle, rgba(255,107,0,0.14), rgba(255,140,66,0.08), transparent 68%)"
          : "radial-gradient(circle, rgba(232,93,158,0.12), rgba(255,107,0,0.08), transparent 68%)",
    }}
  />
);

/* =========================================================
   14 — CAPABILITY GLOBE
========================================================= */

function CapabilityGlobe() {
  return (
    <div
      className="relative ml-auto w-full"
      style={{
        aspectRatio: "1 / 1",
      }}
      aria-label="Rivinity capabilities connected to one intelligent platform"
      role="img"
    >
      {/* =====================================================
          CONNECTOR LINES & MOVING PULSE DOTS (FADE INSIDE LOGO)
      ===================================================== */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Smooth gradient mask: lines and dots remain visible through middle structure and gradually fade into the core */}
          <linearGradient id="line-fade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="58%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="76%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <mask id="fade-into-logo" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect x="0" y="0" width="100" height="100" fill="url(#line-fade-grad)" />
          </mask>
        </defs>

        <g mask="url(#fade-into-logo)">
          {CONNECTORS.map((c, i) => {
            const tone = toneStyles[c.tone];
            return (
              <g key={`connector-${c.label}`}>
                {/* Base dashed guide line — ultra-thin */}
                <path
                  d={c.path}
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="0.22"
                  strokeDasharray="1.2 1.2"
                  opacity="0.85"
                />

                {/* Tinted accent curve — ultra-thin */}
                <path
                  d={c.path}
                  fill="none"
                  stroke={tone.ring}
                  strokeWidth="0.28"
                  opacity="0.9"
                />

                {/* Small moving circular dot #1 flowing through the line */}
                <circle r="0.55" fill={tone.icon} filter="url(#dot-glow)">
                  <animateMotion
                    path={c.path}
                    dur={`${2.4 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.35}s`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>

                {/* Small moving circular dot #2 (trailing pulse) */}
                <circle r="0.38" fill="#FF8C42" opacity="0.8">
                  <animateMotion
                    path={c.path}
                    dur={`${2.4 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.35 + 1.2}s`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>

                {/* Connection anchor dot on the box */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="0.5"
                  fill={tone.icon}
                  stroke="#ffffff"
                  strokeWidth="0.15"
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* =====================================================
          HALF GLOBE / LOGO (Z-10, SITS ABOVE THE LINES)
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-1px]
          top-1/2
          h-[92%]
          w-[52%]
          -translate-y-1/2
          overflow-hidden
          z-10
        "
        style={{
          borderRadius: "50% 0 0 50%",
        }}
      >
        <Image
          src={orbImage}
          alt=""
          aria-hidden="true"
          width={1280}
          height={1280}
          priority
          sizes="700px"
          className="
            absolute
            left-0
            top-1/2
            h-auto
            max-w-none
            select-none
          "
          style={{
            width: "200%",
            transform: "translateY(-50%)",
            filter:
              "drop-shadow(0 0 35px rgba(255,107,0,0.16))",
          }}
        />
      </div>



      {/* =====================================================
          CAPABILITY PILLS (Z-20)
      ===================================================== */}

      {CAPS.map((capability, index) => {
        const Icon = capability.icon;

        return (
          <div
            key={capability.label}
            className="
              cg-pill
              absolute
              flex
              items-center
              whitespace-nowrap
              rounded-xl
              sm:rounded-2xl
              z-20
            "
            style={{
              left: `${capability.x}%`,
              top: `${capability.y}%`,
              transform:
                "translate(-100%, -50%)",
              background: "#ffffff",
              border: "1px solid #E5E7EB",
              boxShadow:
                "0 8px 20px -12px rgba(20,20,40,0.22), 0 2px 6px -2px rgba(20,20,40,0.06)",
              gap:
                "clamp(4px, 0.25rem + 0.2vw, 8px)",
              padding:
                "clamp(3px, 0.2rem + 0.1vw, 6px) clamp(6px, 0.4rem + 0.2vw, 12px)",
              animationDelay:
                `${index * 0.15}s`,
            }}
          >
            <span
              className="
                flex
                shrink-0
                items-center
                justify-center
                rounded-lg
                sm:rounded-xl
              "
              style={{
                background:
                  toneGradient[
                  capability.tone
                  ],
                width:
                  "clamp(20px, 1.1rem + 0.35vw, 32px)",
                height:
                  "clamp(20px, 1.1rem + 0.35vw, 32px)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 3px 8px -4px rgba(80,40,40,0.30)",
              }}
            >
              <Icon
                style={{
                  color: "#ffffff",
                  width:
                    "clamp(11px, 0.55rem + 0.18vw, 16px)",
                  height:
                    "clamp(11px, 0.55rem + 0.18vw, 16px)",
                }}
                strokeWidth={2.4}
              />
            </span>

            <span
              className="
                text-[9px]
                font-semibold
                tracking-[-0.01em]
                text-[#1A1A1A]
                sm:text-[11px]
                lg:text-xs
              "
            >
              {capability.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   15 — MAIN ENTERPRISE PAGE
========================================================= */

const EnterpriseReadiness = memo(() => {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#F7F7F8]"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Header />

      <main className="flex-1">
        {/* =====================================================
            01 — HERO
        ===================================================== */}

        <div
          id="enterprise"
          data-testid="enterprise-readiness"
          className="mt-6 sm:mt-10 relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:min-h-[700px] lg:py-20"
        >
          {/* Hero colorful background */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 60% at 96% 50%, rgba(255,107,0,0.10), transparent 68%), radial-gradient(35% 45% at 100% 45%, rgba(255,140,66,0.07), transparent 72%)",
            }}
          />

          <div className="relative w-full px-5 sm:px-10 lg:pl-16 lg:pr-0 xl:pl-24">
            <div className="relative grid min-h-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-4">
              {/* HERO — LEFT */}

              <ScrollReveal className="relative z-10">
                <div className="relative z-10 max-w-[560px] text-left">
                  <h1
                    className="font-semibold leading-[1.08] tracking-[-0.045em] text-[#1A1A1A] [text-wrap:balance]"
                    style={{
                      fontSize:
                        "clamp(2.1rem, 1.5rem + 2.2vw, 3.75rem)",
                    }}
                  >
                    Enterprise AI on One{" "}
                    <span className="block">
                      <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C42] to-[#E85D9E] bg-clip-text text-transparent">
                        Intelligent Platform.
                      </span>
                    </span>
                  </h1>

                  <p
                    className="
                      mt-5
                      max-w-[500px]
                      text-[15px]
                      leading-[1.7]
                      text-[#6B7280]
                      sm:text-base
                      lg:mt-6
                      lg:text-[17px]
                    "
                  >
                    Discover a growing ecosystem of AI capabilities—from
                    intelligent conversations and coding to automation,
                    research, content creation, and advanced analytics—all
                    seamlessly connected through{" "}
                    <span className="font-semibold text-[#FF6B00]">
                      Rivinity
                    </span>
                    .
                  </p>

                  {/* Hero Actions */}
                  <div className="mt-8 flex w-full flex-col sm:w-auto sm:flex-row items-stretch sm:items-center gap-3.5 sm:mt-10">
                    <a
                      href="#contact"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#FF6B00]
                        px-6
                        py-3.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-[0_12px_24px_-10px_rgba(255,107,0,0.45)]
                        transition-all
                        hover:bg-[#E55F00]
                        hover:shadow-[0_16px_32px_-10px_rgba(255,107,0,0.55)]
                        active:scale-[0.98]
                      "
                    >
                      <span>Request Enterprise Demo</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <a
                      href="#platform"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#E5E7EB]
                        bg-white
                        px-6
                        py-3.5
                        text-sm
                        font-semibold
                        text-[#374151]
                        shadow-sm
                        transition-all
                        hover:border-[#D1D5DB]
                        hover:bg-[#FAFAFA]
                        hover:text-[#111827]
                        active:scale-[0.98]
                      "
                    >
                      Explore Platform
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* HERO — RIGHT GLOBE (Hidden on screens < 1024px, visible on desktop lg+) */}
              <ScrollReveal className="relative hidden lg:flex items-center justify-end overflow-visible w-full pr-0">
                <div className="relative w-full max-w-[420px] sm:max-w-[540px] lg:max-w-none lg:w-full ml-auto">
                  <CapabilityGlobe />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* =====================================================
            02 — TRUSTED BY
        ===================================================== */}

        <section className="border-y border-[#E5E7EB] bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div
                className="
                  text-center
                  text-[10px]
                  font-semibold
                  tracking-[0.18em]
                  text-[#9CA3AF]
                  sm:text-xs
                "
              >
                BUILT FOR TEAMS BUILDING WHAT&apos;S NEXT
              </div>

              {(() => {
                const trustedLogos = [
                  {
                    src: "/logos/nvidia.svg",
                    alt: "NVIDIA",
                  },
                  {
                    src: "/logos/supabase.svg",
                    alt: "Supabase",
                  },
                  {
                    src: "/logos/openai.svg",
                    alt: "OpenAI",
                  },
                  {
                    src: "/logos/turso.svg",
                    alt: "Turso",
                  },
                  {
                    src: "/logos/vercel.svg",
                    alt: "Vercel",
                  },
                  {
                    src: "/logos/github.svg",
                    alt: "GitHub",
                  },
                  {
                    src: "/logos/clerk.svg",
                    alt: "Clerk",
                  },
                ];

                return (
                  <div
                    className="
                      relative
                      mt-8
                      overflow-hidden
                      sm:mt-10
                      [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
                    "
                  >
                    <motion.div
                      className="
                        flex
                        w-max
                        items-center
                        gap-12
                        sm:gap-16
                        lg:gap-20
                      "
                      animate={{
                        x: ["0%", "-50%"],
                      }}
                      transition={{
                        duration: 25,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    >
                      {[...trustedLogos, ...trustedLogos].map(
                        (logo, index) => (
                          <div
                            key={`${logo.alt}-${index}`}
                            className="
                              flex
                              h-12
                              min-w-[120px]
                              shrink-0
                              items-center
                              justify-center
                              sm:min-w-[140px]
                            "
                          >
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              loading="lazy"
                              draggable={false}
                              className="
                                pointer-events-none
                                h-5
                                w-auto
                                max-w-[120px]
                                select-none
                                object-contain
                                opacity-50
                                grayscale
                                transition-all
                                duration-300
                                hover:opacity-100
                                hover:grayscale-0
                                sm:h-6
                                sm:max-w-[140px]
                              "
                            />
                          </div>
                        )
                      )}
                    </motion.div>
                  </div>
                );
              })()}
            </ScrollReveal>
          </div>
        </section>

        {/* =====================================================
            03 — ENTERPRISE OS — TABBED PLATFORM
        ===================================================== */}

        <section
          id="platform"
          className="relative overflow-hidden bg-[#F7F7F8] py-20 sm:py-24 lg:py-32"
        >
          <AmbientGlow side="right" />
          <AmbientGlow side="left" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="One intelligent layer for your entire organization."
                description="Rivinity connects AI, data, applications, and workflows into one intelligent operating layer designed for modern enterprise systems."
                centered
              />
            </ScrollReveal>

            <EnterpriseTabs />
          </div>
        </section>

        {/* =====================================================
            04 — CAPABILITIES
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            border-y
            border-[#E5E7EB]
            bg-white
            py-20
            sm:py-24
            lg:py-32
          "
        >
          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Everything you need to build with intelligence."
                description="From autonomous agents to enterprise analytics, Rivinity gives teams the tools to build and operate intelligent systems."
                centered
              />
            </ScrollReveal>

            <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
              {enterpriseCapabilities.map((item, index) => {
                const Icon = item.icon;

                const tone =
                  toneStyles[
                  ([
                    "purple",
                    "peach",
                    "pink",
                    "sky",
                  ] as Tone[])[index % 4]
                  ];

                return (
                  <ScrollReveal key={item.title}>
                    <div
                      className="
                        group
                        relative
                        h-full
                        overflow-hidden
                        rounded-[1.75rem]
                        border
                        border-[#E5E7EB]
                        bg-white
                        p-6
                        shadow-[0_12px_40px_-30px_rgba(20,20,40,0.22)]
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-[#FFD9BF]
                        hover:shadow-[0_24px_55px_-30px_rgba(255,107,0,0.18)]
                        sm:p-7
                      "
                    >
                      <div className="relative z-10">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            transition-transform
                            duration-500
                            group-hover:scale-105
                            sm:h-12
                            sm:w-12
                          "
                          style={{
                            background: tone.bg,
                            boxShadow: `inset 0 0 0 1px ${tone.ring}`,
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{
                              color: tone.icon,
                            }}
                          />
                        </div>

                        <h3
                          className="
                            mt-6
                            text-[1.15rem]
                            font-semibold
                            tracking-[-0.025em]
                            text-[#1A1A1A]
                            sm:mt-7
                            sm:text-xl
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-2.5
                            text-[15px]
                            leading-7
                            text-[#6B7280]
                            sm:mt-3
                          "
                        >
                          {item.description}
                        </p>

                        <div
                          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                          style={{
                            color: tone.icon,
                          }}
                        >
                          Learn more

                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            05 — SECURITY
        ===================================================== */}

        <section
          id="security"
          className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* =================================================
                HEADER
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-balance text-3xl font-bold tracking-tight text-[#F97316] md:text-4xl lg:text-5xl">
                Enterprise-grade{" "}
                <span className="text-gradient">Security.</span>
                <br />
                Built in from Day One.
              </h2>
            </motion.div>

            {/* =================================================
                CERTIFICATIONS
            ================================================= */}

            <div
              className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16"
              style={{ transform: "translateZ(0)" }}
            >
              {[
                {
                  icon: Shield,
                  title: "SOC 2 Type II",
                  description: "Enterprise security certified",
                },
                {
                  icon: Lock,
                  title: "ISO 9001",
                  description: "Information security management",
                },
                {
                  icon: Server,
                  title: "GDPR Compliance",
                  description: "Privacy and data protection",
                },
                {
                  icon: FileCheck,
                  title: "MeitY Compliant",
                  description: "Government standards aligned",
                },
              ].map((cert, index) => {
                const Icon = cert.icon;

                return (
                  <motion.div
                    key={cert.title}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    className="group flex flex-col items-center text-center"
                  >
                    <div
                      className="
                        mb-4
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#E5E7EB]
                        bg-gradient-to-br
                        from-[#FFF7ED]
                        to-[#FFEDD5]
                        transition-all
                        duration-300
                        group-hover:border-[#F97316]
                        group-hover:shadow-[0_15px_35px_-20px_rgba(249,115,22,0.25)]
                        md:h-24
                        md:w-24
                      "
                    >
                      <Icon
                        className="
                          h-8
                          w-8
                          text-[#F97316]
                          transition-colors
                          duration-300
                          group-hover:text-[#F97316]
                          md:h-10
                          md:w-10
                        "
                      />
                    </div>

                    <h3 className="font-semibold text-[#F97316]">
                      {cert.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      {cert.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* =================================================
                DEPLOYMENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              className="mt-16 text-center"
            >
              <div className="mb-8 text-xl font-semibold text-[#000000] md:text-2xl">
                Built to run anywhere your business runs
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  {
                    name: "Rivinity Cloud",
                    desc: "Fully managed AI infrastructure",
                  },
                  {
                    name: "Private Cloud (VPC)",
                    desc: "Your security perimeter, our scale",
                  },
                  {
                    name: "On-Premise",
                    desc: "Full control, air-gapped if needed",
                  },
                ].map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1,
                    }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-[#FFF7ED]
                        to-[#FFEDD5]
                      "
                    >
                      <div className="h-3 w-3 rounded-full bg-[#F97316]" />
                    </div>

                    <div className="text-left">
                      <p className="font-medium text-[#F97316]">
                        {option.name}
                      </p>

                      <p className="text-sm text-[#6B7280]">
                        {option.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            06 — INTEGRATIONS
        ===================================================== */}

        <section
          id="integrations"
          className="relative overflow-hidden border-y border-[#E5E7EB] bg-white py-20 sm:py-24 lg:py-32"
        >
          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Heading */}

            <ScrollReveal>
              <SectionHeading
                title="Works with the systems you already use."
                description="Connect Rivinity with your existing cloud infrastructure, databases, developer tools, APIs, and enterprise applications."
                centered
              />
            </ScrollReveal>

            {/* =====================================================
                INFINITE SLIDER — SINGLE CONTINUOUS ROW (RIGHT TO LEFT)
            ===================================================== */}

            <ScrollReveal>
              <div
                className="
                  relative
                  mt-12
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-[#E5E7EB]
                  bg-[#FAFAFA]
                  py-6
                  sm:mt-16
                  sm:py-8
                  [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]
                "
              >
                {/* Left fade fallback */}
                <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-8 sm:w-20 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
                {/* Right fade fallback */}
                <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-8 sm:w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent" />

                <motion.div
                  className="flex w-max items-center gap-3.5 sm:gap-5"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    duration: 35,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...integrations, ...integrations].map(
                    (integration, index) => {
                      const Icon = integration.icon;

                      const tone =
                        toneStyles[
                        (
                          [
                            "peach",
                            "pink",
                            "sky",
                            "purple",
                          ] as Tone[]
                        )[index % 4]
                        ];

                      return (
                        <div
                          key={`integration-single-${integration.name}-${index}`}
                          className="
                            group
                            relative
                            flex
                            h-[120px]
                            w-[120px]
                            shrink-0
                            flex-col
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#E5E7EB]
                            bg-white
                            p-3.5
                            text-center
                            shadow-[0_10px_35px_-30px_rgba(20,20,40,0.3)]
                            transition-all
                            duration-300
                            hover:-translate-y-1.5
                            hover:border-[#DADDE3]
                            hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.12)]
                            sm:h-[145px]
                            sm:w-[145px]
                            sm:p-5
                            sm:rounded-[1.75rem]
                            lg:h-[160px]
                            lg:w-[160px]
                          "
                        >
                          {/* Icon */}
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              transition-transform
                              duration-500
                              group-hover:scale-110
                              sm:h-12
                              sm:w-12
                              sm:rounded-2xl
                              lg:h-14
                              lg:w-14
                            "
                            style={{
                              background: tone.bg,
                            }}
                          >
                            <Icon
                              className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                              style={{
                                color: tone.icon,
                              }}
                            />
                          </div>

                          {/* Name */}
                          <span
                            className="
                              mt-2.5
                              whitespace-nowrap
                              text-[11px]
                              font-semibold
                              text-[#1A1A1A]
                              sm:mt-4
                              sm:text-xs
                              lg:text-sm
                            "
                          >
                            {integration.name}
                          </span>

                          {/* Connected */}
                          <span
                            className="
                              mt-0.5
                              text-[9px]
                              text-[#9CA3AF]
                              opacity-0
                              transition-opacity
                              duration-300
                              group-hover:opacity-100
                            "
                          >
                            Connected
                          </span>
                        </div>
                      );
                    }
                  )}
                </motion.div>
              </div>
            </ScrollReveal>

            {/* CTA */}

            <ScrollReveal>
              <div className="mt-10 flex justify-center sm:mt-12">
                <a
                  href="#"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#FF6B00]
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#E85F00]
                    hover:shadow-lg
                    sm:text-sm
                  "
                >
                  Explore all integrations

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Metric Badges */}
        <section className="border-b border-gray-200/80 bg-gray-50/50 py-12">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">99.99%</span>
                <span className="mt-1 text-xs text-[#6B7280]">Guaranteed SLA Uptime</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">SOC 2</span>
                <span className="mt-1 text-xs text-[#6B7280]">Type II Certified</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">100+</span>
                <span className="mt-1 text-xs text-[#6B7280]">Supported Integrations</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">24/7</span>
                <span className="mt-1 text-xs text-[#6B7280]">Enterprise Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            08 — UNIFIED DYNAMIC FAQ SECTION
        ===================================================== */}

        <FaqSection
          title="Questions about Rivinity Enterprise?"
          subtitle="Everything you need to know about deploying intelligent systems across your organization."
          items={enterpriseFAQs}
          className="w-full py-16 md:py-24 bg-white"
        />

        {/* Pre-footer CTA */}
        <CtaSection
          title="Accelerate your enterprise with Rivinity AI"
          description="Deploy isolated VPC runtimes, custom fine-tuned foundation models, and guaranteed 99.99% SLAs with dedicated solutions engineering support."
          buttonText="Request Enterprise Demo"
          buttonHref="/contact"
          secondaryText="Contact Sales Team"
          secondaryHref="/contact"
        />
      </main>

      <Footer />
    </div>
  );
});

EnterpriseReadiness.displayName = "EnterpriseReadiness";

export default EnterpriseReadiness;