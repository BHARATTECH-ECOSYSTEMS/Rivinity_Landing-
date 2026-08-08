"use client";

import { useEffect, useRef, useState } from "react";

type Period = "monthly" | "yearly";

interface CreditTier {
  value: string;
  credits: string;
  monthly: number;
  yearly: number;
}

const PRO_TIERS: CreditTier[] = [
  { value: "100", credits: "$100 of credits", monthly: 100, yearly: 90 },
  { value: "250", credits: "$250 of credits", monthly: 250, yearly: 215 },
  { value: "500", credits: "$500 of credits", monthly: 500, yearly: 425 },
  { value: "1000", credits: "$1,000 of credits", monthly: 1000, yearly: 825 },
  { value: "2500", credits: "$2,500 of credits", monthly: 2500, yearly: 2000 },
];

const CORE_PRICE = { monthly: 20, yearly: 18 };

const STARTER_BENEFITS = [
  { text: "Free daily Agent credits" },
  { text: "Built-in database for full-stack apps" },
  { text: "Create slides, videos, animations" },
  { text: "Publish up to 1 project" },
  { text: "Publish private or password-protected deployments" },
];

const CORE_BENEFITS = [
  { text: "Everything in Starter", bold: true },
  { text: "$20 of monthly credits" },
  { text: "Invite up to 5 collaborators" },
  { text: "Work in parallel with up to 2 agents" },
  { text: "Publish projects in any region" },
  { text: "Unlimited workspaces" },
  { text: 'Remove "Made with Replit" badge' },
  { text: "Replit AI Integrations" },
];

const PRO_BENEFITS = [
  { text: "Everything in Core", bold: true },
  { text: "$100 monthly credits" },
  { text: "Invite up to 15 collaborators" },
  { text: "Invite up to 50 viewers" },
  { text: "Work in parallel with up to 10 agents" },
  { text: "Access to the most powerful models" },
  { text: "Database rollbacks for up to 28 days" },
];

const ENTERPRISE_BENEFITS = [
  { text: "Everything in Pro", bold: true },
  { text: "Custom seat limits" },
  { text: "SSO / SAML" },
  { text: "Advanced privacy controls" },
  { text: "Design system support" },
  { text: "Single-tenant environments" },
  { text: "Static outbound IPs" },
  { text: "VPC peering" },
];

function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default function PricingPage() {
  const [period, setPeriod] = useState<Period>("yearly");
  const [proTier, setProTier] = useState<string>("100");

  const tier = PRO_TIERS.find((t) => t.value === proTier) ?? PRO_TIERS[0];
  const corePrice = period === "yearly" ? CORE_PRICE.yearly : CORE_PRICE.monthly;
  const proPrice = period === "yearly" ? tier.yearly : tier.monthly;
  const showProStrike = period === "yearly";

  return (
    <div className="min-h-screen px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-350 rounded-4xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between pb-4 sm:pb-6">
          <div className="flex flex-col">
            <h1 className="text-5xl font-semibold tracking-tight text-[#16181A] sm:text-[42px]">
              Start Small. Scale Fast.
            </h1>
            <p className="text-md text-[#8b8f8f]">Designed for Every Stage</p>
          </div>

          {/* Period toggle */}
          <div className="flex items-center gap-1 rounded-full bg-[#F0ECE1] p-1">
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                period === "monthly"
                  ? "bg-white text-[#16181A] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  : "text-[#6b6f72] hover:text-[#16181A]"
              }`}
              aria-pressed={period === "monthly"}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setPeriod("yearly")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                period === "yearly"
                  ? "bg-white text-[#16181A] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  : "text-[#6b6f72] hover:text-[#16181A]"
              }`}
              aria-pressed={period === "yearly"}
            >
              Yearly
              <span className="flex items-center gap-1 text-[#E9602F]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.444 1.264c.63.062 1.221.34 1.672.792l8.706 8.706c.591.595.923 1.4.923 2.238l-.004.157a3.176 3.176 0 0 1-.919 2.081l-6.584 6.584c-.557.554-1.3.88-2.08.92l-.158.003a3.176 3.176 0 0 1-2.238-.923l-8.706-8.706a2.75 2.75 0 0 1-.792-1.672l-.014-.272V4A2.75 2.75 0 0 1 4 1.25h7.172l.272.014ZM7.5 6.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
                  />
                </svg>
                Save $24
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PlanCard
            name="Starter"
            description="For exploring what's possible"
            price={<span className="text-4xl font-medium text-[#16181A]">Free</span>}
            cta={{ label: "Sign up", href: "/signup" }}
            benefits={STARTER_BENEFITS}
          />

          <PlanCard
            name="Replit Core"
            description="For personal projects & simple apps"
            price={<PriceLine amount={formatPrice(corePrice)} sub={["per month", "billed annually"]} />}
            cta={{
              label: "Join Replit Core",
              href: "/signup?upgrade=pricing_page_signup&plan=hacker_pro&period=yearly",
            }}
            benefits={CORE_BENEFITS}
          />

          <PlanCard
            name="Replit Pro"
            description="For commercial and professional builds"
            price={
              <PriceLine
                amount={formatPrice(proPrice)}
                strike={showProStrike ? formatPrice(tier.monthly) : undefined}
                sub={["per month", "billed annually"]}
              />
            }
            cta={{
              label: "Join Replit Pro",
              href: `/signup?upgrade=pricing_page_signup&plan=pro&period=yearly&tier=${proTier}`,
            }}
            benefits={PRO_BENEFITS}
            extra={
              <CreditTierSelect
                tiers={PRO_TIERS}
                value={proTier}
                onChange={setProTier}
                period={period}
              />
            }
          />

          <PlanCard
            name="Enterprise"
            description="For enterprise-grade security & controls"
            price={<span className="text-base font-medium text-[#16181A]">Custom pricing</span>}
            cta={{ label: "Contact sales", href: "https://replit.com/enterprise" }}
            secondaryCta={{ label: "Get started", href: "/enterprise-wizard" }}
            benefits={ENTERPRISE_BENEFITS}
          />
        </div>
      </div>
    </div>
  );
}

