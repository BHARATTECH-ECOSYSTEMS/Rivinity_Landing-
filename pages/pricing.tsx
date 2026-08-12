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
    badge: "Save 20%",
    monthlyPrice: 25,
    yearlyPrice: 20,
    yearlyStrike: 25,
    priceSuffix: "per month",
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
    badge: "Save 5%",
    monthlyPrice: 100,
    yearlyPrice: 95,
    yearlyStrike: 100,
    priceSuffix: "per month",
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
    a: "Every plan, including Free, includes the core Rivinity Agent, built-in database, publishing, and access to the RivinityLM ecosystem. Paid tiers add more credits, collaborators, and parallel agent capacity.",
  },
  {
    q: "How do credits work?",
    a: "Credits are consumed as you use Agent, Chat, and other AI-powered features. Paid plans include a monthly credit allotment; once used, you can top up on a pay-as-you-go basis.",
  },
  {
    q: "What happens when I run out of credits?",
    a: "You can keep working with reduced-capability tooling, or purchase additional credits at any time. We'll notify you before you run out so there are no surprises.",
  },
  {
    q: "What plan is best for me?",
    a: "Free is great for exploring. Pro suits personal and side projects. Team fits professional or commercial builds with a small group. Enterprise is for organizations needing custom security, compliance, and scale.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes — switch to yearly billing above to save up to 20% depending on your plan.",
  },
  {
    q: "Do you offer invoicing instead of credit card payments?",
    a: "Yes, this is available on Enterprise plans. Contact sales to set up invoicing.",
  },
];

function formatPrice(plan: Plan, yearly: boolean) {
  if (plan.custom) return "Custom";
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  if (price === 0) return "Free";
  return `$${price}`;
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
    <Header/>
      <Head>
        <title>Pricing - Rivinity</title>
      </Head>
      <main className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10 pt-25">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-5xl sm:text-6xl font-semibold tracking-tight text-[#1a1a1a]">
            Pricing
          </div>
          <p className="text-lg text-gray-500">Choose the best plan for you.</p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex items-center rounded-full bg-[#EDEBE6] p-1">
            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                !yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Yearly
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#FF5A1F]">
                Up to 20% off
              </span>
            </button>
          </div>
        </div>

        {/* Plan grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-2 border-[#FF5A1F] bg-[#EDEBE6]"
                  : "border-black/10 bg-[#EDEBE6]/60"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">{plan.name}</span>
                  {plan.badge && (
                    <span className="rounded-full bg-[#FBE4D6] px-3 py-1 text-xs font-semibold text-[#B84A1B]">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-end gap-2 mt-1">
                  {yearly && plan.yearlyStrike && (
                    <span className="text-base text-gray-400 line-through">
                      ${plan.yearlyStrike}
                    </span>
                  )}
                  <span className="text-4xl font-semibold text-gray-900">
                    {formatPrice(plan, yearly)}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-sm text-gray-500 pb-1 leading-tight">
                      per month
                      <br />
                      {yearly && "billed annually"}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-600">{plan.tagline}</p>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-2.5 text-sm text-gray-800">
                      {feature.isInherited ? (
                        <Plus size={16} className="mt-0.5 shrink-0 text-gray-500" />
                      ) : (
                        <Check size={16} className="mt-0.5 shrink-0 text-gray-500" />
                      )}
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.cta.href}
                className={`mt-8 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-[#FF5A1F] text-white hover:bg-[#e64f18]"
                    : "bg-black/5 text-gray-900 hover:bg-black/10"
                }`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-800 max-w-2xl mx-auto">
          *Prices are subject to tax depending on your location. Rivinity Agent is powered by
          large language models. While it can produce powerful results, its behavior is
          probabilistic — meaning it may occasionally make mistakes.
        </p>

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto w-3xl flex flex-col justify-center">
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-black/10 border-t border-b border-black/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between py-5 text-left bg-transparent"
                  >
                    <span className="text-base font-medium text-gray-900">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-15 flex flex-col items-center gap-1 text-center">
            <span className="text-base font-medium text-gray-900">Still have questions?</span>
            <span className="text-sm text-gray-500">
              See more in our{" "}
              <Link href="/docs" className="text-[#FF5A1F] hover:underline">
                billing docs
              </Link>
              , or{" "}
              <Link href="/enterprise" className="text-[#FF5A1F] hover:underline">
                contact us
              </Link>{" "}
              about Enterprise.
            </span>
          </div>
        </div>
        <div className="border-b border-gray-200 mt-10"></div>
      </main>
    <Footer/>
    </>
  );
}