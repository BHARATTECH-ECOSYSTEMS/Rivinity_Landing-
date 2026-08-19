import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FUIBentoGridDark from "../components/ui/research/bento";
import ResearchTeam from "../components/ui/research/marquee";
import {
  ServiceCarousel,
  defaultResearchServices,
} from "../components/ui/research/animated-service-card";


import Header from "../components/header";
import Footer from "../components/footer";
import Cta from "../components/cta-section";

import Integraations3 from "../components/ui/research/open";
export const metadata: Metadata = {
  title: "Research — Rivinity",
  description:
    "Building the future of intelligent infrastructure — agents, security, media forensics, and cloud intelligence.",
};

/* -------------------------------------------------------------------------
   DATA
------------------------------------------------------------------------- */

const recognizedBy = [
  "AI Research",
  "Cloud Infrastructure",
  "Enterprise Security",
  "Open Innovation",
];

const researchProcess = [
  {
    number: "01",
    title: "Explore",
    description:
      "We investigate emerging technologies, scientific papers, and real-world problems to identify promising research directions.",
  },
  {
    number: "02",
    title: "Experiment",
    description:
      "We build prototypes, train models, and test different approaches through rapid experimentation.",
  },
  {
    number: "03",
    title: "Validate",
    description:
      "We evaluate our systems against benchmarks and real-world scenarios to understand their performance and limitations.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Promising research is transformed into reliable systems, tools, and infrastructure.",
  },
];

const recognizedResearch = [
  {
    tag: "PREPRINT",
    title:
      "Grounding Tool Calls: Reducing Hallucinated Actions in Multi-Step Agents",
    authors: "A. RAO, M. FERNANDES, S. IYER ET AL.",
  },
  {
    tag: "SPOTLIGHT",
    title: "Provenance Chains for Fine-Tuned Models in Regulated Environments",
    authors: "K. BHATT, D. VERMA ET AL.",
  },
  {
    tag: "SPOTLIGHT",
    title: "Temporal Artifact Fingerprinting Across Compressed Video Codecs",
    authors: "P. NAIR, S. IYER, R. CHATTERJEE ET AL.",
  },
];


const openSourceProjects = [
  {
    name: "ThreatShield AI",
    description: "Modular threat detection, in production",
    gradient: "from-[#2A2E7A] to-[#4B4FA8]",
  },
  {
    name: "CLOS-AI",
    description: "Compliance-aware scheduling, open core",
    gradient: "from-[#7A2E4B] to-[#A83F5A]",
  },
  {
    name: "Agent Platform SDK",
    description: "Typed tooling for reliable multi-agent systems",
    gradient: "from-[#1F4D4D] to-[#2E7A72]",
  },
  {
    name: "Deepfake Detection Engine",
    description: "Reference forensics models, self-hostable",
    gradient: "from-[#3A2E7A] to-[#5F4FA8]",
  },
  {
    name: "Rivinity Eval Harness",
    description: "Reproducible benchmarks for agentic systems",
    gradient: "from-[#5A2E7A] to-[#8B4FA8]",
  },
  {
    name: "Sovereign Datasets",
    description: "40T+ tokens curated for Indic-language training",
    gradient: "from-[#2E4D7A] to-[#4F7AA8]",
  },
  {
    name: "Air-Gap Runtime",
    description: "Fully disconnected inference, benchmarked",
    gradient: "from-[#4D2E4D] to-[#7A4F7A]",
  },
  {
    name: "Prompt Boundary Filter",
    description: "Injection detection at the retrieval layer",
    gradient: "from-[#2E7A5A] to-[#4FA88B]",
  },
];

const blogPosts = [
  {
    tag: "RESEARCH",
    title:
      "Why Agent Reliability Is a Scheduling Problem, Not Just a Model Problem",
    excerpt:
      "Most agent failures we see in production trace back to orchestration, not model quality...",
    featured: true,
    gradient: "from-[#7A2E6F] via-[#A83F8A] to-[#D67AC4]",
  },
  {
    tag: "RESEARCH",
    title: "Building an Inference Layer That Never Leaves the Country",
    excerpt:
      "A look inside the constraints of designing air-gapped inference for regulated enterprises...",
    gradient: "from-[#2A2E7A] to-[#4B4FA8]",
  },
  {
    tag: "RESEARCH",
    title: "What We Learned Red-Teaming Our Own Agent Platform",
    excerpt:
      "Three months of internal adversarial testing surfaced failure modes we hadn't considered...",
    gradient: "from-[#1F4D4D] to-[#2E7A72]",
  },
  {
    tag: "RESEARCH",
    title: "Compliance-Aware Scheduling for Multi-Region Inference",
    excerpt:
      "How CLOS-AI enforces data-residency constraints without sacrificing p99 latency...",
    gradient: "from-[#3A2E7A] to-[#5F4FA8]",
  },
];

