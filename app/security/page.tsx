"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/sections/faq-section";

const securityFeatures = [
  {
    id: 1,
    title: "End-to-End Encryption",
    description:
      "All customer data, model prompts, and agent state artifacts are encrypted at rest using AES-256 and in transit via TLS 1.3.",
  },
  {
    id: 2,
    title: "Granular Access Controls (RBAC)",
    description:
      "Enforce least-privilege access with fine-grained role-based permissions, custom workspace boundaries, and SAML/SSO integration.",
  },
  {
    id: 3,
    title: "Zero-Retention Privacy Options",
    description:
      "Enterprise customers can enable zero-data-retention modes. Your inference data is never stored on disk or used for training.",
  },
  {
    id: 4,
    title: "Sovereign & Isolated Runtimes",
    description:
      "Deploy models within dedicated Single-Tenant VPCs, air-gapped environments, or localized regions with static outbound IPs.",
  },
  {
    id: 5,
    title: "Continuous Audit Logging",
    description:
      "Comprehensive, tamper-proof logs capture all tool executions, API interactions, and user activity for real-time compliance monitoring.",
  },
  {
    id: 6,
    title: "Prompt Injection Protection",
    description:
      "Real-time guardrail filtering inspecting retrieval vectors and prompt boundaries to prevent adversarial injection attacks.",
  },
];

