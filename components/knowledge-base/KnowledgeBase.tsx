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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
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
      stiffness: 350,
      damping: 26,
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

const Skills = () => {
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

      if (
        filter !== "All" &&
        filter !== "Installed" &&
        s.category !== filter
      ) {
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
    if (
      filtered.length > 0 &&
      !filtered.some((s) => s.id === selectedId)
    ) {
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
      title: `${s.name} removed`,
      description: "It won't be passed to new prompts.",
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background selection:bg-primary/25">
      {/* Fixed Collapsible App Sidebar */}
      <CanvasSidebar
        open={sidebarOpen}
        onCollapse={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden">
        <div className="flex-1 flex h-full min-h-0 relative">
          {/* Main List Section (Scrollable Area) */}
          <main className="flex-1 h-full min-w-0 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
              {/* Header Hero (Decreased text size matching reference) */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-5 space-y-1"
              >
                <h1 className="!text-xl sm:!text-2xl font-bold tracking-tight text-foreground">
                  Give your AI a{" "}
                  <span className="text-foreground font-black">
                    new skill
                  </span>
                </h1>

                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Attach pre-compiled{" "}
                  <code className="text-[10.5px] px-1.5 py-0.5 rounded bg-muted font-mono font-medium text-foreground">
                    SKILL.md
                  </code>{" "}
                  definitions. Every selected tool is injected into your
                  agent's system runtime in real time.
                </p>
              </motion.div>

              {/* Dynamic Search & Filter Chips (Compact SaaS sizing) */}
              <div className="flex flex-col gap-2.5 mb-5">
                <div className="relative flex items-center h-8.5 rounded-xl bg-muted/30 border border-border/60 px-3 gap-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-2xs">
                  <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />

                  <input
                    ref={searchInputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search capabilities, workflows, keywords... (Press '/' to focus)"
                    className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-xs flex-1 text-foreground placeholder:text-muted-foreground/60"
                  />

                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}

                  <span className="text-[10px] text-muted-foreground/60 select-none pl-2 border-l border-border/40 font-mono">
                    {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
                  </span>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5 relative">
                  {(
                    ["All", "Installed", ...SKILL_CATEGORIES] as Filter[]
                  ).map((f) => {
                    const active = filter === f;

                    const count =
                      f === "All"
                        ? SKILLS.length
                        : f === "Installed"
                        ? installed.size
                        : SKILLS.filter(
                            (s) => s.category === f
                          ).length;

                    return (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`relative h-6.5 sm:h-7 px-2.5 rounded-full text-[11px] font-medium transition-colors select-none cursor-pointer ${
                          active
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/40"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="activeFilterBubble"
                            className="absolute inset-0 rounded-full bg-foreground"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.4,
                            }}
                          />
                        )}

                        <span className="relative z-10 flex items-center gap-1">
                          {f}

                          <span
                            className={
                              active
                                ? "opacity-75 text-[9.5px] font-mono"
                                : "opacity-45 text-[9.5px] font-mono"
                            }
                          >
                            {count}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cards Grid: Compact 3-Column Grid matching reference image cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={`${filter}-${query}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 pb-12"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((s) => {
                    const inst = isInstalled(s.id);
                    const active = s.id === selected?.id;

                    return (
                      <motion.div
                        key={s.id}
                        variants={cardVariants}
                        layout
                        whileHover={{ y: -2 }}
                        onClick={() => {
                          setSelectedId(s.id);
                          setInspectorOpen(true);
                        }}
                        className={`group relative text-left rounded-2xl border p-3.5 sm:p-4 cursor-pointer transition-all bg-card/60 backdrop-blur-sm ${
                          active
                            ? "border-primary/60 shadow-md ring-1 ring-primary/20"
                            : "border-border/60 hover:border-border hover:bg-card"
                        }`}
                      >
                        <div className="flex flex-col justify-between h-full min-h-[145px]">
                          <div>
                            {/* Card Topline: Crisp Orange Tag matching reference ("STUDIO", "VOICE AI") */}
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B00] font-mono">
                                {s.category}
                              </span>

                              {inst && (
                                <motion.span
                                  initial={{
                                    scale: 0.8,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    scale: 1,
                                    opacity: 1,
                                  }}
                                  className="inline-flex items-center gap-1 text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25"
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                  Attached
                                </motion.span>
                              )}
                            </div>

                            {/* Card Title: Decreased font size */}
                            <h3 className="!text-xs sm:!text-[12.5px] font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                              <span>{s.name}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                            </h3>

                            {/* Card Description: Compact text size */}
                            <p className="text-[11px] sm:text-[11.5px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed font-normal">
                              {s.summary}
                            </p>
                          </div>

                          <div className="mt-3">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-2.5">
                              {s.tags.slice(0, 3).map((t) => (
                                <span
                                  key={t}
                                  className="text-[9.5px] px-1.5 py-0.5 rounded-md bg-muted/70 text-muted-foreground font-mono"
                                >
                                  #{t}
                                </span>
                              ))}

                              {s.tags.length > 3 && (
                                <span className="text-[9.5px] px-1 text-muted-foreground/60 self-center font-mono">
                                  +{s.tags.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Actions bar */}
                            <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                              {inst ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(s);
                                  }}
                                  className="h-6.5 px-2 rounded-lg border border-rose-500/30 text-[10.5px] font-medium text-rose-500 hover:bg-rose-500/10 transition-colors inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                  Detach
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAdd(s);
                                  }}
                                  className="h-6.5 px-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10.5px] font-semibold hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                                >
                                  <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                                  Add to AI
                                </button>
                              )}

                              <span className="text-[10px] text-muted-foreground/60 ml-auto font-mono">
                                {s.usage.toLocaleString()} users
                              </span>
                            </div>
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
                    className="col-span-full text-center py-12 border border-dashed border-border/60 rounded-2xl bg-card/30"
                  >
                    <Search className="w-5 h-5 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-foreground">
                      No capabilities found for "{query}"
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Try searching with different keywords or clearing your active filters.
                    </p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setFilter("All");
                      }}
                      className="mt-3 h-7 px-3 rounded-lg bg-secondary text-secondary-foreground text-[11px] font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      Reset search & filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </main>

          {/* Centered Modal Popup Inspector (Solid Opaque White Dialog with Dimmed Backdrop) */}
          <AnimatePresence>
            {inspectorOpen && selected && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop overlay (Dimmed & Blurred background as it is) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setInspectorOpen(false)}
                  className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm"
                />

                {/* Centered Dialog Box (100% Solid White Background - Not Translucent) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{
                    type: "spring",
                    damping: 26,
                    stiffness: 320,
                  }}
                  className="relative w-full max-w-md max-h-[85vh] !bg-white dark:!bg-[#111115] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl flex flex-col z-10 overflow-hidden"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* Modal Header */}
                  <div className="p-3.5 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center bg-slate-50/80 dark:bg-[#16161a]">
                    <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                      Skill Inspector
                    </span>

                    <button
                      onClick={() => setInspectorOpen(false)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Modal Body Container (Solid White Background) */}
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
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111115]">
      {/* Detail header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#111115]">
        <div className="flex items-center gap-1.5 text-[#FF6B00] text-[10px] font-bold uppercase tracking-wider mb-1 font-mono">
          <Sparkles className="w-3 h-3" />
          <span>{skill.category}</span>
        </div>

        <h2 className="!text-sm sm:!text-base font-bold tracking-tight text-slate-900 dark:text-white">
          {skill.name}
        </h2>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
          {skill.summary}
        </p>

        <div className="mt-4 flex gap-2">
          {isInstalled ? (
            <button
              onClick={onRemove}
              className="flex-1 h-8 rounded-xl border border-rose-500/30 text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Minus className="w-3 h-3" />
              Detach Skill
            </button>
          ) : (
            <button
              onClick={onAdd}
              style={{ background: "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)" }}
              className="flex-1 h-8.5 rounded-xl text-white text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              Attach to Runtime
            </button>
          )}
        </div>
      </div>

      {/* Markdown Body Viewer */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#111115]">
        <div className="flex items-center justify-between mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            SKILL.md Instructions
          </span>

          <span className="text-[9px] text-slate-400">
            Read-Only
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#18181C] p-3.5 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200">
          <ChatMarkdown content={skill.body} />
        </div>
      </div>
    </div>
  );
};

export default Skills;