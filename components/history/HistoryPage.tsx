"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SidebarShell from "@/components/canvas/SidebarShell";
import { toast } from "sonner";
import {
  MessageSquare,
  Layout,
  AudioWaveform,
  ImageIcon,
  Video,
  FileText,
  Mic,
  Film,
  Plus,
  Play,
  Download,
  Copy,
  FolderPlus,
  Rocket,
  Check,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Folder,
  Layers,
  MoreVertical,
  ExternalLink,
  Sparkles,
  Code2,
  Shield,
  Briefcase,
  Trash2,
  Pencil,
  ArrowRight,
  Pin,
  ChevronRight,
  FolderArchive,
} from "lucide-react";

// ============================================
// Types
// ============================================

export type CategoryType = "CHAT" | "APP" | "AUDIO" | "IMAGE" | "VIDEO" | "DOC";

export type HistoryItem = {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  workspaceId: string;
  modified: string;
  dateStr: string;
  prompt: string;
  response: string;
  tokens: number;
  cost: string;
  durationMs: number;
  isPinned?: boolean;
};

export type Workspace = {
  id: string;
  name: string;
  topic: string;
  description?: string;
  iconName: string;
  bannerGradient: string; // Pastel banner gradient
  accentColor: string;
  updatedAtStr: string;
  status: string;
  createdAt: string;
};

// ============================================
// Preloaded Seed Data with Pastel Colors (Image 2 Style)
// ============================================

const initialWorkspaces: Workspace[] = [
  {
    id: "ws-email",
    name: "Email Responder",
    topic: "Automate customer support email drafting & context-aware replies",
    description: "Automate customer support email drafting & context-aware replies",
    iconName: "Briefcase",
    bannerGradient: "from-[#fed7aa] via-[#fbcfe8] to-[#fdba74]", // Pastel sunset orange/pink
    accentColor: "#f97316",
    updatedAtStr: "1 day ago",
    status: "Active",
    createdAt: "2026-09-24",
  },
  {
    id: "ws-agents",
    name: "Autonomous AI Agents",
    topic: "Multi-agent orchestration, tool-calling & reasoning graphs",
    description: "Multi-agent orchestration, tool-calling & reasoning graphs",
    iconName: "Rocket",
    bannerGradient: "from-[#ede9fe] via-[#ddd6fe] to-[#c084fc]", // Pastel purple/lavender
    accentColor: "#a855f7",
    updatedAtStr: "3 hours ago",
    status: "Active",
    createdAt: "2026-09-01",
  },
  {
    id: "ws-growth",
    name: "Brand & Marketing",
    topic: "Campaign copywriting, interactive persona synthesis & social ads",
    description: "Campaign copywriting, interactive persona synthesis & social ads",
    iconName: "Sparkles",
    bannerGradient: "from-[#fce7f3] via-[#fbcfe8] to-[#f472b6]", // Pastel pink/rose
    accentColor: "#ec4899",
    updatedAtStr: "Yesterday",
    status: "Active",
    createdAt: "2026-09-05",
  },
  {
    id: "ws-infra",
    name: "Backend Optimizer",
    topic: "Next.js edge runtime, Redis idempotency keys & telemetry",
    description: "Next.js edge runtime, Redis idempotency keys & telemetry",
    iconName: "Code2",
    bannerGradient: "from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]", // Pastel sky blue
    accentColor: "#0284c7",
    updatedAtStr: "2 days ago",
    status: "Active",
    createdAt: "2026-09-10",
  },
  {
    id: "ws-legal",
    name: "Legal & Enterprise",
    topic: "Vendor MSA review, mutual NDAs & compliance verification",
    description: "Vendor MSA review, mutual NDAs & compliance verification",
    iconName: "Shield",
    bannerGradient: "from-[#d1fae5] via-[#a7f3d0] to-[#6ee7b7]", // Pastel mint green
    accentColor: "#10b981",
    updatedAtStr: "4 days ago",
    status: "Active",
    createdAt: "2026-09-12",
  },
];

