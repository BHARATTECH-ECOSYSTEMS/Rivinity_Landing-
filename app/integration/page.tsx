"use client";

import Link from "next/link";
import { useMemo, useState, type ElementType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Search,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Webhook,
  X,
  Zap,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

type Category =
  | "All"
  | "AI & Models"
  | "Developer Tools"
  | "Cloud"
  | "Databases"
  | "Communication"
  | "Productivity"
  | "Security";

type Integration = {
  name: string;
  description: string;
  category: Exclude<Category, "All">;
  letter: string;
  icon: ElementType;
  featured?: boolean;
};

const CATEGORIES: Category[] = [
  "All",
  "AI & Models",
  "Developer Tools",
  "Cloud",
  "Databases",
  "Communication",
  "Productivity",
  "Security",
];

const INTEGRATIONS: Integration[] = [
  {
    name: "OpenAI",
    description:
      "Build intelligent workflows with powerful generative AI models.",
    category: "AI & Models",
    letter: "O",
    icon: Sparkles,
    featured: true,
  },
  {
    name: "Anthropic",
    description:
      "Connect Claude models to your agents, applications, and workflows.",
    category: "AI & Models",
    letter: "A",
    icon: Sparkles,
    featured: true,
  },
  {
    name: "GitHub",
    description:
      "Connect repositories, issues, pull requests, and development workflows.",
    category: "Developer Tools",
    letter: "GH",
    icon: GitBranch,
    featured: true,
  },
  {
    name: "GitLab",
    description:
      "Bring source control and CI/CD workflows into your Rivinity stack.",
    category: "Developer Tools",
    letter: "GL",
    icon: GitBranch,
  },
  {
  name: "Vercel",
  description:
    "Deploy and scale modern web applications with seamless cloud infrastructure.",
  category: "Developer Tools",
  letter: "V",
  icon: Zap,
},
  {
    name: "AWS",
    description:
      "Connect cloud infrastructure, services, and application workloads.",
    category: "Cloud",
    letter: "AWS",
    icon: Server,
    featured: true,
  },
  {
    name: "Azure",
    description:
      "Integrate Microsoft cloud infrastructure and intelligent services.",
    category: "Cloud",
    letter: "AZ",
    icon: Globe2,
  },
  {
    name: "PostgreSQL",
    description:
      "Connect structured application data to intelligent workflows.",
    category: "Databases",
    letter: "PG",
    icon: Database,
    featured: true,
  },
  {
    name: "MongoDB",
    description:
      "Bring flexible document data into your AI and automation workflows.",
    category: "Databases",
    letter: "M",
    icon: Database,
  },
  {
    name: "Slack",
    description:
      "Send events, notifications, and agent outputs directly to your team.",
    category: "Communication",
    letter: "S",
    icon: Zap,
    featured: true,
  },
  {
    name: "Discord",
    description:
      "Connect communities and real-time communication workflows.",
    category: "Communication",
    letter: "D",
    icon: Zap,
  },
  {
    name: "Notion",
    description:
      "Connect knowledge, documents, and internal workflows.",
    category: "Productivity",
    letter: "N",
    icon: Layers3,
  },
  {
    name: "Google Drive",
    description:
      "Connect documents, files, and organizational knowledge.",
    category: "Productivity",
    letter: "GD",
    icon: Layers3,
  },
  {
    name: "Snyk",
    description:
      "Bring application security and vulnerability data into your workflows.",
    category: "Security",
    letter: "SY",
    icon: ShieldCheck,
  },
  {
    name: "Cloudflare",
    description:
      "Connect edge infrastructure, security, and application services.",
    category: "Security",
    letter: "CF",
    icon: ShieldCheck,
  },
  
];

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const [search, setSearch] = useState("");

  const filteredIntegrations = useMemo(() => {
    return INTEGRATIONS.filter((integration) => {
      const matchesCategory =
        activeCategory === "All" ||
        integration.category === activeCategory;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        integration.name.toLowerCase().includes(query) ||
        integration.description.toLowerCase().includes(query) ||
        integration.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const popularIntegrations = INTEGRATIONS.filter(
    (integration) => integration.featured
  );

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
            HERO — RIVINITY INTEGRATIONS
        ========================================================= */}

        <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
          {/* ===================== BACKGROUND ===================== */}

          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.5, 0.35],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[5%] top-[-180px] h-[520px] w-[520px] rounded-full bg-orange-500/[0.07] blur-3xl"
            />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "radial-gradient(#737373 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 70%)",
              }}
            />
          </div>

          {/* ===================== CONTENT ===================== */}

          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-2 sm:pt-4 sm:pb-20 lg:px-8 lg:pb-28">
    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

      {/* =====================================================
          LEFT CONTENT
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl text-balance text-5xl font-semibold tracking-[-0.045em] text-neutral-900 sm:text-6xl lg:text-7xl"
        >
          Everything you use.
          <br />

          <span className="text-orange-500">
            Connected.
          </span>
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8"
        >
          Connect your favorite tools, AI models, databases,
          cloud services, and developer workflows to Rivinity.
          Build powerful systems without rebuilding your stack.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#integrations"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
          >
            Explore integrations

            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <Link
            href="/docs"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-600"
          >
            Developer docs

            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Trust line */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
          className="mt-8 flex items-center gap-2 text-xs text-neutral-400"
        >
          <div className="flex -space-x-1">

            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-orange-50 text-[8px] text-orange-500">
              AI
            </span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-[8px] text-neutral-500">
              DB
            </span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-orange-50 text-[8px] text-orange-500">
              API
            </span>

          </div>

          <span>
            Built for modern developer workflows
          </span>
        </motion.div>

      </motion.div>


      {/* =====================================================
          RIGHT ANIMATION
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto h-[390px] w-full max-w-[520px] sm:h-[430px] lg:h-[460px]"
      >

        {/* Main soft glow */}

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl sm:h-48 sm:w-48"
        />

        {/* Central vertical line */}

        <div className="absolute left-1/2 top-8 h-[320px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-orange-200 to-transparent sm:h-[350px]" />

        {/* Animated light */}

        <motion.div
          animate={{
            y: [0, 280],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-8 z-10 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-orange-500 to-transparent sm:h-12"
        />


        {/* ===================================================
            TOP LEFT CARD
        ==================================================== */}

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-[9%] w-[145px] sm:left-[2%] sm:top-[12%] sm:w-[170px]"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-4">
            <div className="flex items-center gap-2.5 sm:gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500 sm:h-9 sm:w-9">
                <Sparkles className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-neutral-900 sm:text-xs">
                  AI Models
                </p>

                <p className="mt-0.5 text-[9px] text-neutral-400 sm:text-[10px]">
                  Connected
                </p>
              </div>

            </div>
          </div>
        </motion.div>


        {/* ===================================================
            TOP RIGHT CARD
        ==================================================== */}

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute right-0 top-[7%] w-[145px] sm:right-[2%] sm:top-[8%] sm:w-[170px]"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-4">
            <div className="flex items-center gap-2.5 sm:gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 sm:h-9 sm:w-9">
                <Code2 className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-neutral-900 sm:text-xs">
                  Developer Tools
                </p>

                <p className="mt-0.5 text-[9px] text-neutral-400 sm:text-[10px]">
                  Connected
                </p>
              </div>

            </div>
          </div>
        </motion.div>


        {/* ===================================================
            CENTER CARD
        ==================================================== */}

        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-orange-200 bg-white shadow-[0_20px_55px_rgba(249,115,22,0.12)] sm:h-32 sm:w-32">

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl border border-orange-300"
            />

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm sm:h-12 sm:w-12">
              <Sparkles className="h-5 w-5" />
            </div>

            <span className="mt-2 text-[11px] font-semibold text-neutral-900 sm:text-xs">
              Rivinity
            </span>

            <span className="mt-0.5 text-[8px] text-neutral-400 sm:text-[9px]">
              Intelligence layer
            </span>

          </div>
        </motion.div>


        {/* ===================================================
            BOTTOM LEFT
        ==================================================== */}

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
          className="absolute bottom-[6%] left-0 w-[145px] sm:bottom-[8%] sm:left-[5%] sm:w-[170px]"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-4">
            <div className="flex items-center gap-2.5 sm:gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500 sm:h-9 sm:w-9">
                <Database className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-neutral-900 sm:text-xs">
                  Databases
                </p>

                <p className="mt-0.5 text-[9px] text-neutral-400 sm:text-[10px]">
                  Connected
                </p>
              </div>

            </div>
          </div>
        </motion.div>


        {/* ===================================================
            BOTTOM RIGHT
        ==================================================== */}

        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[8%] right-0 w-[145px] sm:bottom-[12%] sm:right-[5%] sm:w-[170px]"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-4">
            <div className="flex items-center gap-2.5 sm:gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 sm:h-9 sm:w-9">
                <Webhook className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-neutral-900 sm:text-xs">
                  APIs & Webhooks
                </p>

                <p className="mt-0.5 text-[9px] text-neutral-400 sm:text-[10px]">
                  Connected
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  </div>
</section>
   {/* =========================================================
    POPULAR INTEGRATIONS
========================================================= */}

<section className="border-b border-neutral-200 bg-neutral-50/60">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-500">
          Popular
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Works with the tools you already use.
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
          Connect Rivinity to the tools powering your applications,
          teams, and workflows.
        </p>
      </div>

      <a
        href="#integrations"
        className="group flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-orange-500"
      >
        View all
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>

    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {popularIntegrations.slice(0, 6).map((integration, i) => (
        <motion.div
          key={integration.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          whileHover={{ y: -5 }}
        >
          <IntegrationCard integration={integration} />
        </motion.div>
      ))}
    </div>

  </div>
</section>

 {/* ===================== ALL INTEGRATION ===================== */}

<section
  id="integrations"
  className="scroll-mt-20 border-b border-neutral-200 bg-white"
>
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

    {/* ===================== SECTION HEADER ===================== */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-2xl"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-500"
      >
        Directory
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl"
      >
        Find your integration.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 text-sm leading-6 text-neutral-500 sm:text-base"
      >
        Search integrations or browse by category.
      </motion.p>
    </motion.div>


    {/* ===================== SEARCH + CATEGORIES ===================== */}

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >

      {/* Search */}

      <motion.div
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full lg:max-w-md"
      >
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search integrations..."
          className="h-11 w-full rounded-lg border border-neutral-200 pl-10 pr-10 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
        />

        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>


      {/* Categories */}

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {CATEGORIES.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: 0.25 + index * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
              activeCategory === category
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-orange-200 hover:bg-orange-50"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

    </motion.div>


    {/* ===================== CARDS ===================== */}

    <motion.div
      layout
      className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            layout
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.97,
            }}
            transition={{
              duration: 0.45,
              delay: Math.min(index * 0.045, 0.35),
              ease: [0.22, 1, 0.36, 1],
              layout: {
                duration: 0.35,
              },
            }}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
          >
            <IntegrationCard integration={integration} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>


    {/* ===================== EMPTY STATE ===================== */}

    <AnimatePresence>
      {filteredIntegrations.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
            }}
          >
            <Search className="mx-auto h-5 w-5 text-neutral-400" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.15,
            }}
            className="mt-4 font-semibold text-neutral-900"
          >
            No integrations found
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
            className="mt-2 text-sm text-neutral-500"
          >
            Try another search or category.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.25,
            }}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-4 text-sm font-medium text-orange-500"
          >
            Clear filters
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>

  </div>
