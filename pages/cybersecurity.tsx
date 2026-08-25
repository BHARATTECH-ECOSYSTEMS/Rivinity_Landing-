"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Activity,
  ArrowRight,
  ArrowUpRight,
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
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";

const SECURITY_LAYERS = [
  {
    id: "01",
    title: "Application security",
    description:
      "Protect applications, APIs, and services from vulnerabilities and unauthorized access.",
    icon: Terminal,
    items: [
      "API protection",
      "Application monitoring",
      "Vulnerability detection",
    ],
  },
  {
    id: "02",
    title: "AI security",
    description:
      "Build guardrails around models, agents, prompts, data, and AI-powered workflows.",
    icon: Sparkles,
    items: [
      "Prompt protection",
      "Agent authorization",
      "Model monitoring",
    ],
  },
  {
    id: "03",
    title: "Cloud security",
    description:
      "Maintain visibility and control across cloud workloads, infrastructure, and services.",
    icon: Cloud,
    items: [
      "Cloud visibility",
      "Configuration monitoring",
      "Runtime protection",
    ],
  },
  {
    id: "04",
    title: "Data security",
    description:
      "Protect sensitive information wherever it is stored, processed, or transferred.",
    icon: Database,
    items: [
      "Data protection",
      "Access controls",
      "Encryption",
    ],
  },
  {
    id: "05",
    title: "Identity security",
    description:
      "Ensure people, applications, and autonomous systems have the right access.",
    icon: Fingerprint,
    items: [
      "Authentication",
      "Least privilege",
      "Access monitoring",
    ],
  },
  {
    id: "06",
    title: "Network security",
    description:
      "Monitor connections and protect the infrastructure that connects your systems.",
    icon: Network,
    items: [
      "Traffic monitoring",
      "Threat detection",
      "Network controls",
    ],
  },
];

const APPROACH = [
  {
    number: "01",
    title: "Prevent",
    description:
      "Reduce attack surfaces and establish security controls before threats become incidents.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Detect",
    description:
      "Continuously monitor systems and identify unusual activity as it happens.",
    icon: Radar,
  },
  {
    number: "03",
    title: "Respond",
    description:
      "Contain suspicious activity quickly and give teams the context needed to act.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Use security insights to strengthen systems and continuously improve resilience.",
    icon: ScanSearch,
  },
];



function SecurityOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Outer glow */}
      <div className="absolute inset-[10%] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Rings */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="absolute left-1/2 top-1/2 rounded-full border border-neutral-200"
          style={{
            width: `${55 + ring * 20}%`,
            height: `${55 + ring * 20}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 35 + ring * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Orbit dots */}
      <motion.div
        className="absolute left-[17%] top-[24%] h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.7)]"
        animate={{ y: [0, 14, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="absolute right-[16%] top-[35%] h-2 w-2 rounded-full bg-orange-400"
        animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-[22%] left-[28%] h-2 w-2 rounded-full bg-neutral-900"
        animate={{ x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      {/* Center */}
      <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:h-48 sm:w-48">
        <div className="absolute inset-3 rounded-full border border-orange-500/20" />

        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-2xl"
          animate={{
            boxShadow: [
              "0 0 0 rgba(249,115,22,0)",
              "0 0 40px rgba(249,115,22,0.2)",
              "0 0 0 rgba(249,115,22,0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Shield className="h-9 w-9 stroke-[1.4]" />
        </motion.div>
      </div>

      {/* Floating cards */}
      <motion.div
        className="absolute left-0 top-[43%] hidden rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-xl sm:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Eye className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-950">
              Continuous visibility
            </p>
            <p className="text-[11px] text-neutral-500">Active</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-0 top-[18%] hidden rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-xl sm:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-white">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-950">
              Access protected
            </p>
            <p className="text-[11px] text-neutral-500">Verified</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[14%] right-[8%] hidden rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-xl sm:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-950">
              Systems protected
            </p>
            <p className="text-[11px] text-neutral-500">All layers</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ThreatDashboard() {
  const events = [
    {
      time: "09:42:18",
      event: "API anomaly detected",
      type: "Monitoring",
      status: "Investigating",
    },
    {
      time: "09:41:52",
      event: "Authentication verified",
      type: "Identity",
      status: "Allowed",
    },
    {
      time: "09:40:31",
      event: "Suspicious request blocked",
      type: "Network",
      status: "Blocked",
    },
    {
      time: "09:38:07",
      event: "Model access monitored",
      type: "AI",
      status: "Allowed",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-950">
              Security monitor
            </p>
            <p className="text-xs text-neutral-500">
              Real-time system visibility
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[11px] font-medium text-neutral-600">
            Operational
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 sm:grid-cols-4 sm:divide-y-0">
        {[
          ["126", "Protected assets"],
          ["18", "Blocked events"],
          ["04", "Active signals"],
          ["99.9%", "System visibility"],
        ].map(([value, label]) => (
          <div key={label} className="px-4 py-5 sm:px-5">
            <p className="text-2xl font-semibold tracking-tight text-neutral-950">
              {value}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="border-t border-neutral-200">
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-neutral-950">
              Recent activity
            </p>
            <p className="text-xs text-neutral-500">
              Security events across your environment
            </p>
          </div>

          <button className="hidden text-xs font-medium text-neutral-600 transition hover:text-neutral-950 sm:flex sm:items-center sm:gap-1">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="divide-y divide-neutral-100 border-t border-neutral-100">
          {events.map((event, index) => (
            <motion.div
              key={event.time}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="grid grid-cols-[72px_1fr_auto] items-center gap-3 px-5 py-4 sm:grid-cols-[90px_1fr_100px_100px] sm:px-6"
            >
              <span className="font-mono text-[11px] text-neutral-400">
                {event.time}
              </span>

              <div>
                <p className="text-xs font-medium text-neutral-900">
                  {event.event}
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  Security engine
                </p>
              </div>

              <span className="hidden text-xs text-neutral-500 sm:block">
                {event.type}
              </span>

              <span
                className={`rounded-full px-2 py-1 text-center text-[10px] font-medium ${
                  event.status === "Blocked"
                    ? "bg-orange-50 text-orange-700"
                    : event.status === "Investigating"
                    ? "bg-neutral-100 text-neutral-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {event.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <Header />

 {/* ================================================================
    HERO — RIVINITY CYBERSECURITY
================================================================= */}
<section className="relative overflow-hidden border-b border-neutral-200 bg-white">

  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-1/2 top-[-220px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-orange-500/[0.06] blur-[120px]" />

    <div
      className="absolute inset-0 opacity-[0.32]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(229,229,229,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(229,229,229,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(to bottom, black, transparent 72%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black, transparent 72%)",
      }}
    />

    <motion.div
      className="absolute left-0 right-0 top-[32%] h-px bg-orange-500/20"
      animate={{ opacity: [0, 0.8, 0], x: ["-20%", "20%", "60%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="max-w-3xl text-[3rem] font-semibold leading-[0.98] tracking-[-0.065em] text-neutral-950 sm:text-6xl lg:text-[4.4rem]">
          Security built for
          <br />
          <span className="text-neutral-400">
            intelligent systems.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
          Protect your applications, data, infrastructure, and AI systems
          with continuous visibility, intelligent threat detection, and
          security built into every layer.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            Talk to our security team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#security-layers"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-900 transition hover:border-orange-200 hover:bg-orange-50"
          >
            Explore security
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Security indicators */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {[
            ["Threat detection", Radar],
            ["AI protection", Sparkles],
            ["Continuous monitoring", Eye],
          ].map(([title, Icon]) => (
            <div key={title as string} className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
                <Icon className="h-3.5 w-3.5 text-orange-600" />
              </div>
              <span className="text-[11px] font-medium text-neutral-600">
                {title as string}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cybersecurity visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative"
      >
        <div className="relative mx-auto h-[420px] w-full max-w-[500px]">

          {/* Rings */}
          {[410, 330, 250].map((size, i) => (
            <div
              key={size}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                i === 2 ? "border-orange-200" : "border-neutral-200"
              }`}
              style={{
                width: size,
                height: size,
              }}
            />
          ))}

          {/* Scanner */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.6)]" />
            <span className="absolute left-1/2 top-0 h-20 w-px bg-gradient-to-b from-orange-500/60 to-transparent" />
          </motion.div>

          {/* ===================== CENTER RIVINITY SECURITY LOGO ===================== */}
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

  {/* Outer pulse */}
  <motion.div
    className="absolute -inset-10 rounded-full border border-orange-300/20"
    animate={{
      scale: [1, 1.08, 1],
      opacity: [0.25, 0.6, 0.25],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* Inner pulse */}
  <motion.div
    className="absolute -inset-5 rounded-full border border-orange-400/30"
    animate={{
      scale: [1, 1.12, 1],
      opacity: [0.5, 0.15, 0.5],
    }}
    transition={{
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* Main logo container */}
  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_25px_80px_rgba(249,115,22,0.15)]">

    {/* Orange ring */}
    <div className="absolute inset-3 rounded-full border border-orange-100" />

    {/* Logo mark */}
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">

      {/* Shield */}
      <svg
        viewBox="0 0 64 64"
        className="h-12 w-12 text-orange-500"
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

    {/* Protected badge */}
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-white px-3 py-1.5 shadow-md">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-green-500"
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
          Protected
        </span>
      </div>
    </div>

  </div>
</div>
          {/* Security nodes */}
          {[
            {
              name: "AI Security",
              status: "Protected",
              icon: Sparkles,
              pos: "left-[7%] top-[16%]",
              accent: true,
            },
            {
              name: "Cloud",
              status: "Secure",
              icon: Cloud,
              pos: "right-[4%] top-[25%]",
            },
            {
              name: "Threat detection",
              status: "Monitoring",
              icon: Radar,
              pos: "bottom-[18%] left-[3%]",
              accent: true,
            },
            {
              name: "Data protection",
              status: "Encrypted",
              icon: Database,
              pos: "bottom-[11%] right-[3%]",
            },
          ].map((node, index) => {
            const Icon = node.icon;

            return (
              <motion.div
                key={node.name}
                className={`absolute ${node.pos}`}
                animate={{ y: [0, index % 2 ? 5 : -5, 0] }}
                transition={{
                  duration: 4 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.06)]">

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      node.accent ? "bg-orange-50" : "bg-neutral-50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        node.accent
                          ? "text-orange-500"
                          : "text-neutral-600"
                      }`}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-neutral-900">
                      {node.name}
                    </p>
                    <p
                      className={`text-[9px] ${
                        node.status === "Secure" ||
                        node.status === "Encrypted"
                          ? "text-green-500"
                          : "text-neutral-400"
                      }`}
                    >
                      {node.status}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}

          {/* Connection lines */}
          <div className="absolute left-[22%] top-[29%] h-px w-[20%] rotate-[25deg] bg-orange-200" />
          <div className="absolute right-[22%] top-[35%] h-px w-[19%] -rotate-[25deg] bg-neutral-200" />
          <div className="absolute bottom-[31%] left-[22%] h-px w-[20%] -rotate-[25deg] bg-neutral-200" />
          <div className="absolute bottom-[29%] right-[22%] h-px w-[20%] rotate-[25deg] bg-orange-200" />

          {/* Active label */}
          <motion.div
            className="absolute left-1/2 top-[3%] -translate-x-1/2"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500">
                Security active
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>

    </div>
  </div>
</section>

 {/* SECURITY LAYERS */}
<section id="security-layers" className="scroll-mt-20 border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
      <div>
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-neutral-950 sm:text-5xl lg:text-[3.6rem]">
          One security strategy.<br /><span className="text-neutral-400">Every critical layer.</span>
        </h2>
        <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
          Security becomes stronger when visibility, controls, detection, and response work together across your entire technology environment.
        </p>
      </div>
    </div>

    <div className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-2">
        {SECURITY_LAYERS.map((layer, index) => {
          const Icon = layer.icon, active = activeLayer === index;
          return (
            <motion.button
              key={layer.id}
              onClick={() => setActiveLayer(index)}
              whileHover={{ x: active ? 0 : 3 }}
              className={`group relative flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                active ? "border-orange-200 bg-orange-50/70 shadow-[0_8px_30px_rgba(249,115,22,0.06)]" : "border-neutral-200 bg-white hover:border-orange-200 hover:bg-neutral-50"
              }`}
            >
              {active && <motion.div layoutId="active-security-layer" className="absolute bottom-0 left-0 top-0 w-0.5 bg-orange-500" />}
              <div className="flex items-center gap-4">
                <span className={`font-mono text-[10px] ${active ? "text-orange-600" : "text-neutral-400"}`}>{layer.id}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${active ? "border-orange-200 bg-white" : "border-neutral-200 bg-neutral-50"}`}>
                  <Icon className={`h-4 w-4 ${active ? "text-orange-500" : "text-neutral-500 group-hover:text-orange-500"}`} />
                </div>
                <span className={`text-sm font-medium ${active ? "text-neutral-950" : "text-neutral-700"}`}>{layer.title}</span>
              </div>
              <div className="flex items-center gap-3">
                {active && <span className="hidden items-center gap-1.5 text-[9px] font-medium uppercase tracking-wider text-orange-600 sm:flex"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />Active</span>}
                <ChevronRight className={`h-4 w-4 ${active ? "text-orange-500" : "text-neutral-300 group-hover:text-orange-500"}`} />
              </div>
            </motion.button>
          );
        })}

        <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-100 bg-green-50"><ShieldCheck className="h-4 w-4 text-green-600" /></div>
            <div>
              <p className="text-xs font-semibold text-neutral-900">Security monitoring active</p>
              <p className="mt-0.5 text-[10px] text-neutral-500">All layers continuously monitored</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[470px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "linear-gradient(rgba(229,229,229,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(229,229,229,.55) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom,black,transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom,black,transparent 85%)"
          }}
        />
        <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-orange-500/[0.07] blur-3xl" />
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"
          animate={{ top: ["10%", "90%", "10%"], opacity: [0, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative p-7 sm:p-10"
          >
            {(() => {
              const layer = SECURITY_LAYERS[activeLayer], Icon = layer.icon;
              return (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" /><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500">Security layer active</span></div>
                    <span className="font-mono text-[9px] text-neutral-400">LAYER {layer.id}</span>
                  </div>

                  <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50"><Icon className="h-6 w-6 text-orange-500" /></div>

                  <div className="mt-7">
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl">{layer.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">{layer.description}</p>
                  </div>

                  <div className="mt-9 grid gap-2 sm:grid-cols-2">
                    {layer.items.map((item, i) => (
                      <motion.div key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50"><Check className="h-3.5 w-3.5 text-orange-500" /></div>
                        <span className="text-sm font-medium text-neutral-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-neutral-200 pt-5">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1"><span className="h-2 w-2 rounded-full border border-neutral-50 bg-orange-400" /><span className="h-2 w-2 rounded-full border border-neutral-50 bg-orange-300" /><span className="h-2 w-2 rounded-full border border-neutral-50 bg-orange-200" /></div>
                      <span className="text-[10px] text-neutral-500">Continuous protection</span>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Rivinity Security</span>
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
{/* ===================== AI SECURITY DASHBOARD ===================== */}
<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

    {/* Header */}
    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-5xl">
          Security for the age of AI.
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
          Protect AI workflows across prompts, models, agents, data,
          and generated output with continuous visibility and control.
        </p>
      </div>

      <Link
        href="/research"
        className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-neutral-950"
      >
        Explore AI research
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>

    {/* ============================================================
        AI SECURITY DASHBOARD
    ============================================================= */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50"
    >

      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 border-b border-neutral-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-neutral-900">
                AI Security Monitor
              </p>

              <span className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider text-green-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Secure
              </span>
            </div>

            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
              AI runtime protection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-[8px] text-neutral-500">
            LIVE
          </span>

          <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 font-mono text-[8px] text-orange-600">
            24H
          </span>
        </div>

      </div>

      {/* Dashboard Body */}
      <div className="p-4 sm:p-6">

        {/* ========================================================
            METRICS
        ========================================================= */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {/* Risk */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                AI risk score
              </span>

              <ShieldCheck className="h-4 w-4 text-orange-500" />
            </div>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-2xl font-semibold tracking-tight text-neutral-950">
                18
              </span>

              <span className="mb-1 text-[9px] text-green-600">
                Low
              </span>
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "18%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-orange-400"
              />
            </div>
          </div>

          {/* Requests */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                AI requests
              </span>

              <Activity className="h-4 w-4 text-neutral-500" />
            </div>

            <div className="mt-3">
              <span className="text-2xl font-semibold tracking-tight text-neutral-950">
                8,421
              </span>
            </div>

            <p className="mt-2 text-[9px] text-green-600">
              ↑ 8.4% today
            </p>
          </div>

          {/* Protected */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                Protected
              </span>

              <Lock className="h-4 w-4 text-neutral-500" />
            </div>

            <div className="mt-3">
              <span className="text-2xl font-semibold tracking-tight text-neutral-950">
                99.8%
              </span>
            </div>

            <p className="mt-2 text-[9px] text-neutral-400">
              Requests secured
            </p>
          </div>

          {/* Threats */}
          <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-orange-600">
                Threats blocked
              </span>

              <ShieldAlert className="h-4 w-4 text-orange-500" />
            </div>

            <div className="mt-3">
              <span className="text-2xl font-semibold tracking-tight text-neutral-950">
                27
              </span>
            </div>

            <p className="mt-2 text-[9px] text-orange-600">
              Last 24 hours
            </p>
          </div>

        </div>

        {/* ========================================================
            LOWER DASHBOARD
        ========================================================= */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">

          {/* Activity Chart */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  AI security activity
                </p>

                <p className="mt-1 text-[9px] text-neutral-400">
                  Requests and security events
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                <span className="text-[9px] text-neutral-400">
                  Events
                </span>
              </div>

            </div>

            {/* Graph */}
            <div className="relative mt-5 h-36">

              {/* Grid */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[1, 2, 3, 4, 5].map((line) => (
                  <div
                    key={line}
                    className="border-t border-neutral-100"
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="absolute inset-x-0 bottom-0 top-2 flex items-end justify-between gap-1">

                {[
                  30, 42, 35, 55, 48, 62,
                  45, 70, 58, 76, 63, 82,
                  69, 88, 73, 91, 78, 84
                ].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.035,
                    }}
                    className="w-full max-w-[14px] rounded-t-sm bg-orange-200 transition-colors hover:bg-orange-400"
                  />
                ))}

              </div>

            </div>

            <div className="mt-3 flex justify-between font-mono text-[8px] text-neutral-400">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>

          </div>

          {/* Protected Workflow */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  Protected workflow
                </p>

                <p className="mt-1 text-[9px] text-neutral-400">
                  AI request pipeline
                </p>
              </div>

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            </div>

            <div className="mt-5 space-y-2">

              {[
                ["Input", Terminal],
                ["Security", ShieldCheck],
                ["AI Agent", Sparkles],
                ["Output", Lock],
              ].map(([label, Icon], index) => (
                <div key={label as string}>

                  <div
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                      index === 1
                        ? "border-orange-200 bg-orange-50/60"
                        : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-md ${
                        index === 1
                          ? "bg-orange-500 text-white"
                          : "bg-white text-neutral-500"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <span className="flex-1 text-[11px] font-medium text-neutral-800">
                      {label as string}
                    </span>

                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </div>

                  {index < 3 && (
                    <div className="ml-6 h-1.5 border-l border-dashed border-neutral-200" />
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* ========================================================
            LIVE SECURITY EVENTS
        ========================================================= */}
        <div className="mt-3 rounded-xl border border-neutral-200 bg-white">

          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <p className="text-xs font-semibold text-neutral-900">
              Recent AI security events
            </p>

            <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-400">
              Live feed
            </span>
          </div>

          <div className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            {[
              ["Prompt anomaly", "AI Gateway", "2m ago", "Medium"],
              ["Policy violation", "Agent Runtime", "5m ago", "High"],
              ["Access verified", "Model API", "8m ago", "Low"],
            ].map(([event, source, time, severity]) => (

              <div
                key={event}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >

                <div className="flex min-w-0 items-center gap-2">

                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      severity === "High"
                        ? "bg-orange-500"
                        : severity === "Medium"
                        ? "bg-orange-300"
                        : "bg-green-500"
                    }`}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-medium text-neutral-800">
                      {event}
                    </p>

                    <p className="truncate text-[9px] text-neutral-400">
                      {source}
                    </p>
                  </div>

                </div>

                <span className="shrink-0 text-[8px] text-neutral-400">
                  {time}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>
    </motion.div>

  </div>
</section>


{/* ===================== SECURITY APPROACH ===================== */}
<section className="border-b border-neutral-200 bg-neutral-50">
  <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">

      {/* ================= LEFT ================= */}
      <div className="flex min-h-[600px] flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-7 sm:p-9 lg:p-10">

        <div>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-7 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-neutral-950 sm:text-5xl lg:text-[3.5rem]"
          >
            Security is a
            <br />
            <span className="text-orange-500">continuous</span> process.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-md text-base leading-7 text-neutral-500 sm:text-lg"
          >
            Always learning.
            <br />
            Always improving.
          </motion.p>
        </div>


        {/* SECURITY VISUAL */}
        <div className="relative mt-10 min-h-[280px] overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/50">

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(249,115,22,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.08) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Glow */}
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

          {/* Shield */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-orange-200 bg-white shadow-sm">
              <div className="absolute inset-3 rounded-xl border border-orange-100" />

              <ShieldCheck className="relative h-10 w-10 text-orange-500" />
            </div>
          </div>

          {/* Status */}
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

            <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-400">
              Security active
            </span>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-300">
              Continuous monitoring
            </span>

            <span className="font-mono text-[8px] text-neutral-300">
              SEC / 04
            </span>
          </div>
        </div>


        {/* Bottom status */}
        <div className="mt-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />

          <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-300">
            Always improving
          </span>
        </div>

      </div>


      {/* ================= RIGHT ================= */}
      <div className="flex min-h-[600px] min-w-0 flex-col">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
              Security lifecycle
            </p>
          </div>


          {/* Controls */}
          <div className="flex gap-2">

            <button
              type="button"
              onClick={() => {
                const carousel = document.getElementById("security-carousel");

                if (carousel) {
                  carousel.scrollBy({
                    left: -carousel.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
              aria-label="Previous security stage"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white transition hover:border-orange-200 hover:bg-orange-50"
            >
              <ChevronLeft className="h-4 w-4 text-neutral-500" />
            </button>


            <button
              type="button"
              onClick={() => {
                const carousel = document.getElementById("security-carousel");

                if (carousel) {
                  carousel.scrollBy({
                    left: carousel.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
              aria-label="Next security stage"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white transition hover:border-orange-200 hover:bg-orange-50"
            >
              <ChevronRight className="h-4 w-4 text-neutral-500" />
            </button>

          </div>
        </div>


        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base"
        >
          Strong security doesn't stop at prevention. Rivinity helps teams
          understand risk, strengthen defenses, detect threats, and continuously
          improve their security posture.
        </motion.p>
        {/* ================= ONE CARD AT A TIME ================= */}
<div
  id="security-carousel"
  className="mt-8 w-full min-w-0 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
>
  <div className="flex w-full">
    {APPROACH.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={item.number}
          className="w-full min-w-full shrink-0 snap-start px-0"
        >
          <div className="group flex min-h-[430px] w-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:border-orange-200 hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)] sm:p-9">

            {/* Card top */}
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-orange-500">
                  {item.number}
                </span>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-orange-200 group-hover:bg-orange-50">
                  <Icon className="h-5 w-5 text-neutral-500 transition-colors group-hover:text-orange-500" />
                </div>
              </div>

              {/* Card content */}
              <div className="mt-16">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                  Security stage
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-500 sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Card footer */}
            <div className="mt-10 border-t border-neutral-100 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                </div>

                <span className="font-mono text-[9px] text-neutral-300">
                  {item.number}/04
                </span>
              </div>
            </div>

          </div>
        </div>
      );
    })}
  </div>
</div>
        {/* Lifecycle */}
        <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/60 p-4">

          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-wider sm:justify-between">

            <span className="text-orange-500">
              Assess
            </span>

            <ChevronRight className="h-3 w-3 text-orange-400" />

            <span className="text-neutral-400">
              Protect
            </span>

            <ChevronRight className="h-3 w-3 text-orange-400" />

            <span className="text-neutral-400">
              Detect
            </span>

            <ChevronRight className="h-3 w-3 text-orange-400" />

            <span className="text-neutral-400">
              Improve
            </span>

          </div>

        </div>

      </div>

    </div>
  </div>
</section>
{/* ===================== SECURITY INQUIRIES ===================== */}
<section className="border-b border-neutral-200 bg-orange-50/50">
  <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

    <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white">

      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.06) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom,black,transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom,black,transparent 85%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/[0.07] blur-3xl" />

      <div className="relative p-6 sm:p-9 lg:p-11">

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">

          {/* Content */}
          <div className="max-w-3xl">

            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
              </div>

              <div>
                <p className="font-mono text-[8px] text-neutral-400">
                  RIVINITY / SECURITY
                </p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Have a security question?
              <br />
              <span className="text-neutral-400">
                Let's talk about it.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
              Talk with the Rivinity team about security architecture,
              AI protection, infrastructure, threat detection, or building
              more resilient systems.
            </p>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {[
                "Security architecture",
                "AI protection",
                "Infrastructure security",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-[11px] text-neutral-500"
                >
                  <Check className="h-3 w-3 text-orange-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="w-full lg:w-[230px]">

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">

              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-neutral-400">
                  Security channel
                </span>

                <span className="flex items-center gap-1.5 text-[8px] font-medium text-green-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  Available
                </span>
              </div>

              <Link
                href="/contact"
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                Contact security team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="mt-2 text-center text-[8px] text-neutral-400">
                Connect with the Rivinity security team
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-neutral-200 pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2">
            </div>

            <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-300">
              Rivinity Security
            </span>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
{/* ===================== SECURITY FAQ ===================== */}
<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">

      {/* Intro */}
      <div>
        <div className="flex items-center gap-3">
        
        </div>

        <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-[-0.045em] text-neutral-950 sm:text-4xl">
          Questions about
          <br />
          <span className="text-neutral-400">
            Rivinity security?
          </span>
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">
          Learn how Rivinity approaches application security, cloud
          infrastructure, AI systems, data protection, and threat detection.
        </p>

        {/* Security indicator */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
            <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
          </div>

          <div>
            <p className="text-xs font-semibold text-neutral-900">
              Security by design
            </p>
            <p className="text-[9px] text-neutral-400">
              Protection across the product lifecycle
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {[
          {
            question: "How does Rivinity approach security?",
            answer:
              "Rivinity approaches security as a continuous process across architecture, development, deployment, monitoring, and operations. Security controls are designed to work together across applications, infrastructure, data, identities, and AI systems.",
          },
          {
            question: "How does Rivinity protect AI systems?",
            answer:
              "AI security can include protection for models, agents, prompts, data flows, access controls, and AI runtime activity. The goal is to provide visibility and control throughout the AI lifecycle.",
          },
          {
            question: "How is sensitive data protected?",
            answer:
              "Sensitive data should be protected throughout its lifecycle using appropriate access controls, encryption, monitoring, and security policies. Rivinity's security approach is designed around minimizing exposure and maintaining visibility.",
          },
          {
            question: "How does Rivinity detect security threats?",
            answer:
              "Rivinity focuses on continuous visibility across systems and security signals. Anomaly detection, event monitoring, centralized context, and threat analysis help teams identify suspicious activity and investigate potential incidents.",
          },
          {
            question: "Does Rivinity support cloud security?",
            answer:
              "Yes. Cloud security is considered across infrastructure, workloads, services, identities, configurations, and activity. The objective is to maintain visibility and consistent security controls across modern cloud environments.",
          },
          {
            question: "What should I do if I have a security concern?",
            answer:
              "If you have a security-related question or concern, contact the Rivinity security team. We can discuss security architecture, AI protection, infrastructure, threat detection, and other security considerations.",
          },
        ].map((faq, index) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 marker:hidden sm:py-5">

              <div className="flex items-start gap-3">
                <span className="pt-0.5 font-mono text-[8px] text-orange-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm font-semibold leading-5 text-neutral-900 sm:text-[15px]">
                  {faq.question}
                </span>
              </div>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors group-open:border-orange-200 group-open:bg-orange-50">
              <span className="text-lg font-light leading-none text-neutral-400">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
             </span>

            </summary>

            <div className="pb-5 pl-7 pr-8">
              <p className="max-w-2xl text-sm leading-6 text-neutral-500">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

    </div>
  </div>
</section>

      <Footer />
    </main>
  );
}