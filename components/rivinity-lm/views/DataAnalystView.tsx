"use client";

import { useState } from "react";
import {
  BarChart3,
  Upload,
  Send,
  Table,
  PieChart,
  TrendingUp,
  Download,
  Sparkles,
  FileSpreadsheet,
  Search,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

interface InsightMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const metrics: InsightMetric[] = [
  { label: "Cohort Average Score", value: "84.2%", change: "+3.8%", positive: true },
  { label: "Analyzed Records", value: "2,480", change: "+120", positive: true },
  { label: "Missing Data Entries", value: "0.4%", change: "-1.2%", positive: true },
  { label: "Statistical Outliers", value: "14", change: "+2", positive: false },
];

const chartData = [65, 48, 78, 92, 58, 84, 71, 88, 95, 62, 76, 89];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const initialTableRows = [
  ["Alex K.", "AP Calculus BC", "96%", "92%", "94% (A)"],
  ["Sarah M.", "Cellular Biology", "89%", "95%", "92% (A)"],
  ["James L.", "Classical Physics", "78%", "84%", "81% (B)"],
  ["Emma R.", "Macroeconomics", "94%", "91%", "93% (A)"],
  ["David H.", "Organic Chemistry", "88%", "86%", "87% (B+)"],
];

export default function DataAnalystView() {
  const [query, setQuery] = useState("");
  const [activeChart, setActiveChart] = useState<"bar" | "line" | "pie">("bar");
  const [tableSearch, setTableSearch] = useState("");
  const [queryAnswer, setQueryAnswer] = useState<string | null>(
    "Regression analysis indicates a 0.82 Pearson correlation between homework completion rates and final test scores."
  );

  const handleRunQuery = () => {
    if (!query.trim()) return;
    toast.success("AI SQL/Python analytics query executed!");
    setQueryAnswer(
      `Statistical query executed for "${query.trim()}": Computed standard deviation σ = 4.31 with p-value < 0.001.`
    );
    setQuery("");
  };

  const filteredRows = initialTableRows.filter((r) =>
    r.some((cell) => cell.toLowerCase().includes(tableSearch.toLowerCase()))
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* SUB-HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <BarChart3 className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Data Analyst Pro</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Dataset Active
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Natural language tabular querying, statistical regression & chart synthesis
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast.info("Upload CSV, TSV, or XLSX dataset")}
            className="flex items-center gap-1.5 rounded-xl bg-[#FF6B00] px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-[#E66000] transition-colors shadow-xs"
          >
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload Dataset</span>
          </button>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          {/* STATS TILES SKELETON */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1 shadow-xs"
              >
                <div className="text-[10.5px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-wider truncate">
                  {m.label}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                  {m.value}
                </div>
                <div
                  className={`text-[11px] font-semibold flex items-center gap-1 ${
                    m.positive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500"
                  }`}
                >
                  <span>{m.change}</span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal">vs prev cycle</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI NATURAL LANGUAGE QUERY BAR */}
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRunQuery();
                }}
                placeholder="Ask questions about your data (e.g. Which subject has the highest variance?)..."
                className="flex-1 bg-transparent px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border border-slate-200 dark:border-zinc-800 rounded-xl focus:border-[#FF6B00]"
              />
              <button
                type="button"
                onClick={handleRunQuery}
                disabled={!query.trim()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>Run Analytics</span>
              </button>
            </div>

            {queryAnswer && (
              <div className="flex items-start gap-2 rounded-xl bg-orange-500/5 dark:bg-orange-500/10 p-3 text-[12.5px] text-slate-800 dark:text-zinc-200 border border-orange-500/15">
                <Sparkles className="h-4 w-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{queryAnswer}</span>
              </div>
            )}
          </div>

          {/* CHART VISUALIZER SKELETON */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00]">
                  Performance Distribution
                </div>
                <div className="text-[14px] font-bold text-slate-900 dark:text-zinc-100">
                  Student Cohort Grade Trendlines
                </div>
              </div>

              {/* CHART TYPE BUTTONS */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveChart("bar")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    activeChart === "bar"
                      ? "bg-white dark:bg-zinc-900 text-[#FF6B00] shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  Bar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChart("line")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    activeChart === "line"
                      ? "bg-white dark:bg-zinc-900 text-[#FF6B00] shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  Trend
                </button>
              </div>
            </div>

            {/* BARS SKELETON */}
            <div className="h-48 sm:h-56 flex items-end justify-between gap-1.5 sm:gap-3 pt-4 px-2">
              {chartData.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] text-slate-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {val}%
                  </div>
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-[#FF6B00]/70 to-[#FF6B00] hover:from-[#E66000] hover:to-[#FF6B00] transition-all duration-300"
                    style={{ height: `${val}%` }}
                  />
                  <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                    {monthLabels[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABULAR DATASET SKELETON */}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-[#FF6B00]" />
                <div className="text-[13.5px] font-bold text-slate-900 dark:text-zinc-100">
                  Active Student Grade Records
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/60 px-3 py-1.5 w-full sm:w-64">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Filter records..."
                  className="w-full bg-transparent text-[12px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border-none focus:ring-0"
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto [scrollbar-width:thin]">
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Midterm</th>
                    <th className="py-2.5 px-3">Final</th>
                    <th className="py-2.5 px-3">Overall Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                  {filteredRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-zinc-100">
                        {row[0]}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-zinc-400">{row[1]}</td>
                      <td className="py-3 px-3 font-mono">{row[2]}</td>
                      <td className="py-3 px-3 font-mono">{row[3]}</td>
                      <td className="py-3 px-3 font-semibold text-[#FF6B00]">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}