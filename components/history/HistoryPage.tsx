"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import SidebarShell from "@/components/canvas/SidebarShell";
import { useSidebarState } from "@/components/canvas/useSidebarState";

import {
  MessageSquare,
  Globe,
  Layout,
  Database,
  AudioWaveform,
  GraduationCap,
  ImageIcon,
  Sparkles,
  ArrowUpRight,
  Plus,
  Clock,
  X,
  MoreVertical,
  History as HistoryIcon,
  Download,
  BookOpen,
} from "lucide-react";

type SessionItem = {
  id: string;
  time: string;
  day: "Today" | "Yesterday" | "Earlier";
  title: string;
  desc: string;
  tool: string;
  toolIcon: typeof MessageSquare;
  iconBg: string;
  iconColor: string;
  lineColor: string;
  tag: string;
  tokens: string;
  executionMs: number;
  status: "Running" | "Completed" | "Scheduled";
  favorite?: boolean;
};

const initialSessions: SessionItem[] = [
  {
    id: "1",
    time: "10:30 AM",
    day: "Today",
    title: "Research on Quantum Computing Advances",
    desc: "Analyzed fault-tolerant qubits, benchmarked surface code thresholds, and synthesized 12 vendor whitepapers.",
    tool: "AI Chat",
    toolIcon: MessageSquare,
    iconBg: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    lineColor: "bg-violet-500",
    tag: "Research",
    tokens: "48,290",
    executionMs: 820,
    status: "Running",
    favorite: true,
  },
  {
    id: "2",
    time: "09:15 AM",
    day: "Today",
    title: "Search: Clean Tech & Sodium-ion Battery Roadmap",
    desc: "Scraped 43 market reports on cell energy densities and drafted cathode manufacturing cost curves.",
    tool: "Web Search",
    toolIcon: Globe,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    lineColor: "bg-cyan-500",
    tag: "Market",
    tokens: "18,440",
    executionMs: 1420,
    status: "Completed",
  },
  {
    id: "3",
    time: "08:45 AM",
    day: "Today",
    title: "AI SaaS Landing Page Wireframe & Theme",
    desc: "Generated Tailwind responsive components, glassmorphism hero banner, and pricing switch table.",
    tool: "App Builder",
    toolIcon: Layout,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    lineColor: "bg-emerald-500",
    tag: "Design",
    tokens: "92,100",
    executionMs: 2340,
    status: "Running",
  },
  {
    id: "4",
    time: "06:20 PM",
    day: "Yesterday",
    title: "Customer Retention & Cohort Telemetry",
    desc: "Executed analytical queries over Snowflake table with 90-day retention curves and churn vectors.",
    tool: "Database",
    toolIcon: Database,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    lineColor: "bg-amber-500",
    tag: "Analysis",
    tokens: "6,210",
    executionMs: 430,
    status: "Completed",
  },
  {
    id: "5",
    time: "04:10 PM",
    day: "Yesterday",
    title: "Voiceover: Product Launch Script v3",
    desc: "Rendered studio-grade voiceover audio track with emotional inflection matching keynote tempo.",
    tool: "Audio Lab",
    toolIcon: AudioWaveform,
    iconBg: "bg-pink-500/10 dark:bg-pink-500/20 border-pink-500/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    lineColor: "bg-pink-500",
    tag: "Audio",
    tokens: "12,900",
    executionMs: 3100,
    status: "Completed",
    favorite: true,
  },
  {
    id: "6",
    time: "02:00 PM",
    day: "Earlier",
    title: "Study notes: SVD Matrix Decomposition",
    desc: "Extracted proofs, LaTeX formulas, and visual intuition diagrams for machine learning eigenvalues.",
    tool: "RivinityLM",
    toolIcon: GraduationCap,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    lineColor: "bg-blue-500",
    tag: "Education",
    tokens: "24,800",
    executionMs: 910,
    status: "Scheduled",
  },
  {
    id: "7",
    time: "11:25 AM",
    day: "Earlier",
    title: "Upscale: Product Hero Banner (4K Output)",
    desc: "Applied super-resolution model with face geometry preservation and specular highlight recovery.",
    tool: "Image Enhancer",
    toolIcon: ImageIcon,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    lineColor: "bg-purple-500",
    tag: "Visuals",
    tokens: "3,100",
    executionMs: 4200,
    status: "Completed",
  },
  {
    id: "8",
    time: "10:10 AM",
    day: "Earlier",
    title: "Stripe Webhook Handler & Billing Engine",
    desc: "Configured resilient idempotency ledger for invoice settlements, billing retry schemes, and notifications.",
    tool: "App Builder",
    toolIcon: Layout,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    lineColor: "bg-emerald-500",
    tag: "DevOps",
    tokens: "38,700",
    executionMs: 1150,
    status: "Completed",
  },
];

const tabs = [
  "All",
  "Favorites",
  "AI Chat",
  "Web Search",
  "App Builder",
  "Audio Lab",
  "RivinityLM",
  "Image Enhancer",
] as const;