export const initialHistoryItems: HistoryItem[] = [
  // CHAT items (Matching Image 2 exactly!)
  {
    id: "c1",
    name: "Autonomous Agent Orchestration Specs",
    subtitle: "Architecture breakdown • 4 multi-agent reasoning graphs",
    category: "CHAT",
    workspaceId: "ws-agents",
    modified: "10 mins ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Provide an architectural blueprint for coordinating 4 autonomous AI subagents with shared vector memory and deterministic state machines.",
    response:
      "Blueprint created: Orchestrator agent delegates task decomposition to Worker agents with Redis semantic cache and LangGraph state checkpoints.",
    tokens: 18400,
    cost: "$0.024",
    durationMs: 840,
  },
  {
    id: "c2",
    name: "Brand Strategy & Positioning Dialogue",
    subtitle: "Interactive persona synthesis • 12 turn session",
    category: "CHAT",
    workspaceId: "ws-growth",
    modified: "3 hours ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Synthesize target customer personas for B2B developer tool adoption across Series A-C AI startups.",
    response:
      "Mapped 3 primary personas: The Pragmatic Staff Architect, The Product Innovation VP, and The Security/Compliance Officer.",
    tokens: 14200,
    cost: "$0.018",
    durationMs: 720,
  },
  {
    id: "c3",
    name: "API Route Optimizer & Debug Assistant",
    subtitle: "Edge runtime debugging • 8 tool calls verified",
    category: "CHAT",
    workspaceId: "ws-infra",
    modified: "Yesterday",
    dateStr: "Sep 25, 2026",
    prompt:
      "Diagnose hydration mismatches and cold-start latency spikes in Next.js 15 App Router dynamic routes.",
    response:
      "Root cause identified: Client-side local storage read occurred before component mounting. Suggested useEffect guard pattern.",
    tokens: 9800,
    cost: "$0.012",
    durationMs: 510,
  },
  {
    id: "c4",
    name: "Creative Ad Script Generation Session",
    subtitle: "Multichannel copywriting variants for TikTok & Meta",
    category: "CHAT",
    workspaceId: "ws-growth",
    modified: "2 days ago",
    dateStr: "Sep 24, 2026",
    prompt:
      "Draft 5 punchy 15-second video hooks for AI-driven workspace productivity software.",
    response:
      "5 viral hooks generated focusing on 'Stop context switching between 14 open tabs' with high visual curiosity gaps.",
    tokens: 6400,
    cost: "$0.008",
    durationMs: 430,
  },
  {
    id: "c5",
    name: "Email Support Responder Master Prompt",
    subtitle: "Inbound customer triage & sentiment classification",
    category: "CHAT",
    workspaceId: "ws-email",
    modified: "1 day ago",
    dateStr: "Sep 25, 2026",
    prompt:
      "Draft a system instruction prompt for automated Zendesk ticket responses with polite escalations.",
    response:
      "System prompt drafted with strict tone safety guidelines and auto-tagging for billing vs bug issues.",
    tokens: 7200,
    cost: "$0.010",
    durationMs: 390,
  },

  // APP items
  {
    id: "a1",
    name: "Next.js 15 SaaS Dashboard Wireframe",
    subtitle: "Responsive telemetry components, live streams & charts",
    category: "APP",
    workspaceId: "ws-infra",
    modified: "1 hour ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Generate a production React component for real-time telemetry analytics with glassmorphism cards.",
    response:
      "Component TelemetryOverviewGrid.tsx generated with responsive Tailwind CSS layout.",
    tokens: 38100,
    cost: "$0.048",
    durationMs: 2340,
  },
  {
    id: "a2",
    name: "Stripe Webhook Idempotency Router",
    subtitle: "Redis lock mechanism & HMAC signature validation",
    category: "APP",
    workspaceId: "ws-infra",
    modified: "Yesterday",
    dateStr: "Sep 25, 2026",
    prompt:
      "Create an idempotent Stripe webhook receiver with automatic retry exponential backoff.",
    response:
      "Built secure webhook router with Redis distributed lock and event deduplication ledger.",
    tokens: 16500,
    cost: "$0.022",
    durationMs: 1100,
  },
  {
    id: "a3",
    name: "Cohort Retention Heatmap Component",
    subtitle: "12-month churn rate visualization with SVG cells",
    category: "APP",
    workspaceId: "ws-agents",
    modified: "3 days ago",
    dateStr: "Sep 23, 2026",
    prompt: "Develop an interactive 12-month cohort retention grid in React.",
    response:
      "Rendered interactive cohort table with color-coded retention brackets.",
    tokens: 22000,
    cost: "$0.030",
    durationMs: 1450,
  },

  // AUDIO items
  {
    id: "au1",
    name: "Product Keynote Voiceover Audio",
    subtitle: "Marcus executive narrative • 94s broadcast WAV master",
    category: "AUDIO",
    workspaceId: "ws-growth",
    modified: "4 hours ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Synthesize confident, energetic English US voiceover for keynote slide deck.",
    response:
      "Rendered 94-second studio WAV master at 48kHz / 24-bit with -14 LUFS loudness.",
    tokens: 4200,
    cost: "$0.038",
    durationMs: 3100,
  },
  {
    id: "au2",
    name: "Podcast Intro Dynamic Mastering",
    subtitle: "Dual-track EQ with 24-bit studio fidelity",
    category: "AUDIO",
    workspaceId: "ws-growth",
    modified: "2 days ago",
    dateStr: "Sep 24, 2026",
    prompt:
      "Master podcast intro theme music with ducking for voiceover narration.",
    response:
      "Exported mastered MP3/WAV stems with compression sidechaining applied.",
    tokens: 5100,
    cost: "$0.028",
    durationMs: 2400,
  },
  {
    id: "au3",
    name: "Multilingual Audio Stems",
    subtitle: "Hindi & Spanish localized audio stems",
    category: "AUDIO",
    workspaceId: "ws-growth",
    modified: "5 days ago",
    dateStr: "Sep 21, 2026",
    prompt:
      "Translate and synthesize keynote voiceover into Hindi and Spanish neutral accents.",
    response:
      "Generated bilingual audio localized tracks with matched syllable timing.",
    tokens: 8900,
    cost: "$0.045",
    durationMs: 3800,
  },

  // IMAGE items
  {
    id: "im1",
    name: "4K UHD Product Hero Render",
    subtitle: "Super-resolution diffusion • Specular highlight clarity",
    category: "IMAGE",
    workspaceId: "ws-growth",
    modified: "5 hours ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Generate an ultra-modern 3D glassmorphic software dashboard interface floating over dark obsidian glass.",
    response:
      "Rendered 3840x2160 UHD composition with ray-traced lighting and specular caustics.",
    tokens: 1200,
    cost: "$0.040",
    durationMs: 4200,
  },
  {
    id: "im2",
    name: "App Store Feature Graphics",
    subtitle: "Device mockup composite • Dark obsidian theme",
    category: "IMAGE",
    workspaceId: "ws-growth",
    modified: "1 day ago",
    dateStr: "Sep 25, 2026",
    prompt: "Render high-contrast marketing cards for App Store showcase.",
    response:
      "Generated 3 assets in 16:9 aspect ratio ready for production export.",
    tokens: 1100,
    cost: "$0.035",
    durationMs: 3900,
  },
  {
    id: "im3",
    name: "Brand Logo Vector Geometry",
    subtitle: "Golden ratio symmetry & SVG vectors",
    category: "IMAGE",
    workspaceId: "ws-growth",
    modified: "4 days ago",
    dateStr: "Sep 22, 2026",
    prompt:
      "Generate minimalist geometric vector logomark representing continuous intelligence.",
    response:
      "Rendered SVG paths with golden ratio balance and responsive icon scales.",
    tokens: 950,
    cost: "$0.020",
    durationMs: 2800,
  },

  // VIDEO items
  {
    id: "vi1",
    name: "AI Agent Demo Explainer Reel",
    subtitle: "60s kinetic typography & UI screen captures",
    category: "VIDEO",
    workspaceId: "ws-agents",
    modified: "6 hours ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Generate a dynamic 60-second product demo video showing multi-agent reasoning in action.",
    response:
      "Created full 1080p MP4 render with synchronized voiceover and animated UI callouts.",
    tokens: 12500,
    cost: "$0.095",
    durationMs: 6500,
  },
  {
    id: "vi2",
    name: "Customer Testimonial Highlights",
    subtitle: "Multicam auto-cut & subtitle captions",
    category: "VIDEO",
    workspaceId: "ws-growth",
    modified: "2 days ago",
    dateStr: "Sep 24, 2026",
    prompt:
      "Auto-edit 15-minute customer interview down to 90 seconds of high-impact quotes.",
    response:
      "Edited reel produced with burned-in subtitles and branded lower thirds.",
    tokens: 8400,
    cost: "$0.060",
    durationMs: 4800,
  },
  {
    id: "vi3",
    name: "Product Launch Teaser Video",
    subtitle: "Omni Flash 1.1 motion render with soundtrack",
    category: "VIDEO",
    workspaceId: "ws-growth",
    modified: "1 week ago",
    dateStr: "Sep 19, 2026",
    prompt:
      "Produce 30-second teaser video with glitch transitions and cinematic audio buildup.",
    response:
      "Rendered teaser clip with custom EDM audio score and typography reveals.",
    tokens: 9200,
    cost: "$0.075",
    durationMs: 5200,
  },

  // DOC items
  {
    id: "do1",
    name: "Fault-Tolerant Quantum Benchmark Whitepaper",
    subtitle: "Surface code error threshold synthesis across 12 vendors",
    category: "DOC",
    workspaceId: "ws-legal",
    modified: "8 hours ago",
    dateStr: "Sep 26, 2026",
    prompt:
      "Draft comprehensive executive whitepaper evaluating superconducting vs trapped-ion physical qubits.",
    response:
      "18-page whitepaper generated with LaTeX math formulations and vendor roadmap comparisons.",
    tokens: 48290,
    cost: "$0.048",
    durationMs: 1200,
  },
  {
    id: "do2",
    name: "Q3 Financial Engineering Analysis",
    subtitle: "Cohort ARR & net dollar retention breakdown",
    category: "DOC",
    workspaceId: "ws-legal",
    modified: "Yesterday",
    dateStr: "Sep 25, 2026",
    prompt:
      "Analyze trailing 12-month net dollar retention rates across top cloud enterprise software models.",
    response:
      "Compiled comparative financial model with sensitivity tables and payback period charts.",
    tokens: 24500,
    cost: "$0.028",
    durationMs: 980,
  },
  {
    id: "do3",
    name: "Singular Value Decomposition Study Guide",
    subtitle: "SVD proofs & PCA dimensionality reduction reference",
    category: "DOC",
    workspaceId: "ws-agents",
    modified: "3 days ago",
    dateStr: "Sep 23, 2026",
    prompt:
      "Create structured flashcards and concise proofs for matrix decomposition and PCA projection.",
    response:
      "Formatted reference guide with geometric vector diagrams and step-by-step proofs.",
    tokens: 18900,
    cost: "$0.020",
    durationMs: 760,
  },
];

// Definition of Interactive Category Folders (Dashboard Colors & Styling)
interface FolderConfig {
  key: CategoryType;
  label: string;
  icon: any;
  svgFill: string;
  bgFront: string;
  border: string;
  shadow: string;
}

