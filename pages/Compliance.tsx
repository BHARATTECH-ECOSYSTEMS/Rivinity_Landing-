"use client";

import Head from "next/head";
import Link from "next/link";
import {
  FileCheck,
  Globe2,
  Database,
  Scale,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

const complianceFrameworks = [
  {
    icon: FileCheck,
    title: "SOC 2 Type II Certified",
    description:
      "Independently audited controls covering security, availability, processing integrity, and data confidentiality.",
  },
  {
    icon: Globe2,
    title: "GDPR & CCPA Compliant",
    description:
      "Full compliance with global data privacy regulations, including data subject access rights and localized data processing.",
  },
  {
    icon: Database,
    title: "Strict Data Residency",
    description:
      "Store and process agent data exclusively within your designated geographic region (US, EU, India, or Custom Sovereign Clouds).",
  },
  {
    icon: Scale,
    title: "AI Ethics & Transparency",
    description:
      "Built-in provenance tracking, auditability, and tool-call logging to align with global AI governance standards (EU AI Act ready).",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA BAA Available",
    description:
      "Business Associate Agreements (BAAs) available for enterprise healthcare workloads processing protected health information (PHI).",
  },
  {
    icon: Building2,
    title: "ISO 27001 Certified",
    description:
      "Adherence to international standards for information security management systems (ISMS) across all cloud environments.",
  },
];

const governanceGuarantees = [
  {
    title: "No Unconsented Model Training",
    detail: "Your proprietary inputs, outputs, and agent parameters are never used to train base foundation models.",
  },
  {
    title: "Data Deletion SLA",
    detail: "Automated purge workflows guarantee complete deletion of workspace artifacts upon subscription cancellation.",
  },
  {
    title: "Static Egress IPs",
    detail: "Enforce strict perimeter firewall policies with dedicated outbound static IP addresses for your agent runtimes.",
  },
];

const complianceFaqs = [
  {
    q: "How does Rivinity handle EU AI Act requirements?",
    a: "Our agent platform includes automated lineage tracing, human-in-the-loop audit logs, and hallucinated action safeguards designed to satisfy risk-management mandates for AI systems.",
  },
  {
    q: "Can we sign a Business Associate Agreement (BAA) for HIPAA compliance?",
    a: "Yes. Enterprise customers can sign custom BAAs to ensure healthcare data processing meets HIPAA administrative, physical, and technical safeguards.",
  },
  {
    q: "Where can we request your latest SOC 2 report?",
    a: "You can request our latest SOC 2 Type II audit report directly through our compliance portal or by contacting your dedicated account representative.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <Header />
      <Head>
        <title>Compliance & AI Governance — Rivinity</title>
      </Head>
      <main className="min-h-screen pt-24 bg-[var(--color-bg-primary,#ffffff)]">
        {/* Hero Section */}
        <section className="section py-16 md:py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl w-full max-w-none text-center">
                Regulated AI built for <span className="text-[#FF6B00]">global enterprise</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                We meet the world’s most stringent regulatory, privacy, and data governance standards so you can deploy AI agents with complete confidence.
              </p>
            </div>

            {/* Quick Policy Highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {governanceGuarantees.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-3">
                      <CheckCircle2 size={18} />
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks Grid */}
        <section className="section pb-20">
          <div className="container">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-[#1A1A1A] sm:text-4xl w-full max-w-none text-center">
                Compliance Frameworks
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {complianceFrameworks.map((framework) => {
                const IconComponent = framework.icon;
                return (
                  <div
                    key={framework.title}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#FF6B00]/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-4">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                      {framework.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {framework.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Audit Packet CTA Banner */}
        <section className="section py-16 bg-[#F7F7F8] border-t border-[#E5E7EB]">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-1 block">
                  Enterprise Resource
                </span>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">
                  Request our Compliance Packet
                </h3>
                <p className="text-sm text-[#6B7280] mt-2 max-w-xl">
                  Get immediate access to our SOC 2 Type II summary, ISO certifications, penetration testing reports, and AI safety documentation.
                </p>
              </div>

              <Link
                href="/contact?topic=Enterprise%20Sales"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#e66000] transition whitespace-nowrap shrink-0"
              >
                Request Audit Packet
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Compliance FAQ */}
        <section className="section py-20 border-t border-[#E5E7EB]">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#1A1A1A] sm:text-4xl w-full max-w-none text-center">
                  Compliance Questions
                </h2>
              </div>

              <div className="space-y-4">
                {complianceFaqs.map((faq) => (
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
                    <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-[#6B7280]">
                  Have custom legal or regional compliance inquiries?{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-[#FF6B00] hover:underline"
                  >
                    Talk to our legal team
                  </Link>
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