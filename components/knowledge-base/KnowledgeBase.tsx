import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import ChatMarkdown from "@/components/canvas/ChatMarkdown";
import {
  Search,
  Sparkles,
  Check,
  Plus,
  Minus,
  X,
  BookOpen,
  ChevronRight,
  PanelLeft,
  Copy,
  CheckCheck,
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
  Zap,
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
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
    scale: 0.97,
    transition: {
      duration: 0.15,
    },
  },
};

const KnowledgeBase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(SKILLS[0]?.id);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { installed, add, remove, isInstalled } = useInstalledSkills();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
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
    <div className="h-screen w-screen flex overflow-hidden bg-[#FAFAFA] dark:bg-[#0B0B0E] selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
      {/* Fixed Collapsible App Sidebar */}
      <CanvasSidebar
        open={sidebarOpen}
        onCollapse={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden">
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
                <div className="flex items-center justify-between gap-3">
                  {/* Mobile Sidebar Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setSidebarOpen((prev) => !prev)}
                    className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 shadow-2xs cursor-pointer"
                    aria-label="Toggle sidebar"
                  >
                    <PanelLeft className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>

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
                    <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs text-left">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                        Installed
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-zinc-100">
                        {installed.size} active
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs text-left">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
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
                    <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 font-medium">
                      {filtered.length}{" "}
                      {filtered.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>
                </div>

                {/* Filter Pills with Minimal Orange Active Accent */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 relative items-center">
                  {(["All", "Installed", ...SKILL_CATEGORIES] as Filter[]).map(
                    (f) => {
                      const active = filter === f;

                      const count =
                        f === "All"
                          ? SKILLS.length
                          : f === "Installed"
                            ? installed.size
                            : SKILLS.filter((s) => s.category === f).length;

                      const Icon =
                        f !== "All" && f !== "Installed"
                          ? CATEGORY_ICONS[f as SkillCategory]
                          : null;

                      return (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`relative h-7 sm:h-7.5 px-3 rounded-full text-[11.5px] font-medium transition-all select-none cursor-pointer flex items-center gap-1.5 ${
                            active
                              ? "bg-[#FF6B00] text-white shadow-[0_2px_8px_rgba(255,107,0,0.25)] border border-[#FF6B00]"
                              : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-[#FF6B00] dark:hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 border border-slate-200/80 dark:border-zinc-800 shadow-2xs"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className={`w-3 h-3 ${
                                active
                                  ? "text-white"
                                  : "text-slate-400 dark:text-zinc-500"
                              }`}
                            />
                          )}

                          <span>{f}</span>

                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                              active
                                ? "bg-white/20 text-white font-semibold"
                                : "text-slate-400 dark:text-zinc-500"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Cards Grid: Minimal Clean Cards with Orange Highlights */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={`${filter}-${query}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 pb-16"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((s) => {
                    const inst = isInstalled(s.id);
                    const active = s.id === selected?.id;
                    const CategoryIcon = CATEGORY_ICONS[s.category] || Sparkles;

                    return (
                      <motion.div
                        key={s.id}
                        variants={cardVariants}
                        layout
                        onClick={() => {
                          setSelectedId(s.id);
                          setInspectorOpen(true);
                        }}
                        className={`group relative text-left rounded-2xl border p-4 sm:p-5 cursor-pointer transition-colors duration-200 backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] ${
                          active
                            ? "border-slate-400 dark:border-zinc-500 ring-1 ring-slate-400/40 dark:ring-zinc-500/40"
                            : "border-slate-200/70 dark:border-white/10 hover:border-slate-400 dark:hover:border-zinc-500"
                        }`}
                      >
                        <div className="flex flex-col justify-between h-full min-h-[150px]">
                          <div>
                            {/* Card Topline: Minimal Orange Category Badge */}
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-50/80 dark:bg-orange-950/40 text-[#FF6B00] dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/40 font-mono">
                                <CategoryIcon className="w-3 h-3 text-[#FF6B00] dark:text-orange-400 shrink-0" />
                                {s.category}
                              </span>

                              {inst && (
                                <motion.span
                                  initial={{ scale: 0.85, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50"
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                  Attached
                                </motion.span>
                              )}
                            </div>

                            {/* Card Title */}
                            <h3 className="text-[13.5px] sm:text-[14px] font-bold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-slate-800 dark:group-hover:text-white transition-colors flex items-center justify-between">
                              <span className="truncate">{s.name}</span>
                              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-slate-500 dark:group-hover:text-zinc-400 transition-colors shrink-0 ml-1.5" />
                            </h3>

                            {/* Card Description */}
                            <p className="text-[11.5px] sm:text-[12px] text-slate-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed font-normal min-h-[36px]">
                              {s.summary}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                            {inst ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemove(s);
                                }}
                                className="h-7 px-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 dark:hover:border-rose-800 text-slate-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 text-[11px] font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer"
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
                                className="h-7 px-3 rounded-lg bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] text-white dark:text-black text-[11px] font-semibold transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
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
                    className="col-span-full text-center py-16 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white/60 dark:bg-zinc-900/60"
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
                  className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-[#111115] border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-2xl flex flex-col z-10 overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="p-4 border-b border-slate-100 dark:border-zinc-800/80 flex justify-between items-center bg-slate-50/80 dark:bg-[#16161a]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                      <span className="text-xs font-mono font-semibold text-slate-600 dark:text-zinc-300">
                        Skill Inspector
                      </span>
                    </div>

                    <button
                      onClick={() => setInspectorOpen(false)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
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
    </div>
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

  const handleCopy = () => {
    navigator.clipboard.writeText(skill.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111115]">
      {/* Detail header */}
      <div className="p-5 border-b border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-[#111115]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-[#FF6B00] dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/40 font-mono">
            <CategoryIcon className="w-3 h-3 text-[#FF6B00] dark:text-orange-400 shrink-0" />
            {skill.category}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          {skill.name}
        </h2>

        <p className="text-xs sm:text-[12.5px] text-slate-500 dark:text-zinc-400 mt-1.5 leading-relaxed font-normal">
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
              className="flex-1 h-9 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              Attach to Runtime
            </button>
          )}
        </div>
      </div>

      {/* Markdown Body Viewer */}
      <div className="p-5 bg-white dark:bg-[#111115]">
        <div className="flex items-center justify-between mb-2 text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-300 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#FF6B00]" />
            SKILL.md Instructions
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] text-[#FF6B00] hover:underline cursor-pointer font-mono font-medium"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-slate-50/80 dark:bg-[#18181C] p-3.5 font-mono text-[11.5px] leading-relaxed text-slate-800 dark:text-slate-200">
          <ChatMarkdown content={skill.body} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
