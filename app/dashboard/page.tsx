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
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SKILLS } from "@/lib/skillsCatalog";
import {
  CATEGORIES,
  SHOWCASE_CARDS,
  type Category,
  type ShowcaseCard,
} from "@/components/dashboard/dashboardData";
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
  CONTINUE WORKING ASSETS MOCK DATA
*/
type WorkingAsset = {
  id: string;
  name: string;
  subtitle: string;
  type: "Chat" | "Video" | "Doc" | "App";
  modified: string;
  icon: LucideIcon;
  path: string;
};

const CONTINUE_WORKING_ASSETS: WorkingAsset[] = [
  {
    id: "w-1",
    name: "Autonomous Agent Orchestration Specs",
    subtitle: "Architecture breakdown · 4 multi-agent reasoning graphs",
    type: "Chat",
    modified: "10 mins ago",
    icon: MessageSquare,
    path: "/app",
  },
  {
    id: "w-2",
    name: "Cyberpunk Cinematic 4K Teaser",
    subtitle: "Timeline project · 6 video tracks, 4 stem layers, 60fps",
    type: "Video",
    modified: "1 hour ago",
    icon: Film,
    path: "/app",
  },
  {
    id: "w-3",
    name: "Financial Data Extraction Model Brief",
    subtitle: "Knowledge pipeline · 14 source documents connected",
    type: "Doc",
    modified: "Yesterday",
    icon: FileText,
    path: "/app",
  },
  {
    id: "w-4",
    name: "E-Commerce Microservice Architecture",
    subtitle: "Full-stack app scaffold · React 19 + Tailwind v4 + PostgreSQL",
    type: "App",
    modified: "2 days ago",
    icon: Layout,
    path: "/app-builder",
  },
  {
    id: "w-5",
    name: "Brand Identity Color Tokens & Design System",
    subtitle: "Vector exports · Tailwind typography scale & components",
    type: "Doc",
    modified: "3 days ago",
    icon: FileText,
    path: "/app",
  },
];

/* 
  5-COLOR PALETTE PER TOPIC
*/
const FOLDER_THEMES = [
  {
    name: "orange",
    svgFill: "rgba(255, 145, 86, 0.95)",
    bgFront: "bg-gradient-to-b from-[#FFA87D] via-[#FF8E52] to-[#FF7535]",
    shadow: "shadow-[0_8px_28px_rgba(255,117,53,0.32)]",
    border: "border-white/70",
  },
  {
    name: "pink",
    svgFill: "rgba(247, 115, 158, 0.95)",
    bgFront: "bg-gradient-to-b from-[#FB8CB3] via-[#F76497] to-[#F14681]",
    shadow: "shadow-[0_8px_28px_rgba(241,70,129,0.32)]",
    border: "border-white/70",
  },
  {
    name: "purple",
    svgFill: "rgba(139, 92, 246, 0.95)",
    bgFront: "bg-gradient-to-b from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED]",
    shadow: "shadow-[0_8px_28px_rgba(124,58,237,0.32)]",
    border: "border-white/70",
  },
  {
    name: "green",
    svgFill: "rgba(52, 211, 153, 0.95)",
    bgFront: "bg-gradient-to-b from-[#6EE7B7] via-[#34D399] to-[#10B981]",
    shadow: "shadow-[0_8px_28px_rgba(16,185,129,0.32)]",
    border: "border-white/70",
  },
  {
    name: "blue",
    svgFill: "rgba(59, 130, 246, 0.95)",
    bgFront: "bg-gradient-to-b from-[#70BAFF] via-[#3B82F6] to-[#2563EB]",
    shadow: "shadow-[0_8px_28px_rgba(37,99,235,0.32)]",
    border: "border-white/70",
  },
];

const CATEGORY_COLOR_ORDER: Record<Category, number[]> = {
  "Marketing campaigns": [0, 1, 2, 3, 4],
  "Movies & Shorts": [2, 4, 0, 3, 1],
  "Social media": [1, 3, 4, 0, 2],
  "Educational content": [3, 0, 2, 4, 1],
  "Experimental art": [4, 2, 1, 0, 3],
};