const folderConfigs: FolderConfig[] = [
  {
    key: "CHAT",
    label: "Chat",
    icon: MessageSquare,
    svgFill: "rgba(255, 145, 86, 0.95)", // Pastel light orange
    bgFront: "bg-gradient-to-b from-[#FFA87D] via-[#FF8E52] to-[#FF7535]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(255,117,53,0.25)]",
  },
  {
    key: "APP",
    label: "App",
    icon: Layout,
    svgFill: "rgba(247, 115, 158, 0.95)", // Pastel light pink
    bgFront: "bg-gradient-to-b from-[#FB8CB3] via-[#F76497] to-[#F14681]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(241,70,129,0.25)]",
  },
  {
    key: "AUDIO",
    label: "Audio",
    icon: Mic,
    svgFill: "rgba(139, 92, 246, 0.95)", // Pastel light purple
    bgFront: "bg-gradient-to-b from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(124,58,237,0.25)]",
  },
  {
    key: "IMAGE",
    label: "Image",
    icon: ImageIcon,
    svgFill: "rgba(52, 211, 153, 0.95)", // Pastel light green
    bgFront: "bg-gradient-to-b from-[#6EE7B7] via-[#34D399] to-[#10B981]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(16,185,129,0.25)]",
  },
  {
    key: "VIDEO",
    label: "Video",
    icon: Film,
    svgFill: "rgba(59, 130, 246, 0.95)", // Pastel light blue
    bgFront: "bg-gradient-to-b from-[#70BAFF] via-[#3B82F6] to-[#2563EB]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(37,99,235,0.25)]",
  },
  {
    key: "DOC",
    label: "Doc",
    icon: FileText,
    svgFill: "rgba(251, 191, 36, 0.95)", // Pastel light yellow
    bgFront: "bg-gradient-to-b from-[#FDE68A] via-[#FBBF24] to-[#F59E0B]",
    border: "border-white/70",
    shadow: "shadow-[0_8px_24px_rgba(245,158,11,0.25)]",
  },
];

export const categoryStyles: Record<
  CategoryType,
  {
    icon: any;
    badgeBg: string;
    iconBg: string;
    iconHoverBg: string;
    accentColor: string;
  }
> = {
  CHAT: {
    icon: MessageSquare,
    badgeBg: "bg-gradient-to-r from-[#FFA87D] to-[#FF7535]",
    iconBg: "bg-orange-50 dark:bg-orange-950/40 text-orange-500",
    iconHoverBg: "group-hover:bg-[#FF7535] group-hover:text-white",
    accentColor: "#FF7535",
  },
  APP: {
    icon: Layout,
    badgeBg: "bg-gradient-to-r from-[#FB8CB3] to-[#F14681]",
    iconBg: "bg-pink-50 dark:bg-pink-950/40 text-pink-500",
    iconHoverBg: "group-hover:bg-[#F14681] group-hover:text-white",
    accentColor: "#F14681",
  },
  AUDIO: {
    icon: Mic,
    badgeBg: "bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]",
    iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-500",
    iconHoverBg: "group-hover:bg-[#7C3AED] group-hover:text-white",
    accentColor: "#7C3AED",
  },
  IMAGE: {
    icon: ImageIcon,
    badgeBg: "bg-gradient-to-r from-[#6EE7B7] to-[#10B981]",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500",
    iconHoverBg: "group-hover:bg-[#10B981] group-hover:text-white",
    accentColor: "#10B981",
  },
  VIDEO: {
    icon: Film,
    badgeBg: "bg-gradient-to-r from-[#70BAFF] to-[#2563EB]",
    iconBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-500",
    iconHoverBg: "group-hover:bg-[#2563EB] group-hover:text-white",
    accentColor: "#2563EB",
  },
  DOC: {
    icon: FileText,
    badgeBg: "bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]",
    iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-500",
    iconHoverBg: "group-hover:bg-[#F59E0B] group-hover:text-white",
    accentColor: "#F59E0B",
  },
};

export const STORAGE_WORKSPACES_KEY = "rivinity_workspaces_v4";
export const STORAGE_HISTORY_KEY = "rivinity_history_v4";
export const STORAGE_PINNED_KEY = "rivinity_pinned_items_v2";

// Pastel color palette choices for creating new workspace
const pastelPalettes = [
  {
    name: "Sunset Orange",
    gradient: "from-[#fed7aa] via-[#fbcfe8] to-[#fdba74]",
    accent: "#f97316",
  },
  {
    name: "Pastel Pink",
    gradient: "from-[#fce7f3] via-[#fbcfe8] to-[#f472b6]",
    accent: "#ec4899",
  },
  {
    name: "Lavender Purple",
    gradient: "from-[#ede9fe] via-[#ddd6fe] to-[#c084fc]",
    accent: "#a855f7",
  },
  {
    name: "Sky Cyan",
    gradient: "from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]",
    accent: "#0284c7",
  },
  {
    name: "Mint Green",
    gradient: "from-[#d1fae5] via-[#a7f3d0] to-[#6ee7b7]",
    accent: "#10b981",
  },
];

// ============================================
// Main Component
// ============================================

