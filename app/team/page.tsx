"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Engineering" | "Design" | "Product";
  initials: string;
  bio: string;
  location: string;
  focus: string;
  skills: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Founder & CEO",
    department: "Leadership",
    initials: "AR",
    location: "San Francisco, CA",
    focus: "AI Infrastructure & Long-term Strategy",
    bio: "Passionate about democratizing AI infrastructure and empowering the next billion software creators.",
    skills: ["AI Strategy", "Distributed Systems", "Ecosystem Architecture"],
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Co-Founder & Head of Design",
    department: "Design",
    initials: "SC",
    location: "Tokyo, Japan",
    focus: "Developer Experience & Spatial Interfaces",
    bio: "Obsessed with intuitive user experiences, minimal interfaces, and human-centric developer tools.",
    skills: ["UI/UX Systems", "Design Tokens", "Interaction Dynamics"],
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: "david-miller",
    name: "David Miller",
    role: "Chief Technology Officer",
    department: "Engineering",
    initials: "DM",
    location: "Berlin, Germany",
    focus: "Ultra Low-Latency Inference Runtimes",
    bio: "Systems architect specializing in distributed LLM orchestration, agentic runtimes, and low-latency inference.",
    skills: ["Rust", "GPU Kernels", "Distributed LLMs", "C++"],
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "VP of Product",
    department: "Product",
    initials: "ER",
    location: "London, UK",
    focus: "Agent Developer Tooling & SDK Rollout",
    bio: "Connecting cutting-edge AI research with real-world developer workflows and product execution.",
    skills: ["Product Roadmap", "Developer APIs", "Growth Metrics"],
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "VP of Engineering",
    department: "Engineering",
    initials: "MV",
    location: "Austin, TX",
    focus: "Multi-Region Cloud Reliability",
    bio: "Scaling high-availability infrastructure, multi-cloud deployments, and developer tooling pipelines.",
    skills: ["Kubernetes", "Observability", "DevOps Pipelines", "Go"],
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: "aria-sharma",
    name: "Aria Sharma",
    role: "Lead AI Researcher",
    department: "Engineering",
    initials: "AS",
    location: "Bengaluru, India",
    focus: "Grounding Guardrails & Autonomous Tool Calling",
    bio: "Focusing on grounding tool calls, safety guardrails, and contextual memory for autonomous agents.",
    skills: ["PyTorch", "Safety Guardrails", "Contextual Memory"],
    socials: { twitter: "#", github: "#" },
  },
];

const departments = ["All", "Leadership", "Engineering", "Design", "Product"] as const;

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<(typeof departments)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchDept = activeTab === "All" || m.department === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q));
      return matchDept && matchSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-white text-[#1A1A1A] flex flex-col justify-between">
      <Header />

      <main className="w-full pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
              The minds behind <span className="text-[#FF6B00]">Rivinity</span>
            </h1>

            <p className="mt-4 text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              We are a global team of researchers, engineers, and designers building the future of intelligent AI infrastructure and autonomous agent workflows.
            </p>
          </div>

          {/* 2. Search & Department Filters Toolbar */}
          <div className="bg-gray-50/90 border border-gray-200 rounded-2xl p-3 mb-10 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, role, or stack..."
                className="w-full pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Department Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
              {departments.map((dept) => {
                const count =
                  dept === "All"
                    ? teamMembers.length
                    : teamMembers.filter((m) => m.department === dept).length;
                const isActive = activeTab === dept;

                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setActiveTab(dept)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#FF6B00] text-white shadow-xs"
                        : "bg-white text-[#6B7280] border border-gray-200 hover:bg-gray-100 hover:text-[#1A1A1A]"
                    }`}
                  >
                    <span>{dept}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                        isActive ? "bg-black/20 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Team Cards Grid */}
          <div className="mb-16">
            {filteredMembers.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  filteredMembers.length === 1
                    ? "grid-cols-1 max-w-sm mx-auto"
                    : filteredMembers.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="group bg-white border border-gray-200 hover:border-[#FF6B00]/40 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer min-h-[340px]"
                  >
                    <div>
                      {/* Avatar & Department Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative">
                          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8C42] flex items-center justify-center font-bold text-lg text-white shadow-xs group-hover:scale-105 transition-transform">
                            {member.initials}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                          </span>
                        </div>

                        <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
                          {member.department}
                        </span>
                      </div>

                      {/* Member Info */}
                      <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#FF6B00] transition-colors leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mt-0.5 mb-3">
                        {member.role}
                      </p>

                      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3 mb-4">
                        {member.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom Links */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-gray-400">
                        {member.socials.twitter && (
                          <a
                            href={member.socials.twitter}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s Twitter`}
                            className="hover:text-[#FF6B00] transition-colors p-1"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s LinkedIn`}
                            className="hover:text-[#FF6B00] transition-colors p-1"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                          </a>
                        )}
                        {member.socials.github && (
                          <a
                            href={member.socials.github}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s GitHub`}
                            className="hover:text-[#FF6B00] transition-colors p-1"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                            </svg>
                          </a>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-[#6B7280] group-hover:text-[#FF6B00] flex items-center gap-1 transition-colors">
                        Details
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-2xl">
                <p className="text-sm font-semibold text-[#1A1A1A]">No team members match your filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("All");
                    setSearchQuery("");
                  }}
                  className="mt-2 text-xs text-[#FF6B00] font-semibold hover:underline cursor-pointer"
                >
                  Reset search
                </button>
              </div>
            )}
          </div>

          {/* 4. Perfectly Spaced CTA Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
              Want to build the future with us?
            </h2>
            <p className="text-sm text-[#6B7280] max-w-xl mx-auto mb-6 leading-relaxed">
              We are always looking for curious researchers, developers, and designers to join our mission.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-xs hover:bg-[#e66000] hover:shadow-md transition-all cursor-pointer"
            >
              <span>View open positions</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>

        {/* 5. Detail Modal */}
        {selectedMember && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setSelectedMember(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-2xl text-[#1A1A1A]"
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8C42] flex items-center justify-center font-bold text-xl text-white shadow-xs">
                  {selectedMember.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{selectedMember.name}</h3>
                  <p className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mt-0.5">
                    {selectedMember.role}
                  </p>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {selectedMember.location}
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 rounded-xl bg-orange-50/60 border border-orange-200/60 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                <span className="font-semibold text-[#1A1A1A]">Focus:</span>
                <span className="text-[#6B7280]">{selectedMember.focus}</span>
              </div>

              <p className="text-xs text-[#4B5563] leading-relaxed mb-4">{selectedMember.bio}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedMember.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md border border-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}