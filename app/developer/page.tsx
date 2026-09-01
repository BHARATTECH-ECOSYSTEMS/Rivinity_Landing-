"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Layers3,
  Lock,
  Layers,
  Terminal,
  Zap,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

const DEVELOPER_TOOLS = [
  {
    icon: BookOpen,
    title: "Documentation",
    description:
      "Learn how to integrate Rivinity APIs, build applications, and move from prototype to production.",
    link: "Read the docs",
  },
  {
    icon: Braces,
    title: "APIs & SDKs",
    description:
      "Use simple, developer-friendly APIs and SDKs to connect intelligent capabilities to your applications.",
    link: "Explore APIs",
  },
  {
    icon: Terminal,
    title: "Developer CLI",
    description:
      "Build, test, configure, and deploy your Rivinity projects directly from your terminal.",
    link: "View CLI",
  },
  {
    icon: Layers3,
    title: "Integrations",
    description:
      "Connect Rivinity with the tools, platforms, and services already powering your workflow.",
    link: "View integrations",
  },
];

const WORKFLOW = [
  {
    number: "01",
    title: "Connect",
    description:
      "Create your project and connect Rivinity APIs to your application.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Build intelligent workflows, agents, and applications using familiar tools.",
  },
  {
    number: "03",
    title: "Test",
    description:
      "Experiment quickly and validate your application before going live.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "Move production workloads to reliable Rivinity infrastructure.",
  },
  {
    number: "05",
    title: "Scale",
    description:
      "Grow from your first prototype to production workloads without rebuilding your stack.",
  },
];

const FEATURES = [
  "Simple, developer-first APIs",
  "Type-safe SDKs",
  "Secure authentication",
  "Production-ready infrastructure",
  "Built-in observability",
  "Scalable deployments",
];

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Guides, concepts, tutorials, and getting-started resources.",
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Explore endpoints, parameters, responses, and examples.",
  },
];

