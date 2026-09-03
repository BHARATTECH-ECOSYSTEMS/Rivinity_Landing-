"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/sections/faq-section";

type Plan = {
  name: string;
  badge?: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  yearlyStrike?: number;
  priceSuffix?: string;
  tagline: string;
  features: { label: string; isInherited?: boolean; isMuted?: boolean }[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  custom?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    tagline: "For exploring what's possible",
    features: [
      { label: "Free daily Agent credits" },
      { label: "Built-in database for full-stack apps" },
      { label: "Generate slides, videos & assets" },
      { label: "Publish up to 1 project" },
      { label: "Password-protected deployments" },
    ],
    cta: { label: "Sign up", href: "/signup" },
  },
  {
    name: "Pro",
    badge: "Most Popular",
    monthlyPrice: 25,
    yearlyPrice: 20,
    yearlyStrike: 25,
    priceSuffix: "/month",
    tagline: "For personal projects & simple apps",
    features: [
      { label: "Everything in Free", isInherited: true },
      { label: "$25 of monthly credits" },
      { label: "Invite up to 5 collaborators" },
      { label: "Run up to 2 agents in parallel" },
      { label: "Publish projects in any region" },
      { label: "Unlimited workspaces" },
      { label: "Remove the Rivinity badge" },
      { label: "RivinityLM integrations" },
    ],
    cta: { label: "Join Pro", href: "/signup?plan=pro" },
    highlighted: true,
  },
  {
    name: "Team",
    monthlyPrice: 100,
    yearlyPrice: 95,
    yearlyStrike: 100,
    priceSuffix: "/month",
    tagline: "For commercial and professional builds",
    features: [
      { label: "Everything in Pro", isInherited: true },
      { label: "$100 of monthly credits" },
      { label: "Invite up to 15 collaborators" },
      { label: "Invite up to 50 viewers" },
      { label: "Run up to 10 agents in parallel" },
      { label: "Access to capable models" },
      { label: "Database rollbacks up to 28 days" },
      { label: "Premium support" },
    ],
    cta: { label: "Join Team", href: "/signup?plan=team" },
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    tagline: "For enterprise-grade security & controls",
    features: [
      { label: "Everything in Team", isInherited: true },
      { label: "Custom seat limits" },
      { label: "SSO / SAML authentication" },
      { label: "Advanced privacy controls" },
      { label: "Single-tenant environments" },
      { label: "Static outbound IPs & VPC" },
      { label: "and much more", isMuted: true },
    ],
    cta: { label: "Contact sales", href: "/enterprise" },
    custom: true,
  },
];

const faqs = [
  {
    q: "What's included in every plan?",
    a: "Every plan includes access to our core AI chat, basic deployment, and community support. Higher tiers add more credits, collaborators, and advanced features.",
  },
  {
    q: "How do credits work?",
    a: "Credits are consumed based on model usage, compute time, and deployment bandwidth. Free tier refreshes daily; paid tiers refresh monthly.",
  },
  {
    q: "What happens when I run out of credits?",
    a: "You can purchase additional credit packs or upgrade to a higher tier. Your existing projects remain accessible even if you temporarily run out of credits.",
  },
  {
    q: "What plan is best for me?",
    a: "Free is great for exploration. Pro is ideal for individual developers. Team works best for small companies. Enterprise is for organizations needing security and compliance.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes! Annual billing saves you up to 20% compared to monthly billing. The discount is applied automatically when you select yearly.",
  },
  {
    q: "Do you offer invoicing instead of credit card payments?",
    a: "Enterprise customers can pay via invoice with net-30 terms. Contact our sales team to set up invoicing for your organization.",
  },
];