const historyCategories = [
  {
    title: "Website Redesign",
    badge: "24 CHATS • 12 FILES",
    desc: "Archived research and design planning records for full system redesign.",
    icon: Layout,
    accent: "from-emerald-500/15 via-teal-500/5 to-transparent",
    iconBg:
      "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Marketing Strategy",
    badge: "18 CHATS • 8 FILES",
    desc: "Saved campaign prompts, positioning playbooks and competitor summaries.",
    icon: Globe,
    accent: "from-cyan-500/15 via-blue-500/5 to-transparent",
    iconBg:
      "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "AI Product Research",
    badge: "32 CHATS • 21 FILES",
    desc: "Validated feature specifications, benchmarks and market intelligence reports.",
    icon: Sparkles,
    accent: "from-violet-500/15 via-purple-500/5 to-transparent",
    iconBg:
      "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
  },
];

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [selectedSession, setSelectedSession] = useState<SessionItem>(
    sessions[0],
  );
  const [showModal, setShowModal] = useState(false);

  const handleAddNewHistory = () => {
    const titleInput = prompt("Enter new history session title:");
    if (!titleInput || !titleInput.trim()) return;

    const newSession: SessionItem = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      day: "Today",
      title: titleInput.trim(),
      desc: "Manually created history session entry recorded in workspace archive.",
      tool: "AI Chat",
      toolIcon: MessageSquare,
      iconBg: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/30",
      iconColor: "text-violet-600 dark:text-violet-400",
      lineColor: "bg-violet-500",
      tag: "Archive",
      tokens: "8,200",
      executionMs: 410,
      status: "Running",
    };

    setSessions((prev) => [newSession, ...prev]);
    setSelectedSession(newSession);
    setShowModal(true);
  };

  const filtered = useMemo(() => {
    let list = sessions;

    if (activeTab === "Favorites") {
      list = list.filter((a) => a.favorite);
    } else if (activeTab !== "All") {
      list = list.filter((a) => a.tool === activeTab);
    }

    const searchQuery = query.trim();
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((a) =>
        `${a.title} ${a.desc} ${a.tool} ${a.tag}`.toLowerCase().includes(q),
      );
    }

    return list;
  }, [sessions, activeTab, query]);

  const grouped = useMemo(() => {
    const sections: Record<string, SessionItem[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    filtered.forEach((item) => {
      sections[item.day]?.push(item);
    });

    return sections;
  }, [filtered]);

  return (
    <SidebarShell>
      <div
        className={`flex-1 flex overflow-hidden font-sans antialiased selection:bg-[#6366F1]/25 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#060608] text-slate-100"
            : "bg-slate-50 text-slate-900"
        }`}
      >

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Scrollable Canvas Body */}
        <div className="w-full flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-5">
            {/* Section 1: History Categories Section */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h2 className="!text-lg font-bold tracking-tight text-[#0f172a] dark:text-white flex items-center gap-2 leading-tight">
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)",
                      }}
                      className="w-7 h-7 rounded-xl text-white shadow-xs flex items-center justify-center shrink-0"
                    >
                      <HistoryIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>Saved History Categories</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Browse your archived conversations and generated assets by
                    category
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewHistory}
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)",
                  }}
                  className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-xl hover:opacity-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New History Log
                </button>
              </div>

              {/* 3 Categories Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
                {historyCategories.map((cat, idx) => {
                  const IconComp = cat.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.18 }}
                      className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111115] p-4 sm:p-4.5 shadow-2xs flex flex-col justify-between group hover:border-[#6366F1]/50 transition-all h-[155px] cursor-pointer"
                    >
                      <div
                        className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${cat.accent} rounded-full blur-xl pointer-events-none`}
                      />

                      {/* Top Row: Squircle Icon + Tag */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div
                          className={`w-8 h-8 rounded-xl border ${cat.iconBg} flex items-center justify-center shadow-2xs shrink-0`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold tracking-wider text-[#FF6B00] uppercase font-mono">
                          {cat.badge}
                        </span>
                      </div>

                      {/* Middle: Clean 2-Line Description */}
                      <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 relative z-10 my-auto font-normal">
                        {cat.desc}
                      </p>

                      {/* Bottom Row: Full-width Bold Uppercase Title */}
                      <div className="pt-2 relative z-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60">
                        <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-white uppercase group-hover:text-[#FF6B00] transition-colors leading-none">
                          {cat.title}
                        </h3>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Main History Timeline Stream */}
            <div className="space-y-3.5 pt-3 border-t border-slate-200/70 dark:border-slate-800/70">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div>
                  <h3 className="!text-sm sm:!text-base font-bold tracking-tight text-[#0f172a] dark:text-white">
                    Activity History Stream
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Chronological record of past interactions, model
                    generations, and prompt queries
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [&-webkit-scrollbar]:hidden scroll-smooth">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={
                        isActive
                          ? {
                              background:
                                "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)",
                              borderColor: "transparent",
                              color: "#FFFFFF",
                            }
                          : {}
                      }
                      className={`h-7 px-3 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap border cursor-pointer shrink-0 ${
                        isActive
                          ? "shadow-xs text-white"
                          : "bg-white dark:bg-[#111115] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Session Cards List */}
              <div className="space-y-3 w-full">
                {(["Today", "Yesterday", "Earlier"] as const).map((day) => {
                  const items = grouped[day];
                  if (!items || items.length === 0) return null;

                  return (
                    <div key={day} className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          {day}
                        </span>
                        <div className="h-px flex-1 bg-slate-200/70 dark:bg-slate-800/70" />
                        <span className="text-[10px] font-mono text-slate-400">
                          {items.length}{" "}
                          {items.length === 1 ? "session" : "sessions"}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <AnimatePresence>
                          {items.map((session) => {
                            const Icon = session.toolIcon;
                            return (
                              <motion.div
                                key={session.id}
                                layout
                                onClick={() => {
                                  setSelectedSession(session);
                                  setShowModal(true);
                                }}
                                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-[#6366F1]/50 transition-all p-3 sm:p-3.5 cursor-pointer bg-white dark:bg-[#111115] space-y-2 shadow-2xs relative group"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div
                                      className={`w-7 h-7 rounded-xl border ${session.iconBg} shrink-0 mt-0.5 flex items-center justify-center shadow-2xs`}
                                    >
                                      <Icon
                                        className={`w-3.5 h-3.5 ${session.iconColor}`}
                                      />
                                    </div>
                                    <div className="min-w-0 space-y-0.5">
                                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-[#6366F1] transition-colors truncate">
                                        {session.title}
                                      </h4>
                                      <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">
                                        {session.desc}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-mono">
                                      {session.status}
                                    </span>
                                    <MoreVertical className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                                  </div>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${session.lineColor}`}
                                      style={{
                                        width: `${Math.min(
                                          session.executionMs / 30,
                                          100,
                                        )}%`,
                                      }}
                                    />
                                  </div>

                                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-[#6366F1]" />
                                      {session.time}
                                    </span>
                                    <span className="text-[#6366F1] font-semibold hover:underline flex items-center gap-0.5">
                                      {session.status === "Completed"
                                        ? "Report"
                                        : "Details"}{" "}
                                      →
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}

                {filtered.length === 0 && (
                  <div className="w-full py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111115]">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      No history entries found
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveTab("All");
                      }}
                      className="mt-3 px-3 py-1.5 text-xs font-medium rounded-xl text-white bg-[#6366F1] hover:opacity-90 transition shadow-xs cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay (Matching the exact Skill Inspector layout and styling) */}
      <AnimatePresence>
        {showModal && selectedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay (Dimmed & Blurred) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm"
            />

            {/* Centered Dialog Box (Solid Opaque White / Dark Theme Card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 320,
              }}
              className="relative w-full max-w-md max-h-[85vh] bg-white dark:bg-[#111115] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl flex flex-col z-10 overflow-hidden"
              style={{ backgroundColor: isDarkMode ? "#111115" : "#ffffff" }}
            >
              {/* Modal Top Header Bar */}
              <div className="p-3.5 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center bg-slate-50/80 dark:bg-[#16161a] shrink-0">
                <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                  Skill Inspector
                </span>

                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable Modal Content Container */}
              <div className="flex-1 overflow-y-auto bg-white dark:bg-[#111115] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <div className="flex flex-col h-full bg-white dark:bg-[#111115]">
                  {/* Detail Header Section */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#111115]">
                    <div className="flex items-center gap-1.5 text-[#FF6B00] text-[10px] font-bold uppercase tracking-wider mb-1 font-mono">
                      <Sparkles className="w-3 h-3" />
                      <span>{selectedSession.tag}</span>
                    </div>

                    <h2 className="!text-sm sm:!text-base font-bold tracking-tight text-slate-900 dark:text-white">
                      {selectedSession.title}
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                      {selectedSession.desc}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        style={{
                          background:
                            "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)",
                        }}
                        className="flex-1 h-8.5 rounded-xl text-white text-xs font-semibold hover:opacity-95 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        Attach to Runtime
                      </button>
                    </div>
                  </div>

                  {/* Body Viewer (Exact Match to SKILL.md Inspector Box) */}
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

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#18181C] p-3.5 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200 space-y-3">
                      <div className="space-y-1">
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            name:
                          </span>{" "}
                          <span className="text-slate-600 dark:text-slate-300">
                            {selectedSession.title
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            description:
                          </span>{" "}
                          <span className="text-slate-600 dark:text-slate-300">
                            {selectedSession.desc}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            category:
                          </span>{" "}
                          <span className="text-slate-600 dark:text-slate-300">
                            {selectedSession.tag}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">
                          Overview
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                          {selectedSession.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
