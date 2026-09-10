"use client";

import React, { useState } from "react";
import { Mail, Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/sections/cta-section";

/* =========================================================
   TYPES & DATA MODELS
========================================================= */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Engineering" | "Design" | "Product" | "Research";
  initials: string;
  location: string;
  badge: string;
  bio: string;
  skills: string[];
  bannerGradient: string;
  avatarBg: string;
  badgeDot: string;
  roleColor: string;
  accentBorder: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
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
    badge: "Founder",
    bio: "Passionate about democratizing AI infrastructure and empowering the next billion software creators through autonomous agent workflows.",
    skills: ["AI Strategy", "Distributed Systems", "Ecosystem Architecture"],
    bannerGradient: "from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]",
    avatarBg: "from-[#FB923C] to-[#EA580C]",
    badgeDot: "bg-orange-500",
    roleColor: "text-orange-600",
    accentBorder: "hover:border-orange-300",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "alex@rivinity.com",
    },
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Co-Founder & Head of Design",
    department: "Design",
    initials: "SC",
    location: "Tokyo, Japan",
    badge: "Design Lead",
    bio: "Obsessed with intuitive developer experiences, clean user-centered design systems, and friction-free agent interaction models.",
    skills: ["UI/UX Systems", "Design Tokens", "Interaction Dynamics"],
    bannerGradient: "from-[#FDF2F8] via-[#FCE7F3] to-[#FBCFE8]",
    avatarBg: "from-[#F472B6] to-[#DB2777]",
    badgeDot: "bg-pink-500",
    roleColor: "text-pink-600",
    accentBorder: "hover:border-pink-300",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      email: "sarah@rivinity.com",
    },
  },
  {
    id: "david-miller",
    name: "David Miller",
    role: "Chief Technology Officer",
    department: "Engineering",
    initials: "DM",
    location: "Berlin, Germany",
    badge: "Core Systems",
    bio: "Systems architect specializing in distributed LLM orchestration, speculative decoding, and sub-millisecond execution harnesses.",
    skills: ["Rust", "GPU Kernels", "Distributed LLMs", "C++"],
    bannerGradient: "from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]",
    avatarBg: "from-[#C084FC] to-[#9333EA]",
    badgeDot: "bg-purple-600",
    roleColor: "text-purple-600",
    accentBorder: "hover:border-purple-300",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "david@rivinity.com",
    },
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "VP of Product",
    department: "Product",
    initials: "ER",
    location: "London, UK",
    badge: "Product Lead",
    bio: "Connecting cutting-edge AI research with real-world enterprise developer workflows, API ergonomics, and rapid deployment cycles.",
    skills: ["Product Strategy", "Developer APIs", "Growth Metrics"],
    bannerGradient: "from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]",
    avatarBg: "from-[#38BDF8] to-[#0284C7]",
    badgeDot: "bg-sky-500",
    roleColor: "text-sky-600",
    accentBorder: "hover:border-sky-300",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      email: "elena@rivinity.com",
    },
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "VP of Engineering",
    department: "Engineering",
    initials: "MV",
    location: "Austin, TX",
    badge: "Infrastructure",
    bio: "Scaling zero-downtime high-availability infrastructure, single-tenant VPCs, and automated policy verification gateways.",
    skills: ["Kubernetes", "Observability", "DevOps Pipelines", "Go"],
    bannerGradient: "from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0]",
    avatarBg: "from-[#4ADE80] to-[#16A34A]",
    badgeDot: "bg-emerald-500",
    roleColor: "text-emerald-600",
    accentBorder: "hover:border-emerald-300",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "marcus@rivinity.com",
    },
  },
  {
    id: "aria-sharma",
    name: "Dr. Aria Sharma",
    role: "Lead AI Researcher",
    department: "Research",
    initials: "AS",
    location: "Bengaluru, India",
    badge: "AI Labs",
    bio: "Focusing on grounding LLM tool calls, formal policy verification, and contextual memory compression for long-horizon agents.",
    skills: ["PyTorch", "Safety Guardrails", "Context Memory"],
    bannerGradient: "from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]",
    avatarBg: "from-[#FB923C] to-[#EA580C]",
    badgeDot: "bg-orange-500",
    roleColor: "text-orange-600",
    accentBorder: "hover:border-orange-300",
    socials: {
      twitter: "https://x.com",
      github: "https://github.com",
      email: "aria@rivinity.com",
    },
  },
  {
    id: "leo-nakamura",
    name: "Leo Nakamura",
    role: "Staff Kernel Engineer",
    department: "Engineering",
    initials: "LN",
    location: "Seattle, WA",
    badge: "Performance",
    bio: "Optimizing low-level CUDA kernels and WebAssembly sandboxes for deterministic high-throughput model serving.",
    skills: ["CUDA", "WebAssembly", "TensorRT", "C++20"],
    bannerGradient: "from-[#FDF2F8] via-[#FCE7F3] to-[#FBCFE8]",
    avatarBg: "from-[#F472B6] to-[#DB2777]",
    badgeDot: "bg-pink-500",
    roleColor: "text-pink-600",
    accentBorder: "hover:border-pink-300",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "leo@rivinity.com",
    },
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    role: "Head of AI Security",
    department: "Research",
    initials: "MP",
    location: "New York, NY",
    badge: "Security Lead",
    bio: "Leading research on adversarial prompt injection defenses, multi-modal forensics, and cryptographic model provenance.",
    skills: ["Threat Modeling", "Steganography", "SOC 2 Type II"],
    bannerGradient: "from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]",
    avatarBg: "from-[#C084FC] to-[#9333EA]",
    badgeDot: "bg-purple-600",
    roleColor: "text-purple-600",
    accentBorder: "hover:border-purple-300",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      email: "maya@rivinity.com",
    },
  },
];

