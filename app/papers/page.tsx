"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  ArrowRight,
  Search,
  Copy,
  Check,
  Code2,
  Database,
  Award,
  BookOpen,
  Sparkles,
  Layers,
  TrendingUp,
  X,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

/* =========================================================
   TYPES & DATA MODELS
========================================================= */

interface MetricBadge {
  label: string;
  value: string;
}

interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  keyFindings: string[];
  category:
    | "Agent Architecture"
    | "Steganography & Security"
    | "LLM Optimization"
    | "Computer Vision"
    | "Governance & Safety";
  date: string;
  year: number;
  authors: string[];
  venue: string;
  citations: number;
  pdfUrl: string;
  arxivUrl?: string;
  githubUrl?: string;
  datasetUrl?: string;
  productImpact: string;
  metrics: MetricBadge[];
  featured?: boolean;
  bibtex: string;
}

interface DatasetBenchmark {
  id: string;
  title: string;
  description: string;
  size: string;
  license: string;
  tasks: string[];
  downloads: string;
  link: string;
}

/* =========================================================
   PAPERS DATASET
========================================================= */

const PAPERS: ResearchPaper[] = [
  {
    id: "hybridlocnet-2026",
    title:
      "HybridLocNet: Dual-Stream Spatial Localization and Payload Estimation in Steganography Detection",
    abstract:
      "We introduce HybridLocNet, a novel dual-stream deep network combining Spatial Rich Model (SRM) residual filtering with high-capacity convolutional attention to perform pixel-accurate spatial localization and embedding rate estimation under adaptive content-aware steganographic algorithms.",
    keyFindings: [
      "Achieves 99.42% AUC on WOW and S-UNIWARD adaptive steganography at 0.1 bpp.",
      "Reduces localization false-positive rates by 44% compared to standard ResNet backbones.",
      "Operates with sub-45ms inference latency per 4K image on single Nvidia L4 GPUs.",
    ],
    category: "Steganography & Security",
    date: "February 2026",
    year: 2026,
    authors: ["Dr. R. Sharma", "A. Rivera", "D. Miller", "Dr. K. Tanaka"],
    venue: "NeurIPS 2026 Spotlight",
    citations: 142,
    pdfUrl: "#",
    arxivUrl: "https://arxiv.org",
    githubUrl: "https://github.com",
    datasetUrl: "#datasets",
    productImpact: "Powers Rivinity Shield Deepfake & Stego Engine",
    metrics: [
      { label: "AUC Score", value: "99.42%" },
      { label: "Latency", value: "42ms" },
      { label: "False Positives", value: "-44%" },
    ],
    featured: true,
    bibtex: `@article{sharma2026hybridlocnet,
  title={HybridLocNet: Dual-Stream Spatial Localization and Payload Estimation in Steganography Detection},
  author={Sharma, R. and Rivera, A. and Miller, D. and Tanaka, K.},
  journal={Advances in Neural Information Processing Systems (NeurIPS)},
  volume={39},
  year={2026}
}`,
  },
  {
    id: "agent-runtime-v2",
    title:
      "Deterministic Execution Paths and Formal State Verification in Multi-Agent Autonomous Runtimes",
    abstract:
      "A mathematically proven framework for enforcing acyclic state guarantees and transactional rollbacks across decentralized LLM agent clusters. We demonstrate that decoupling reasoning graphs from execution harnesses prevents catastrophic action loops and tool corruption.",
    keyFindings: [
      "Reduces multi-step execution failure rates by 38.6% across 50k heterogeneous API calls.",
      "Guarantees 100% rollback accuracy for non-idempotent tool mutations upon validation faults.",
      "Maintains P99 latency overhead under 18ms per agent orchestration step.",
    ],
    category: "Agent Architecture",
    date: "January 2026",
    year: 2026,
    authors: ["D. Miller", "E. Rostova", "K. Tanaka", "M. Vance"],
    venue: "ICLR 2026 Oral",
    citations: 289,
    pdfUrl: "#",
    arxivUrl: "https://arxiv.org",
    githubUrl: "https://github.com",
    productImpact: "Core architecture of Rivinity Agent Orchestrator",
    metrics: [
      { label: "Failure Reduction", value: "-38.6%" },
      { label: "Rollback Accuracy", value: "100%" },
      { label: "Step Overhead", value: "<18ms" },
    ],
    featured: true,
    bibtex: `@inproceedings{miller2026deterministic,
  title={Deterministic Execution Paths and Formal State Verification in Multi-Agent Autonomous Runtimes},
  author={Miller, D. and Rostova, E. and Tanaka, K. and Vance, M.},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2026}
}`,
  },
  {
    id: "sub-quadratic-attention",
    title:
      "Sub-Quadratic Context Memory for Long-Horizon Enterprise Reasoning",
    abstract:
      "We propose Dynamic Memory Chunking (DMC), an attention-aware caching hierarchy that dynamically compresses low-entropy tokens while retaining lossless precision for factual anchors, enabling 1M+ token context ingestion with constant memory footprint.",
    keyFindings: [
      "Slashes KV-cache memory consumption by 62% at 1,000,000 tokens without perplexity degradation.",
      "Delivers 3.4x throughput acceleration during dense retrieval-augmented document generation.",
      "100% recall on Multi-Needle in a Haystack retrieval benchmarks up to 512k tokens.",
    ],
    category: "LLM Optimization",
    date: "November 2025",
    year: 2025,
    authors: ["A. Sharma", "P. Chen", "Dr. R. Sharma"],
    venue: "ACL 2025",
    citations: 412,
    pdfUrl: "#",
    arxivUrl: "https://arxiv.org",
    githubUrl: "https://github.com",
    productImpact: "Powers Rivinity High-Context Knowledge Mesh",
    metrics: [
      { label: "KV Memory Saved", value: "62%" },
      { label: "Throughput", value: "3.4x" },
      { label: "Recall @ 512k", value: "100%" },
    ],
    featured: false,
    bibtex: `@inproceedings{sharma2025subquadratic,
  title={Sub-Quadratic Context Memory for Long-Horizon Enterprise Reasoning},
  author={Sharma, A. and Chen, P. and Sharma, R.},
  booktitle={Proceedings of the Association for Computational Linguistics (ACL)},
  year={2025}
}`,
  },
  {
    id: "deepfake-forensics",
    title:
      "Real-Time Spatial-Temporal Forgery Detection in Ultra-Low Latency Streaming Video",
    abstract:
      "A lightweight 3D neural forensic architecture designed for real-time edge processing that identifies subtle inter-frame facial warping, synthetic audio-visual desynchronization, and generative diffusion artifacts at 60fps.",
    keyFindings: [
      "Processes 1080p 60fps video streams with 28ms end-to-end glass-to-glass latency.",
      "Achieves 98.7% detection accuracy on WildDeepfake and FaceForensics++ benchmarks.",
      "Robust against lossy H.264/H.265 compression and aggressive network jitter.",
    ],
    category: "Computer Vision",
    date: "September 2025",
    year: 2025,
    authors: ["S. Chen", "Dr. R. Sharma", "A. Rivera"],
    venue: "CVPR 2025",
    citations: 534,
    pdfUrl: "#",
    arxivUrl: "https://arxiv.org",
    githubUrl: "https://github.com",
    productImpact: "Powers Rivinity Live Video Stream Forensics",
    metrics: [
      { label: "Benchmark Acc.", value: "98.7%" },
      { label: "Stream Latency", value: "28ms" },
      { label: "Frame Rate", value: "60 FPS" },
    ],
    featured: false,
    bibtex: `@inproceedings{chen2025realtime,
  title={Real-Time Spatial-Temporal Forgery Detection in Ultra-Low Latency Streaming Video},
  author={Chen, S. and Sharma, R. and Rivera, A.},
  booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2025}
}`,
  },
  {
    id: "zero-trust-llm",
    title:
      "Zero-Trust Guardrails: Sandboxed Semantic Policy Enforcement for Autonomous Tool Invocation",
    abstract:
      "We present an isolated capability-based execution sandbox that enforces non-bypassable semantic policies prior to code evaluation or external API dispatch, preventing indirect prompt injection attacks from exfiltrating sensitive enterprise data.",
    keyFindings: [
      "100% defense rate against 1,200 known indirect prompt injection and jailbreak payloads.",
      "Adds under 4ms latency per policy check using compiled WebAssembly validator rules.",
      "Cryptographically logs immutable audit trails for compliance with SOC 2 Type II and ISO 27001.",
    ],
    category: "Governance & Safety",
    date: "August 2025",
    year: 2025,
    authors: ["M. Vance", "A. Rivera", "D. Miller"],
    venue: "USENIX Security 2025",
    citations: 310,
    pdfUrl: "#",
    arxivUrl: "https://arxiv.org",
    githubUrl: "https://github.com",
    productImpact: "Powers Rivinity Enterprise Security Gateways",
    metrics: [
      { label: "Injection Defense", value: "100%" },
      { label: "Policy Latency", value: "<4ms" },
      { label: "SOC 2 Audit", value: "Compliant" },
    ],
    featured: false,
    bibtex: `@inproceedings{vance2025zerotrust,
  title={Zero-Trust Guardrails: Sandboxed Semantic Policy Enforcement for Autonomous Tool Invocation},
  author={Vance, M. and Rivera, A. and Miller, D.},
  booktitle={USENIX Security Symposium},
  year={2025}
}`,
  },
  {
    id: "quantized-speculative-decoding",
    title:
      "Asymmetric Speculative Decoding with Ultra-Low Precision Draft Models",
    abstract:
      "An accelerated inference paradigm pairing a 2-bit quantized draft model with an unquantized target LLM, maximizing draft token acceptance rates while reducing total memory bandwidth bottlenecks by up to 2.8x.",
    keyFindings: [
      "Yields 2.6x to 2.9x wall-clock speedup across Llama-3-70B and Mistral-Large inference.",
      "Maintains exact mathematical bit-level output equivalence with greedy decoding.",
      "Enables high-throughput serving on consumer-grade GPU clusters.",
    ],
    category: "LLM Optimization",
    date: "June 2025",
    year: 2025,
    authors: ["P. Chen", "A. Sharma", "K. Tanaka"],
    venue: "EMNLP 2025",
    citations: 215,
    pdfUrl: "#",
    arxivUrl: "https://arxiv.org",
    githubUrl: "https://github.com",
    productImpact: "Powers Rivinity Fast Inference Clusters",
    metrics: [
      { label: "Speedup", value: "2.8x" },
      { label: "Precision Loss", value: "0.00%" },
      { label: "Draft Acc.", value: "84.2%" },
    ],
    featured: false,
    bibtex: `@inproceedings{chen2025asymmetric,
  title={Asymmetric Speculative Decoding with Ultra-Low Precision Draft Models},
  author={Chen, P. and Sharma, A. and Tanaka, K.},
  booktitle={Empirical Methods in Natural Language Processing (EMNLP)},
  year={2025}
}`,
  },
];

