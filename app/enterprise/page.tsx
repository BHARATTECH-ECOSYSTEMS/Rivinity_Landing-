"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  ShieldCheck,
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
  Cpu,
  Check,
  CheckCircle2,
  Radio,
  Sliders,
  Terminal,
  Clock,
  KeyRound,
  FileText,
  ChevronDown,
  Layers,
  Zap,
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
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div
          className={`mb-5 flex items-center gap-2 text-sm font-medium text-[#6B7280] ${
            centered ? "justify-center" : ""
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
          className={`mt-6 max-w-2xl text-lg leading-8 text-[#6B7280] ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  ),
);

SectionHeading.displayName = "SectionHeading";

/* =========================================================
   10 — NEO-GEOMETRIC BENTO PRIMITIVES & SVG ARTIFACTS
========================================================= */

const Crosshairs = memo(() => null);
Crosshairs.displayName = "Crosshairs";

/** Concentric Radar Circles Vector */
function ConcentricRadarSvg({
  color = "#FF6B00",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="80"
        cy="80"
        r="70"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.18"
        strokeDasharray="3 3"
      />
      <circle
        cx="80"
        cy="80"
        r="52"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.32"
      />
      <circle
        cx="80"
        cy="80"
        r="34"
        stroke={color}
        strokeWidth="1.4"
        strokeOpacity="0.5"
      />
      <circle
        cx="80"
        cy="80"
        r="16"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.75"
      />
      <circle cx="80" cy="80" r="4" fill={color} />
      {/* Coordinate axes crosshairs */}
      <line
        x1="80"
        y1="2"
        x2="80"
        y2="158"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="2 2"
      />
      <line
        x1="2"
        y1="80"
        x2="158"
        y2="80"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="2 2"
      />
      {/* Degree ticks */}
      <line
        x1="80"
        y1="6"
        x2="80"
        y2="12"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="80"
        y1="148"
        x2="80"
        y2="154"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="6"
        y1="80"
        x2="12"
        y2="80"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="148"
        y1="80"
        x2="154"
        y2="80"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <circle cx="116" cy="56" r="3" fill={color} fillOpacity="0.9" />
      <circle cx="50" cy="104" r="2.5" fill={color} fillOpacity="0.7" />
    </svg>
  );
}

/** High-Speed Latency Pulse Waveform Vector */
function LatencyPulseSvg({
  color = "#EC4899",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      {/* Benchmark radial guide */}
      <circle
        cx="80"
        cy="70"
        r="54"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.16"
        strokeDasharray="3 3"
      />
      <circle
        cx="80"
        cy="70"
        r="34"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.28"
      />

      {/* Latency telemetry wave */}
      <path
        d="M 18 70 L 48 70 L 60 44 L 72 96 L 84 32 L 96 88 L 106 60 L 114 74 L 142 70"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Target latency threshold marker at sub-15ms */}
      <circle cx="84" cy="32" r="4.5" fill={color} />
      <circle
        cx="84"
        cy="32"
        r="9"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Baseline SLA threshold */}
      <line
        x1="24"
        y1="46"
        x2="136"
        y2="46"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.3"
        strokeDasharray="2 2"
      />
      <text
        x="26"
        y="42"
        fill={color}
        fillOpacity="0.8"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
      >
        P99 &lt; 15ms
      </text>
    </svg>
  );
}

/** Neo-Geometric Concentric Arches Vector (Image 1 & 2 Pattern - Orange Palette) */
function ConcentricArchSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 130"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <path d="M 16,120 A 96,96 0 0,1 208,120 Z" fill="#EA580C" />
      <path d="M 16,120 A 78,78 0 0,1 172,120 Z" fill="#F97316" />
      <path d="M 16,120 A 60,60 0 0,1 136,120 Z" fill="#FB923C" />
      <path d="M 16,120 A 42,42 0 0,1 100,120 Z" fill="#FDBA74" />
      <path d="M 16,120 A 24,24 0 0,1 64,120 Z" fill="#FFFFFF" />
    </svg>
  );
}

