import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
export const metadata: Metadata = {
  title: "Research — Rivinity",
  description:
    "Building the future of intelligent infrastructure — agents, security, media forensics, and cloud intelligence.",
};

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="text-[#2F3137] antialiased min-h-screen container">
        {/* ---------------------------------------------------------------- */}
        {/* HERO */}
        {/* ---------------------------------------------------------------- */}
        <section className="section mt-12">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#1F2937] sm:text-6xl">
              Foundation research for{" "}
              <span className="text-[#F97316]">Rivinity.</span>
              <br />
              Built for the real world.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#686B72]">
              We research the systems behind reliable AI from autonomous agents
              and secure infrastructure to media forensics and sovereign cloud
              intelligence.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#research"
                className="rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white"
              >
                Explore our research
              </a>

              <a
                href="#capabilities"
                className="rounded-xl border border-[#D8D2C9] bg-white px-6 py-3 text-sm font-semibold text-[#2F3137]"
              >
                Research capabilities
              </a>
            </div>
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        {/* RESEARCH AREAS */}
        {/* ---------------------------------------------------------------- */}
        <section id="research" className="section-sm">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="text-sm uppercase tracking-wider text-[#77748F]">
                Our Research Areas
              </span>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600" />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">
                    Get perfect clarity
                  </h3>

                  <p className="mt-2 text-[#686B72]">
                    We explore autonomous systems that reason, adapt, and operate
                    across complex digital environments.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="aspect-video bg-gradient-to-br from-cyan-400 to-blue-500" />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">
                    Undercut your competitors
                  </h3>

                  <p className="mt-2 text-[#686B72]">
                    With our advanced data mining, you'll know which companies your
                    leads are talking to and exactly how much they're being charged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        {/* RESEARCH CAPABILITIES */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="capabilities"
          className="section-sm">
          <div className="mx-auto max-w-7xl">

            {/* Section Heading */}
            <div className="mb-12 max-w-2xl">
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

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-[#7C3AED]/40 p-6 text-white">
                <h3 className="text-xl font-semibold text-white">
                  Autonomous Agents
                </h3>

                <p className="mt-2 text-sm text-gray-900">
                  Multi-agent orchestration, reliable tool use, and long-horizon
                  planning for production AI systems.
                </p>
              </div>

              <div className="rounded-2xl bg-[#EC4899]/40 p-6 text-white">
                <h3 className="text-xl font-semibold text-white">
                  AI Security
                </h3>

                <p className="mt-2 text-sm text-gray-900">
                  Adversarial robustness, model provenance, and threat detection
                  for AI systems in regulated environments.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F97316]/40 p-6 text-white">
                <h3 className="text-xl font-semibold text-white">
                  Media Forensics
                </h3>

                <p className="mt-2 text-sm text-gray-900">
                  Deepfake detection, content authenticity verification, and
                  provenance tracking for digital media.
                </p>
              </div>
            </div>

          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        {/* RESEARCH PROCESS */}
        {/* ---------------------------------------------------------------- */}

        <section className="section-sm">
          <div className="mx-auto max-w-7xl">
            <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-[#1F2937] sm:text-5xl">
              Planning your{" "}
              <span className="text-[#F97316]">research journey</span>
            </h2>
            <p className="mt-4 text-[#686B72] mb-5">
              Every research project follows the same five phases below — from
              initial discovery and analysis to development, testing, and
              continuous improvement.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="process-step rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all hover:border-[#F97316]/40 hover:shadow-sm">
                <div>
                  <span className="step-number block text-2xl font-bold text-[#F97316] mb-3">01</span>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2 leading-snug">Problem Formulation</h3>
                  <p className="text-xs leading-relaxed text-[#686B72]">
                    We start by identifying the core AI challenge— whether it's reasoning, efficiency, or safety— and define clear success metrics.
                  </p>
                </div>
              </div>

              <div className="process-step rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all hover:border-[#F97316]/40 hover:shadow-sm">
                <div>
                  <span className="step-number block text-2xl font-bold text-[#F97316] mb-3">02</span>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2 leading-snug">Literature & Systems Review</h3>
                  <p className="text-xs leading-relaxed text-[#686B72]">
                    We survey existing approaches, benchmark current systems, and identify gaps where our research can push boundaries.
                  </p>
                </div>
              </div>

              <div className="process-step rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all hover:border-[#F97316]/40 hover:shadow-sm">
                <div>
                  <span className="step-number block text-2xl font-bold text-[#F97316] mb-3">03</span>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2 leading-snug">Hypothesis Development</h3>
                  <p className="text-xs leading-relaxed text-[#686B72]">
                    We formulate testable hypotheses about model behavior, agent architectures, or infrastructure improvements.
                  </p>
                </div>
              </div>

              <div className="process-step rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all hover:border-[#F97316]/40 hover:shadow-sm">
                <div>
                  <span className="step-number block text-2xl font-bold text-[#F97316] mb-3">04</span>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2 leading-snug">Experimentation & Benchmarking</h3>
                  <p className="text-xs leading-relaxed text-[#686B72]">
                    We run controlled experiments, measure against production workloads, and iterate rapidly based on real-world feedback.
                  </p>
                </div>
              </div>

              <div className="process-step rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all hover:border-[#F97316]/40 hover:shadow-sm">
                <div>
                  <span className="step-number block text-2xl font-bold text-[#F97316] mb-3">05</span>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2 leading-snug">Publication & Production Integration</h3>
                  <p className="text-xs leading-relaxed text-[#686B72]">
                    We publish findings at top-tier venues (ICLR, ICML, NeurIPS) and integrate validated improvements directly into Rivinity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        <section className="section-sm">
          <div className="w-full max-w-7xl mx-auto px-4 text-center">
            <div className="mb-12 text-center text-4xl font-semibold tracking-tight text-[#1F2937] w-full max-w-none">
              Key open-source projects
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">
                <h4 className="font-medium text-white">
                  ThreatShield AI
                </h4>

                <p className="mt-2 text-sm text-indigo-200">
                  Modular threat detection, in production
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 p-6 text-white">
                <h4 className="font-medium text-white">
                  CLOS-AI
                </h4>

                <p className="mt-2 text-sm text-pink-200">
                  Compliance-aware scheduling, open core
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
                <h4 className="font-medium text-white">
                  Agent Platform SDK
                </h4>

                <p className="mt-2 text-sm text-emerald-200">
                  Typed tooling for reliable multi-agent systems
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-6 text-white">
                <h4 className="font-medium text-white">
                  Deepfake Detection Engine
                </h4>

                <p className="mt-2 text-sm text-violet-200">
                  Reference forensics models, self-hostable
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