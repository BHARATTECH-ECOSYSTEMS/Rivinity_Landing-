"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthModal } from "@/components/auth/auth-context";
import SidebarShell from "@/components/canvas/SidebarShell";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Search,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Globe,
  Layout,
  Database,
  AudioWaveform,
  GraduationCap,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
  Film,
  Flame,
  Wand2,
  Layers,
  Code,
  Paperclip,
  Mic,
  Sparkles,
  X,
  Video,
  Terminal,
  Play,
  Download,
  Copy,
  Share2,
  FolderClosed,
  Bot,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SKILLS } from "@/lib/skillsCatalog";
import rivinityLogo from "@/components/assets/Rivinity Logo.png";
const logoSrc =
  typeof rivinityLogo === "string" ? rivinityLogo : rivinityLogo.src;

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

/* 
  IMAGE 2 BOLD SOLID GLYPH ICONS
*/
const EditStudioGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <rect x="4" y="11" width="25" height="26" rx="8" />
    <path d="M31 20.2c0-1.2 1.3-1.9 2.3-1.3l8.6 5.1c1 .6 1 2 0 2.6l-8.6 5.1c-1 .6-2.3-.1-2.3-1.3v-10.2z" />
  </svg>
);

const AudioLabGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <rect x="17" y="6" width="14" height="22" rx="7" />
    <path
      d="M10 20c0 7.7 6.3 14 14 14s14-6.3 14-14"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M24 34v7"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M16 41h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
  </svg>
);

const ImageEnhancerGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <g transform="translate(24, 24)">
      {[0, 45, 90, 135].map((angle) => (
        <rect
          key={angle}
          x="-4.5"
          y="-19"
          width="9"
          height="38"
          rx="4.5"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="7" />
    </g>
  </svg>
);

const AppBuilderGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <rect x="6" y="9" width="9" height="30" rx="4.5" />
    <rect x="18" y="9" width="9" height="30" rx="4.5" />
    <g transform="translate(33, 24) rotate(14) translate(-4.5, -15)">
      <rect x="0" y="0" width="9" height="30" rx="4.5" />
    </g>
  </svg>
);

const DeepSearchGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <path
      d="M13 35L35 13M35 13H19M35 13V29"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocSynthesizerGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <g transform="translate(24, 24)">
      <rect x="-14" y="-14" width="28" height="28" rx="8" />
      <circle cx="-10" cy="0" r="7" />
      <circle cx="10" cy="0" r="7" />
      <circle cx="0" cy="-10" r="7" />
      <circle cx="0" cy="10" r="7" />
    </g>
  </svg>
);

const MarketplaceGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <path
      d="M17 16c0-3.9 3.1-7 7-7s7 3.1 7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <rect x="8" y="15" width="32" height="26" rx="7" />
  </svg>
);

const RivinityLMGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <path d="M24 4c2 10 10 18 20 20-10 2-18 10-20 20-2-10-10-18-20-20 10-2 18-10 20-20z" />
  </svg>
);

const KnowledgeBaseGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <path d="M6 14c0-3.3 2.7-6 6-6h9c2 0 3.8 1 4.9 2.6L27.5 13H36c3.3 0 6 2.7 6 6v17c0 3.3-2.7 6-6 6H12c-3.3 0-6-2.7-6-6V14z" />
  </svg>
);

const AnalyticsGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <rect x="7" y="24" width="8" height="17" rx="4" />
    <rect x="20" y="14" width="8" height="27" rx="4" />
    <rect x="33" y="7" width="8" height="34" rx="4" />
  </svg>
);

/* 
  RIVINITY BRAND OUTER TWO RINGS (Spins at bottom-left corner on hover)
*/
const RivinityOuterRings = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className}>
    <defs>
      <linearGradient id="riv-outer-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="35%" stopColor="#FF6B00" />
        <stop offset="70%" stopColor="#FF8A3D" />
        <stop offset="100%" stopColor="#FFA866" />
      </linearGradient>
    </defs>
    <g transform="translate(100, 100)">
      {/* Outer Ring: 8 pointed petal loops */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path
          key={`outer-${deg}`}
          d="M 0 -92 C 22 -76, 36 -50, 24 -24 C 0 -44, -24 -24, -24 -24 C -36 -50, -22 -76, 0 -92 Z"
          fill="none"
          stroke="url(#riv-outer-ring-grad)"
          strokeWidth="5"
          strokeLinejoin="round"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Middle Ring: 8 pointed petal loops rotated 22.5 deg */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <path
          key={`mid-${deg}`}
          d="M 0 -72 C 18 -58, 28 -38, 18 -18 C 0 -34, -18 -18, -18 -18 C -28 -38, -18 -58, 0 -72 Z"
          fill="none"
          stroke="url(#riv-outer-ring-grad)"
          strokeWidth="4.5"
          strokeLinejoin="round"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>
  </svg>
);