function SecurityCardShape({ id }: { id: number }) {
  switch (id) {
    case 1:
      // Shape 1: 4 Pointed Oval Petals (Forest Green)
      return (
        <svg
          viewBox="0 0 120 120"
          className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <g fill="#064E3B">
            <path d="M 60 60 C 51 46 51 28 60 18 C 69 28 69 46 60 60 Z" />
            <path d="M 60 60 C 51 74 51 92 60 102 C 69 92 69 74 60 60 Z" />
            <path d="M 60 60 C 46 51 28 51 18 60 C 28 69 46 69 60 60 Z" />
            <path d="M 60 60 C 74 51 92 51 102 60 C 92 69 74 69 60 60 Z" />
          </g>
        </svg>
      );

    case 2:
      // Shape 2: 3-Tiered Scalloped Pillar (Vibrant Orange)
      return (
        <svg
          viewBox="0 0 120 120"
          className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 40 18 L 80 18 C 88 18 94 24 94 32 C 94 38 88 44 86 46 C 92 48 98 54 98 60 C 98 66 92 72 86 74 C 88 76 94 82 94 88 C 94 96 88 102 80 102 L 40 102 C 32 102 26 96 26 88 C 26 82 32 76 34 74 C 28 72 22 66 22 60 C 22 54 28 48 34 46 C 32 44 26 38 26 32 C 26 24 32 18 40 18 Z"
            fill="#EA580C"
          />
        </svg>
      );

    case 3:
      // Shape 3: 4-Petal Flower Blossom (Crimson)
      return (
        <svg
          viewBox="0 0 120 120"
          className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <g fill="#991B1B">
            <path d="M 60 60 C 44 54 36 34 60 16 C 84 34 76 54 60 60 Z" />
            <path d="M 60 60 C 44 66 36 86 60 104 C 84 86 76 66 60 60 Z" />
            <path d="M 60 60 C 54 44 34 36 16 60 C 34 84 54 76 60 60 Z" />
            <path d="M 60 60 C 66 44 86 36 104 60 C 86 84 66 76 60 60 Z" />
          </g>
        </svg>
      );

    case 4:
      // Shape 4: Royal Blue Heart
      return (
        <svg
          viewBox="0 0 120 120"
          className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 60 44 C 55 30 38 20 25 28 C 12 36 12 55 24 72 C 34 86 52 98 60 104 C 68 98 86 86 96 72 C 108 55 108 36 95 28 C 82 20 65 30 60 44 Z"
            fill="#1D4ED8"
          />
        </svg>
      );

    case 5:
      // Shape 5: Amber Hourglass / Bowtie
      return (
        <svg
          viewBox="0 0 120 120"
          className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 32 20 L 88 20 L 100 32 L 60 60 L 100 88 L 88 100 L 32 100 L 20 88 L 60 60 L 20 32 Z"
            fill="#D97706"
          />
        </svg>
      );

    case 6:
      // Shape 6: 4-Lobed Rounded Clover Cross (Orange)
      return (
        <svg
          viewBox="0 0 120 120"
          className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          fill="none"
          aria-hidden="true"
        >
          <g fill="#EA580C">
            <circle cx="60" cy="40" r="22" />
            <circle cx="60" cy="80" r="22" />
            <circle cx="40" cy="60" r="22" />
            <circle cx="80" cy="60" r="22" />
            <rect x="40" y="40" width="40" height="40" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}

const complianceStandards = [
  { name: "SOC 2 Type II", status: "Certified", year: "2026" },
  { name: "ISO 27001", status: "Certified", year: "2026" },
  { name: "GDPR Compliant", status: "Verified", year: "Global" },
  { name: "HIPAA Ready", status: "BAA Available", year: "Healthcare" },
];

const securityFaqs = [
  {
    q: "Do you train foundational models on customer data?",
    a: "No. Rivinity never uses your proprietary data, prompts, or agent outputs to train or fine-tune public base models.",
  },
  {
    q: "Can we deploy Rivinity on-premise or in an air-gapped VPC?",
    a: "Yes. Enterprise plans support private cloud, VPC peering, and fully disconnected air-gapped runtimes for regulated industries.",
  },
  {
    q: "How do you handle vulnerability management and penetration testing?",
    a: "We perform third-party penetration testing bi-annually and run continuous automated security scanning on all codebase deployments.",
  },
];

export default function SecurityPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-28 sm:pt-32 md:pt-36 pb-16 bg-[var(--color-bg-primary,#ffffff)] flex-1"
      >
        {/* Hero Section */}
        <section className="section py-8 sm:py-12 md:py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl text-center">
                Enterprise trust built into every layer
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed max-w-2xl mx-auto">
                We design AI infrastructure with defense-in-depth principles
                protecting your data, agent workflows, and cloud deployments
                around the clock.
              </p>
            </div>

            {/* Compliance Badges */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {complianceStandards.map((item) => (
                <div
                  key={item.name}
                  className="bg-[#F7F7F8] border border-slate-200 rounded-2xl p-5 text-center shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0f172a]">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF6B00] mt-0.5">
                    {item.status} ({item.year})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="section pb-20">
          <div className="container">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold text-[#0f172a] sm:text-4xl text-center">
                Our Security Foundations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {securityFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs hover:border-[#FF6B00]/40 transition-all group flex flex-col justify-between min-h-[190px] sm:min-h-[200px]"
                >
                  <div className="relative z-10 max-w-[85%]">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <SecurityCardShape id={feature.id} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsible Disclosure Banner */}
        <section className="section-sm py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
              <div>
                <h3 className="text-2xl font-semibold text-[#0f172a]">
                  Found a security issue?
                </h3>
                <p className="text-sm text-[#64748b] mt-2 max-w-xl">
                  We value the security community. If you discover a
                  vulnerability, please report it to our security team for a
                  prompt response.
                </p>
              </div>

              <a
                href="mailto:security@rivinity.com"
                style={{ color: "#ffffff" }}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-[#0f172a] hover:bg-slate-800 !text-white text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2"
              >
                <span
                  className="!text-white text-white font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  Report Vulnerability
                </span>
                <ArrowUpRight
                  className="w-4 h-4 !text-white text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                  style={{ color: "#ffffff", stroke: "#ffffff" }}
                />
              </a>
            </div>
          </div>
        </section>

        {/* Unified Security FAQ */}
        <FaqSection
          title="Security Questions & Answers"
          subtitle="Learn more about how we safeguard your data, models, and credentials."
          items={securityFaqs}
        />
      </motion.main>
      <Footer />
    </div>
  );
}