const templateSlideVariants: Variants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(2px)",
  }),
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 460, damping: 32 },
      opacity: { duration: 0.18, ease: "easeOut" },
      filter: { duration: 0.15 },
      staggerChildren: 0.025,
      delayChildren: 0,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(2px)",
    transition: {
      duration: 0.12,
      ease: "easeIn",
    },
  }),
};

const folderCardVariants: Variants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
    scale: 0.97,
  }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 480,
      damping: 28,
    },
  },
};

const FolderCard = ({
  card,
  index,
  category,
  direction = 1,
  onClick,
}: {
  card: ShowcaseCard;
  index: number;
  category: Category;
  direction?: number;
  onClick: () => void;
}) => {
  const colorOrder = CATEGORY_COLOR_ORDER[category] || [0, 1, 2, 3, 4];
  const themeIndex = colorOrder[index % colorOrder.length];
  const theme = FOLDER_THEMES[themeIndex];

  return (
    <motion.div
      variants={folderCardVariants}
      custom={direction}
      whileHover={{ y: -3, scale: 1.02, transition: springTransition }}
      onClick={onClick}
      className="group relative w-full flex flex-col cursor-pointer select-none aspect-[4/2.65] min-h-[88px] sm:min-h-[96px] max-h-[115px]"
    >
      {/* 1. BACK FOLDER LAYER */}
      <div className="absolute inset-0 pointer-events-none drop-shadow-xs">
        <svg
          viewBox="0 0 200 160"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 20 Q 0 0 16 0 L 72 0 Q 86 0 96 15 L 102 23 Q 110 30 122 30 L 184 30 Q 200 30 200 46 L 200 144 Q 200 160 184 160 L 16 160 Q 0 160 0 144 Z"
            fill={theme.svgFill}
          />
        </svg>
      </div>

      {/* 2. INNER WHITE DOCUMENT SHEET */}
      <div className="absolute top-[5px] sm:top-[6px] inset-x-2 sm:inset-x-2.5 h-7.5 bg-white/95 rounded-t-md sm:rounded-t-lg shadow-2xs z-[2] transition-transform duration-300 group-hover:-translate-y-1.5 border border-white/80">
        <div className="mx-auto mt-1 w-8 sm:w-10 h-0.5 rounded-full bg-slate-300/85" />
      </div>

      {/* 3. FRONT FROSTED GLASS POCKET */}
      <div
        className={`relative z-[3] mt-[15px] sm:mt-[17px] w-full flex-1 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex flex-col justify-between backdrop-blur-xl ${theme.bgFront} ${theme.shadow} border ${theme.border} shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),inset_0_-1px_1.5px_rgba(0,0,0,0.12)] transition-all duration-300 text-white overflow-hidden`}
      >
        <div className="absolute -top-7 -right-7 w-16 h-16 bg-white/20 rounded-full blur-md pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 pointer-events-none rounded-lg" />

        {/* Title */}
        <div className="relative z-10">
          <div
            style={{ color: "#ffffff" }}
            className="text-[10px] sm:text-[10.5px] lg:text-[11.5px] font-bold leading-snug tracking-tight !text-white line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
          >
            {card.title}
          </div>
        </div>

        {/* Bottom Bar: Use Template button */}
        <div className="relative z-10 pt-0.5 flex items-center justify-end">
          <button
            type="button"
            style={{ color: "#ffffff" }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 !text-white text-white text-[8.5px] sm:text-[9.5px] font-semibold flex items-center gap-0.5 border border-white/60 shadow-[0_1px_4px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all cursor-pointer shrink-0"
          >
            <span>Use Template</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
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
  const [activeCategory, setActiveCategory] = useState<Category>(
    "Marketing campaigns",
  );
  const [categoryDirection, setCategoryDirection] = useState(1);

  const handleCategoryChange = (tab: Category) => {
    const currentIdx = CATEGORIES.indexOf(activeCategory);
    const nextIdx = CATEGORIES.indexOf(tab);
    setCategoryDirection(nextIdx >= currentIdx ? 1 : -1);
    setActiveCategory(tab);
  };
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

  const filteredShowcaseCards = SHOWCASE_CARDS.filter(
    (card) => card.category === activeCategory,
  );

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
                          icon: Sparkles,
                          label: "Brainstorming",
                          desc: "Explore concepts & ideas",
                        },
                        {
                          icon: Code,
                          label: "Code Assistant",
                          desc: "Debug, refactor, generate",
                        },
                        {
                          icon: FileText,
                          label: "Doc Synthesizer",
                          desc: "Summarize & extract insights",
                        },
                        {
                          icon: Globe,
                          label: "Deep Search",
                          desc: "Live web synthesis",
                        },
                        {
                          icon: Layers,
                          label: "Multi-Model",
                          desc: "Compare frontier models",
                        },
                        {
                          icon: Wand2,
                          label: "Creative Studio",
                          desc: "Transform styles & tones",
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

            {/* 10 Small Square Glassmorphic Boxes (5 per row on desktop) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
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
                    className="relative aspect-square overflow-hidden rounded-[18px] sm:rounded-[22px] p-3.5 sm:p-4 lg:p-4.5 flex flex-col justify-between cursor-pointer backdrop-blur-xl border shadow-[0_6px_20px_rgba(0,0,0,0.025),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 select-none group"
                  >
                    {/* Glass inner gradient reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none rounded-[18px] sm:rounded-[22px]" />

                    {/* Top: Tool Name / Words */}
                    <div className="relative z-10 text-[12.5px] sm:text-[13.5px] lg:text-[14px] font-bold text-slate-900 tracking-tight leading-snug font-display line-clamp-2">
                      {tool.title}
                    </div>

                    {/* Bottom: Solid Glyph Logo */}
                    <div className="relative z-10 mt-auto pt-2 flex items-end">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-7.5 lg:h-7.5 text-slate-900 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* 5. 'CONTINUE WORKING' TABLE */}
          <motion.section
            variants={itemVariants}
            className="w-full space-y-3.5 sm:space-y-4"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0f172a] font-display">
                  Continue Working
                </div>
                <div className="text-xs sm:text-sm text-[#64748b] mt-0.5">
                  Streamlined asset access for your active production files and
                  sessions
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

            {/* Asset Table */}
            <div className="w-full bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
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
                    {CONTINUE_WORKING_ASSETS.map((item) => {
                      const Icon = item.icon;
                      let badgeStyle = "bg-[#f1f5f9] text-[#64748b]";
                      if (item.type === "Chat")
                        badgeStyle =
                          "bg-sky-50 text-sky-700 border border-sky-200";
                      if (item.type === "Video")
                        badgeStyle =
                          "bg-purple-50 text-purple-700 border border-purple-200";
                      if (item.type === "Doc")
                        badgeStyle =
                          "bg-amber-50 text-amber-700 border border-amber-200";
                      if (item.type === "App")
                        badgeStyle =
                          "bg-emerald-50 text-emerald-700 border border-emerald-200";

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
            </div>
          </motion.section>

          {/* 6. 'TEMPLATES' CAROUSEL */}
          <motion.section
            variants={itemVariants}
            className="w-full space-y-4 sm:space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] pb-0.5">
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CATEGORIES.map((tab) => {
                  const isActive = activeCategory === tab;
                  return (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => handleCategoryChange(tab)}
                      className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors bg-transparent border-0 cursor-pointer ${
                        isActive
                          ? "text-[#0f172a]"
                          : "text-[#64748b] hover:text-[#0f172a]"
                      }`}
                    >
                      {tab}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6B00] rounded-full"
                          transition={springTransition}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <span className="hidden sm:block text-xs text-[#64748b] pb-2 shrink-0">
                Showing {filteredShowcaseCards.length} templates
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={categoryDirection}
              >
                <motion.div
                  key={activeCategory}
                  custom={categoryDirection}
                  variants={templateSlideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full grid grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
                >
                  {filteredShowcaseCards.map((card, idx) => (
                    <FolderCard
                      key={card.id}
                      card={card}
                      index={idx}
                      category={activeCategory}
                      direction={categoryDirection}
                      onClick={() => {
                        toast.success(`Opening template: ${card.title}`);
                        navigate("/app");
                      }}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
};