/* 
  CREATIVE TOOLS DEFINITION (10 Small Square Glassmorphic Boxes, 5 per row)
*/
const CREATIVE_TOOLS = [
  {
    id: "edit-studio",
    title: "Edit Studio",
    icon: EditStudioGlyph,
    path: "/app",
    bg: "rgba(255, 145, 77, 0.14)", // Light pastel orange glass
    border: "rgba(255, 145, 77, 0.35)",
  },
  {
    id: "audio-lab",
    title: "Audio Lab",
    icon: AudioLabGlyph,
    path: "/audio-lab",
    bg: "rgba(180, 140, 255, 0.14)", // Light pastel purple glass
    border: "rgba(180, 140, 255, 0.35)",
  },
  {
    id: "image-enhancer",
    title: "Image Enhancer",
    icon: ImageEnhancerGlyph,
    path: "/image-enhancer",
    bg: "rgba(255, 148, 194, 0.14)", // Light pastel pink glass
    border: "rgba(255, 148, 194, 0.35)",
  },
  {
    id: "app-builder",
    title: "App Builder",
    icon: AppBuilderGlyph,
    path: "/app-builder",
    bg: "rgba(255, 215, 64, 0.15)", // Light pastel yellow glass
    border: "rgba(255, 215, 64, 0.35)",
  },
  {
    id: "deep-search",
    title: "Deep Search",
    icon: DeepSearchGlyph,
    path: "/app",
    bg: "rgba(125, 185, 255, 0.14)", // Light pastel blue glass
    border: "rgba(125, 185, 255, 0.35)",
  },
  {
    id: "doc-synthesizer",
    title: "Doc Synthesizer",
    icon: DocSynthesizerGlyph,
    path: "/app",
    bg: "rgba(95, 215, 160, 0.14)", // Light pastel mint glass
    border: "rgba(95, 215, 160, 0.35)",
  },
  {
    id: "marketplace",
    title: "Marketplace",
    icon: MarketplaceGlyph,
    path: "/marketplace",
    bg: "rgba(244, 114, 182, 0.14)", // Light pastel rose glass
    border: "rgba(244, 114, 182, 0.35)",
  },
  {
    id: "rivinity-lm",
    title: "RivinityLM",
    icon: RivinityLMGlyph,
    path: "/rivinity-lm",
    bg: "rgba(251, 146, 60, 0.14)", // Light pastel peach glass
    border: "rgba(251, 146, 60, 0.35)",
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    icon: KnowledgeBaseGlyph,
    path: "/knowledge-base",
    bg: "rgba(45, 212, 191, 0.14)", // Light pastel teal glass
    border: "rgba(45, 212, 191, 0.35)",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: AnalyticsGlyph,
    path: "/analytics",
    bg: "rgba(165, 180, 252, 0.14)", // Light pastel periwinkle glass
    border: "rgba(165, 180, 252, 0.35)",
  },
];

/* 
  CONTINUE WORKING FOLDERS & ASSETS SYSTEM
*/
export type ContinueWorkingType =
  | "Chat"
  | "App"
  | "Audio"
  | "Image"
  | "Video"
  | "Doc";

type WorkingAsset = {
  id: string;
  name: string;
  subtitle: string;
  type: ContinueWorkingType;
  modified: string;
  icon: LucideIcon;
  path: string;
};

interface WorkingCategoryFolder {
  id: ContinueWorkingType;
  title: string;
  icon: LucideIcon;
  svgFill: string;
  bgFront: string;
  border: string;
  shadow: string;
}