interface EditorialBlock {
  eyebrow: string;
  body: string;
  bullets: string[];
  reverse?: boolean;
}

const editorialBlocks: EditorialBlock[] = [
  {
    eyebrow: "What we're building",
    body: "We're creating an AI platform that eliminates barriers between idea and deployment by creating:",
    bullets: [
      "Intuitive tools that make software creation feel completely natural",
      "An AI Agent that handles complex infrastructure and architecture automatically",
    ],
    reverse: false,
  },
  {
    eyebrow: "What inspires us",
    body: "We focus on inspiring creativity, generating value for builders, and fostering a community where:",
    bullets: [
      "Software creation is as accessible as typing a prompt",
      "Complex ideas become live production apps through conversation",
    ],
    reverse: true,
  },
  {
    eyebrow: "What drives us",
    body: "Our success is measured by:",
    bullets: [
      "Empowering millions of new creators to build software",
      "Democratizing advanced AI infrastructure for everyone",
    ],
    reverse: false,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AboutPage() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="w-full flex-1 pt-28 sm:pt-36 pb-20">
        {/* ===================================================
            1. HERO SECTION (EXACT AS USER SCREENSHOT)
        =================================================== */}
        <section className="pt-6 sm:pt-10 pb-14 sm:pb-20 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12] max-w-3xl mx-auto">
              Empowering the next generation of software creators
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We believe software creation should be accessible to everyone. Our mission is to make turning an idea into production software as intuitive as writing a sentence.
            </p>
          </div>
        </section>

        {/* ===================================================
            2. EDITORIAL ALTERNATING BLOCKS (EXACT AS SCREENSHOT)
        =================================================== */}
        <section className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
            {editorialBlocks.map((block) => (
              <div
                key={block.eyebrow}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Visual Graphic with Badge */}
                <div
                  className={`w-full aspect-[16/10] rounded-[24px] sm:rounded-[28px] bg-[#f4efe9] border border-black/[0.04] flex items-center justify-center p-6 shadow-2xs ${
                    block.reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="bg-white rounded-full px-6 py-2.5 shadow-sm text-slate-800 text-xs sm:text-sm font-semibold border border-black/5">
                    {block.eyebrow}
                  </div>
                </div>

                {/* Content Text */}
                <div className={`px-2 ${block.reverse ? "lg:order-1" : "lg:order-2"}`}>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">
                    {block.eyebrow}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {block.body}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {block.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            3. MEET OUR TEAM & LEADERSHIP
        =================================================== */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Meet the minds engineering the future of AI
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We are a distributed team of systems architects, AI researchers, and product designers pushing the boundaries of autonomous runtime environments and cryptographic AI safety.
              </p>
            </div>

            {/* 8-Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`group relative bg-white border border-slate-200/80 rounded-[2rem] p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-xl ${member.accentBorder} transition-all duration-300 hover:-translate-y-1.5`}
                >
                  <div>
                    {/* Top Gradient Banner */}
                    <div className="relative w-full h-28 sm:h-32 rounded-[1.5rem] overflow-visible shadow-inner">
                      <div
                        className={`w-full h-full rounded-[1.5rem] bg-gradient-to-br ${member.bannerGradient} relative overflow-hidden`}
                      >
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/30 blur-xl pointer-events-none" />
                        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/40 blur-lg pointer-events-none" />
                      </div>

                      {/* Avatar overlapping banner (Bottom Left) */}
                      <div className="absolute -bottom-6 left-3.5 sm:left-4 z-10">
                        <div className="relative">
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${member.avatarBg} border-[3.5px] border-white shadow-md flex items-center justify-center font-bold text-base sm:text-lg text-white group-hover:scale-105 transition-transform duration-200`}
                          >
                            {member.initials}
                          </div>

                          {/* Active Status Beacon */}
                          <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
                          </span>
                        </div>
                      </div>

                      {/* Floating Platform / Badge Pill (Bottom Right) */}
                      <div className="absolute -bottom-3 right-3 sm:right-3.5 z-10">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-2xs">
                          <span className={`h-1.5 w-1.5 rounded-full ${member.badgeDot}`} />
                          <span>{member.badge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Member Identity & Description */}
                    <div className="mt-8 px-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-tight">
                          {member.name}
                        </h3>
                      </div>

                      <p className={`text-xs font-semibold ${member.roleColor} mt-0.5 mb-2`}>
                        {member.role}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {member.bio}
                      </p>

                      {/* Skills / Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] sm:text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer: Direct Socials & Contact */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-1.5">
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s LinkedIn`}
                          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <svg
                            className="w-3.5 h-3.5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                          </svg>
                        </a>
                      )}

                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s X (Twitter)`}
                          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <svg
                            className="w-3.5 h-3.5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}

                      {member.socials.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s GitHub`}
                          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <svg
                            className="w-3.5 h-3.5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {member.socials.email && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyEmail(member.socials.email!, member.id)
                        }
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        {copiedEmail === member.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Mail className="h-3 w-3 text-[#FF6B00]" />
                            <span>Contact</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-footer CTA */}
        <CtaSection
          title="Discover the mission and people behind Rivinity"
          description="Learn about our founding principles, our engineering culture, and our commitment to building open, verifiable, and safe AI systems for the world."
          buttonText="Explore Our Principles"
          buttonHref="#vision"
          secondaryText="Read Company Blog"
          secondaryHref="/blog"
        />
      </main>

      <Footer />
    </div>
  );
}