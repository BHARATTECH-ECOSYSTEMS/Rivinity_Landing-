"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Moon,
  ChevronDown,
  Search,
  Bell,
  SlidersHorizontal,
  Star,
  Heart,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Plus,
  Bookmark,
  BrainCircuit,
  Database,
  Wrench,
  ArrowRight,
} from "lucide-react";

import SidebarShell from "@/components/canvas/SidebarShell";
import { USER } from "@/lib/profile";
import MarketplaceItem, { MarketplaceItemType } from "./MarketplaceItem";
import MarketplaceCategory from "./MarketplaceCategory";
import MarketplaceCart from "./MarketplaceCart";
import MarketplaceCheckout from "./MarketplaceCheckout";
import MarketplaceUpload from "./MarketplaceUpload";

const INITIAL_MARKETPLACE_ITEMS: MarketplaceItemType[] = [
  // Trending Assets
  {
    id: "lyra-whisper-pro",
    name: "Lyra Whisper Pro",
    category: "AI / ML Models",
    badge: "model",
    tagline: "Speech-to-text optimized for noisy environments.",
    description:
      "Ultra-low latency speech recognition fine-tuned for high-noise acoustic environments with support for 50+ languages.",
    rating: 4.5,
    runs: "21.3k",
    price: "Free",
    tier: "Free",
    author: { name: "Rivinity Audio" },
    capabilities: [
      "Dynamic Noise Reduction",
      "Real-time WebSocket Streaming",
      "Multilingual 50+",
    ],
    specs: {
      framework: "Whisper / PyTorch",
      license: "MIT License",
      version: "v2.4.0",
      updatedAt: "2 days ago",
    },
    isTrending: true,
  },
  {
    id: "global-sentiment-v3",
    name: "GlobalSentiment v3.1",
    category: "Datasets",
    badge: "dataset",
    tagline: "Multilingual social-media sentiment corpus.",
    description:
      "Over 8.5M annotated conversational snippets cleaned for fine-tuning LLMs, sentiment analysis, and emotion classification.",
    rating: 4.8,
    runs: "12.5k",
    price: "Free",
    tier: "Free",
    author: { name: "NexusData" },
    capabilities: [
      "8.5M Annotated Rows",
      "Cross-Lingual Vectors",
      "Emotion Multi-label",
    ],
    specs: {
      framework: "Parquet / Arrow",
      license: "CC-BY-4.0",
      version: "v3.1.0",
      updatedAt: "1 week ago",
    },
    isTrending: true,
  },
  {
    id: "flow-canvas",
    name: "FlowCanvas Agent",
    category: "Agents",
    badge: "agent",
    tagline: "Design-to-code generative frontend builder.",
    description:
      "Converts wireframes, natural language prompts, and component tokens into ready-to-run React/Next.js interfaces.",
    rating: 4.9,
    runs: "4.8k",
    price: "$29",
    tier: "Paid",
    author: { name: "Canvas AI" },
    capabilities: [
      "Tailwind Code Synthesis",
      "Interactive Preview",
      "State Wiring",
    ],
    specs: {
      framework: "LangChain / Claude-3.5",
      license: "Commercial Standard",
      version: "v1.2.0",
      updatedAt: "3 days ago",
    },
    isTrending: true,
  },
  {
    id: "deep-eval-kit",
    name: "DeepEval Matrix",
    category: "AI Tools",
    badge: "tool",
    tagline: "Automated bias, toxicity & hallucination detector.",
    description:
      "Continuous unit testing pipeline for generative AI outputs with red-teaming presets and semantic drift alarms.",
    rating: 4.6,
    runs: "9.2k",
    price: "$19",
    tier: "Paid",
    author: { name: "Aegis Labs" },
    capabilities: [
      "Toxicity Probing",
      "Hallucination Boundary Checks",
      "CI/CD Webhooks",
    ],
    specs: {
      framework: "Python / FastAPI",
      license: "Apache 2.0",
      version: "v3.0.1",
      updatedAt: "5 days ago",
    },
    isTrending: true,
  },

  // Datasets
  {
    id: "bio-med-qa",
    name: "BioMedQA 500k",
    category: "Datasets",
    badge: "dataset",
    tagline: "PubMed clinical question-answer reasoning pairs.",
    description:
      "Standardized clinical evaluation dataset with expert rationale explanations, diagnostic ICD-10 tags, and reference links.",
    rating: 4.9,
    runs: "7.4k",
    price: "$49",
    tier: "Paid",
    author: { name: "Helix Science" },
    capabilities: ["500,000 Verified QAs", "ICD-10 Mapped", "Peer-Reviewed"],
    specs: {
      framework: "JSON Lines / Parquet",
      license: "ODC-BY",
      version: "v2.0.0",
      updatedAt: "2 weeks ago",
    },
  },
  {
    id: "code-instruct-poly",
    name: "PolyGlot CodeInstruct",
    category: "Datasets",
    badge: "dataset",
    tagline: "1.2M instruction-following coding challenges.",
    description:
      "Curated algorithmic tasks and real-world repository PR reviews spanning 18 programming languages.",
    rating: 4.7,
    runs: "18.9k",
    price: "Free",
    tier: "Free",
    author: { name: "OpenCode Lab" },
    capabilities: [
      "18 Languages Covered",
      "Exec Test Suites Included",
      "Clean Deduped",
    ],
    specs: {
      framework: "HuggingFace Datasets",
      license: "MIT License",
      version: "v1.4.2",
      updatedAt: "3 days ago",
    },
  },
  {
    id: "legal-corpus-india",
    name: "BharatLegal Precedent Corpus",
    category: "Datasets",
    badge: "dataset",
    tagline: "Supreme Court & High Court digitized judgments.",
    description:
      "Comprehensive, structured dataset of legal rulings, case citations, and statute cross-references from 1950 to 2024.",
    rating: 4.8,
    runs: "3.1k",
    price: "$89",
    tier: "Premium",
    author: { name: "Vidhi Data" },
    capabilities: [
      "Judicial Headnotes",
      "Statutory Cross-References",
      "Bilingual EN/HI",
    ],
    specs: {
      framework: "Postgres / Parquet",
      license: "Commercial Non-Exclusive",
      version: "v4.1.0",
      updatedAt: "1 month ago",
    },
  },
  {
    id: "multimodal-vision-dialog",
    name: "VisionChat OmniSet",
    category: "Datasets",
    badge: "dataset",
    tagline: "Image-grounded multi-turn conversational data.",
    description:
      "High-resolution image captions, spatial bounding boxes, and complex visual reasoning dialogues.",
    rating: 4.6,
    runs: "8.7k",
    price: "Free",
    tier: "Free",
    author: { name: "VisionWorks" },
    capabilities: ["Bounding Boxes", "Spatial Reasoning", "4K High Res"],
    specs: {
      framework: "WebDataset / Arrow",
      license: "CC-BY-SA-4.0",
      version: "v2.2.0",
      updatedAt: "1 week ago",
    },
  },

  // AI / ML Models
  {
    id: "rivinity-coder-14b",
    name: "RivinityCoder 14B",
    category: "AI / ML Models",
    badge: "model",
    tagline: "Code generation across 30 languages.",
    description:
      "Enterprise code-completion and refactoring engine with fill-in-the-middle support and unit test generator.",
    rating: 4.7,
    runs: "6.1k",
    price: "$69",
    tier: "Paid",
    author: { name: "Rivinity Foundry" },
    capabilities: ["Unit Test Synthesis", "Fill-in-the-middle", "32k Context"],
    specs: {
      framework: "vLLM / Transformers",
      license: "Commercial SaaS",
      version: "v3.0.0",
      updatedAt: "1 week ago",
    },
  },
  {
    id: "embed-dense-v2",
    name: "EmbedDense Vector 1024",
    category: "AI / ML Models",
    badge: "model",
    tagline: "High-density multilingual text embeddings.",
    description:
      "Top-tier MTEB benchmark embedding model specialized for semantic enterprise search and RAG retrieval pipelines.",
    rating: 4.9,
    runs: "38.1k",
    price: "Free",
    tier: "Free",
    author: { name: "Rivinity Core" },
    capabilities: [
      "1024 Dimensions",
      "MTEB Leaderboard Top 5",
      "Cosine Matched",
    ],
    specs: {
      framework: "HuggingFace / PyTorch",
      license: "Apache 2.0",
      version: "v2.1.0",
      updatedAt: "6 days ago",
    },
  },
  {
    id: "neural-tts-fluid",
    name: "FluidVoice TTS",
    category: "AI / ML Models",
    badge: "model",
    tagline: "Natural expressive text-to-speech engine.",
    description:
      "Low-latency emotive neural voice synthesizer with dynamic pitch control and conversational turn handling.",
    rating: 4.6,
    runs: "15.7k",
    price: "$45",
    tier: "Paid",
    author: { name: "AudioStream" },
    capabilities: [
      "Realtime Streaming",
      "Emotive Inflection",
      "Zero-shot Cloning",
    ],
    specs: {
      framework: "ONNX / WebAssembly",
      license: "Commercial",
      version: "v1.3.0",
      updatedAt: "2 weeks ago",
    },
  },

  // Agents
  {
    id: "sage-research-agent",
    name: "Sage Research Agent",
    category: "Agents",
    badge: "agent",
    tagline: "Autonomous deep research with citation graph.",
    description:
      "Crawls scientific papers, cross-verifies claims, extracts statistical tables, and compiles cohesive reports.",
    rating: 4.8,
    runs: "1.8k",
    price: "$24",
    tier: "Paid",
    author: { name: "Nexus Agents" },
    capabilities: [
      "Autonomous Web Scraping",
      "Graph Reasoning",
      "Source Citations",
    ],
    specs: {
      framework: "LangGraph / Llama-3",
      license: "Commercial Per-Seat",
      version: "v1.6.4",
      updatedAt: "Yesterday",
    },
  },
  {
    id: "quill-marketing-crew",
    name: "Quill Marketing Crew",
    category: "Agents",
    badge: "agent",
    tagline: "Multi-agent content strategist, copywriter & SEO.",
    description:
      "Three coordinated agents that draft content calendars, generate SEO-friendly blogs, and produce social distribution variants.",
    rating: 4.7,
    runs: "4.2k",
    price: "$35",
    tier: "Paid",
    author: { name: "Quill AI" },
    capabilities: [
      "Multi-agent Coordination",
      "SEO Keyword Clustering",
      "Variant Generator",
    ],
    specs: {
      framework: "CrewAI / GPT-4o",
      license: "Commercial License",
      version: "v2.0.1",
      updatedAt: "4 days ago",
    },
  },

  // AI Tools
  {
    id: "schemacraft-db",
    name: "SchemaCraft",
    category: "AI Tools",
    badge: "tool",
    tagline: "Natural language database schema designer.",
    description:
      "Generates normalized SQL migrations, ER diagrams, and mock seed records from business requirements.",
    rating: 4.9,
    runs: "11.2k",
    price: "$15",
    tier: "Premium",
    author: { name: "DataPrism" },
    capabilities: [
      "Text-to-SQL",
      "Self-Healing Schema",
      "Warehouse Sandboxing",
    ],
    specs: {
      framework: "DuckDB / LangChain",
      license: "Commercial License",
      version: "v2.1.2",
      updatedAt: "1 week ago",
    },
  },
  {
    id: "vector-inspector",
    name: "Vector Inspector Pro",
    category: "AI Tools",
    badge: "tool",
    tagline: "Visual embedding clusters & search debugger.",
    description:
      "Explore Pinecone, Qdrant, and Milvus collections with 3D UMAP projection and cosine similarity debug inspect.",
    rating: 4.8,
    runs: "8.4k",
    price: "Free",
    tier: "Free",
    author: { name: "Nexus Tools" },
    capabilities: [
      "3D UMAP Visualizer",
      "Recall Diagnostic",
      "Live Re-ranking",
    ],
    specs: {
      framework: "Three.js / WebGL",
      license: "MIT License",
      version: "v3.1.2",
      updatedAt: "4 days ago",
    },
  },
  {
    id: "prompt-evaluator",
    name: "PromptEvaluator",
    category: "AI Tools",
    badge: "tool",
    tagline: "Automated CI/CD evaluation matrix for LLMs.",
    description:
      "Unit tests for prompt regression, hallucination detection, latency scoring, and output drift measurement.",
    rating: 4.7,
    runs: "5.2k",
    price: "$39",
    tier: "Paid",
    author: { name: "TestMatrix" },
    capabilities: [
      "Hallucination Score",
      "Automated Regression",
      "CI/CD Webhook",
    ],
    specs: {
      framework: "Docker / PyTest",
      license: "Commercial",
      version: "v1.9.0",
      updatedAt: "1 week ago",
    },
  },
  {
    id: "sonar-deep-search",
    name: "Sonar Search 70B",
    category: "AI / ML Models",
    badge: "model",
    tagline: "Live web-grounded reasoning model with citation tracking.",
    description:
      "High throughput inference model optimized for real-time factuality checks, live search synthesis, and tabular analysis.",
    rating: 4.8,
    runs: "14.2k",
    price: "Free",
    tier: "Free",
    author: { name: "Rivinity Search" },
    capabilities: ["Live Web Grounding", "Fast Inference", "Multi-hop Search"],
    specs: {
      framework: "vLLM / TensorRT",
      license: "Open Commercial",
      version: "v2.5.0",
      updatedAt: "3 days ago",
    },
  },
  {
    id: "vision-ocr-pro",
    name: "OmniDoc OCR Vision",
    category: "AI / ML Models",
    badge: "model",
    tagline: "Multi-page visual document parser & table structurer.",
    description:
      "Converts scanned invoices, handwritten notes, and technical schematics into pristine Markdown, LaTeX, and JSON.",
    rating: 4.9,
    runs: "9.8k",
    price: "$59",
    tier: "Paid",
    author: { name: "VisionWorks" },
    capabilities: ["Handwriting Support", "Markdown Output", "LaTeX Equations"],
    specs: {
      framework: "PyTorch / ONNX",
      license: "Commercial",
      version: "v3.2.1",
      updatedAt: "5 days ago",
    },
  },
  {
    id: "finance-sec-qa",
    name: "FinSEC Corpus 2M",
    category: "Datasets",
    badge: "dataset",
    tagline: "Quarterly earnings transcripts & 10-K audit tables.",
    description:
      "Standardized 2M financial QA pairs aligned with balance sheets, cashflow reports, and analyst guidance transcripts.",
    rating: 4.9,
    runs: "5.7k",
    price: "$79",
    tier: "Paid",
    author: { name: "FinData Labs" },
    capabilities: ["Audited Pairs", "SEC 10-K Mapped", "Table Summaries"],
    specs: {
      framework: "Parquet / S3",
      license: "Financial Commercial",
      version: "v2.1.0",
      updatedAt: "4 days ago",
    },
  },
  {
    id: "align-preference-rlhf",
    name: "RLHF Preference Ultra",
    category: "Datasets",
    badge: "dataset",
    tagline: "Human-evaluated multi-turn pairwise alignment dataset.",
    description:
      "Over 400,000 paired model outputs rated for helpfulness, accuracy, and refusal benchmarks with granular rationale tags.",
    rating: 4.8,
    runs: "24.1k",
    price: "Free",
    tier: "Free",
    author: { name: "OpenAlign" },
    capabilities: ["Pairwise Ratings", "Safety Tags", "DPO Ready"],
    specs: {
      framework: "HuggingFace Datasets",
      license: "Apache 2.0",
      version: "v1.8.0",
      updatedAt: "1 week ago",
    },
  },
  {
    id: "sentinel-devops-agent",
    name: "DevOps Sentinel Agent",
    category: "Agents",
    badge: "agent",
    tagline: "Autonomous Kubernetes incident triage & log root-cause.",
    description:
      "Monitors telemetry alerts, isolates failing pods, correlates distributed trace spans, and drafts zero-downtime hotfix PRs.",
    rating: 4.9,
    runs: "3.9k",
    price: "$49",
    tier: "Paid",
    author: { name: "SentryOps" },
    capabilities: ["K8s Diagnostic", "Trace Correlation", "Automated PRs"],
    specs: {
      framework: "LangGraph / Go",
      license: "Commercial Seat",
      version: "v2.4.0",
      updatedAt: "2 days ago",
    },
  },
  {
    id: "guardrail-firewall",
    name: "PromptGuard Firewall",
    category: "AI Tools",
    badge: "tool",
    tagline: "Real-time prompt injection shield & PII scrubber.",
    description:
      "Ultra-low latency streaming proxy that intercepts jailbreak attempts, adversarial suffixes, and sensitive credential leaks.",
    rating: 4.8,
    runs: "16.4k",
    price: "$29",
    tier: "Paid",
    author: { name: "Shield AI" },
    capabilities: ["Sub-5ms Latency", "Jailbreak Neutralizer", "PII Redaction"],
    specs: {
      framework: "Rust / WebAssembly",
      license: "Commercial License",
      version: "v3.4.0",
      updatedAt: "3 days ago",
    },
  },
];

