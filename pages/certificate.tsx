"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  RefreshCw,
  Globe,
  Share2,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LogoMarquee from "@/components/logoslide";

interface ProficiencyLevel {
  level: number;
  title: string;
  points: string[];
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const proficiencyLevels: ProficiencyLevel[] = [
  {
    level: 1,
    title: "Beginner Builder",
    points: [
      "Navigate the Rivinity workspace",
      "Write basic prompts",
      "Preview and deploy simple projects",
    ],
  },
  {
    level: 2,
    title: "Core Builder",
    points: [
      "Build more complex applications",
      "Store and manage data",
      "Provide effective context to the Agent",
    ],
  },
  {
    level: 3,
    title: "Proficient Builder",
    points: [
      "Connect external services",
      "Configure applications properly",
      "Optimize how you use resources",
    ],
  },
  {
    level: 4,
    title: "Advanced Builder",
    points: [
      "Build production-ready applications",
      "Manage complete development workflows",
      "Use advanced prompting techniques",
    ],
  },
  {
    level: 5,
    title: "Master Builder",
    points: [
      "Solve complex problems independently",
      "Extend platform capabilities",
      "Contribute to the community",
    ],
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: "Build on Rivinity",
    description:
      "Create projects, deploy applications, and grow your portfolio using Rivinity's AI-powered development environment.",
  },
  {
    number: 2,
    title: "Get Certified",
    description:
      "Instantly unlock your verified Rivinity developer status and access your professional certification profile.",
  },
  {
    number: 3,
    title: "Share Your Skills",
    description:
      "Add your official Rivinity certification to LinkedIn with one click to showcase your verified building skills.",
  },
];

const features: Feature[] = [
  {
    icon: <RefreshCw className="w-5 h-5" strokeWidth={2} />,
    title: "Automatic Updates",
    description: "Your certification keeps pace as you build more on Rivinity.",
  },
  {
    icon: <Share2 className="w-5 h-5" strokeWidth={2} />,
    title: "LinkedIn Integration",
    description: "Push your certification straight to your LinkedIn profile.",
  },
  {
    icon: <Globe className="w-5 h-5" strokeWidth={2} />,
    title: "Shareable Profile",
    description: "Get a public profile link you can share anywhere.",
  },
];

export default function CertificatePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-[family-name:var(--font-body)] container">
        {/* Hero Section */}
        <section className="section-lg py-16 md:py-24">
          <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-[var(--color-text-primary)] mb-6">
                Get your
                <br />
                <span className="text-[var(--color-accent)]">Rivinity</span>
                <br />
                <span className="text-[var(--color-accent)]">Certification.</span>
              </h1>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-8 max-w-[480px]">
                Fetch your official Rivinity certification and add it to your
                LinkedIn profile in seconds.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/certifications/start"
                  className="btn btn-primary rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:bg-[var(--color-accent-hover)] flex items-center gap-2"
                >
                  Get My Certification
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <a
                  href="#proficiency-levels"
                  className="btn btn-secondary rounded-full px-6 py-3.5 text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-all"
                >
                  Explore the levels
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[1/0.8] bg-[#e8e2d9] rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="relative w-20 h-20 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-10 h-10 text-[var(--color-accent)]"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M8.5 14L7 21L12 18.5L17 21L15.5 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center border-2 border-[#e8e2d9]">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                  Verified by Rivinity
                </p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
                  Official Builder Certification
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-10 border-y border-[var(--color-border-subtle)]">
          <div className="container text-center">
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <LogoMarquee />
            </div>
          </div>
        </section>

        {/* Proficiency Levels Section */}
        <section id="proficiency-levels" className="section py-20 bg-[var(--color-bg-secondary)] px-20 mt-10">
          <div className="container">
            <div className="text-center max-w-160 mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
                Proficiency
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
                The 5 proficiency levels.
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Showcase your growth and expertise within the Rivinity ecosystem
                with an officially recognized proficiency level.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {proficiencyLevels.map((level) => (
                <div
                  key={level.level}
                  className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col gap-3 shadow-xs hover:border-[var(--color-accent)]/40 transition-colors"
                >
                  <span className="self-start bg-[var(--color-accent)] text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full">
                    LEVEL {level.level}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text-primary)]">
                    {level.title}
                  </h3>
                  <ul className="flex flex-col gap-2 mt-1 pl-0">
                    {level.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-3.5 text-xs leading-relaxed text-[var(--color-text-secondary)] before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1.5 before:h-1.5"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section py-20">
          <div className= "bg-gray-50 rounded-3xl p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
                  How it works
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-4">
                  Certified in three
                  <br />
                  simple steps.
                </h2>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Getting your Rivinity certification is simple and automatic.
                </p>
                <p className="text-xs italic text-[var(--color-text-muted)]">
                  * Please note that an active Rivinity subscription is required
                  to qualify for certification.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ol className="relative flex flex-col gap-10 pl-6 border-l-2 border-border ml-2 list-none">
                  {steps.map((step) => (
                    <li key={step.number} className="relative pl-3">
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[var(--color-accent)] border-4 border-[#ece6de] mt-5" />
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text-primary)] mb-2">
                        {step.number}. {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-lg">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-sm">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-2xl p-8"
                >
                  <div className="w-11 h-11 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section pb-24">
          <div className="container">
            <div className="bg-gray-50 rounded-3xl p-10 md:p-16 text-center flex flex-col items-center justify-center">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Ready to get certified?
              </h2>
              <p className="text-base md:text-lg text-black max-w-[560px] mb-8 leading-relaxed">
                Sign in with your Rivinity account to fetch your certification level
                and add it to your professional profile.
              </p>
              <Link
                href="/certifications/start"
                className="btn-primary btn-primary:hover rounded-4xl px-8 py-4 text-sm font-bold shadow-md hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Get My Certification
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}