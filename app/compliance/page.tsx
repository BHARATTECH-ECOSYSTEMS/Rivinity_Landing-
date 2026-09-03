"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/cta-section";
import FaqSection from "@/components/sections/faq-section";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  Eye,
  Cpu,
  Check,
} from "lucide-react";

/* ============================================================
   DATA DEFINITIONS
============================================================ */

const APPROACH = [
  {
    number: "01",
    title: "Security First",
    description:
      "We build security into every layer of our products, from infrastructure and access controls to monitoring and data protection.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Privacy by Design",
    description:
      "We respect user data and design our systems around privacy, transparency, and responsible handling of information.",
    icon: Lock,
  },
  {
    number: "03",
    title: "Continuous Improvement",
    description:
      "We continuously evaluate, test, and improve our systems to maintain strong security, reliability, and compliance.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Responsible Innovation",
    description:
      "We innovate thoughtfully, balancing new technology with security, accountability, transparency, and user trust.",
    icon: Eye,
  },
];

const TABS = [
  {
    title: "Data Minimization",
    short: "01",
    description:
      "We collect only the information that is necessary for legitimate and clearly defined purposes. This helps reduce unnecessary data collection and limits the amount of data that needs to be protected.",
    points: [
      "Collect only necessary information",
      "Avoid unnecessary data collection",
      "Review information requirements regularly",
    ],
  },
  {
    title: "Purpose Limitation",
    short: "02",
    description:
      "Information is used only for clearly defined and legitimate purposes. We aim to ensure that personal information is not used in ways that are unexpected or inconsistent with its intended purpose.",
    points: [
      "Clearly define data usage",
      "Limit secondary uses",
      "Maintain responsible data practices",
    ],
  },
  {
    title: "Access Control",
    short: "03",
    description:
      "Access to information is restricted according to authorized roles and responsibilities. We use appropriate controls to help ensure that information is available only to people who need it.",
    points: [
      "Role-based access controls",
      "Authorized personnel only",
      "Regular access reviews",
    ],
  },
  {
    title: "Secure Handling",
    short: "04",
    description:
      "We apply appropriate technical and organizational measures to help protect information against unauthorized access, misuse, alteration, disclosure, or loss.",
    points: [
      "SOC 2 Type II security controls",
      "Protected information handling",
      "Continuous security improvements",
    ],
  },
  {
    title: "Retention",
    short: "05",
    description:
      "Information is retained only for as long as necessary for legitimate business, legal, operational, or security purposes. When information is no longer required, appropriate disposal practices are applied.",
    points: [
      "Defined retention periods",
      "Periodic data reviews",
      "Responsible disposal",
    ],
  },
  {
    title: "Transparency",
    short: "06",
    description:
      "We believe individuals should have a clear understanding of how their information is handled. We aim to communicate our privacy practices in a straightforward and accessible way.",
    points: [
      "Clear privacy information",
      "Accessible policies",
      "Open communication",
    ],
  },
];

const AI_PRINCIPLES = [
  {
    title: "Human Oversight",
    description:
      "AI systems are developed and deployed with appropriate human oversight, particularly where outputs may have significant consequences.",
  },
  {
    title: "Data Protection",
    description:
      "We consider privacy and security when handling information used by or processed through AI-powered systems.",
  },
  {
    title: "Evaluation & Testing",
    description:
      "AI systems are continuously evaluated for reliability, security, and intended behavior before and during deployment.",
  },
  {
    title: "Transparency",
    description:
      "We aim to communicate clearly about the role of AI within our products and services where appropriate.",
  },
  {
    title: "Responsible Development",
    description:
      "We work to identify and reduce potential risks associated with AI systems while continuing to improve our development practices.",
  },
];

const FAQS = [
  {
    question: "Is Rivinity SOC 2 certified?",
    answer:
      "Yes, Rivinity maintains SOC 2 Type II compliance. Contact our enterprise team to request our latest security assessments, certifications, and compliance documentation.",
  },
  {
    question: "Is Rivinity ISO 27001 certified?",
    answer:
      "Please contact our compliance team for the current status of ISO 27001 certifications or third-party audit assessments.",
  },
  {
    question: "Does Rivinity support GDPR requirements?",
    answer:
      "Where GDPR applies, Rivinity adheres to strict data protection requirements in its privacy and data-handling practices. Review our Privacy Policy for specific details.",
  },
  {
    question: "How does Rivinity protect customer data?",
    answer:
      "We enforce enterprise-grade security including role-based access controls, zero data training policies, isolated VPC deployment options, and round-the-clock monitoring.",
  },
  {
    question: "How does Rivinity incorporate AI responsibly?",
    answer:
      "Where AI is integrated into our canvas engines, we apply human-in-the-loop oversight, rigorous model evaluations, and explicit data governance guarantees.",
  },
];

/* ============================================================
   PRIVACY TABS SUB-COMPONENT
============================================================ */

