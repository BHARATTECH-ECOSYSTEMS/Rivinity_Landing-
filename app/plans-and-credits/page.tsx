"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownLeft,
  ChevronDown,
  CircleDollarSign,
  Coins,
  Gift,
  Link2,
  Sparkles,
  Zap,
  X,
  Check,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import SidebarShell from "@/components/canvas/SidebarShell";

type Period = "Week" | "Month" | "Year";

type UsageDay = {
  label: string;
  free: number;
  pro: number;
  ad: number;
};

const plans = [
  {
    name: "Free",
    price: "$0",
    detail: "For experimenting and personal side projects",
    credits: "100 Daily credits",
    current: false,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$25",
    detail: "For active developers & engineering power users",
    credits: "$25 monthly + daily pool",
    current: true,
    highlight: true,
  },
  {
    name: "Team",
    price: "$100",
    detail: "For scaling engineering squads shipping together",
    credits: "$100 monthly shared credits",
    current: false,
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "Dedicated infrastructure, SLAs, and custom limits",
    credits: "Flexible volume credit pool",
    current: false,
    highlight: false,
  },
];

const usage = [
  {
    title: "RivinityLM · Advanced code synthesis",
    category: "Pro plan",
    amount: "-$1.24",
    date: "Today, 10:42 AM",
    icon: Sparkles,
  },
  {
    title: "Image generation · 4 ultra-res frames",
    category: "Daily credits",
    amount: "-12 credits",
    date: "Today, 9:18 AM",
    icon: Zap,
  },
  {
    title: "Ad reward · daily streak check-in",
    category: "Ad credits",
    amount: "+5 credits",
    date: "Today, 8:02 AM",
    icon: ArrowDownLeft,
  },
  {
    title: "App Builder · cloud preview environment",
    category: "Pro plan",
    amount: "-$0.86",
    date: "Yesterday, 4:15 PM",
    icon: CircleDollarSign,
  },
  {
    title: "Voice Transcribe · lecture diarization",
    category: "Daily credits",
    amount: "-8 credits",
    date: "Yesterday, 2:30 PM",
    icon: TrendingUp,
  },
];

const referralCode = "GO-RIVINITY";

const weeklyUsage: UsageDay[] = [
  { label: "Mon", free: 22, pro: 35, ad: 9 },
  { label: "Tue", free: 30, pro: 42, ad: 12 },
  { label: "Wed", free: 18, pro: 34, ad: 8 },
  { label: "Thu", free: 28, pro: 55, ad: 14 },
  { label: "Fri", free: 24, pro: 38, ad: 10 },
  { label: "Sat", free: 34, pro: 62, ad: 16 },
  { label: "Sun", free: 26, pro: 44, ad: 11 },
];

const monthlyUsage: UsageDay[] = [
  { label: "Day 1", free: 20, pro: 38, ad: 8 },
  { label: "Day 3", free: 25, pro: 42, ad: 10 },
  { label: "Day 6", free: 18, pro: 34, ad: 7 },
  { label: "Day 9", free: 32, pro: 52, ad: 13 },
  { label: "Day 12", free: 28, pro: 46, ad: 11 },
  { label: "Day 15", free: 22, pro: 40, ad: 9 },
  { label: "Day 18", free: 35, pro: 58, ad: 15 },
  { label: "Day 21", free: 27, pro: 43, ad: 10 },
  { label: "Day 24", free: 21, pro: 37, ad: 8 },
  { label: "Day 27", free: 33, pro: 54, ad: 14 },
  { label: "Day 30", free: 29, pro: 49, ad: 12 },
];

