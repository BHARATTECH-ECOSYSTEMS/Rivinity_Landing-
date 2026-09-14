"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

/* ==========================================================================
   DATA STRUCTURES & PUBLICATIONS DATASET (Monochrome Scientific Edition)
   ========================================================================== */

interface Publication {
  id: string;
  index: string;
  tag: string;
  type: "Publication" | "Conclusion" | "Milestone" | "Release";
  category:
    | "Inference Optimization"
    | "Alignment & Evals"
    | "Agent Architectures"
    | "Systems & Kernels";
  title: string;
  authors: string;
  published: string;
  venue: string;
  benchmark: string;
  description: string;
  arxivUrl: string;
  bibtex: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: "sub-quadratic-speculative",
    index: "001",
    tag: "Research",
    type: "Publication",
    category: "Inference Optimization",
    title: "Sub-Quadratic Latency in Speculative Agent Drafting",
    authors: "Dr. E. Vance, S. Chen, M. Thorne, D. Miller",
    published: "Nov 2025",
    venue: "NeurIPS 2025 // Oral Presentation",
    benchmark: "+3.4x TTFT Acceleration",
    description:
      "Custom kernel fusion and dynamic draft heads reduce time-to-first-token by 3.4x without score degradation on complex math benchmarks. We introduce speculative tree verification for exact transformer equivalence.",
    arxivUrl: "https://arxiv.org",
    bibtex: `@inproceedings{vance2025subquadratic,
  title={Sub-Quadratic Latency in Speculative Agent Drafting},
  author={Vance, E. and Chen, S. and Thorne, M. and Miller, D.},
  booktitle={Advances in Neural Information Processing Systems (NeurIPS)},
  year={2025}
}`,
  },
  {
    id: "mechanistic-interpretability",
    index: "002",
    tag: "Safety",
    type: "Publication",
    category: "Alignment & Evals",
    title: "Mechanistic Interpretability in Deterministic State Loops",
    authors: "K. Tanaka, J. Reynolds, A. Chen",
    published: "Jan 2026",
    venue: "ICLR 2026 // Spotlight",
    benchmark: "99.2% Hallucination Suppression",
    description:
      "Novel evaluation methodology isolating activation manifolds inside multi-turn tool-calling models, preventing hallucination cascades and guaranteeing invariant adherence across thousands of execution steps.",
    arxivUrl: "https://arxiv.org",
    bibtex: `@inproceedings{tanaka2026mechanistic,
  title={Mechanistic Interpretability in Deterministic State Loops},
  author={Tanaka, K. and Reynolds, J. and Chen, A.},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2026}
}`,
  },
  {
    id: "deterministic-quantization-008",
    index: "003",
    tag: "Systems",
    type: "Release",
    category: "Systems & Kernels",
    title:
      "Deterministic Quantization Schemes for Low-Precision Transformer Runtimes",
    authors: "Dr. E. Vance, A. Chen, R. Patel, S. Miller",
    published: "Oct 2025",
    venue: "arXiv Preprint",
    benchmark: "+12.8% Throughput on H100 Clusters",
    description:
      "Quantization kernels for FP4 and FP8 tensor operations delivering 12.8% sustained throughput gain across disaggregated H100 clusters without perplexity degradation.",
    arxivUrl: "https://arxiv.org",
    bibtex: `@article{vance2025deterministic,
  title={Deterministic Quantization Schemes for Low-Precision Transformer Runtimes},
  author={Vance, E. and Chen, A. and Patel, R. and Miller, S.},
  journal={arXiv preprint arXiv:2510.04892},
  year={2025}
}`,
  },
  {
    id: "context-mesh-pruning",
    index: "004",
    tag: "Research",
    type: "Milestone",
    category: "Agent Architectures",
    title: "Context Mesh Pruning in Long-Horizon Autonomous Execution",
    authors: "S. Chen, M. Thorne, R. Patel",
    published: "Jul 2025",
    venue: "ICML 2025",
    benchmark: "74% Memory Footprint Reduction",
    description:
      "Novel attention routing mechanism reducing KV-cache memory pressure by 74% during multi-agent multi-step tool interactions across complex, long-horizon codebases.",
    arxivUrl: "https://arxiv.org",
    bibtex: `@inproceedings{chen2025contextmesh,
  title={Context Mesh Pruning in Long-Horizon Autonomous Execution},
  author={Chen, S. and Thorne, M. and Patel, R.},
  booktitle={International Conference on Machine Learning (ICML)},
  year={2025}
}`,
  },
  {
    id: "sub-millisecond-adversarial-verification",
    index: "005",
    tag: "Safety",
    type: "Conclusion",
    category: "Alignment & Evals",
    title: "Sub-Millisecond Verification for Adversarial Prompt Injection",
    authors: "J. Reynolds, K. Tanaka, Dr. E. Vance",
    published: "May 2025",
    venue: "IEEE S&P 2025",
    benchmark: "< 0.4ms Verification Overhead",
    description:
      "Formal state-machine boundary verification yielding sub-millisecond intrusion detection with zero false-positive rejections on mission-critical tool-calling agent workflows.",
    arxivUrl: "https://arxiv.org",
    bibtex: `@inproceedings{reynolds2025submillisecond,
  title={Sub-Millisecond Verification for Adversarial Prompt Injection},
  author={Reynolds, J. and Tanaka, K. and Vance, E.},
  booktitle={IEEE Symposium on Security and Privacy},
  year={2025}
}`,
  },
];