const WORKING_FOLDERS: WorkingCategoryFolder[] = [
  {
    id: "Chat",
    title: "Chat",
    icon: MessageSquare,
    svgFill: "rgba(255, 145, 86, 0.95)", // Pastel light orange
    bgFront: "bg-gradient-to-b from-[#FFA87D] via-[#FF8E52] to-[#FF7535]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(255,117,53,0.25)]",
  },
  {
    id: "App",
    title: "App",
    icon: Layout,
    svgFill: "rgba(247, 115, 158, 0.95)", // Pastel light pink
    bgFront: "bg-gradient-to-b from-[#FB8CB3] via-[#F76497] to-[#F14681]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(241,70,129,0.25)]",
  },
  {
    id: "Audio",
    title: "Audio",
    icon: Mic,
    svgFill: "rgba(139, 92, 246, 0.95)", // Pastel light purple
    bgFront: "bg-gradient-to-b from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(124,58,237,0.25)]",
  },
  {
    id: "Image",
    title: "Image",
    icon: ImageIcon,
    svgFill: "rgba(52, 211, 153, 0.95)", // Pastel light green
    bgFront: "bg-gradient-to-b from-[#6EE7B7] via-[#34D399] to-[#10B981]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(16,185,129,0.25)]",
  },
  {
    id: "Video",
    title: "Video",
    icon: Film,
    svgFill: "rgba(59, 130, 246, 0.95)", // Pastel light blue
    bgFront: "bg-gradient-to-b from-[#70BAFF] via-[#3B82F6] to-[#2563EB]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(37,99,235,0.25)]",
  },
  {
    id: "Doc",
    title: "Doc",
    icon: FileText,
    svgFill: "rgba(251, 191, 36, 0.95)", // Pastel light yellow
    bgFront: "bg-gradient-to-b from-[#FDE68A] via-[#FBBF24] to-[#F59E0B]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(245,158,11,0.25)]",
  },
];

const ALL_WORKING_ASSETS: Record<ContinueWorkingType, WorkingAsset[]> = {
  Chat: [
    {
      id: "chat-1",
      name: "Autonomous Agent Orchestration Specs",
      subtitle: "Architecture breakdown · 4 multi-agent reasoning graphs",
      type: "Chat",
      modified: "10 mins ago",
      icon: MessageSquare,
      path: "/app",
    },
    {
      id: "chat-2",
      name: "Brand Strategy & Positioning Dialogue",
      subtitle: "Interactive persona synthesis · 12 turn session",
      type: "Chat",
      modified: "3 hours ago",
      icon: MessageSquare,
      path: "/app",
    },
    {
      id: "chat-3",
      name: "API Route Optimizer & Debug Assistant",
      subtitle: "Edge runtime debugging · 8 tool calls verified",
      type: "Chat",
      modified: "Yesterday",
      icon: MessageSquare,
      path: "/app",
    },
    {
      id: "chat-4",
      name: "Creative Ad Script Generation Session",
      subtitle: "Multichannel copywriting variants for TikTok & Meta",
      type: "Chat",
      modified: "2 days ago",
      icon: MessageSquare,
      path: "/app",
    },
  ],
  App: [
    {
      id: "app-1",
      name: "E-Commerce Microservice Architecture",
      subtitle: "Full-stack app scaffold · React 19 + Tailwind v4 + PostgreSQL",
      type: "App",
      modified: "2 days ago",
      icon: Layout,
      path: "/app-builder",
    },
    {
      id: "app-2",
      name: "Real-time Telemetry Dashboard Build",
      subtitle: "Next.js 15 App Router · Tremor UI + Supabase WebSockets",
      type: "App",
      modified: "4 days ago",
      icon: Layout,
      path: "/app-builder",
    },
    {
      id: "app-3",
      name: "AI Customer Support Widget Scaffold",
      subtitle: "Embeddable iframe bundle · WebSockets + Tailwind UI",
      type: "App",
      modified: "1 week ago",
      icon: Layout,
      path: "/app-builder",
    },
  ],
  Audio: [
    {
      id: "audio-1",
      name: "Podcast Master Stem Isolation",
      subtitle: "Vocals & instruments isolated · 4 stems, 48kHz WAV",
      type: "Audio",
      modified: "30 mins ago",
      icon: Mic,
      path: "/audio-lab",
    },
    {
      id: "audio-2",
      name: "Neural Voice Clone - David (US Accent)",
      subtitle: "Ultra-low latency speech model · 15s reference sample",
      type: "Audio",
      modified: "5 hours ago",
      icon: Mic,
      path: "/audio-lab",
    },
    {
      id: "audio-3",
      name: "Ambient Synthwave Soundscape Generator",
      subtitle: "Generative neural sound design · 120 BPM stereo mix",
      type: "Audio",
      modified: "Yesterday",
      icon: Mic,
      path: "/audio-lab",
    },
  ],
  Image: [
    {
      id: "img-1",
      name: "Cyberpunk Cityscape 4K Ultra-Upscale",
      subtitle: "Super-resolution 4x enhancement · Artifact denoising pass",
      type: "Image",
      modified: "15 mins ago",
      icon: ImageIcon,
      path: "/image-enhancer",
    },
    {
      id: "img-2",
      name: "Product Studio Cinematic Relighting",
      subtitle: "Rim light + softbox reflections · High dynamic range",
      type: "Image",
      modified: "2 hours ago",
      icon: ImageIcon,
      path: "/image-enhancer",
    },
    {
      id: "img-3",
      name: "Character Concept Art Polish & Detail Pass",
      subtitle: "Facial restoration & micro-contrast texture boost",
      type: "Image",
      modified: "Yesterday",
      icon: ImageIcon,
      path: "/image-enhancer",
    },
  ],
  Video: [
    {
      id: "vid-1",
      name: "Cyberpunk Cinematic 4K Teaser",
      subtitle: "Timeline project · 6 video tracks, 4 stem layers, 60fps",
      type: "Video",
      modified: "1 hour ago",
      icon: Film,
      path: "/app",
    },
    {
      id: "vid-2",
      name: "SaaS Product Demo Promo Montage",
      subtitle: "Dynamic motion keyframing & speed ramps · 1080p ProRes",
      type: "Video",
      modified: "Yesterday",
      icon: Film,
      path: "/app",
    },
    {
      id: "vid-3",
      name: "Social Kinetic Cut 9:16 Video",
      subtitle: "Automated aspect ratio reframe & synchronized auto-captions",
      type: "Video",
      modified: "3 days ago",
      icon: Film,
      path: "/app",
    },
  ],
  Doc: [
    {
      id: "doc-1",
      name: "Financial Data Extraction Model Brief",
      subtitle: "Knowledge pipeline · 14 source documents connected",
      type: "Doc",
      modified: "Yesterday",
      icon: FileText,
      path: "/app",
    },
    {
      id: "doc-2",
      name: "Brand Identity Color Tokens & Design System",
      subtitle: "Vector exports · Tailwind typography scale & components",
      type: "Doc",
      modified: "3 days ago",
      icon: FileText,
      path: "/app",
    },
    {
      id: "doc-3",
      name: "Quarterly AI Infrastructure Security Audit",
      subtitle: "PDF multi-page synthesis · 42 pages summarized with citations",
      type: "Doc",
      modified: "5 days ago",
      icon: FileText,
      path: "/app",
    },
  ],
};

