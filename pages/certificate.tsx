"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  RefreshCw,
  Globe,
  Share2,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="section border-b border-[#E5E7EB] mt-12 sm:mt-20 pt-16 sm:pt-28 pb-12 sm:pb-20">
          <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.15] mb-4 sm:mb-6">
                Get your
                <span className="text-[#FF6B00]"> Rivinity</span>
                <br />
                <span className="text-[#FF6B00]">Certification.</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[#6B7280] leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Fetch your official Rivinity certification and add it to your
                LinkedIn profile in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/certifications/start"
                  className="rounded-xl bg-[#FF6B00] px-6 py-3.5 text-center text-sm font-bold text-white shadow-xs hover:bg-[#FF6B00]/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Get My Certification
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <a
                  href="#proficiency-levels"
                  className="rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-center text-sm font-bold text-[#1A1A1A] hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all shadow-xs"
                >
                  Explore the levels
                </a>
              </div>
            </div>

            {/* Right Certificate Preview Card - Hidden on Mobile/Tablet, Only Visible on Large Screens */}
            <div className="lg:col-span-5 hidden lg:flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/3] bg-[#F7F7F8] border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="relative w-16 h-16 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8 text-[#FF6B00]"
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
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center border-2 border-white">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B00] mb-1">
                  Verified by Rivinity
                </p>
                <p className="text-xl font-bold text-[#1A1A1A] leading-tight">
                  Official Builder Certification
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Trusted By Section */}
        <div className="py-8 sm:py-12 border-b border-[#E5E7EB] bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-[#6B7280] text-xs font-bold uppercase tracking-widest mb-6">
              Trusted by teams at
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 opacity-60">
              <span className="text-base sm:text-xl font-extrabold text-[#1A1A1A]">
                Microsoft
              </span>
              <span className="text-base sm:text-xl font-extrabold text-[#1A1A1A]">
                Google
              </span>
              <span className="text-base sm:text-xl font-extrabold text-[#1A1A1A]">
                Adobe
              </span>
              <span className="text-base sm:text-xl font-extrabold text-[#1A1A1A]">
                Atlassian
              </span>
            </div>
          </div>
        </div>

        {/* Proficiency Levels Section */}
        <section id="proficiency-levels" className="section py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-3 tracking-tight">
                The 5 proficiency levels.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Showcase your growth and expertise within the Rivinity ecosystem
                with an officially recognized proficiency level.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {proficiencyLevels.map((level) => (
                <div
                  key={level.level}
                  className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-[#FF6B00]/40 transition-all hover:-translate-y-1 text-left"
                >
                  <div>
                    <span className="inline-block bg-[#FF6B00] text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full mb-4">
                      LEVEL {level.level}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-4">
                      {level.title}
                    </h3>
                    <ul className="space-y-3 text-xs text-[#6B7280] leading-relaxed text-left p-0 m-0">
                      {level.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-left">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] shrink-0 mt-1.5" />
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section py-12 sm:py-20 bg-[#F7F7F8] border-y border-[#E5E7EB]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 text-left">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] leading-tight mb-4">
                  Certified in three simple steps.
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-6">
                  Getting your Rivinity certification is simple and automatic.
                </p>
                <p className="text-[11px] italic text-[#6B7280]">
                  * Please note that an active Rivinity subscription is required
                  to qualify for certification.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="relative border-l-2 border-[#E5E7EB] pl-6 space-y-10 text-left">
                  {steps.map((step) => (
                    <div key={step.number} className="relative">
                      {/* Clean solid orange dot marker */}
                      <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FF6B00] border-2 border-[#F7F7F8]" />
                      <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 text-left"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-gray-50 border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center shadow-xs">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
                Ready to get certified?
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#6B7280] max-w-xl mb-8 leading-relaxed">
                Sign in with your Rivinity account to fetch your certification level
                and add it to your professional profile.
              </p>
              <Link
                href="/certifications/start"
                className="rounded-2xl bg-[#FF6B00] px-8 py-4 text-sm font-bold text-white shadow-xs hover:bg-[#FF6B00]/90 active:scale-95 transition-all flex items-center gap-2"
              >
                Get My Certification
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}