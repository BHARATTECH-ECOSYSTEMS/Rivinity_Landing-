import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SidebarShell from "@/components/canvas/SidebarShell";
import ChatMarkdown from "@/components/canvas/ChatMarkdown";
import {
  Search,
  Sparkles,
  Check,
  Plus,
  Minus,
  X,
  BookOpen,
  Copy,
  CheckCheck,
  ChevronDown,
  Download,
  PenTool,
  Code2,
  Compass,
  Database,
  Palette,
  Cpu,
  Megaphone,
  Coins,
  Headphones,
  Scale,
} from "lucide-react";
import {
  SKILLS,
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
} from "@/lib/skillsCatalog";
import { useInstalledSkills } from "@/components/skills/SkillsHook";
import { useToast } from "@/hooks/use-toast";

type Filter = "All" | SkillCategory | "Installed";

const CATEGORY_ICONS: Record<
  SkillCategory,
  React.ComponentType<{ className?: string }>
> = {
  Writing: PenTool,
  Code: Code2,
  Research: Compass,
  Data: Database,
  Design: Palette,
  Ops: Cpu,
  Marketing: Megaphone,
  Finance: Coins,
  Support: Headphones,
  Legal: Scale,
};

interface CategoryTheme {
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textMuted: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  filterActiveBg: string;
  pixelPalette: string[];
}