/* 
  MAIN DASHBOARD COMPONENT
*/
export default function DashboardPage() {
  return (
    <SidebarShell>
      <DashboardContent />
    </SidebarShell>
  );
}

const DashboardContent = () => {
  const router = useRouter();
  const { isAuthenticated, openAuth } = useAuthModal();
  const navigate = (path: string) => router.push(path);
  const [selectedWorkingFolder, setSelectedWorkingFolder] =
    useState<ContinueWorkingType | null>("Chat");

  const [promptInput, setPromptInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddingTools, setIsAddingTools] = useState(false);
  const [skillPickerOpen, setSkillPickerOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const skillButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        skillPickerOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        skillButtonRef.current &&
        !skillButtonRef.current.contains(e.target as Node)
      ) {
        setSkillPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [skillPickerOpen]);

  const filteredSkills = SKILLS.filter((s) => {
    const q = skillQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  const handleSend = (textToSend?: string) => {
    const finalPrompt = (
      textToSend !== undefined ? textToSend : promptInput
    ).trim();
    if (!finalPrompt) return;

    if (!isAuthenticated) {
      try {
        sessionStorage.setItem("rivinity_pending_prompt", finalPrompt);
      } catch {}
      openAuth("signup");
      return;
    }

    try {
      sessionStorage.setItem("rivinity_pending_prompt", finalPrompt);
    } catch {}
    router.push("/app");
  };

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const pending = sessionStorage.getItem("rivinity_pending_prompt");
        if (pending && pending === promptInput.trim()) {
          router.push("/app");
        }
      } catch {}
    }
  }, [isAuthenticated, promptInput, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-screen max-h-screen flex-1 min-h-0 flex flex-col overflow-hidden bg-[#F8FAFC] text-[#0f172a] selection:bg-[#FF6B00]/20 antialiased">
      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 space-y-12 pb-24"
        >
          {/* HERO / CENTRALIZED PROMPT BOX */}
          <motion.section
            variants={itemVariants}
            className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center pt-2 sm:pt-4 relative z-40"
          >
            {/* Company Logo */}
            <div className="mb-4 sm:mb-5 flex items-center justify-center">
              <img
                src={logoSrc}
                onError={(e) => {
                  e.currentTarget.src = "/watermark.png";
                }}
                alt="Rivinity Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_8px_28px_rgba(255,107,0,0.38)] select-none hover:scale-105 transition-transform duration-300"
                draggable={false}
              />
            </div>

            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0f172a] mb-4 sm:mb-5 leading-tight font-display text-center">
              What will you craft today?
            </div>

            {/* Centralized Prompt Composer */}
            <div className="w-full relative z-40">
              <div
                className={`w-full bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${
                  isInputFocused
                    ? "border-[#FF6B00]/60 ring-2 ring-[#FF6B00]/20"
                    : "border-[#e2e8f0]"
                }`}
              >
                {/* Expandable Tools Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isAddingTools
                      ? "max-h-[260px] opacity-100 border-b border-[#e2e8f0]"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-[#f8fafc] p-3 sm:p-4">
                    <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider px-1 text-[#64748b] mb-2">
                      Quick AI Modes
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        {
                          icon: Bot,
                          label: "Agents Playground",
                          desc: "Multi-agent systems & simulations",
                        },
                        {
                          icon: GraduationCap,
                          label: "RivinityLM",
                          desc: "Frontier reasoning & intelligence",
                        },
                        {
                          icon: Sparkles,
                          label: "Image Enhancer",
                          desc: "Super-resolution, relighting & polish",
                        },
                        {
                          icon: AudioWaveform,
                          label: "Audio Lab",
                          desc: "Voice synthesis & stem mastering",
                        },
                        {
                          icon: Layers,
                          label: "App Builder",
                          desc: "Full-stack code & app scaffolding",
                        },
                        {
                          icon: Clapperboard,
                          label: "Prompt to Video",
                          desc: "Cinematic scenes & video generation",
                        },
                      ].map((tool) => (
                        <button
                          type="button"
                          key={tool.label}
                          onClick={() => {
                            setIsAddingTools(false);
                            setPromptInput((prev) =>
                              prev
                                ? `${prev} [Mode: ${tool.label}]`
                                : `[Mode: ${tool.label}] `,
                            );
                            textareaRef.current?.focus();
                          }}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-left bg-white hover:bg-[#f1f5f9] transition-all border border-[#e2e8f0] cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                            <tool.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[12px] font-semibold text-[#0f172a] truncate">
                              {tool.label}
                            </div>
                            <div className="text-[10px] text-[#64748b] truncate">
                              {tool.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Textarea Input */}
                <div className="px-3.5 sm:px-4.5 pt-3 pb-1">
                  <textarea
                    ref={textareaRef}
                    value={promptInput}
                    onChange={(e) => {
                      setPromptInput(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Ask anything, generate workflows, build apps..."
                    rows={2}
                    className="w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus-visible:outline-none focus-visible:ring-0 resize-none border-none outline-none shadow-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-[44px]"
                    style={{ outline: "none" }}
                  />
                </div>

                {/* Bottom Action Controls */}
                <div className="flex items-center justify-between w-full px-3 sm:px-4 pb-2 sm:pb-2.5 pt-0.5">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingTools((v) => {
                          const next = !v;
                          if (next) setSkillPickerOpen(false);
                          return next;
                        });
                      }}
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 ${
                        isAddingTools
                          ? "bg-orange-50 text-[#FF6B00]"
                          : "bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                      }`}
                      title="Add tool / mode"
                    >
                      <Plus className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsWebSearchActive((prev) => !prev)}
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 ${
                        isWebSearchActive
                          ? "!bg-orange-50 text-[#FF6B00]"
                          : "bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100"
                      }`}
                      title={
                        isWebSearchActive
                          ? "Web search active (Click to disable)"
                          : "Search web (Click to enable)"
                      }
                    >
                      <Globe className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!promptInput.trim()) {
                          toast.info("Type a draft prompt first to enhance.");
                          return;
                        }
                        setPromptInput(
                          `${promptInput.trim()} — provide detailed reasoning, structured findings, and actionable steps.`,
                        );
                        toast.success("Prompt enhanced!");
                      }}
                      className="bg-transparent w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:!bg-slate-100 transition-colors cursor-pointer shrink-0 border-0"
                      title="Enhance prompt"
                    >
                      <Wand2 className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSkillPickerOpen((v) => {
                          const next = !v;
                          if (next) setIsAddingTools(false);
                          return next;
                        });
                      }}
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 ${
                        skillPickerOpen
                          ? "!bg-orange-50 text-[#FF6B00]"
                          : "bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100"
                      }`}
                      title="Skills"
                    >
                      <Layers
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          skillPickerOpen ? "text-[#FF6B00]" : "text-slate-500"
                        }`}
                        strokeWidth={2}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPromptInput((prev) =>
                          prev
                            ? `\`\`\`\n${prev}\n\`\`\``
                            : "```typescript\n\n```",
                        );
                        textareaRef.current?.focus();
                      }}
                      className="bg-transparent w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:!bg-slate-100 transition-colors cursor-pointer shrink-0 border-0"
                      title="Format Code"
                    >
                      <Code className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-transparent w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:!bg-slate-100 transition-colors cursor-pointer shrink-0 border-0"
                      title="Attach file"
                    >
                      <Paperclip className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          toast.success(`Attached: ${files[0].name}`);
                          setPromptInput((prev) =>
                            prev
                              ? `${prev} [Attached: ${files[0].name}]`
                              : `[Attached: ${files[0].name}] `,
                          );
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => toast.info("Microphone listening...")}
                      className="bg-transparent w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:!bg-slate-100 transition-colors cursor-pointer shrink-0 border-0"
                      title="Voice input"
                    >
                      <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={!promptInput.trim()}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer transition-all ${
                        promptInput.trim()
                          ? "!bg-[#FF6B00] hover:!bg-[#E66000] shadow-[0_2px_8px_rgba(255,107,0,0.30)] active:scale-95"
                          : "!bg-[#FFD5C2] dark:!bg-[#5a2e1d] text-white opacity-85 cursor-not-allowed"
                      }`}
                      title="Send prompt"
                    >
                      <ArrowUpRight
                        className="w-4.5 h-4.5 shrink-0 text-white"
                        strokeWidth={2.4}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Skills Picker Popover */}
              {skillPickerOpen && (
                <div
                  ref={popoverRef}
                  className="absolute left-0 right-0 top-full mt-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                      <Layers
                        className="w-5 h-5 text-[#FF6B00] shrink-0"
                        strokeWidth={2.2}
                      />
                      <input
                        autoFocus
                        value={skillQuery}
                        onChange={(e) => setSkillQuery(e.target.value)}
                        placeholder="Search skills to run…"
                        className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[14.5px] flex-1 text-[#0f172a] placeholder:text-gray-400"
                      />
                      <span className="text-[12.5px] text-gray-400 shrink-0">
                        {filteredSkills.length} available
                      </span>
                    </div>

                    <div className="max-h-[310px] overflow-y-auto py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {filteredSkills.length === 0 ? (
                        <div className="py-6 text-center text-[13.5px] text-gray-400">
                          No skills found matching &ldquo;{skillQuery}&rdquo;
                        </div>
                      ) : (
                        filteredSkills.map((s) => (
                          <button
                            type="button"
                            key={s.name}
                            onClick={() => {
                              setSkillPickerOpen(false);
                              setPromptInput(`Run skill: ${s.name}`);
                              handleSend(`Run skill: ${s.name}`);
                            }}
                            className="bg-transparent w-full text-left px-5 py-3 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 group cursor-pointer border-b border-gray-100 last:border-0"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors truncate">
                                {s.name}
                              </div>
                              <div className="text-[12px] sm:text-[12.5px] text-slate-500 font-normal leading-relaxed mt-0.5 truncate">
                                {s.summary}
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.1em] font-extrabold text-[#FF6B00] bg-white border border-[#FF6B00]/70 px-3 py-0.5 rounded-full shrink-0 shadow-2xs">
                              {s.category}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </motion.section>

          {/* 4. CONSOLIDATED 'CREATIVE TOOLS' GRID */}
          <motion.section
            variants={itemVariants}
            className="w-full space-y-3.5 sm:space-y-4"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0f172a] font-display">
                  Creative Tools
                </div>
                <div className="text-xs sm:text-sm text-[#64748b] mt-0.5">
                  Consolidated production studio generators engineered for
                  professional AI workflows
                </div>
              </div>
            </div>

            {/* 10 Square Glassmorphic Boxes (5 per row, full width edge-to-edge with generous middle spacing) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 xl:gap-7">
              {CREATIVE_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.id}
                    whileHover={{ y: -3, scale: 1.025, transition: springTransition }}
                    whileTap={{ scale: 0.975 }}
                    onClick={() => navigate(tool.path)}
                    style={{
                      backgroundColor: tool.bg,
                      borderColor: tool.border,
                    }}
                    className="relative aspect-[1/0.88] overflow-hidden rounded-[18px] sm:rounded-[22px] p-3.5 sm:p-4 lg:p-4 flex flex-col justify-between cursor-pointer backdrop-blur-xl border shadow-[0_6px_20px_rgba(0,0,0,0.025),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 select-none group"
                  >
                    {/* Glass inner gradient reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none rounded-[18px] sm:rounded-[22px]" />

                    {/* Rivinity Logo Outer Two Rings Spinning at Bottom-Right Corner on Hover */}
                    <div className="absolute -bottom-8 -right-8 sm:-bottom-9 sm:-right-9 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 ease-out z-0">
                      <div className="w-full h-full animate-[spin_8s_linear_infinite] [filter:drop-shadow(0_0_8px_rgba(255,107,0,0.45))]">
                        <RivinityOuterRings className="w-full h-full" />
                      </div>
                    </div>

                    {/* Top: Tool Name / Words */}
                    <div className="relative z-10 text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-slate-900 tracking-tight leading-snug font-display">
                      {tool.title}
                    </div>

                    {/* Bottom: Solid Black Glyph Logo on Bottom Left Side */}
                    <div className="relative z-10 mt-auto pt-2 flex items-end justify-start">
                      <Icon className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 text-slate-900 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* 5. 'CONTINUE WORKING' FOLDER SYSTEM */}
          <motion.section
            variants={itemVariants}
            className="w-full space-y-4 sm:space-y-5"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0f172a] font-display">
                  Continue Working
                </div>
                <div className="text-xs sm:text-sm text-[#64748b] mt-0.5">
                  Streamlined asset access for your active production files and sessions
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/history")}
                className="text-xs font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
              >
                <span>Full History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6 Interactive Category Folders: Chat, App, Audio, Image, Video, Doc */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4.5 pt-5 pb-1">
              {WORKING_FOLDERS.map((folder) => {
                const Icon = folder.icon;
                const isSelected = selectedWorkingFolder === folder.id;
                const fileCount = ALL_WORKING_ASSETS[folder.id]?.length || 0;

                return (
                  <motion.div
                    key={folder.id}
                    whileHover={{ y: -3, scale: 1.02, transition: springTransition }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setSelectedWorkingFolder((prev) =>
                        prev === folder.id ? null : folder.id,
                      )
                    }
                    className="group relative w-full flex flex-col cursor-pointer select-none aspect-[4/2.75] min-h-[96px] sm:min-h-[105px]"
                  >
                    {/* 1. BACK FOLDER LAYER with tab */}
                    <div className="absolute inset-0 pointer-events-none drop-shadow-xs">
                      <svg
                        viewBox="0 0 200 160"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                      >
                        <path
                          d="M 0 20 Q 0 0 16 0 L 72 0 Q 86 0 96 15 L 102 23 Q 110 30 122 30 L 184 30 Q 200 30 200 46 L 200 144 Q 200 160 184 160 L 16 160 Q 0 160 0 144 Z"
                          fill={folder.svgFill}
                        />
                      </svg>
                    </div>

                    {/* 2. INNER WHITE DOCUMENT SHEET (Animates UP out of the folder when clicked!) */}
                    <motion.div
                      animate={{
                        y: isSelected ? -24 : 0,
                        opacity: isSelected ? 1 : 0.85,
                        scale: isSelected ? 1.02 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                      className="absolute top-[4px] sm:top-[6px] inset-x-2.5 sm:inset-x-3 h-14 bg-white rounded-t-md sm:rounded-t-lg shadow-[0_-4px_14px_rgba(0,0,0,0.08)] z-[2] border border-slate-200/90 p-1.5 flex flex-col justify-start pointer-events-none overflow-hidden"
                    >
                      <div className="w-8 sm:w-10 h-0.5 rounded-full bg-slate-300 mx-auto mt-0.5" />
                      <div className="w-5 sm:w-7 h-0.5 rounded-full bg-slate-200 mx-auto mt-1" />
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-[7.5px] sm:text-[8.5px] font-extrabold text-center text-slate-600 uppercase tracking-wider"
                        >
                          ACTIVE
                        </motion.div>
                      )}
                    </motion.div>

                    {/* 3. FRONT FROSTED GLASS POCKET */}
                    <div
                      className={`relative z-[3] mt-[16px] sm:mt-[18px] w-full flex-1 rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex flex-col justify-between backdrop-blur-xl ${folder.bgFront} ${folder.border} ${folder.shadow} ${
                        isSelected
                          ? "shadow-xl -translate-y-1"
                          : "hover:-translate-y-0.5"
                      } transition-all duration-300 text-white overflow-hidden`}
                    >
                      <div className="absolute -top-7 -right-7 w-16 h-16 bg-white/20 rounded-full blur-md pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 pointer-events-none rounded-lg" />

                      {/* Header in Pocket */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 drop-shadow-xs" />
                          <span className="text-[12px] sm:text-[13px] font-bold text-white tracking-tight drop-shadow-xs truncate">
                            {folder.title}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[9.5px] font-bold bg-white/20 backdrop-blur-sm px-1.5 py-0.2 rounded-full border border-white/30 text-white shrink-0">
                          {fileCount}
                        </span>
                      </div>

                      {/* Footer in Pocket */}
                      <div className="relative z-10 pt-1 flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-medium text-white/90">
                          {isSelected ? "Active Folder" : "Click to View"}
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 text-white/90 transition-transform duration-300 ${
                            isSelected ? "rotate-180 text-white" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Folder Works Table (Shows below when clicked!) */}
            <AnimatePresence mode="wait">
              {selectedWorkingFolder ? (
                <motion.div
                  key={selectedWorkingFolder}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#f1f5f9] bg-[#f8fafc]/70">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#64748b]">
                        Active Category:
                      </span>
                      <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200/70">
                        {selectedWorkingFolder}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#64748b]">
                      {ALL_WORKING_ASSETS[selectedWorkingFolder]?.length || 0} production files
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[620px]">
                      <thead>
                        <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                          <th className="py-3 px-4 sm:px-6">Name</th>
                          <th className="py-3 px-4 w-28">Type</th>
                          <th className="py-3 px-4 w-32">Modified</th>
                          <th className="py-3 px-4 sm:px-6 text-right w-44">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9] text-sm">
                        {ALL_WORKING_ASSETS[selectedWorkingFolder]?.map((item) => {
                          const Icon = item.icon;
                          let badgeStyle = "bg-[#f1f5f9] text-[#64748b]";
                          if (item.type === "Chat")
                            badgeStyle =
                              "bg-orange-50 text-orange-700 border border-orange-200";
                          if (item.type === "App")
                            badgeStyle =
                              "bg-pink-50 text-pink-700 border border-pink-200";
                          if (item.type === "Audio")
                            badgeStyle =
                              "bg-purple-50 text-purple-700 border border-purple-200";
                          if (item.type === "Image")
                            badgeStyle =
                              "bg-emerald-50 text-emerald-700 border border-emerald-200";
                          if (item.type === "Video")
                            badgeStyle =
                              "bg-sky-50 text-sky-700 border border-sky-200";
                          if (item.type === "Doc")
                            badgeStyle =
                              "bg-amber-50 text-amber-700 border border-amber-200";

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-[#f8fafc] transition-colors group cursor-pointer"
                              onClick={() => {
                                toast.success(`Opening ${item.name}`);
                                navigate(item.path);
                              }}
                            >
                              <td className="py-3.5 px-4 sm:px-6">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 transition-colors bg-[#f1f5f9] text-[#64748b] group-hover:text-[#FF6B00]">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-semibold truncate text-xs sm:text-sm transition-colors text-[#0f172a] group-hover:text-[#FF6B00]">
                                      {item.name}
                                    </div>
                                    <div className="text-[11px] text-[#64748b] truncate">
                                      {item.subtitle}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider ${badgeStyle}`}
                                >
                                  {item.type}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-xs text-[#64748b] font-medium whitespace-nowrap">
                                {item.modified}
                              </td>

                              <td className="py-3.5 px-4 sm:px-6 text-right">
                                <div
                                  className="flex items-center justify-end gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      toast.success(`Resuming ${item.name}`);
                                      navigate(item.path);
                                    }}
                                    className="p-1.5 rounded-full text-[#94a3b8] hover:text-[#FF6B00] hover:bg-orange-50 transition-colors cursor-pointer bg-transparent border-0"
                                    title="Resume"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast.success(`Exporting ${item.name}`)
                                    }
                                    className="p-1.5 rounded-full text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer bg-transparent border-0"
                                    title="Download"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast.success(
                                        `Duplicated ${item.name} to workspace`,
                                      )
                                    }
                                    className="p-1.5 rounded-full text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer bg-transparent border-0"
                                    title="Duplicate"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (typeof window !== "undefined") {
                                        navigator.clipboard?.writeText(
                                          `${window.location.origin}${item.path}`,
                                        );
                                      }
                                      toast.success(
                                        `Share link copied for ${item.name}`,
                                      );
                                    }}
                                    className="p-1.5 rounded-full text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer bg-transparent border-0"
                                    title="Share"
                                  >
                                    <Share2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-selection"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="w-full py-8 px-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B00] mb-2.5">
                    <FolderClosed className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    Click any folder above
                  </div>
                  <div className="text-xs text-slate-500 mt-1 max-w-sm">
                    Select Chat, App, Audio, Image, Video, or Doc to inspect and resume active production files.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
};
