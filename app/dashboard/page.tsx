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
  HatGlasses,
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
  BarChart2,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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
  CREATIVE TOOLS DEFINITION (10 Small Square Glassmorphic Boxes, 5 per row)
*/
const CREATIVE_TOOLS = [
  {
    id: "edit-studio",
    title: "Edit Studio",
    icon: Video,
    path: "/chat",
    bg: "rgba(255, 145, 77, 0.14)", // Light pastel orange glass
    border: "rgba(255, 145, 77, 0.35)",
  },
  {
    id: "audio-lab",
    title: "Audio Lab",
    icon: Mic,
    path: "/audio-lab",
    bg: "rgba(180, 140, 255, 0.14)", // Light pastel purple glass
    border: "rgba(180, 140, 255, 0.35)",
  },
  {
    id: "image-enhancer",
    title: "Image Enhancer",
    icon: Sparkles,
    path: "/image-enhancer",
    bg: "rgba(255, 148, 194, 0.14)", // Light pastel pink glass
    border: "rgba(255, 148, 194, 0.35)",
  },
  {
    id: "app-builder",
    title: "App Builder",
    icon: Layers,
    path: "/app-builder",
    bg: "rgba(255, 215, 64, 0.15)", // Light pastel yellow glass
    border: "rgba(255, 215, 64, 0.35)",
  },
  {
    id: "deep-search",
    title: "Deep Search",
    icon: Search,
    path: "/chat",
    bg: "rgba(125, 185, 255, 0.14)", // Light pastel blue glass
    border: "rgba(125, 185, 255, 0.35)",
  },
  {
    id: "doc-synthesizer",
    title: "Doc Synthesizer",
    icon: FileText,
    path: "/chat",
    bg: "rgba(95, 215, 160, 0.14)", // Light pastel mint glass
    border: "rgba(95, 215, 160, 0.35)",
  },
  {
    id: "marketplace",
    title: "Marketplace",
    icon: ShoppingBag,
    path: "/marketplace",
    bg: "rgba(244, 114, 182, 0.14)", // Light pastel rose glass
    border: "rgba(244, 114, 182, 0.35)",
  },
  {
    id: "rivinity-lm",
    title: "RivinityLM",
    icon: Bot,
    path: "/rivinity-lm",
    bg: "rgba(251, 146, 60, 0.14)", // Light pastel peach glass
    border: "rgba(251, 146, 60, 0.35)",
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    icon: FolderClosed,
    path: "/knowledge-base",
    bg: "rgba(45, 212, 191, 0.14)", // Light pastel teal glass
    border: "rgba(45, 212, 191, 0.35)",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart2,
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
      path: "/chat",
    },
    {
      id: "chat-2",
      name: "Brand Strategy & Positioning Dialogue",
      subtitle: "Interactive persona synthesis · 12 turn session",
      type: "Chat",
      modified: "3 hours ago",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      id: "chat-3",
      name: "API Route Optimizer & Debug Assistant",
      subtitle: "Edge runtime debugging · 8 tool calls verified",
      type: "Chat",
      modified: "Yesterday",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      id: "chat-4",
      name: "Creative Ad Script Generation Session",
      subtitle: "Multichannel copywriting variants for TikTok & Meta",
      type: "Chat",
      modified: "2 days ago",
      icon: MessageSquare,
      path: "/chat",
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
      path: "/chat",
    },
    {
      id: "vid-2",
      name: "SaaS Product Demo Promo Montage",
      subtitle: "Dynamic motion keyframing & speed ramps · 1080p ProRes",
      type: "Video",
      modified: "Yesterday",
      icon: Film,
      path: "/chat",
    },
    {
      id: "vid-3",
      name: "Social Kinetic Cut 9:16 Video",
      subtitle: "Automated aspect ratio reframe & synchronized auto-captions",
      type: "Video",
      modified: "3 days ago",
      icon: Film,
      path: "/chat",
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
      path: "/chat",
    },
    {
      id: "doc-2",
      name: "Brand Identity Color Tokens & Design System",
      subtitle: "Vector exports · Tailwind typography scale & components",
      type: "Doc",
      modified: "3 days ago",
      icon: FileText,
      path: "/chat",
    },
    {
      id: "doc-3",
      name: "Quarterly AI Infrastructure Security Audit",
      subtitle: "PDF multi-page synthesis · 42 pages summarized with citations",
      type: "Doc",
      modified: "5 days ago",
      icon: FileText,
      path: "/chat",
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
  const [isIncognito, setIsIncognito] = useState(false);
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
    router.push("/chat");
  };

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const pending = sessionStorage.getItem("rivinity_pending_prompt");
        if (pending && pending === promptInput.trim()) {
          router.push("/chat");
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
          className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-10 pb-24"
        >
          {/* HERO / CENTRALIZED PROMPT BOX */}
          <motion.section
            variants={itemVariants}
            className="w-full max-w-[860px] mx-auto flex flex-col items-center justify-center text-center pt-0 relative z-40"
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
            <div
              className={cn(
                "w-full max-w-[700px] mx-auto relative z-40 transition-all duration-300",
                isIncognito &&
                  "p-2 sm:p-2.5 rounded-[26px] bg-slate-100/85 dark:bg-zinc-800/60 backdrop-blur-2xl border border-slate-300 dark:border-zinc-600 shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
              )}
            >
              {/* INCOGNITO MODE TOP GLASS HEADER */}
              {isIncognito && (
                <div className="px-3.5 sm:px-4 pt-1 pb-2 text-[12px] select-none text-slate-600 dark:text-zinc-300 font-medium tracking-tight animate-in fade-in duration-200">
                  Incognito Mode Active &bull; Chats will not be saved to history
                </div>
              )}

              <div
                className={cn(
                  "w-full rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col text-left",
                  isIncognito
                    ? "bg-[#22242a] dark:bg-[#1c1e24] rounded-[20px] border border-white/10 dark:border-zinc-700/60 shadow-xl text-white"
                    : cn(
                        "bg-white border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-slate-400",
                        isInputFocused && "border-slate-400 ring-2 ring-slate-400/20",
                      ),
                )}
              >
                {/* Expandable Tools Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isAddingTools
                      ? cn(
                          "max-h-[260px] opacity-100 border-b",
                          isIncognito ? "border-white/10 bg-black/25" : "border-[#e2e8f0] bg-[#f8fafc]",
                        )
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-3 sm:p-4">
                    <div
                      className={cn(
                        "text-[11px] sm:text-[12px] font-bold uppercase tracking-wider px-1 mb-2",
                        isIncognito ? "text-zinc-400" : "text-[#64748b]",
                      )}
                    >
                      Quick AI Modes
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        {
                          icon: Bot,
                          label: "Agents Playground",
                        },
                        {
                          icon: GraduationCap,
                          label: "RivinityLM",
                        },
                        {
                          icon: Sparkles,
                          label: "Image Enhancer",
                        },
                        {
                          icon: AudioWaveform,
                          label: "Audio Lab",
                        },
                        {
                          icon: Layers,
                          label: "App Builder",
                        },
                        {
                          icon: Clapperboard,
                          label: "Prompt to Video",
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
                          className={cn(
                            "flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border cursor-pointer",
                            isIncognito
                              ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                              : "bg-white hover:bg-[#f1f5f9] border-[#e2e8f0]",
                          )}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              isIncognito
                                ? "bg-white/10 text-white"
                                : "bg-slate-100 text-slate-900",
                            )}
                          >
                            <tool.icon className="w-4 h-4" />
                          </div>
                          <div
                            className={cn(
                              "text-[12px] font-semibold truncate",
                              isIncognito ? "text-zinc-200" : "text-[#0f172a]",
                            )}
                          >
                            {tool.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Textarea Input */}
                <div className="px-3.5 sm:px-4.5 pt-2.5 pb-0">
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
                    placeholder={
                      isIncognito
                        ? "Ask me anything (Incognito mode)..."
                        : "Ask anything, generate workflows, build apps..."
                    }
                    rows={1}
                    className={cn(
                      "w-full bg-transparent font-sans text-[14.5px] font-normal leading-normal focus:outline-none focus-visible:outline-none focus-visible:ring-0 resize-none border-none outline-none shadow-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-[26px]",
                      isIncognito
                        ? "text-white placeholder:text-zinc-500"
                        : "text-[#0f172a] placeholder:text-[#94a3b8]",
                    )}
                    style={{ outline: "none" }}
                  />
                </div>

                {/* Bottom Action Controls */}
                <div className="flex items-center justify-between w-full px-3 sm:px-4 pb-2 pt-0.5">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                        isIncognito
                          ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                          : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100",
                      )}
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

                    <button
                      type="button"
                      onClick={() => {
                        const next = !isAddingTools;
                        setIsAddingTools(next);
                        if (next) setSkillPickerOpen(false);
                      }}
                      className={cn(
                        "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                        isAddingTools
                          ? isIncognito
                            ? "!bg-[#FF6B00]/25 text-[#FF6B00]"
                            : "!bg-orange-50 text-[#FF6B00]"
                          : isIncognito
                            ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                            : "hover:bg-slate-100 text-slate-500 hover:text-slate-900",
                      )}
                      title="Add tool / mode"
                    >
                      <Plus className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsWebSearchActive((prev) => !prev)}
                      className={cn(
                        "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                        isWebSearchActive
                          ? isIncognito
                            ? "!bg-sky-500/25 text-sky-400"
                            : "!bg-orange-50 text-[#FF6B00]"
                          : isIncognito
                            ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                            : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100",
                      )}
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
                        const next = !skillPickerOpen;
                        setSkillPickerOpen(next);
                        if (next) setIsAddingTools(false);
                      }}
                      className={cn(
                        "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                        skillPickerOpen
                          ? isIncognito
                            ? "!bg-[#FF6B00]/25 text-[#FF6B00]"
                            : "!bg-orange-50 text-[#FF6B00]"
                          : isIncognito
                            ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                            : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100",
                      )}
                      title="Skills"
                    >
                      <Wand2
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          skillPickerOpen
                            ? "text-[#FF6B00]"
                            : isIncognito
                              ? "text-zinc-400"
                              : "text-slate-500",
                        )}
                        strokeWidth={2}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsIncognito((prev) => {
                          const next = !prev;
                          if (next) {
                            toast.info(
                              "Incognito mode active: Chats will not be saved to history.",
                            );
                          } else {
                            toast.info("Incognito mode disabled.");
                          }
                          return next;
                        });
                      }}
                      className={cn(
                        "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0",
                        isIncognito
                          ? "!bg-white/20 text-white shadow-xs ring-1 ring-white/30"
                          : "bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100",
                      )}
                      title={
                        isIncognito
                          ? "Incognito mode active (Chats are not saved)"
                          : "Incognito mode (Don't save chat history)"
                      }
                    >
                      <HatGlasses className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => toast.info("Microphone listening...")}
                      className={cn(
                        "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                        isIncognito
                          ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                          : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100",
                      )}
                      title="Voice input"
                    >
                      <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={!promptInput.trim()}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all",
                        promptInput.trim()
                          ? "!bg-[#FF6B00] hover:!bg-[#E66000] text-white shadow-[0_2px_8px_rgba(255,107,0,0.30)] active:scale-95"
                          : isIncognito
                            ? "!bg-white/10 text-white/35 cursor-not-allowed border border-white/5"
                            : "!bg-[#FFD5C2] dark:!bg-[#5a2e1d] text-white opacity-85 cursor-not-allowed",
                      )}
                      title="Send prompt"
                    >
                      <ArrowUpRight
                        className={cn(
                          "w-4.5 h-4.5 shrink-0",
                          promptInput.trim() ? "text-white" : isIncognito ? "text-white/40" : "text-white",
                        )}
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
                      <Wand2
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

            {/* Disclaimer */}
            <div className="text-[11.5px] sm:text-[12px] text-gray-400 dark:text-zinc-500 text-center mt-2.5 sm:mt-3 select-none">
              Rivinity can make mistakes. Check important info.
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

                    {/* Rivinity Logo at Bottom-Right Corner on Hover */}
                    <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 ease-out z-0">
                      <img
                        src={logoSrc}
                        onError={(e) => {
                          e.currentTarget.src = "/watermark.png";
                        }}
                        alt="Rivinity Logo"
                        className="w-full h-full object-contain select-none drop-shadow-[0_4px_16px_rgba(255,107,0,0.35)]"
                        draggable={false}
                      />
                    </div>

                    {/* Top: Tool Name / Words */}
                    <div className="relative z-10 text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-slate-900 tracking-tight leading-snug font-display">
                      {tool.title}
                    </div>

                    {/* Bottom: Normal Icon on Bottom Left Side */}
                    <div className="relative z-10 mt-auto pt-2 flex items-end justify-start">
                      <Icon
                        className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-slate-900 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.8}
                      />
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
