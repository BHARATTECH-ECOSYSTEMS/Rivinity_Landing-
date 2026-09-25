"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SidebarShell from "@/components/canvas/SidebarShell";
import { toast } from "sonner";
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
  Search,
  Star,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ChevronDown,
  SlidersHorizontal,
  Flame,
  Zap,
  ArrowRight,
  Filter,
} from "lucide-react";

export type SessionItem = {
  id: string;
  time: string;
  dateStr: string;
  day: "Today" | "Yesterday" | "Earlier";
  title: string;
  desc: string;
  prompt: string;
  response: string;
  tool: string;
  toolPath: string;
  model: string;
  toolIcon: typeof MessageSquare;
  iconBg: string;
  iconColor: string;
  tag: string;
  tokens: string;
  executionMs: number;
  status: "Completed" | "Running" | "Scheduled";
  favorite?: boolean;
};

const initialSessions: SessionItem[] = [
  {
    id: "1",
    time: "10:30 AM",
    dateStr: "Sep 25, 2026",
    day: "Today",
    title: "Quantum Computing Benchmark & Surface Code Review",
    desc: "Analyzed fault-tolerant physical qubits, benchmarked surface code thresholds, and synthesized 12 vendor whitepapers into an executive summary.",
    prompt: "Provide a comprehensive benchmark comparing superconducting vs trapped-ion physical qubits, with surface code error thresholds and 2026 roadmap feasibility.",
    response: `### Executive Quantum Architecture Summary (2026)

1. **Surface Code Thresholds**: Physical error rates have crossed the $10^{-3}$ threshold required for fault-tolerant logical memory.
2. **Coherence Metrics**:
   - Superconducting: $T_1 = 180\\mu s$, 2-qubit gate fidelity $99.85\\%$
   - Trapped-Ion: Coherence time $> 100s$, 2-qubit fidelity $99.91\\%$
3. **Roadmap**: Commercial quantum advantage for material chemistry simulation is projected for late 2027.`,
    tool: "AI Chat",
    toolPath: "/app",
    model: "Rivinity Omni-3.5",
    toolIcon: MessageSquare,
    iconBg: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    tag: "Research",
    tokens: "48,290",
    executionMs: 820,
    status: "Completed",
    favorite: true,
  },
  {
    id: "2",
    time: "09:15 AM",
    dateStr: "Sep 25, 2026",
    day: "Today",
    title: "Clean Tech & Sodium-ion Battery Production Roadmap",
    desc: "Scraped 43 market reports on cell energy densities, cathode raw material supply chains, and drafted manufacturing cost curves.",
    prompt: "Synthesize latest 2026 market developments on sodium-ion battery mass production, focusing on cathode chemistry (Prussian blue vs layered oxides) and cost per kWh.",
    response: `### Sodium-Ion Production Analysis

- **Pack-Level Cost**: Dropped to $44/kWh in Q3 2026, a 38% discount compared to LFP.
- **Energy Density**: Layered transition metal oxides achieved $165 Wh/kg$ in production cells.
- **Supply Chain Independence**: Zero reliance on nickel, cobalt, or lithium carbonate.`,
    tool: "Web Search",
    toolPath: "/app",
    model: "Deep Search v2",
    toolIcon: Globe,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    tag: "Market Intel",
    tokens: "18,440",
    executionMs: 1420,
    status: "Completed",
  },
  {
    id: "3",
    time: "08:45 AM",
    dateStr: "Sep 25, 2026",
    day: "Today",
    title: "SaaS Analytics Dashboard & Interactive Wireframe",
    desc: "Generated responsive Next.js components, glassmorphism telemetry widgets, live charts, and dark mode toggles.",
    prompt: "Build a production-ready SaaS dashboard in React and Tailwind with MRR metrics, customer retention cohort heatmap, and user activity feeds.",
    response: `Generated 4 components:
1. \`TelemetryOverviewGrid.tsx\` — KPI stat cards with trend sparklines
2. \`CohortRetentionTable.tsx\` — 12-month cohort churn heatmap
3. \`LiveActivityStream.tsx\` — real-time WebSocket subscriber feed`,
    tool: "App Builder",
    toolPath: "/appbuilder",
    model: "Rivinity Coder Pro",
    toolIcon: Layout,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    tag: "Design & Code",
    tokens: "92,100",
    executionMs: 2340,
    status: "Running",
  },
  {
    id: "4",
    time: "06:20 PM",
    dateStr: "Sep 24, 2026",
    day: "Yesterday",
    title: "Customer Retention & Cohort Churn Vector Analysis",
    desc: "Executed analytical queries over Snowflake telemetry warehouse with 90-day retention curves and payback metrics.",
    prompt: "Query user retention tables for users onboarded in Q1 2026. Calculate week-over-week engagement drop-off and identify top churn indicators.",
    response: `Telemetry query executed in 430ms across 4.2M rows.
Key finding: Users who set up Slack notifications within 48 hours show 3.4x higher 90-day retention.`,
    tool: "AI Chat",
    toolPath: "/app",
    model: "Rivinity Omni-3.5",
    toolIcon: Database,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    tag: "Analytics",
    tokens: "6,210",
    executionMs: 430,
    status: "Completed",
  },
  {
    id: "5",
    time: "04:10 PM",
    dateStr: "Sep 24, 2026",
    day: "Yesterday",
    title: "Studio Voiceover: Keynote Product Launch Script v3",
    desc: "Rendered studio-grade voiceover audio track with emotional cadence matching the keynote presentation tempo.",
    prompt: "Generate an energetic, confident product narrative voiceover in English (US) with subtle pauses for on-screen feature reveals.",
    response: `Generated 94 seconds studio audio master:
- Format: 48kHz / 24-bit WAV
- Voice: Marcus (Executive Narrative)
- Cadence: 138 words per minute`,
    tool: "Audio Lab",
    toolPath: "/audio-lab",
    model: "AudioLab WaveGen",
    toolIcon: AudioWaveform,
    iconBg: "bg-pink-500/10 dark:bg-pink-500/20 border-pink-500/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    tag: "Audio Studio",
    tokens: "12,900",
    executionMs: 3100,
    status: "Completed",
    favorite: true,
  },
  {
    id: "6",
    time: "02:00 PM",
    dateStr: "Sep 23, 2026",
    day: "Earlier",
    title: "Study Guide: SVD & Eigenvalue Matrix Decomposition",
    desc: "Extracted proofs, LaTeX formulas, and visual geometric intuition diagrams for high-dimensional dimensionality reduction.",
    prompt: "Create structured study flashcards and concise proofs explaining Singular Value Decomposition ($A = U \\Sigma V^T$) and its connection to PCA.",
    response: `### Singular Value Decomposition (SVD) Reference

Every matrix $A \\in \\mathbb{R}^{m \\times n}$ can be factored as:
$$A = U \\Sigma V^T$$
- $U$: Left singular vectors (eigenvectors of $AA^T$)
- $\\Sigma$: Diagonal singular values
- $V$: Right singular vectors (eigenvectors of $A^TA$)`,
    tool: "RivinityLM",
    toolPath: "/rivinitylm",
    model: "RivinityLM Tutor",
    toolIcon: GraduationCap,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    tag: "Education",
    tokens: "24,800",
    executionMs: 910,
    status: "Completed",
  },
  {
    id: "7",
    time: "11:25 AM",
    dateStr: "Sep 23, 2026",
    day: "Earlier",
    title: "Upscale: Product Hero Banner (4K HDR Output)",
    desc: "Applied super-resolution diffusion model with specular highlight recovery and surface microtexture preservation.",
    prompt: "Upscale product hero banner 4x with sharp typography edge definition and cinematic volumetric lighting fidelity.",
    response: `Upscaled 1080p image to 3840x2160 UHD.
Noise reduction applied: 0.12. Clarity boost: +18%. File size: 4.8MB.`,
    tool: "Image Enhancer",
    toolPath: "/image-enhancer",
    model: "VisionGen Pro",
    toolIcon: ImageIcon,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    tag: "Visuals",
    tokens: "3,100",
    executionMs: 4200,
    status: "Completed",
  },
  {
    id: "8",
    time: "10:10 AM",
    dateStr: "Sep 22, 2026",
    day: "Earlier",
    title: "Stripe Webhook Idempotency Ledger & Retry Engine",
    desc: "Architected distributed Redis lock ledger for webhook deduplication, automated transaction retries, and customer email alerts.",
    prompt: "Write a production TypeScript handler for Stripe customer.subscription.updated and payment_intent.succeeded with Redis idempotency keys.",
    response: `Created idempotent webhook router with exponential backoff retry mechanism and HMAC signature verification.`,
    tool: "App Builder",
    toolPath: "/appbuilder",
    model: "Rivinity Coder Pro",
    toolIcon: Layout,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
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
    id: "cat-1",
    title: "Website Redesign & Wireframes",
    badge: "24 Chats • 12 Files",
    desc: "Archived research, layout blueprints, component design specs, and UX wireframes.",
    filterKey: "App Builder",
    icon: Layout,
    accentBorder: "hover:border-emerald-500/50",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-900/40",
    iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "cat-2",
    title: "Marketing & Growth Strategy",
    badge: "18 Chats • 8 Files",
    desc: "Saved campaign prompts, brand voice guides, positioning playbooks, and competitor teardowns.",
    filterKey: "Web Search",
    icon: Globe,
    accentBorder: "hover:border-cyan-500/50",
    badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200/60 dark:border-cyan-900/40",
    iconBg: "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "cat-3",
    title: "AI Product Research & Spec",
    badge: "32 Chats • 21 Files",
    desc: "Validated feature specifications, latency benchmarks, accuracy evaluations, and market intel.",
    filterKey: "AI Chat",
    icon: Sparkles,
    accentBorder: "hover:border-violet-500/50",
    badgeColor: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200/60 dark:border-violet-900/40",
    iconBg: "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
  },
];

const HistoryPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "tokens">("newest");
  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search input
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

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
    toast.success("Updated favorites!");
  };

  const handleDeleteSession = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
    toast.success("History log deleted");
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportAll = () => {
    const dataStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rivinity-history-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("History exported to JSON successfully!");
  };

  const handleAddNewLog = () => {
    router.push("/app");
  };

  const filtered = useMemo(() => {
    let list = [...sessions];

    if (activeTab === "Favorites") {
      list = list.filter((a) => a.favorite);
    } else if (activeTab !== "All") {
      list = list.filter((a) => a.tool === activeTab);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.desc.toLowerCase().includes(q) ||
          a.tool.toLowerCase().includes(q) ||
          a.tag.toLowerCase().includes(q) ||
          a.prompt.toLowerCase().includes(q)
      );
    }

    if (sortBy === "oldest") {
      list.reverse();
    } else if (sortBy === "tokens") {
      list.sort(
        (a, b) =>
          parseInt(b.tokens.replace(/[^0-9]/g, ""), 10) -
          parseInt(a.tokens.replace(/[^0-9]/g, ""), 10)
      );
    }

    return list;
  }, [sessions, activeTab, query, sortBy]);

  const grouped = useMemo(() => {
    const sections: Record<string, SessionItem[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    filtered.forEach((item) => {
      if (sections[item.day]) {
        sections[item.day].push(item);
      } else {
        sections.Earlier.push(item);
      }
    });

    return sections;
  }, [filtered]);

  // Total tokens computed
  const totalTokensDisplay = useMemo(() => {
    const count = sessions.reduce((acc, s) => {
      return acc + parseInt(s.tokens.replace(/[^0-9]/g, "") || "0", 10);
    }, 0);
    return `${(count / 1000).toFixed(1)}k`;
  }, [sessions]);

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden bg-[#FAF9F7] dark:bg-[#0B0B0E] selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
        <main className="flex-1 h-full min-w-0 overflow-y-auto [scrollbar-width:thin] [-ms-overflow-style:none]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
            {/* Header Hero Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
                    Activity & History
                  </h1>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleExportAll}
                  className="h-9 px-3 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Export history data to JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export Log</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddNewLog}
                  className="h-9 px-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] active:scale-95 text-white text-xs font-semibold shadow-sm shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>New Session</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Pill Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Total Sessions
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {sessions.length}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Tokens Processed
                </div>
                <div className="text-xl font-extrabold text-[#FF6B00] mt-0.5">
                  {totalTokensDisplay}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Starred Items
                </div>
                <div className="text-xl font-extrabold text-amber-500 mt-0.5 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{sessions.filter((s) => s.favorite).length}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Active Models
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  5 Models
                </div>
              </div>
            </div>

            {/* Saved History Collections / Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Saved Workspaces & Collections
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {historyCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setActiveTab(cat.filterKey as any);
                        toast.info(`Filtered by ${cat.filterKey}`);
                      }}
                      className={`group relative rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 p-4 sm:p-4.5 shadow-2xs transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md ${cat.accentBorder}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${cat.iconBg}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md border ${cat.badgeColor}`}>
                            {cat.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors flex items-center justify-between">
                            <span>{cat.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                            {cat.desc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Click to filter</span>
                        <span className="text-[#FF6B00] font-semibold group-hover:underline">
                          View →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Stream Section */}
            <div className="space-y-4 pt-2">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Activity History Stream
                    </h2>
                  </div>

                  {/* Sort Controls */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="h-8 px-2.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer focus:border-[#FF6B00]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="tokens">Highest Tokens</option>
                    </select>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative flex items-center h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 px-3.5 gap-2.5 focus-within:border-[#FF6B00]/70 focus-within:ring-2 focus-within:ring-[#FF6B00]/10 transition-all shadow-2xs">
                  <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 shrink-0" />
                  <input
                    ref={searchInputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search history by prompt, task name, tool, or keywords... (Press '/' to focus)"
                    className="bg-transparent border-none outline-none text-xs sm:text-[13px] flex-1 text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="flex items-center pl-2.5 border-l border-slate-200 dark:border-zinc-800 select-none">
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                      {filtered.length} {filtered.length === 1 ? "session" : "sessions"}
                    </span>
                  </div>
                </div>

                {/* Filter Pills Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    const count =
                      tab === "All"
                        ? sessions.length
                        : tab === "Favorites"
                        ? sessions.filter((s) => s.favorite).length
                        : sessions.filter((s) => s.tool === tab).length;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`h-7.5 px-3 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer select-none ${
                          isActive
                            ? "bg-[#FF6B00] text-white shadow-xs shadow-orange-500/25"
                            : "bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-[#FF6B00] hover:border-orange-500/30 hover:bg-orange-50/20"
                        }`}
                      >
                        {tab === "Favorites" && (
                          <Star className={`w-3 h-3 ${isActive ? "fill-white" : "text-amber-500 fill-amber-500"}`} />
                        )}
                        <span>{tab}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grouped Timeline List */}
              <div className="space-y-4 pt-1">
                {(["Today", "Yesterday", "Earlier"] as const).map((day) => {
                  const items = grouped[day];
                  if (!items || items.length === 0) return null;

                  return (
                    <div key={day} className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                          {day}
                        </span>
                        <div className="h-px flex-1 bg-slate-200/80 dark:border-zinc-800/80" />
                        <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                          {items.length} {items.length === 1 ? "session" : "sessions"}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {items.map((session) => {
                          const Icon = session.toolIcon;
                          return (
                            <div
                              key={session.id}
                              onClick={() => setSelectedSession(session)}
                              className="group relative rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 p-4 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-150 cursor-pointer"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                {/* Left Side: Icon + Details */}
                                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${session.iconBg}`}>
                                    <Icon className={`w-4.5 h-4.5 ${session.iconColor}`} />
                                  </div>

                                  <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                                        {session.tool}
                                      </span>
                                      <h3 className="text-[13.5px] font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors truncate">
                                        {session.title}
                                      </h3>
                                    </div>

                                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                                      {session.desc}
                                    </p>

                                    {/* Metadata Bar */}
                                    <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-zinc-500 pt-1 flex-wrap">
                                      <span className="flex items-center gap-1 font-medium">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        {session.time}
                                      </span>
                                      <span>•</span>
                                      <span className="font-mono text-[11px]">
                                        {session.model}
                                      </span>
                                      <span>•</span>
                                      <span className="font-medium text-slate-600 dark:text-zinc-400">
                                        {session.tokens} tokens
                                      </span>
                                      <span>•</span>
                                      <span>{session.executionMs}ms</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Side: Status & Action Buttons */}
                                <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-800/80">
                                  {/* Status Indicator */}
                                  {session.status === "Completed" ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50">
                                      <Check className="w-3 h-3 stroke-[2.5]" />
                                      Completed
                                    </span>
                                  ) : session.status === "Running" ? (
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                      Running
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                                      Scheduled
                                    </span>
                                  )}

                                  {/* Star Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => handleToggleFavorite(session.id, e)}
                                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                                      session.favorite
                                        ? "border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-500"
                                        : "border-slate-200/90 dark:border-zinc-800 text-slate-400 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-zinc-800"
                                    }`}
                                    title={session.favorite ? "Unstar session" : "Star session"}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${session.favorite ? "fill-amber-500" : ""}`} />
                                  </button>

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteSession(session.id, e)}
                                    className="p-1.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer opacity-70 group-hover:opacity-100"
                                    title="Delete session"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Inspect Arrow */}
                                  <span className="text-xs font-semibold text-[#FF6B00] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pl-1">
                                    <span>Details</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {filtered.length === 0 && (
                  <div className="w-full py-16 text-center rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 text-[#FF6B00] flex items-center justify-center mx-auto">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        No activity found
                      </p>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        Try modifying your search term or select another category filter.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveTab("All");
                      }}
                      className="px-4 py-1.5 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#e05e00] transition-colors cursor-pointer shadow-xs"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Modern Detail Inspector Modal */}
        <AnimatePresence>
          {selectedSession && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSession(null)}
                className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
                className="relative w-full max-w-xl max-h-[85vh] bg-white dark:bg-[#121216] border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-2xl flex flex-col z-10 overflow-hidden"
              >
                {/* Modal Topbar */}
                <div className="px-5 py-3.5 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between bg-slate-50/80 dark:bg-zinc-900/60 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                      <HistoryIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                      Session Inspector
                    </span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-md font-semibold bg-[#FF6B00]/10 text-[#FF6B00]">
                      {selectedSession.tool}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(selectedSession.id, e)}
                      className={`p-1.5 rounded-lg border cursor-pointer ${
                        selectedSession.favorite
                          ? "border-amber-300 bg-amber-50 text-amber-500"
                          : "border-slate-200 dark:border-zinc-700 text-slate-400 hover:text-amber-500"
                      }`}
                      title={selectedSession.favorite ? "Favorited" : "Add to favorites"}
                    >
                      <Star className={`w-3.5 h-3.5 ${selectedSession.favorite ? "fill-amber-500" : ""}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedSession(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 [scrollbar-width:thin]">
                  {/* Header Title */}
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {selectedSession.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                      {selectedSession.desc}
                    </p>
                  </div>

                  {/* Metadata Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pb-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500">Model</div>
                      <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate mt-0.5">{selectedSession.model}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500">Tokens</div>
                      <div className="text-xs font-bold text-[#FF6B00] mt-0.5">{selectedSession.tokens}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500">Duration</div>
                      <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 mt-0.5">{selectedSession.executionMs}ms</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500">Recorded</div>
                      <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 mt-0.5">{selectedSession.time}</div>
                    </div>
                  </div>

                  {/* Prompt Box */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      <span>User Prompt</span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(selectedSession.prompt, "prompt")}
                        className="text-[11px] text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === "prompt" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-normal text-slate-800 dark:text-zinc-200 leading-relaxed">
                      {selectedSession.prompt}
                    </div>
                  </div>

                  {/* Generated Output Box */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      <span>AI Model Response</span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(selectedSession.response, "response")}
                        className="text-[11px] text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === "response" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Output</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800 text-xs font-mono whitespace-pre-wrap text-slate-800 dark:text-zinc-200 leading-relaxed max-h-60 overflow-y-auto">
                      {selectedSession.response}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-2.5 bg-slate-50/80 dark:bg-zinc-900/60 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDeleteSession(selectedSession.id)}
                    className="h-8.5 px-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSession(null)}
                      className="h-8.5 px-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        router.push(selectedSession.toolPath);
                      }}
                      className="h-8.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue in {selectedSession.tool}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
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