export const HistoryPage: React.FC = () => {
  const router = useRouter();

  // Active Category Folder (Image 2)
  const [activeCategory, setActiveCategory] = useState<CategoryType>("CHAT");

  // Selected Workspace Filter
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("all");

  // Pop Up: View Inside Workspace
  const [viewingWorkspace, setViewingWorkspace] = useState<Workspace | null>(
    null,
  );
  const [expandedWsChatId, setExpandedWsChatId] = useState<string | null>(null);

  // Pop Up: Add Chat into Workspace (Option to choose existing or create new)
  const [itemToAddToWs, setItemToAddToWs] = useState<HistoryItem | null>(null);
  const [addMode, setAddMode] = useState<"existing" | "new">("existing");

  // Create Workspace Form State
  const [isCreateWsOpen, setIsCreateWsOpen] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsTopic, setNewWsTopic] = useState("");
  const [selectedPastelIndex, setSelectedPastelIndex] = useState(0);

  // Rename Workspace State
  const [renamingWs, setRenamingWs] = useState<Workspace | null>(null);
  const [renameInput, setRenameInput] = useState("");

  // Inspector Modal for prompt/response
  const [inspectingItem, setInspectingItem] = useState<HistoryItem | null>(
    null,
  );

  // Navigate to chat or appropriate workspace tool with active payload
  const handleOpenItem = (item: HistoryItem) => {
    try {
      const chatPayload = {
        id: item.id,
        title: item.name,
        messages: [
          {
            id: Date.now() - 1000,
            role: "user",
            content: item.prompt || item.name,
          },
          {
            id: Date.now(),
            role: "ai",
            content: item.response || `Active session for ${item.name}`,
          },
        ],
      };
      sessionStorage.setItem(
        "rivinity_active_chat",
        JSON.stringify(chatPayload),
      );
      localStorage.setItem("rivinity_active_chat", JSON.stringify(chatPayload));
    } catch {}

    if (item.category === "CHAT") {
      router.push("/chat");
    } else if (item.category === "APP") {
      router.push("/app-builder");
    } else if (item.category === "AUDIO") {
      router.push("/audio-lab");
    } else if (item.category === "IMAGE") {
      router.push("/image-generation");
    } else {
      router.push("/chat");
    }
  };

  // Data persistence
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [historyItems, setHistoryItems] =
    useState<HistoryItem[]>(initialHistoryItems);
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 3-dot Action Menu State & Pinned/Selected Items
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [openMenuUpward, setOpenMenuUpward] = useState(false);
  const [pinnedItemIds, setPinnedItemIds] = useState<Set<string>>(new Set());
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
    new Set(),
  );
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [renamingItemId, setRenamingItemId] = useState<string | null>(null);
  const [renameItemTitle, setRenameItemTitle] = useState("");
  const [itemToDelete, setItemToDelete] = useState<HistoryItem | null>(null);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(
    null,
  );

  // Close 3-dot menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  // Keyboard escape handler for menu, delete popup and selection mode
  useEffect(() => {
    if (
      !activeMenuId &&
      !itemToDelete &&
      !workspaceToDelete &&
      !isSelectionMode
    )
      return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuId(null);
        setItemToDelete(null);
        setWorkspaceToDelete(null);
        if (isSelectionMode) {
          setIsSelectionMode(false);
          setSelectedItemIds(new Set());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMenuId, itemToDelete, workspaceToDelete, isSelectionMode]);

  // Restore state safely on client mount (prevent SSR hydration mismatch)
  useEffect(() => {
    try {
      const storedWs = localStorage.getItem(STORAGE_WORKSPACES_KEY);
      if (storedWs) {
        const parsed = JSON.parse(storedWs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWorkspaces(parsed);
        }
      }

      let loadedHistory = initialHistoryItems;
      const storedItems = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (storedItems) {
        const parsed = JSON.parse(storedItems);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedHistory = parsed;
          setHistoryItems(parsed);
        }
      }

      const storedPinned = localStorage.getItem(STORAGE_PINNED_KEY);
      const pinnedSet = new Set<string>();
      if (storedPinned) {
        try {
          const parsedPinned = JSON.parse(storedPinned);
          if (Array.isArray(parsedPinned)) {
            parsedPinned.forEach((id: string) => pinnedSet.add(id));
          }
        } catch {}
      }
      loadedHistory.forEach((item) => {
        if (item.isPinned) {
          pinnedSet.add(item.id);
        }
      });
      setPinnedItemIds(pinnedSet);
    } catch {}
    setIsHydrated(true);

    const handleHistoryUpdated = () => {
      try {
        const storedItems = localStorage.getItem(STORAGE_HISTORY_KEY);
        if (storedItems) {
          const parsed = JSON.parse(storedItems);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHistoryItems(parsed);
          }
        }
      } catch {}
    };

    window.addEventListener("history-updated", handleHistoryUpdated);
    return () => {
      window.removeEventListener("history-updated", handleHistoryUpdated);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_WORKSPACES_KEY, JSON.stringify(workspaces));
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(historyItems));
      localStorage.setItem(
        STORAGE_PINNED_KEY,
        JSON.stringify(Array.from(pinnedItemIds)),
      );
    } catch {}
  }, [workspaces, historyItems, pinnedItemIds, isHydrated]);

  // Create Workspace Submission (standalone)
  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) {
      toast.error("Please enter a workspace or project name");
      return;
    }

    const palette = pastelPalettes[selectedPastelIndex];
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name: newWsName.trim(),
      topic:
        newWsTopic.trim() || "Dedicated project space for related AI chats",
      description:
        newWsTopic.trim() || "Dedicated project space for related AI chats",
      iconName: "Briefcase",
      bannerGradient: palette.gradient,
      accentColor: palette.accent,
      updatedAtStr: "Just now",
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setWorkspaces((prev) => [newWs, ...prev]);
    setIsCreateWsOpen(false);
    setNewWsName("");
    setNewWsTopic("");
    toast.success(`Workspace "${newWs.name}" created!`);
  };

  // Add Chat to existing workspace
  const handleAddChatToExistingWs = (
    chatItem: HistoryItem,
    targetWsId: string,
  ) => {
    setHistoryItems((prev) =>
      prev.map((item) =>
        item.id === chatItem.id ? { ...item, workspaceId: targetWsId } : item,
      ),
    );
    const targetWs = workspaces.find((w) => w.id === targetWsId);
    toast.success(
      `Added "${chatItem.name}" to "${targetWs ? targetWs.name : "Workspace"}"!`,
    );
    setItemToAddToWs(null);
  };

  // Create workspace and add chat simultaneously
  const handleCreateWsAndAddChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) {
      toast.error("Please enter a workspace name");
      return;
    }
    if (!itemToAddToWs) return;

    const palette = pastelPalettes[selectedPastelIndex];
    const newWsId = `ws-${Date.now()}`;
    const newWs: Workspace = {
      id: newWsId,
      name: newWsName.trim(),
      topic: newWsTopic.trim() || "Dedicated workspace for topic chats",
      description: newWsTopic.trim() || "Dedicated workspace for topic chats",
      iconName: "Briefcase",
      bannerGradient: palette.gradient,
      accentColor: palette.accent,
      updatedAtStr: "Just now",
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Add workspace and assign chat
    setWorkspaces((prev) => [newWs, ...prev]);
    setHistoryItems((prev) =>
      prev.map((item) =>
        item.id === itemToAddToWs.id ? { ...item, workspaceId: newWsId } : item,
      ),
    );

    toast.success(`Created "${newWs.name}" and added "${itemToAddToWs.name}"!`);
    setItemToAddToWs(null);
    setNewWsName("");
    setNewWsTopic("");
  };

  // Remove chat from workspace (reassign to default/unassigned)
  const handleRemoveChatFromWs = (chatId: string) => {
    setHistoryItems((prev) =>
      prev.map((item) =>
        item.id === chatId ? { ...item, workspaceId: "" } : item,
      ),
    );
    toast.info("Removed chat from workspace");
  };

  // Delete Workspace
  const handleDeleteWorkspace = (
    wsId: string,
    wsName: string,
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation();
    const deletedWs = workspaces.find((w) => w.id === wsId);
    const affectedChatIds = historyItems
      .filter((item) => item.workspaceId === wsId)
      .map((c) => c.id);
    setWorkspaces((prev) => prev.filter((w) => w.id !== wsId));
    setHistoryItems((prev) =>
      prev.map((item) =>
        item.workspaceId === wsId ? { ...item, workspaceId: "" } : item,
      ),
    );
    if (viewingWorkspace?.id === wsId) {
      setViewingWorkspace(null);
    }
    if (selectedWorkspaceId === wsId) {
      setSelectedWorkspaceId("all");
    }
    toast.success(`Workspace "${wsName}" deleted`, {
      action: {
        label: "Undo",
        onClick: () => {
          if (deletedWs) {
            setWorkspaces((prev) => [deletedWs, ...prev]);
            if (affectedChatIds.length > 0) {
              setHistoryItems((prev) =>
                prev.map((item) =>
                  affectedChatIds.includes(item.id)
                    ? { ...item, workspaceId: wsId }
                    : item,
                ),
              );
            }
          }
        },
      },
    });
  };

  // Save Renamed Workspace
  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingWs || !renameInput.trim()) return;
    const newName = renameInput.trim();
    setWorkspaces((prev) =>
      prev.map((w) => (w.id === renamingWs.id ? { ...w, name: newName } : w)),
    );
    if (viewingWorkspace?.id === renamingWs.id) {
      setViewingWorkspace((prev) => (prev ? { ...prev, name: newName } : null));
    }
    toast.success(`Workspace renamed to "${newName}"`);
    setRenamingWs(null);
    setRenameInput("");
  };

  // Filter items by active Category, Workspace, and Search
  const filteredItems = useMemo(() => {
    let list = historyItems.filter((item) => item.category === activeCategory);

    if (selectedWorkspaceId !== "all") {
      list = list.filter((item) => item.workspaceId === selectedWorkspaceId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.prompt.toLowerCase().includes(q),
      );
    }

    // Sort pinned items to the top
    return [...list].sort((a, b) => {
      const aPinned =
        pinnedItemIds.has(a.id) ||
        pinnedItemIds.has(a.name) ||
        !!a.isPinned;
      const bPinned =
        pinnedItemIds.has(b.id) ||
        pinnedItemIds.has(b.name) ||
        !!b.isPinned;
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });
  }, [
    historyItems,
    activeCategory,
    selectedWorkspaceId,
    searchQuery,
    pinnedItemIds,
  ]);

  // Open selection mode
  const handleStartSelection = () => {
    setIsSelectionMode(true);
  };

  // Exit selection mode
  const handleExitSelection = () => {
    setIsSelectionMode(false);
    setSelectedItemIds(new Set());
  };

  // Toggle selection for all visible items
  const handleToggleSelectAll = () => {
    setIsSelectionMode(true);
    if (
      selectedItemIds.size === filteredItems.length &&
      filteredItems.length > 0
    ) {
      setSelectedItemIds(new Set());
      toast.info("Deselected all");
    } else {
      if (filteredItems.length === 0) {
        toast.info("No items to select");
        return;
      }
      setSelectedItemIds(new Set(filteredItems.map((i) => i.id)));
      toast.success(`Selected all ${filteredItems.length} items`);
    }
  };

  // Toggle single item selection
  const handleToggleItem = (id: string) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Batch delete selected items
  const handleDeleteSelected = () => {
    if (selectedItemIds.size === 0) return;
    const count = selectedItemIds.size;
    setHistoryItems((prev) => prev.filter((i) => !selectedItemIds.has(i.id)));
    setSelectedItemIds(new Set());
    setIsSelectionMode(false);
    toast.success(`Deleted ${count} item${count > 1 ? "s" : ""}`);
  };

  // Launch fresh session based on active category
  const handleCreateNew = () => {
    try {
      sessionStorage.removeItem("rivinity_active_chat");
      localStorage.removeItem("rivinity_active_chat");
    } catch {}

    if (activeCategory === "CHAT") {
      router.push("/chat");
      toast.success("Starting new chat");
    } else if (activeCategory === "APP") {
      router.push("/app-builder");
    } else if (activeCategory === "AUDIO") {
      router.push("/audio-lab");
    } else if (activeCategory === "IMAGE") {
      router.push("/image-generation");
    } else {
      router.push("/chat");
    }
  };

  // Count items per folder category
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      CHAT: 0,
      APP: 0,
      AUDIO: 0,
      IMAGE: 0,
      VIDEO: 0,
      DOC: 0,
    };

    historyItems.forEach((item) => {
      if (
        selectedWorkspaceId === "all" ||
        item.workspaceId === selectedWorkspaceId
      ) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });

    return counts;
  }, [historyItems, selectedWorkspaceId]);

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden bg-[#FAF9F7] dark:bg-[#09090B] text-slate-800 dark:text-zinc-100 font-sans selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
        <main className="flex-1 h-full min-w-0 overflow-y-auto [scrollbar-width:thin] [-ms-overflow-style:none]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-7">

            {/* =========================================================================
                SECTION 2: WORKSPACES (IMAGE 2 STYLE WITH PASTEL COLORS & POP UP)
                - Top banner with pastel sunset/scenic gradient (orange, pink, purple)
                - Floating white ⋮ circle button
                - Smooth white curved card cutting into the banner
                - Subtitle: "1 day ago • Active"
                - Title: Monospace font (e.g. "Email Responder")
                - Clicking card opens Pop Up to see inside workspace!
               ========================================================================= */}
            <div className="space-y-3.5">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Workspaces
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateWsOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Workspace</span>
                  </button>
                </div>
              </div>

              {/* Workspace Cards Grid (Image 2 Style with Pastel Colors) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
                {/* Workspace Cards (Image 2 layout: Top banner + floating ⋮ button + curved white card + monospace title) */}
                {workspaces.map((ws) => {
                  const wsChats = historyItems.filter(
                    (i) => i.workspaceId === ws.id,
                  );
                  const count = wsChats.length;

                  return (
                    <div
                      key={ws.id}
                      onClick={() => setViewingWorkspace(ws)}
                      className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 transition-all cursor-pointer shadow-xs hover:shadow-lg overflow-hidden flex flex-col group relative bg-white dark:bg-zinc-900"
                    >
                      {/* Top Pastel Scenic Gradient Banner */}
                      <div
                        className={`h-16 w-full bg-gradient-to-r ${ws.bannerGradient} relative`}
                      />

                      {/* Overlapping Curved White Card Container cutting into the banner */}
                      <div className="-mt-4 mx-0 rounded-t-2xl bg-white dark:bg-zinc-900 pt-3 px-3.5 pb-3 flex-1 flex flex-col justify-between z-10 border-t border-slate-100/60 dark:border-zinc-800">
                        <div>
                          {/* Title Row with Rename & Delete Actions */}
                          <div className="flex items-center justify-between gap-2.5">
                            <div
                              className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate group-hover:text-[#FF6B00] transition-colors flex-1"
                              title={ws.name}
                            >
                              {ws.name}
                            </div>

                            {/* Quick Actions: Rename & Delete */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                title="Rename workspace"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRenamingWs(ws);
                                  setRenameInput(ws.name);
                                }}
                                style={{ background: "transparent" }}
                                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                title="Delete workspace"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setWorkspaceToDelete(ws);
                                }}
                                style={{ background: "transparent" }}
                                className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Workspace Description (div only) */}
                          <div className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                            {ws.description || ws.topic || "Workspace for organizing related chats and generations."}
                          </div>
                        </div>

                        {/* Footer row with count and quick popup link */}
                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold">
                            {count} {count === 1 ? "chat" : "chats"}
                          </span>
                          <span className="text-[#FF6B00] font-semibold group-hover:underline">
                            View inside →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                SECTION 3: IMAGE 2 - 3D FOLDER TABS & ACTIVE CATEGORY TABLE
                With option to add chat into existing or new workspace!
               ========================================================================= */}
            <div className="space-y-4">
              {/* Single Heading (no subheading/paragraph) */}
              <h2 className="text-lg sm:text-xl mt-15 font-bold tracking-tight text-slate-900 dark:text-white">
                Continue working
              </h2>

              {/* Row of Interactive Category Folders (Dashboard Colors & Click Animations) */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4.5 pt-4 pb-1">
                {folderConfigs.map((folder) => {
                  const Icon = folder.icon;
                  const isActive = activeCategory === folder.key;
                  const count = categoryCounts[folder.key] || 0;

                  return (
                    <motion.div
                      key={folder.key}
                      whileHover={{
                        y: -3,
                        scale: 1.02,
                        transition: {
                          type: "spring",
                          damping: 25,
                          stiffness: 350,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveCategory(folder.key)}
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
                          y: isActive ? -24 : 0,
                          opacity: isActive ? 1 : 0.85,
                          scale: isActive ? 1.02 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 24,
                        }}
                        className="absolute top-[4px] sm:top-[6px] inset-x-2.5 sm:inset-x-3 h-14 bg-white rounded-t-md sm:rounded-t-lg shadow-[0_-4px_14px_rgba(0,0,0,0.08)] z-[2] border border-slate-200/90 p-1.5 flex flex-col justify-start pointer-events-none overflow-hidden"
                      >
                        <div className="w-8 sm:w-10 h-0.5 rounded-full bg-slate-300 mx-auto mt-0.5" />
                        <div className="w-5 sm:w-7 h-0.5 rounded-full bg-slate-200 mx-auto mt-1" />
                        {isActive && (
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
                          isActive
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
                              {folder.label}
                            </span>
                          </div>
                          <span className="text-[9px] sm:text-[9.5px] font-bold bg-white/20 backdrop-blur-sm px-1.5 py-0.2 rounded-full border border-white/30 text-white shrink-0">
                            {count}
                          </span>
                        </div>

                        {/* Footer in Pocket */}
                        <div className="relative z-10 pt-1 flex items-center justify-between">
                          <span className="text-[9px] sm:text-[10px] font-medium text-white/90">
                            {isActive ? "Active Folder" : "Click to View"}
                          </span>
                          <ChevronDown
                            className={`w-3 h-3 text-white/90 transition-transform duration-300 ${
                              isActive ? "rotate-180 text-white" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Active Category Content Table Card (Image 2 Layout) */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 shadow-xs relative">
                {/* Table Header: "Active Category: [CHAT]" & Selection / Search controls (matching image) */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800/80 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                      Active Category:
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-bold text-white tracking-wider shadow-xs ${categoryStyles[activeCategory]?.badgeBg || "bg-slate-900"}`}
                    >
                      {activeCategory}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    {/* Search input (always on the left) */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${activeCategory.toLowerCase()}s...`}
                        className="h-8 pl-8 pr-3 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>

                    {isSelectionMode || selectedItemIds.size > 0 ? (
                      /* Selection Mode Active: "0 selected", [Select all], (Delete), Close ✕ (New is hidden!) */
                      <div className="flex items-center gap-2 sm:gap-2.5 animate-in fade-in duration-150">
                        <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                          {selectedItemIds.size} selected
                        </span>

                        <button
                          type="button"
                          onClick={handleToggleSelectAll}
                          className="h-8 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 text-xs sm:text-[13px] font-semibold border border-slate-200/80 dark:border-zinc-700 shadow-2xs transition-colors cursor-pointer"
                        >
                          {selectedItemIds.size === filteredItems.length &&
                          filteredItems.length > 0
                            ? "Deselect all"
                            : "Select all"}
                        </button>

                        {selectedItemIds.size > 0 && (
                          <button
                            type="button"
                            onClick={handleDeleteSelected}
                            className="h-8 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-400 text-xs font-semibold border border-red-200 dark:border-red-900/60 shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete ({selectedItemIds.size})</span>
                          </button>
                        )}

                        <button
                          type="button"
                          title="Exit selection mode"
                          onClick={handleExitSelection}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100/80 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ) : (
                      /* Normal Mode: [Select] button + [New] button */
                      <>
                        <button
                          type="button"
                          onClick={() => setIsSelectionMode(true)}
                          className="h-8 px-4 rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 text-xs sm:text-[13px] font-semibold border border-slate-200/80 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          Select
                        </button>

                        <button
                          type="button"
                          onClick={handleCreateNew}
                          className="h-8 px-4.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-slate-900 text-xs sm:text-[13px] font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
                        >
                          New
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Table Content Rows */}
                <div className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                  {filteredItems.length === 0 ? (
                    <div className="py-14 text-center space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-slate-400">
                        <Folder className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                        No files in {activeCategory} folder
                      </p>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        {selectedWorkspaceId !== "all"
                          ? "This workspace does not have any items in this category yet."
                          : "Start a new session or create content with our AI tools."}
                      </p>
                    </div>
                  ) : (
                    filteredItems.map((item, itemIdx) => {
                      const itemWs = workspaces.find(
                        (w) => w.id === item.workspaceId,
                      );
                      const isSelected = selectedItemIds.has(item.id);
                      const isPinned =
                        pinnedItemIds.has(item.id) ||
                        pinnedItemIds.has(item.name) ||
                        !!item.isPinned;

                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-[1fr_130px_48px] items-center px-5 py-3.5 transition-colors group cursor-pointer relative hover:bg-slate-50/80 dark:hover:bg-zinc-800/40"
                          onClick={() => {
                            if (isSelectionMode || selectedItemIds.size > 0) {
                              handleToggleItem(item.id);
                            } else {
                              handleOpenItem(item);
                            }
                          }}
                        >
                          {/* Column 1: Checkbox (visible in selection mode) + NAME */}
                          <div className="flex items-center gap-3.5 min-w-0 pr-4">
                            {(isSelectionMode || selectedItemIds.size > 0) && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleItem(item.id);
                                }}
                                className="w-[19px] h-[19px] min-w-[19px] min-h-[19px] rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 bg-white dark:bg-zinc-800 hover:border-slate-500"
                                style={{
                                  border: "1.5px solid #94a3b8",
                                }}
                                aria-label={`Select ${item.name}`}
                              >
                                {isSelected && (
                                  <Check
                                    className="stroke-[3] text-slate-900 dark:text-zinc-100 shrink-0"
                                    style={{
                                      width: 13,
                                      height: 13,
                                      minWidth: 13,
                                      minHeight: 13,
                                    }}
                                  />
                                )}
                              </button>
                            )}

                            <div className="min-w-0 flex-1">
                              {renamingItemId === item.id ? (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (renameItemTitle.trim()) {
                                      setHistoryItems((prev) =>
                                        prev.map((i) =>
                                          i.id === item.id
                                            ? {
                                                ...i,
                                                name: renameItemTitle.trim(),
                                              }
                                            : i,
                                        ),
                                      );
                                      toast.success("Renamed successfully");
                                    }
                                    setRenamingItemId(null);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5"
                                >
                                  <input
                                    type="text"
                                    autoFocus
                                    value={renameItemTitle}
                                    onChange={(e) =>
                                      setRenameItemTitle(e.target.value)
                                    }
                                    className="px-2 py-0.5 text-xs sm:text-[13px] font-bold rounded-md bg-white dark:bg-zinc-800 border border-[#FF6B00] text-slate-900 dark:text-white focus:outline-none"
                                  />
                                  <button
                                    type="submit"
                                    className="px-2 py-0.5 text-[11px] font-bold bg-[#FF6B00] text-white rounded-md hover:bg-[#e05f00]"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setRenamingItemId(null)}
                                    className="px-1.5 py-0.5 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                                  >
                                    Cancel
                                  </button>
                                </form>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white truncate">
                                    {item.name}
                                  </span>
                                  {isPinned && (
                                    <span
                                      title="Pinned to top"
                                      className="inline-flex items-center ml-0.5"
                                    >
                                      <Pin className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00] rotate-45 shrink-0" />
                                    </span>
                                  )}
                                  {itemWs && (
                                    <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[9px] rounded-md bg-orange-50 dark:bg-orange-950/40 font-semibold text-[#FF6B00] border border-orange-200/50">
                                      {itemWs.name}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Column 2: MODIFIED */}
                          <div className="text-xs text-slate-500 dark:text-zinc-400 pl-2">
                            {item.modified}
                          </div>

                          {/* Column 3: 3-DOTS ACTION MENU */}
                          <div className="flex items-center justify-end pr-1 relative">
                            <button
                              type="button"
                              title="More options"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (activeMenuId === item.id) {
                                  setActiveMenuId(null);
                                } else {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const spaceBelow = window.innerHeight - rect.bottom;
                                  const shouldOpenUp = spaceBelow < 220 || itemIdx >= filteredItems.length - 2;
                                  setOpenMenuUpward(shouldOpenUp);
                                  setActiveMenuId(item.id);
                                }
                              }}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${
                                activeMenuId === item.id
                                  ? "bg-slate-200 dark:bg-zinc-700 text-slate-900 dark:text-white"
                                  : ""
                              }`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Contextual Popup Menu (Image 2 Style) */}
                            <AnimatePresence>
                              {activeMenuId === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: openMenuUpward ? 4 : -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: openMenuUpward ? 4 : -4 }}
                                  transition={{
                                    duration: 0.15,
                                    ease: "easeOut",
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className={`absolute right-0 ${
                                    openMenuUpward
                                      ? "bottom-full mb-1.5 origin-bottom-right"
                                      : "top-full mt-1.5 origin-top-right"
                                  } w-48 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 rounded-2xl p-1.5 shadow-xl shadow-slate-200/80 dark:shadow-black/70 border border-slate-200/90 dark:border-zinc-800 z-50 select-none text-left`}
                                >
                                  {/* 1. Pin */}
                                  <div
                                    onClick={() => {
                                      const nowPinned = !isPinned;
                                      setPinnedItemIds((prev) => {
                                        const next = new Set(prev);
                                        if (nowPinned) {
                                          next.add(item.id);
                                          toast.success(
                                            `Pinned "${item.name}" to top`,
                                          );
                                        } else {
                                          next.delete(item.id);
                                          next.delete(item.name);
                                          toast.info(`Unpinned "${item.name}"`);
                                        }
                                        return next;
                                      });
                                      setHistoryItems((prev) =>
                                        prev.map((i) =>
                                          i.id === item.id
                                            ? { ...i, isPinned: nowPinned }
                                            : i,
                                        ),
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100/80 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
                                  >
                                    <Pin
                                      className={`w-4 h-4 stroke-[2] ${isPinned ? "text-[#FF6B00] fill-[#FF6B00]" : "text-slate-500 dark:text-zinc-400"}`}
                                    />
                                    <span>{isPinned ? "Unpin" : "Pin"}</span>
                                  </div>

                                  {/* 2. Rename */}
                                  <div
                                    onClick={() => {
                                      setRenamingItemId(item.id);
                                      setRenameItemTitle(item.name);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100/80 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400" />
                                    <span>Rename</span>
                                  </div>

                                  {/* 3. Add to workspace */}
                                  <div
                                    onClick={() => {
                                      setItemToAddToWs(item);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100/80 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FolderArchive className="w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400" />
                                      <span>Add to workspace</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                                  </div>

                                  <div className="my-1 h-[1px] bg-slate-100 dark:bg-zinc-800" />

                                  {/* 4. Delete (Opens Confirmation Popup) */}
                                  <div
                                    onClick={() => {
                                      setItemToDelete(item);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4 stroke-[2] text-red-500 dark:text-red-400" />
                                    <span>Delete</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* =========================================================================
            POP UP 1: VIEW INSIDE WORKSPACE (REDESIGNED)
            - Clean pastel banner with workspace name
            - "Filter Page" button removed (all workspace chats seen here)
            - "Active" label removed
            - Delete button fixed and styled cleanly
            - Inspect button replaced with an expandable dropdown
            - "Done" button removed
           ========================================================================= */}
        <AnimatePresence>
          {viewingWorkspace && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Top Pastel Scenic Banner */}
                <div
                  className={`min-h-[6.5rem] bg-gradient-to-r ${viewingWorkspace.bannerGradient} p-5 flex items-start justify-between relative`}
                >
                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs px-4 py-2.5 rounded-2xl shadow-xs flex flex-col max-w-[80%]">
                    <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {viewingWorkspace.name}
                    </div>
                    {(viewingWorkspace.description || viewingWorkspace.topic) && (
                      <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        {viewingWorkspace.description || viewingWorkspace.topic}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          localStorage.setItem("rivinity_active_workspace_id", viewingWorkspace.id);
                          localStorage.setItem("rivinity_active_workspace_obj", JSON.stringify(viewingWorkspace));
                          window.dispatchEvent(new CustomEvent("workspace-selected", { detail: { workspaceId: viewingWorkspace.id } }));
                        } catch {}
                        router.push(`/chat?workspace=${viewingWorkspace.id}`);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/90 hover:bg-white text-xs font-semibold text-slate-800 dark:text-zinc-100 shadow-xs flex items-center gap-1.5 transition-all border border-black/5 hover:border-black/10 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Show in chat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setViewingWorkspace(null);
                        setExpandedWsChatId(null);
                      }}
                      className="w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer shadow-xs transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chats List Inside Workspace */}
                <div className="p-5 overflow-y-auto flex-1 space-y-3 [scrollbar-width:thin]">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-zinc-800">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Chats in this Workspace (
                      {
                        historyItems.filter(
                          (i) => i.workspaceId === viewingWorkspace.id,
                        ).length
                      }
                      )
                    </span>
                    <span className="text-[11px] text-slate-400">
                      All workspace chats
                    </span>
                  </div>

                  {historyItems.filter(
                    (i) => i.workspaceId === viewingWorkspace.id,
                  ).length === 0 ? (
                    <div className="py-12 text-center space-y-2 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-4">
                      <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        No chats added to this workspace yet
                      </div>
                      <div className="text-[11px] text-slate-400 max-w-xs mx-auto">
                        Use the "Add to WS" button in the table below to add any
                        chat into this space.
                      </div>
                    </div>
                  ) : (
                    historyItems
                      .filter((i) => i.workspaceId === viewingWorkspace.id)
                      .map((chat) => {
                        const isExpanded = expandedWsChatId === chat.id;

                        return (
                          <div
                            key={chat.id}
                            className="p-3.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 transition-all"
                          >
                            {/* Summary Row */}
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                  {chat.name}
                                </div>
                              </div>

                              {/* Action Buttons: Dropdown Details & Fixed Delete */}
                              <div className="flex items-center gap-2 shrink-0">
                                {/* Dropdown Toggle Button (replaces Inspect popup) */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedWsChatId(
                                      isExpanded ? null : chat.id,
                                    )
                                  }
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                    isExpanded
                                      ? "bg-[#FF6B00] text-white shadow-xs"
                                      : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100"
                                  }`}
                                >
                                  <span>Details</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                  />
                                </button>

                                {/* Fixed & Clean Delete Button */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveChatFromWs(chat.id)
                                  }
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/50 transition-colors cursor-pointer shrink-0"
                                  title="Remove from workspace"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Dropdown Content inside popup */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-slate-200/70 dark:border-zinc-700/70 space-y-2.5 overflow-hidden"
                                >
                                  <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-zinc-500">
                                    <span>
                                      Tokens:{" "}
                                      <strong className="text-slate-700 dark:text-zinc-300">
                                        {chat.tokens.toLocaleString()}
                                      </strong>
                                    </span>
                                    <span>
                                      Latency:{" "}
                                      <strong className="text-slate-700 dark:text-zinc-300">
                                        {chat.durationMs}ms
                                      </strong>
                                    </span>
                                    <span>
                                      Cost:{" "}
                                      <strong className="text-emerald-600 dark:text-emerald-400">
                                        {chat.cost}
                                      </strong>
                                    </span>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                      Prompt
                                    </span>
                                    <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-mono text-[11px] leading-relaxed text-slate-800 dark:text-zinc-200 max-h-28 overflow-y-auto">
                                      {chat.prompt}
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                      Response
                                    </span>
                                    <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-mono text-[11px] leading-relaxed text-slate-800 dark:text-zinc-200 max-h-28 overflow-y-auto">
                                      {chat.response}
                                    </div>
                                  </div>

                                  <div className="pt-1 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400">
                                      {chat.modified}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          chat.prompt,
                                        );
                                        toast.success(
                                          "Prompt copied to clipboard!",
                                        );
                                      }}
                                      className="inline-flex items-center gap-1 bg-transparent text-[11px] font-semibold text-[#FF6B00] hover:underline cursor-pointer"
                                    >
                                      <Copy className="w-3 h-3" />
                                      <span>Copy Prompt</span>
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            POP UP 2: ADD CHAT INTO WORKSPACE (OPTION TO CREATE OR ADD EXISTING)
            "option where user can add in workspace which option to create one
            or add in the existing one"
           ========================================================================= */}
        <AnimatePresence>
          {itemToAddToWs && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-lg sm:max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-6 sm:p-7 space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shadow-xs shrink-0">
                      <FolderPlus className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Add to Workspace
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItemToAddToWs(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mode Selector Tabs: Existing Workspace vs Create New */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-zinc-800 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAddMode("existing")}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      addMode === "existing"
                        ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    Choose Existing
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddMode("new")}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      addMode === "new"
                        ? "bg-white dark:bg-zinc-900 text-[#FF6B00] shadow-xs"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    + Create New Space
                  </button>
                </div>

                {/* Option 1: Existing Workspaces List */}
                {addMode === "existing" ? (
                  <div className="space-y-2 max-h-[260px] overflow-y-auto [scrollbar-width:thin] pr-1">
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Select a workspace to add this chat into:
                    </p>
                    {workspaces.map((ws) => {
                      const isAlreadyIn = itemToAddToWs.workspaceId === ws.id;

                      return (
                        <div
                          key={ws.id}
                          onClick={() =>
                            handleAddChatToExistingWs(itemToAddToWs, ws.id)
                          }
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer hover:scale-[1.01] ${
                            isAlreadyIn
                              ? "border-[#FF6B00] bg-orange-50/60 dark:bg-orange-950/20 font-bold text-[#FF6B00]"
                              : "border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Pastel Dot indicator */}
                            <div
                              className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${ws.bannerGradient} shrink-0 ring-1 ring-black/10`}
                            />
                            <div className="min-w-0">
                              <div className="font-bold truncate">
                                {ws.name}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {ws.topic}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isAlreadyIn ? (
                              <span className="text-[10px] font-bold text-[#FF6B00] bg-orange-100 dark:bg-orange-950 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#FF6B00] font-semibold">
                                Add +
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Option 2: Create New Workspace & Add Chat */
                  <form
                    onSubmit={handleCreateWsAndAddChat}
                    className="space-y-3.5"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        Workspace Name
                      </div>
                      <input
                        type="text"
                        required
                        value={newWsName}
                        onChange={(e) => setNewWsName(e.target.value)}
                        placeholder="e.g. Email Responder, Q3 Marketing"
                        className="w-full h-9 px-3 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        Workspace Description
                      </div>
                      <input
                        type="text"
                        value={newWsTopic}
                        onChange={(e) => setNewWsTopic(e.target.value)}
                        placeholder="e.g. Automated customer support and follow-ups"
                        className="w-full h-9 px-3 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>

                    {/* Pastel Colors (Image 2 Style) */}
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        Choose Pastel Theme (Orange, Pink, Purple...)
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {pastelPalettes.map((palette, idx) => {
                          const isSelected = selectedPastelIndex === idx;
                          return (
                            <button
                              key={palette.name}
                              type="button"
                              onClick={() => setSelectedPastelIndex(idx)}
                              className={`h-9 rounded-xl bg-gradient-to-r ${palette.gradient} border transition-all cursor-pointer flex items-center justify-center ${
                                isSelected
                                  ? "ring-2 ring-[#FF6B00] scale-105"
                                  : "border-slate-200 opacity-80 hover:opacity-100"
                              }`}
                              title={palette.name}
                            >
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-slate-800" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setItemToAddToWs(null)}
                        style={{ background: "transparent" }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white text-xs font-bold cursor-pointer shadow-xs active:scale-95 transition-all"
                      >
                        Create & Add Chat
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            MODAL: CREATE WORKSPACE (STANDALONE)
           ========================================================================= */}
        <AnimatePresence>
          {isCreateWsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center">
                      <FolderPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900 dark:text-white">
                        Create New Workspace
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCreateWorkspace} className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Workspace Name
                    </div>
                    <input
                      type="text"
                      required
                      value={newWsName}
                      onChange={(e) => setNewWsName(e.target.value)}
                      placeholder="e.g. Email Responder, Brand Strategy"
                      className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Workspace Description
                    </div>
                    <input
                      type="text"
                      value={newWsTopic}
                      onChange={(e) => setNewWsTopic(e.target.value)}
                      placeholder="e.g. Dedicated space for automated emails and replies"
                      className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>

                  {/* Pastel Color Selector */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Pastel Theme (Orange, Pink, Purple...)
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {pastelPalettes.map((palette, idx) => {
                        const isSelected = selectedPastelIndex === idx;
                        return (
                          <button
                            key={palette.name}
                            type="button"
                            onClick={() => setSelectedPastelIndex(idx)}
                            className={`h-10 rounded-xl bg-gradient-to-r ${palette.gradient} border transition-all cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? "ring-2 ring-[#FF6B00] scale-105"
                                : "border-slate-200 opacity-80 hover:opacity-100"
                            }`}
                            title={palette.name}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-slate-800" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setIsCreateWsOpen(false)}
                      style={{ background: "transparent" }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white text-xs font-bold cursor-pointer shadow-xs active:scale-95 transition-all"
                    >
                      Create Workspace
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            MODAL: RENAME WORKSPACE
           ========================================================================= */}
        <AnimatePresence>
          {renamingWs && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-[#FF6B00] flex items-center justify-center">
                      <Pencil className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Rename Workspace
                      </h3>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveRename} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      placeholder="e.g. Email Responder"
                      className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingWs(null);
                        setRenameInput("");
                      }}
                      style={{ background: "transparent" }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!renameInput.trim()}
                      className="px-4 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white text-xs font-bold cursor-pointer shadow-xs disabled:opacity-50 active:scale-95 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            MODAL: INSPECT CHAT / FILE PAYLOAD
           ========================================================================= */}
        <AnimatePresence>
          {inspectingItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl ${(categoryStyles[inspectingItem.category] || categoryStyles.CHAT).badgeBg} text-white flex items-center justify-center shadow-xs`}
                    >
                      {React.createElement(
                        (
                          categoryStyles[inspectingItem.category] ||
                          categoryStyles.CHAT
                        ).icon,
                        { className: "w-4 h-4" },
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {inspectingItem.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {inspectingItem.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectingItem(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 text-xs [scrollbar-width:thin]">
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-slate-400">Total Tokens</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {inspectingItem.tokens.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-slate-400">Execution Latency</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {inspectingItem.durationMs}ms
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-slate-400">Estimated Cost</span>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {inspectingItem.cost}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-semibold text-slate-700 dark:text-zinc-300">
                      Prompt
                    </span>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 font-mono text-[11px] leading-relaxed text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700">
                      {inspectingItem.prompt}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-semibold text-slate-700 dark:text-zinc-300">
                      Response
                    </span>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 font-mono text-[11px] leading-relaxed text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700">
                      {inspectingItem.response}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(inspectingItem, null, 2),
                      );
                      toast.success("Payload copied to clipboard!");
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectingItem(null)}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            MODAL: DELETE CONFIRMATION POPUP (Matching Screenshot, Light Theme, Divs Only)
           ========================================================================= */}
        <AnimatePresence>
          {itemToDelete && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setItemToDelete(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl p-6"
              >
                <div className="text-base font-semibold text-slate-900 dark:text-white">
                  Delete chat?
                </div>

                <div className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
                  Are you sure you want to delete this chat?
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setItemToDelete(null)}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHistoryItems((prev) =>
                        prev.filter((i) => i.id !== itemToDelete.id),
                      );
                      toast.success(`Deleted "${itemToDelete.name}"`);
                      setItemToDelete(null);
                    }}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-xs border border-red-500/40 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            MODAL: DELETE WORKSPACE CONFIRMATION POPUP (Matching Chat Delete Popup)
           ========================================================================= */}
        <AnimatePresence>
          {workspaceToDelete && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setWorkspaceToDelete(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl p-6"
              >
                <div className="text-base font-semibold text-slate-900 dark:text-white">
                  Delete workspace?
                </div>

                <div className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
                  Are you sure you want to delete this workspace?
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setWorkspaceToDelete(null)}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (workspaceToDelete) {
                        handleDeleteWorkspace(
                          workspaceToDelete.id,
                          workspaceToDelete.name,
                        );
                        setWorkspaceToDelete(null);
                      }
                    }}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-xs border border-red-500/40 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SidebarShell>
  );
};

export default HistoryPage;