/** Neo-Geometric Stepping Triangle Mosaic Matrix Vector (Image 1 & 2 Pattern - Purple Palette) */
function TriangleMosaicSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 110"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      {/* Row 1 (10 triangles) */}
      <g transform="translate(0, 0)">
        <polygon points="0,22 14,22 14,8" fill="#9333EA" fillOpacity="0.9" />
        <polygon points="15,22 29,22 29,8" fill="#A855F7" fillOpacity="0.8" />
        <polygon points="30,22 44,22 44,8" fill="#C084FC" fillOpacity="0.95" />
        <polygon points="45,22 59,22 59,8" fill="#7E22CE" fillOpacity="0.75" />
        <polygon points="60,22 74,22 74,8" fill="#9333EA" fillOpacity="0.85" />
        <polygon points="75,22 89,22 89,8" fill="#A855F7" fillOpacity="0.9" />
        <polygon
          points="90,22 104,22 104,8"
          fill="#DDD6FE"
          fillOpacity="0.95"
        />
        <polygon
          points="105,22 119,22 119,8"
          fill="#7E22CE"
          fillOpacity="0.7"
        />
        <polygon
          points="120,22 134,22 134,8"
          fill="#6B21A8"
          fillOpacity="0.85"
        />
        <polygon
          points="135,22 149,22 149,8"
          fill="#C084FC"
          fillOpacity="0.75"
        />
      </g>
      {/* Row 2 (12 triangles) */}
      <g transform="translate(0, 24)">
        <polygon points="0,22 14,22 14,8" fill="#A855F7" fillOpacity="0.85" />
        <polygon points="15,22 29,22 29,8" fill="#C084FC" fillOpacity="0.9" />
        <polygon points="30,22 44,22 44,8" fill="#7E22CE" fillOpacity="0.7" />
        <polygon points="45,22 59,22 59,8" fill="#DDD6FE" fillOpacity="0.95" />
        <polygon points="60,22 74,22 74,8" fill="#9333EA" fillOpacity="0.8" />
        <polygon points="75,22 89,22 89,8" fill="#6B21A8" fillOpacity="0.85" />
        <polygon points="90,22 104,22 104,8" fill="#A855F7" fillOpacity="0.9" />
        <polygon
          points="105,22 119,22 119,8"
          fill="#C084FC"
          fillOpacity="0.75"
        />
        <polygon
          points="120,22 134,22 134,8"
          fill="#9333EA"
          fillOpacity="0.8"
        />
        <polygon
          points="135,22 149,22 149,8"
          fill="#7E22CE"
          fillOpacity="0.85"
        />
        <polygon
          points="150,22 164,22 164,8"
          fill="#A855F7"
          fillOpacity="0.9"
        />
        <polygon
          points="165,22 179,22 179,8"
          fill="#DDD6FE"
          fillOpacity="0.7"
        />
      </g>
      {/* Row 3 (14 triangles) */}
      <g transform="translate(0, 48)">
        <polygon points="0,22 14,22 14,8" fill="#7E22CE" fillOpacity="0.9" />
        <polygon points="15,22 29,22 29,8" fill="#9333EA" fillOpacity="0.85" />
        <polygon points="30,22 44,22 44,8" fill="#A855F7" fillOpacity="0.9" />
        <polygon points="45,22 59,22 59,8" fill="#C084FC" fillOpacity="0.75" />
        <polygon points="60,22 74,22 74,8" fill="#DDD6FE" fillOpacity="0.95" />
        <polygon points="75,22 89,22 89,8" fill="#7E22CE" fillOpacity="0.8" />
        <polygon points="90,22 104,22 104,8" fill="#9333EA" fillOpacity="0.9" />
        <polygon
          points="105,22 119,22 119,8"
          fill="#A855F7"
          fillOpacity="0.75"
        />
        <polygon
          points="120,22 134,22 134,8"
          fill="#6B21A8"
          fillOpacity="0.85"
        />
        <polygon
          points="135,22 149,22 149,8"
          fill="#C084FC"
          fillOpacity="0.9"
        />
        <polygon
          points="150,22 164,22 164,8"
          fill="#9333EA"
          fillOpacity="0.7"
        />
        <polygon
          points="165,22 179,22 179,8"
          fill="#A855F7"
          fillOpacity="0.85"
        />
        <polygon
          points="180,22 194,22 194,8"
          fill="#DDD6FE"
          fillOpacity="0.9"
        />
        <polygon
          points="195,22 209,22 209,8"
          fill="#7E22CE"
          fillOpacity="0.75"
        />
      </g>
      {/* Row 4 (16 triangles) */}
      <g transform="translate(0, 72)">
        <polygon points="0,22 14,22 14,8" fill="#C084FC" fillOpacity="0.85" />
        <polygon points="15,22 29,22 29,8" fill="#A855F7" fillOpacity="0.9" />
        <polygon points="30,22 44,22 44,8" fill="#7E22CE" fillOpacity="0.75" />
        <polygon points="45,22 59,22 59,8" fill="#9333EA" fillOpacity="0.95" />
        <polygon points="60,22 74,22 74,8" fill="#DDD6FE" fillOpacity="0.8" />
        <polygon points="75,22 89,22 89,8" fill="#A855F7" fillOpacity="0.9" />
        <polygon
          points="90,22 104,22 104,8"
          fill="#7E22CE"
          fillOpacity="0.85"
        />
        <polygon
          points="105,22 119,22 119,8"
          fill="#9333EA"
          fillOpacity="0.7"
        />
        <polygon
          points="120,22 134,22 134,8"
          fill="#C084FC"
          fillOpacity="0.9"
        />
        <polygon
          points="135,22 149,22 149,8"
          fill="#6B21A8"
          fillOpacity="0.8"
        />
        <polygon
          points="150,22 164,22 164,8"
          fill="#A855F7"
          fillOpacity="0.85"
        />
        <polygon
          points="165,22 179,22 179,8"
          fill="#DDD6FE"
          fillOpacity="0.9"
        />
        <polygon
          points="180,22 194,22 194,8"
          fill="#7E22CE"
          fillOpacity="0.75"
        />
        <polygon
          points="195,22 209,22 209,8"
          fill="#9333EA"
          fillOpacity="0.85"
        />
        <polygon
          points="210,22 224,22 224,8"
          fill="#A855F7"
          fillOpacity="0.9"
        />
        <polygon
          points="225,22 239,22 239,8"
          fill="#C084FC"
          fillOpacity="0.75"
        />
      </g>
    </svg>
  );
}

/** Neo-Geometric Sliced Bars, Wedge & Quarter-Circle Vector (Image 1 & 2 Pattern - Pink Palette) */
function SlicedBarsGeometrySvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 110"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      {/* Sliced bars with increasing widths in pink shades */}
      <rect x="0" y="10" width="3" height="90" fill="#F43F5E" />
      <rect x="5" y="10" width="4" height="90" fill="#FB7185" />
      <rect x="11" y="10" width="5" height="90" fill="#F472B6" />
      <rect x="18" y="10" width="7" height="90" fill="#FDA4AF" />
      <rect x="27" y="10" width="10" height="90" fill="#F472B6" />
      <rect x="39" y="10" width="14" height="90" fill="#EC4899" />
      <rect x="55" y="10" width="22" height="90" fill="#DB2777" />
      <rect x="79" y="10" width="38" height="90" fill="#BE185D" />

      {/* Diagonal Triangle Wedge */}
      <polygon points="120,10 160,10 120,100" fill="#9D174D" />

      {/* Quarter Circle Disc */}
      <path d="M 168,100 L 168,10 A 90,90 0 0,1 258,100 Z" fill="#831843" />
    </svg>
  );
}