/* ==========================================================================
   RESEARCH & PAPERS PAGE (Strict Monochrome Edition)
   ========================================================================== */

export default function ResearchPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (bibtex: string, id: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col justify-between">
      {/* Universal Site Header */}
      <Header />

      {/* Main Research Content (Strict Monochrome Minimalist) */}
      <main className="w-full relative overflow-x-clip bg-white flex-1 pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {/* ================================================================
              SECTION 1: HERO & RESEARCH MISSION
              ================================================================ */}
          <section className="text-center relative pt-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-950 mb-6 leading-tight">
                Advancing Frontier AI Through Rigorous, Open Science.
              </h1>

              {/* Thesis Paragraph */}
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed mb-12">
                Our research lab invents sub-quadratic inference architectures,
                deterministic reasoning runtimes, and verifiable model alignment
                protocols engineered for frontier production scale. We benchmark
                in the open, publish reproducible kernels, and release open
                weights for the global scientific community.
              </p>

              {/* Key Metrics Bar: 4-column data grid with Option 2 #ff8b28 to white gradient & grid */}
              <div className="relative w-full grid grid-cols-2 md:grid-cols-4 border border-[#ff8b28]/20 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center shadow-xs bg-gradient-to-b from-[#ff8b28]/10 via-[#ff8b28]/[0.02] to-white">
                <div className="relative z-1 p-6 sm:p-7 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-950   tracking-tight mb-1">
                    14
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    Peer-Reviewed Publications
                  </span>
                  <span className="text-[11px] text-gray-400   mt-0.5">
                    NeurIPS, ICML, ICLR
                  </span>
                </div>

                <div className="relative z-1 p-6 sm:p-7 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-950   tracking-tight mb-1">
                    18.4M
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    Checkpoint Downloads
                  </span>
                  <span className="text-[11px] text-gray-400   mt-0.5">
                    Hugging Face Hub
                  </span>
                </div>

                <div className="relative z-1 p-6 sm:p-7 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-950   tracking-tight mb-1">
                    100%
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    Open-Weight &amp; Deterministic
                  </span>
                  <span className="text-[11px] text-gray-400   mt-0.5">
                    Public Evals &amp; Code
                  </span>
                </div>

                <div className="relative z-1 p-6 sm:p-7 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-950   tracking-tight mb-1">
                    $2.5M
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    Compute Grants Awarded
                  </span>
                  <span className="text-[11px] text-gray-400   mt-0.5">
                    Academic Collaborators
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 2: FEATURED BREAKTHROUGH PAPERS (Large Bento Row)
              ================================================================ */}
          <section className="scroll-mt-28">
            <div className="flex flex-col mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 mb-2">
                Featured Breakthrough Papers
              </h2>
              <p className="text-sm text-gray-600">
                Flagship architectural contributions presented at leading
                machine learning conferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Sub-Quadratic Latency */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all shadow-xs">
                {/* Decorative Grid Design: Top Right */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-60 rounded-tr-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #D1D5DB 1px, transparent 1px),
                      linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)
                    `,
                    backgroundSize: "14px 14px",
                    maskImage:
                      "radial-gradient(circle at top right, black 35%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at top right, black 35%, transparent 80%)",
                  }}
                />

                {/* Decorative Grid Design: Bottom Right */}
                <div
                  className="absolute bottom-0 right-0 w-32 h-28 pointer-events-none opacity-50 rounded-br-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #D1D5DB 1px, transparent 1px),
                      linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)
                    `,
                    backgroundSize: "14px 14px",
                    maskImage:
                      "radial-gradient(circle at bottom right, black 30%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at bottom right, black 30%, transparent 80%)",
                  }}
                />

                <div className="relative z-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2">
                    Sub-Quadratic Latency in Speculative Agent Drafting
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Dr. E. Vance, S. Chen, M. Thorne, D. Miller • Nov 2025
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-lg">
                    Custom kernel fusion and dynamic draft heads reduce
                    time-to-first-token by 3.4x without score degradation on
                    complex math benchmarks.
                  </p>
                </div>

                <div className="relative z-1 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://arxiv.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-950 hover:bg-gray-800 !text-white font-semibold text-xs transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 !text-white" />
                      <span className="!text-white">Read PDF (arXiv)</span>
                    </a>
                    <a
                      href="https://huggingface.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-900 bg-white hover:bg-gray-50 font-semibold text-xs transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Model Weights</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyBibtex(PUBLICATIONS[0].bibtex, "featured-1")
                    }
                    className="inline-flex items-center rounded-2xl p-2 gap-1.5 text-xs text-gray-600 hover:text-gray-950 cursor-pointer  "
                  >
                    {copiedId === "featured-1" ? (
                      <Check className="w-3.5 h-3.5 text-gray-950" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedId === "featured-1" ? "Copied!" : "Copy BibTeX"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Card 2: Mechanistic Interpretability */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all shadow-xs">
                {/* Decorative Grid Design: Top Right */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-60 rounded-tr-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #D1D5DB 1px, transparent 1px),
                      linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)
                    `,
                    backgroundSize: "14px 14px",
                    maskImage:
                      "radial-gradient(circle at top right, black 35%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at top right, black 35%, transparent 80%)",
                  }}
                />

                {/* Decorative Grid Design: Bottom Right */}
                <div
                  className="absolute bottom-0 right-0 w-32 h-28 pointer-events-none opacity-50 rounded-br-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #D1D5DB 1px, transparent 1px),
                      linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)
                    `,
                    backgroundSize: "14px 14px",
                    maskImage:
                      "radial-gradient(circle at bottom right, black 30%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at bottom right, black 30%, transparent 80%)",
                  }}
                />

                <div className="relative z-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2">
                    Mechanistic Interpretability in Deterministic State Loops
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    K. Tanaka, J. Reynolds, A. Chen • Jan 2026
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-lg">
                    Evaluation methodology isolating activation manifolds inside
                    multi-turn tool-calling models, preventing hallucination
                    cascades.
                  </p>
                </div>

                <div className="relative z-1 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://arxiv.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-950 hover:bg-gray-800 !text-white font-semibold text-xs transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 !text-white" />
                      <span className="!text-white">Read PDF</span>
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-900 bg-white hover:bg-gray-50 font-semibold text-xs transition-colors shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Benchmark Harness</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyBibtex(PUBLICATIONS[1].bibtex, "featured-2")
                    }
                    className="inline-flex items-center gap-1.5 rounded-2xl p-2 text-xs text-gray-600 hover:text-gray-950 cursor-pointer  "
                  >
                    {copiedId === "featured-2" ? (
                      <Check className="w-3.5 h-3.5 text-gray-950" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedId === "featured-2" ? "Copied!" : "Copy BibTeX"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 3: INTERACTIVE PUBLICATION ARCHIVE (Editorial List)
              ================================================================ */}
          <section id="publications" className="scroll-mt-28">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 mb-2">
                Interactive Publication Archive
              </h2>
              <p className="text-sm text-gray-600">
                Filter and examine our peer-reviewed papers, benchmark
                methodologies, and technical whitepapers.
              </p>
            </div>

            {/* Editorial List (5 items, styled like Image 2 in light mode) */}
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {PUBLICATIONS.map((paper) => (
                <div
                  key={paper.id}
                  className="group relative -mx-4 sm:-mx-6 px-4 sm:px-6 py-6 sm:py-7 transition-all duration-200 hover:bg-gray-50/80 rounded-xl cursor-pointer"
                >
                  {/* Left subtle vertical accent pill on hover */}
                  <div className="absolute left-0 top-4 bottom-4 w-1 bg-transparent group-hover:bg-[#ff8b28] rounded-full transition-colors" />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-10">
                    {/* Left Column: Tag and Date */}
                    <div className="w-full md:w-36 shrink-0 flex md:flex-col justify-between md:justify-start gap-1">
                      <span className="text-sm font-semibold text-gray-950">
                        {paper.tag}
                      </span>
                      <span className="text-xs text-gray-500  ">
                        {paper.published}
                      </span>
                    </div>

                    {/* Right Column: Title, Snippet, Metadata & Hover Actions */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-lg sm:text-xl font-medium tracking-tight text-gray-950 flex items-center gap-1.5 transition-colors">
                            <span className="group-hover:underline underline-offset-4 decoration-gray-300">
                              {paper.title}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#ff8b28] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                          </h3>

                          <p className="text-sm text-gray-600 leading-relaxed mt-2 max-w-3xl">
                            {paper.description}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs   text-gray-500">
                            <span>{paper.authors}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">{paper.venue}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium">
                              {paper.benchmark}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons revealed on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 shrink-0 hidden sm:flex items-center gap-2 pt-1">
                          <a
                            href={paper.arxivUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-gray-950 !text-white rounded-lg hover:bg-gray-800 transition-colors shadow-2xs"
                          >
                            <span className="!text-white">PDF</span>
                            <ArrowUpRight className="w-3.5 h-3.5 !text-white" />
                          </a>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyBibtex(paper.bibtex, paper.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            title="Copy BibTeX"
                          >
                            {copiedId === paper.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-gray-950" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-gray-500" />
                                <span>BibTeX</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Mobile-only action buttons */}
                      <div className="flex sm:hidden items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                        <a
                          href={paper.arxivUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-gray-950 !text-white rounded-lg"
                        >
                          <span className="!text-white">PDF</span>
                          <ArrowUpRight className="w-3.5 h-3.5 !text-white" />
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyBibtex(paper.bibtex, paper.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 bg-white text-gray-700 rounded-lg"
                        >
                          {copiedId === paper.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-gray-950" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-500" />
                              <span>BibTeX</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
              SECTION 4: OPEN SOURCE ARTIFACTS & MODEL CHECKPOINTS
              ================================================================ */}
          <section className="scroll-mt-28">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 mb-2">
                Open Source Artifacts &amp; Model Checkpoints
              </h2>
              <p className="text-sm text-gray-600">
                Freely accessible weights, evaluation harnesses, and curated
                datasets released under permissive open-source licenses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1 (Core Weights) */}
              <div className="group rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all shadow-xs">
                <div>
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-gray-950 tracking-tight">
                      Frontier Weights
                    </h3>
                  </div>

                  {/* Technical Graphic Container with Image 2 Shape 1 (Orange) */}
                  <div className="relative w-full h-44 sm:h-48 rounded-4xl bg-white border border-gray-200/80 flex items-center justify-center overflow-hidden mb-5">
                    {/* Orange Shape 1: 4 Circles Cluster on Squircle */}
                    <svg
                      viewBox="0 0 160 160"
                      className="relative z-1 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm select-none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="orangeTileGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FB923C" />
                          <stop offset="100%" stopColor="#EA580C" />
                        </linearGradient>
                      </defs>

                      {/* Squircle Tile */}
                      <rect
                        x="16"
                        y="16"
                        width="128"
                        height="128"
                        rx="32"
                        fill="url(#orangeTileGrad)"
                      />

                      {/* 4 Circles in 2x2 Cluster */}
                      <circle cx="61" cy="61" r="19" fill="#0f172a" />
                      <circle cx="99" cy="61" r="19" fill="#0f172a" />
                      <circle cx="61" cy="99" r="19" fill="#0f172a" />
                      <circle cx="99" cy="99" r="19" fill="#0f172a" />
                    </svg>
                  </div>

                  {/* Concise Description Text */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    Pretrained 8B and 70B parameter checkpoints quantized in
                    native FP8, AWQ, and GGUF formats under Apache 2.0.
                  </p>
                </div>

                <a
                  href="https://huggingface.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-950 hover:underline pt-4 border-t border-gray-200/70"
                >
                  <span>Hugging Face Repository</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Box 2 (Evaluation Harnesses) */}
              <div className="group rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all shadow-xs">
                <div>
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-gray-950 tracking-tight">
                      Evaluation Harnesses
                    </h3>
                  </div>

                  {/* Technical Graphic Container with Image 2 Shape 2 (Purple) */}
                  <div className="relative w-full h-44 sm:h-48 rounded-4xl bg-white border border-gray-200/80 flex items-center justify-center overflow-hidden mb-5">
                    {/* Purple Shape 2: Clover Cross on Squircle */}
                    <svg
                      viewBox="0 0 160 160"
                      className="relative z-1 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm select-none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="purpleTileGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#C084FC" />
                          <stop offset="100%" stopColor="#7E22CE" />
                        </linearGradient>
                      </defs>

                      {/* Squircle Tile */}
                      <rect
                        x="16"
                        y="16"
                        width="128"
                        height="128"
                        rx="32"
                        fill="url(#purpleTileGrad)"
                      />

                      {/* Clover Cross Silhouette (Dark) */}
                      <g fill="#0f172a">
                        <circle cx="80" cy="54" r="16.5" />
                        <circle cx="80" cy="106" r="16.5" />
                        <circle cx="54" cy="80" r="16.5" />
                        <circle cx="106" cy="80" r="16.5" />
                        <rect x="73.5" y="54" width="13" height="52" rx="3" />
                        <rect x="54" y="73.5" width="52" height="13" rx="3" />
                        <circle cx="80" cy="80" r="12" />
                      </g>

                      {/* Inner White Cross Line and Bulb Terminals */}
                      <g stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round">
                        <line x1="80" y1="55" x2="80" y2="105" />
                        <line x1="55" y1="80" x2="105" y2="80" />
                      </g>
                      <circle cx="80" cy="55" r="4.5" fill="#FFFFFF" />
                      <circle cx="80" cy="105" r="4.5" fill="#FFFFFF" />
                      <circle cx="55" cy="80" r="4.5" fill="#FFFFFF" />
                      <circle cx="105" cy="80" r="4.5" fill="#FFFFFF" />
                    </svg>
                  </div>

                  {/* Concise Description Text */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    Adversarial red-teaming test suites, multi-turn regression
                    suites, and latency benchmarking harnesses.
                  </p>
                </div>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-950 hover:underline pt-4 border-t border-gray-200/70"
                >
                  <span>GitHub Organization</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Box 3 (Datasets) */}
              <div className="group rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all shadow-xs">
                <div>
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-gray-950 tracking-tight">
                      Reasoning Datasets
                    </h3>
                  </div>

                  {/* Technical Graphic Container with Image 2 Shape 3 (Pink) */}
                  <div className="relative w-full h-44 sm:h-48 rounded-4xl bg-white border border-gray-200/80 flex items-center justify-center overflow-hidden mb-5">
                    {/* Pink Shape 3: 4 Petals in Square on Squircle */}
                    <svg
                      viewBox="0 0 160 160"
                      className="relative z-1 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm select-none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="pinkTileGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#F472B6" />
                          <stop offset="100%" stopColor="#DB2777" />
                        </linearGradient>
                      </defs>

                      {/* Squircle Tile */}
                      <rect
                        x="16"
                        y="16"
                        width="128"
                        height="128"
                        rx="32"
                        fill="url(#pinkTileGrad)"
                      />

                      {/* Dark Inner Square */}
                      <rect
                        x="38"
                        y="38"
                        width="84"
                        height="84"
                        rx="6"
                        fill="#0f172a"
                      />

                      {/* 4 Pink Pointed Oval Petals */}
                      <g fill="url(#pinkTileGrad)">
                        {/* Top Petal */}
                        <path d="M 80 80 C 69 66 69 48 80 38 C 91 48 91 66 80 80 Z" />
                        {/* Bottom Petal */}
                        <path d="M 80 80 C 69 94 69 112 80 122 C 91 112 91 94 80 80 Z" />
                        {/* Left Petal */}
                        <path d="M 80 80 C 66 69 48 69 38 80 C 48 91 66 91 80 80 Z" />
                        {/* Right Petal */}
                        <path d="M 80 80 C 94 69 112 69 122 80 C 112 91 94 91 80 80 Z" />
                      </g>
                    </svg>
                  </div>

                  {/* Concise Description Text */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    Curated instruction tuning and verified reasoning
                    trajectories filtered for deterministic execution.
                  </p>
                </div>

                <a
                  href="https://huggingface.co/datasets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-950 hover:underline pt-4 border-t border-gray-200/70"
                >
                  <span>Dataset Viewer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 5: ACADEMIC COMPUTE GRANT & RESEARCH COLLABORATION CTA
              ================================================================ */}
          <section className="scroll-mt-28">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-xs">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-4">
                Partner with Our Research Group.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                We provide dedicated GPU cluster hours, early access to
                unreleased checkpoints, and direct co-authoring support for
                university researchers and independent labs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/contact"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-950 !text-white hover:bg-gray-800 text-sm font-semibold transition-colors shadow-xs"
                >
                  <span className="!text-white">Apply for Compute Grant</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/careers"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 text-sm font-semibold transition-colors shadow-xs"
                >
                  <span>Join as Research Scientist</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Universal Site Footer */}
      <Footer />
    </div>
  );
}
