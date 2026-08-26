"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Check, Plus, ChevronDown } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

type Plan = {
  name: string;
  badge?: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  yearlyStrike?: number;
  priceSuffix?: string;
  tagline: string;
  features: { label: string; isInherited?: boolean }[];
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
      { label: "Access to our most capable models" },
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
      { label: "SSO / SAML" },
      { label: "Advanced privacy controls" },
      { label: "Design system support" },
      { label: "Data warehouse connections" },
      { label: "Custom groups" },
      { label: "Dedicated support" },
      { label: "Single-tenant environments" },
      { label: "Region selection & static outbound IPs" },
      { label: "VPC peering" },
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
    <>
      <Header />
      <Head>
        <title>Pricing - Rivinity</title>
      </Head>
      <main className="min-h-screen overflow-x-hidden mt-15 container">
        <section className="section-sm mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-semibold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                Pricing
              </h1>
              <p className="mt-4 text-lg text-[#6B7280]">
                Choose the best plan for you.
              </p>
            </div>

            {/* Toggle */}
            <div className="mb-16 flex justify-center">
              <div className="inline-flex items-center rounded-xl bg-gray-100 p-1 border border-gray-200">
                <button
                  onClick={() => setYearly(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${!yearly
                      ? "bg-white text-[#1A1A1A] shadow-xs"
                      : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setYearly(true)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${yearly
                      ? "bg-white text-[#1A1A1A] shadow-xs"
                      : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                >
                  Yearly
                  <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#FF6B00]">
                    Up to 20% off
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`pricing-card relative flex flex-col justify-between rounded-2xl bg-white border p-8 transition-all ${plan.highlighted
                      ? "featured border-2 border-[#FF6B00] shadow-md"
                      : "border-[#E5E7EB]"
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
                    <h3 className="text-xl font-semibold text-[#1A1A1A]">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="pricing-price mt-2 flex items-baseline gap-1.5 text-4xl font-semibold text-[#1A1A1A]">
                      {yearly && plan.yearlyStrike && (
                        <span className="text-base font-normal text-gray-400 line-through mr-1">
                          ${plan.yearlyStrike}
                        </span>
                      )}
                      <span>{formatPrice(plan, yearly)}</span>
                      {plan.priceSuffix && (
                        <span className="text-base font-normal text-[#6B7280]">
                          {plan.priceSuffix}
                        </span>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="pricing-description mt-1 text-sm text-[#6B7280]">
                      {plan.tagline}
                    </p>

                    {/* Features */}
                    {/* Features */}
                    <ul className="pricing-features mt-6 flex flex-col gap-2 text-sm text-[#1A1A1A] pl-0">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-start gap-2 py-1 pl-0"
                        >
                          {feature.isInherited ? (
                            <Plus
                              size={16}
                              className="shrink-0 text-gray-400 mt-0.5"
                            />
                          ) : (
                            <Check
                              size={16}
                              className="shrink-0 text-[#FF6B00] stroke-[3] mt-0.5"
                            />
                          )}
                          <span className="text-sm text-[#374151]">
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-4">
                    <Link
                      href={plan.cta.href}
                      className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${plan.highlighted
                          ? "bg-[#FF6B00] text-white hover:bg-[#e66000] shadow-xs"
                          : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border border-gray-200"
                        }`}
                    >
                      {plan.cta.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div>
          <p className="mx-auto max-w-3xl text-center text-xs text-[#6B7280]">
            *Prices are subject to tax depending on your location. Rivinity Agent is powered by large language models. While it can produce powerful results, its behavior is probabilistic meaning it may occasionally make mistakes.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="section-sm ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              {/* Heading */}
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
                  Frequently asked questions
                </h2>
                <p className="mt-3 text-sm text-[#6B7280]">
                  Everything you need to know about Rivinity plans and billing.
                </p>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-6 cursor-pointer shadow-xs transition-colors hover:border-gray-300"
                  >
                    <summary className="font-medium list-none flex justify-between items-center text-sm sm:text-base text-[#1A1A1A]">
                      <span>{faq.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform duration-200 group-open:rotate-180">
                        <ChevronDown size={16} className="text-[#6B7280]" />
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-[#6B7280] max-w-prose">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>

              {/* Still have questions */}
              <div className="mt-12 text-center">
                <p className="text-base font-medium text-[#1A1A1A]">
                  Still have questions?
                </p>
                <p className="mt-2 text-sm text-[#6B7280]">
                  See more in our{" "}
                  <Link
                    href="/docs/billing"
                    className="font-semibold text-[#FF6B00] hover:underline"
                  >
                    billing docs
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}