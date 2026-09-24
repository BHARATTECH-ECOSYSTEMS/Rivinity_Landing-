"use client";

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
  Layers,
  X,
  BookOpen,
  ChevronRight,
  Command,
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
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
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

const KnowledgeBase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(SKILLS[0]?.id);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { installed, add, remove, isInstalled } = useInstalledSkills();
  const { toast } = useToast();

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
  }, [filter, query, installed, isInstalled]);

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
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Header Hero */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center shadow-sm">
                    <Layers
                      className="w-4 h-4 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Runtime Capabilities
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Give your AI a{" "}
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-bold">
                    new skill
                  </span>
                </h1>

                <p className="text-[14px] text-muted-foreground mt-2 max-w-xl leading-relaxed">
                  Attach pre-compiled{" "}
                  <code className="text-[12px] px-1.5 py-0.5 rounded bg-muted font-mono font-medium text-foreground">
                    SKILL.md
                  </code>{" "}
                  definitions. Every selected tool is injected into your
                  agent's system runtime in real time.
                </p>
              </motion.div>

              {/* Dynamic Search & Filter Chips */}
              <div className="flex flex-col gap-3.5 mb-6">
                <div className="relative flex items-center h-11 rounded-xl bg-muted/40 border border-border/60 px-3.5 gap-2.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-xs">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />

                  <input
                    ref={searchInputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search capabilities, workflows, keywords... "
                    className="bg-transparent outline-none text-[13.5px] flex-1 text-foreground placeholder:text-muted-foreground/60"
                  />

                  {query ? (
                    <button
                      onClick={() => setQuery("")}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border/60 bg-muted/50 text-[10px] text-muted-foreground font-mono select-none">
                      <Command className="w-2.5 h-2.5" />
                      <span>/</span>
                    </div>
                  )}

                  <span className="text-[11.5px] text-muted-foreground/60 select-none pl-2 border-l border-border/40 font-mono">
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
                        className={`relative h-7 px-3 rounded-full text-[12px] font-medium transition-colors select-none cursor-pointer ${
                          active
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
                                ? "opacity-75 text-[11px]"
                                : "opacity-45 text-[11px]"
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

              {/* Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={`${filter}-${query}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-12"
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
                        className={`group relative text-left rounded-2xl border p-4 cursor-pointer transition-colors bg-card/60 backdrop-blur-sm ${
                          active
                            ? "border-primary/60 shadow-md ring-1 ring-primary/20"
                            : "border-border/60 hover:border-border hover:bg-card"
                        }`}
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            {/* Card Topline */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
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
                                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25"
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                  Attached
                                </motion.span>
                              )}
                            </div>

                            <h3 className="text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                              {s.name}
                              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                            </h3>

                            <p className="text-[12.5px] text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                              {s.summary}
                            </p>
                          </div>

                          <div className="mt-4">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {s.tags.slice(0, 3).map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground font-mono"
                                >
                                  #{t}
                                </span>
                              ))}

                              {s.tags.length > 3 && (
                                <span className="text-[10px] px-1 text-muted-foreground/60 self-center">
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
                                  className="h-7 px-2.5 rounded-lg border border-rose-500/30 text-[11.5px] font-medium text-rose-500 hover:bg-rose-500/10 transition-colors inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                  Detach
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAdd(s);
                                  }}
                                  className="h-7 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[11.5px] font-medium hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-1 shadow-sm shadow-orange-500/20 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3 stroke-[2.5]" />
                                  Add to AI
                                </button>
                              )}

                              <span className="text-[11px] text-muted-foreground/70 ml-auto font-mono">
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
                    className="col-span-full text-center py-16 border border-dashed border-border/60 rounded-2xl bg-card/30"
                  >
                    <Search className="w-6 h-6 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-[14px] font-medium text-foreground">
                      No capabilities found for "{query}"
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-1">
                      Try searching with different keywords or clearing your active filters.
                    </p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setFilter("All");
                      }}
                      className="mt-4 h-8 px-4 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
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
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />

                {/* Centered Dialog Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                  }}
                  className="relative w-full max-w-lg max-h-[85vh] bg-card border border-border shadow-2xl rounded-2xl flex flex-col z-10 overflow-hidden"
                >
                  <div className="p-3.5 border-b border-border/60 flex justify-between items-center bg-muted/20">
                    <span className="text-xs font-mono font-medium text-muted-foreground">
                      Skill Inspector
                    </span>

                    <button
                      onClick={() => setInspectorOpen(false)}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
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
    <div className="flex flex-col h-full">
      {/* Detail header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{skill.category}</span>
        </div>

        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {skill.name}
        </h2>

        <p className="text-[13px] text-muted-foreground mt-1 leading-snug">
          {skill.summary}
        </p>

        <div className="mt-5 flex gap-2">
          {isInstalled ? (
            <button
              onClick={onRemove}
              className="flex-1 h-9 rounded-xl border border-rose-500/30 text-[12.5px] font-medium text-rose-500 hover:bg-rose-500/10 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
              Detach Skill
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="flex-1 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[12.5px] font-medium hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              Attach to Runtime
            </button>
          )}
        </div>
      </div>

      {/* Markdown Body Viewer */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            SKILL.md Instructions
          </span>

          <span className="text-[10px] text-muted-foreground/50">
            Read-Only
          </span>
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 font-mono text-[12.5px] leading-relaxed">
          <ChatMarkdown content={skill.body} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
