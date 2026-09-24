"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Moon, 
  ChevronDown, 
  Search, 
  Bell,
  SlidersHorizontal,
  Star,
  Heart,
  SendHorizontal,
  Bot,
  BrainCircuit,
  Database,
  Wrench,
  TrendingUp,
  Sparkles,
  Plus,
  Bookmark,
  Server
} from 'lucide-react';

import SidebarShell from "@/components/canvas/SidebarShell";
import { USER } from "@/lib/profile";
import MarketplaceItem, { MarketplaceItemType } from './MarketplaceItem';
import MarketplaceCategory from './MarketplaceCategory';
import MarketplaceCart from './MarketplaceCart';
import MarketplaceCheckout from './MarketplaceCheckout';
import MarketplaceUpload from './MarketplaceUpload';
import AgentAsAService from './AgentAsAService';
import CloudServices from './CloudServices';

const INITIAL_MARKETPLACE_ITEMS: MarketplaceItemType[] = [
  // Trending Assets
  {
    id: 'lyra-whisper-pro',
    name: 'Lyra Whisper Pro',
    category: 'AI / ML Models',
    badge: 'model',
    tagline: 'Speech-to-text optimized for noisy environments.',
    description: 'Ultra-low latency speech recognition fine-tuned for high-noise acoustic environments with support for 50+ languages.',
    rating: 4.5,
    runs: '21.3k',
    price: 'Free',
    tier: 'Free',
    author: { name: 'Rivinity Audio', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80' },
    capabilities: ['Dynamic Noise Reduction', 'Real-time WebSocket Streaming', 'Multilingual 50+'],
    specs: { framework: 'Whisper / PyTorch', license: 'MIT License', version: 'v2.4.0', updatedAt: '2 days ago' },
    isTrending: true
  },
  {
    id: 'global-sentiment-v3',
    name: 'GlobalSentiment v3.1',
    category: 'Datasets',
    badge: 'dataset',
    tagline: 'Multilingual social-media sentiment corpus.',
    description: 'Over 8.5M annotated conversational snippets cleaned for fine-tuning LLMs, sentiment analysis, and emotion classification.',
    rating: 4.8,
    runs: '12.5k',
    price: 'Free',
    tier: 'Free',
    author: { name: 'NexusData', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80' },
    capabilities: ['8.5M Annotated Rows', 'Cross-Lingual Vectors', 'Emotion Multi-label'],
    specs: { framework: 'Parquet / Arrow', license: 'CC-BY-4.0', version: 'v3.1.0', updatedAt: '1 week ago' },
    isTrending: true
  },
  {
    id: 'flow-canvas',
    name: 'FlowCanvas Agent',
    category: 'Agents',
    badge: 'agent',
    tagline: 'Design-to-code generative frontend builder.',
    description: 'Converts wireframes, natural language prompts, and component tokens into ready-to-run React/Next.js interfaces.',
    rating: 4.9,
    runs: '4.8k',
    price: '$29',
    tier: 'Paid',
    author: { name: 'Canvas AI', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80' },
    capabilities: ['Tailwind Code Synthesis', 'Interactive Preview', 'State Wiring'],
    specs: { framework: 'LangChain / Claude-3.5', license: 'Commercial Standard', version: 'v1.2.0', updatedAt: '3 days ago' },
    isTrending: true
  },
  {
    id: 'deep-eval-kit',
    name: 'DeepEval Matrix',
    category: 'AI Tools',
    badge: 'tool',
    tagline: 'Automated bias, toxicity & hallucination detector.',
    description: 'Continuous unit testing pipeline for generative AI outputs with red-teaming presets and semantic drift alarms.',
    rating: 4.6,
    runs: '9.2k',
    price: '$19',
    tier: 'Paid',
    author: { name: 'Aegis Labs', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80' },
    capabilities: ['Toxicity Probing', 'Hallucination Boundary Checks', 'CI/CD Webhooks'],
    specs: { framework: 'Python / FastAPI', license: 'Apache 2.0', version: 'v3.0.1', updatedAt: '5 days ago' },
    isTrending: true
  },

  // Datasets
  {
    id: 'bio-med-qa',
    name: 'BioMedQA 500k',
    category: 'Datasets',
    badge: 'dataset',
    tagline: 'PubMed clinical question-answer reasoning pairs.',
    description: 'Standardized clinical evaluation dataset with expert rationale explanations, diagnostic ICD-10 tags, and reference links.',
    rating: 4.9,
    runs: '7.4k',
    price: '$49',
    tier: 'Paid',
    author: { name: 'Helix Science', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80' },
    capabilities: ['500,000 Verified QAs', 'ICD-10 Mapped', 'Peer-Reviewed'],
    specs: { framework: 'JSON Lines / Parquet', license: 'ODC-BY', version: 'v2.0.0', updatedAt: '2 weeks ago' }
  },
  {
    id: 'code-instruct-poly',
    name: 'PolyGlot CodeInstruct',
    category: 'Datasets',
    badge: 'dataset',
    tagline: '1.2M instruction-following coding challenges.',
    description: 'Curated algorithmic tasks and real-world repository PR reviews spanning 18 programming languages.',
    rating: 4.7,
    runs: '18.9k',
    price: 'Free',
    tier: 'Free',
    author: { name: 'OpenCode Lab', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80' },
    capabilities: ['18 Languages Covered', 'Exec Test Suites Included', 'Clean Deduped'],
    specs: { framework: 'HuggingFace Datasets', license: 'MIT License', version: 'v1.4.2', updatedAt: '3 days ago' }
  },
  {
    id: 'legal-corpus-india',
    name: 'BharatLegal Precedent Corpus',
    category: 'Datasets',
    badge: 'dataset',
    tagline: 'Supreme Court & High Court digitized judgments.',
    description: 'Comprehensive, structured dataset of legal rulings, case citations, and statute cross-references from 1950 to 2024.',
    rating: 4.8,
    runs: '3.1k',
    price: '$89',
    tier: 'Premium',
    author: { name: 'Vidhi Data', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80' },
    capabilities: ['Judicial Headnotes', 'Statutory Cross-References', 'Bilingual EN/HI'],
    specs: { framework: 'Postgres / Parquet', license: 'Commercial Non-Exclusive', version: 'v4.1.0', updatedAt: '1 month ago' }
  },
  {
    id: 'multimodal-vision-dialog',
    name: 'VisionChat OmniSet',
    category: 'Datasets',
    badge: 'dataset',
    tagline: 'Image-grounded multi-turn conversational data.',
    description: 'High-resolution image captions, spatial bounding boxes, and complex visual reasoning dialogues.',
    rating: 4.6,
    runs: '8.7k',
    price: 'Free',
    tier: 'Free',
    author: { name: 'VisionWorks', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80' },
    capabilities: ['Bounding Boxes', 'Spatial Reasoning', '4K High Res'],
    specs: { framework: 'WebDataset / Arrow', license: 'CC-BY-SA-4.0', version: 'v2.2.0', updatedAt: '1 week ago' }
  },

  // AI / ML Models
  {
    id: 'rivinity-coder-14b',
    name: 'RivinityCoder 14B',
    category: 'AI / ML Models',
    badge: 'model',
    tagline: 'Code generation across 30 languages.',
    description: 'Enterprise code-completion and refactoring engine with fill-in-the-middle support and unit test generator.',
    rating: 4.7,
    runs: '6.1k',
    price: '$69',
    tier: 'Paid',
    author: { name: 'Rivinity Foundry', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80' },
    capabilities: ['Unit Test Synthesis', 'Fill-in-the-middle', '32k Context'],
    specs: { framework: 'vLLM / Transformers', license: 'Commercial SaaS', version: 'v3.0.0', updatedAt: '1 week ago' }
  },
  {
    id: 'embed-dense-v2',
    name: 'EmbedDense Vector 1024',
    category: 'AI / ML Models',
    badge: 'model',
    tagline: 'High-density multilingual text embeddings.',
    description: 'Top-tier MTEB benchmark embedding model specialized for semantic enterprise search and RAG retrieval pipelines.',
    rating: 4.9,
    runs: '38.1k',
    price: 'Free',
    tier: 'Free',
    author: { name: 'Rivinity Core', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80' },
    capabilities: ['1024 Dimensions', 'MTEB Leaderboard Top 5', 'Cosine Matched'],
    specs: { framework: 'HuggingFace / PyTorch', license: 'Apache 2.0', version: 'v2.1.0', updatedAt: '6 days ago' }
  },
  {
    id: 'neural-tts-fluid',
    name: 'FluidVoice TTS',
    category: 'AI / ML Models',
    badge: 'model',
    tagline: 'Natural expressive text-to-speech engine.',
    description: 'Low-latency emotive neural voice synthesizer with dynamic pitch control and conversational turn handling.',
    rating: 4.6,
    runs: '15.7k',
    price: '$45',
    tier: 'Paid',
    author: { name: 'AudioStream', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80' },
    capabilities: ['Realtime Streaming', 'Emotive Inflection', 'Zero-shot Cloning'],
    specs: { framework: 'ONNX / WebAssembly', license: 'Commercial', version: 'v1.3.0', updatedAt: '2 weeks ago' }
  },

  // Agents
  {
    id: 'sage-research-agent',
    name: 'Sage Research Agent',
    category: 'Agents',
    badge: 'agent',
    tagline: 'Autonomous deep research with citation graph.',
    description: 'Crawls scientific papers, cross-verifies claims, extracts statistical tables, and compiles cohesive reports.',
    rating: 4.8,
    runs: '1.8k',
    price: '$24',
    tier: 'Paid',
    author: { name: 'Nexus Agents', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80' },
    capabilities: ['Autonomous Web Scraping', 'Graph Reasoning', 'Source Citations'],
    specs: { framework: 'LangGraph / Llama-3', license: 'Commercial Per-Seat', version: 'v1.6.4', updatedAt: 'Yesterday' }
  },
  {
    id: 'quill-marketing-crew',
    name: 'Quill Marketing Crew',
    category: 'Agents',
    badge: 'agent',
    tagline: 'Multi-agent content strategist, copywriter & SEO.',
    description: 'Three coordinated agents that draft content calendars, generate SEO-friendly blogs, and produce social distribution variants.',
    rating: 4.7,
    runs: '4.2k',
    price: '$35',
    tier: 'Paid',
    author: { name: 'Quill AI', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80' },
    capabilities: ['Multi-agent Coordination', 'SEO Keyword Clustering', 'Variant Generator'],
    specs: { framework: 'CrewAI / GPT-4o', license: 'Commercial License', version: 'v2.0.1', updatedAt: '4 days ago' }
  },

  // AI Tools
  {
    id: 'schemacraft-db',
    name: 'SchemaCraft',
    category: 'AI Tools',
    badge: 'tool',
    tagline: 'Natural language database schema designer.',
    description: 'Generates normalized SQL migrations, ER diagrams, and mock seed records from business requirements.',
    rating: 4.9,
    runs: '11.2k',
    price: '$15',
    tier: 'Premium',
    author: { name: 'DataPrism', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80' },
    capabilities: ['Text-to-SQL', 'Self-Healing Schema', 'Warehouse Sandboxing'],
    specs: { framework: 'DuckDB / LangChain', license: 'Commercial License', version: 'v2.1.2', updatedAt: '1 week ago' }
  },
  {
    id: 'vector-inspector',
    name: 'Vector Inspector Pro',
    category: 'AI Tools',
    badge: 'tool',
    tagline: 'Visual embedding clusters & search debugger.',
    description: 'Explore Pinecone, Qdrant, and Milvus collections with 3D UMAP projection and cosine similarity debug inspect.',
    rating: 4.8,
    runs: '8.4k',
    price: 'Free',
    tier: 'Free',
    author: { name: 'Nexus Tools', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80' },
    capabilities: ['3D UMAP Visualizer', 'Recall Diagnostic', 'Live Re-ranking'],
    specs: { framework: 'Three.js / WebGL', license: 'MIT License', version: 'v3.1.2', updatedAt: '4 days ago' }
  },
  {
    id: 'prompt-evaluator',
    name: 'PromptEvaluator',
    category: 'AI Tools',
    badge: 'tool',
    tagline: 'Automated CI/CD evaluation matrix for LLMs.',
    description: 'Unit tests for prompt regression, hallucination detection, latency scoring, and output drift measurement.',
    rating: 4.7,
    runs: '5.2k',
    price: '$39',
    tier: 'Paid',
    author: { name: 'TestMatrix', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80' },
    capabilities: ['Hallucination Score', 'Automated Regression', 'CI/CD Webhook'],
    specs: { framework: 'Docker / PyTest', license: 'Commercial', version: 'v1.9.0', updatedAt: '1 week ago' }
  }
];

export const MarketplaceHome: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItemType[]>(INITIAL_MARKETPLACE_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState<MarketplaceItemType | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<MarketplaceItemType | null>(null);
  const [cartItems, setCartItems] = useState<MarketplaceItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Expanded State for "See All" in each section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    trending: false,
    datasets: false,
    models: false,
    agents: false,
    tools: false
  });

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleLike = (item: MarketplaceItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
    setCartItems(prev => prev.some(c => c.id === item.id) ? prev.filter(c => c.id !== item.id) : [...prev, item]);
  };

  const getFilteredItems = (rawItems: MarketplaceItemType[]) => {
    return rawItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategoryPill = selectedCategory === 'All' || 
        (selectedCategory === 'Agents' && item.category === 'Agents') ||
        (selectedCategory === 'ML Models' && item.category === 'AI / ML Models') ||
        (selectedCategory === 'Datasets' && item.category === 'Datasets') ||
        (selectedCategory === 'AI Tools' && item.category === 'AI Tools');

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.category);
      const matchesPricing = selectedPricing.length === 0 || 
        (selectedPricing.includes('Free') && item.price === 'Free') ||
        (selectedPricing.includes('Paid') && item.price !== 'Free');

      return matchesSearch && matchesCategoryPill && matchesType && matchesPricing;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Agents': return <Bot className="w-5 h-5 text-[#FF5500]" />;
      case 'AI / ML Models': return <BrainCircuit className="w-5 h-5 text-[#FF5500]" />;
      case 'Datasets': return <Database className="w-5 h-5 text-[#FF5500]" />;
      case 'AI Tools': return <Wrench className="w-5 h-5 text-[#FF5500]" />;
      default: return <Sparkles className="w-5 h-5 text-[#FF5500]" />;
    }
  };

  const renderDribbbleCard = (item: MarketplaceItemType) => {
    const isLiked = likedIds.includes(item.id);
    return (
      <div
        key={item.id}
        onClick={() => setSelectedAsset(item)}
        className="group relative bg-[#fcfcfd] dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 hover:border-[#FF5500]/40 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#FF5500]/5 flex flex-col justify-between"
      >
        <div>
          {/* Top Graphic Banner */}
          <div className="relative h-28 w-full rounded-xl overflow-hidden bg-gradient-to-br from-orange-50/70 via-slate-100/60 to-slate-200/40 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 border border-slate-200/50 dark:border-white/5 flex items-center justify-center p-3">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF5500_1.2px,transparent_1.2px)] [background-size:10px_10px]" />

            <div className="absolute left-3 bottom-2.5 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-orange-100 dark:border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              {getCategoryIcon(item.category)}
            </div>

            <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-white/10 shadow-2xs">
              {item.badge}
            </span>
          </div>

          <div className="mt-3.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#FF5500] transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed h-8">
              {item.tagline}
            </p>
          </div>

          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-zinc-300">
              <Star className="w-3.5 h-3.5 fill-[#FF5500] text-[#FF5500]" />
              <span>{item.rating}</span>
              <span className="text-slate-400 dark:text-zinc-500 font-normal">({item.runs})</span>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <img 
                src={item.author.avatar} 
                alt={item.author.name}
                className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-white/10" 
              />
              <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium truncate">{item.author.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAsset(item);
            }}
            className="flex-1 py-1.5 bg-white dark:bg-zinc-800 hover:bg-[#FF5500] hover:text-white dark:hover:bg-[#FF5500] text-slate-800 dark:text-zinc-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#FF5500] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs group/btn active:scale-98 cursor-pointer"
          >
            <SendHorizontal className="w-3 h-3 rotate-45 group-hover/btn:translate-x-0.5 transition-transform" /> 
            Inspect
          </button>

          <button
            onClick={(e) => toggleLike(item, e)}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 hover:bg-orange-50/50 text-slate-400 hover:text-[#FF5500] transition-colors shadow-2xs cursor-pointer"
            title={isLiked ? "Saved to assets" : "Save asset"}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#FF5500] text-[#FF5500]' : ''}`} />
          </button>
        </div>
      </div>
    );
  };

  /* SECTION RENDERER */
  const renderSection = (title: string, subtitle: string, sectionItems: MarketplaceItemType[], sectionKey: string, icon?: React.ReactNode) => {
    if (sectionItems.length === 0) return null;

    const isExpanded = expandedSections[sectionKey];
    const total = sectionItems.length;
    const hasMore = total > 4;
    const visibleItems = isExpanded ? sectionItems : sectionItems.slice(0, 4);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {icon}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate tracking-tight">{title}</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{subtitle}</p>
          </div>

          {hasMore && (
            <button
              onClick={() => toggleSection(sectionKey)}
              className="text-xs font-bold text-[#FF5500] hover:text-[#e04b00] px-3 py-1.5 rounded-xl hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
            >
              {isExpanded ? 'Show Less' : `See All (${total})`}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleItems.map(renderDribbbleCard)}
        </div>
      </div>
    );
  };

  const trendingItems = getFilteredItems(items.filter(i => i.isTrending));
  const datasetItems = getFilteredItems(items.filter(i => i.category === 'Datasets'));
  const modelItems = getFilteredItems(items.filter(i => i.category === 'AI / ML Models'));
  const agentItems = getFilteredItems(items.filter(i => i.category === 'Agents'));
  const toolItems = getFilteredItems(items.filter(i => i.category === 'AI Tools'));

  return (
    <SidebarShell>
      <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-y-auto bg-[#FAF9F7] dark:bg-zinc-950 [scrollbar-width:thin]">
        {/* Rivinity Global Header */}
        <header className="relative flex h-16 shrink-0 items-center justify-between gap-3 bg-transparent px-4 sm:h-20 sm:px-8 border-b border-border/40 select-none">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="w-full max-w-[420px] items-center flex">
              <div
                className={`relative flex items-center transition-all duration-300 ease-out ${
                  searchQuery ? "w-[340px]" : "w-11 sm:w-64 hover:w-[340px] focus-within:w-[340px]"
                }`}
              >
                <Search className="pointer-events-none absolute left-3.5 z-10 h-4.5 w-4.5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search marketplace, agents, models..."
                  className="h-10 w-full cursor-pointer rounded-full border border-transparent bg-transparent pl-10 pr-9 text-[13px] text-[#1C1C1C] outline-none placeholder:text-gray-400 hover:border-black/10 focus:cursor-text focus:border-[#FF5500]/40 focus:bg-white focus:ring-2 focus:ring-[#FF5500]/10 dark:text-white dark:hover:border-white/10 dark:focus:border-[#FF5500]/40 dark:focus:bg-zinc-900"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <X className="h-4 w-4 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Publish Asset Button */}
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#FF5500] hover:bg-[#e04b00] text-white px-3.5 shadow-sm shadow-[#FF5500]/25 transition-all text-xs font-semibold cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Publish Asset</span>
            </button>

            {/* Saved Assets / Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex h-10 items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 shadow-xs transition-all hover:border-[#FF5500]/40 hover:bg-orange-50/20 text-xs font-semibold text-slate-700 dark:text-zinc-200 cursor-pointer"
              title="Saved items"
            >
              <Bookmark className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
              <span className="hidden sm:inline">Saved</span>
              {cartItems.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#FF5500] text-white text-[10px] font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Right Filter Drawer Button */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex h-10 items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 shadow-xs transition-all hover:border-[#FF5500]/30 hover:bg-orange-50/20 text-xs font-semibold text-slate-700 dark:text-zinc-200 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-slate-600 dark:text-zinc-300" />
              <span className="hidden sm:inline">Filters</span>
              {(selectedTypes.length > 0 || selectedPricing.length > 0) && (
                <span className="h-2 w-2 rounded-full bg-[#FF5500]" />
              )}
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white shadow-xs transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <Bell className="h-4.5 w-4.5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={1.9} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF5500] ring-2 ring-white dark:ring-zinc-900" />
            </button>

            {/* Theme */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white shadow-xs transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <Moon className="h-4.5 w-4.5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={1.9} />
            </button>

            {/* User Profile */}
            <div className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-gray-200/80 bg-white pl-1.5 pr-2.5 shadow-xs transition-colors hover:bg-gray-50/80 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:pr-3.5">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#FF5500] text-[11px] sm:text-[12px] font-bold text-white shadow-xs">
                {USER.initials}
              </div>
              <div className="hidden text-left leading-tight md:block">
                <p className="text-[12.5px] font-semibold tracking-tight text-[#1C1C1C] dark:text-white">
                  {USER.name}
                </p>
                <p className="text-[10.5px] font-normal text-gray-500 dark:text-gray-400">
                  {USER.plan}
                </p>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 text-[#1C1C1C] dark:text-zinc-200 md:block" strokeWidth={2} />
            </div>
          </div>
        </header>

        {/* Marketplace Content Sections inside Container */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 flex justify-center">
          <div className="w-full max-w-[1360px] bg-white dark:bg-zinc-900/60 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-xs p-4 sm:p-8 space-y-8">
            
            {/* Category Filter Pills Bar */}
            <div className="pb-4 border-b border-slate-100 dark:border-white/10">
              <MarketplaceCategory
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* 1. Trending Assets This Week */}
            {renderSection(
              'Trending Assets This Week',
              'The most downloaded datasets and models across the ecosystem.',
              trendingItems,
              'trending',
              <TrendingUp className="w-4 h-4 text-[#FF5500]" />
            )}

            {/* 2. Datasets */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
              {renderSection(
                'Datasets',
                'Curated, license-clear data for training and evaluation.',
                datasetItems,
                'datasets'
              )}
            </div>

            {/* 3. AI / ML Models */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
              {renderSection(
                'AI / ML Models',
                'Open and commercial weights with deployment recipes.',
                modelItems,
                'models'
              )}
            </div>

            {/* 4. Agents */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
              {renderSection(
                'Agents',
                'Autonomous and crew-style agents for any domain.',
                agentItems,
                'agents'
              )}
            </div>

            {/* 5. AI Tools */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
              {renderSection(
                'AI Tools',
                'Productivity, workflow, vision, marketing and more.',
                toolItems,
                'tools'
              )}
            </div>

            {/* 6. Cloud Compute & Agent-as-a-Service Infrastructure */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-white/10 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Server className="w-4 h-4 text-[#FF5500]" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Serverless Gateway &amp; Compute Cluster
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Dedicated NVIDIA H100 clusters and sub-millisecond API endpoints for subscribed assets.
                </p>
              </div>

              <CloudServices />
              <AgentAsAService />
            </div>

          </div>
        </main>

        {/* RIGHT SIDE FILTER DRAWER */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-md">
            <div className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#FF5500]" /> Filter Assets
                  </h3>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Checkboxes */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Category</span>
                  {['Datasets', 'AI / ML Models', 'Agents', 'AI Tools'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer hover:text-[#FF5500] transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTypes([...selectedTypes, cat]);
                          else setSelectedTypes(selectedTypes.filter(t => t !== cat));
                        }}
                        className="rounded border-slate-300 text-[#FF5500] focus:ring-[#FF5500]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>

                {/* Pricing Filter */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Pricing Tier</span>
                  {['Free', 'Paid'].map((tier) => (
                    <label key={tier} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer hover:text-[#FF5500] transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedPricing.includes(tier)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedPricing([...selectedPricing, tier]);
                          else setSelectedPricing(selectedPricing.filter(t => t !== tier));
                        }}
                        className="rounded border-slate-300 text-[#FF5500] focus:ring-[#FF5500]"
                      />
                      <span>{tier} Assets</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedPricing([]);
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-xl transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#e04b00] rounded-xl shadow-sm shadow-[#FF5500]/25 transition-all active:scale-98 cursor-pointer"
                >
                  Apply
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
          onRemove={(id) => setCartItems(prev => prev.filter(c => c.id !== id))}
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
            setItems(prev => [newItem, ...prev]);
          }}
        />
      </div>
    </SidebarShell>
  );
};

export default MarketplaceHome;