export default function DevelopersPage() {
 const [activeWorkflow, setActiveWorkflow] = useState(0);
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-28 sm:pt-32 md:pt-36 pb-16 bg-white text-neutral-950"
      >
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-2 sm:pt-4 lg:px-8 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="max-w-3xl text-center lg:text-left text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
                Build the future with{" "}
                <span className="text-orange-500">Rivinity.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-center lg:text-left text-lg leading-8 text-neutral-600">
                Build intelligent applications, autonomous agents, and
                production-ready systems with developer-first APIs,
                infrastructure, and tools.
              </p>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  Read documentation
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-500" />
                  Developer-first
                </div>

                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-500" />
                  Secure by design
                </div>

                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-500" />
                  Built to scale
                </div>
              </div>
            </motion.div>

            {/* CODE PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-neutral-700" />
                  <span className="h-3 w-3 rounded-full bg-neutral-700" />
                  <span className="h-3 w-3 rounded-full bg-neutral-700" />

                  <span className="ml-3 font-mono text-xs text-neutral-500">
                    rivinity-example.ts
                  </span>
                </div>

                <pre className="overflow-x-auto p-6 font-mono text-sm leading-7">
                  <code>
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-white">{"{ Rivinity }"}</span>{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-green-400">
                      "@rivinity/sdk"
                    </span>
                    {"\n\n"}
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">client</span>{" "}
                    <span className="text-neutral-400">=</span>{" "}
                    <span className="text-purple-400">new</span>{" "}
                    <span className="text-yellow-300">Rivinity</span>
                    {"({\n"}
                    {"  "}
                    <span className="text-white">apiKey</span>
                    <span className="text-neutral-400">:</span>{" "}
                    <span className="text-blue-300">
                      process.env.RIVINITY_API_KEY
                    </span>
                    {"\n});\n\n"}
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">agent</span>{" "}
                    <span className="text-neutral-400">=</span>{" "}
                    <span className="text-purple-400">await</span>{" "}
                    <span className="text-blue-300">client</span>
                    <span className="text-white">.agents.create</span>
                    {"({\n"}
                    {"  "}
                    <span className="text-white">name</span>
                    <span className="text-neutral-400">:</span>{" "}
                    <span className="text-green-400">
                      "Research Agent"
                    </span>
                    <span className="text-neutral-400">,</span>
                    {"\n  "}
                    <span className="text-white">model</span>
                    <span className="text-neutral-400">:</span>{" "}
                    <span className="text-green-400">
                      "rivinity-ai"
                    </span>
                    {"\n});"}
                  </code>
                </pre>

                <div className="border-t border-neutral-800 px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Ready to build
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-50 p-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      Developer ready
                    </p>
                    <p className="text-xs text-neutral-500">
                      Simple APIs. Powerful systems.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* =========================================================
          BUILD WITH RIVINITY
      ========================================================== */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Build with Rivinity
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to build intelligent software.
            </h2>

            <p className="mt-4 text-lg leading-8 text-neutral-600">
              From your first API call to production deployment, Rivinity
              gives developers the tools and infrastructure to move faster.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {DEVELOPER_TOOLS.map((tool, index) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group rounded-2xl border border-neutral-200 bg-white p-7 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-orange-50 p-3">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>

                    <ChevronRight className="h-5 w-5 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {tool.title}
                  </h3>

                  <p className="mt-3 leading-7 text-neutral-600">
                    {tool.description}
                  </p>

                  <div className="mt-6 text-sm font-semibold text-orange-500">
                    {tool.link} →
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
    DEVELOPER WORKFLOW
========================================================= */}
<section className="relative overflow-hidden border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="max-w-3xl">

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500"
      >
        Developer workflow
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl"
      >
        From idea to production.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600"
      >
        A development workflow designed to help you move from your
        first idea to a production-ready intelligent application.
      </motion.p>

    </div>

   {/* WORKFLOW TABS */}
<div className="mt-12 overflow-x-auto border-y border-neutral-200">
  <div className="flex min-w-max lg:grid lg:min-w-0 lg:grid-cols-5">
    {WORKFLOW.map((item, index) => (
      <button
        key={item.number}
        onClick={() => setActiveWorkflow(index)}
        className={`relative flex min-w-[125px] items-center gap-2 px-4 py-4 text-left transition sm:min-w-[150px] lg:min-w-0 ${
          activeWorkflow === index
            ? "text-neutral-950"
            : "text-neutral-400 hover:text-neutral-700"
        }`}
      >
        <span
          className={`font-mono text-[10px] ${
            activeWorkflow === index
              ? "text-orange-500"
              : "text-neutral-400"
          }`}
        >
          {item.number}
        </span>

        <span className="text-xs font-semibold sm:text-sm">
          {item.title}
        </span>

        {activeWorkflow === index && (
          <motion.span
            layoutId="workflow-active"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
          />
        )}
      </button>
    ))}
  </div>
</div>
    {/* =====================================================
        ACTIVE WORKFLOW
    ====================================================== */}
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">

      <AnimatePresence mode="wait" custom={activeWorkflow}>

        <motion.div
          key={activeWorkflow}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -40,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="grid min-h-[430px] lg:grid-cols-[0.85fr_1.15fr]"
        >

          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="flex flex-col justify-between border-b border-neutral-200 p-8 lg:border-b-0 lg:border-r lg:p-12">

            <div>

              <div className="flex items-center gap-3">

                <span className="font-mono text-xs text-orange-500">
                  {WORKFLOW[activeWorkflow].number}
                </span>

                <span className="h-px w-8 bg-neutral-300" />

                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  Workflow
                </span>

              </div>

              <h3 className="mt-8 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                {WORKFLOW[activeWorkflow].title}
              </h3>

              <p className="mt-5 max-w-md text-base leading-8 text-neutral-600">
                {WORKFLOW[activeWorkflow].description}
              </p>

            </div>

            {/* Bottom info */}
            <div className="mt-10 flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <Check className="h-4 w-4 text-orange-500" />
              </div>

              <span className="text-sm font-medium text-neutral-700">
                Ready for the next step
              </span>

            </div>

          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================== */}
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-neutral-950 p-6 sm:p-10">

            {/* Background grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Orange glow */}
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"
            />

            {/* =================================================
                VISUAL STAGE
            ================================================== */}
            <div className="relative w-full max-w-xl">

              {/* Top label */}
              <div className="mb-4 flex items-center justify-between">

                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                  rivinity / workflow
                </span>

                <span className="flex items-center gap-2 font-mono text-[10px] text-green-400">

                  <motion.span
                    animate={{
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                  />

                  ACTIVE

                </span>

              </div>

              {/* Visual */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">

                {/* Window header */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">

                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                  <span className="ml-3 font-mono text-[10px] text-neutral-600">
                   {WORKFLOW[activeWorkflow]?.title.toLowerCase() || "workflow"}.ts
                  </span>

                  
                </div>

                {/* Content */}
                <div className="p-6">

                  {activeWorkflow === 0 && (
                    <div className="space-y-4">

                      <div className="font-mono text-xs text-neutral-500">
                        {"// Explore what you can build"}
                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        {[
                          "Agents",
                          "Models",
                          "Knowledge",
                          "Tools",
                        ].map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: index * 0.08,
                            }}
                            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                          >
                            <div className="h-2 w-2 rounded-full bg-orange-500" />

                            <p className="mt-3 text-sm font-medium text-neutral-300">
                              {item}
                            </p>
                          </motion.div>
                        ))}

                      </div>

                    </div>
                  )}

                  {activeWorkflow === 1 && (
                    <div className="font-mono text-sm leading-7">

                      <div className="text-neutral-500">
                        {"// Create your first agent"}
                      </div>

                      <div className="mt-4 text-neutral-300">
                        <span className="text-purple-400">
                          const
                        </span>{" "}
                        agent = rivinity.agents.create({"{"}
                      </div>

                      <div className="pl-6 text-neutral-300">
                        name:{" "}
                        <span className="text-green-400">
                          "Research Agent"
                        </span>
                        ,
                      </div>

                      <div className="pl-6 text-neutral-300">
                        model:{" "}
                        <span className="text-green-400">
                          "rivinity-ai"
                        </span>
                      </div>

                      <div className="text-neutral-300">
                        {"});"}
                      </div>

                      <div className="mt-5 rounded-lg bg-green-500/10 px-4 py-3 text-xs text-green-400">
                        ✓ Agent ready
                      </div>

                    </div>
                  )}

                  {activeWorkflow === 2 && (
                    <div className="space-y-4">

                      {[
                        "Application",
                        "Rivinity API",
                        "Agent Runtime",
                        "Knowledge",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center gap-3"
                        >

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[10px] text-neutral-500">
                            0{index + 1}
                          </div>

                          <div className="h-px w-6 bg-neutral-700" />

                          <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-neutral-400">
                            {item}
                          </div>

                        </div>
                      ))}

                    </div>
                  )}

                  {activeWorkflow === 3 && (
                    <div className="space-y-4">

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">

                        <div className="flex justify-between">

                          <span className="font-mono text-xs text-neutral-500">
                            TEST RUN
                          </span>

                          <span className="font-mono text-xs text-green-400">
                            PASSED
                          </span>

                        </div>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-neutral-800">

                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: 1.2,
                            }}
                            className="h-full rounded-full bg-orange-500"
                          />

                        </div>

                        <div className="mt-3 flex justify-between font-mono text-[10px] text-neutral-600">

                          <span>Validation</span>
                          <span>100%</span>

                        </div>

                      </div>

                    </div>
                  )}

                  {activeWorkflow === 4 && (
                    <div className="space-y-4">

                      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10">

                            <Check className="h-4 w-4 text-green-400" />

                          </div>

                          <div>

                            <p className="text-sm font-semibold text-green-400">
                              Deployment ready
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-neutral-600">
                              production / rivinity
                            </p>

                          </div>

                        </div>

                      </div>

                      <div className="grid grid-cols-3 gap-3">

                        {[
                          "Build",
                          "Deploy",
                          "Scale",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center"
                          >
                            <p className="font-mono text-[10px] text-neutral-500">
                              {item}
                            </p>

                            <p className="mt-2 text-xs text-green-400">
                              Ready
                            </p>

                          </div>
                        ))}

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </AnimatePresence>

    </div>

    {/* =====================================================
        CONTROLS
    ====================================================== */}
    <div className="mt-6 flex items-center justify-between">

      <div className="flex items-center gap-2">

        {WORKFLOW.map((item, index) => (
          <button
            key={item.number}
            onClick={() => setActiveWorkflow(index)}
            aria-label={`Go to ${item.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeWorkflow === index
                ? "w-8 bg-orange-500"
                : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}

      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={() =>
            setActiveWorkflow(
              activeWorkflow === 0
                ? WORKFLOW.length - 1
                : activeWorkflow - 1
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-950"
        >
          ←
        </button>

        <button
          onClick={() =>
            setActiveWorkflow(
              activeWorkflow === WORKFLOW.length - 1
                ? 0
                : activeWorkflow + 1
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-950"
        >
          →
        </button>

      </div>

    </div>

  </div>
</section>

    {/* =========================================================
    FEATURES
========================================================= */}
<section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
        Built for developers
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
        Less infrastructure.
        <br />
        <span className="text-neutral-400">
          More building.
        </span>
      </h2>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
        Focus on your product while Rivinity handles the complexity
        underneath. Everything you need to build intelligent software,
        without unnecessary infrastructure.
      </p>
    </motion.div>

    {/* =====================================================
        FEATURE AREA
    ====================================================== */}
    <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">

      {/* ===================================================
          LEFT STATEMENT
      ==================================================== */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 p-8"
      >

        {/* Orange glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        {/* Small grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative flex h-full flex-col">

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400">
            Rivinity platform
          </span>

          <div className="mt-auto pt-20">

            <h3 className="text-2xl font-semibold leading-tight text-white">
              Everything your
              <br />
              application needs.
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-400">
              Connect intelligence, infrastructure, security, and
              developer tooling through one platform.
            </p>

            <div className="mt-8 flex items-center gap-3">

              <div className="flex -space-x-1">
                <span className="h-6 w-6 rounded-full border-2 border-neutral-950 bg-orange-500" />
                <span className="h-6 w-6 rounded-full border-2 border-neutral-950 bg-orange-400" />
                <span className="h-6 w-6 rounded-full border-2 border-neutral-950 bg-orange-300" />
              </div>

              <span className="font-mono text-[10px] text-neutral-500">
                ONE DEVELOPER PLATFORM
              </span>

            </div>

          </div>
        </div>
      </motion.div>

      {/* ===================================================
          FEATURE LIST
      ==================================================== */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

        <div className="border-b border-neutral-200 px-6 py-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-semibold text-neutral-950">
                Platform capabilities
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Designed around modern development workflows.
              </p>
            </div>

            <span className="font-mono text-[10px] text-neutral-400">
              {FEATURES.length.toString().padStart(2, "0")} ITEMS
            </span>

          </div>
        </div>

        <div className="divide-y divide-neutral-200">

          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{
                opacity: 0,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              className="group relative flex items-center gap-4 px-6 py-5 transition hover:bg-neutral-50"
            >

              {/* Hover indicator */}
              <div className="absolute left-0 top-0 h-full w-0.5 origin-bottom scale-y-0 bg-orange-500 transition-transform duration-300 group-hover:scale-y-100" />

              {/* Number */}
              <span className="w-6 shrink-0 font-mono text-[10px] text-neutral-400 transition-colors group-hover:text-orange-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Check */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                <Check className="h-4 w-4 text-orange-500" />
              </div>

              {/* Text */}
              <span className="flex-1 text-sm font-medium text-neutral-800 transition-transform duration-300 group-hover:translate-x-1">
                {feature}
              </span>

              {/* Arrow */}
              <ArrowRight className="h-4 w-4 text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500" />

            </motion.div>
          ))}

        </div>

      </div>

    </div>

    {/* =====================================================
        BOTTOM STRIP
    ====================================================== */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-5 grid overflow-hidden rounded-2xl border border-neutral-200 bg-white sm:grid-cols-3"
    >

      <div className="border-b border-neutral-200 px-6 py-5 sm:border-b-0 sm:border-r">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Build
        </p>

        <p className="mt-2 text-sm font-semibold text-neutral-900">
          Start with a simple API
        </p>
      </div>

      <div className="border-b border-neutral-200 px-6 py-5 sm:border-b-0 sm:border-r">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Connect
        </p>

        <p className="mt-2 text-sm font-semibold text-neutral-900">
          Add intelligence to your stack
        </p>
      </div>

      <div className="px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Scale
        </p>

        <p className="mt-2 text-sm font-semibold text-neutral-900">
          Move to production confidently
        </p>
      </div>

    </motion.div>

  </div>
</section>
     {/* =========================================================
    SECURITY / PRODUCTION READY
========================================================= */}
<section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">

      {/* =====================================================
          LEFT — CONTENT
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
          Production ready
        </p>

        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
          Build confidently.
          <br />
          <span className="text-neutral-400">
            Ship securely.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
          Rivinity provides the security, reliability, and infrastructure
          foundations your applications need to move from prototype to
          production.
        </p>

        {/* Security points */}
        <div className="mt-8 space-y-4">

          {[
            "Secure authentication and access controls",
            "Production-ready infrastructure",
            "Reliable systems built to scale",
            "Designed for modern developer workflows",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.07,
              }}
              className="flex items-center gap-3"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <Check className="h-3.5 w-3.5 text-orange-500" />
              </div>

              <span className="text-sm font-medium text-neutral-800">
                {item}
              </span>
            </motion.div>
          ))}

        </div>

        <Link
          href="/security"
          className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:text-orange-600"
        >
          Explore security
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* =====================================================
          RIGHT — INFRASTRUCTURE VISUAL
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto w-full max-w-2xl"
      >

        {/* Glow */}
        <div className="pointer-events-none absolute -inset-10 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">

          {/* =================================================
              HEADER
          ================================================== */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                <Lock className="h-4 w-4 text-orange-500" />
              </div>

              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Rivinity infrastructure
                </p>

                <p className="font-mono text-[10px] text-neutral-400">
                  production environment
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">

              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <span className="font-mono text-[10px] font-medium text-green-600">
                OPERATIONAL
              </span>

            </div>

          </div>

          {/* =================================================
              SECURITY LAYERS
          ================================================== */}
          <div className="p-6 sm:p-8">

            <div className="space-y-3">

              {/* Authentication */}
              <motion.div
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Lock className="h-4 w-4 text-orange-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">

                    <p className="text-sm font-semibold text-neutral-900">
                      Authentication
                    </p>

                    <span className="font-mono text-[10px] text-green-600">
                      ENABLED
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-neutral-500">
                    Identity and access controls
                  </p>
                </div>
              </motion.div>

              {/* Infrastructure */}
              <motion.div
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Cloud className="h-4 w-4 text-orange-500" />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <p className="text-sm font-semibold text-neutral-900">
                      Infrastructure
                    </p>

                    <span className="font-mono text-[10px] text-green-600">
                      HEALTHY
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-neutral-500">
                    Reliable production workloads
                  </p>

                </div>
              </motion.div>

              {/* Monitoring */}
              <motion.div
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">

                  <div className="flex items-end gap-0.5">
                    <span className="h-2 w-1 rounded-sm bg-orange-300" />
                    <span className="h-4 w-1 rounded-sm bg-orange-400" />
                    <span className="h-6 w-1 rounded-sm bg-orange-500" />
                  </div>

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <p className="text-sm font-semibold text-neutral-900">
                      Observability
                    </p>

                    <span className="font-mono text-[10px] text-green-600">
                      MONITORING
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-neutral-500">
                    Visibility across your workloads
                  </p>

                </div>

              </motion.div>

            </div>

            {/* =================================================
                STATUS FOOTER
            ================================================== */}
            <div className="mt-5 grid grid-cols-3 divide-x divide-neutral-200 rounded-xl border border-neutral-200 bg-white">

              <div className="px-4 py-4">

                <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                  Security
                </p>

                <p className="mt-1 text-sm font-semibold text-neutral-900">
                  Protected
                </p>

              </div>

              <div className="px-4 py-4">

                <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                  Runtime
                </p>

                <p className="mt-1 text-sm font-semibold text-neutral-900">
                  Healthy
                </p>

              </div>

              <div className="px-4 py-4">

                <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                  Status
                </p>

                <p className="mt-1 text-sm font-semibold text-green-600">
                  Operational
                </p>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  </div>
</section>
    {/* =========================================================
    DEVELOPER RESOURCES
========================================================= */}
<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
          Developer resources
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Everything you need
          <br />
          <span className="text-neutral-400">
            to build with Rivinity.
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
          Explore documentation, APIs, examples, SDKs, and guides
          designed to help you move from your first request to production.
        </p>
      </div>

      <Link
        href="/docs"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-orange-500 transition hover:text-orange-600"
      >
        Explore documentation
        <ArrowRight className="h-4 w-4" />
      </Link>

    </div>


    {/* =====================================================
        FEATURED DOCUMENTATION
    ====================================================== */}
    <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">

      {/* MAIN RESOURCE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 p-7 sm:p-9"
      >

        {/* subtle glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
              <BookOpen className="h-5 w-5 text-orange-400" />
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-neutral-400">
              START HERE
            </span>

          </div>

          <h3 className="mt-8 text-2xl font-semibold text-white sm:text-3xl">
            Documentation
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
            Learn how Rivinity works, make your first API request,
            and understand the core concepts behind the platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">

            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-neutral-400">
              Quickstart
            </span>

            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-neutral-400">
              Concepts
            </span>

            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-neutral-400">
              API
            </span>

          </div>

          <Link
            href="/docs"
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-orange-400"
          >
            Read the docs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>
      </motion.div>


      {/* QUICK START */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 sm:p-9"
      >

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
          <Terminal className="h-5 w-5 text-orange-500" />
        </div>

        <h3 className="mt-7 text-xl font-semibold text-neutral-950">
          Quickstart
        </h3>

        <p className="mt-3 text-sm leading-7 text-neutral-600">
          Make your first request and start building with Rivinity
          in minutes.
        </p>

        {/* fake terminal */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">

          <div className="border-b border-neutral-800 px-4 py-2">
            <span className="font-mono text-[10px] text-neutral-500">
              terminal
            </span>
          </div>

          <div className="overflow-x-auto p-4 font-mono text-xs leading-6">
            <div>
              <span className="text-orange-400">$</span>{" "}
              <span className="text-neutral-300">
                npm install @rivinity/sdk
              </span>
            </div>

            <div className="mt-2 text-green-400">
              ✓ installed successfully
            </div>
          </div>

        </div>

        <Link
          href="/docs"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500"
        >
          Get started
          <ArrowRight className="h-4 w-4" />
        </Link>

      </motion.div>

    </div>


    {/* =====================================================
        RESOURCE GRID
    ====================================================== */}
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {[
        {
          icon: Braces,
          title: "API Reference",
          description: "Explore endpoints, parameters and responses.",
        },
        {
          icon: Code2,
          title: "SDKs",
          description: "Integrate Rivinity into your applications.",
        },
        {
          icon: Layers,
          title: "Examples",
          description: "Explore practical implementation patterns.",
        },
        {
          icon: BookOpen,
          title: "Guides",
          description: "Step-by-step guides for common workflows.",
        },
      ].map((resource, index) => {

        const Icon = resource.icon;

        return (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
            }}
            className="group rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                <Icon className="h-4 w-4 text-orange-500" />
              </div>

              <ArrowRight className="h-4 w-4 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />

            </div>

            <h3 className="mt-6 font-semibold text-neutral-950">
              {resource.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {resource.description}
            </p>

          </motion.div>
        );
      })}

    </div>

  </div>
</section>
      {/* Unified FAQ Section */}
      <FaqSection
        title="Questions, answered."
        subtitle="Everything you need to know about building with Rivinity."
        items={[
          {
            question: "What can I build with Rivinity?",
            answer:
              "Rivinity provides APIs and infrastructure for building intelligent applications, autonomous agents, and AI-powered workflows.",
          },
          {
            question: "How do I get started?",
            answer:
              "Start by exploring the documentation and making your first API request. You can then connect Rivinity capabilities to your existing application.",
          },
          {
            question: "Does Rivinity provide SDKs?",
            answer:
              "Rivinity is designed around developer-friendly APIs and SDKs that make it easier to integrate intelligent capabilities into modern applications.",
          },
          {
            question: "Is Rivinity suitable for production?",
            answer:
              "Rivinity is designed with production workloads in mind, including authentication, access controls, reliable infrastructure, and scalable application development.",
          },
          {
            question: "How does Rivinity handle security?",
            answer:
              "Security is considered throughout the developer experience, from authentication and access controls to infrastructure and deployment.",
          },
          {
            question: "Where can I get help?",
            answer:
              "You can explore the documentation for technical guidance or contact the Rivinity team for additional support.",
          },
        ]}
      />

      {/* Unified CTA Section */}
      <CtaSection
        title="Ready to build the future of software?"
        description="Explore the documentation, clone quickstart starter kits, and ship production AI systems."
        buttonText="Explore Documentation"
        buttonHref="/docs"
      />
      </motion.main>

      <Footer />
    </div>
  );
}