"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Sliders,
  Sparkles,
  ArrowRight,
  Play,
  Check,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CtaSection from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TestimonialsSection, type TestimonialItem } from "@/components/sections/testimonials-section";
import { ConnectToolsSlider } from "@/components/sections/connect-tools-slider";
import { BouncyCardsFeatures } from "@/components/sections/bouncy-cards-features";
import { useAuthModal } from "@/components/auth/auth-context";

/* ------------------------------------------------------------------ */
/* Image 1 Landscape Grid Icon Card Helper (Orange, Purple, Pink)     */
/* ------------------------------------------------------------------ */
function Image1LandscapeCard({
  color,
  title,
  description,
  icon: Icon,
}: {
  color: "orange" | "purple" | "pink";
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const styles = {
    orange: {
      grid: "rgba(255, 107, 0, 0.14)",
      border: "border-orange-200/80",
      hoverBorder: "hover:border-[#FF6B00]",
      glow: "group-hover:shadow-orange-500/10",
      text: "text-[#FF6B00]",
      badge: "bg-orange-50 text-[#FF6B00] border-orange-200/70",
    },
    purple: {
      grid: "rgba(139, 92, 246, 0.14)",
      border: "border-purple-200/80",
      hoverBorder: "hover:border-purple-400",
      glow: "group-hover:shadow-purple-500/10",
      text: "text-purple-600",
      badge: "bg-purple-50 text-purple-700 border-purple-200/70",
    },
    pink: {
      grid: "rgba(236, 72, 153, 0.14)",
      border: "border-pink-200/80",
      hoverBorder: "hover:border-pink-400",
      glow: "group-hover:shadow-pink-500/10",
      text: "text-pink-600",
      badge: "bg-pink-50 text-pink-700 border-pink-200/70",
    },
  }[color];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex flex-col items-center text-center rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/80 shadow-xs hover:shadow-xl ${styles.glow} ${styles.hoverBorder} transition-all`}
    >
      {/* Subtle Matrix Grid with Centered Minimalist Icon (From Image 1) */}
      <div className="relative mx-auto mb-6 flex h-32 w-36 items-center justify-center">
        <div
          className="absolute inset-1 rounded-2xl opacity-75"
          style={{
            backgroundImage: `linear-gradient(to right, ${styles.grid} 1px, transparent 1px), linear-gradient(to bottom, ${styles.grid} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white border ${styles.border} shadow-sm group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`h-5 w-5 ${styles.text}`} />
        </div>
      </div>

      {/* Card Content */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Image 3 Track Cards Component                                      */
/* ------------------------------------------------------------------ */
function Image3TrackCards() {
  const { openAuth } = useAuthModal();
  const tracks = [
    {
      badge: "Open / Invite-priority",
      badgeDot: "bg-[#FF6B00]",
      title: "Companies",
      desc: "Build teams of highly motivated AI engineers across the globe, with production projects and sub-50ms latency standards.",
      linkText: "Start hiring",
      linkHref: "/contact",
      cardBg: "bg-amber-50/40 border-amber-200/70",
      graphic: (
        <svg className="w-28 h-28 sm:w-36 sm:h-36 opacity-85" viewBox="0 0 120 120" fill="none">
          <rect x="15" y="15" width="40" height="40" rx="14" fill="#FFB787" />
          <rect x="65" y="15" width="40" height="40" rx="14" fill="#FF9454" />
          <rect x="15" y="65" width="40" height="40" rx="14" fill="#FF7A29" />
          <rect x="65" y="65" width="40" height="40" rx="14" fill="#FF5E00" />
        </svg>
      ),
    },
    {
      badge: "Open for applications",
      badgeDot: "bg-slate-900",
      title: "Builders",
      desc: "Work on your own terms in a motivating and healthy environment. Master autonomous agents and earn verifiable cryptographic credentials.",
      linkText: "Apply now",
      linkHref: "/signup",
      cardBg: "bg-slate-50 border-slate-200/80",
      graphic: (
        <svg className="w-28 h-28 sm:w-36 sm:h-36 opacity-75" viewBox="0 0 120 120" fill="none">
          <circle cx="85" cy="35" r="28" fill="#CBD5E1" />
          <path d="M20 90C20 62.3858 42.3858 40 70 40V90H20Z" fill="#94A3B8" />
          <path d="M75 60C75 76.5685 61.5685 90 45 90C28.4315 90 15 76.5685 15 60H75Z" fill="#64748B" />
        </svg>
      ),
    },
    {
      badge: "Invite only",
      badgeDot: "bg-purple-600",
      title: "Scouts & Mentors",
      desc: "Utilize your network to refer top engineers and companies to earn governance rewards and access private enterprise cohorts.",
      linkText: "Request invite",
      linkHref: "/contact",
      cardBg: "bg-purple-50/40 border-purple-200/70",
      graphic: (
        <svg className="w-28 h-28 sm:w-36 sm:h-36 opacity-85" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" fill="#E9D5FF" opacity="0.6" />
          <circle cx="60" cy="60" r="34" fill="#C084FC" opacity="0.8" />
          <circle cx="60" cy="60" r="18" fill="#9333EA" />
        </svg>
      ),
    },
    {
      badge: "Invite only",
      badgeDot: "bg-pink-500",
      title: "Partners",
      desc: "Offer direct access to the Rivinity ecosystem to your portfolio companies, engineering teams, and community developers.",
      linkText: "Get in touch",
      linkHref: "/contact",
      cardBg: "bg-pink-50/40 border-pink-200/70",
      graphic: (
        <svg className="w-28 h-28 sm:w-36 sm:h-36 opacity-85" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 14C60 39.4 39.4 60 14 60C39.4 60 60 80.6 60 106C60 80.6 80.6 60 106 60C80.6 60 60 39.4 60 14Z"
            fill="#F472B6"
          />
          <circle cx="60" cy="60" r="22" fill="#FBCFE8" opacity="0.9" />
          <circle cx="60" cy="60" r="11" fill="#EC4899" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
            Tailored tracks for every stage of your journey
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you are building your first autonomous agent or managing an enterprise engineering org, Rivinity has a dedicated track.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {tracks.map((track, i) => (
            <div
              key={i}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all hover:shadow-md ${track.cardBg}`}
            >
              <div>
                {/* Top-left Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs border border-slate-200 mb-6">
                  <span className={`h-2 w-2 rounded-full ${track.badgeDot}`} />
                  <span>{track.badge}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-xs sm:max-w-sm">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                  {/* Right-Side Abstract Geometric Art (From Image 3) */}
                  <div className="hidden sm:flex shrink-0 items-center justify-center">
                    {track.graphic}
                  </div>
                </div>
              </div>

              {/* Bottom Link with Arrow */}
              <div className="mt-8 pt-4 border-t border-slate-900/5">
                {track.linkHref === "/signup" ? (
                  <button
                    type="button"
                    onClick={() => openAuth("signup")}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#FF6B00] transition-colors group cursor-pointer border-b border-slate-900 pb-0.5 hover:border-[#FF6B00]"
                  >
                    <span>{track.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <Link
                    href={track.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#FF6B00] transition-colors group cursor-pointer border-b border-slate-900 pb-0.5 hover:border-[#FF6B00]"
                  >
                    <span>{track.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main Academy Page Export                                           */
/* ------------------------------------------------------------------ */
export default function AcademyPage() {
  const { openAuth } = useAuthModal();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const academyTestimonials: TestimonialItem[] = [
    {
      id: "1",
      quote:
        "The agent sandbox bridged the gap between toy tutorials and production tool orchestration. Passing the Level 5 Architect credential immediately unlocked senior AI infrastructure roles.",
      name: "Arjun Mehta",
      role: "Staff AI Engineer",
      company: "CloudScale Systems",
      avatar: "AM",
      stats: "Level 5 Certified",
      linkedin: "https://linkedin.com",
      verified: true,
    },
    {
      id: "2",
      quote:
        "The Residual Steg Security lab gave our team actionable techniques to detect covert prompt exfiltration. Easily the most rigorous AI security and guardrail curriculum out there.",
      name: "Sarah Chen",
      role: "Principal Security Architect",
      company: "CyberMatrix Security",
      avatar: "SC",
      stats: "Steg Certified",
      linkedin: "https://linkedin.com",
      verified: true,
    },
    {
      id: "3",
      quote:
        "Writing real TypeScript and Python code against sub-50ms latency budgets gave our platform team confidence to deploy autonomous agents directly into production.",
      name: "David Ross",
      role: "Lead Platform Architect",
      company: "NextGen AI Labs",
      avatar: "DR",
      stats: "Sub-50ms Routing",
      linkedin: "https://linkedin.com",
      verified: true,
    },
    {
      id: "4",
      quote:
        "Adding my cryptographic Rivinity credential to LinkedIn brought 4 inbound hiring offers in the first week. Companies take this certification seriously because you actually pass automated code test suites.",
      name: "Priya Sharma",
      role: "Senior ML Systems Engineer",
      company: "Vanguard Tech",
      avatar: "PS",
      stats: "LinkedIn Verified",
      linkedin: "https://linkedin.com",
      verified: true,
    },
  ];

  const faqs = [
    {
      question: "Is Rivinity Academy free to access?",
      answer:
        "Yes! All foundational courses, hands-on SDK labs, and technical tutorials in Rivinity Academy are 100% free and open to all engineers, researchers, and students.",
    },
    {
      question: "How does the AI Systems Tutor work?",
      answer:
        "Our AI tutor reviews your actual TypeScript and Python code, evaluates your agent tool schemas, and provides real-time guidance on latency budgets, memory state, and guardrail enforcement.",
    },
    {
      question: "Can I earn official certifications and add them to LinkedIn?",
      answer:
        "Yes. When you complete our capstone exams and pass practical sandbox test suites, Rivinity issues a cryptographically verified credential ID that integrates with LinkedIn's Licenses & Certifications with 1 click.",
    },
    {
      question: "What technical prerequisites are needed to succeed?",
      answer:
        "Beginner Builder tracks require basic familiarity with API calls and prompting. Advanced tracks assume intermediate programming experience with TypeScript or Python, asynchronous runtimes, and REST/tool integrations.",
    },
    {
      question: "How long do the learning tracks take to complete?",
      answer:
        "Modular focus tracks range from 2 to 6 hours of hands-on coursework. The comprehensive Capstone Architect Certification track typically takes 12 to 15 hours of self-paced study and sandbox labs.",
    },
    {
      question: "Do you offer team and enterprise certification options?",
      answer:
        "Yes. Our Enterprise Team plan provides engineering managers with an administrative skills dashboard, custom internal certification tracks, and dedicated technical mentor support.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
      {/* Universal Rivinity Header */}
      <Header />

      <main className="flex-1 pt-20 sm:pt-24">
        {/* ==================================================================== */}
        {/* Hero Section (Clean Orange Throughout, No Rainbow Text Gradient)     */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/30 via-white to-white pb-16 pt-14 sm:pt-20 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Headline (Clean Solid Orange Highlight, No Gradient Text) */}
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.12]">
                Your AI That Understands How You Learn & Build.
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
                Master autonomous agent runtimes, LLM security, and sub-50ms vector architectures.
                Complete hands-on code labs and earn official, verifiable Rivinity certifications.
              </p>

              {/* Action Buttons (Orange Throughout) */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#courses"
                  className="flex items-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 shadow-xs cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 text-[#FF6B00] fill-current" />
                  <span>See How It Works</span>
                </a>
              </div>
            </div>

            {/* ================================================================ */}
            {/* Image 1 3-Card Showcase in Landscape (Orange, Purple, Pink)       */}
            {/* ================================================================ */}
            <div className="mt-16 sm:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {/* Card 1: Orange */}
                <Image1LandscapeCard
                  color="orange"
                  icon={Zap}
                  title="Customizable"
                  description="Extensive customization options, allowing you to tailor every aspect to meet your specific needs."
                />

                {/* Card 2: Purple */}
                <Image1LandscapeCard
                  color="purple"
                  icon={Sliders}
                  title="You have full control"
                  description="From design elements to functionality, you have complete control to create a unique and personalized experience."
                />

                {/* Card 3: Pink */}
                <Image1LandscapeCard
                  color="pink"
                  icon={Sparkles}
                  title="Powered By AI"
                  description="Elements to functionality, you have complete control to create a unique experience."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* BouncyCardsFeatures Section (As Specified by User)                   */}
        {/* ==================================================================== */}
        <BouncyCardsFeatures />

        {/* ==================================================================== */}
        {/* Image 3 Track Cards Section (Audience & Curriculum Tracks)            */}
        {/* ==================================================================== */}
        <Image3TrackCards />

        {/* ==================================================================== */}
        {/* Connect Your Tools (Infinite Marquee with Real Brand SVGs)           */}
        {/* ==================================================================== */}
        <ConnectToolsSlider />

        {/* ==================================================================== */}
        {/* Pricing Section (Orange Featured Pro Plan)                           */}
        {/* ==================================================================== */}
        <section id="pricing" className="bg-white py-20 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl">
                Simple, transparent paths for every builder
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base">
                All foundational academy courses are free forever. Upgrade when you require official certification exams and team telemetry.
              </p>

              {/* Billing Toggle */}
              <div className="mt-8 inline-flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    billingCycle === "monthly"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === "annual"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>Annual</span>
                  <span className="text-[10px] font-bold text-[#FF6B00] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto items-stretch">
              {/* Free Plan */}
              <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-900">Self-Paced Builder</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">$0</span>
                    <span className="text-slate-500 text-xs"> / forever</span>
                  </div>
                  <p className="mb-6 text-xs text-slate-600">Perfect to explore all courses and public labs.</p>
                  <ul className="mb-8 space-y-3.5 list-none p-0 m-0">
                    {[
                      "Access all 12+ modular course tracks",
                      "Interactive browser code sandbox",
                      "Basic community support",
                      "Course completion certificates",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-800 transition hover:bg-slate-50 text-center shadow-xs cursor-pointer"
                >
                  Get Started Free
                </button>
              </div>

              {/* Pro Architect Plan (Signature Solid Orange Theme) */}
              <div className="relative rounded-3xl border-2 border-[#FF6B00] bg-white p-8 shadow-xl shadow-orange-500/10 flex flex-col justify-between">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#FF6B00] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                    Most Popular
                  </span>
                </div>
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B00] border border-orange-100">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-900">Certified Pro Architect</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {billingCycle === "annual" ? "$24" : "$29"}
                    </span>
                    <span className="text-slate-500 text-xs"> / month</span>
                  </div>
                  <p className="mb-6 text-xs text-slate-600">Official verified credentials and 1-on-1 AI tutoring.</p>
                  <ul className="mb-8 space-y-3.5 list-none p-0 m-0">
                    {[
                      "All 5 Official Certification Exams",
                      "Cryptographic verification URL & ID",
                      "1-Click LinkedIn Licenses Integration",
                      "Priority automated code evaluations",
                      "Unlimited Socratic AI Tutor queries",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <Check className="h-4 w-4 text-[#FF6B00] shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="w-full rounded-xl bg-[#FF6B00] hover:bg-[#E66000] py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all text-center cursor-pointer"
                >
                  Start Pro Certification
                </button>
              </div>

              {/* Team Plan */}
              <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-900">Enterprise Team</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                    <span className="text-slate-500 text-xs"> / seat</span>
                  </div>
                  <p className="mb-6 text-xs text-slate-600">For engineering teams building production agents.</p>
                  <ul className="mb-8 space-y-3.5 list-none p-0 m-0">
                    {[
                      "Admin dashboard for tracking team skills",
                      "Custom internal certification paths",
                      "Private instructor-led cohorts",
                      "Dedicated technical mentor support",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <Check className="h-4 w-4 text-purple-600 shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-800 transition hover:bg-slate-50 text-center shadow-xs cursor-pointer"
                >
                  Contact Enterprise Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* Dynamic Testimonials Section                                         */}
        {/* ==================================================================== */}
        <TestimonialsSection
          title="Engineered for builders who ship to production"
          subtitle="From autonomous agent builders to frontier security architects, see how engineers accelerate their career with Rivinity Academy."
          items={academyTestimonials}
        />

        {/* ==================================================================== */}
        {/* Dynamic FAQ Section                                                  */}
        {/* ==================================================================== */}
        <FaqSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about courses, certifications, and hands-on SDK labs."
          items={faqs}
        />

        {/* Pre-Footer Dynamic CTA Section */}
        <CtaSection
          title="Master production AI engineering & earn certifications"
          description="Take structured courses on agentic runtime architecture, prompt injection mitigation, and distributed inference optimization."
          buttonText="Enroll in Academy Free"
          buttonHref="/signup"
          secondaryText="View Course Catalog"
          secondaryHref="#courses"
          note="No credit card required • 100% Free foundational tracks • Verified digital credentials"
        />
      </main>

      {/* Universal Rivinity Footer */}
      <Footer />
    </div>
  );
}