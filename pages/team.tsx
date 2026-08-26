"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

interface TeamMember {
  name: string;
  role: string;
  department: "Leadership" | "Engineering" | "Design" | "Product";
  initials: string;
  bio: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    department: "Leadership",
    initials: "AR",
    bio: "Passionate about democratizing AI infrastructure and empowering the next billion software creators.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Sarah Chen",
    role: "Co-Founder & Head of Design",
    department: "Design",
    initials: "SC",
    bio: "Obsessed with intuitive user experiences, minimal interfaces, and human-centric developer tools.",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    name: "David Miller",
    role: "Chief Technology Officer",
    department: "Engineering",
    initials: "DM",
    bio: "Systems architect specializing in distributed LLM orchestration, agentic runtimes, and low-latency inference.",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Elena Rostova",
    role: "VP of Product",
    department: "Product",
    initials: "ER",
    bio: "Connecting cutting-edge AI research with real-world developer workflows and product execution.",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Marcus Vance",
    role: "VP of Engineering",
    department: "Engineering",
    initials: "MV",
    bio: "Scaling high-availability infrastructure, multi-cloud deployments, and developer tooling pipelines.",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Aria Sharma",
    role: "Lead AI Researcher",
    department: "Engineering",
    initials: "AS",
    bio: "Focusing on grounding tool calls, safety guardrails, and contextual memory for autonomous agents.",
    socials: { twitter: "#", github: "#" },
  },
];

const departments = ["All", "Leadership", "Engineering", "Design", "Product"];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredMembers =
    activeTab === "All"
      ? teamMembers
      : teamMembers.filter((m) => m.department === activeTab);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-[var(--color-bg-primary,#ffffff)]">
        {/* Hero Section */}
        <section className="section-sm py-16 md:py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl w-full max-w-none">
                The minds behind <span className="text-[#FF6B00]">Rivinity</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                We are a global team of researchers, engineers, and designers building the future of intelligent AI infrastructure and autonomous agent workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Tabs & Team Grid */}
        <section className="section pb-20">
          <div className="container">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveTab(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                    activeTab === dept
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : "bg-gray-100 text-[#6B7280] hover:bg-gray-200 hover:text-[#1A1A1A]"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Responsive Flex Grid (Centered Alignment) */}
            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
              {filteredMembers.map((member) => (
                <div
                  key={member.name}
                  className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-sm bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center text-center shadow-xs hover:border-[#FF6B00]/40 transition-all hover:-translate-y-1"
                >
                  {/* Initial Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C42] flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-3xl font-bold text-white tracking-wide">
                      {member.initials}
                    </span>
                  </div>

                  {/* Member Details */}
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-6 flex-1">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-4 text-[#6B7280]">
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        aria-label={`${member.name}'s Twitter`}
                        className="hover:text-[#FF6B00] transition-colors"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        aria-label={`${member.name}'s LinkedIn`}
                        className="hover:text-[#FF6B00] transition-colors"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        aria-label={`${member.name}'s GitHub`}
                        className="hover:text-[#FF6B00] transition-colors"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="section py-20 bg-[#F7F7F8] border-t border-[#E5E7EB]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#1A1A1A] sm:text-4xl w-full max-w-none mb-4">
                Want to build the future with us?
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed mb-8">
                We are always looking for curious, ambitious researchers, developers, and designers to join our mission.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-xs hover:bg-[#e66000] transition-all"
              >
                View open positions
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}