</section>
{/* =========================================================
    CONNECT ANYTHING
========================================================= */}

<section className="relative overflow-hidden border-b border-neutral-200 bg-orange-50/40">

  {/* Background glow */}

  <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl" />

  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

      {/* =====================================================
          LEFT CONTENT
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >

        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-orange-500">
          No integration? No problem.
        </p>

        <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl">
          Connect anything
          <br />
          <span className="text-orange-500">
            with an API.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
          Bring your existing infrastructure into Rivinity.
          Connect services using APIs, webhooks, SDKs, and
          events without rebuilding the systems you already use.
        </p>


        {/* Features */}

        <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">

          {[
            "REST APIs",
            "Webhooks",
            "SDKs",
            "Events",
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
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 rounded-lg border border-orange-200/70 bg-white/70 px-3 py-2.5"
            >

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
                <Check className="h-3 w-3 text-orange-500" />
              </span>

              <span className="text-xs font-medium text-neutral-700">
                {item}
              </span>

            </motion.div>

          ))}

        </div>


        {/* Link */}

        <Link
          href="/docs"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-800 transition-colors hover:text-orange-500"
        >
          Read the developer docs

          <ArrowRight className="h-4 w-4 text-orange-500 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

      </motion.div>


      {/* =====================================================
          RIGHT API CARD
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >

        {/* Orange glow */}

        <div className="absolute -inset-6 rounded-[2rem] bg-orange-500/10 opacity-60 blur-3xl" />


        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.07)]">

          {/* =================================================
              CARD HEADER
          ================================================== */}

          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50"
              >
                <Code2 className="h-4 w-4 text-orange-500" />
              </motion.div>

              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  Custom integration
                </p>

                <p className="mt-0.5 font-mono text-[10px] text-neutral-400">
                  integration.json
                </p>
              </div>

            </div>


            {/* Status */}

            <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2.5 py-1">

              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-green-500"
              />

              <span className="text-[10px] font-medium text-green-600">
                Connected
              </span>

            </div>

          </div>


          {/* =================================================
              CODE
          ================================================== */}

          <div className="p-5 sm:p-7">

            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">

              {/* Code header */}

              <div className="flex items-center gap-1.5 border-b border-neutral-200 px-4 py-3">

                <span className="h-2 w-2 rounded-full bg-neutral-300" />
                <span className="h-2 w-2 rounded-full bg-neutral-300" />
                <span className="h-2 w-2 rounded-full bg-neutral-300" />

                <span className="ml-3 font-mono text-[10px] text-neutral-400">
                  API CONNECTION
                </span>

              </div>


              {/* Code */}

              <div className="p-5 font-mono text-[11px] leading-7 sm:text-xs">

                <p className="text-neutral-400">
                  {"{"}
                </p>

                <p className="pl-5">
                  <span className="text-orange-500">
                    "endpoint"
                  </span>

                  <span className="text-neutral-400">
                    :{" "}
                  </span>

                  <span className="text-green-600">
                    "/api/v1/connect"
                  </span>
                </p>

                <p className="pl-5">
                  <span className="text-orange-500">
                    "authentication"
                  </span>

                  <span className="text-neutral-400">
                    :{" "}
                  </span>

                  <span className="text-blue-500">
                    "bearer"
                  </span>
                </p>

                <p className="pl-5">
                  <span className="text-orange-500">
                    "webhooks"
                  </span>

                  <span className="text-neutral-400">
                    :{" "}
                  </span>

                  <span className="text-blue-500">
                    true
                  </span>
                </p>

                <p className="pl-5">
                  <span className="text-orange-500">
                    "events"
                  </span>

                  <span className="text-neutral-400">
                    : [
                  </span>

                  <span className="text-green-600">
                    "created"
                  </span>

                  <span className="text-neutral-400">
                    ,{" "}
                  </span>

                  <span className="text-green-600">
                    "updated"
                  </span>

                  <span className="text-neutral-400">
                    ]
                  </span>
                </p>

                <p className="text-neutral-400">
                  {"}"}
                </p>

              </div>

            </div>


            {/* =================================================
                CONNECTION STATUS
            ================================================== */}

            <div className="mt-4 flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-4 py-3">

              <div className="flex items-center gap-2">

                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="h-2 w-2 rounded-full bg-green-500"
                />

                <span className="text-xs font-medium text-neutral-700">
                  Endpoint ready
                </span>

              </div>

              <span className="font-mono text-[10px] text-neutral-400">
                200 OK
              </span>

            </div>


            {/* =================================================
                EVENTS
            ================================================== */}

            <div className="mt-4 flex flex-wrap gap-2">

              {[
                "created",
                "updated",
                "completed",
              ].map((event, index) => (

                <motion.span
                  key={event}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 font-mono text-[10px] text-neutral-500"
                >
                  {event}
                </motion.span>

              ))}

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  </div>
</section>
{/* =========================================================
    DEVELOPER PLATFORM
========================================================= */}