const teamMembers = [
  { name: "Aditi Rao", role: "HEAD OF RESEARCH", initials: "AR" },
  { name: "Marco Fernandes", role: "PRINCIPAL, CLOUD INTELLIGENCE", initials: "MF" },
  { name: "Sanjana Iyer", role: "LEAD, AGENTS", initials: "SI" },
  { name: "Kabir Bhatt", role: "LEAD, SECURITY", initials: "KB" },
  { name: "Divya Verma", role: "RESEARCHER, SECURITY", initials: "DV" },
  { name: "Priyanka Nair", role: "RESEARCHER, MEDIA FORENSICS", initials: "PN" },
  { name: "Rohan Chatterjee", role: "RESEARCHER, INFRASTRUCTURE", initials: "RC" },
  { name: "Neha Kulkarni", role: "RESEARCH ENGINEER", initials: "NK" },
];

const footerColumns = [
  {
    heading: "PRODUCTS",
    links: [
      "Rivinity Cloud",
      "Private VPC",
      "On-Premise",
      "Fine-Tuning",
      "Sandbox",
      "Evaluations",
    ],
  },
  {
    heading: "MODELS",
    links: ["See all models", "Indic-LLM", "Agent Models", "Custom Models"],
  },
  {
    heading: "DEVELOPERS",
    links: ["Research", "Docs", "Open-Source AI", "Pricing"],
  },
  {
    heading: "RESOURCES",
    links: ["Blog", "About us", "Careers", "Customer Stories", "Support"],
  },
];

/* -------------------------------------------------------------------------
   PAGE
------------------------------------------------------------------------- */

export default function ResearchPage() {
  return (
    <main className="bg-[#f8fafc] text-[#2F3137] antialiased min-h-screen">
      <style>{`
        @keyframes rv-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rv-drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-16px); } }
        .rv-rise { animation: rv-rise 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .rv-blob { animation: rv-drift 16s ease-in-out infinite; }
        .rv-card { transition: border-color .25s ease, transform .25s ease; }
        .rv-card:hover { border-color: rgba(109,94,245,0.3); transform: translateY(-3px); }
        @media (prefers-reduced-motion: reduce) { .rv-rise, .rv-blob { animation: none; } }
      `}</style>



      {/* Navbar */}
      <Header />

      {/* ---------------------------------------------------------------- */}
      {/* HERO */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-[#f8fafc]px-6 pb-24 pt-24 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
        {/* Soft background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.10) 0%, rgba(109,94,245,0.07) 35%, transparent 70%)",
          }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #6D5EF5 1px, transparent 1px), linear-gradient(to bottom, #6D5EF5 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">

          {/* Main heading */}
          <h1
            className="rv-rise max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#1F2937] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.08s" }}
          >
            Foundation research for{" "}
            <span className="text-[#F97316]">Rivinity.</span>
            <br />
            <span className="text-[#555A63]">
              Built for the real world.
            </span>
          </h1>

          {/* Description */}
          <p
            className="rv-rise mt-7 max-w-2xl text-base leading-7 text-[#686B72] sm:text-lg sm:leading-8"
            style={{ animationDelay: "0.16s" }}
          >
            We research the systems behind reliable AI — from autonomous agents
            and secure infrastructure to media forensics and sovereign cloud
            intelligence.
          </p>

          {/* CTA buttons */}
          <div
            className="rv-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.24s" }}
          >
            <a
              href="#research-areas"
              className="inline-flex items-center justify-center rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EA580C] hover:shadow-md"
            >
              Explore our research
              <span className="ml-2 text-base">→</span>
            </a>

            <a
              href="#research-capabilities"
              className="inline-flex items-center justify-center rounded-xl border border-[#D8D2C9] bg-white/70 px-6 py-3 text-sm font-semibold text-[#2F3137] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BDB6AC] hover:bg-white"
            >
              Research capabilities
            </a>
          </div>

          {/* Recognition */}
          <div
            className="rv-rise mt-16 w-full max-w-3xl border-t border-[#E1DCD5] pt-7"
            style={{ animationDelay: "0.32s" }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#969087]">
              Recognized for
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold tracking-wide text-[#696C73] sm:grid-cols-4 sm:gap-0">
              {recognizedBy.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center justify-center px-3 ${index !== 0
                      ? "border-l border-[#E1DCD5]"
                      : ""
                    }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH AREAS */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="research-areas"
        className="mx-auto max-w-7xl px-6 pb-24"
      >
        <p className="mb-6 text-center text-[11px] font-medium tracking-[0.2em] text-[#77748F]">
          OUR RESEARCH AREAS
        </p>

        <FUIBentoGridDark />
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH CAPABILITIES */}
      {/* ---------------------------------------------------------------- */}

      <section className="border-t border-[#E5E0DA] bg-[#f8fafc] px-6 py-24">
        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#77748F]">
              Research Capabilities
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1F2937] sm:text-5xl">
              Intelligence built for{" "}
              <span className="text-[#F97316]">
                real-world systems.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#5F6269]">
              From autonomous agents to secure infrastructure,
              our research focuses on technologies that can move
              from experiments into reliable production systems.
            </p>
          </div>

          {/* Cards */}
          <ServiceCarousel
            services={defaultResearchServices}
          />

        </div>
      </section>
    

      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH INFRASTRUCTURE */}
      {/* ---------------------------------------------------------------- */}

      <Integraations3 />
     

    
    
     {/* ---------------------------------------------------------------- */}
     {/* RESEARCH BLOGS */}
      {/* ---------------------------------------------------------------- */}

