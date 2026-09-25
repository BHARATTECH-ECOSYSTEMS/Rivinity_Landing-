"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
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
  History as HistoryIcon,
  Download,
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
  CheckSquare,
  Square,
  AlertCircle,
  Code2,
  Table as TableIcon,
  LayoutGrid,
  FileJson,
  FileSpreadsheet,
  RefreshCw,
  Cpu,
  Coins,
  ShieldAlert,
} from "lucide-react";

export type SessionItem = {
  id: string;
  traceId: string;
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
  toolIcon: any;
  iconBg: string;
  iconColor: string;
  tag: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: string;
  executionMs: number;
  ttftMs: number;
  temperature: number;
  status: "Completed" | "Running" | "Failed" | "Cached";
  errorMessage?: string;
  favorite?: boolean;
};

const initialSessions: SessionItem[] = [
  {
    id: "1",
    traceId: "tr_9f2a0e41",
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
    promptTokens: 18400,
    completionTokens: 29890,
    totalTokens: 48290,
    cost: "$0.048",
    executionMs: 820,
    ttftMs: 140,
    temperature: 0.7,
    status: "Completed",
    favorite: true,
  },
  {
    id: "2",
    traceId: "tr_5b11a9cd",
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
    promptTokens: 6200,
    completionTokens: 12240,
    totalTokens: 18440,
    cost: "$0.022",
    executionMs: 1420,
    ttftMs: 310,
    temperature: 0.4,
    status: "Completed",
  },
  {
    id: "3",
    traceId: "tr_78cb123e",
    time: "08:45 AM",
    dateStr: "Sep 25, 2026",
    day: "Today",
    title: "SaaS Analytics Dashboard & Interactive Wireframe",
    desc: "Generated responsive Next.js components, glassmorphism telemetry widgets, live charts, and dark mode toggles.",
    prompt: "Build a production-ready SaaS dashboard in React and Tailwind with MRR metrics, customer retention cohort heatmap, and user activity feeds.",
    response: `Generated 4 components:
1. \`TelemetryOverviewGrid.tsx\` — KPI stat cards with trend sparklines
2. \`CohortRetentionTable.tsx\` — 12-month cohort churn heatmap
3. \`LiveActivityStream.tsx\` — real-time WebSocket subscriber feed
4. \`RevenueProjectionsChart.tsx\` — SVG Area chart with interactive tooltip`,
    tool: "App Builder",
    toolPath: "/appbuilder",
    model: "Rivinity Coder Pro",
    toolIcon: Layout,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    tag: "Design & Code",
    promptTokens: 38100,
    completionTokens: 54000,
    totalTokens: 92100,
    cost: "$0.092",
    executionMs: 2340,
    ttftMs: 210,
    temperature: 0.2,
    status: "Running",
  },
  {
    id: "4",
    traceId: "tr_c9402abf",
    time: "06:20 PM",
    dateStr: "Sep 24, 2026",
    day: "Yesterday",
    title: "Customer Retention & Cohort Churn Vector Analysis",
    desc: "Executed analytical queries over Snowflake telemetry warehouse with 90-day retention curves and payback metrics.",
    prompt: "Query user retention tables for users onboarded in Q1 2026. Calculate week-over-week engagement drop-off and identify top churn indicators.",
    response: `Telemetry query executed in 430ms across 4.2M rows.
Key finding: Users who set up Slack notifications within 48 hours show 3.4x higher 90-day retention. Top predictor of expansion is API key generation within Day 7.`,
    tool: "AI Chat",
    toolPath: "/app",
    model: "Rivinity Omni-3.5",
    toolIcon: Database,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    tag: "Analytics",
    promptTokens: 2400,
    completionTokens: 3810,
    totalTokens: 6210,
    cost: "$0.006",
    executionMs: 430,
    ttftMs: 95,
    temperature: 0.3,
    status: "Completed",
  },
  {
    id: "5",
    traceId: "tr_a1290bb3",
    time: "04:10 PM",
    dateStr: "Sep 24, 2026",
    day: "Yesterday",
    title: "Studio Voiceover: Keynote Product Launch Script v3",
    desc: "Rendered studio-grade voiceover audio track with emotional cadence matching the keynote presentation tempo.",
    prompt: "Generate an energetic, confident product narrative voiceover in English (US) with subtle pauses for on-screen feature reveals.",
    response: `Generated 94 seconds studio audio master:
- Format: 48kHz / 24-bit WAV
- Voice: Marcus (Executive Narrative)
- Cadence: 138 words per minute
- Audio dynamic range: -14 LUFS integrated`,
    tool: "Audio Lab",
    toolPath: "/audio-lab",
    model: "AudioLab WaveGen",
    toolIcon: AudioWaveform,
    iconBg: "bg-pink-500/10 dark:bg-pink-500/20 border-pink-500/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    tag: "Audio Studio",
    promptTokens: 4100,
    completionTokens: 8800,
    totalTokens: 12900,
    cost: "$0.038",
    executionMs: 3100,
    ttftMs: 450,
    temperature: 0.6,
    status: "Completed",
    favorite: true,
  },
  {
    id: "6",
    traceId: "tr_60bcde89",
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
    promptTokens: 8400,
    completionTokens: 16400,
    totalTokens: 24800,
    cost: "$0.024",
    executionMs: 910,
    ttftMs: 120,
    temperature: 0.5,
    status: "Completed",
  },
  {
    id: "7",
    traceId: "tr_8820f124",
    time: "11:25 AM",
    dateStr: "Sep 23, 2026",
    day: "Earlier",
    title: "Upscale: Product Hero Banner (4K HDR Output)",
    desc: "Applied super-resolution diffusion model with specular highlight recovery and surface microtexture preservation.",
    prompt: "Upscale product hero banner 4x with sharp typography edge definition and cinematic volumetric lighting fidelity.",
    response: `Upscaled 1080p image to 3840x2160 UHD.
Noise reduction applied: 0.12. Clarity boost: +18%. File size: 4.8MB. Latent upscaler pass completed in 4.2 seconds.`,
    tool: "Image Enhancer",
    toolPath: "/image-enhancer",
    model: "VisionGen Pro",
    toolIcon: ImageIcon,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    tag: "Visuals",
    promptTokens: 1100,
    completionTokens: 2000,
    totalTokens: 3100,
    cost: "$0.040",
    executionMs: 4200,
    ttftMs: 650,
    temperature: 0.3,
    status: "Completed",
  },
  {
    id: "8",
    traceId: "tr_3391d87a",
    time: "10:10 AM",
    dateStr: "Sep 22, 2026",
    day: "Earlier",
    title: "Stripe Webhook Idempotency Ledger & Retry Engine",
    desc: "Architected distributed Redis lock ledger for webhook deduplication, automated transaction retries, and customer email alerts.",
    prompt: "Write a production TypeScript handler for Stripe customer.subscription.updated and payment_intent.succeeded with Redis idempotency keys.",
    response: `Created idempotent webhook router with exponential backoff retry mechanism and HMAC signature verification. Included unit test suite and distributed concurrency guards.`,
    tool: "App Builder",
    toolPath: "/appbuilder",
    model: "Rivinity Coder Pro",
    toolIcon: Layout,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    tag: "DevOps",
    promptTokens: 14200,
    completionTokens: 24500,
    totalTokens: 38700,
    cost: "$0.038",
    executionMs: 1150,
    ttftMs: 160,
    temperature: 0.2,
    status: "Completed",
  },
  {
    id: "9",
    traceId: "tr_4421b901",
    time: "08:12 PM",
    dateStr: "Sep 21, 2026",
    day: "Earlier",
    title: "Autonomous Agent: Enterprise Competitor Financial Ratios",
    desc: "Autonomous workflow crawler failed due to upstream Cloudflare Turnstile rate limiting on target SEC filings portal.",
    prompt: "Trigger financial scraping agent across 14 enterprise cloud providers to compute trailing 12-month net dollar retention rates.",
    response: `Execution aborted at Step 4/12.
Error: Upstream endpoint returned HTTP 429 (Too Many Requests). Cloudflare managed challenge detected. Retrying with residential proxy pool recommended.`,
    tool: "AI Chat",
    toolPath: "/app",
    model: "Rivinity Omni-3.5",
    toolIcon: MessageSquare,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    tag: "Agent Task",
    promptTokens: 12000,
    completionTokens: 800,
    totalTokens: 12800,
    cost: "$0.012",
    executionMs: 3800,
    ttftMs: 240,
    temperature: 0.4,
    status: "Failed",
    errorMessage: "HTTP 429: Upstream rate limit exceeded at SEC data endpoint.",
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

const allModels = [
  "All Models",
  "Rivinity Omni-3.5",
  "Rivinity Coder Pro",
  "Deep Search v2",
  "AudioLab WaveGen",
  "RivinityLM Tutor",
  "VisionGen Pro",
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

const STORAGE_KEY = "rivinity_history_sessions";

export const HistoryPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Running" | "Failed">("All");
  const [modelFilter, setModelFilter] = useState<string>("All Models");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "tokens" | "latency">("newest");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [isHydrated, setIsHydrated] = useState(false);

  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  const [activeInspectTab, setActiveInspectTab] = useState<"overview" | "prompt" | "response" | "json">("overview");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Restore from localStorage after client hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const restored = parsed.map((item: any) => {
            let IconComponent = MessageSquare;
            if (item.tool === "Web Search") IconComponent = Globe;
            else if (item.tool === "App Builder") IconComponent = Layout;
            else if (item.tool === "Audio Lab") IconComponent = AudioWaveform;
            else if (item.tool === "RivinityLM") IconComponent = GraduationCap;
            else if (item.tool === "Image Enhancer") IconComponent = ImageIcon;
            else if (item.tag === "Analytics") IconComponent = Database;
            return { ...item, toolIcon: IconComponent };
          });
          setSessions(restored);
        }
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  // Sync sessions to localStorage (only after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {}
  }, [sessions, isHydrated]);

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
        if (selectedSession) {
          setSelectedSession(null);
        } else {
          setQuery("");
          searchInputRef.current?.blur();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSession]);

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
    if (selectedSession?.id === id) {
      setSelectedSession((prev) => (prev ? { ...prev, favorite: !prev.favorite } : null));
    }
    toast.success("Updated starred items!");
  };

  const handleDeleteSession = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const target = sessions.find((s) => s.id === id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
    toast.success("History log deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          if (target) setSessions((prev) => [target, ...prev]);
        },
      },
    });
  };

  const handleClearAllHistory = () => {
    setSessions([]);
    setSelectedIds([]);
    setSelectedSession(null);
    setIsClearConfirmOpen(false);
    toast.success("All history logs cleared");
  };

  const handleResetSampleData = () => {
    setSessions(initialSessions);
    toast.success("Sample history data restored");
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportJSON = (itemsToExport = filtered) => {
    const dataStr = JSON.stringify(itemsToExport, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rivinity-history-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${itemsToExport.length} sessions to JSON!`);
  };

  const handleExportCSV = (itemsToExport = filtered) => {
    const headers = [
      "ID",
      "TraceID",
      "Date",
      "Time",
      "Title",
      "Tool",
      "Model",
      "TotalTokens",
      "PromptTokens",
      "CompletionTokens",
      "Cost",
      "ExecutionMs",
      "Status",
      "Prompt",
    ];

    const escapeCsv = (str: any) => {
      const text = String(str ?? "").replace(/"/g, '""');
      return `"${text}"`;
    };

    const rows = itemsToExport.map((s) => [
      escapeCsv(s.id),
      escapeCsv(s.traceId),
      escapeCsv(s.dateStr),
      escapeCsv(s.time),
      escapeCsv(s.title),
      escapeCsv(s.tool),
      escapeCsv(s.model),
      s.totalTokens,
      s.promptTokens,
      s.completionTokens,
      escapeCsv(s.cost),
      s.executionMs,
      escapeCsv(s.status),
      escapeCsv(s.prompt),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rivinity-telemetry-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${itemsToExport.length} sessions to CSV!`);
  };

  // Multi-selection handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((s) => s.id));
    }
  };

  const handleToggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = () => {
    setSessions((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    toast.success(`Deleted ${selectedIds.length} items`);
    setSelectedIds([]);
  };

  const handleBatchStar = (star: boolean) => {
    setSessions((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) ? { ...s, favorite: star } : s))
    );
    toast.success(star ? `Starred ${selectedIds.length} items` : `Unstarred ${selectedIds.length} items`);
  };

  const filtered = useMemo(() => {
    let list = [...sessions];

    if (activeTab === "Favorites") {
      list = list.filter((a) => a.favorite);
    } else if (activeTab !== "All") {
      list = list.filter((a) => a.tool === activeTab);
    }

    if (statusFilter !== "All") {
      list = list.filter((a) => a.status === statusFilter);
    }

    if (modelFilter !== "All Models") {
      list = list.filter((a) => a.model === modelFilter);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.desc.toLowerCase().includes(q) ||
          a.tool.toLowerCase().includes(q) ||
          a.tag.toLowerCase().includes(q) ||
          a.model.toLowerCase().includes(q) ||
          a.traceId.toLowerCase().includes(q) ||
          a.prompt.toLowerCase().includes(q)
      );
    }

    if (sortBy === "oldest") {
      list.reverse();
    } else if (sortBy === "tokens") {
      list.sort((a, b) => b.totalTokens - a.totalTokens);
    } else if (sortBy === "latency") {
      list.sort((a, b) => b.executionMs - a.executionMs);
    }

    return list;
  }, [sessions, activeTab, statusFilter, modelFilter, query, sortBy]);

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

  // Aggregate KPI metrics
  const stats = useMemo(() => {
    const totalCount = sessions.length;
    const totalTokens = sessions.reduce((acc, s) => acc + s.totalTokens, 0);
    const totalCostNum = sessions.reduce((acc, s) => {
      const num = parseFloat(s.cost.replace(/[^0-9.]/g, "") || "0");
      return acc + num;
    }, 0);
    const avgLatency =
      totalCount > 0
        ? Math.round(sessions.reduce((acc, s) => acc + s.executionMs, 0) / totalCount)
        : 0;
    const successCount = sessions.filter((s) => s.status === "Completed").length;
    const successRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 100;

    return {
      totalCount,
      totalTokensFormatted: `${(totalTokens / 1000).toFixed(1)}k`,
      totalCostFormatted: `$${totalCostNum.toFixed(3)}`,
      avgLatencyFormatted: `${avgLatency}ms`,
      successRate,
      starredCount: sessions.filter((s) => s.favorite).length,
    };
  }, [sessions]);

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden bg-[#FAF9F7] dark:bg-[#0B0B0E] selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
        <main className="flex-1 h-full min-w-0 overflow-y-auto [scrollbar-width:thin] [-ms-overflow-style:none]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
                    Activity & Execution History
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Telemetry Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Inspect multi-model generation traces, token metrics, latency, and session payloads
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                {/* Export Dropdown Group */}
                <div className="flex items-center rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleExportJSON()}
                    className="h-9 px-3 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Export as JSON"
                  >
                    <FileJson className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span className="hidden sm:inline">JSON</span>
                  </button>
                  <div className="w-px h-4 bg-slate-200 dark:bg-zinc-800" />
                  <button
                    type="button"
                    onClick={() => handleExportCSV()}
                    className="h-9 px-3 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Export as CSV"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="hidden sm:inline">CSV</span>
                  </button>
                </div>

                {/* Clear History Trigger */}
                <button
                  type="button"
                  onClick={() => setIsClearConfirmOpen(true)}
                  className="h-9 px-3 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 text-slate-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Clear all logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>

                {/* New Session Button */}
                <button
                  type="button"
                  onClick={() => router.push("/app")}
                  className="h-9 px-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] active:scale-95 text-white text-xs font-semibold shadow-sm shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>New Session</span>
                </button>
              </div>
            </div>

            {/* AI SaaS Telemetry KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  <span>Total Invocations</span>
                  <HistoryIcon className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stats.totalCount}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {stats.successRate}% Success
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  <span>Tokens Processed</span>
                  <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-[#FF6B00]">
                    {stats.totalTokensFormatted}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">tokens</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  <span>Compute Usage</span>
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stats.totalCostFormatted}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">est. cost</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  <span>Avg Latency</span>
                  <Zap className="w-3.5 h-3.5 text-cyan-500" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stats.avgLatencyFormatted}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Sub-second
                  </span>
                </div>
              </div>
            </div>

            {/* Saved Workspaces & Curated Collections */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Curated Workspaces & History Collections
                </h2>
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

            {/* Filter & Search Toolbar */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Telemetry Stream
                  </h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                    {filtered.length} of {sessions.length}
                  </span>
                </div>

                {/* View Switcher & Sort Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* View Mode Toggle */}
                  <div className="flex items-center p-0.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setViewMode("cards")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "cards"
                          ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300"
                      }`}
                      title="Card View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("table")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "table"
                          ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300"
                      }`}
                      title="Table View"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="h-8 px-2.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer focus:border-[#FF6B00]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Running">Running</option>
                    <option value="Failed">Failed</option>
                  </select>

                  {/* Model Filter */}
                  <select
                    value={modelFilter}
                    onChange={(e) => setModelFilter(e.target.value)}
                    className="h-8 px-2.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer focus:border-[#FF6B00] hidden md:inline-block"
                  >
                    {allModels.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  {/* Sort Controls */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="h-8 px-2.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer focus:border-[#FF6B00]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="tokens">Highest Tokens</option>
                    <option value="latency">Highest Latency</option>
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
                  placeholder="Search traces by prompt, title, model, trace ID, or keywords... (Press '/' to focus)"
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
                    {filtered.length} {filtered.length === 1 ? "trace" : "traces"}
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

            {/* Floating Batch Actions Bar (when 1 or more items selected) */}
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  className="sticky top-4 z-30 p-2.5 sm:px-4 rounded-2xl bg-slate-900 dark:bg-zinc-850 text-white shadow-xl flex items-center justify-between gap-3 border border-white/10"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FF6B00] text-white">
                      {selectedIds.length} selected
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleSelectAll}
                      className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
                    >
                      {selectedIds.length === filtered.length ? "Deselect All" : "Select All"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleBatchStar(true)}
                      className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="hidden sm:inline">Star</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExportJSON(sessions.filter((s) => selectedIds.includes(s.id)))}
                      className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Export</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBatchDelete}
                      className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedIds([])}
                      className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MAIN CONTENT: Cards View vs High-Density Table View */}
            {viewMode === "table" ? (
              /* HIGH-DENSITY TABLE VIEW */
              <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-zinc-850/80 border-b border-slate-200/80 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                      <tr>
                        <th className="py-3 px-3.5 w-10">
                          <input
                            type="checkbox"
                            checked={filtered.length > 0 && selectedIds.length === filtered.length}
                            onChange={handleToggleSelectAll}
                            className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
                          />
                        </th>
                        <th className="py-3 px-3">Trace & Task</th>
                        <th className="py-3 px-3">Feature</th>
                        <th className="py-3 px-3">Model</th>
                        <th className="py-3 px-3">Tokens</th>
                        <th className="py-3 px-3">Latency</th>
                        <th className="py-3 px-3">Cost</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/70">
                      {filtered.map((session) => {
                        const Icon = session.toolIcon;
                        const isSelected = selectedIds.includes(session.id);
                        return (
                          <tr
                            key={session.id}
                            onClick={() => setSelectedSession(session)}
                            className={`hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer ${
                              isSelected ? "bg-orange-50/40 dark:bg-orange-950/20" : ""
                            }`}
                          >
                            <td className="py-3 px-3.5" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleToggleSelectOne(session.id, e as any)}
                                className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
                              />
                            </td>

                            <td className="py-3 px-3 max-w-xs sm:max-w-md">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10.5px] text-slate-400 dark:text-zinc-500">
                                  {session.traceId}
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white truncate">
                                  {session.title}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                                {session.prompt}
                              </div>
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[10.5px] bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                                <Icon className="w-3 h-3" />
                                {session.tool}
                              </span>
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-600 dark:text-zinc-400">
                              {session.model}
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {session.totalTokens.toLocaleString()}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {session.promptTokens} in / {session.completionTokens} out
                              </div>
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-zinc-400 font-medium">
                              {session.executionMs}ms
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap font-semibold text-slate-700 dark:text-zinc-300">
                              {session.cost}
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              {session.status === "Completed" ? (
                                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50">
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                  Success
                                </span>
                              ) : session.status === "Running" ? (
                                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  Running
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50">
                                  <AlertCircle className="w-3 h-3" />
                                  Failed
                                </span>
                              )}
                            </td>

                            <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleFavorite(session.id, e)}
                                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                    session.favorite
                                      ? "border-amber-300 bg-amber-50 text-amber-500"
                                      : "border-transparent text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-zinc-800"
                                  }`}
                                  title={session.favorite ? "Unstar" : "Star"}
                                >
                                  <Star className={`w-3.5 h-3.5 ${session.favorite ? "fill-amber-500 text-amber-500" : ""}`} />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteSession(session.id, e)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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
            ) : (
              /* GROUPED TIMELINE CARDS VIEW */
              <div className="space-y-5 pt-1">
                {(["Today", "Yesterday", "Earlier"] as const).map((day) => {
                  const items = grouped[day];
                  if (!items || items.length === 0) return null;

                  return (
                    <div key={day} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                          {day}
                        </span>
                        <div className="h-px flex-1 bg-slate-200/80 dark:bg-zinc-800" />
                        <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                          {items.length} {items.length === 1 ? "trace" : "traces"}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {items.map((session) => {
                          const Icon = session.toolIcon;
                          const isSelected = selectedIds.includes(session.id);
                          return (
                            <div
                              key={session.id}
                              onClick={() => setSelectedSession(session)}
                              className={`group relative rounded-2xl border transition-all duration-150 p-4 shadow-2xs hover:shadow-md cursor-pointer ${
                                isSelected
                                  ? "border-[#FF6B00] bg-orange-50/30 dark:bg-orange-950/20"
                                  : "border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 hover:border-slate-300 dark:hover:border-zinc-700"
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                {/* Left Side: Checkbox + Icon + Details */}
                                <div className="flex items-start gap-3 min-w-0 flex-1">
                                  {/* Select Checkbox */}
                                  <div
                                    onClick={(e) => handleToggleSelectOne(session.id, e)}
                                    className="pt-1.5 shrink-0"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => {}}
                                      className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
                                    />
                                  </div>

                                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${session.iconBg}`}>
                                    <Icon className={`w-4.5 h-4.5 ${session.iconColor}`} />
                                  </div>

                                  <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                                        {session.tool}
                                      </span>
                                      <span className="font-mono text-[10.5px] text-slate-400 dark:text-zinc-500">
                                        {session.traceId}
                                      </span>
                                      <h3 className="text-[13.5px] font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors truncate">
                                        {session.title}
                                      </h3>
                                    </div>

                                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                                      {session.prompt}
                                    </p>

                                    {/* Telemetry Chips Bar */}
                                    <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-zinc-500 pt-1 flex-wrap">
                                      <span className="flex items-center gap-1 font-medium">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        {session.time}
                                      </span>
                                      <span>•</span>
                                      <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-300">
                                        {session.model}
                                      </span>
                                      <span>•</span>
                                      <span className="font-semibold text-slate-700 dark:text-zinc-300">
                                        {session.totalTokens.toLocaleString()} tokens
                                      </span>
                                      <span>•</span>
                                      <span>{session.executionMs}ms</span>
                                      <span>•</span>
                                      <span className="font-semibold text-slate-700 dark:text-zinc-300">{session.cost}</span>
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
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50">
                                      <AlertCircle className="w-3 h-3" />
                                      Failed
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
              </div>
            )}

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="w-full py-16 text-center rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 space-y-3">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 text-[#FF6B00] flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    No traces or sessions match your criteria
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                    Try adjusting your filters, searching for another keyword, or restore the demo telemetry traces.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveTab("All");
                      setStatusFilter("All");
                      setModelFilter("All Models");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#e05e00] transition-colors cursor-pointer shadow-xs"
                  >
                    Reset All Filters
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSampleData}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 cursor-pointer"
                  >
                    Restore Sample Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* COMPREHENSIVE DETAIL INSPECTOR MODAL */}
        <AnimatePresence>
          {selectedSession && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSession(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
                className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#121216] border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-2xl flex flex-col z-10 overflow-hidden"
              >
                {/* Modal Topbar */}
                <div className="px-5 py-3.5 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between bg-slate-50/80 dark:bg-zinc-900/60 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <HistoryIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Trace Inspector</span>
                    </div>
                    <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-md font-bold bg-slate-200/70 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                      {selectedSession.traceId}
                    </span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-md font-bold bg-[#FF6B00]/10 text-[#FF6B00]">
                      {selectedSession.tool}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleFavorite(selectedSession.id)}
                      className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
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

                {/* Inspect Tabs Navigation */}
                <div className="px-5 pt-2 border-b border-slate-100 dark:border-zinc-800/80 flex items-center gap-4 bg-slate-50/40 dark:bg-zinc-900/30 text-xs font-semibold shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveInspectTab("overview")}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 ${
                      activeInspectTab === "overview"
                        ? "border-[#FF6B00] text-[#FF6B00]"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Overview & Telemetry
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInspectTab("prompt")}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 ${
                      activeInspectTab === "prompt"
                        ? "border-[#FF6B00] text-[#FF6B00]"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Prompt & Input
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInspectTab("response")}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 ${
                      activeInspectTab === "response"
                        ? "border-[#FF6B00] text-[#FF6B00]"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Model Output
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInspectTab("json")}
                    className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1 ${
                      activeInspectTab === "json"
                        ? "border-[#FF6B00] text-[#FF6B00]"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Payload JSON</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 [scrollbar-width:thin]">
                  {/* Task Header */}
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {selectedSession.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                      {selectedSession.desc}
                    </p>
                  </div>

                  {/* Error Callout if Failed */}
                  {selectedSession.status === "Failed" && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Execution Failed</div>
                        <div className="mt-0.5 text-[11.5px] opacity-90">{selectedSession.errorMessage || "Unknown execution error"}</div>
                      </div>
                    </div>
                  )}

                  {/* OVERVIEW TAB */}
                  {activeInspectTab === "overview" && (
                    <div className="space-y-4">
                      {/* Telemetry Metric Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Model Name</div>
                          <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate mt-0.5 font-mono">{selectedSession.model}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Total Tokens</div>
                          <div className="text-xs font-bold text-[#FF6B00] mt-0.5">{selectedSession.totalTokens.toLocaleString()}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Total Latency</div>
                          <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 mt-0.5">{selectedSession.executionMs}ms</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Cost</div>
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedSession.cost}</div>
                        </div>
                      </div>

                      {/* Detailed Trace Telemetry Specs */}
                      <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/50 border border-slate-200/80 dark:border-zinc-800/80 space-y-2 text-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trace Specification</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 pt-1 text-[11.5px]">
                          <div>
                            <span className="text-slate-400">Time to First Token: </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">{selectedSession.ttftMs}ms</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Sampling Temperature: </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">{selectedSession.temperature}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Timestamp: </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">{selectedSession.dateStr} {selectedSession.time}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Prompt Tokens: </span>
                            <span className="font-mono text-slate-800 dark:text-zinc-200">{selectedSession.promptTokens.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Completion Tokens: </span>
                            <span className="font-mono text-slate-800 dark:text-zinc-200">{selectedSession.completionTokens.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Status: </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedSession.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Prompt Snapshot */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
                          <span>User Prompt</span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedSession.prompt, "prompt")}
                            className="text-[11px] text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 leading-relaxed max-h-36 overflow-y-auto">
                          {selectedSession.prompt}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROMPT TAB */}
                  {activeInspectTab === "prompt" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        <span>Full Prompt Payload</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(selectedSession.prompt, "prompt")}
                          className="text-xs text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </button>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                        {selectedSession.prompt}
                      </div>
                    </div>
                  )}

                  {/* RESPONSE TAB */}
                  {activeInspectTab === "response" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        <span>Generated Model Response</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(selectedSession.response, "response")}
                          className="text-xs text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Response</span>
                        </button>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                        {selectedSession.response}
                      </div>
                    </div>
                  )}

                  {/* JSON TAB */}
                  {activeInspectTab === "json" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        <span>Telemetry JSON Schema</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(JSON.stringify(selectedSession, null, 2), "payload")}
                          className="text-xs text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy JSON</span>
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto max-h-96 leading-relaxed [scrollbar-width:thin]">
                        {JSON.stringify(selectedSession, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Modal Footer Actions */}
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

        {/* Clear All History Confirmation Modal */}
        <AnimatePresence>
          {isClearConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsClearConfirmOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-sm bg-white dark:bg-[#121216] border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-2xl z-10 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Clear Entire History?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    This will permanently remove all {sessions.length} trace records from your local storage.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsClearConfirmOpen(false)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAllHistory}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Clear All History
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