<section className="relative overflow-hidden border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    {/* Heading */}

    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <motion.div
        whileHover={{ rotate: 5, scale: 1.05 }}
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50"
      >
        <Webhook className="h-5 w-5 text-orange-500" />
      </motion.div>

      <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-orange-500">
        Developer platform
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
        Everything you need to
        <span className="text-orange-500"> build deeper.</span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
        Connect applications, agents, data, and infrastructure
        with flexible developer primitives designed to work
        with the tools you already use.
      </p>
    </motion.div>


    {/* Feature grid */}

    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {[
        {
          icon: Code2,
          title: "APIs",
          description:
            "Programmatically connect applications and services.",
        },
        {
          icon: Webhook,
          title: "Webhooks",
          description:
            "Receive real-time events whenever something changes.",
        },
        {
          icon: Settings2,
          title: "SDKs",
          description:
            "Build integrations using familiar developer tooling.",
        },
        {
          icon: ShieldCheck,
          title: "Secure by default",
          description:
            "Authenticate and control access across every connection.",
        },
      ].map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
          >

            {/* Orange hover glow */}

            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            {/* Icon */}

            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-orange-100 bg-orange-50 text-orange-500"
            >
              <Icon className="h-4.5 w-4.5" />
            </motion.div>

            {/* Content */}

            <h3 className="relative mt-5 text-sm font-semibold text-neutral-900">
              {item.title}
            </h3>

            <p className="relative mt-2 text-xs leading-6 text-neutral-500">
              {item.description}
            </p>

            {/* Bottom indicator */}

            <div className="mt-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-neutral-400 transition-colors group-hover:text-orange-500">
              <span className="h-1 w-1 rounded-full bg-neutral-300 transition-colors group-hover:bg-orange-500" />
              Developer ready
            </div>

          </motion.div>
        );
      })}

    </div>


    {/* Bottom developer strip */}

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 sm:flex-row"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white ring-1 ring-neutral-200">
          <Code2 className="h-3.5 w-3.5 text-neutral-500" />
        </div>

        <span className="text-xs text-neutral-500">
          Designed for modern development workflows.
        </span>
      </div>

      <Link
        href="/docs"
        className="group flex items-center gap-2 text-xs font-medium text-neutral-700 transition-colors hover:text-orange-500"
      >
        Explore the docs

        <ArrowRight className="h-3.5 w-3.5 text-orange-500 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>

  </div>
