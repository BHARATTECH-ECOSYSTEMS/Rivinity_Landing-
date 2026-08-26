"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  category: "Agent Architecture" | "Steganography & Security" | "LLM Optimization" | "Computer Vision";
  date: string;
  authors: string[];
  pdfUrl: string;
  arxivUrl?: string;
  featured?: boolean;
}

const PAPERS: ResearchPaper[] = [
  {
    id: "hybridlocnet-2026",
    title: "HybridLocNet: Dual-Stream Spatial Localization and Payload Estimation in Steganography Detection",
    abstract:
      "We introduce HybridLocNet, a novel dual-stream deep network combining SRM residual streams and high-capacity CNN features to perform pixel-level spatial localization and embedding rate estimation under adaptive steganographic algorithms.",
    category: "Steganography & Security",
    date: "February 2026",
    authors: ["R. Sharma", "A. Rivera", "D. Miller"],
    pdfUrl: "#",
    arxivUrl: "#",
    featured: true,
  },
  {
    id: "agent-runtime-v2",
    title: "Deterministic Execution Paths in Multi-Agent Autonomous Runtimes",
    abstract:
      "A framework for enforcing formal state verification and low-latency tool calling across decentralized LLM agent clusters, reducing execution failure rates by 38% under high concurrency.",
    category: "Agent Architecture",
    date: "January 2026",
    authors: ["D. Miller", "E. Rostova", "K. Tanaka"],
    pdfUrl: "#",
    arxivUrl: "#",
    featured: true,
  },
  {
    id: "sub-quadratic-attention",
    title: "Sub-Quadratic Context Memory for Long-Horizon Reasoning",
    abstract:
      "An evaluation of dynamic memory compression techniques designed to maintain context fidelity across 1M+ token context windows without increasing inference latency.",
    category: "LLM Optimization",
    date: "November 2025",
    authors: ["A. Sharma", "P. Chen"],
    pdfUrl: "#",
  },
  {
    id: "deepfake-forensics",
    title: "Real-Time Spatial-Temporal Forgery Detection in Streaming Video",
    abstract:
      "A lightweight forensic vision model capable of detecting spatial manipulation and audio-visual asynchronous deepfakes in live video feeds with sub-50ms glass-to-glass latency.",
    category: "Computer Vision",
    date: "September 2025",
    authors: ["S. Chen", "R. Sharma"],
    pdfUrl: "#",
    arxivUrl: "#",
  },
  {
    id: "zero-trust-llm",
    title: "Zero-Trust Guardrails for Autonomous Tool Execution",
    abstract:
      "Proposing an isolated execution sandbox architecture for LLM tool calling that prevents prompt injection attacks from compromising underlying cloud infrastructure.",
    category: "Steganography & Security",
    date: "August 2025",
    authors: ["M. Vance", "A. Rivera"],
    pdfUrl: "#",
  },
];

const CATEGORIES = [
  "All",
  "Agent Architecture",
  "Steganography & Security",
  "LLM Optimization",
  "Computer Vision",
];

export default function ResearchPapersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPapers = PAPERS.filter((p) => p.featured);
  
  const filteredPapers = PAPERS.filter((paper) => {
    const matchesCategory =
      selectedCategory === "All" || paper.category === selectedCategory;
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <Head>
        <title>Research & Papers — Rivinity AI</title>
      </Head>
      <main className="min-h-screen pt-24 bg-[var(--color-bg-primary,#ffffff)]">
        
        {/* Hero Section */}
        <section className="section-sm py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl w-full max-w-none text-center">
                Advancing the frontiers of <span className="text-[#FF6B00]">AI & Security</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                Explore whitepapers, technical reports, and peer-reviewed research from our team on agent runtimes, model security, and computer vision.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Research Spotlight */}
        {featuredPapers.length > 0 && (
          <section className="section py-12 md:py-16">
            <div className="container">
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                  Featured Publications
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {featuredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white border border-[#E5E7EB] rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:border-[#FF6B00]/40 transition-all hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full">
                          {paper.category}
                        </span>
                        <span className="text-xs text-[#6B7280]">{paper.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 leading-snug">
                        {paper.title}
                      </h3>

                      <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                        {paper.abstract}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A] mb-6">
                        Authors: <span className="text-[#6B7280] font-normal">{paper.authors.join(", ")}</span>
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E7EB]">
                        <a
                          href={paper.pdfUrl}
                          className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs hover:bg-[#e66000] transition"
                        >
                          <Download size={14} />
                          Download PDF
                        </a>
                        {paper.arxivUrl && (
                          <a
                            href={paper.arxivUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:text-[#FF6B00] transition"
                          >
                            <span>arXiv</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Papers Repository Section */}
        <section className="section-lg py-12 pb-24">
          <div className="container">
            {/* Filter and Search Bar */}
            <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-4 md:p-6 mb-12 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Category Pills */}
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

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search papers or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] shadow-xs transition"
                  />
                </div>
              </div>
            </div>

            {/* Papers List */}
            <div className="max-w-6xl mx-auto space-y-6">
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:border-[#FF6B00]/40 transition-all"
                  >
                    <div className="max-w-3xl space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider">
                          {paper.category}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-[#6B7280]">{paper.date}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1A1A1A]">
                        {paper.title}
                      </h3>

                      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                        {paper.abstract}
                      </p>

                      <p className="text-xs text-[#1A1A1A] pt-1">
                        <span className="font-semibold">Authors:</span> {paper.authors.join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={paper.pdfUrl}
                        className="inline-flex items-center gap-2 bg-[#F7F7F8] border border-[#E5E7EB] text-[#1A1A1A] px-4 py-2 rounded-xl text-xs font-semibold hover:border-[#FF6B00] hover:text-[#FF6B00] transition"
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-[#F7F7F8] rounded-2xl border border-[#E5E7EB]">
                  <FileText size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-sm font-semibold text-[#1A1A1A]">No research papers found</p>
                  <p className="text-xs text-[#6B7280] mt-1">Try adjusting your search query or filter category.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Collaborative Research Banner */}
        <section className="section-sm py-16 bg-[#F7F7F8] border-t border-[#E5E7EB]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h3 className="text-2xl font-bold text-[#1A1A1A]">
                Interested in academic collaboration?
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                We partner with university research labs and open-source AI initiatives. Contact our research team to discuss joint grants, paper submissions, or compute sponsorship.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-full text-xs font-semibold shadow-xs hover:bg-[#e66000] transition"
                >
                  Contact Research Team
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}