<section className="border-b border-neutral-200/80 bg-[#f8fafc]">
  <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">

    {/* Header */}
    <div className="flex items-end justify-between gap-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">
          Rivinity Labs
        </span>

        <h2 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Research blog
        </h2>

        <p className="mt-2 max-w-md text-sm text-neutral-500">
          Foundational ideas and systems research for production AI.
        </p>
      </div>

      {/* Arrow Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            const container = document.getElementById("research-blog-carousel");

            container?.scrollBy({
              left: -400,
              behavior: "smooth",
            });
          }}
          aria-label="Previous research article"
          className="flex size-9 items-center justify-center rounded-full border border-neutral-300/90 bg-white text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:text-black active:scale-95"
        >
          <ArrowLeft className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            const container = document.getElementById("research-blog-carousel");

            container?.scrollBy({
              left: 400,
              behavior: "smooth",
            });
          }}
          aria-label="Next research article"
          className="flex size-9 items-center justify-center rounded-full border border-neutral-300/90 bg-white text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:text-black active:scale-95"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>

    {/* Research Cards */}
    <div
      id="research-blog-carousel"
      className="mt-10 flex gap-5 overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {blogPosts.map((post, index) => (
        <article
          key={`${post.title}-${index}`}
          className="group min-w-[300px] flex-1 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md sm:min-w-[340px]"
        >
          {/* Tag */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">
              {post.tag}
            </span>

            <span className="text-xs text-neutral-400">
              0{index + 1}
            </span>
          </div>

          {/* Gradient */}
          <div
            className={`mb-6 h-32 rounded-xl bg-gradient-to-br ${post.gradient}`}
          />

          {/* Content */}
          <h3 className="text-lg font-semibold leading-7 tracking-tight text-neutral-950">
            {post.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {post.excerpt}
          </p>

          {/* Read More */}
          <button
            type="button"
            className="mt-6 inline-flex items-center text-sm font-semibold text-neutral-900 transition group-hover:text-blue-600"
          >
            Read research
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </article>
      ))}
    </div>

    {/* Categories */}
    <div className="mt-14 flex flex-wrap items-center justify-center gap-8 border-t border-neutral-200 pt-8 text-xs font-semibold tracking-widest text-neutral-400">
      <span className="cursor-pointer transition hover:text-neutral-900">
        RIVINITY LABS
      </span>

      <span className="cursor-pointer transition hover:text-neutral-900">
        AI RESEARCH
      </span>

      <span className="cursor-pointer transition hover:text-neutral-900">
        ENGINEERING
      </span>

      <span className="cursor-pointer transition hover:text-neutral-900">
        OPEN RESEARCH
      </span>
    </div>

  </div>
</section>
      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH TEAM */}
      {/* ---------------------------------------------------------------- */}
      <ResearchTeam />

      {/* ---------------------------------------------------------------- */}
      {/* FINAL CTA */}
      {/* ---------------------------------------------------------------- */}
      <Cta />

      {/* ==================== RIVINITY FOOTER ==================== */}
      <Footer />
    </main>
  );
}