export const MarketplaceHome: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItemType[]>(
    INITIAL_MARKETPLACE_ITEMS,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] =
    useState<MarketplaceItemType | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<MarketplaceItemType | null>(
    null,
  );
  const [cartItems, setCartItems] = useState<MarketplaceItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Category "See all" Modal State
  const [viewingCategoryModal, setViewingCategoryModal] = useState<{
    title: string;
    items: MarketplaceItemType[];
    categoryKey?: string;
  } | null>(null);
  const [modalSearchQuery, setModalSearchQuery] = useState("");
  const [modalPricingFilter, setModalPricingFilter] = useState<"All" | "Free" | "Paid">("All");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const toggleLike = (item: MarketplaceItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(item.id)
        ? prev.filter((i) => i !== item.id)
        : [...prev, item.id],
    );
    setCartItems((prev) =>
      prev.some((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item],
    );
  };

  const getFilteredItems = (rawItems: MarketplaceItemType[]) => {
    return rawItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategoryPill =
        selectedCategory === "All" ||
        (selectedCategory === "Agents" && item.category === "Agents") ||
        (selectedCategory === "ML Models" &&
          item.category === "AI / ML Models") ||
        (selectedCategory === "Datasets" && item.category === "Datasets") ||
        (selectedCategory === "AI Tools" && item.category === "AI Tools");

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(item.category);
      const matchesPricing =
        selectedPricing.length === 0 ||
        (selectedPricing.includes("Free") && item.price === "Free") ||
        (selectedPricing.includes("Paid") && item.price !== "Free");

      return (
        matchesSearch && matchesCategoryPill && matchesType && matchesPricing
      );
    });
  };

  /* Category Shapes & Patterns for Card Headers */
  const AgentPattern: React.FC = () => (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="agentGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="agentCoreGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Concentric orbit rings */}
      <circle cx="160" cy="60" r="54" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3" />
      <circle cx="160" cy="60" r="38" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" />
      <circle cx="160" cy="60" r="22" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.45" />

      {/* Interconnecting synaptic pathways */}
      <path d="M 60 40 Q 110 20, 160 60" stroke="#A78BFA" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.5" />
      <path d="M 160 60 Q 210 100, 260 80" stroke="#A78BFA" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.5" />
      <path d="M 80 90 Q 120 75, 160 60" stroke="#C4B5FD" strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M 160 60 Q 200 45, 240 30" stroke="#C4B5FD" strokeWidth="1.2" strokeOpacity="0.4" />

      {/* Left satellite agent node network */}
      <circle cx="60" cy="40" r="14" fill="url(#agentGrad1)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="60" cy="40" r="4" fill="#7C3AED" fillOpacity="0.75" />
      <circle cx="80" cy="90" r="9" fill="url(#agentGrad1)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="80" cy="90" r="3" fill="#8B5CF6" fillOpacity="0.65" />

      {/* Center Core Agent Node */}
      <circle cx="160" cy="60" r="16" fill="url(#agentCoreGrad)" />
      <circle cx="160" cy="60" r="7" fill="#FFFFFF" fillOpacity="0.95" />
      {/* 4-point decision spark in center */}
      <path d="M 160 49 L 162 58 L 171 60 L 162 62 L 160 71 L 158 62 L 149 60 L 158 58 Z" fill="#7C3AED" />

      {/* Right satellite agent node network */}
      <circle cx="260" cy="80" r="13" fill="url(#agentGrad1)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="260" cy="80" r="4" fill="#7C3AED" fillOpacity="0.75" />
      <circle cx="240" cy="30" r="10" fill="url(#agentGrad1)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="240" cy="30" r="3" fill="#8B5CF6" fillOpacity="0.65" />

      {/* Floating agent decision diamonds */}
      <polygon points="120,30 126,36 120,42 114,36" fill="#8B5CF6" fillOpacity="0.35" />
      <polygon points="200,90 206,96 200,102 194,96" fill="#7C3AED" fillOpacity="0.35" />
      <polygon points="290,35 294,39 290,43 286,39" fill="#A78BFA" fillOpacity="0.45" />
      <polygon points="30,75 34,79 30,83 26,79" fill="#C4B5FD" fillOpacity="0.5" />
    </svg>
  );

  const ModelPattern: React.FC = () => (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="modelSlab1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="modelSlab2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="modelWaveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#0284C7" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Multi-head attention sine waves */}
      <path
        d="M 10 70 C 60 20, 100 110, 160 50 C 220 -10, 260 90, 310 40"
        stroke="url(#modelWaveGrad)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 10 50 C 70 100, 110 10, 160 70 C 210 130, 270 20, 310 80"
        stroke="#38BDF8"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Stacked isometric 3D tensor slabs */}
      {/* Bottom Slab */}
      <polygon points="160,82 205,62 160,42 115,62" fill="url(#modelSlab1)" stroke="#0284C7" strokeWidth="1" strokeOpacity="0.4" />
      <polygon points="115,62 160,82 160,90 115,70" fill="#0284C7" fillOpacity="0.3" />
      <polygon points="160,82 205,62 205,70 160,90" fill="#0369A1" fillOpacity="0.4" />

      {/* Middle Slab */}
      <polygon points="160,62 205,42 160,22 115,42" fill="url(#modelSlab2)" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
      <polygon points="115,42 160,62 160,68 115,48" fill="#0284C7" fillOpacity="0.25" />
      <polygon points="160,62 205,42 205,48 160,68" fill="#0369A1" fillOpacity="0.35" />

      {/* Neural Layer Input Nodes (Left) */}
      <circle cx="50" cy="35" r="4.5" fill="#0284C7" fillOpacity="0.75" />
      <circle cx="50" cy="60" r="4.5" fill="#0284C7" fillOpacity="0.75" />
      <circle cx="50" cy="85" r="4.5" fill="#0284C7" fillOpacity="0.75" />
      <circle cx="80" cy="48" r="3.5" fill="#38BDF8" fillOpacity="0.65" />
      <circle cx="80" cy="72" r="3.5" fill="#38BDF8" fillOpacity="0.65" />
      <line x1="50" y1="35" x2="80" y2="48" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="50" y1="60" x2="80" y2="48" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="50" y1="60" x2="80" y2="72" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="50" y1="85" x2="80" y2="72" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="80" y1="48" x2="115" y2="42" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
      <line x1="80" y1="72" x2="115" y2="62" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />

      {/* Neural Layer Output (Right) */}
      <circle cx="240" cy="48" r="3.5" fill="#38BDF8" fillOpacity="0.65" />
      <circle cx="240" cy="72" r="3.5" fill="#38BDF8" fillOpacity="0.65" />
      <circle cx="270" cy="35" r="4.5" fill="#0284C7" fillOpacity="0.75" />
      <circle cx="270" cy="60" r="4.5" fill="#0284C7" fillOpacity="0.75" />
      <circle cx="270" cy="85" r="4.5" fill="#0284C7" fillOpacity="0.75" />
      <line x1="205" y1="42" x2="240" y2="48" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
      <line x1="205" y1="62" x2="240" y2="72" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
      <line x1="240" y1="48" x2="270" y2="35" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="240" y1="48" x2="270" y2="60" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="240" y1="72" x2="270" y2="60" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="240" y1="72" x2="270" y2="85" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />

      {/* Floating Coordinate grid cross */}
      <path d="M 155 18 L 165 18 M 160 13 L 160 23" stroke="#0284C7" strokeWidth="1.2" strokeOpacity="0.6" />
    </svg>
  );

  const DatasetPattern: React.FC = () => (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="diskGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Left: Stacked 3D Database Storage Cylinders */}
      <g transform="translate(60, 24)">
        {/* Bottom Cylinder */}
        <path d="M 0 46 C 0 54 32 54 32 46 L 32 56 C 32 64 0 64 0 56 Z" fill="url(#diskGrad1)" stroke="#059669" strokeWidth="1" strokeOpacity="0.4" />
        <ellipse cx="16" cy="46" rx="16" ry="8" fill="#A7F3D0" fillOpacity="0.4" stroke="#059669" strokeWidth="1" strokeOpacity="0.4" />

        {/* Middle Cylinder */}
        <path d="M 0 26 C 0 34 32 34 32 26 L 32 36 C 32 44 0 44 0 36 Z" fill="url(#diskGrad1)" stroke="#059669" strokeWidth="1" strokeOpacity="0.4" />
        <ellipse cx="16" cy="26" rx="16" ry="8" fill="#A7F3D0" fillOpacity="0.5" stroke="#059669" strokeWidth="1" strokeOpacity="0.4" />

        {/* Top Cylinder */}
        <path d="M 0 6 C 0 14 32 14 32 6 L 32 16 C 32 24 0 24 0 16 Z" fill="url(#diskGrad1)" stroke="#059669" strokeWidth="1" strokeOpacity="0.4" />
        <ellipse cx="16" cy="6" rx="16" ry="8" fill="#6EE7B7" fillOpacity="0.6" stroke="#059669" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Center: Columnar Distribution Histogram Bars (Parquet / Arrow) */}
      <g transform="translate(132, 20)">
        <rect x="0" y="38" width="8" height="38" rx="3" fill="url(#barGrad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="14" y="20" width="8" height="56" rx="3" fill="url(#barGrad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="28" y="8" width="8" height="68" rx="3" fill="url(#barGrad)" stroke="#059669" strokeWidth="1" strokeOpacity="0.6" />
        <rect x="42" y="28" width="8" height="48" rx="3" fill="url(#barGrad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="56" y="44" width="8" height="32" rx="3" fill="url(#barGrad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        {/* Baseline */}
        <line x1="-8" y1="76" x2="72" y2="76" stroke="#059669" strokeWidth="1.2" strokeOpacity="0.4" />
      </g>

      {/* Right: Dot-Matrix Cluster Grid & Data Brackets */}
      <g transform="translate(230, 30)">
        {/* Bracket Left */}
        <path d="M -6 6 L -14 6 L -14 46 L -6 46" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
        {/* 3x3 Dot Matrix */}
        <circle cx="2" cy="14" r="2.5" fill="#059669" fillOpacity="0.7" />
        <circle cx="16" cy="14" r="2.5" fill="#10B981" fillOpacity="0.5" />
        <circle cx="30" cy="14" r="2.5" fill="#34D399" fillOpacity="0.4" />
        <circle cx="2" cy="26" r="2.5" fill="#10B981" fillOpacity="0.6" />
        <circle cx="16" cy="26" r="3" fill="#059669" fillOpacity="0.8" />
        <circle cx="30" cy="26" r="2.5" fill="#10B981" fillOpacity="0.6" />
        <circle cx="2" cy="38" r="2.5" fill="#34D399" fillOpacity="0.4" />
        <circle cx="16" cy="38" r="2.5" fill="#10B981" fillOpacity="0.5" />
        <circle cx="30" cy="38" r="2.5" fill="#059669" fillOpacity="0.7" />
        {/* Bracket Right */}
        <path d="M 38 6 L 46 6 L 46 46 L 38 46" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      </g>

      {/* Connecting binary marks */}
      <path d="M 96 48 H 124" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
      <path d="M 204 48 H 222" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
    </svg>
  );

  const ToolPattern: React.FC = () => (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="gearGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="toolGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Center-Left: Precision Geometric Cog Gear */}
      <g transform="translate(100, 60)">
        {/* Gear teeth ring */}
        <circle cx="0" cy="0" r="26" fill="url(#gearGrad1)" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* 8 Gear Teeth */}
        <rect x="-4" y="-32" width="8" height="8" rx="1.5" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="-4" y="24" width="8" height="8" rx="1.5" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="-32" y="-4" width="8" height="8" rx="1.5" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="24" y="-4" width="8" height="8" rx="1.5" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="-22" y="-22" width="7" height="7" rx="1.5" transform="rotate(45 -18 -18)" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="15" y="15" width="7" height="7" rx="1.5" transform="rotate(45 18 18)" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="15" y="-22" width="7" height="7" rx="1.5" transform="rotate(45 18 -18)" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        <rect x="-22" y="15" width="7" height="7" rx="1.5" transform="rotate(45 -18 18)" fill="#F59E0B" fillOpacity="0.6" stroke="#D97706" strokeWidth="0.8" />
        {/* Center bore */}
        <circle cx="0" cy="0" r="10" fill="#FEF9E1" stroke="#D97706" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="4" fill="#D97706" fillOpacity="0.75" />
      </g>

      {/* Interlocking Small Gear */}
      <g transform="translate(150, 42)">
        <circle cx="0" cy="0" r="16" fill="url(#gearGrad1)" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="-2.5" y="-20" width="5" height="5" rx="1" fill="#F59E0B" fillOpacity="0.5" />
        <rect x="-2.5" y="15" width="5" height="5" rx="1" fill="#F59E0B" fillOpacity="0.5" />
        <rect x="-20" y="-2.5" width="5" height="5" rx="1" fill="#F59E0B" fillOpacity="0.5" />
        <rect x="15" y="-2.5" width="5" height="5" rx="1" fill="#F59E0B" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="6" fill="#FEF9E1" stroke="#D97706" strokeWidth="1" />
      </g>

      {/* Execution Circuit Trace & Logic Pins */}
      <path d="M 30 30 H 60 L 76 46 H 90" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      <circle cx="30" cy="30" r="3" fill="#D97706" fillOpacity="0.6" />
      <path d="M 30 90 H 70 L 86 74" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.4" fill="none" />
      <circle cx="30" cy="90" r="3" fill="#F59E0B" fillOpacity="0.5" />

      {/* Right: Modular Caliper Scale & Connector */}
      <g transform="translate(195, 36)">
        {/* Caliper rail */}
        <rect x="0" y="20" width="85" height="8" rx="2" fill="#FDE68A" fillOpacity="0.4" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
        {/* Measurement tick marks */}
        <line x1="10" y1="20" x2="10" y2="14" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="20" y1="20" x2="20" y2="16" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="30" y1="20" x2="30" y2="14" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="40" y1="20" x2="40" y2="16" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="50" y1="20" x2="50" y2="14" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="60" y1="20" x2="60" y2="16" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="70" y1="20" x2="70" y2="14" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Modular Slider Jaws */}
        <polygon points="32,8 48,8 48,20 42,26 38,26 32,20" fill="url(#toolGrad2)" stroke="#B45309" strokeWidth="1" />
        <circle cx="40" cy="14" r="2.5" fill="#FFFFFF" />

        {/* Output terminal connector */}
        <circle cx="85" cy="24" r="5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        <circle cx="100" cy="24" r="3" fill="#D97706" fillOpacity="0.75" />
        <line x1="90" y1="24" x2="97" y2="24" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.6" />
      </g>

      {/* Target Crosshair */}
      <circle cx="280" cy="80" r="12" stroke="#D97706" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
      <line x1="280" y1="64" x2="280" y2="96" stroke="#D97706" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="264" y1="80" x2="296" y2="80" stroke="#D97706" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );

  const AssetTypePattern: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
      case "Agent":
        return <AgentPattern />;
      case "Model":
        return <ModelPattern />;
      case "Dataset":
        return <DatasetPattern />;
      case "Tool":
        return <ToolPattern />;
      default:
        return <AgentPattern />;
    }
  };

  /* Pastel Theme Definitions from Image 1 */
  const ASSET_THEMES: Record<
    string,
    {
      bgLight: string;
      bgDark: string;
      borderLight: string;
      borderDark: string;
      hoverBorderLight: string;
      hoverBorderDark: string;
      bannerBgLight: string;
      bannerBgDark: string;
      badgeText: string;
      badgeIcon: React.ElementType;
    }
  > = {
    Agent: {
      bgLight: "bg-[#F4F0FF]", // Soft Lavender from Image 1 (Audio Lab)
      bgDark: "dark:bg-[#161324]",
      borderLight: "border-[#E1D7FC]",
      borderDark: "dark:border-purple-500/25",
      hoverBorderLight: "hover:border-[#C4B5FD]",
      hoverBorderDark: "dark:hover:border-purple-400/40",
      bannerBgLight: "bg-[#EAE3FB]",
      bannerBgDark: "dark:bg-[#201938]",
      badgeText: "text-purple-700 dark:text-purple-300",
      badgeIcon: Sparkles,
    },
    Model: {
      bgLight: "bg-[#EDF5FF]", // Soft Sky Blue from Image 1 (Deep Search)
      bgDark: "dark:bg-[#101726]",
      borderLight: "border-[#CCE3FD]",
      borderDark: "dark:border-sky-500/25",
      hoverBorderLight: "hover:border-[#93C5FD]",
      hoverBorderDark: "dark:hover:border-sky-400/40",
      bannerBgLight: "bg-[#DFEFFF]",
      bannerBgDark: "dark:bg-[#15233D]",
      badgeText: "text-sky-700 dark:text-sky-300",
      badgeIcon: BrainCircuit,
    },
    Dataset: {
      bgLight: "bg-[#E6F9F0]", // Soft Mint Green from Image 1 (Doc Synthesizer)
      bgDark: "dark:bg-[#0E1C15]",
      borderLight: "border-[#C3F2DC]",
      borderDark: "dark:border-emerald-500/25",
      hoverBorderLight: "hover:border-[#86EFAC]",
      hoverBorderDark: "dark:hover:border-emerald-400/40",
      bannerBgLight: "bg-[#D4F5E4]",
      bannerBgDark: "dark:bg-[#142B20]",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      badgeIcon: Database,
    },
    Tool: {
      bgLight: "bg-[#FEF9E1]", // Soft Butter Yellow from Image 1 (App Builder)
      bgDark: "dark:bg-[#1D1910]",
      borderLight: "border-[#FDECA8]",
      borderDark: "dark:border-amber-500/25",
      hoverBorderLight: "hover:border-[#FCD34D]",
      hoverBorderDark: "dark:hover:border-amber-400/40",
      bannerBgLight: "bg-[#FEF2C0]",
      bannerBgDark: "dark:bg-[#2C2413]",
      badgeText: "text-amber-800 dark:text-amber-300",
      badgeIcon: Wrench,
    },
  };

  const getCategoryLabel = (item: MarketplaceItemType) => {
    if (
      item.category === "AI / ML Models" ||
      item.badge?.toLowerCase() === "model"
    )
      return "Model";
    if (item.category === "Datasets" || item.badge?.toLowerCase() === "dataset")
      return "Dataset";
    if (item.category === "Agents" || item.badge?.toLowerCase() === "agent")
      return "Agent";
    if (item.category === "AI Tools" || item.badge?.toLowerCase() === "tool")
      return "Tool";
    return item.badge || item.category || "Asset";
  };

  const renderAssetCard = (item: MarketplaceItemType) => {
    const isLiked = likedIds.includes(item.id);
    const categoryLabel = getCategoryLabel(item);
    const theme = ASSET_THEMES[categoryLabel] || ASSET_THEMES.Agent;
    const CategoryIcon = theme.badgeIcon;
    const orgInitials = item.author.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        key={item.id}
        onClick={() => setSelectedAsset(item)}
        className="group relative bg-white dark:bg-[#131317] border border-slate-200/90 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 rounded-[22px] p-3.5 sm:p-4 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:-translate-y-1 flex flex-col justify-between"
      >
        <div>
          {/* Top Part: Category Shapes & Pattern Header Container */}
          <div
            className={`w-full h-28 sm:h-32 rounded-[16px] overflow-hidden relative flex items-center justify-center ${theme.bannerBgLight} ${theme.bannerBgDark} border ${theme.borderLight} ${theme.borderDark} shadow-inner`}
          >
            {/* The Distinct Category SVG Pattern */}
            <AssetTypePattern type={categoryLabel} />

            {/* Floating Top-Right Price Badge */}
            <div className="absolute top-2.5 right-2.5 z-10">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-2xs bg-white dark:bg-zinc-800 border border-slate-200/90 dark:border-zinc-700/80 ${
                  item.tier === "Free"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {item.price}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mt-3.5">
            <h3 className="text-[14px] sm:text-[15px] font-black text-slate-900 dark:!text-white group-hover:text-[#FF6B00] transition-colors line-clamp-1 tracking-tight">
              {item.name}
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:!text-zinc-300 line-clamp-2 leading-relaxed min-h-[34px]">
              {item.tagline}
            </p>
          </div>

          {/* Metadata Row: Clean Org Badge & Rating */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
            {/* Publisher: Clean Initials Badge */}
            <div
              className="flex items-center gap-1.5 min-w-0"
              title={item.author.name}
            >
              <div className="w-5 h-5 rounded-md bg-slate-50 dark:bg-zinc-800 border border-slate-200/90 dark:border-zinc-700 flex items-center justify-center text-[9px] font-bold text-slate-800 dark:text-zinc-200 shrink-0 shadow-2xs">
                {orgInitials}
              </div>
              <span className="text-xs text-slate-700 dark:text-zinc-300 font-medium truncate max-w-[105px]">
                {item.author.name}
              </span>
            </div>

            {/* Rating & Runs */}
            <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-zinc-200 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
              <span className="text-slate-500 dark:text-zinc-400 font-normal text-[11px]">
                ({item.runs})
              </span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAsset(item);
            }}
            className="group/btn flex-1 h-8 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>

          <button
            onClick={(e) => toggleLike(item, e)}
            className={`h-8 w-8 rounded-xl border transition-colors shadow-2xs flex items-center justify-center cursor-pointer ${
              isLiked
                ? "border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 text-amber-500"
                : "border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            }`}
            title={isLiked ? "Saved to assets" : "Save asset"}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isLiked ? "fill-amber-500 text-amber-500" : ""}`}
            />
          </button>
        </div>
      </div>
    );
  };

  /* SECTION RENDERER */
  const renderSection = (
    title: string,
    sectionItems: MarketplaceItemType[],
    allCategoryItems: MarketplaceItemType[],
    icon?: React.ReactNode,
    categoryKey?: string,
  ) => {
    if (sectionItems.length === 0) return null;

    // Show up to 4 items in the preview grid on home
    const displayItems = sectionItems.slice(0, 4);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate tracking-tight">
              {title}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
              {sectionItems.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setViewingCategoryModal({
                title,
                items: allCategoryItems.length > 0 ? allCategoryItems : sectionItems,
                categoryKey,
              });
              setModalSearchQuery("");
              setModalPricingFilter("All");
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00] transition-colors py-1.5 px-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer group/see"
          >
            <span>See all</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/see:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayItems.map(renderAssetCard)}
        </div>
      </div>
    );
  };

  const trendingItems = getFilteredItems(items.filter((i) => i.isTrending));
  const datasetItems = getFilteredItems(
    items.filter((i) => i.category === "Datasets"),
  );
  const modelItems = getFilteredItems(
    items.filter((i) => i.category === "AI / ML Models"),
  );
  const agentItems = getFilteredItems(
    items.filter((i) => i.category === "Agents"),
  );
  const toolItems = getFilteredItems(
    items.filter((i) => i.category === "AI Tools"),
  );

  // Filtered items inside the "See all" category modal
  const modalFilteredItems = viewingCategoryModal
    ? viewingCategoryModal.items.filter((item) => {
        const matchesSearch =
          !modalSearchQuery ||
          item.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
          item.tagline.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
          item.author.name.toLowerCase().includes(modalSearchQuery.toLowerCase());
        const matchesPricing =
          modalPricingFilter === "All" ||
          (modalPricingFilter === "Free" && item.price === "Free") ||
          (modalPricingFilter === "Paid" && item.price !== "Free");
        return matchesSearch && matchesPricing;
      })
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && viewingCategoryModal) {
        setViewingCategoryModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewingCategoryModal]);

  return (
    <SidebarShell>
      <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-y-auto bg-[#F8F9FA] dark:bg-[#0C0C0E] [scrollbar-width:thin]">
        {/* Rivinity Global Header */}
        <header className="relative flex h-16 shrink-0 items-center justify-between gap-3 bg-transparent px-4 sm:h-20 sm:px-8 border-b border-border/40 select-none">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5">
            <div className="relative flex items-center w-full max-w-sm sm:max-w-md h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 px-3.5 gap-2.5 focus-within:border-[#FF6B00]/70 focus-within:ring-2 focus-within:ring-[#FF6B00]/10 transition-all shadow-2xs">
              <Search
                className="h-4 w-4 text-slate-400 dark:text-zinc-500 shrink-0"
                strokeWidth={2}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search marketplace, agents, models..."
                className="h-full w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[13px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filter Button near Search Box */}
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold cursor-pointer transition-all shadow-2xs ${
                  isFilterOpen || selectedTypes.length > 0 || selectedPricing.length > 0
                    ? 'border-[#FF6B00]/70 bg-orange-50/70 dark:bg-orange-950/30 text-[#FF6B00]'
                    : 'border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filters</span>
                {(selectedTypes.length > 0 || selectedPricing.length > 0) && (
                  <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#FF6B00] text-[10px] font-bold text-white">
                    {selectedTypes.length + selectedPricing.length}
                  </span>
                )}
              </button>

              {/* Filter Popover Dropdown */}
              {isFilterOpen && (
                <div className="absolute left-0 top-12 z-50 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#131317] border border-slate-200/90 dark:border-zinc-800 p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B00]" /> Filter Assets
                    </span>
                    {(selectedTypes.length > 0 || selectedPricing.length > 0) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTypes([]);
                          setSelectedPricing([]);
                        }}
                        className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05e00] bg-transparent border-none p-0 outline-none hover:underline cursor-pointer"
                      >
                        Reset all
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="py-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2">Category</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Datasets', 'AI / ML Models', 'Agents', 'AI Tools'].map((cat) => {
                        const isSelected = selectedTypes.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              if (isSelected) setSelectedTypes(selectedTypes.filter(t => t !== cat));
                              else setSelectedTypes([...selectedTypes, cat]);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-orange-50 dark:bg-orange-950/40 border-[#FF6B00]/70 text-[#FF6B00]'
                                : 'bg-slate-50 dark:bg-zinc-800/80 border-slate-200/80 dark:border-zinc-700/80 text-slate-600 dark:text-zinc-300 hover:border-slate-300'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing Tier */}
                  <div className="pt-2.5 pb-1 border-t border-slate-100 dark:border-zinc-800">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2">Pricing</span>
                    <div className="flex gap-2">
                      {['Free', 'Paid'].map((tier) => {
                        const isSelected = selectedPricing.includes(tier);
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => {
                              if (isSelected) setSelectedPricing(selectedPricing.filter(t => t !== tier));
                              else setSelectedPricing([...selectedPricing, tier]);
                            }}
                            className={`flex-1 py-1 px-3 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-orange-50 dark:bg-orange-950/40 border-[#FF6B00]/70 text-[#FF6B00]'
                                : 'bg-slate-50 dark:bg-zinc-800/80 border-slate-200/80 dark:border-zinc-700/80 text-slate-600 dark:text-zinc-300 hover:border-slate-300'
                            }`}
                          >
                            {tier} Assets
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Done Button */}
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full py-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-[#FF6B00]/25 cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Publish Asset Button */}
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="flex h-10 items-center gap-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white px-3.5 shadow-sm shadow-[#FF6B00]/25 transition-all text-xs font-semibold cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Publish Asset</span>
            </button>

            {/* Saved Assets / Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 shadow-2xs transition-all hover:border-[#FF6B00]/40 hover:bg-orange-50/20 text-xs font-semibold text-slate-700 dark:text-zinc-200 cursor-pointer"
              title="Saved items"
            >
              <Bookmark className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
              <span className="hidden sm:inline">Saved</span>
              {cartItems.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#FF6B00] text-white text-[10px] font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Marketplace Content Sections inside Container */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 flex justify-center">
          <div className="w-full max-w-[1360px] bg-white dark:bg-[#111115] rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 shadow-xs p-4 sm:p-6 space-y-6">
            {/* Category Filter Pills Bar */}
            <div>
              <MarketplaceCategory
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* 1. Trending Assets This Week */}
            {trendingItems.length > 0 &&
              renderSection(
                "Trending Assets This Week",
                trendingItems,
                items.filter((i) => i.isTrending),
                <TrendingUp className="w-4 h-4 text-[#FF6B00]" />,
                "trending"
              )}

            {/* 2. Datasets */}
            {datasetItems.length > 0 && (
              <div className="pt-4">
                {renderSection(
                  "Datasets",
                  datasetItems,
                  items.filter(
                    (i) =>
                      i.category === "Datasets" ||
                      i.badge?.toLowerCase() === "dataset",
                  ),
                  <Database className="w-4 h-4 text-[#059669]" />,
                  "Datasets"
                )}
              </div>
            )}

            {/* 3. AI / ML Models */}
            {modelItems.length > 0 && (
              <div className="pt-4">
                {renderSection(
                  "AI / ML Models",
                  modelItems,
                  items.filter(
                    (i) =>
                      i.category === "AI / ML Models" ||
                      i.badge?.toLowerCase() === "model",
                  ),
                  <BrainCircuit className="w-4 h-4 text-[#0284C7]" />,
                  "Models"
                )}
              </div>
            )}

            {/* 4. Agents */}
            {agentItems.length > 0 && (
              <div className="pt-4">
                {renderSection(
                  "Agents",
                  agentItems,
                  items.filter(
                    (i) =>
                      i.category === "Agents" ||
                      i.badge?.toLowerCase() === "agent",
                  ),
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" />,
                  "Agents"
                )}
              </div>
            )}

            {/* 5. AI Tools */}
            {toolItems.length > 0 && (
              <div className="pt-4">
                {renderSection(
                  "AI Tools",
                  toolItems,
                  items.filter(
                    (i) =>
                      i.category === "AI Tools" ||
                      i.badge?.toLowerCase() === "tool",
                  ),
                  <Wrench className="w-4 h-4 text-[#D97706]" />,
                  "Tools"
                )}
              </div>
            )}
          </div>
        </main>

        {/* SEE ALL CATEGORY POPUP MODAL */}
        {viewingCategoryModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setViewingCategoryModal(null)}
          >
            <div
              className="relative flex flex-col w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#131317] rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {viewingCategoryModal.title}
                      </h2>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
                        {viewingCategoryModal.items.length} Total
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      Explore all verified {viewingCategoryModal.title.toLowerCase()} available on the platform
                    </p>
                  </div>
                </div>

                {/* Filter and Search inside Modal */}
                <div className="flex items-center gap-2.5">
                  {/* Search inside modal */}
                  <div className="relative flex items-center h-9 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 px-3 gap-2 w-48 sm:w-60 focus-within:border-[#FF6B00] transition-all shadow-2xs">
                    <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
                    <input
                      type="text"
                      value={modalSearchQuery}
                      onChange={(e) => setModalSearchQuery(e.target.value)}
                      placeholder={`Search ${viewingCategoryModal.title.toLowerCase()}...`}
                      className="w-full bg-transparent border-none outline-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                    />
                    {modalSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setModalSearchQuery("")}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Pricing Toggle Chips */}
                  <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/70 dark:border-zinc-800 text-[11px] font-semibold">
                    {(["All", "Free", "Paid"] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setModalPricingFilter(tier)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          modalPricingFilter === tier
                            ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-2xs font-bold"
                            : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>

                  {/* Close Modal Button */}
                  <button
                    type="button"
                    onClick={() => setViewingCategoryModal(null)}
                    className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer shrink-0 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body / Cards Grid */}
              <div className="flex-1 overflow-y-auto p-6 [scrollbar-width:thin]">
                {modalFilteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {modalFilteredItems.map(renderAssetCard)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                      <Search className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      No matching assets found
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mt-1">
                      No {viewingCategoryModal.title.toLowerCase()} match your current search or filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setModalSearchQuery("");
                        setModalPricingFilter("All");
                      }}
                      className="mt-3.5 px-3 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      Clear search & filters
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                <span>
                  Showing {modalFilteredItems.length} of {viewingCategoryModal.items.length} assets
                </span>
                <button
                  type="button"
                  onClick={() => setViewingCategoryModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DETAIL POPUP MODAL */}
        <MarketplaceItem
          item={selectedAsset}
          isOpen={!!selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onDeploy={(item) => {
            setCheckoutItem(item);
            setSelectedAsset(null);
          }}
        />

        {/* CART DRAWER */}
        <MarketplaceCart
          isOpen={isCartOpen}
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemove={(id) =>
            setCartItems((prev) => prev.filter((c) => c.id !== id))
          }
          onCheckout={(item) => {
            setIsCartOpen(false);
            setCheckoutItem(item);
          }}
        />

        {/* CHECKOUT MODAL */}
        <MarketplaceCheckout
          item={checkoutItem}
          isOpen={!!checkoutItem}
          onClose={() => setCheckoutItem(null)}
        />

        {/* PUBLISH ASSET MODAL */}
        <MarketplaceUpload
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUpload={(newItem) => {
            setItems((prev) => [newItem, ...prev]);
          }}
        />
      </div>
    </SidebarShell>
  );
};

export default MarketplaceHome;