const DATASETS: DatasetBenchmark[] = [
  {
    id: "stegobench-2026",
    title: "StegoBench-2026: Multi-Resolution Steganography Benchmark",
    description:
      "Over 2.4 million high-resolution images embedded with 14 contemporary spatial and frequency-domain steganographic algorithms, annotated with pixel-level ground truth masks.",
    size: "185 GB",
    license: "CC BY-SA 4.0",
    tasks: ["Spatial Localization", "Payload Rate Estimation", "Residual Analysis"],
    downloads: "12,400+",
    link: "https://github.com",
  },
  {
    id: "agent-runtime-bench",
    title: "AgentEval-v2: Multi-Turn Transactional Trajectories",
    description:
      "50,000 verified multi-agent task execution trajectories across SQL databases, CRM integrations, and cloud infrastructure APIs with formal verification proofs.",
    size: "42 GB",
    license: "Apache 2.0",
    tasks: ["Tool Calling", "Rollback Verification", "Loop Prevention"],
    downloads: "8,900+",
    link: "https://github.com",
  },
  {
    id: "context-fidelity-1m",
    title: "ContextFidelity-1M: Long-Horizon Enterprise Benchmark",
    description:
      "10,000 multi-document financial filings, legal contracts, and codebase repositories spanning 128k to 1,000,000 tokens designed to stress-test context retention.",
    size: "68 GB",
    license: "MIT License",
    tasks: ["Multi-Needle Retrieval", "Cross-Document Reasoning", "Factual Synthesis"],
    downloads: "15,200+",
    link: "https://github.com",
  },
];