function formatPrice(plan: Plan, yearly: boolean) {
  if (plan.custom) return "Custom";
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  if (price === 0) return "$0";
  return `$${price}`;
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-28 sm:pt-32 md:pt-36 pb-16"
      >
        <div className="w-full">
          {/* Header & Title */}
          <div className="mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl">
                Pricing
              </h1>
              <p className="mt-3 text-lg text-[#64748b]">
                Choose the best plan for you.
              </p>
            </div>

            {/* Toggle */}
            <div className="mb-10 sm:mb-12 flex justify-center">
              <div className="inline-flex items-center rounded-xl bg-gray-100 p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${
                    !yearly
                      ? "bg-white text-[#0f172a] shadow-xs"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${
                    yearly
                      ? "bg-white text-[#0f172a] shadow-xs"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Yearly
                  <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#FF6B00]">
                    Up to 20% off
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Cards Exactly in 1 Row */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="grid items-stretch gap-5 grid-cols-1 md:grid-cols-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`pricing-card relative flex flex-col justify-between rounded-2xl bg-white border p-6 xl:p-7 transition-all hover:shadow-md ${
                    plan.highlighted
                      ? "featured border-2 border-[#FF6B00] shadow-md"
                      : "border-slate-200"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00] px-3 py-1 text-xs font-semibold text-white tracking-wide shadow-xs">
                      {plan.badge}
                    </span>
                  )}

                  {/* Top content */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f172a]">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="pricing-price mt-2 flex items-baseline gap-1.5 text-3xl xl:text-4xl font-semibold text-[#0f172a]">
                      {yearly && plan.yearlyStrike && (
                        <span className="text-base font-normal text-slate-400 line-through mr-1">
                          ${plan.yearlyStrike}
                        </span>
                      )}
                      <span>{formatPrice(plan, yearly)}</span>
                      {plan.priceSuffix && (
                        <span className="text-sm xl:text-base font-normal text-[#64748b]">
                          {plan.priceSuffix}
                        </span>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="pricing-description mt-1 text-xs xl:text-sm text-[#64748b]">
                      {plan.tagline}
                    </p>

                    {/* Features */}
                    <ul className="pricing-features mt-6 flex flex-col gap-2.5 text-xs xl:text-sm text-[#0f172a] pl-0">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-start gap-2 py-0.5 pl-0"
                        >
                          {feature.isMuted ? (
                            <span className="text-xs text-[#64748b] italic mt-1 pl-6">
                              {feature.label}
                            </span>
                          ) : (
                            <>
                              {feature.isInherited ? (
                                <Plus
                                  size={15}
                                  className="shrink-0 text-gray-400 mt-0.5"
                                />
                              ) : (
                                <Check
                                  size={15}
                                  className="shrink-0 text-[#FF6B00] stroke-[3] mt-0.5"
                                />
                              )}
                              <span className="text-xs xl:text-sm text-[#374151]">
                                {feature.label}
                              </span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-2">
                    <Link
                      href={plan.cta.href}
                      className={`flex items-center justify-center min-h-[44px] w-full rounded-xl py-2.5 xl:py-3 text-center text-xs xl:text-sm font-semibold transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 ${
                        plan.highlighted
                          ? "bg-[#FF6B00] text-white hover:bg-[#e66000] shadow-xs"
                          : "bg-gray-100 text-[#0f172a] hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {plan.cta.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4 mb-16">
          <p className="mx-auto max-w-3xl text-center text-xs text-[#64748b]">
            *Prices are subject to tax depending on your location. Rivinity Agent is powered by large language models. While it can produce powerful results, its behavior is probabilistic meaning it may occasionally make mistakes.
          </p>
        </div>

        {/* Unified FAQ Section */}
        <FaqSection
          title="Frequently asked questions"
          subtitle="Everything you need to know about Rivinity plans and billing."
          items={faqs}
        />

        {/* Still have questions banner */}
        <div className="text-center pb-16">
          <p className="text-base font-medium text-[#0f172a]">
            Still have questions?
          </p>
          <p className="mt-2 text-sm text-[#64748b]">
            See more in our{" "}
            <Link
              href="/docs"
              className="text-[#FF6B00] hover:underline font-medium"
            >
              Documentation
            </Link>
            , or{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#FF6B00] hover:underline"
            >
              contact us
            </Link>{" "}
            about Enterprise.
          </p>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}