</section>

           {/* Unified FAQ Section */}
        <FaqSection
          title="Integration questions, answered."
          subtitle="Everything you need to know about connecting your tools, applications, and infrastructure with Rivinity."
          items={[
            {
              question: "What can I connect to Rivinity?",
              answer:
                "You can connect applications, APIs, databases, agents, and external services using native integrations, APIs, webhooks, and SDKs.",
            },
            {
              question: "Do I need a native integration?",
              answer:
                "No. If a service isn't available in the integration directory, you can connect it using Rivinity's API, webhooks, or developer SDKs.",
            },
            {
              question: "How do Rivinity integrations work?",
              answer:
                "Integrations provide a secure connection between Rivinity and your existing systems, allowing data and events to move between them.",
            },
            {
              question: "Are integrations secure?",
              answer:
                "Yes. Connections are designed around authentication, controlled access, and secure communication between your services.",
            },
            {
              question: "Can I build my own integration?",
              answer:
                "Yes. Developers can use APIs, webhooks, SDKs, and events to create custom integrations for services that aren't already available.",
            },
          ]}
        />

        {/* Unified CTA Section */}
        <CtaSection
          title="Ready to build intelligent integrations?"
          description="Connect your codebase and APIs to Rivinity's unified agent runtime in minutes."
          buttonText="Start Building for Free"
          buttonHref="/signup"
        />
      </motion.main>

      <Footer />
    </div>
  );
}

