"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Activity,
  ArrowRight,
  ArrowDownRight,
  Check,
  ChevronRight,
  Cloud,
  Database,
  Eye,
  Fingerprint,
  Lock,
  ShieldAlert,
  Network,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

const SECURITY_LAYERS = [
  {
    id: "01",
    title: "Application security",
    description:
      "Protect applications, APIs, and microservices from vulnerabilities, injection exploits, and unauthorized access.",
    icon: Terminal,
    items: [
      "API gateway protection",
      "Real-time app monitoring",
      "Vulnerability detection",
    ],
  },
  {
    id: "02",
    title: "AI security",
    description:
      "Build rigorous guardrails around LLMs, multi-agent swarms, prompts, vectors, and autonomous agent executions.",
    icon: Sparkles,
    items: [
      "Prompt injection defense",
      "Autonomous agent RBAC",
      "Runtime model monitoring",
    ],
  },
  {
    id: "03",
    title: "Cloud security",
    description:
      "Maintain 360° visibility and fine-grained control across multi-cloud workloads, serverless runtimes, and VPCs.",
    icon: Cloud,
    items: [
      "Multi-cloud visibility",
      "Misconfiguration defense",
      "Isolated VPC runtimes",
    ],
  },
  {
    id: "04",
    title: "Data security",
    description:
      "Protect sensitive enterprise data wherever it is stored, embedded in vector databases, or transferred across models.",
    icon: Database,
    items: [
      "AES-256 / TLS 1.3 encryption",
      "Zero-retention inference",
      "PII masking & redaction",
    ],
  },
  {
    id: "05",
    title: "Identity security",
    description:
      "Ensure engineering personnel, internal microservices, and autonomous AI agents have exact least-privilege credentials.",
    icon: Fingerprint,
    items: [
      "SAML SSO & OIDC integration",
      "Least-privilege RBAC",
      "Continuous session auditing",
    ],
  },
  {
    id: "06",
    title: "Network security",
    description:
      "Monitor low-latency edge connections and defend the global mesh infrastructure that routes model inference.",
    icon: Network,
    items: [
      "Sub-50ms traffic inspection",
      "Distributed DDoS mitigation",
      "Strict network egress rules",
    ],
  },
];

const APPROACH = [
  {
    number: "01",
    title: "Prevent",
    description:
      "Shrink attack surfaces, sanitize inputs, and establish proactive policy guardrails before threats become incidents.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Detect",
    description:
      "Continuously monitor live inference feeds, system logs, and agent activity to catch anomalies in real time.",
    icon: Radar,
  },
  {
    number: "03",
    title: "Respond",
    description:
      "Automate containment of compromised agents or unauthorized API keys with instant kill-switches and forensic context.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Leverage threat telemetry to continuously fortify prompt filters, harden configurations, and update security posture.",
    icon: ScanSearch,
  },
];