// 10 Pastel Color sets derived from Dashboard Creative Tools (Image 2)
const CATEGORY_THEMES: Record<SkillCategory, CategoryTheme> = {
  // Edit Studio: Soft Peach / Warm Apricot
  Writing: {
    cardBg: "bg-[#FFF1E6] dark:bg-[#1D1512]",
    cardBorder: "border-[#FEDCC8] dark:border-orange-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#FFC7A8] dark:border-orange-500/35",
    iconColor: "text-[#C2410C] dark:text-orange-400",
    badgeBg: "bg-[#FFE4D5] dark:bg-orange-500/20",
    badgeText: "text-[#C2410C] dark:text-orange-300",
    filterActiveBg: "bg-[#FFE4D5] text-[#C2410C] border-[#FFC7A8]",
    pixelPalette: [
      "#FFFFFF",
      "#FFF4EC",
      "#FFE8D9",
      "#FED3B8",
      "#FDBA74",
      "#FB923C",
      "#EA580C",
      "#C2410C",
    ],
  },

  // Audio Lab: Soft Lavender / Lilac
  Code: {
    cardBg: "bg-[#F1EDFE] dark:bg-[#161322]",
    cardBorder: "border-[#DDD3FC] dark:border-purple-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#CEC0FA] dark:border-purple-500/35",
    iconColor: "text-[#6D28D9] dark:text-purple-400",
    badgeBg: "bg-[#E6DDFF] dark:bg-purple-500/20",
    badgeText: "text-[#6D28D9] dark:text-purple-300",
    filterActiveBg: "bg-[#E6DDFF] text-[#6D28D9] border-[#CEC0FA]",
    pixelPalette: [
      "#FFFFFF",
      "#F6F2FF",
      "#EDE5FE",
      "#DDD0FD",
      "#C4B5FD",
      "#A78BFA",
      "#8B5CF6",
      "#6D28D9",
    ],
  },

  // Deep Search: Soft Sky Blue / Powder Blue
  Research: {
    cardBg: "bg-[#EAF3FE] dark:bg-[#101724]",
    cardBorder: "border-[#CDE3FD] dark:border-sky-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#BBD8FC] dark:border-sky-500/35",
    iconColor: "text-[#0369A1] dark:text-sky-400",
    badgeBg: "bg-[#D8EAFF] dark:bg-sky-500/20",
    badgeText: "text-[#0369A1] dark:text-sky-300",
    filterActiveBg: "bg-[#D8EAFF] text-[#0369A1] border-[#BBD8FC]",
    pixelPalette: [
      "#FFFFFF",
      "#F0F8FF",
      "#E0F2FE",
      "#BAE6FD",
      "#7DD3FC",
      "#38BDF8",
      "#0284C7",
      "#0369A1",
    ],
  },

  // Doc Synthesizer: Soft Mint / Sage Green
  Data: {
    cardBg: "bg-[#E6F8F0] dark:bg-[#0E1C15]",
    cardBorder: "border-[#C4F1DC] dark:border-emerald-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#B2ECCF] dark:border-emerald-500/35",
    iconColor: "text-[#15803D] dark:text-emerald-400",
    badgeBg: "bg-[#D1F6E5] dark:bg-emerald-500/20",
    badgeText: "text-[#15803D] dark:text-emerald-300",
    filterActiveBg: "bg-[#D1F6E5] text-[#15803D] border-[#B2ECCF]",
    pixelPalette: [
      "#FFFFFF",
      "#F0FDF5",
      "#DCFCE7",
      "#BBF7D0",
      "#86EFAC",
      "#4ADE80",
      "#16A34A",
      "#14532D",
    ],
  },

  // Image Enhancer: Soft Blossom Pink (Image 3 design source)
  Design: {
    cardBg: "bg-[#FDEBF3] dark:bg-[#201219]",
    cardBorder: "border-[#FBCFE4] dark:border-pink-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#F8BBD8] dark:border-pink-500/35",
    iconColor: "text-[#BE185D] dark:text-pink-400",
    badgeBg: "bg-[#FBD9E9] dark:bg-pink-500/20",
    badgeText: "text-[#BE185D] dark:text-pink-300",
    filterActiveBg: "bg-[#FBD9E9] text-[#BE185D] border-[#F8BBD8]",
    pixelPalette: [
      "#FFFFFF",
      "#FFF0F6",
      "#FDE2EF",
      "#FBCFE8",
      "#F9A8D4",
      "#F472B6",
      "#DB2777",
      "#9D174D",
    ],
  },

  // App Builder: Soft Butter Yellow / Warm Sand
  Ops: {
    cardBg: "bg-[#FFF9E5] dark:bg-[#1D1910]",
    cardBorder: "border-[#FEEBAE] dark:border-amber-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#FDE496] dark:border-amber-500/35",
    iconColor: "text-[#B45309] dark:text-amber-400",
    badgeBg: "bg-[#FEF1C5] dark:bg-amber-500/20",
    badgeText: "text-[#B45309] dark:text-amber-300",
    filterActiveBg: "bg-[#FEF1C5] text-[#B45309] border-[#FDE496]",
    pixelPalette: [
      "#FFFFFF",
      "#FFFDF0",
      "#FEF8D4",
      "#FEECA8",
      "#FDE047",
      "#FACC15",
      "#D97706",
      "#92400E",
    ],
  },

  // Marketplace: Soft Rose / Coral Pink
  Marketing: {
    cardBg: "bg-[#FDEBF0] dark:bg-[#1E1117]",
    cardBorder: "border-[#FBCFD9] dark:border-rose-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#F9BDCD] dark:border-rose-500/35",
    iconColor: "text-[#BE123C] dark:text-rose-400",
    badgeBg: "bg-[#FBD8E2] dark:bg-rose-500/20",
    badgeText: "text-[#BE123C] dark:text-rose-300",
    filterActiveBg: "bg-[#FBD8E2] text-[#BE123C] border-[#F9BDCD]",
    pixelPalette: [
      "#FFFFFF",
      "#FFF1F4",
      "#FFE4E8",
      "#FECDD3",
      "#FDA4AF",
      "#FB7185",
      "#E11D48",
      "#9F1239",
    ],
  },

  // Knowledge Base: Soft Seafoam Teal / Aqua
  Finance: {
    cardBg: "bg-[#E3FAF5] dark:bg-[#0D1C1A]",
    cardBorder: "border-[#BDF4E7] dark:border-teal-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#A9EFE0] dark:border-teal-500/35",
    iconColor: "text-[#0F766E] dark:text-teal-400",
    badgeBg: "bg-[#CFF6ED] dark:bg-teal-500/20",
    badgeText: "text-[#0F766E] dark:text-teal-300",
    filterActiveBg: "bg-[#CFF6ED] text-[#0F766E] border-[#A9EFE0]",
    pixelPalette: [
      "#FFFFFF",
      "#F0FDFA",
      "#CCFBF1",
      "#99F6E4",
      "#5EEAD4",
      "#2DD4BF",
      "#0D9488",
      "#115E59",
    ],
  },

  // RivinityLM: Warm Peach Cream / Champagne
  Support: {
    cardBg: "bg-[#FFF2E8] dark:bg-[#1D1410]",
    cardBorder: "border-[#FED9C0] dark:border-orange-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#FFCEB0] dark:border-orange-500/35",
    iconColor: "text-[#C2410C] dark:text-orange-400",
    badgeBg: "bg-[#FFE4D2] dark:bg-orange-500/20",
    badgeText: "text-[#C2410C] dark:text-orange-300",
    filterActiveBg: "bg-[#FFE4D2] text-[#C2410C] border-[#FFCEB0]",
    pixelPalette: [
      "#FFFFFF",
      "#FFF7ED",
      "#FFEDD5",
      "#FED7AA",
      "#FDBA74",
      "#FB923C",
      "#EA580C",
      "#9A3412",
    ],
  },

  // Analytics: Soft Slate / Periwinkle Indigo
  Legal: {
    cardBg: "bg-[#EDF0FE] dark:bg-[#121526]",
    cardBorder: "border-[#D0D7FD] dark:border-indigo-500/25",
    textPrimary: "text-slate-900 dark:text-white",
    textMuted: "text-slate-700/85 dark:text-zinc-300",
    iconBg: "bg-white/90 dark:bg-zinc-800/90",
    iconBorder: "border-[#C5D0FC] dark:border-indigo-500/35",
    iconColor: "text-[#4338CA] dark:text-indigo-400",
    badgeBg: "bg-[#DDE3FD] dark:bg-indigo-500/20",
    badgeText: "text-[#4338CA] dark:text-indigo-300",
    filterActiveBg: "bg-[#DDE3FD] text-[#4338CA] border-[#C5D0FC]",
    pixelPalette: [
      "#FFFFFF",
      "#EEF2FF",
      "#E0E7FF",
      "#C7D2FE",
      "#A5B4FC",
      "#818CF8",
      "#4F46E5",
      "#312E81",
    ],
  },
};

