"use client";

import { useState } from "react";
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
} from "lucide-react";
import SidebarShell from "@/components/canvas/SidebarShell";

type Period = "Week" | "Month" | "Year";

type UsageDay = {
  label: string;
  free: number;
  pro: number;
  ad: number;
};

const plans = [
  { name: "Free", price: "$0", detail: "For trying Rivinity", credits: "Daily credits", current: false },
  { name: "Pro", price: "$25", detail: "For independent builders", credits: "$25 monthly credits", current: true },
  { name: "Team", price: "$100", detail: "For teams shipping together", credits: "$100 monthly credits", current: false },
  { name: "Enterprise", price: "Custom", detail: "For advanced controls", credits: "Flexible credit pool", current: false },
];

const usage = [
  { title: "RivinityLM · Code assistant", category: "Pro plan", amount: "-$1.24", date: "Today, 10:42 AM", icon: Sparkles },
  { title: "Image generation · 4 images", category: "Daily credits", amount: "-12 credits", date: "Today, 9:18 AM", icon: Zap },
  { title: "Ad reward · daily check-in", category: "Ad credits", amount: "+5 credits", date: "Today, 8:02 AM", icon: ArrowDownLeft },
  { title: "App Builder · preview build", category: "Pro plan", amount: "-$0.86", date: "Yesterday", icon: CircleDollarSign },
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
  { label: "1", free: 20, pro: 38, ad: 8 }, { label: "3", free: 25, pro: 42, ad: 10 },
  { label: "5", free: 18, pro: 34, ad: 7 }, { label: "7", free: 32, pro: 52, ad: 13 },
  { label: "9", free: 28, pro: 46, ad: 11 }, { label: "11", free: 22, pro: 40, ad: 9 },
  { label: "13", free: 35, pro: 58, ad: 15 }, { label: "15", free: 27, pro: 43, ad: 10 },
  { label: "17", free: 21, pro: 37, ad: 8 }, { label: "19", free: 33, pro: 54, ad: 14 },
  { label: "21", free: 24, pro: 41, ad: 9 }, { label: "23", free: 29, pro: 49, ad: 12 },
];

const activityYear = new Date().getFullYear();
const activityYearStart = new Date(activityYear, 0, 1);
const activityYearStartDay = activityYearStart.getDay();
const activityYearDayCount = (new Date(activityYear + 1, 0, 1).getTime() - activityYearStart.getTime()) / 86400000;
const activityWeekCount = Math.ceil((activityYearStartDay + activityYearDayCount) / 7);
const yearActivity = Array.from({ length: activityWeekCount * 7 }, (_, index) => {
  const dayOffset = index - activityYearStartDay;
  if (dayOffset < 0 || dayOffset >= activityYearDayCount) {
    return { index, level: -1, date: null };
  }
  const date = new Date(activityYear, 0, dayOffset + 1);
  const activityScore = Math.abs(Math.sin((dayOffset + 1) * 12.9898) * 43758.5453) % 1;
  const level = activityScore < 0.88 ? 0 : activityScore < 0.94 ? 1 : activityScore < 0.985 ? 2 : 3;
  return { index, level, date };
});
const yearMonths = Array.from({ length: 12 }, (_, month) => ({
  label: new Date(activityYear, month, 1).toLocaleString("en", { month: "short" }),
}));

