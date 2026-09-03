"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Check,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    bannerGradient: "from-[#FFB703] via-[#FF6B00] to-[#E85D9E]",
    avatarBg: "from-[#1A1A1A] to-[#2D3748]",
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
    bannerGradient: "from-[#FF8C42] via-[#E85D9E] to-[#9D4EDD]",
    avatarBg: "from-[#2A1B3D] to-[#44318D]",
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
    bannerGradient: "from-[#4361EE] via-[#4CC9F0] to-[#7209B7]",
    avatarBg: "from-[#03045E] to-[#023E8A]",
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
    bannerGradient: "from-[#FB8500] via-[#FFB703] to-[#023047]",
    avatarBg: "from-[#14213D] to-[#000000]",
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
    bannerGradient: "from-[#06D6A0] via-[#118AB2] to-[#073B4C]",
    avatarBg: "from-[#0F4C5C] to-[#1D3557]",
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
    bannerGradient: "from-[#F72585] via-[#7209B7] to-[#3A0CA3]",
    avatarBg: "from-[#3F37C9] to-[#4895EF]",
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
    bannerGradient: "from-[#FF6B00] via-[#FF8C42] to-[#FFD166]",
    avatarBg: "from-[#2B2D42] to-[#1A1A1A]",
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
    bannerGradient: "from-[#7209B7] via-[#F72585] to-[#FFB703]",
    avatarBg: "from-[#1F2421] to-[#363537]",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      email: "maya@rivinity.com",
    },
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TeamPage() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div
      className="w-full min-h-screen bg-[#F7F7F8] text-[#1A1A1A] flex flex-col justify-between"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Header />

      <main className="w-full flex-1 pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===================================================
              1. HERO SECTION
          =================================================== */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-[1.1]">
              The minds engineering the{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C42] to-[#E85D9E] bg-clip-text text-transparent">
                future of AI.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              We are a distributed team of researchers, systems architects, and product designers pushing the boundaries of autonomous agent runtimes and cryptographic AI security.
            </p>
          </div>

          {/* ===================================================
              2. MODERN TEAM CARDS GRID (WITH DIRECT SOCIALS)
          =================================================== */}
          <div className="mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="group relative bg-white border border-[#E5E7EB] rounded-[2rem] p-4 sm:p-5 flex flex-col justify-between shadow-[0_15px_35px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-20px_rgba(255,107,0,0.18)] hover:border-[#FFD9BF] transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div>
                      {/* =====================================
                          Top Gradient Banner
                      ===================================== */}
                      <div className="relative w-full h-28 sm:h-32 rounded-[1.5rem] overflow-visible shadow-inner">
                        {/* Background Gradient Mesh */}
                        <div
                          className={`w-full h-full rounded-[1.5rem] bg-gradient-to-br ${member.bannerGradient} relative overflow-hidden`}
                        >
                          {/* Organic Decorative Shapes */}
                          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20 blur-xl pointer-events-none" />
                          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-black/10 blur-lg pointer-events-none" />
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
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#E5E7EB] px-3 py-1 text-[11px] font-semibold text-[#1A1A1A] shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                            <span>{member.badge}</span>
                          </div>
                        </div>
                      </div>

                      {/* =====================================
                          Member Identity & Description
                      ===================================== */}
                      <div className="mt-8 px-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#FF6B00] transition-colors leading-tight">
                            {member.name}
                          </h3>
                        </div>

                        <p className="text-xs font-semibold text-[#FF6B00] mt-0.5 mb-2">
                          {member.role}
                        </p>

                        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3 mb-4">
                          {member.bio}
                        </p>

                        {/* Skills / Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {member.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] sm:text-[11px] font-medium bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB] px-2 py-0.5 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* =====================================
                        Card Actions Footer: Direct Socials & Contact
                    ===================================== */}
                    <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between gap-2 mt-auto">
                      {/* Direct Social Links (LinkedIn, X, GitHub) */}
                      <div className="flex items-center gap-1.5">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s LinkedIn`}
                            className="p-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
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
                            className="p-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
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
                            className="p-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
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

                      {/* Direct Email / Get in Touch Action */}
                      {member.socials.email && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyEmail(member.socials.email!, member.id)
                          }
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#333333] transition-all active:scale-[0.98] cursor-pointer"
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

          {/* ===================================================
              4. RECRUITMENT CTA BANNER
          =================================================== */}
          <div className="bg-white border border-[#E5E7EB] rounded-[2.5rem] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-2xl bg-[#FF6B00]"
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD9BF] bg-[#FFF4EC] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                JOIN OUR GLOBAL LABS
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-3">
                Want to build next-generation AI with us?
              </h2>

              <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto mb-7 leading-relaxed">
                We are always hiring world-class research scientists, compiler engineers, and frontend systems creators to build scalable AI infrastructure.
              </p>

              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:bg-[#E55F00] transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Open Roles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}