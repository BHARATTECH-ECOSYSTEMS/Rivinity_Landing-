"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  Video,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  Code2,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modules: number;
  category: "Agent Systems" | "AI Security" | "Cloud Infrastructure";
  icon: any;
  featured?: boolean;
}

const COURSES: Course[] = [
  {
    id: "agent-architecture-101",
    title: "Building Production Autonomous Agents",
    description:
      "Master tool calling, state persistence, memory compression, and deterministic execution paths in modern agentic runtimes.",
    level: "Intermediate",
    duration: "4 Hours",
    modules: 6,
    category: "Agent Systems",
    icon: Cpu,
    featured: true,
  },
  {
    id: "steg-detection-security",
    title: "AI Security & Steganography Fundamentals",
    description:
      "Understand spatial payload localization, residual stream analysis, and prompt injection defense mechanisms for enterprise LLMs.",
    level: "Advanced",
    duration: "6 Hours",
    modules: 8,
    category: "AI Security",
    icon: ShieldCheck,
    featured: true,
  },
  {
    id: "rag-vector-engineering",
    title: "Enterprise RAG & Vector Search at Scale",
    description:
      "Design low-latency vector indexing pipelines, chunking strategies, and hybrid semantic retrieval architectures.",
    level: "Intermediate",
    duration: "3.5 Hours",
    modules: 5,
    category: "Cloud Infrastructure",
    icon: Code2,
  },
  {
    id: "zero-trust-ai",
    title: "Zero-Trust LLM Governance & Compliance",
    description:
      "Implement SOC 2, GDPR, and EU AI Act compliant guardrails for automated AI tool execution in regulated industries.",
    level: "Beginner",
    duration: "2 Hours",
    modules: 4,
    category: "AI Security",
    icon: Award,
  },
];

const CATEGORIES = ["All", "Agent Systems", "AI Security", "Cloud Infrastructure"];

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <Head>
        <title>Rivinity Academy — Master AI Engineering</title>
      </Head>
      <main className="min-h-screen pt-24 bg-[var(--color-bg-primary,#ffffff)]">
        {/* Hero Section */}
        <section className="section-sm py-16 md:py-24 border-b border-[#E5E7EB] bg-[#F7F7F8]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl w-full max-w-none text-center">
                Master the art of <span className="text-[#FF6B00]">AI Systems Engineering</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                Free hands-on courses, certification tracks, and technical tutorials built for developers, AI researchers, and security architects.
              </p>
            </div>

            {/* Platform Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center shadow-xs">
                <p className="text-2xl font-extrabold text-[#FF6B00]">12+</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Free Interactive Tracks</p>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center shadow-xs">
                <p className="text-2xl font-extrabold text-[#1A1A1A]">100%</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Self-Paced & Open</p>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center shadow-xs">
                <p className="text-2xl font-extrabold text-[#FF6B00]">Verified</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Developer Badges</p>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center shadow-xs">
                <p className="text-2xl font-extrabold text-[#1A1A1A]">SDKs</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Real Code Labs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Course Spotlight */}
        <section className="section py-16">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles size={18} className="text-[#FF6B00]" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                Featured Learning Tracks
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {COURSES.filter((c) => c.featured).map((course) => {
                const IconComp = course.icon;
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-[#E5E7EB] rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:border-[#FF6B00]/40 transition-all hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                          <IconComp size={24} />
                        </div>
                        <span className="text-xs font-semibold text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                        {course.title}
                      </h3>

                      <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-6 text-xs text-[#6B7280] mb-6 pt-4 border-t border-[#E5E7EB]">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Video size={14} />
                          {course.modules} Modules
                        </span>
                      </div>

                      <Link
                        href={`/academy/${course.id}`}
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#FF6B00] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#e66000] transition"
                      >
                        Start Learning Track
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Courses & Filter Section */}
        <section className="section-lg pb-24 border-t border-[#E5E7EB]">
          <div className="container">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-[#1A1A1A]">Explore All Courses</h2>
              <p className="text-sm text-[#6B7280] mt-2">Filter courses by technical domain or search specific topics.</p>
            </div>

            {/* Filter & Search Controls */}
            <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-4 md:p-6 mb-12 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-[#FF6B00] text-white shadow-xs"
                          : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-gray-100 hover:text-[#1A1A1A]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search academy topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] shadow-xs transition"
                  />
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredCourses.map((course) => {
                const IconComp = course.icon;
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#FF6B00]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                          <IconComp size={20} />
                        </div>
                        <span className="text-[11px] font-semibold text-[#6B7280] bg-gray-100 px-2.5 py-1 rounded-full">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280] pt-4 border-t border-[#E5E7EB] mb-4">
                        <span>{course.duration}</span>
                        <span>{course.modules} Modules</span>
                      </div>

                      <Link
                        href={`/academy/${course.id}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full bg-[#F7F7F8] border border-[#E5E7EB] text-[#1A1A1A] py-2.5 rounded-xl text-xs font-semibold hover:border-[#FF6B00] hover:text-[#FF6B00] transition"
                      >
                        Enroll Free
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certificate CTA */}
        <section className="section-sm py-16 bg-[#F7F7F8] border-t border-[#E5E7EB]">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-1 block">
                  Earn Recognition
                </span>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">
                  Get Certified as an AI Systems Architect
                </h3>
                <p className="text-sm text-[#6B7280] mt-2 max-w-xl">
                  Complete the core learning track, pass the practical SDK assessment, and share your verified credential on LinkedIn.
                </p>
              </div>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#e66000] transition whitespace-nowrap shrink-0"
              >
                Start Certification
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