function PlansAndCreditsContent() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("Week");
  const [copied, setCopied] = useState(false);

  const bars = useMemo(
    () => (period === "Week" ? weeklyUsage : monthlyUsage),
    [period]
  );

  const { yearActivity, yearMonths, activityYear } = useMemo(() => {
    const actYear = new Date().getFullYear();
    const start = new Date(actYear, 0, 1);
    const startDay = start.getDay();
    const dayCount =
      (new Date(actYear + 1, 0, 1).getTime() - start.getTime()) / 86400000;
    const weekCount = Math.ceil((startDay + dayCount) / 7);

    const activity = Array.from({ length: weekCount * 7 }, (_, index) => {
      const dayOffset = index - startDay;
      if (dayOffset < 0 || dayOffset >= dayCount) {
        return { index, level: -1, date: null };
      }
      const date = new Date(actYear, 0, dayOffset + 1);
      const activityScore =
        Math.abs(Math.sin((dayOffset + 1) * 12.9898) * 43758.5453) % 1;
      const level =
        activityScore < 0.88
          ? 0
          : activityScore < 0.94
          ? 1
          : activityScore < 0.985
          ? 2
          : 3;
      return { index, level, date };
    });

    const months = Array.from({ length: 12 }, (_, month) => ({
      label: new Date(actYear, month, 1).toLocaleString("en", {
        month: "short",
      }),
    }));

    return { yearActivity: activity, yearMonths: months, activityYear: actYear };
  }, []);

  const copyReferralLink = useCallback(async () => {
    try {
      const url = `${typeof window !== "undefined" ? window.location.origin : "https://rivinity.ai"}/signup?ref=${referralCode}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      toast.error("Failed to copy link");
    }
  }, []);

  return (
    <div className="h-full min-h-0 flex-1 overflow-y-auto bg-[#f8fafc] dark:bg-[#0b0d10] text-slate-900 dark:text-white [scrollbar-width:thin]">
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 pt-16 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-8 lg:py-7">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
              Plans &amp; Credits
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Manage workspace quotas, billing tier limits, and live token usage.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/chat")}
            aria-label="Back to chat"
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 shadow-xs cursor-pointer"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </header>

        <section aria-label="Credit balances" className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <article className="rounded-2xl border border-blue-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-blue-400/20 dark:bg-zinc-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  <span>Free Tier</span>
                  <span className="rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] text-blue-600 dark:text-blue-400">
                    Daily
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    65
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    / 100 credits
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-zinc-800">
                  <div className="h-full w-[65%] rounded-full bg-blue-500" />
                </div>
                <div className="mt-2 text-[11.5px] text-slate-500 dark:text-zinc-400">
                  Resets every 24 hours at 00:00 UTC
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-amber-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-amber-400/20 dark:bg-zinc-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  <span>Ad &amp; Bonus Rewards</span>
                  <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-600 dark:text-amber-400">
                    Earned
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    15
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    / 50 credits
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100 dark:bg-zinc-800">
                  <div className="h-full w-[30%] rounded-full bg-amber-500" />
                </div>
                <div className="mt-2 text-[11.5px] text-slate-500 dark:text-zinc-400">
                  Earn more via daily streaks &amp; invitations
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-pink-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-pink-400/20 dark:bg-zinc-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  <span>Pro Quota</span>
                  <span className="rounded-md bg-pink-500/10 px-1.5 py-0.5 text-[10px] text-pink-600 dark:text-pink-400">
                    Monthly
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    $18.40
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    / $25.00 limit
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100 dark:bg-zinc-800">
                  <div className="h-full w-[74%] rounded-full bg-pink-500" />
                </div>
                <div className="mt-2 text-[11.5px] text-slate-500 dark:text-zinc-400">
                  $6.60 available · Renews on Nov 1
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-orange-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-orange-400/20 dark:bg-zinc-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  <span>Weekly Pace</span>
                  <span className="rounded-md bg-orange-500/10 px-1.5 py-0.5 text-[10px] text-[#FF6B00]">
                    Current Week
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    $5.30
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    / $6.25 target
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100 dark:bg-zinc-800">
                  <div className="h-full w-[85%] rounded-full bg-[#FF6B00]" />
                </div>
                <div className="mt-2 text-[11.5px] text-slate-500 dark:text-zinc-400">
                  $0.95 pacing buffer remaining
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:items-stretch">
          <article className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900 xl:col-span-2 flex flex-col justify-between">
            <div className="flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-3 sm:pb-3.5">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Credit Consumption Analytics
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
                    Track compute, LLM tokens, and API requests across periods.
                  </p>
                </div>

                <div className="relative w-full sm:w-36 shrink-0">
                  <label htmlFor="credit-usage-period" className="sr-only">
                    Select usage period
                  </label>
                  <select
                    id="credit-usage-period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as Period)}
                    className="h-8.5 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-3.5 pr-8 text-xs font-semibold text-slate-700 shadow-xs outline-none focus:border-[#FF6B00] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 cursor-pointer"
                  >
                    <option value="Week">Weekly View</option>
                    <option value="Month">Monthly View</option>
                    <option value="Year">Annual View</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {period === "Year" ? (
                <div className="mt-3.5 flex flex-1 flex-col justify-between min-h-[220px] sm:min-h-[225px]">
                  <div className="overflow-x-auto [scrollbar-width:thin] pb-1 pt-1">
                    <div className="min-w-[620px]">
                      <div className="grid grid-cols-12 text-[10.5px] font-medium text-slate-400 sm:text-xs mb-2">
                        {yearMonths.map((m) => (
                          <span key={m.label}>{m.label}</span>
                        ))}
                      </div>
                      <div
                        className="grid w-full grid-flow-col grid-cols-[repeat(53,minmax(0,1fr))] grid-rows-7 gap-[2.5px] sm:gap-1"
                        aria-label={`Activity grid for ${activityYear}`}
                      >
                        {yearActivity.map(({ index, level, date }) => {
                          const strength =
                            level < 0
                              ? "invisible"
                              : level === 0
                              ? "bg-slate-100 dark:bg-zinc-800"
                              : level === 1
                              ? "bg-emerald-300 dark:bg-emerald-900"
                              : level === 2
                              ? "bg-emerald-500 dark:bg-emerald-700"
                              : "bg-emerald-900 dark:bg-emerald-500";
                          const creditsUsed =
                            level < 1 ? 0 : [0, 3, 10, 25][level];
                          const dateLabel = date?.toLocaleDateString("en", {
                            month: "short",
                            day: "numeric",
                          });
                          return (
                            <span
                              key={index}
                              title={
                                dateLabel
                                  ? `${dateLabel}: ${creditsUsed} credits used`
                                  : undefined
                              }
                              className={`aspect-square min-w-0 rounded-[2px] sm:rounded-[3px] transition-transform hover:scale-125 ${strength}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-end gap-2 border-t border-slate-100 dark:border-zinc-800/80 pt-2.5 text-[11px] text-slate-500 dark:text-zinc-400">
                    <span>Low</span>
                    <i className="h-2.5 w-2.5 rounded-xs bg-slate-100 dark:bg-zinc-800" />
                    <i className="h-2.5 w-2.5 rounded-xs bg-emerald-300 dark:bg-emerald-900" />
                    <i className="h-2.5 w-2.5 rounded-xs bg-emerald-500 dark:bg-emerald-700" />
                    <i className="h-2.5 w-2.5 rounded-xs bg-emerald-900 dark:bg-emerald-500" />
                    <span>High</span>
                  </div>
                </div>
              ) : (
                <div className="mt-3.5 flex flex-1 flex-col justify-between min-h-[220px] sm:min-h-[225px]">
                  <div className="h-32 sm:h-36 flex items-end gap-2 sm:gap-3.5 px-1">
                    {bars.map((day, idx) => {
                      const total = day.free + day.pro + day.ad;
                      const heightPct = Math.min(100, (total / 115) * 100);
                      return (
                        <div
                          key={day.label}
                          className="group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end cursor-pointer"
                        >
                          {/* Compact light-mode hover breakdown tooltip on the right side near the bar */}
                          <div
                            className={`pointer-events-none absolute z-40 opacity-0 group-hover:opacity-100 transition-all duration-150 scale-95 group-hover:scale-100 rounded-lg bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 p-2 shadow-lg shadow-slate-200/80 dark:shadow-black/50 border border-slate-200/90 dark:border-zinc-700 text-[10.5px] whitespace-nowrap min-w-[105px] top-4 ${
                              idx >= bars.length - 2
                                ? "right-[calc(50%+10px)] sm:right-[calc(50%+14px)]"
                                : "left-[calc(50%+10px)] sm:left-[calc(50%+14px)]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2.5 font-bold pb-1 border-b border-slate-100 dark:border-zinc-700/80 text-slate-900 dark:text-white">
                              <span>{day.label}</span>
                              <span className="font-mono text-xs text-slate-900 dark:text-white">
                                {total}
                              </span>
                            </div>
                            <div className="mt-1 space-y-0.5 text-[10px]">
                              <div className="flex items-center justify-between gap-2 text-slate-600 dark:text-zinc-400">
                                <span className="flex items-center gap-1.5">
                                  <i className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                  Free Pool
                                </span>
                                <span className="font-mono font-semibold text-slate-800 dark:text-zinc-200">{day.free}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2 text-slate-600 dark:text-zinc-400">
                                <span className="flex items-center gap-1.5">
                                  <i className="h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
                                  Pro Quota
                                </span>
                                <span className="font-mono font-semibold text-slate-800 dark:text-zinc-200">{day.pro}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2 text-slate-600 dark:text-zinc-400">
                                <span className="flex items-center gap-1.5">
                                  <i className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                                  Ad Rewards
                                </span>
                                <span className="font-mono font-semibold text-slate-800 dark:text-zinc-200">{day.ad}</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className="flex w-full max-w-12 flex-col-reverse overflow-hidden rounded-t-lg bg-slate-100 dark:bg-zinc-800 transition-all duration-300 group-hover:brightness-105"
                            style={{ height: `${heightPct}%` }}
                          >
                            <div
                              className="bg-blue-500 hover:brightness-110 transition-colors"
                              style={{ height: `${(day.free / total) * 100}%` }}
                            />
                            <div
                              className="bg-pink-500 hover:brightness-110 transition-colors"
                              style={{ height: `${(day.pro / total) * 100}%` }}
                            />
                            <div
                              className="bg-amber-400 hover:brightness-110 transition-colors"
                              style={{ height: `${(day.ad / total) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 sm:gap-3.5 text-center text-[10px] sm:text-[11.5px] font-mono text-slate-400 dark:text-zinc-500 px-1">
                    {bars.map((day) => (
                      <span key={day.label} className="min-w-0 flex-1 truncate">
                        {day.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 dark:border-zinc-800/80 pt-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <span className="flex items-center gap-2">
                      <i className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                      Free Pool
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                      Pro Quota
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      Ad Rewards
                    </span>
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900 flex flex-col justify-between">
            <div className="relative h-24 sm:h-28 shrink-0 overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #FF6B00 0%, #FF822E 28%, #FFAA6B 58%, #FFD7BA 82%, #FFFFFF 100%)",
                }}
              />
              <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(180deg,#FF6B00_0%,rgba(255,107,0,0.75)_28%,rgba(255,130,46,0.38)_58%,rgba(255,170,107,0.12)_82%,transparent_100%)]" />

              {/* 12-point white starburst matching reference image */}
              <svg
                className="relative z-10 h-13 w-13 sm:h-15 sm:w-15 text-white drop-shadow-sm transition-transform duration-300 hover:scale-110"
                viewBox="0 0 100 100"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="50,12 55.44,29.72 69,17.09 64.85,35.15 82.91,31 70.28,44.56 88,50 70.28,55.44 82.91,69 64.85,64.85 69,82.91 55.44,70.28 50,88 44.56,70.28 31,82.91 35.15,64.85 17.09,69 29.72,55.44 12,50 29.72,44.56 17.09,31 35.15,35.15 31,17.09 44.56,29.72" />
              </svg>
            </div>

            <div className="p-4 sm:p-5 pt-2 sm:pt-2.5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Invite &amp; Earn Credits
                  </h3>
                  <div className="mt-0.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Referral Rewards Program
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-[#FF6B00]">
                      <Link2 className="h-3.5 w-3.5" />
                    </span>
                    <span>Share your unique invite link with peers</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-[#FF6B00]">
                      <Gift className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      Friend receives <strong>30 free credits</strong> upon sign-up
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-[#FF6B00]">
                      <Coins className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      You earn <strong>30 credits</strong> deposited instantly
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                <label
                  htmlFor="referral-link"
                  className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-zinc-400"
                >
                  Your referral link:
                </label>
                <div className="flex h-10 items-center gap-2 rounded-2xl bg-slate-100 p-1.5 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
                  <Link2 className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="referral-link"
                    readOnly
                    value={`rivinity.ai/signup?ref=${referralCode}`}
                    className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-xs font-mono text-slate-800 dark:text-zinc-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={copyReferralLink}
                    className="flex items-center gap-1.5 h-7.5 shrink-0 rounded-xl bg-[#FF6B00] px-3.5 text-xs font-semibold text-white transition hover:bg-[#E66000] cursor-pointer shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section aria-label="Available plans" className="space-y-4">
          <article className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Available Membership Plans
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Flexible plans built for independent creators and expanding organizations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all ${
                    plan.current
                      ? "border-[#FF6B00] bg-orange-50/50 dark:bg-orange-500/5 shadow-xs ring-1 ring-[#FF6B00]/30"
                      : "border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {plan.name}
                        </span>
                        {plan.current && (
                          <span className="rounded-md bg-[#FF6B00] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          {plan.price}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-normal">
                          {plan.name !== "Enterprise" ? "/mo" : ""}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed min-h-[36px]">
                      {plan.detail}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 space-y-3">
                    <div className="text-xs font-semibold text-[#FF6B00]">
                      {plan.credits}
                    </div>

                    <button
                      type="button"
                      disabled={plan.current}
                      onClick={() =>
                        toast.info(
                          plan.current
                            ? "This is your active tier."
                            : `Selected ${plan.name} tier. Proceeding to checkout...`
                        )
                      }
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        plan.current
                          ? "bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-default"
                          : "bg-slate-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-[#FF6B00] dark:hover:bg-[#FF6B00] dark:hover:text-white shadow-xs"
                      }`}
                    >
                      {plan.current ? "Active Tier" : `Upgrade to ${plan.name}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section aria-label="Recent credit activity">
          <article className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Recent Credit Ledger
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Itemized real-time log of inferences, builds, and bonus grants.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {usage.map((entry) => {
                const Icon = entry.icon;
                const isEarned = entry.amount.startsWith("+");
                return (
                  <div
                    key={entry.title}
                    className="flex items-center gap-3.5 py-3 hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 px-2 -mx-2 rounded-xl transition-colors"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isEarned
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {entry.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                        {entry.category} · {entry.date}
                      </div>
                    </div>
                    <span
                      className={`whitespace-nowrap text-xs sm:text-sm font-bold font-mono ${
                        isEarned
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-800 dark:text-zinc-200"
                      }`}
                    >
                      {entry.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default function PlansAndCreditsPage() {
  return (
    <SidebarShell>
      <PlansAndCreditsContent />
    </SidebarShell>
  );
}