function PriceLine({ amount, strike, sub }: { amount: string; strike?: string; sub: string[] }) {
  return (
    <div className="flex items-center gap-2">
      {strike && <span className="text-base text-[#B9B4A6] line-through">{strike}</span>}
      <span className="text-4xl font-medium text-[#16181A]">{amount}</span>
      <div className="flex flex-col gap-0.5 pt-1">
        {sub.map((s) => (
          <span key={s} className="text-xs font-medium leading-tight text-[#8b8f8f]">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CreditTierSelect({
  tiers,
  value,
  onChange,
  period,
}: {
  tiers: CreditTier[];
  value: string;
  onChange: (value: string) => void;
  period: Period;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = tiers.find((t) => t.value === value) ?? tiers[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mb-2" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-[#DEDACD] bg-white px-3.5 py-2.5 text-sm text-[#16181A] outline-none focus:border-[#E9602F]"
      >
        <span className="flex items-center gap-1.5">
          <span className="text-[#B9B4A6] line-through">{formatPrice(selected.monthly)}</span>
          <span>{formatPrice(period === "yearly" ? selected.yearly : selected.monthly)} / month</span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`shrink-0 text-[#16181A] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303Z"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-[#EAE6DA] bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
        >
          {tiers.map((t, i) => {
            const isSelected = t.value === value;
            return (
              <li key={t.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(t.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-1.5 rounded-lg px-3 py-3 text-left text-sm transition-colors ${
                    i !== 0 ? "border-t border-[#EEEAE0]" : ""
                  } ${isSelected ? "bg-[#FBEFE9] text-[#16181A]" : "text-[#16181A] hover:bg-[#F7F5EF]"}`}
                >
                  <span className="text-[#B9B4A6] line-through">{formatPrice(t.monthly)}</span>
                  <span>{formatPrice(period === "yearly" ? t.yearly : t.monthly)} / month</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PlanCard({
  name,
  description,
  price,
  cta,
  secondaryCta,
  benefits,
  extra,
}: {
  name: string;
  description: string;
  price: React.ReactNode;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  benefits: { text: string; bold?: boolean }[];
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#EAE6DA] bg-[#FAF8F2] p-6">
      <div className="flex flex-col gap-1.5 pb-4">
        <span className="text-2xl font-semibold text-[#E9602F]">{name}</span>
        <span className="text-sm leading-snug text-[#4a4d4f]">{description}</span>
      </div>

      <div className="h-px w-full bg-[#E7E2D5]" />

      <div className="flex min-h-20 items-center py-5">{price}</div>

      <a
        href={cta.href}
        style={{ color: "#ffffff", opacity: 1 }}
        className="mb-6 flex w-full items-center justify-center rounded-full bg-[#16181A] px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
      >
        {cta.label}
      </a>

      {extra}

      {secondaryCta && (
        <a
          href={secondaryCta.href}
          className="mb-2 mt-6 flex w-full items-center justify-center rounded-full border border-[#16181A] bg-transparent px-4 py-3 text-sm font-semibold text-[#16181A] transition-colors hover:bg-[#16181A] hover:text-white"
        >
          {secondaryCta.label}
        </a>
      )}

      <div className="my-6 h-px w-full bg-[#E7E2D5]" />

      <div className="flex flex-col">
        {benefits.map((b, i) => (
          <div
            key={b.text}
            className={`flex items-start gap-3 py-3 ${i !== 0 ? "border-t border-[#EEEAE0]" : "pt-0"}`}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E9602F]" />
            <span className={`text-sm leading-snug text-[#33363A] ${b.bold ? "font-semibold text-[#16181A]" : ""}`}>
              {b.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}