/**
 * Image 3 Pixel Mosaic Generator
 * Renders a crisp pixelated gradient mosaic with a seeded palette independent of category.
 */
const PixelMosaic = ({
  seed,
}: {
  seed: string;
}) => {
  const paletteOptions = Object.values(CATEGORY_THEMES).map((theme) => theme.pixelPalette);
  let seedHash = 0;
  for (let i = 0; i < seed.length; i++) {
    seedHash = (seedHash << 5) - seedHash + seed.charCodeAt(i);
    seedHash |= 0;
  }
  const seedNum = Math.abs(seedHash);
  const palette = paletteOptions[seedNum % paletteOptions.length];

  const pixels = useMemo(() => {
    const cols = 12;
    const rows = 6;
    // Focal center offset (slightly to left and up, matching Image 3)
    const centerX = 4.5 + ((seedNum % 7) - 3) * 0.22;
    const centerY = 2.6 + (((seedNum >> 3) % 5) - 2) * 0.18;

    const items: { x: number; y: number; color: string }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = (c - centerX) * 0.96;
        const dy = (r - centerY) * 1.25;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Deterministic noise for generative mosaic look
        const cellNoise =
          Math.sin(c * 12.9898 + r * 78.233 + (seedNum % 100)) * 43758.5453;
        const jitter = (cellNoise - Math.floor(cellNoise) - 0.5) * 0.82;

        const effectiveDist = Math.max(0, dist + jitter);

        let colorIndex = 0;
        if (effectiveDist < 1.1) colorIndex = 0; // Pure white luminous center
        else if (effectiveDist < 1.8) colorIndex = 1;
        else if (effectiveDist < 2.7) colorIndex = 2;
        else if (effectiveDist < 3.7) colorIndex = 3;
        else if (effectiveDist < 4.8) colorIndex = 4;
        else if (effectiveDist < 5.9) colorIndex = 5;
        else if (effectiveDist < 7.0) colorIndex = 6;
        else colorIndex = 7;

        colorIndex = Math.min(palette.length - 1, Math.max(0, colorIndex));
        items.push({
          x: c * 10,
          y: r * 10,
          color: palette[colorIndex],
        });
      }
    }
    return items;
  }, [seedNum, palette]);

  return (
    <div className="w-full h-full relative overflow-hidden select-none">
      <svg
        viewBox="0 0 120 60"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full scale-[1.03] transform-gpu transition-transform duration-500 group-hover:scale-105"
        shapeRendering="crispEdges"
      >
        {pixels.map((p, idx) => (
          <rect
            key={idx}
            x={p.x}
            y={p.y}
            width="10"
            height="10"
            fill={p.color}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.4"
          />
        ))}
      </svg>
      {/* Subtle lighting overlay for glowing depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/15 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.06)] pointer-events-none" />
    </div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.15,
    },
  },
};

const KnowledgeBase = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(SKILLS[0]?.id);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const { installed, add, remove, isInstalled } = useInstalledSkills();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!filterMenuRef.current?.contains(event.target as Node)) {
        setFilterMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setQuery("");
        setFilterMenuOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SKILLS.filter((s) => {
      if (filter === "Installed" && !isInstalled(s.id)) return false;

      if (filter !== "All" && filter !== "Installed" && s.category !== filter) {
        return false;
      }

      if (!q) return true;

      return (
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filter, query, isInstalled]);

  const selected: Skill | undefined =
    filtered.find((s) => s.id === selectedId) ??
    filtered[0] ??
    SKILLS.find((s) => s.id === selectedId);

  // Synchronize selection fallback when filtering
  useEffect(() => {
    if (filtered.length > 0 && !filtered.some((s) => s.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const handleAdd = (s: Skill) => {
    add(s.id);
    toast({
      title: `${s.name} enabled`,
      description: "Available in every conversation context immediately.",
    });
  };

  const handleRemove = (s: Skill) => {
    remove(s.id);
    toast({
      title: `${s.name} detached`,
      description: "It won't be passed to new prompts.",
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden bg-[#FAFAFA] dark:bg-[#0B0B0E] selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
        <div className="flex-1 flex h-full min-h-0 relative">
          {/* Main List Section (Scrollable Area) */}
          <main className="flex-1 h-full min-w-0 overflow-y-auto [scrollbar-width:thin] [-ms-overflow-style:none]">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
              {/* Header Hero */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      Give your AI a new skill
                    </h1>

                    <p className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed mt-1">
                      Attach pre-compiled{" "}
                      <code className="text-[11px] px-1.5 py-0.5 rounded-md bg-orange-500/10 text-[#FF6B00] dark:text-orange-400 font-mono font-medium border border-orange-500/20">
                        SKILL.md
                      </code>{" "}
                      definitions. Every selected tool is seamlessly injected
                      into your agent's system runtime in real time.
                    </p>
                  </div>

                  {/* Quick Minimal Stats */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs text-left">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold">
                        Installed
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-zinc-100">
                        {installed.size} active
                      </div>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs text-left">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold">
                        Catalog
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-zinc-100">
                        {SKILLS.length} skills
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dynamic Search & Filter Chips */}
              <div className="flex flex-col gap-3 mb-6">
                {/* Search Bar with Orange Focus Accent */}
                <div className="relative flex items-center h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 px-3.5 gap-2.5 focus-within:border-[#FF6B00]/70 focus-within:ring-3 focus-within:ring-[#FF6B00]/10 transition-all shadow-2xs">
                  <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 shrink-0 group-focus-within:text-[#FF6B00]" />

                  <input
                    ref={searchInputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search capabilities, workflows, keywords... (Press '/' to focus)"
                    className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[12.5px] flex-1 text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                  />

                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex items-center pl-2.5 border-l border-slate-200 dark:border-zinc-800 select-none">
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                      {filtered.length}{" "}
                      {filtered.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>
                  <div className="relative ml-2 border-l border-slate-200 pl-2 dark:border-zinc-800" ref={filterMenuRef}>
                    <button
                      type="button"
                      onClick={() => setFilterMenuOpen((open) => !open)}
                      aria-label={`Filter skills: ${filter}`}
                      aria-haspopup="listbox"
                      aria-expanded={filterMenuOpen}
                      className="flex h-8 min-w-28 items-center justify-between gap-2 rounded-lg bg-white px-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      <span className="truncate">{filter}</span>
                      <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform dark:text-zinc-400 ${filterMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {filterMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.14 }}
                          role="listbox"
                          aria-label="Filter skills by category"
                          className="absolute right-0 top-full z-50 mt-2 max-h-80 w-48 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                        >
                          {(["All", "Installed", ...SKILL_CATEGORIES] as Filter[]).map((option) => {
                            const active = filter === option;
                            const count = option === "All"
                              ? SKILLS.length
                              : option === "Installed"
                                ? installed.size
                                : SKILLS.filter((skill) => skill.category === option).length;
                            const isCategory = option !== "All" && option !== "Installed";
                            const Icon = option === "Installed" ? Download : isCategory ? CATEGORY_ICONS[option as SkillCategory] : null;
                            return (
                              <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onClick={() => {
                                  setFilter(option);
                                  setFilterMenuOpen(false);
                                }}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${active ? "bg-slate-100 font-semibold text-slate-900 dark:bg-zinc-800 dark:text-white" : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"}`}
                              >
                                {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-zinc-400" /> : <span className="h-3.5 w-3.5 shrink-0" />}
                                <span className="min-w-0 flex-1 truncate">{option}</span>
                                <span className="text-[10px] tabular-nums text-slate-400 dark:text-zinc-500">{count}</span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Cards Grid: Image 1 like cards with Image 3 pixel mosaic & Image 2 pastel colors */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={`${filter}-${query}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-16"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((s) => {
                    const inst = isInstalled(s.id);

                    return (
                      <motion.div
                        key={s.id}
                        variants={cardVariants}
                        layout
                        onClick={() => {
                          setSelectedId(s.id);
                          setInspectorOpen(true);
                        }}
                        className="group relative text-left rounded-[22px] sm:rounded-[24px] border border-slate-200/80 dark:border-white/10 p-3.5 sm:p-4 cursor-pointer transition-all duration-300 bg-white dark:bg-[#121216] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                      >
                        {/* TOP INSET CONTAINER (Shorter height with Image 3 pixel mosaic) */}
                        <div className="w-full h-24 sm:h-28 rounded-[15px] sm:rounded-[17px] overflow-hidden relative shadow-inner border border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/35">
                          <PixelMosaic seed={s.id} />

                          {/* Top Right: Installed Active Badge */}
                          {inst && (
                            <div className="absolute top-2.5 right-2.5 z-10">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white backdrop-blur-md shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                ACTIVE
                              </span>
                            </div>
                          )}
                        </div>

                        {/* BOTTOM CONTENT AREA (Clean white card style without icon and chevron) */}
                        <div className="pt-3 pb-0.5 px-0.5 flex flex-col justify-between flex-1">
                          <div>
                            {/* Title (Bold uppercase, no icon, no arrow) */}
                            <h3 className="text-[13.5px] sm:text-[14.5px] font-black uppercase tracking-wide leading-snug text-slate-900 dark:!text-white line-clamp-2">
                              {s.name}
                            </h3>

                            {/* Description */}
                            <p className="text-[12px] sm:text-[12.5px] font-normal leading-relaxed mt-2 line-clamp-2 min-h-[36px] text-slate-600 dark:!text-zinc-400">
                              {s.summary}
                            </p>
                          </div>

                          {/* Footer Action Bar */}
                          <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                            <span
                              className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:bg-zinc-800 dark:text-zinc-100"
                            >
                              {s.category}
                            </span>

                            {inst ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemove(s);
                                }}
                                className="h-7 px-3 rounded-full border border-black/10 dark:border-white/20 bg-white/70 dark:bg-zinc-800/80 hover:bg-rose-500 hover:text-white hover:border-rose-500 dark:hover:bg-rose-600 dark:hover:text-white dark:hover:border-rose-600 text-slate-700 dark:text-zinc-200 text-[11px] font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                              >
                                <Minus className="w-2.5 h-2.5 stroke-[2.5]" />
                                <span>Detach</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAdd(s);
                                }}
                                className="h-7 px-3.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-zinc-200 active:scale-95 text-[11px] font-bold transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                              >
                                <Plus className="w-3 h-3 stroke-[2.5]" />
                                <span>Add to AI</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-16 border border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl bg-white/60 dark:bg-zinc-900/60"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 text-[#FF6B00] flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      No capabilities found for "{query}"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                      Try searching with different keywords or clearing your
                      active category filters.
                    </p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setFilter("All");
                      }}
                      className="mt-4 h-8 px-4 rounded-lg bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#E55F00] transition-colors cursor-pointer shadow-xs"
                    >
                      Reset search & filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </main>

          {/* Centered Modal Popup Inspector */}
          <AnimatePresence>
            {inspectorOpen && selected && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setInspectorOpen(false)}
                  className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs"
                />

                {/* Centered Dialog Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{
                    type: "spring",
                    damping: 26,
                    stiffness: 320,
                  }}
                  className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-[#111115] border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-3xl flex flex-col z-10 overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="px-5 py-4 border-b border-slate-100 dark:border-zinc-800/80 flex justify-between items-center bg-slate-50/80 dark:bg-[#16161a]">
                    <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      Skill Inspector
                    </span>

                    <button
                      onClick={() => setInspectorOpen(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modal Body Container */}
                  <div className="flex-1 overflow-y-auto bg-white dark:bg-[#111115]">
                    <SkillInspectorContent
                      skill={selected}
                      isInstalled={isInstalled(selected.id)}
                      onAdd={() => handleAdd(selected)}
                      onRemove={() => handleRemove(selected)}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SidebarShell>
  );
};

interface InspectorProps {
  skill: Skill;
  isInstalled: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const SkillInspectorContent = ({
  skill,
  isInstalled,
  onAdd,
  onRemove,
}: InspectorProps) => {
  const [copied, setCopied] = useState(false);
  const CategoryIcon = CATEGORY_ICONS[skill.category] || Sparkles;

  const cleanBody = useMemo(() => {
    return skill.body
      .replace(/^---\n[\s\S]*?\n---\n*/, "")
      .replace(/>\s*Installed by[^\n]*\n*/gi, "")
      .trim();
  }, [skill.body]);

  const handleCopy = () => {
    const textToCopy = skill.body
      .replace(/>\s*Installed by[^\n]*\n*/gi, "")
      .trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111115]">
      {/* Top Graphic Banner with Image 3 Pixel Mosaic */}
      <div className="w-full h-24 overflow-hidden relative border-b border-black/5 dark:border-white/10">
        <PixelMosaic seed={skill.id} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Detail header */}
      <div className="p-5 border-b border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-[#111115]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <CategoryIcon className="w-3 h-3 shrink-0" />
            {skill.category}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-900 dark:text-white">
          {skill.name}
        </h2>

        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 mt-2 leading-relaxed font-normal">
          {skill.summary}
        </p>

        <div className="mt-5 flex gap-2">
          {isInstalled ? (
            <button
              onClick={onRemove}
              className="flex-1 h-9 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 dark:hover:border-rose-800 text-slate-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
              Detach Skill
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="flex-1 h-9 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-zinc-200 text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              Attach to Runtime
            </button>
          )}
        </div>
      </div>

      {/* Markdown Body Viewer */}
      <div className="p-5 sm:p-6 bg-white dark:bg-[#111115]">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-200 font-semibold text-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#FF6B00]" />
            SKILL.md Instructions
          </span>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer shadow-2xs ${
              copied
                ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                : "bg-white dark:bg-zinc-800/90 border border-slate-200 dark:border-zinc-700/80 text-[#FF6B00] dark:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 hover:border-orange-200 dark:hover:border-orange-900/40 active:scale-95"
            }`}
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#FF6B00] dark:text-orange-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-50/70 dark:bg-zinc-900/40 p-4.5 sm:p-5 text-[13px] leading-relaxed text-slate-700 dark:text-zinc-300 shadow-2xs">
          <ChatMarkdown content={cleanBody} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