const CATEGORIES = [
  "All",
  "Agent Architecture",
  "Steganography & Security",
  "LLM Optimization",
  "Computer Vision",
  "Governance & Safety",
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ResearchPapersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "citations">("newest");
  const [activeBibtexModal, setActiveBibtexModal] = useState<ResearchPaper | null>(
    null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const featuredPapers = useMemo(
    () => PAPERS.filter((p) => p.featured),
    []
  );

  const filteredPapers = useMemo(() => {
    return PAPERS.filter((paper) => {
      const matchesCategory =
        selectedCategory === "All" || paper.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.venue.toLowerCase().includes(query) ||
        paper.authors.some((a) => a.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "citations") return b.citations - a.citations;
      return b.year - a.year;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-between text-[#1A1A1A]"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Header />

      <main className="w-full flex-1">
        {/* =====================================================
            01 — HERO SECTION
        ===================================================== */}
        <div className="section mt-25 relative overflow-hidden bg-white border-b border-[#E5E7EB] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              {/* Title */}
              <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#1A1A1A] sm:text-5xl lg:text-6xl leading-[1.1]">
                Foundational Research Powering{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C42] to-[#E85D9E] bg-clip-text text-transparent">
                  Next-Gen Enterprise AI.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                Explore our peer-reviewed papers, open benchmark datasets, and technical reports in multi-agent runtimes, cryptographic model security, and sub-quadratic inference.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="#papers-repository"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-10px_rgba(255,107,0,0.45)] transition-all hover:bg-[#E55F00] active:scale-[0.98]"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Publications
                </a>
                <a
                  href="#datasets"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#374151] shadow-sm transition-all hover:border-[#D1D5DB] hover:bg-[#FAFAFA] active:scale-[0.98]"
                >
                  <Database className="h-4 w-4 text-[#FF6B00]" />
                  Open Datasets & Benchmarks
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">35+</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Peer-Reviewed Papers</p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#FF6B00]">14.2k+</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Citations Across Academia</p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">4</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">NeurIPS / ICLR Spotlights</p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">100%</p>
                <p className="text-xs font-medium text-[#6B7280] mt-1">Open Weights & Benchmarks</p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            02 — FEATURED RESEARCH SPOTLIGHT
        ===================================================== */}
        <section className="py-14 sm:py-20 bg-[#F7F7F8]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-1">
                  Spotlight Publications
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-md">
                Selected peer-reviewed papers presented at premier machine learning and security conferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-white p-7 sm:p-9 shadow-[0_20px_60px_-30px_rgba(20,20,40,0.12)] transition-all hover:border-[#FFD9BF] hover:shadow-[0_25px_70px_-25px_rgba(255,107,0,0.18)]"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <span className="rounded-full bg-[#FFF4EC] border border-[#FFD9BF] px-3.5 py-1 text-xs font-semibold text-[#FF6B00]">
                        {paper.venue}
                      </span>
                      <span className="text-xs font-medium text-[#6B7280]">
                        {paper.date} • {paper.citations} citations
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight leading-snug group-hover:text-[#FF6B00] transition-colors">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <p className="mt-2.5 text-xs text-[#6B7280]">
                      <span className="font-semibold text-[#374151]">Authors:</span>{" "}
                      {paper.authors.join(", ")}
                    </p>

                    {/* Abstract */}
                    <p className="mt-4 text-sm text-[#4B5563] leading-relaxed">
                      {paper.abstract}
                    </p>

                    {/* Key Findings Box */}
                    <div className="mt-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] p-4.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2.5 flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-[#FF6B00]" />
                        Key Findings & Verified Benchmarks
                      </p>
                      <ul className="space-y-2">
                        {paper.keyFindings.map((finding, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-[#4B5563]"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B00]" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Ribbon */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {paper.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-[#E5E7EB] bg-white p-2.5 text-center"
                        >
                          <p className="text-[10px] text-[#9CA3AF] uppercase font-semibold">
                            {m.label}
                          </p>
                          <p className="text-sm font-extrabold text-[#1A1A1A] mt-0.5">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Product Impact Tag */}
                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] px-3.5 py-2 text-xs font-medium text-[#C2410C]">
                      <Layers className="h-4 w-4 shrink-0 text-[#F97316]" />
                      <span>{paper.productImpact}</span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-8 pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <a
                        href={paper.pdfUrl}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#E55F00] transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </a>

                      {paper.arxivUrl && (
                        <a
                          href={paper.arxivUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#374151] hover:border-[#D1D5DB] hover:bg-[#FAFAFA] transition-colors"
                        >
                          <span>arXiv</span>
                          <ExternalLink className="h-3 w-3 text-[#9CA3AF]" />
                        </a>
                      )}

                      {paper.githubUrl && (
                        <a
                          href={paper.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#374151] hover:border-[#D1D5DB] hover:bg-[#FAFAFA] transition-colors"
                        >
                          <Code2 className="h-3.5 w-3.5 text-[#9CA3AF]" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveBibtexModal(paper)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#FF6B00] transition-colors cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Cite BibTeX</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            03 — ALL PAPERS REPOSITORY & SEARCH
        ===================================================== */}
        <section
          id="papers-repository"
          className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB]"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
                RESEARCH ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mt-1.5">
                All Research Publications
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
                Search across theoretical papers, runtime systems, forensic vision models, and alignment protocols.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="rounded-3xl border border-[#E5E7EB] bg-[#F7F7F8] p-4 sm:p-6 mb-10 shadow-xs">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {CATEGORIES.map((cat) => {
                    const count =
                      cat === "All"
                        ? PAPERS.length
                        : PAPERS.filter((p) => p.category === cat).length;
                    const isActive = selectedCategory === cat;

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#1A1A1A] text-white shadow-sm"
                            : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:text-[#1A1A1A]"
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search & Sort Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                    <input
                      type="text"
                      placeholder="Search title, author, keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-4 py-2 text-xs text-[#1A1A1A] placeholder-[#9CA3AF] focus:border-[#FF6B00] focus:outline-none shadow-xs transition"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "newest" | "citations")
                    }
                    className="rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs font-medium text-[#374151] focus:border-[#FF6B00] focus:outline-none shadow-xs cursor-pointer"
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="citations">Sort: Most Cited</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Papers List */}
            <div className="space-y-4">
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs transition-all hover:border-[#FFD9BF] hover:shadow-md"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="max-w-3xl space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-[#FFF4EC] border border-[#FFD9BF] px-2.5 py-0.5 text-[11px] font-semibold text-[#FF6B00]">
                            {paper.category}
                          </span>
                          <span className="text-xs font-semibold text-[#1A1A1A] rounded-md bg-[#F3F4F6] px-2 py-0.5">
                            {paper.venue}
                          </span>
                          <span className="text-xs text-[#9CA3AF]">•</span>
                          <span className="text-xs text-[#6B7280]">
                            {paper.date}
                          </span>
                          <span className="text-xs text-[#9CA3AF]">•</span>
                          <span className="text-xs text-[#6B7280]">
                            {paper.citations} citations
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-snug group-hover:text-[#FF6B00] transition-colors">
                          {paper.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                          {paper.abstract}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B7280] pt-1">
                          <p>
                            <span className="font-semibold text-[#374151]">
                              Authors:
                            </span>{" "}
                            {paper.authors.join(", ")}
                          </p>
                        </div>

                        {/* Product Tag */}
                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FF6B00] bg-[#FFF4EC] px-2.5 py-0.5 rounded-md">
                            <Sparkles className="h-3 w-3" />
                            {paper.productImpact}
                          </span>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <a
                            href={paper.pdfUrl}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#333333] transition-colors"
                          >
                            <Download className="h-3.5 w-3.5 text-white" />
                            <span className="text-white">PDF</span>
                          </a>

                          {paper.arxivUrl && (
                            <a
                              href={paper.arxivUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2 text-xs font-semibold text-[#374151] hover:border-[#D1D5DB] hover:bg-white transition-colors"
                            >
                              <span>arXiv</span>
                              <ExternalLink className="h-3 w-3 text-[#9CA3AF]" />
                            </a>
                          )}

                          {paper.githubUrl && (
                            <a
                              href={paper.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2 text-xs font-semibold text-[#374151] hover:border-[#D1D5DB] hover:bg-white transition-colors"
                            >
                              <Code2 className="h-3.5 w-3.5 text-[#9CA3AF]" />
                              <span>Code</span>
                            </a>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveBibtexModal(paper)}
                          className="bg-transparent inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#FF6B00] transition-colors cursor-pointer py-1"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>BibTeX</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-[#E5E7EB] bg-[#F7F7F8] py-16 text-center">
                  <FileText className="mx-auto h-10 w-10 text-[#9CA3AF] mb-3" />
                  <p className="text-base font-bold text-[#1A1A1A]">
                    No research publications match your criteria
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto">
                    Try adjusting your search query or selecting a different research focus category.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#333333] transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            04 — OPEN DATASETS & BENCHMARKS
        ===================================================== */}
        <section id="datasets" className="py-16 sm:py-20 bg-[#F7F7F8] border-t border-[#E5E7EB]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-1">
                  Public Datasets & Benchmarks
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-md">
                We believe scientific reproducibility accelerates trustworthy AI. Explore our open evaluation suites and annotated corpora.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DATASETS.map((ds) => (
                <div
                  key={ds.id}
                  className="rounded-3xl border border-[#E5E7EB] bg-white p-7 flex flex-col justify-between shadow-xs transition-all hover:border-[#FFD9BF] hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-[#FAFAFA] border border-[#E5E7EB] px-3 py-1 text-[11px] font-semibold text-[#374151]">
                        {ds.size}
                      </span>
                      <span className="text-[11px] font-medium text-[#6B7280]">
                        {ds.license}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug">
                      {ds.title}
                    </h3>

                    <p className="mt-3 text-xs text-[#6B7280] leading-relaxed">
                      {ds.description}
                    </p>

                    <div className="mt-5 space-y-1.5">
                      <p className="text-[11px] font-semibold text-[#374151]">Target Tasks:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ds.tasks.map((task) => (
                          <span
                            key={task}
                            className="rounded-md bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-medium text-[#4B5563]"
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-xs text-[#9CA3AF]">
                      {ds.downloads} downloads
                    </span>
                    <a
                      href={ds.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B00] hover:text-[#E55F00] transition-colors"
                    >
                      <span>Access Dataset</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            05 — ACADEMIC RESEARCH GRANTS & LAB COLLABORATION
        ===================================================== */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E5E7EB]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-[2.5rem] border border-gray-200 bg-gray-50 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_25px_80px_-45px_rgba(255,107,0,0.25)]">
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight">
                  Accelerating Academic AI Research & Open Breakthroughs.
                </h2>

                <p className="mt-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  We provide GPU compute grants ($50,000 to $250,000), direct API access, and co-authorship opportunities for university labs, PhD candidates, and non-profit research institutions investigating safe autonomous agents and cryptographic model security.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_-10px_rgba(255,107,0,0.45)] transition-all hover:bg-[#E55F00] active:scale-[0.98]"
                  >
                    <span>Apply for Research Compute Grant</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-semibold text-[#374151] shadow-sm transition-all hover:border-[#D1D5DB] hover:bg-[#FAFAFA] active:scale-[0.98]"
                  >
                    <span>Explore Rivinity Labs</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          BIBTEX CITATION MODAL
      ===================================================== */}
      <AnimatePresence>
        {activeBibtexModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBibtexModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                    BibTeX Citation
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-1">
                    {activeBibtexModal.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    {activeBibtexModal.venue} ({activeBibtexModal.year})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveBibtexModal(null)}
                  className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-4">
                <pre className="rounded-2xl bg-[#1A1A1A] p-4 text-xs font-mono text-zinc-200 overflow-x-auto max-h-64 leading-relaxed">
                  {activeBibtexModal.bibtex}
                </pre>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-xs text-[#6B7280]">
                  Copy this entry directly into your LaTeX `.bib` file.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      activeBibtexModal.bibtex,
                      activeBibtexModal.id
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#E55F00] transition active:scale-[0.98] cursor-pointer"
                >
                  {copiedId === activeBibtexModal.id ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy BibTeX</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}