export default function SecurityPage() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-20 sm:pt-24 md:pt-28 flex-1 bg-white text-[#0f172a]"
      >
        {/* ================================================================
            HERO — RIVINITY CYBERSECURITY
        ================================================================= */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-white py-12 sm:py-16 md:py-20">
          {/* Ambient Background Grid & Radial Glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-180px] h-[580px] w-[580px] -translate-x-1/2 rounded-full bg-[#FF6B00]/[0.07] blur-[110px]" />
            <div
              className="absolute inset-0 opacity-[0.28]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(226,232,240,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(226,232,240,0.6) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
                maskImage: "linear-gradient(to bottom, black, transparent 80%)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50/80 px-3 py-1 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span className="text-xs font-semibold text-[#FF6B00] tracking-wide uppercase">
                    Enterprise Cybersecurity
                  </span>
                </div>

                <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#0f172a]">
                  Security built for{" "}
                  <span className="text-[#FF6B00]">intelligent systems.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#64748b]">
                  Protect applications, data pipelines, cloud infrastructure, and autonomous AI swarms
                  with sub-50ms threat detection, persistent zero-trust controls, and defense-in-depth architecture.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E66000] shadow-[0_4px_16px_rgba(255,107,0,0.25)] hover:shadow-[0_8px_24px_rgba(255,107,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <span>Talk to Security Team</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href="#security-layers"
                    className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium border border-slate-200 shadow-xs hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore 6 Layers</span>
                    <ArrowDownRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>
                </div>

                {/* Security Value Indicators */}
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-slate-100">
                  {[
                    ["Sub-50ms Threat Detection", Radar],
                    ["Zero-Trust AI Guardrails", Sparkles],
                    ["24/7 Continuous Audit Logs", Eye],
                  ].map(([title, Icon]) => (
                    <div key={title as string} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
                        <Icon className="h-3.5 w-3.5 text-[#FF6B00]" />
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        {title as string}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Cybersecurity Interactive Visual Radar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative flex items-center justify-center"
              >
                <div className="relative mx-auto h-[380px] sm:h-[420px] w-full max-w-[480px]">
                  {/* Concentric Radar Rings */}
                  {[380, 300, 220].map((size, i) => (
                    <div
                      key={size}
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                        i === 2 ? "border-orange-200" : "border-slate-200"
                      }`}
                      style={{ width: size, height: size }}
                    />
                  ))}

                  {/* Rotating Scanner Needle */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#FF6B00] shadow-[0_0_18px_rgba(255,107,0,0.8)]" />
                    <span className="absolute left-1/2 top-0 h-24 w-px bg-gradient-to-b from-[#FF6B00]/70 to-transparent" />
                  </motion.div>

                  {/* Center Rivinity Security Emblem */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {/* Outer Ambient Pulse */}
                    <motion.div
                      className="absolute -inset-8 rounded-full border border-orange-300/30"
                      animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Main Emblem Disc */}
                    <div className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_20px_60px_rgba(255,107,0,0.18)]">
                      <div className="absolute inset-2.5 rounded-full border border-orange-100" />
                      <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-orange-50">
                        {/* Shield Vector */}
                        <svg
                          viewBox="0 0 64 64"
                          className="h-10 w-10 sm:h-12 sm:w-12 text-[#FF6B00]"
                          fill="none"
                        >
                          <path
                            d="M32 6L51 14V29C51 41.5 43.2 52.2 32 58C20.8 52.2 13 41.5 13 29V14L32 6Z"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 31L28 37L42 23"
                            stroke="currentColor"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Operational Pulse Pill */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                            Protected
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Peripheral Connected Security Nodes */}
                  {[
                    {
                      name: "AI Security",
                      status: "Protected",
                      icon: Sparkles,
                      pos: "left-[4%] top-[12%]",
                      accent: true,
                    },
                    {
                      name: "Cloud VPC",
                      status: "Encrypted",
                      icon: Cloud,
                      pos: "right-[4%] top-[18%]",
                    },
                    {
                      name: "Threat Radar",
                      status: "Active",
                      icon: Radar,
                      pos: "bottom-[16%] left-[2%]",
                      accent: true,
                    },
                    {
                      name: "Vector Vault",
                      status: "Isolated",
                      icon: Database,
                      pos: "bottom-[10%] right-[2%]",
                    },
                  ].map((node, index) => {
                    const Icon = node.icon;
                    return (
                      <motion.div
                        key={node.name}
                        className={`absolute ${node.pos}`}
                        animate={{ y: [0, index % 2 ? 4 : -4, 0] }}
                        transition={{
                          duration: 3.5 + index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs px-3 py-2 shadow-sm">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                              node.accent ? "bg-orange-50 text-[#FF6B00]" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#0f172a]">
                              {node.name}
                            </p>
                            <p className="text-[9px] font-medium text-emerald-600">
                              {node.status}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 2: 6 SECURITY LAYERS (Tabbed Defense-in-Depth)
        ================================================================= */}
        <section id="security-layers" className="scroll-mt-20 border-b border-slate-100 bg-white py-14 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a] leading-tight">
                One unified security strategy.{" "}
                <span className="text-[#FF6B00]">Every critical layer.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                Security becomes unshakeable when visibility, access controls, detection heuristics, and automated response collaborate seamlessly across your full stack.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] items-start">
              {/* Left Layers Selector Buttons */}
              <div className="space-y-2.5">
                {SECURITY_LAYERS.map((layer, index) => {
                  const Icon = layer.icon;
                  const active = activeLayer === index;
                  return (
                    <motion.button
                      key={layer.id}
                      onClick={() => setActiveLayer(index)}
                      whileHover={{ x: active ? 0 : 3 }}
                      className={`group relative flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                        active
                          ? "border-orange-200 bg-orange-50/80 shadow-[0_8px_24px_rgba(255,107,0,0.08)]"
                          : "border-slate-200 bg-white hover:border-orange-200 hover:bg-slate-50"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-security-layer"
                          className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-[#FF6B00]"
                        />
                      )}
                      <div className="flex items-center gap-3.5">
                        <span className={`font-mono text-xs font-semibold ${active ? "text-[#FF6B00]" : "text-slate-400"}`}>
                          {layer.id}
                        </span>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                            active
                              ? "border-orange-200 bg-white text-[#FF6B00]"
                              : "border-slate-200 bg-slate-50 text-slate-600 group-hover:text-[#FF6B00]"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className={`text-sm font-semibold ${active ? "text-[#0f172a]" : "text-slate-700"}`}>
                          {layer.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {active && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF6B00]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                            Inspected
                          </span>
                        )}
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            active ? "text-[#FF6B00] translate-x-0.5" : "text-slate-400 group-hover:text-[#FF6B00]"
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}

                <div className="mt-4 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a]">
                        Continuous Zero-Trust Active
                      </p>
                      <p className="text-[11px] text-[#64748b]">
                        All 6 layers monitored concurrently under sub-50ms SLA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Layer Active Details Card */}
              <div className="relative min-h-[440px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-9 shadow-xs">
                {/* Background Ambient Decorator */}
                <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-64 w-64 rounded-full bg-[#FF6B00]/[0.08] blur-3xl" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                  >
                    {(() => {
                      const layer = SECURITY_LAYERS[activeLayer];
                      const Icon = layer.icon;
                      return (
                        <>
                          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
                              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
                                Layer {layer.id} Specifications
                              </span>
                            </div>
                            <span className="rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                              Active Guardrail
                            </span>
                          </div>

                          <div className="mt-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-[#FF6B00] shadow-xs">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                                {layer.title}
                              </h3>
                              <p className="mt-1 text-sm text-[#64748b]">
                                Defense protocol standard
                              </p>
                            </div>
                          </div>

                          <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
                            {layer.description}
                          </p>

                          <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            {layer.items.map((item, i) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-2xs"
                              >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF6B00]">
                                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                                  {item}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              <span className="text-xs font-medium text-slate-600">
                                99.99% Guaranteed uptime
                              </span>
                            </div>
                            <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                              Rivinity Security Engine
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 3: AI SECURITY DASHBOARD
        ================================================================= */}
        <section className="border-b border-slate-100 bg-[#fafbfc] py-14 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50 px-3 py-1 mb-3">
                  <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wide">
                    Live Telemetry
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a]">
                  Security for the age of AI.
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#64748b] leading-relaxed">
                  Protect AI workloads across prompt injections, multi-agent swarms, vector embeddings,
                  and model outputs with continuous sub-50ms visibility.
                </p>
              </div>

              <Link
                href="/research"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0f172a] hover:text-[#FF6B00] transition-colors"
              >
                <span>Explore AI Security Research</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Dashboard Mock Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]"
            >
              {/* Dashboard Top Header Bar */}
              <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f172a] text-white">
                    <Sparkles className="h-4 w-4 text-[#FF6B00]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#0f172a]">
                        AI Runtime Defense Engine
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Healthy
                      </span>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      Real-time inference filter
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[10px] font-medium text-slate-600">
                    LATENCY: 38ms
                  </span>
                  <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[10px] font-bold text-[#FF6B00]">
                    ZERO-LEAK ACTIVE
                  </span>
                </div>
              </div>

              {/* Dashboard Metrics Cards */}
              <div className="p-5 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        AI Risk Score
                      </span>
                      <ShieldCheck className="h-4 w-4 text-[#FF6B00]" />
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
                        14/100
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        Ultra Low
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[14%] rounded-full bg-[#FF6B00]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Tokens Scanned
                      </span>
                      <Activity className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="mt-3">
                      <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
                        12.8M
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      ↑ 14.2% scanned today
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Pass Rate
                      </span>
                      <Lock className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="mt-3">
                      <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
                        99.98%
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Zero PII leakage recorded
                    </p>
                  </div>

                  <div className="rounded-2xl border border-orange-200/90 bg-orange-50/50 p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00]">
                        Threats Blocked
                      </span>
                      <ShieldAlert className="h-4 w-4 text-[#FF6B00]" />
                    </div>
                    <div className="mt-3">
                      <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
                        42
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-[#FF6B00]">
                      Injections contained in 24h
                    </p>
                  </div>
                </div>

                {/* Dashboard Lower Graph & Protected Flow */}
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
                  {/* Activity Bar Chart */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Inference Threat Telemetry (24H)
                        </p>
                        <p className="text-xs text-[#64748b] mt-0.5">
                          Sub-50ms prompt inspection vectors
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                        <span className="text-xs font-medium text-slate-600">
                          Filtered Events
                        </span>
                      </div>
                    </div>

                    <div className="relative mt-6 h-32 flex items-end justify-between gap-1.5">
                      {[32, 45, 28, 62, 48, 70, 52, 80, 64, 88, 72, 94, 76, 85, 68, 92, 78, 86].map(
                        (height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.02 }}
                            className="w-full rounded-t-md bg-[#FF6B00]/35 hover:bg-[#FF6B00] transition-colors"
                          />
                        )
                      )}
                    </div>
                    <div className="mt-3 flex justify-between font-mono text-[10px] text-slate-400">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>24:00</span>
                    </div>
                  </div>

                  {/* Pipeline Stage Visual */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Inference Pipeline
                      </p>
                      <p className="text-xs text-[#64748b] mt-0.5">
                        Guaranteed zero-drop security chain
                      </p>
                    </div>

                    <div className="my-auto space-y-2 py-3">
                      {[
                        ["Prompt Input", Terminal],
                        ["Rivinity Firewall", ShieldCheck],
                        ["Frontier Model", Sparkles],
                        ["Sanitized Response", Lock],
                      ].map(([label, Icon], idx) => (
                        <div key={label as string} className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                              idx === 1
                                ? "border-orange-200 bg-orange-50 text-[#FF6B00]"
                                : "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-semibold text-slate-800 flex-1">
                            {label as string}
                          </span>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>End-to-end verified</span>
                      <span className="font-mono text-emerald-600 font-semibold">TLS 1.3</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            SECTION 4: SECURITY APPROACH (Continuous Lifecycle)
        ================================================================= */}
        <section className="border-b border-slate-100 bg-white py-14 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-stretch">
              {/* Left Column Brand Card */}
              <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-7 sm:p-10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50 px-3 py-1 mb-4">
                    <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wide">
                      Security Lifecycle
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a] leading-tight">
                    Security is a <span className="text-[#FF6B00]">continuous</span> process.
                  </h2>
                  <p className="mt-4 text-base text-[#64748b] leading-relaxed">
                    Always learning. Always improving. Defense is not a one-time deployment, but a perpetual feedback loop of detection and system hardening.
                  </p>
                </div>

                <div className="relative my-8 h-48 overflow-hidden rounded-2xl border border-orange-100 bg-white flex items-center justify-center shadow-xs">
                  <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent opacity-70" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-[#FF6B00] shadow-sm">
                    <ShieldCheck className="h-12 w-12" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>STATUS: ACTIVE</span>
                    <span>DEFENSE-IN-DEPTH</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-[#64748b]">
                  <span>Continuous Verification Architecture</span>
                  <span className="font-mono text-slate-400">ISO 27001 / SOC 2</span>
                </div>
              </div>

              {/* Right Column Step Carousel */}
              <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    4-Stage Continuous Defense
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const carousel = document.getElementById("security-carousel");
                        if (carousel) {
                          carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
                        }
                      }}
                      aria-label="Previous security stage"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-orange-300 hover:text-[#FF6B00] cursor-pointer shadow-2xs"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const carousel = document.getElementById("security-carousel");
                        if (carousel) {
                          carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
                        }
                      }}
                      aria-label="Next security stage"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-orange-300 hover:text-[#FF6B00] cursor-pointer shadow-2xs"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Swipe/Scroll Cards */}
                <div
                  id="security-carousel"
                  className="mt-6 w-full min-w-0 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="flex w-full gap-4">
                    {APPROACH.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.number}
                          className="w-full min-w-full shrink-0 snap-start"
                        >
                          <div className="group flex min-h-[380px] w-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 transition-all duration-300 hover:border-orange-200 hover:shadow-[0_16px_40px_rgba(255,107,0,0.08)]">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-sm font-bold text-[#FF6B00]">
                                  STAGE {item.number}
                                </span>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-[#FF6B00]">
                                  <Icon className="h-5 w-5" />
                                </div>
                              </div>

                              <div className="mt-8">
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                                  {item.title}
                                </h3>
                                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#64748b]">
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
                              <span>Autonomous Lifecycle</span>
                              <span className="font-mono">{item.number}/04</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-5 rounded-2xl border border-slate-200/90 bg-slate-50 p-3.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  <span className="text-[#FF6B00] font-bold">1. Prevent</span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                  <span>2. Detect</span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                  <span>3. Respond</span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                  <span>4. Improve</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 5: SECURITY INQUIRIES & ADVISORY
        ================================================================= */}
        <section className="border-b border-slate-100 bg-[#fafbfc] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] border border-orange-200/80 bg-white p-8 sm:p-12 shadow-[0_20px_50px_-15px_rgba(255,107,0,0.08)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FF6B00]/[0.07] blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50 px-3 py-1 mb-4">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#FF6B00]" />
                    <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wide">
                      Security Advisory
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                    Have a custom security requirement?
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#64748b]">
                    Talk with our dedicated security engineering leads about air-gapped single-tenant deployments,
                    custom SOC 2 BAA agreements, model injection penetration tests, and tailored compliance packages.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-700">
                    {["VPC Peering & Air-Gapped", "Custom BAA & DPA Ready", "Third-Party Audited Code"].map((text) => (
                      <div key={text} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-[#FF6B00]" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[260px]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 mb-4">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Security Engineers Online</span>
                    </div>

                    <Link
                      href="/contact"
                      className="group inline-flex w-full items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E66000] shadow-[0_4px_16px_rgba(255,107,0,0.25)] hover:shadow-[0_8px_24px_rgba(255,107,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                    >
                      <span>Contact Security</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <p className="mt-3 text-[11px] text-[#64748b]">
                      Average advisory response: &lt; 2 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Security FAQ */}
        <FaqSection
          title="Questions about Rivinity cybersecurity?"
          subtitle="Learn how Rivinity approaches application security, cloud isolation, AI guardrails, data privacy, and vulnerability management."
          items={[
            {
              question: "Do you train AI models on customer data or prompts?",
              answer:
                "Never. Rivinity operates on strict zero-retention policies. Your prompts, proprietary document embeddings, and model responses are never stored for training foundational models.",
            },
            {
              question: "How does Rivinity defend against prompt injection and jailbreaking?",
              answer:
                "Rivinity intercepts every inference request through an inline sub-50ms security filter that validates prompt boundaries, inspects vector retrieval contexts, and prevents adversarial jailbreak attempts before reaching the LLM.",
            },
            {
              question: "Can we deploy Rivinity inside our own isolated VPC?",
              answer:
                "Yes. Enterprise plans support single-tenant VPC peering on AWS, GCP, and Azure, as well as air-gapped disconnected runtimes for regulated healthcare, defense, and banking institutions.",
            },
            {
              question: "What compliance standards does Rivinity support?",
              answer:
                "Rivinity is architected in accordance with SOC 2 Type II, ISO 27001, GDPR, and HIPAA standards. Enterprise customers can sign standard Business Associate Agreements (BAAs).",
            },
            {
              question: "How is data encrypted at rest and in transit?",
              answer:
                "All customer secrets, vector databases, and state records are encrypted with AES-256 with optional customer-managed keys (BYOK). All external and inter-service network communications require TLS 1.3.",
            },
            {
              question: "How can our security team report a vulnerability or request a penetration audit?",
              answer:
                "You can reach our dedicated Security Operations Center directly through our contact page or by emailing security@rivinity.ai for vulnerability disclosure and compliance reports.",
            },
          ]}
        />

        {/* Unified Dynamic CTA Section */}
        <CtaSection
          title="Secure your AI perimeter with zero-trust defense"
          description="Protect LLM runtimes, API gateways, and multi-agent workflows against prompt injection, data exfiltration, and model evasion attacks."
          buttonText="Schedule Security Audit"
          buttonHref="/contact"
          secondaryText="Explore Threat Detection"
          secondaryHref="#layers"
        />
      </motion.main>

      <Footer />
    </div>
  );
}