function PlansAndCreditsContent() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("Week");
  const [copied, setCopied] = useState(false);
  const bars = period === "Week" ? weeklyUsage : monthlyUsage;

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${referralCode}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="h-full min-h-0 flex-1 overflow-y-auto bg-[#f5f7fa] text-slate-900 dark:bg-[#0b0d10] dark:text-white">
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5 dark:border-white/10">
          <div>
            <div className="text-3xl font-semibold tracking-tight sm:text-4xl">Plans &amp; Credits</div>
            <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400">Your plan, balances, and credit activity in one place.</p>
          </div>
          <button type="button" onClick={() => router.push("/dashboard")} aria-label="Close Plans and Credits" title="Close" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <X className="h-5 w-5" />
          </button>
        </header>

        <section className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0" aria-label="Credit balances">
          <div className="grid min-w-[820px] grid-cols-4 gap-3 xl:min-w-0">
          <article className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm dark:border-blue-400/20 dark:bg-zinc-900">
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">Free · daily credits</div>
            <div className="mt-3 flex items-baseline gap-1.5"><strong className="text-2xl font-semibold">65</strong><span className="text-xs text-slate-400">/ 100</span></div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-blue-100 dark:bg-zinc-800"><div className="h-full w-[65%] rounded-full bg-blue-500" /></div>
            <div className="mt-2.5 text-xs text-slate-500 dark:text-zinc-400">Resets in 8 hours</div>
          </article>

          <article className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm dark:border-amber-400/20 dark:bg-zinc-900">
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">Ad reward credits</div>
            <div className="mt-3 flex items-baseline gap-1.5"><strong className="text-2xl font-semibold">15</strong><span className="text-xs text-slate-400">/ 50</span></div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-amber-100 dark:bg-zinc-800"><div className="h-full w-[30%] rounded-full bg-amber-500" /></div>
            <div className="mt-2.5 text-xs text-slate-500 dark:text-zinc-400">Earn more from rewards</div>
          </article>

          <article className="rounded-2xl border border-pink-200 bg-white p-4 shadow-sm dark:border-pink-400/20 dark:bg-zinc-900">
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">Pro · monthly</div>
            <div className="mt-3 flex items-baseline gap-1.5"><strong className="text-2xl font-semibold">$18.40</strong><span className="text-xs text-slate-400">/ $25</span></div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-pink-100 dark:bg-zinc-800"><div className="h-full w-[74%] rounded-full bg-pink-500" /></div>
            <div className="mt-2.5 text-xs text-slate-500 dark:text-zinc-400">$6.60 left · renews Oct 1</div>
          </article>

          <article className="rounded-2xl border border-pink-200 bg-white p-4 shadow-sm dark:border-pink-400/20 dark:bg-zinc-900">
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">Pro · this week</div>
            <div className="mt-3 flex items-baseline gap-1.5"><strong className="text-2xl font-semibold">$5.30</strong><span className="text-xs text-slate-400">/ $6.25</span></div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-pink-100 dark:bg-zinc-800"><div className="h-full w-[85%] rounded-full bg-pink-500" /></div>
            <div className="mt-2.5 text-xs text-slate-500 dark:text-zinc-400">$0.95 left this week</div>
          </article>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:items-stretch">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 xl:col-span-2 sm:p-6 xl:flex xl:h-[480px] xl:flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><h2 className="text-base font-semibold">Credit usage</h2><p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">Consumption across your active plan.</p></div>
              <label className="sr-only" htmlFor="credit-usage-period">Usage period</label>
              <div className="relative ml-auto h-10 w-36 shrink-0">
                <select id="credit-usage-period" value={period} onChange={(event) => setPeriod(event.target.value as Period)} className="h-full w-full appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-left text-sm font-semibold leading-none text-slate-700 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 dark:text-zinc-300" />
              </div>
            </div>
            {period === "Year" ? (
              <div className="mt-7 flex w-full flex-1 flex-col justify-center">
                <div className="grid grid-cols-12 text-[10px] text-slate-400 sm:text-xs">
                  {yearMonths.map((month) => <span key={month.label}>{month.label}</span>)}
                </div>
                <div className="mt-2 grid w-full grid-flow-col grid-cols-[repeat(53,minmax(0,1fr))] grid-rows-7 gap-[2px] sm:gap-1" aria-label={`AI credit activity for January through December ${activityYear}`}>
                  {yearActivity.map(({ index, level, date }) => {
                    const strength = level < 0
                      ? "invisible"
                      : level === 0
                        ? "bg-slate-100 dark:bg-zinc-800"
                        : level === 1
                          ? "bg-emerald-300 dark:bg-emerald-900"
                          : level === 2
                            ? "bg-emerald-500 dark:bg-emerald-700"
                            : "bg-emerald-900 dark:bg-emerald-500";
                    const creditsUsed = level < 1 ? 0 : [0, 3, 10, 25][level];
                    const dateLabel = date?.toLocaleDateString("en", { month: "short", day: "numeric" });
                    return <span key={index} title={dateLabel ? `${dateLabel}: ${creditsUsed} AI credits used` : undefined} className={`aspect-square min-w-0 rounded-[2px] sm:rounded-[3px] ${strength}`} />;
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col justify-center">
                <div className="mt-7 flex h-36 items-end gap-2 sm:gap-3">
                  {bars.map((day) => {
                    const total = day.free + day.pro + day.ad;
                    return <div key={day.label} className="group relative flex h-full min-w-0 flex-1 items-end justify-center" title={`${day.label}: ${total} credits used`}><div className={`flex w-full flex-col-reverse overflow-hidden rounded-t-md ${period === "Week" ? "max-w-14" : ""}`} style={{ height: `${(total / 115) * 100}%` }}><div className="bg-blue-400" style={{ height: `${(day.free / total) * 100}%` }} /><div className="bg-pink-400" style={{ height: `${(day.pro / total) * 100}%` }} /><div className="bg-amber-300" style={{ height: `${(day.ad / total) * 100}%` }} /></div></div>;
                  })}
                </div>
                <div className="mt-3 flex items-center gap-2 text-center text-[10px] text-slate-400 sm:gap-3 sm:text-xs">{bars.map((day) => <span key={day.label} className="min-w-0 flex-1">{day.label}</span>)}</div>
              </div>
            )}
            {period === "Year" ? (
              <div className="mt-auto flex items-center justify-end gap-2 pt-5 text-[10px] text-slate-500 dark:text-zinc-400 sm:text-xs" aria-label="AI credit usage intensity">
                <span>Less</span><i className="h-2.5 w-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-950" /><i className="h-2.5 w-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-800" /><i className="h-2.5 w-2.5 rounded-sm bg-emerald-600 dark:bg-emerald-600" /><i className="h-2.5 w-2.5 rounded-sm bg-emerald-900 dark:bg-emerald-400" /><span>More</span>
              </div>
            ) : (
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-xs text-slate-500 dark:text-zinc-400"><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-blue-400" />Free credits</span><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-pink-400" />Pro credits</span><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-300" />Ad credits</span></div>
            )}
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 xl:flex xl:h-[480px] xl:flex-col">
            <div className="relative h-24 shrink-0 overflow-hidden sm:h-28" style={{ backgroundImage: "linear-gradient(145deg, #83c4e8 0%, #b9c5ee 30%, #eab9e8 57%, #ffd7b2 100%)" }}>
              <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,rgba(255,255,255,0.34)_45%,transparent_72%)]" />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div role="heading" aria-level={2} className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Invite &amp; Profit</div>
              <div className="mt-3 text-sm font-medium text-slate-500 dark:text-zinc-400">How it works:</div>
              <div className="mt-2 space-y-3">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-800 dark:text-zinc-200"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200"><Link2 className="h-4 w-4" /></span>Share a link</div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-800 dark:text-zinc-200"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200"><Gift className="h-4 w-4" /></span><span>Your friend gets <strong>30 credits</strong> when they subscribe</span></div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-800 dark:text-zinc-200"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200"><Coins className="h-4 w-4" /></span><span>You receive <strong>30 credits</strong> for each referral</span></div>
              </div>
              <div className="mt-6">
                <label htmlFor="referral-link" className="mb-2 block text-sm font-medium text-slate-500 dark:text-zinc-400">Your invite link:</label>
                <div className="flex h-12 items-center gap-2 rounded-full bg-slate-100 p-1.5 dark:bg-zinc-800">
                  <Link2 className="ml-2 h-4 w-4 shrink-0 text-slate-500" />
                  <input id="referral-link" readOnly value={`rivinity.ai/signup?ref=${referralCode}`} className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-xs text-slate-800 shadow-none outline-none focus:border-0 focus:outline-none focus:ring-0 dark:text-zinc-200" />
                  <button type="button" onClick={copyReferralLink} className="h-9 shrink-0 rounded-full bg-slate-950 px-5 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">{copied ? "Copied" : "Copy"}</button>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-4" aria-label="Available plans">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <div role="heading" aria-level={2} className="text-4xl font-semibold tracking-tight">Available plans</div>
              </div>
            </div>
            <div className="grid auto-cols-[minmax(220px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] xl:auto-cols-auto xl:grid-cols-4 xl:grid-flow-row xl:overflow-visible">
              {plans.map((plan) => (
                <div key={plan.name} className={`min-w-0 rounded-xl border p-4 ${plan.current ? "border-orange-200 bg-orange-50/70 dark:border-orange-400/20 dark:bg-orange-400/5" : "border-slate-200 dark:border-white/10"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="truncate text-sm font-semibold">{plan.name}</div>
                      {plan.current && <span className="shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white">CURRENT</span>}
                    </div>
                    <div className="shrink-0 text-sm font-semibold">{plan.price}<span className="text-[10px] font-normal text-slate-400">{plan.name !== "Enterprise" ? "/mo" : ""}</span></div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-zinc-400">{plan.detail}</div>
                  <div className="mt-3 border-t border-slate-100 pt-3 text-xs font-medium text-slate-700 dark:border-white/10 dark:text-zinc-300">{plan.credits}</div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section aria-label="Recent credit activity">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:p-6">
            <div className="mb-3">
              <div role="heading" aria-level={2} className="text-4xl font-semibold tracking-tight">Recent credit activity</div>
            </div>
            <div className="max-h-56 overflow-y-auto pr-2 [scrollbar-color:#94a3b8_transparent] [scrollbar-width:thin]">
              <div className="divide-y divide-slate-100 dark:divide-white/10">
                {usage.map((entry) => { const Icon = entry.icon; const isEarned = entry.amount.startsWith("+"); return <div key={entry.title} className="flex items-center gap-3 py-3.5"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isEarned ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10" : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300"}`}><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{entry.title}</div><div className="mt-0.5 text-[11px] text-slate-500 dark:text-zinc-400">{entry.category} · {entry.date}</div></div><span className={`whitespace-nowrap text-sm font-semibold ${isEarned ? "text-emerald-600" : "text-slate-700 dark:text-zinc-200"}`}>{entry.amount}</span></div>; })}
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default function PlansAndCreditsPage() {
  return <SidebarShell><PlansAndCreditsContent /></SidebarShell>;
}