/** Overlapping Diamonds Pattern (Image 1 Style - Orange Palette) */
function OverlappingDiamondsSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <g style={{ mixBlendMode: "multiply" }}>
        {/* Diamond 1 tilted left */}
        <rect
          x="30"
          y="35"
          width="85"
          height="85"
          rx="16"
          transform="rotate(-15 72 77)"
          fill="#FB923C"
          fillOpacity="0.85"
        />
        {/* Diamond 2 tilted right */}
        <rect
          x="105"
          y="35"
          width="85"
          height="85"
          rx="16"
          transform="rotate(15 147 77)"
          fill="#EA580C"
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
}

/** Overlapping Circles Pattern (Image 1 Style - Pink Palette) */
function OverlappingCirclesSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <g style={{ mixBlendMode: "multiply" }}>
        {/* Circle 1 */}
        <circle cx="75" cy="75" r="50" fill="#FDA4AF" fillOpacity="0.85" />
        {/* Circle 2 */}
        <circle cx="125" cy="75" r="50" fill="#F43F5E" fillOpacity="0.8" />
      </g>
    </svg>
  );
}

/**
 * Mosaic Gradient Grid with configurable color & frosted glass pill button (Image 2 style)
 */
const MOSAIC_OPACITY_MATRIX = [
  [
    0.72, 0.58, 0.44, 0.28, 0.14, 0.05, 0.0, 0.0, 0.0, 0.02, 0.08, 0.14, 0.2,
    0.26,
  ],
  [
    0.82, 0.68, 0.52, 0.36, 0.2, 0.08, 0.0, 0.0, 0.02, 0.06, 0.12, 0.18, 0.25,
    0.32,
  ],
  [
    0.9, 0.76, 0.6, 0.44, 0.28, 0.14, 0.04, 0.01, 0.05, 0.1, 0.16, 0.24, 0.32,
    0.4,
  ],
  [
    0.96, 0.84, 0.68, 0.52, 0.36, 0.22, 0.08, 0.04, 0.08, 0.14, 0.2, 0.3, 0.38,
    0.46,
  ],
];

function MosaicGradientGridCanvas({
  color = "#EA580C",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const cols = 14;
  const rows = 4;
  const totalW = 350;
  const totalH = 100;
  const cellW = totalW / cols;
  const cellH = totalH / rows;

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <rect width={totalW} height={totalH} fill="#ffffff" />
        {MOSAIC_OPACITY_MATRIX.map((row, r) =>
          row.map((opacity, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * cellW}
              y={r * cellH}
              width={cellW}
              height={cellH}
              fill={color}
              fillOpacity={opacity}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
          )),
        )}
      </svg>
    </div>
  );
}

/** Overlapping Squares Pattern (Image 1 Style - Purple Palette) */
function OverlappingSquaresSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <g style={{ mixBlendMode: "multiply" }}>
        {/* Square 1 */}
        <rect
          x="40"
          y="30"
          width="80"
          height="80"
          rx="12"
          transform="rotate(-10 80 70)"
          fill="#C084FC"
          fillOpacity="0.85"
        />
        {/* Square 2 */}
        <rect
          x="80"
          y="40"
          width="80"
          height="80"
          rx="12"
          transform="rotate(12 120 80)"
          fill="#7E22CE"
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
}

/** Interlocking Pill Rings Vector */
function InterlockingPillsSvg({
  color = "#8B5CF6",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      {/* Pill 1 */}
      <rect
        x="20"
        y="30"
        width="90"
        height="45"
        rx="22.5"
        stroke={color}
        strokeWidth="1.4"
        strokeOpacity="0.45"
        strokeDasharray="4 2"
      />
      {/* Pill 2 (Interlocking) */}
      <rect
        x="55"
        y="60"
        width="90"
        height="45"
        rx="22.5"
        stroke={color}
        strokeWidth="1.6"
        strokeOpacity="0.75"
      />
      {/* Central orbital node */}
      <circle cx="75" cy="75" r="5" fill={color} fillOpacity="0.9" />
      <circle
        cx="75"
        cy="75"
        r="10"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <circle cx="35" cy="52.5" r="2.5" fill={color} fillOpacity="0.6" />
      <circle cx="125" cy="82.5" r="3" fill={color} fillOpacity="0.8" />
    </svg>
  );
}

/** Dual Offset Semicircles Vector */
function OffsetSemicirclesSvg({
  color = "#EC4899",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer semicircle arc 1 */}
      <path
        d="M 20 70 A 50 50 0 0 1 120 70"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      {/* Offset semicircle arc 2 */}
      <path
        d="M 35 78 A 38 38 0 0 0 111 78"
        stroke={color}
        strokeWidth="1.8"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      {/* Concentric inner arc */}
      <path
        d="M 48 70 A 22 22 0 0 1 92 70"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <circle cx="70" cy="70" r="3.5" fill={color} />
      <line
        x1="10"
        y1="70"
        x2="130"
        y2="70"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="2 2"
      />
      <line
        x1="70"
        y1="15"
        x2="70"
        y2="125"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="2 2"
      />
      <text
        x="75"
        y="64"
        fill={color}
        fillOpacity="0.7"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="600"
      >
        R:48
      </text>
    </svg>
  );
}