function PrivacyTabs() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const active = TABS[activeTab];

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
      {/* TAB HEADERS */}
      <div className="border-b border-[#E5E7EB] bg-[#F7F7F8] overflow-x-auto">
        <div className="flex w-full min-w-max">
          {TABS.map((tab, index) => {
            const isSelected = activeTab === index;
            return (
              <button
                key={tab.title}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`relative flex-1 whitespace-nowrap px-4 py-3.5 sm:px-6 sm:py-4 text-center text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "text-[#FF6B00] bg-white"
                    : "text-[#6B7280] hover:text-[#1A1A1A]"
                }`}
              >
                <span className="mr-1.5 font-mono opacity-60">{tab.short}</span>
                {tab.title}

                {isSelected && (
                  <motion.div
                    layoutId="privacy-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B00]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="p-6 sm:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-start"
          >
            {/* LEFT DETAILS */}
            <div>
              <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider bg-[#FF6B00]/10 px-2.5 py-1 rounded-full border border-[#FF6B00]/20">
                Core Pillar {active.short}
              </span>

              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
                {active.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {active.description}
              </p>

              <div className="text-white">
                 <Link
                href="/privacy"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-5 py-2.5 text-xs font-boldshadow-xs hover:bg-neutral-800 active:scale-95 transition-all"
              >
                Read Privacy Policy &rarr;
              </Link>
              </div>
             
            </div>

            {/* RIGHT CHECKLIST */}
            <div className="space-y-3">
              {active.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] p-4 flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Check size={16} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                      {point}
                    </p>
                    <p className="text-[11px] text-[#6B7280]">
                      Enforced as part of Rivinity&apos;s data governance model.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN SECURITY PAGE
============================================================ */

export default function SecurityPage() {
  const [activeAIPrinciple, setActiveAIPrinciple] = useState(0);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased overflow-x-hidden flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-28 sm:pt-32 md:pt-36 pb-16"
      >
        {/* Hero Section */}
        <section className="section border-b border-slate-200 pb-12 sm:pb-20">
          <div className="container">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0f172a] leading-[1.18] sm:leading-[1.15]">
                Building Trust Through <span className="text-[#FF6B00]">Verifiable Security</span>
              </h1>
              <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-[#64748b] leading-relaxed">
                Rivinity is committed to protecting customer data, enforcing strict zero-training privacy guarantees, and maintaining bank-grade security standards across every engine tier.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="text-white flex flex-col">
                  <a
                    href="#privacy"
                    className="rounded-full bg-[#0f172a] px-6 py-3 min-h-[44px] flex items-center justify-center text-center text-sm font-semibold shadow-xs hover:bg-slate-800 active:scale-95 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                  >
                    View Privacy Framework &darr;
                  </a>
                </div>
                <Link
                  href="/contact"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 min-h-[44px] flex items-center justify-center text-center text-sm font-semibold text-slate-800 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                >
                  Contact Security Team
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Metrics Bar */}
        <section className="section border-b border-[#E5E7EB] bg-[#F7F7F8]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
              {[
                { title: "Security First", desc: "SOC 2 Type II certified architecture" },
                { title: "Privacy Guarantee", desc: "Zero data training on customer inputs" },
                { title: "Responsible AI", desc: "Human-in-the-loop oversight model" },
                { title: "Governance", desc: "Granular SAML/SSO & RBAC controls" },
              ].map((item, idx) => (
                <div key={idx} className="p-5 sm:p-8 sm:first:pl-0 sm:last:pr-0">
                  <div className="text-base sm:text-lg font-extrabold text-[#1A1A1A]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-medium text-[#6B7280]">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="section border-b border-[#E5E7EB] py-12 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                Trust Built Through Continuous Commitment
              </h2>
              <p className="mt-3 text-xs sm:text-sm lg:text-base text-[#6B7280] leading-relaxed">
                Compliance is an ongoing engineering standard. Here is how we embed safety directly into the Rivinity pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {APPROACH.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.number}
                    className="group bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-6 shadow-xs hover:border-[#FF6B00]/40 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                          <IconComp size={20} />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#6B7280]">
                          {item.number}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Privacy Tabs Section */}
        <section id="privacy" className="section border-b border-[#E5E7EB] bg-[#F7F7F8] py-12 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                Privacy Engine Architecture
              </h2>
              <p className="mt-3 text-xs sm:text-sm lg:text-base text-[#6B7280] leading-relaxed">
                Explore our six-part data governance model built to ensure transparency and complete user sovereignty.
              </p>
            </div>

            <PrivacyTabs />
          </div>
        </section>

        {/* Responsible AI Slider */}
        <section className="section border-b border-[#E5E7EB] py-12 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                Responsible AI Principles
              </h2>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-[#E5E7EB] bg-[#F7F7F8] p-6 sm:p-10 shadow-xs">
              <div className="flex items-center justify-between mb-6 border-b border-[#E5E7EB] pb-4">
                <div className="text-xs font-mono font-bold text-[#6B7280]">
                  <span className="text-[#1A1A1A]">
                    {String(activeAIPrinciple + 1).padStart(2, "0")}
                  </span>{" "}
                  / {String(AI_PRINCIPLES.length).padStart(2, "0")}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveAIPrinciple((curr) =>
                        curr === 0 ? AI_PRINCIPLES.length - 1 : curr - 1
                      )
                    }
                    className="w-9 h-9 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center text-[#1A1A1A] hover:border-[#FF6B00] transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveAIPrinciple((curr) =>
                        curr === AI_PRINCIPLES.length - 1 ? 0 : curr + 1
                      )
                    }
                    className="w-9 h-9 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center text-[#1A1A1A] hover:border-[#FF6B00] transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAIPrinciple}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-5">
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider bg-[#FF6B00]/10 px-2.5 py-1 rounded-full border border-[#FF6B00]/20">
                      Principle {activeAIPrinciple + 1}
                    </span>
                    <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-[#1A1A1A]">
                      {AI_PRINCIPLES[activeAIPrinciple].title}
                    </h3>
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-xs sm:text-base text-[#6B7280] leading-relaxed">
                      {AI_PRINCIPLES[activeAIPrinciple].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Unified FAQ Section */}
        <FaqSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our compliance certifications and privacy policies."
          items={FAQS}
        />

        <CtaSection
          title="Ready for verifiable enterprise security?"
          description="Speak with our compliance architects and security engineering team today."
          buttonText="Contact Security Team"
          buttonHref="/contact"
        />
      </motion.main>

      <Footer />
    </div>
  );
}