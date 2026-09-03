"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Server,
  FileText,
  KeyRound,
  EyeOff,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All customer data, model prompts, and agent state artifacts are encrypted at rest using AES-256 and in transit via TLS 1.3.",
  },
  {
    icon: KeyRound,
    title: "Granular Access Controls (RBAC)",
    description:
      "Enforce least-privilege access with fine-grained role-based permissions, custom workspace boundaries, and SAML/SSO integration.",
  },
  {
    icon: EyeOff,
    title: "Zero-Retention Privacy Options",
    description:
      "Enterprise customers can enable zero-data-retention modes. Your inference data is never stored on disk or used for training.",
  },
  {
    icon: Server,
    title: "Sovereign & Isolated Runtimes",
    description:
      "Deploy models within dedicated Single-Tenant VPCs, air-gapped environments, or localized regions with static outbound IPs.",
  },
  {
    icon: FileText,
    title: "Continuous Audit Logging",
    description:
      "Comprehensive, tamper-proof logs capture all tool executions, API interactions, and user activity for real-time compliance monitoring.",
  },
  {
    icon: ShieldCheck,
    title: "Prompt Injection Protection",
    description:
      "Real-time guardrail filtering inspecting retrieval vectors and prompt boundaries to prevent adversarial injection attacks.",
  },
];

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
                Enterprise trust built into <span className="text-[#FF6B00]">every layer</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed max-w-2xl mx-auto">
                We design AI infrastructure with defense-in-depth principles — protecting your data, agent workflows, and cloud deployments around the clock.
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
                  <h3 className="text-sm font-semibold text-[#0f172a]">{item.name}</h3>
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
              {securityFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-[#FF6B00]/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-4">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Responsible Disclosure Banner */}
        <section className="section py-16 bg-[#F7F7F8] border-t border-slate-200">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-1 block">
                  Vulnerability Disclosure
                </span>
                <h3 className="text-2xl font-semibold text-[#0f172a]">
                  Found a security issue?
                </h3>
                <p className="text-sm text-[#64748b] mt-2 max-w-xl">
                  We value the security community. If you discover a vulnerability, please report it to our security team for a prompt response.
                </p>
              </div>

              <a
                href="mailto:security@rivinity.com"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#e66000] transition whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
              >
                Report Vulnerability
                <ArrowRight size={16} />
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

        <div className="text-center pb-12">
          <p className="text-sm text-[#6B7280]">
            Need our SOC 2 report or security whitepaper?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#FF6B00] hover:underline"
            >
              Contact Enterprise Security
            </Link>
          </p>
        </div>

        {/* Unified CTA Section */}
        <CtaSection
          title="Ready for bank-grade AI security?"
          description="Deploy intelligent agents with guaranteed privacy, zero data retention, and strict compliance."
          buttonText="Contact Security Team"
          buttonHref="/contact"
        />
      </motion.main>
      <Footer />
    </div>
  );
}