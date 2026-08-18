import type { Metadata } from "next";

import FUIBentoGridDark from "../components/ui/research/bento";
import ResearchTeam from "../components/ui/research/marquee";
import {
  ServiceCarousel,
  defaultResearchServices,
} from "../components/ui/research/animated-service-card";
import Header from "../components/header";
import Footer from "../components/footer";

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

const researchAreas = [
  {
    title: "Agents",
    description:
      "Multi-agent orchestration, tool-use reliability, and long-horizon planning for production systems that act, not just answer.",
    gradient: "from-[#2A2E7A] via-[#4B4FA8] to-[#7A6FD6]",
  },
  {
    title: "Security",
    description:
      "Adversarial robustness, model provenance, and threat detection for AI systems operating inside regulated infrastructure.",
    gradient: "from-[#7A2E4B] via-[#A83F5A] to-[#D6746F]",
  },
  {
    title: "Media Forensics",
    description:
      "Generative-artifact fingerprinting and deepfake detection built to survive real-world compression and re-encoding.",
    gradient: "from-[#1F4D4D] via-[#2E7A72] to-[#6FD6B8]",
  },
  {
    title: "Cloud Intelligence",
    description:
      "Sovereign-grade inference scheduling and compliance-aware workload placement across CLOS-AI.",
    gradient: "from-[#3A2E7A] via-[#5F4FA8] to-[#9F6FD6]",
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
const processSteps = [
  {
    number: "01",
    title: "Research and Analysis",
    description:
      "We start by understanding your vision in depth — studying your competitors, your industry, and your users. This groundwork shapes every decision that follows and ensures the end product actually fits the people using it.",
  },
  {
    number: "02",
    title: "Wireframing and Prototyping",
    description:
      "Next we lay out skeletal versions of every screen. These low-fidelity blueprints let us test flow and structure early, so problems get caught before a single pixel of visual design is touched.",
  },
  {
    number: "03",
    title: "Design Creation",
    description:
      "With the structure validated, our design phase brings the vision to life. We focus on visual polish while staying tightly aligned with brand identity — nothing ships that doesn't feel intentional.",
  },
  {
    number: "04",
    title: "Development and Testing",
    description:
      "Designs become a fully working product. Every feature goes through rigorous testing so the final build is reliable, performant, and behaves exactly as designed across devices.",
  },
  {
    number: "05",
    title: "Launch and Support",
    description:
      "Shipping isn't the finish line. We stay on to handle post-launch issues, monitor performance, and keep iterating — because a good product keeps evolving after release.",
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
    <main className="bg-[#F7F4F1] text-[#2F3137] antialiased min-h-screen">
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
      <section className="relative isolate overflow-hidden bg-[#F7F4F1] px-6 pb-24 pt-24 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
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
          {/* Eyebrow */}
          <div
            className="rv-rise mb-7 inline-flex items-center gap-2 rounded-full border border-[#D8D2C9] bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm"
            style={{ animationDelay: "0s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] sm:text-[11px]">
              Rivinity Research
            </span>
          </div>

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

      <section className="border-t border-[#E5E0DA] bg-[#F7F4F1] px-6 py-24">
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
      {/* RESEARCH PROCESS */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[#FCFBF9] px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-24 items-start">

          {/* Left column */}
          <div className="h-fit md:sticky md:top-28">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#C4622D]">
              Our Process
            </p>

            <h2 className="mb-6 text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
              Planning your{" "}
              <span className="text-[#C4622D]">
                research journey
              </span>
            </h2>

            <p className="max-w-md leading-relaxed text-neutral-600">
              Every research project follows the same five phases below — from
              initial discovery and analysis to development, testing, and
              continuous improvement.
            </p>
          </div>

          {/* Right column */}
          <div className="relative flex flex-col gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="sticky"
                style={{ top: `${7 + i * 1.5}rem` }}
              >
                <div
                  className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
                  style={{ minHeight: "260px" }}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-neutral-900">
                      {step.title}
                    </h3>

                    <span className="shrink-0 text-2xl font-semibold text-[#C4622D]">
                      {step.number}
                    </span>
                  </div>

                  <p className="leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------------------- */}
      {/* OPEN SOURCE PROJECTS */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-[#E5E0DA] px-6 py-24 bg-[#EFECE6]">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl text-[#1F2937]">
            Key open-source projects
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {openSourceProjects.map((project) => (
              <div
                key={project.name}
                className={`rv-card flex min-h-[180px] flex-col justify-end rounded-2xl bg-gradient-to-br p-6 ${project.gradient}`}
              >
                <h3 className="mb-2 text-lg font-semibold leading-snug text-white">
                  {project.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/90">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH BLOGS */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-[#E5E0DA] px-6 py-24 bg-[#EFECE6]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#1F2937]">
              Research blogs
            </h2>
            <button className="rounded-md border border-[#D5D0C8] bg-white px-4 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F7F4F1] transition-colors">
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {blogPosts
              .filter((p) => p.featured)
              .map((post) => (
                <div
                  key={post.title}
                  className="rv-card overflow-hidden rounded-2xl border border-[#D5D0C8] bg-white"
                >
                  <div
                    className={`relative flex h-64 items-start p-6 bg-gradient-to-br ${post.gradient}`}
                  >
                    <span className="w-fit rounded bg-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-white backdrop-blur-sm">
                      {post.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-[#1F2937]">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#4B5563]">{post.excerpt}</p>
                  </div>
                </div>
              ))}

            <div className="grid grid-cols-1 gap-5">
              {blogPosts
                .filter((p) => !p.featured)
                .map((post) => (
                  <div
                    key={post.title}
                    className="rv-card flex items-center gap-4 rounded-2xl border border-[#D5D0C8] bg-white p-4"
                  >
                    <div
                      className={`h-20 w-24 shrink-0 rounded-lg bg-gradient-to-br ${post.gradient}`}
                    />
                    <div>
                      <span className="mb-1 inline-block rounded bg-[#F4F1FA] px-2 py-0.5 text-[9px] font-semibold tracking-widest text-[#6D5EF5]">
                        {post.tag}
                      </span>
                      <h3 className="text-sm font-semibold leading-snug text-[#1F2937]">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* IN THE SPOTLIGHT */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-t border-[#E5E0DA] bg-[#EAE4DC] px-6 py-24 text-center">
        <div className="relative mx-auto max-w-5xl">
          {/* Label */}
          <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
            FEATURED TALKS
          </span>

          {/* Heading */}
          <h2 className="text-3xl font-semibold tracking-tight text-[#1F2937] sm:text-4xl">
            In the spotlight
          </h2>

          <p className="mt-2 text-sm text-[#4B5563]">
            Featured talks and conference presentations by our researchers
          </p>

          {/* Spotlight Card */}
          <div className="group relative mt-10 h-[420px] overflow-hidden rounded-2xl border border-[#D5D0C8] bg-transparent transition-all duration-500 hover:border-[#6D5EF5]">
            {/* Conference Image */}
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
              alt="Conference presentation"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

            {/* Card Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8">
              {/* Badge */}
              <div className="self-start">
                <span className="inline-flex rounded-md border border-white/60 bg-white/40 px-3 py-1 text-[11px] font-medium tracking-wider text-[#1F2937] backdrop-blur-md">
                  CONFERENCE
                </span>
              </div>

              {/* Bottom Content */}
              <div className="flex items-end justify-between gap-6 text-left">
                <div className="max-w-xl">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#374151]">
                    Research & Innovation
                  </p>

                  <h3 className="text-2xl font-semibold tracking-tight text-[#1F2937] sm:text-3xl">
                    Building the future of intelligent systems
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#374151]">
                    Explore featured presentations and conversations from our
                    researchers and collaborators.
                  </p>
                </div>

                {/* Button */}
                <a
                  href="/watch-talk"
                  className="group/btn inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/60 bg-white/40 px-5 py-2.5 text-xs font-semibold text-[#1F2937] backdrop-blur-md transition-all duration-300 hover:bg-[#1F2937] hover:text-white"
                >
                  <span>Watch Presentation</span>
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
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
      <section className="border-t border-[#E5E0DA] bg-[#EAE4DC] px-6 py-28 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block rounded-full border border-[#6D5EF5]/20 bg-[#6D5EF5]/5 px-4 py-1 text-xs font-semibold tracking-widest text-[#6D5EF5]">
            RIVINITY RESEARCH
          </span>

          <h2 className="text-4xl font-semibold tracking-tight text-[#1F2937] sm:text-5xl">
            Building the future through
            <span className="text-[#F97316]"> research</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#4B5563]">
            From AI agents and cloud intelligence to security and media
            forensics, we're advancing the next generation of intelligent
            infrastructure.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/research"
              className="rounded-xl bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#EA580C]"
            >
              Explore Research
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-[#D5D0C8] bg-white px-7 py-3.5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F7F4F1]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ==================== RIVINITY FOOTER ==================== */}
      <Footer />
    </main>
  );
}