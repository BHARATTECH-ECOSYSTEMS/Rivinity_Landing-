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
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Plus,
  Bookmark
} from 'lucide-react';

import SidebarShell from "@/components/canvas/SidebarShell";
import { USER } from "@/lib/profile";
import MarketplaceItem, { MarketplaceItemType } from './MarketplaceItem';
import MarketplaceCategory from './MarketplaceCategory';
import MarketplaceCart from './MarketplaceCart';
import MarketplaceCheckout from './MarketplaceCheckout';
import MarketplaceUpload from './MarketplaceUpload';

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
    author: { name: 'Rivinity Audio' },
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
    author: { name: 'NexusData' },
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
    author: { name: 'Canvas AI' },
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
    author: { name: 'Aegis Labs' },
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
    author: { name: 'Helix Science' },
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
    author: { name: 'OpenCode Lab' },
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
    author: { name: 'Vidhi Data' },
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
    author: { name: 'VisionWorks' },
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
    author: { name: 'Rivinity Foundry' },
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
    author: { name: 'Rivinity Core' },
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
    author: { name: 'AudioStream' },
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
    author: { name: 'Nexus Agents' },
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
    author: { name: 'Quill AI' },
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
    author: { name: 'DataPrism' },
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
    author: { name: 'Nexus Tools' },
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
    author: { name: 'TestMatrix' },
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

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);

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

  const getCategoryLabel = (item: MarketplaceItemType) => {
    if (item.category === 'AI / ML Models' || item.badge?.toLowerCase() === 'model') return 'Model';
    if (item.category === 'Datasets' || item.badge?.toLowerCase() === 'dataset') return 'Dataset';
    if (item.category === 'Agents' || item.badge?.toLowerCase() === 'agent') return 'Agent';
    if (item.category === 'AI Tools' || item.badge?.toLowerCase() === 'tool') return 'Tool';
    return item.badge || item.category || 'Asset';
  };

  const renderAssetCard = (item: MarketplaceItemType) => {
    const isLiked = likedIds.includes(item.id);
    const orgInitials = item.author.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        key={item.id}
        onClick={() => setSelectedAsset(item)}
        className="group relative bg-white dark:bg-[#131317] border border-slate-200/80 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40 flex flex-col justify-between"
      >
        <div>
          {/* Top Row: Category in Orange text (no icon) & Price */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF6B00] tracking-wide">
              {getCategoryLabel(item)}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold shadow-2xs ${
              item.tier === 'Free'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40'
                : 'bg-black dark:bg-white text-white dark:text-black border border-transparent'
            }`}>
              {item.price}
            </span>
          </div>

          {/* Title & Description */}
          <div className="mt-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors line-clamp-1 tracking-tight">
              {item.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[32px]">
              {item.tagline}
            </p>
          </div>

          {/* Metadata Row: Clean Org Badge & Rating */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
            {/* Publisher: Clean Initials Badge */}
            <div className="flex items-center gap-1.5 min-w-0" title={item.author.name}>
              <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200/90 dark:border-zinc-700 flex items-center justify-center text-[9px] font-bold text-slate-700 dark:text-zinc-300 shrink-0">
                {orgInitials}
              </div>
              <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium truncate max-w-[100px]">
                {item.author.name}
              </span>
            </div>

            {/* Rating & Runs */}
            <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-zinc-300 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
              <span className="text-slate-400 dark:text-zinc-500 font-normal text-[11px]">({item.runs})</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAsset(item);
            }}
            className="group/btn flex-1 h-8 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-semibold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>

          <button
            onClick={(e) => toggleLike(item, e)}
            className={`h-8 w-8 rounded-xl border transition-colors shadow-2xs flex items-center justify-center cursor-pointer ${
              isLiked
                ? "border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-500"
                : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500"
            }`}
            title={isLiked ? "Saved to assets" : "Save asset"}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>
    );
  };

  /* SECTION RENDERER */
  const renderSection = (title: string, subtitle: string, sectionItems: MarketplaceItemType[], icon?: React.ReactNode) => {
    if (sectionItems.length === 0) return null;

    return (
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate tracking-tight">{title}</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sectionItems.map(renderAssetCard)}
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
      <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-y-auto bg-[#F8F9FA] dark:bg-[#0C0C0E] [scrollbar-width:thin]">
        {/* Rivinity Global Header */}
        <header className="relative flex h-16 shrink-0 items-center justify-between gap-3 bg-transparent px-4 sm:h-20 sm:px-8 border-b border-border/40 select-none">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="relative flex items-center w-full max-w-sm sm:max-w-md h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 px-3.5 gap-2.5 focus-within:border-[#FF6B00]/70 focus-within:ring-2 focus-within:ring-[#FF6B00]/10 transition-all shadow-2xs">
              <Search className="h-4 w-4 text-slate-400 dark:text-zinc-500 shrink-0" strokeWidth={2} />
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

            {/* Right Filter Drawer Button */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 shadow-2xs transition-all hover:border-[#FF6B00]/30 hover:bg-orange-50/20 text-xs font-semibold text-slate-700 dark:text-zinc-200 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-slate-600 dark:text-zinc-300" />
              <span className="hidden sm:inline">Filters</span>
              {(selectedTypes.length > 0 || selectedPricing.length > 0) && (
                <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
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
            {renderSection(
              'Trending Assets This Week',
              'The most downloaded datasets and models across the ecosystem.',
              trendingItems,
            )}

            {/* 2. Datasets */}
            {datasetItems.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                {renderSection(
                  'Datasets',
                  'Curated, license-clear data for training and evaluation.',
                  datasetItems
                )}
              </div>
            )}

            {/* 3. AI / ML Models */}
            {modelItems.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                {renderSection(
                  'AI / ML Models',
                  'Open and commercial weights with deployment recipes.',
                  modelItems
                )}
              </div>
            )}

            {/* 4. Agents */}
            {agentItems.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                {renderSection(
                  'Agents',
                  'Autonomous and crew-style agents for any domain.',
                  agentItems
                )}
              </div>
            )}

            {/* 5. AI Tools */}
            {toolItems.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                {renderSection(
                  'AI Tools',
                  'Productivity, workflow, vision, marketing and more.',
                  toolItems
                )}
              </div>
            )}

          </div>
        </main>

        {/* RIGHT SIDE FILTER DRAWER */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-md">
            <div className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#FF6B00]" /> Filter Assets
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
                    <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer hover:text-[#FF6B00] transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTypes([...selectedTypes, cat]);
                          else setSelectedTypes(selectedTypes.filter(t => t !== cat));
                        }}
                        className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>

                {/* Pricing Filter */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Pricing Tier</span>
                  {['Free', 'Paid'].map((tier) => (
                    <label key={tier} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer hover:text-[#FF6B00] transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedPricing.includes(tier)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedPricing([...selectedPricing, tier]);
                          else setSelectedPricing(selectedPricing.filter(t => t !== tier));
                        }}
                        className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00]"
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
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#e05e00] rounded-xl shadow-sm shadow-[#FF6B00]/25 transition-all active:scale-98 cursor-pointer"
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