/** Concentric Rounded Squares & BYOC Network Vector */
function ByocNetworkDiagramSvg() {
  return (
    <svg
      viewBox="0 0 340 180"
      fill="none"
      className="w-full h-auto max-h-[160px] select-none"
      aria-hidden="true"
    >
      {/* Outer VPC Perimeter */}
      <rect
        x="10"
        y="10"
        width="320"
        height="160"
        rx="20"
        stroke="#FF6B00"
        strokeWidth="1.2"
        strokeOpacity="0.4"
        strokeDasharray="4 3"
      />
      <text
        x="140"
        y="24"
        fill="#EA580C"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="600"
        letterSpacing="0.05em"
      >
        CUSTOMER VPC BOUNDARY
      </text>

      {/* Internal Subnet / Cluster Box */}
      <rect
        x="140"
        y="45"
        width="170"
        height="105"
        rx="14"
        stroke="#FF6B00"
        strokeWidth="1.2"
        strokeOpacity="0.6"
        fill="#FFF9F5"
      />
      <text
        x="154"
        y="65"
        fill="#1A1A1A"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Dedicated Triton Cluster
      </text>

      {/* Cluster Nodes */}
      <rect
        x="154"
        y="78"
        width="68"
        height="28"
        rx="6"
        fill="#ffffff"
        stroke="#FF6B00"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <text
        x="162"
        y="96"
        fill="#FF6B00"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="600"
      >
        GPU-01 (H100)
      </text>

      <rect
        x="230"
        y="78"
        width="68"
        height="28"
        rx="6"
        fill="#ffffff"
        stroke="#FF6B00"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <text
        x="238"
        y="96"
        fill="#FF6B00"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="600"
      >
        GPU-02 (H100)
      </text>

      <rect
        x="154"
        y="112"
        width="144"
        height="26"
        rx="6"
        fill="#ffffff"
        stroke="#E5E7EB"
        strokeWidth="0.8"
      />
      <text x="166" y="129" fill="#4B5563" fontSize="9" fontFamily="monospace">
        Shared NVLink Fabric (900 GB/s)
      </text>

      {/* PrivateLink / PSC Gateway Node */}
      <rect
        x="26"
        y="65"
        width="82"
        height="65"
        rx="12"
        stroke="#FF6B00"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        fill="#ffffff"
      />
      <text
        x="36"
        y="85"
        fill="#1A1A1A"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="bold"
      >
        PrivateLink
      </text>
      <text x="36" y="99" fill="#FF6B00" fontSize="8" fontFamily="monospace">
        VPC Peering
      </text>
      <text
        x="36"
        y="117"
        fill="#10B981"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
      >
        • Active
      </text>

      {/* Connection Bus */}
      <path
        d="M 108 97 L 140 97"
        stroke="#FF6B00"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <circle cx="108" cy="97" r="3" fill="#FF6B00" />
      <circle cx="140" cy="97" r="3" fill="#FF6B00" />
    </svg>
  );
}

