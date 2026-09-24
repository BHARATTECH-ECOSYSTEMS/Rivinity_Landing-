"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";

import {
  Search,
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
  Bell,
  Moon,
  Sun,
  MoreHorizontal,
  ChevronDown,
  Settings,
  LogOut,
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
  lineColor: string; // Exact matching color for the progress bar line
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
    subtitle: "24 Chats • 12 Files",
    desc: "Archived research and design planning records.",
    icon: Layout,
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Marketing Strategy",
    subtitle: "18 Chats • 8 Files",
    desc: "Saved campaign prompts and competitor summaries.",
    icon: Globe,
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    iconBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "AI Product Research",
    subtitle: "32 Chats • 21 Files",
    desc: "Validated feature specifications and market reports.",
    icon: Sparkles,
    accent: "from-violet-500/20 via-purple-500/10 to-transparent",
    iconBg: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400",
  },
];

const HistoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");

  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [selectedSession, setSelectedSession] = useState<SessionItem>(sessions[0]);
  const [showModal, setShowModal] = useState(false);

  const showToast = (msg: string) => {
    console.log(msg);
  };

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

    const searchQuery = query.trim() || headerSearchTerm.trim();
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((a) =>
        `${a.title} ${a.desc} ${a.tool} ${a.tag}`
          .toLowerCase()
          .includes(q)
      );
    }

    return list;
  }, [sessions, activeTab, query, headerSearchTerm]);

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
    <div
      className={`h-screen w-screen flex overflow-hidden font-sans antialiased selection:bg-[#6366F1]/25 transition-colors duration-300 ${
        isDarkMode ? "bg-[#060608] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      
      {/* Sidebar Wrapper with High Z-Index */}
      <div className="relative z-30" onClick={(e) => e.stopPropagation()}>
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onCollapse={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(false);
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Scrollable Canvas */}
        <div className="w-full flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
            {/* History Categories Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                    <div 
                      style={{ background: "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)" }}
                      className="p-2 rounded-xl text-white shadow-md shadow-[#FF6B00]/20"
                    >
                      <HistoryIcon className="w-5 h-5" />
                    </div>
                    Saved History Categories
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Browse your archived conversations and generated assets by category
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewHistory}
                  style={{ background: "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)" }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-[#FF6B00]/20 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  New History Log
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {historyCategories.map((cat, idx) => {
                  const IconComp = cat.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111115] p-6 shadow-sm flex flex-col justify-between space-y-4 group hover:border-[#6366F1]/40 transition-all"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.accent} rounded-full blur-2xl pointer-events-none`} />

                      <div className="space-y-3 relative z-10">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-2xl border ${cat.iconBg} shadow-xs`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60">
                            {cat.subtitle}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#6366F1] transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {cat.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 relative z-10">
                        <span className="text-[#6366F1] inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 cursor-pointer group-hover:translate-x-1 transition-transform">
                          View Archive
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Main History Timeline Stream */}
            <div className="space-y-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Activity History Stream
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Chronological record of past interactions, model generations, and prompt queries.
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [&-webkit-scrollbar]:hidden scroll-smooth">
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
                              background: "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)",
                              borderColor: "transparent",
                              color: "#FFFFFF",
                            }
                          : {}
                      }
                      className={`h-9 px-4 sm:px-5 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap border cursor-pointer shrink-0 ${
                        isActive
                          ? "shadow-md shadow-[#FF6B00]/20"
                          : "bg-white dark:bg-[#111115] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Session Cards List */}
              <div className="space-y-6 w-full">
                {(["Today", "Yesterday", "Earlier"] as const).map((day) => {
                  const items = grouped[day];
                  if (!items || items.length === 0) return null;

                  return (
                    <div key={day} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                          {day.toUpperCase()}
                        </span>
                        <div className="h-px flex-1 bg-slate-200/80 dark:border-slate-800/80" />
                        <span className="text-[11px] font-mono text-slate-400">
                          {items.length} sessions
                        </span>
                      </div>

                      <div className="space-y-3">
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
                                className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-[#6366F1]/50 transition-all p-4 sm:p-5 cursor-pointer bg-white dark:bg-[#111115] space-y-3 shadow-xs relative group"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3.5 min-w-0">
                                    <div className={`p-3 rounded-2xl border ${session.iconBg} shrink-0 mt-0.5 shadow-xs`}>
                                      <Icon className={`w-4 h-4 ${session.iconColor}`} />
                                    </div>
                                    <div className="min-w-0 space-y-1">
                                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#6366F1] transition-colors truncate">
                                        {session.title}
                                      </h4>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                        {session.desc}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-mono">
                                      {session.status}
                                    </span>
                                    <MoreVertical className="w-4 h-4 text-slate-400 hidden sm:block" />
                                  </div>
                                </div>

                                <div className="space-y-2 pt-1">
                                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${session.lineColor}`}
                                      style={{
                                        width: `${Math.min(
                                          session.executionMs / 30,
                                          100
                                        )}%`,
                                      }}
                                    />
                                  </div>

                                  <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                                    <span className="flex items-center gap-1.5">
                                      <Clock className="w-3 h-3 text-[#6366F1]" />
                                      Recorded at {session.time}
                                    </span>
                                    <span className="text-[#6366F1] font-semibold hover:underline flex items-center gap-1">
                                      {session.status === "Completed" ? "View Report" : "View Details"} →
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
                  <div className="w-full py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111115]">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      No history entries found
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setHeaderSearchTerm("");
                        setActiveTab("All");
                      }}
                      className="mt-4 px-4 py-2 text-xs font-medium rounded-2xl text-white bg-[#6366F1] hover:opacity-90 transition shadow-sm cursor-pointer"
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

      {/* Global Root Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-lg rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111115] p-6 shadow-2xl space-y-6 relative pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1]">
                    <HistoryIcon className="w-5 h-5" />
                  </div>
                  History Session Record
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className={`p-3.5 rounded-2xl border ${selectedSession.iconBg} shrink-0 shadow-xs`}>
                    <selectedSession.toolIcon className={`w-6 h-6 ${selectedSession.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {selectedSession.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Recorded on {selectedSession.day} at {selectedSession.time} •{" "}
                      <span className="text-[#6366F1] font-semibold">
                        {selectedSession.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Engine Category & Tag
                  </span>
                  <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-300 font-mono flex-wrap">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                      {selectedSession.tool}
                    </span>
                    <span className="text-[#6366F1] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 font-semibold">
                      #{selectedSession.tag}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Archive Metrics
                  </span>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#18181C] space-y-2.5 font-mono text-xs border border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Tokens Utilized:</span>
                      <span className="text-[#6366F1] font-semibold">
                        {selectedSession.tokens}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Processing Latency:</span>
                      <span className="font-semibold text-emerald-500">
                        {selectedSession.executionMs}ms
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Saved Prompt Summary & Output
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#18181C] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                    {selectedSession.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ background: "linear-gradient(135deg, #FF6B00 0%, #EC3678 100%)" }}
                  className="w-full py-3 rounded-2xl hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-[#FF6B00]/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export History Log
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPage;