/* ============================================================
   CONNECTION NODE
============================================================ */

function ConnectionNode({
  icon: Icon,
  label,
  active = false,
}: {
  icon: ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative flex items-center gap-3 rounded-xl border p-4 ${
        active
          ? "border-orange-200 bg-white shadow-sm"
          : "border-neutral-200 bg-white/70"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-orange-500 text-white"
            : "bg-neutral-100 text-neutral-600"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-sm font-semibold text-neutral-900">
          {label}
        </p>

        <p className="mt-0.5 text-xs text-neutral-400">
          Connected
        </p>
      </div>

      {active && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange-500"
        />
      )}
    </motion.div>
  );
}

/* ============================================================
   CONNECTION LINE
============================================================ */

function ConnectionLine() {
  return (
    <div className="hidden items-center justify-center sm:flex">
      <div className="relative h-px w-10 bg-neutral-200">
        <motion.div
          animate={{
            x: [0, 28, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orange-500"
        />
      </div>
    </div>
  );
}

/* ============================================================
   INTEGRATION CARD
============================================================ */

function IntegrationCard({
  integration,
}: {
  integration: Integration;
}) {
  const Icon = integration.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      whileHover={{
        y: -5,
      }}
      className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-orange-500/0 blur-3xl transition-all duration-500 group-hover:bg-orange-500/10" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-800 transition-colors group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-600">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-300 transition-all group-hover:bg-neutral-100 group-hover:text-neutral-600">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="relative mt-5">
        <h3 className="text-base font-semibold text-neutral-900">
          {integration.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {integration.description}
        </p>
      </div>

      <div className="relative mt-auto pt-5">
        <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-500">
          {integration.category}
        </span>
      </div>
    </motion.div>
  );
}

/* ============================================================
   DEVELOPER FEATURE
============================================================ */

function DeveloperFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        backgroundColor: "#fafafa",
      }}
      className="bg-white p-6 transition-colors"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
        <Icon className="h-4 w-4" />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-neutral-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-neutral-500">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-xs font-medium text-neutral-400">
        Learn more
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </motion.div>
  );
}