/** Direct Enterprise Qualification & Intake Form Component */
function EnterpriseIntakeForm() {
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("50-250");
  const [cloudProvider, setCloudProvider] = useState("AWS");
  const [timeline, setTimeline] = useState("Within 30 Days");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 550);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-10 shadow-lg relative overflow-hidden text-center">
        <div className="relative z-10 py-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
            Enterprise Scoping Initialized
          </h3>
          <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            Our Enterprise Infrastructure &amp; Security Engineering team has
            received your cluster specifications. A dedicated Solutions
            Architect will reach out to{" "}
            <span className="font-semibold text-gray-900">{email}</span> within
            2 hours with our SOC 2 compliance package and direct calendar link.
          </p>
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail("");
                setNotes("");
              }}
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline cursor-pointer"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xs relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
          Request Architecture Scoping &amp; Demo
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-gray-500">
          Direct qualification with our ML systems engineering team. Under 100%
          mutual NDA.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Work Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Work Email <span className="text-gray-400 font-normal normal-case">(required)</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@enterprise.com"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all shadow-xs"
            />
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Company Size (Employees)
            </label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["1-50", "50-250", "250-1000", "1000+"].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setCompanySize(size)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all text-center cursor-pointer ${
                    companySize === size
                      ? "border-gray-950 bg-gray-950 text-white font-semibold shadow-xs"
                      : "border-gray-200 bg-gray-50/60 text-gray-700 hover:border-gray-300 hover:bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Cloud Provider Preference */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Cloud Provider Preference
            </label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["AWS", "GCP", "Azure", "On-Prem"].map((provider) => (
                <button
                  type="button"
                  key={provider}
                  onClick={() => setCloudProvider(provider)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all text-center cursor-pointer ${
                    cloudProvider === provider
                      ? "border-gray-950 bg-gray-950 text-white font-semibold shadow-xs"
                      : "border-gray-200 bg-gray-50/60 text-gray-700 hover:border-gray-300 hover:bg-white"
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>

          {/* Target Deployment Timeline */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Target Deployment Timeline
            </label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Immediate", "Within 30 Days", "1-3 Months", "Exploring"].map(
                (time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setTimeline(time)}
                    className={`rounded-xl border px-2.5 py-2.5 text-[11px] sm:text-xs font-medium transition-all text-center cursor-pointer ${
                      timeline === time
                        ? "border-gray-950 bg-gray-950 text-white font-semibold shadow-xs"
                        : "border-gray-200 bg-gray-50/60 text-gray-700 hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    {time}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Architecture Notes (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Architecture &amp; Security Requirements <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Single-tenant VPC peering, CMEK key management, custom fine-tuning weights..."
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all shadow-xs"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
          >
            <span>
              {loading
                ? "Initializing Scoping..."
                : "Schedule Enterprise Architecture Review"}
            </span>
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   13 — AMBIENT GLOW
========================================================= */

const AmbientGlow = ({ side }: { side: "left" | "right" }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute ${
      side === "right"
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

          <mask
            id="fade-into-logo"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100"
            height="100"
          >
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="url(#line-fade-grad)"
            />
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
            filter: "drop-shadow(0 0 35px rgba(255,107,0,0.16))",
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
              transform: "translate(-100%, -50%)",
              background: "#ffffff",
              border: "1px solid #E5E7EB",
              boxShadow:
                "0 8px 20px -12px rgba(20,20,40,0.22), 0 2px 6px -2px rgba(20,20,40,0.06)",
              gap: "clamp(4px, 0.25rem + 0.2vw, 8px)",
              padding:
                "clamp(3px, 0.2rem + 0.1vw, 6px) clamp(6px, 0.4rem + 0.2vw, 12px)",
              animationDelay: `${index * 0.15}s`,
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
                background: toneGradient[capability.tone],
                width: "clamp(20px, 1.1rem + 0.35vw, 32px)",
                height: "clamp(20px, 1.1rem + 0.35vw, 32px)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 3px 8px -4px rgba(80,40,40,0.30)",
              }}
            >
              <Icon
                style={{
                  color: "#ffffff",
                  width: "clamp(11px, 0.55rem + 0.18vw, 16px)",
                  height: "clamp(11px, 0.55rem + 0.18vw, 16px)",
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
   14B — FEATURE COMPARISON MATRIX (RESPONSIVE)
========================================================= */

const matrixFeatures = [
  {
    capability: "Compute Isolation",
    standard: "Shared Multi-Tenant",
    enterprise: "Dedicated Single-Tenant VPC",
  },
  {
    capability: "Data Retention Policy",
    standard: "30-Day Diagnostic Log",
    enterprise: "True Zero Data Retention (Stateless)",
  },
  {
    capability: "Custom Fine-Tuning",
    standard: "Shared Base Adapters",
    enterprise: "Proprietary Private LoRA Weights",
  },
  {
    capability: "Integration Support",
    standard: "Community Support",
    enterprise: "Dedicated Solutions Architect + Shared Slack",
  },
  {
    capability: "Support SLA",
    standard: "Best Effort (Email)",
    enterprise: "15-Minute Guaranteed Critical SLA",
  },
  {
    capability: "Network Perimeter",
    standard: "Public HTTPS Endpoints",
    enterprise: "AWS PrivateLink & VPC Peering Only",
  },
  {
    capability: "Encryption Key Control",
    standard: "Provider-Managed AES-256",
    enterprise: "Customer-Managed Keys (CMEK / Vault)",
  },
];

function FeatureComparisonMatrix() {
  const [mobileTab, setMobileTab] = useState<"enterprise" | "standard" | "compare">("enterprise");

  return (
    <div className="w-full">
      {/* Mobile View (< md) */}
      <div className="md:hidden mt-8">
        {/* Segmented Tab Switcher */}
        <div className="flex p-1 bg-gray-100 rounded-xl max-w-sm mx-auto mb-6">
          <button
            type="button"
            onClick={() => setMobileTab("enterprise")}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mobileTab === "enterprise"
                ? "bg-white text-gray-950 shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Enterprise
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("standard")}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mobileTab === "standard"
                ? "bg-white text-gray-950 shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Standard Pro
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("compare")}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mobileTab === "compare"
                ? "bg-white text-gray-950 shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Side by Side
          </button>
        </div>

        {/* Tab 1: Enterprise Dedicated */}
        {mobileTab === "enterprise" && (
          <div className="rounded-2xl border border-orange-200/80 bg-[#FFF5EC] p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-orange-200/50 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-950">Enterprise Dedicated</h3>
                <p className="text-xs text-gray-600 mt-0.5">Sovereign single-tenant infrastructure</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white px-2.5 py-1 rounded-full shadow-2xs">
                Sovereign
              </span>
            </div>
            <div className="space-y-3.5 divide-y divide-orange-100/70">
              {matrixFeatures.map((f, idx) => (
                <div key={f.capability} className={idx === 0 ? "" : "pt-3.5"}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    {f.capability}
                  </span>
                  <div className="mt-1.5 flex items-start gap-2.5 text-gray-950 font-semibold text-xs sm:text-sm">
                    <span className="inline-flex items-center justify-center h-4.5 w-4.5 rounded-full bg-orange-600 text-white shrink-0 mt-0.5 shadow-2xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <div>
                      <span>{f.enterprise}</span>
                      <span className="block mt-0.5 text-[11px] font-normal text-gray-500">
                        vs. {f.standard} on Standard Pro
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Standard Pro */}
        {mobileTab === "standard" && (
          <div className="rounded-2xl border border-purple-200/80 bg-[#FAF5FF] p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-purple-200/50 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-950">Standard Pro</h3>
                <p className="text-xs text-gray-600 mt-0.5">Multi-tenant commercial deployment</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-700 text-white px-2.5 py-1 rounded-full shadow-2xs">
                Multi-Tenant
              </span>
            </div>
            <div className="space-y-3.5 divide-y divide-purple-100/70">
              {matrixFeatures.map((f, idx) => (
                <div key={f.capability} className={idx === 0 ? "" : "pt-3.5"}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    {f.capability}
                  </span>
                  <div className="mt-1.5 text-gray-800 font-medium text-xs sm:text-sm pl-1">
                    <span>{f.standard}</span>
                    <span className="block mt-0.5 text-[11px] font-normal text-gray-500">
                      Enterprise tier: {f.enterprise}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Side by Side Cards */}
        {mobileTab === "compare" && (
          <div className="space-y-3">
            {matrixFeatures.map((f) => (
              <div key={f.capability} className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5">
                  {f.capability}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-[#FAF5FF] p-2.5 border border-purple-100/60">
                    <span className="text-[9px] font-bold text-purple-700 uppercase tracking-wider block">
                      Standard Pro
                    </span>
                    <span className="mt-1 text-[11px] text-gray-700 font-medium block leading-snug">
                      {f.standard}
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#FFF5EC] p-2.5 border border-orange-200/70">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-orange-700 uppercase tracking-wider block">
                        Enterprise
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-wider bg-orange-600 text-white px-1 py-0.2 rounded-full">
                        Sovereign
                      </span>
                    </div>
                    <span className="mt-1 text-[11px] text-gray-950 font-semibold flex items-start gap-1 leading-snug">
                      <Check className="h-3 w-3 text-orange-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>{f.enterprise}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop & Tablet View (>= md) */}
      <div className="hidden md:block mt-12 sm:mt-16 overflow-x-auto pb-4">
        <table className="w-full text-left border-separate border-spacing-1 min-w-[700px] max-w-5xl mx-auto">
          <thead>
            <tr>
              <th className="py-6 px-4 sm:px-6 w-[28%] sm:w-[30%] align-bottom">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Capability
                </span>
              </th>
              <th className="py-6 px-5 sm:px-6 w-[24%] sm:w-[25%] bg-[#FAF5FF] rounded-t-2xl border-b border-white align-middle whitespace-nowrap">
                <span className="text-lg sm:text-xl font-bold text-gray-950">
                  Standard Pro
                </span>
              </th>
              <th className="w-4 sm:w-6 p-0" aria-hidden="true" />
              <th className="py-6 px-6 sm:px-8 w-[44%] sm:w-[45%] bg-[#FFF5EC] rounded-t-2xl border-b border-white align-middle">
                <span className="text-lg sm:text-xl font-bold text-gray-950">
                  Enterprise Dedicated
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {matrixFeatures.map((row, idx) => {
              const isLast = idx === matrixFeatures.length - 1;
              return (
                <tr key={row.capability}>
                  <td
                    className={`py-5 sm:py-6 px-4 sm:px-6 font-medium text-gray-900 ${
                      isLast ? "border-b-0" : "border-b border-gray-100"
                    }`}
                  >
                    {row.capability}
                  </td>
                  <td
                    className={`py-5 sm:py-6 px-5 sm:px-6 text-gray-700 font-medium bg-[#FAF5FF] whitespace-nowrap ${
                      isLast
                        ? "rounded-b-2xl border-b-0"
                        : "border-b border-white"
                    }`}
                  >
                    {row.standard}
                  </td>
                  <td className="w-4 sm:w-6 p-0" aria-hidden="true" />
                  <td
                    className={`py-5 sm:py-6 px-6 sm:px-8 bg-[#FFF5EC] ${
                      isLast
                        ? "rounded-b-2xl border-b-0"
                        : "border-b border-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-gray-950 font-semibold">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-orange-600 text-white shrink-0 shadow-xs">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span>{row.enterprise}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   15 — MAIN ENTERPRISE PAGE
========================================================= */

const EnterpriseReadiness = memo(() => {
  return (
    <div
      className="flex min-h-screen flex-col"
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
          className="relative w-full overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 lg:min-h-[700px]"
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

          <div className="relative w-full px-4 sm:px-6 lg:pr-0 lg:pl-[max(2rem,calc((100%-80rem)/2+2rem))]">
            <div className="relative grid min-h-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
              {/* HERO — LEFT */}

              <ScrollReveal className="relative z-10">
                <div className="relative z-10 max-w-[560px] text-left">
                  <h1
                    className="font-semibold leading-[1.08] tracking-[-0.045em] text-[#1A1A1A] [text-wrap:balance]"
                    style={{
                      fontSize: "clamp(2.1rem, 1.5rem + 2.2vw, 3.75rem)",
                    }}
                  >
                    Enterprise AI on One Intelligent Platform.
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
                    seamlessly connected through Rivinity.
                  </p>

                  {/* Hero Actions — Styled same as CTA Section */}
                  <div className="mt-8 flex w-full flex-col sm:w-auto sm:flex-row items-center gap-3 sm:mt-10">
                    <a
                      href="#contact"
                      style={{ color: "#ffffff" }}
                      className="
                        w-full
                        sm:w-auto
                        min-h-[44px]
                        px-8
                        py-3.5
                        rounded-xl
                        sm:rounded-2xl
                        bg-[#0f172a]
                        hover:bg-slate-800
                        !text-white
                        text-white
                        text-sm
                        font-semibold
                        shadow-sm
                        active:scale-95
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-2
                        cursor-pointer
                        focus-visible:outline-hidden
                        focus-visible:ring-2
                        focus-visible:ring-[#0f172a]
                        focus-visible:ring-offset-2
                      "
                    >
                      <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>
                        Request Enterprise Demo
                      </span>
                      <ArrowUpRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                    </a>

                    <a
                      href="#platform"
                      style={{ color: "#1e293b" }}
                      className="
                        w-full
                        sm:w-auto
                        min-h-[44px]
                        px-7
                        py-3.5
                        rounded-xl
                        sm:rounded-2xl
                        border
                        border-slate-300
                        bg-white
                        hover:bg-slate-50
                        hover:border-slate-400
                        !text-slate-800
                        text-slate-800
                        text-sm
                        font-semibold
                        shadow-xs
                        active:scale-95
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-2
                        cursor-pointer
                        focus-visible:outline-hidden
                        focus-visible:ring-2
                        focus-visible:ring-slate-400
                        focus-visible:ring-offset-2
                      "
                    >
                      <span className="!text-slate-800 text-slate-800 font-semibold" style={{ color: "#1e293b" }}>
                        Explore Platform
                      </span>
                      <ArrowUpRight className="w-4 h-4 !text-slate-500 text-slate-500 shrink-0" style={{ color: "#64748b", stroke: "#64748b" }} />
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
            03 — SECTION 1: HERO & STRATEGIC IMPACT (SOVEREIGNTY & METRIC CARDS)
        ===================================================== */}
        <section
          id="sovereignty"
          className="section relative overflow-hidden py-20 sm:py-28"
        >
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl">
                {/* Headline */}
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl [text-wrap:balance]">
                  Autonomous Enterprise AI. Engineered for Total Sovereignty.
                </h2>

                {/* Subheadline */}
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl">
                  Provision dedicated single-tenant GPU clusters, zero data
                  retention policies, and deterministic agent workflows behind
                  your own VPC.
                </p>
              </div>
            </ScrollReveal>

            {/* Metric Cards (3-Column Grid) - Image 1 UI with Orange, Purple & Pink Patterns from Image 2 */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {/* Card 1: Orange - Concentric Arches */}
              <ScrollReveal>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange-200 flex flex-col justify-between min-h-[440px]">
                  {/* Inner Pastel Graphic Frame */}
                  <div className="relative flex h-52 sm:h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-orange-100/90 bg-[#FFF7ED] p-6">
                    {/* Centered Graphic Pattern */}
                    <div className="flex items-center justify-center w-full pt-4">
                      <ConcentricArchSvg className="w-full max-w-[210px] h-auto transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Card Content Below */}
                  <div className="mt-5 sm:mt-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-950 transition-colors group-hover:text-orange-600">
                        Building AI systems that can reason, learn and adapt
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-gray-600">
                        How modern intelligent systems are moving beyond simple
                        prompts toward reliable, sovereign enterprise
                        architectures.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 2: Purple - Stepping Triangle Mosaic Matrix */}
              <ScrollReveal>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-200 flex flex-col justify-between min-h-[440px]">
                  {/* Inner Pastel Graphic Frame */}
                  <div className="relative flex h-52 sm:h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-purple-100/90 bg-[#FAF5FF] p-6">
                    {/* Centered Graphic Pattern */}
                    <div className="flex items-center justify-center w-full">
                      <TriangleMosaicSvg className="w-full max-w-[220px] h-auto transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Card Content Below */}
                  <div className="mt-5 sm:mt-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-950 transition-colors group-hover:text-purple-600">
                        The infrastructure behind production AI
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-gray-600">
                        A practical look at the systems, infrastructure, and
                        engineering decisions powering sub-15ms deterministic
                        inference.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 3: Pink - Sliced Bars, Wedge & Quarter Circle */}
              <ScrollReveal>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-pink-200 flex flex-col justify-between min-h-[440px]">
                  {/* Inner Pastel Graphic Frame */}
                  <div className="relative flex h-52 sm:h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-pink-100/90 bg-[#FFF1F5] p-6">
                    {/* Centered Graphic Pattern */}
                    <div className="flex items-center justify-center w-full">
                      <SlicedBarsGeometrySvg className="w-full max-w-[230px] h-auto transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Card Content Below */}
                  <div className="mt-5 sm:mt-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-950 transition-colors group-hover:text-pink-600">
                        What makes an AI system genuinely useful?
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-gray-600">
                        Moving beyond impressive demos toward resilient,
                        multi-region systems that consistently solve complex
                        enterprise workflows.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =====================================================
            04 — SECTION 2: DEPLOYMENT FLEXIBILITY (IRREGULAR BENTO GRID)
        ===================================================== */}
        <section
          id="deployment"
          className="section relative overflow-hidden bg-white py-20 sm:py-28"
        >
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl [text-wrap:balance]">
                  Deployment Flexibility Built for Enterprise Control
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600">
                  Run models and agents where your data already lives—from
                  isolated private clouds to classified air-gapped server racks.
                </p>
              </div>
            </ScrollReveal>

            {/* Asymmetric Bento Layout */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Card 1: Large 2-column span (8 cols) - Orange Accent */}
              <div className="lg:col-span-8">
                <ScrollReveal>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md flex flex-col justify-between">
                    <div>
                      <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
                        Bring Your Own Cloud (BYOC) &amp; Virtual Private Cloud
                      </h3>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600 max-w-2xl">
                        Deploy inside AWS, Azure, or GCP with Terraform or
                        Kubernetes operators. Your data never leaves your
                        network perimeter.
                      </p>

                      {/* Image 1 Pattern Frame - Orange Overlapping Diamonds */}
                      <div className="mt-8 flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-orange-100/90 bg-[#FFF7ED] p-6">
                        <OverlappingDiamondsSvg className="h-36 w-auto transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Card 2: Pink Accent (4 cols) - Air-Gapped & On-Premise */}
              <div className="lg:col-span-4">
                <ScrollReveal>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-md flex flex-col justify-between">
                    <div>
                      {/* Image 1 Pattern Frame - Pink Overlapping Circles */}
                      <div className="mb-6 flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl border border-pink-100/90 bg-[#FFF1F5] p-6">
                        <OverlappingCirclesSvg className="h-36 w-auto transition-transform duration-500 group-hover:scale-105" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
                        Air-Gapped &amp; On-Premise
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        Full containerized deployment for regulated defense,
                        finance, and healthcare environments with strict offline
                        air-gapping.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Card 3: Purple Accent (Full Width 12 cols) - Dedicated Multi-Region GPU Clusters */}
              <div className="lg:col-span-12">
                <ScrollReveal>
                  <div className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-purple-200 hover:shadow-md">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                      <div className="lg:col-span-7">
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
                          Dedicated Multi-Region GPU Clusters
                        </h3>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600 max-w-xl">
                          Provisioned H100/A100 instances with burstable reserve
                          capacity and zero noisy-neighbor contention across
                          global enterprise availability zones.
                        </p>
                      </div>

                      {/* Image 1 Pattern Frame - Purple Overlapping Squares */}
                      <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="flex h-52 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-purple-100/90 bg-[#FAF5FF] p-6">
                          <OverlappingSquaresSvg className="h-36 w-auto transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            05 — SECTION 3: SECURITY, GOVERNANCE & COMPLIANCE SUITE
        ===================================================== */}
        <section
          id="security"
          className="section-sm relative overflow-hidden py-20 sm:py-28"
        >
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl [text-wrap:balance]">
                  Enterprise-Grade Sovereignty &amp; Compliance
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600">
                  Built with defense-in-depth architecture to satisfy the
                  world&apos;s strictest regulatory, security, and infosec
                  reviews.
                </p>
              </div>
            </ScrollReveal>

            {/* 4-Column Structured Card Grid */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1: Compliance Certifications (Orange & White) */}
              <ScrollReveal className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md flex flex-col justify-between">
                  <div className="pt-6 sm:pt-7 px-6 sm:px-7 pb-4 sm:pb-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-950">
                      Compliance Certifications
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600 mb-0">
                      SOC 2 Type II, ISO 27001, HIPAA, and GDPR audited with
                      instant DPA access and external pen test reports.
                    </p>
                  </div>

                  <div className="w-full mt-auto">
                    <MosaicGradientGridCanvas
                      color="#EA580C"
                      className="h-28 sm:h-32 w-full border-t border-gray-100"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 2: Identity & Provisioning (Purple & White) */}
              <ScrollReveal className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md flex flex-col justify-between">
                  <div className="pt-6 sm:pt-7 px-6 sm:px-7 pb-4 sm:pb-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-950">
                      Identity &amp; Provisioning
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600 mb-0">
                      SAML 2.0, Okta, Azure AD, Ping Identity, and automated
                      user provisioning via SCIM with granular role policies.
                    </p>
                  </div>

                  <div className="w-full mt-auto">
                    <MosaicGradientGridCanvas
                      color="#7C3AED"
                      className="h-28 sm:h-32 w-full border-t border-gray-100"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 3: Cryptography & CMEK (Pink & White) */}
              <ScrollReveal className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-md flex flex-col justify-between">
                  <div className="pt-6 sm:pt-7 px-6 sm:px-7 pb-4 sm:pb-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-950">
                      Cryptography &amp; CMEK
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600 mb-0">
                      Customer-Managed Encryption Keys (CMEK) via AWS KMS/Vault,
                      envelope encryption, and AES-256 at rest.
                    </p>
                  </div>

                  <div className="w-full mt-auto">
                    <MosaicGradientGridCanvas
                      color="#EC4899"
                      className="h-28 sm:h-32 w-full border-t border-gray-100"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 4: Forensic Audit Trails (Blue & White) */}
              <ScrollReveal className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md flex flex-col justify-between">
                  <div className="pt-6 sm:pt-7 px-6 sm:px-7 pb-4 sm:pb-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-950">
                      Forensic Audit Trails
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600 mb-0">
                      Immutable streaming audit logs directly to Datadog,
                      Splunk, or custom S3 buckets with cryptographic hashing.
                    </p>
                  </div>

                  <div className="w-full mt-auto">
                    <MosaicGradientGridCanvas
                      color="#2563EB"
                      className="h-28 sm:h-32 w-full border-t border-gray-100"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =====================================================
            06 — SECTION 4: COMMERCIAL VS. ENTERPRISE FEATURE MATRIX
        ===================================================== */}
        <section
          id="matrix"
          className="section relative overflow-hidden bg-white py-20 sm:py-28"
        >
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl [text-wrap:balance]">
                  Commercial vs. Enterprise Feature Matrix
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600">
                  A side-by-side technical comparison of capabilities between
                  multi-tenant commercial tiers and sovereign enterprise
                  environments.
                </p>
              </div>
            </ScrollReveal>

            {/* Responsive Feature Matrix */}
            <ScrollReveal>
              <FeatureComparisonMatrix />
            </ScrollReveal>
          </div>
        </section>

        {/* =====================================================
            07 — SECTION 5: DIRECT ENTERPRISE QUALIFICATION & INTAKE
        ===================================================== */}
        <section
          id="contact"
          className="section relative overflow-hidden bg-white py-20 sm:py-28"
        >
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl [text-wrap:balance]">
                  Direct Enterprise Qualification &amp; Intake
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600">
                  Work directly with our ML systems engineering team to scope
                  your topology, security requirements, and custom
                  proof-of-concept.
                </p>
              </div>
            </ScrollReveal>

            {/* Two-Column Container */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
              {/* Left Column: Relevant Enterprise Info (5 cols) */}
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xs relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
                        What to expect during discovery
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Direct pairing with core ML systems engineering. Every session is conducted under a bilateral NDA.
                      </p>

                      <div className="mt-7 space-y-4">
                        {/* Item 1: Technical Feasibility — Orange & White Gradient */}
                        <div className="rounded-2xl border border-orange-100/80 bg-gradient-to-br from-[#FFF7ED] via-[#FFFAF4] to-white p-5 transition-all hover:border-orange-200 shadow-2xs">
                          <h4 className="text-sm font-semibold text-gray-950">
                            Technical Feasibility Scoping
                          </h4>
                          <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-gray-600">
                            Model parameter sizing, context window requirements, latency budgets, and perimeter boundaries.
                          </p>
                        </div>

                        {/* Item 2: Architecture Pairing — Purple & White Gradient */}
                        <div className="rounded-2xl border border-purple-100/80 bg-gradient-to-br from-[#FAF5FF] via-[#FBF7FE] to-white p-5 transition-all hover:border-purple-200 shadow-2xs">
                          <h4 className="text-sm font-semibold text-gray-950">
                            Architecture Review with ML Engineers
                          </h4>
                          <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-gray-600">
                            Direct pairing on Triton cluster orchestration, VPC peering topology, CMEK encryption, and IAM roles.
                          </p>
                        </div>

                        {/* Item 3: Custom POC — Pink & White Gradient */}
                        <div className="rounded-2xl border border-pink-100/80 bg-gradient-to-br from-[#FDF2F8] via-[#FEF7FA] to-white p-5 transition-all hover:border-pink-200 shadow-2xs">
                          <h4 className="text-sm font-semibold text-gray-950">
                            Dedicated Production Sandbox
                          </h4>
                          <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-gray-600">
                            Benchmark sandbox deployed against proprietary workloads with zero data retention guarantee.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: High-Context Enterprise Form (7 cols) */}
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <EnterpriseIntakeForm />
                </ScrollReveal>
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
          className="w-full py-16 md:py-24 bg-white section-sm"
        />

        {/* Pre-footer CTA */}
        <CtaSection
          title="Accelerate your enterprise with Rivinity AI"
          description="Deploy isolated VPC runtimes, custom fine-tuned foundation models, and guaranteed 99.99% SLAs with dedicated solutions engineering support."
          buttonText="Request Enterprise Demo"
          buttonHref="/contact"
          secondaryText="Contact Sales Team"
          secondaryHref="/contact"
          className="bg-white section"
        />
      </main>

      <Footer />
    </div>
  );
});

EnterpriseReadiness.displayName = "EnterpriseReadiness";

export default EnterpriseReadiness;
