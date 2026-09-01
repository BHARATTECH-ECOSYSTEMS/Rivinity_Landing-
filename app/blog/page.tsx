"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Search,
  Mail,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";

type Post = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  image: string;
  authors?: string;
  href?: string;
};

/* ============================================================
   DATA ARRAYS (100% Original Content Kept)
============================================================ */

const featuredPosts: Post[] = [
  {
    id: 1,
    category: "AI",
    title: "Building AI systems that can reason, learn and adapt",
    description:
      "How modern intelligent systems are moving beyond simple prompts toward reliable reasoning, tool use and autonomous workflows.",
    date: "Aug 14, 2026",
    readingTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    category: "Infrastructure",
    title: "The infrastructure behind production AI",
    description:
      "A practical look at the systems, infrastructure and engineering decisions required to run AI applications reliably at scale.",
    date: "Aug 11, 2026",
    readingTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    category: "Research",
    title: "What makes an AI system genuinely useful?",
    description:
      "Moving beyond impressive demos toward intelligent systems that consistently solve real problems for real users.",
    date: "Aug 08, 2026",
    readingTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    category: "Engineering",
    title: "Designing systems that can evolve",
    description:
      "Why adaptable architecture matters when models, infrastructure and product requirements are changing constantly.",
    date: "Aug 04, 2026",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 5,
    category: "AI Agents",
    title: "The complete guide to building AI agents",
    description:
      "From planning and tool use to memory and recovery, a practical framework for building dependable AI agents.",
    date: "Jul 30, 2026",
    readingTime: "15 min read",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 6,
    category: "AI",
    title: "From models to intelligent products",
    description:
      "What changes when AI moves from an experiment inside a notebook to a product people depend on every day.",
    date: "Jul 26, 2026",
    readingTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1600&q=90&auto=format&fit=crop",
    href: "#",
  },
];

const productUpdates: Post[] = [
  {
    id: 11,
    category: "Product",
    title: "A faster foundation for production AI",
    description:
      "New platform capabilities designed to help developers move from prototype to production with less friction.",
    date: "Aug 03, 2026",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 12,
    category: "Developer",
    title: "Better tools for building intelligent applications",
    description:
      "New developer workflows focused on making complex AI systems easier to build, test and operate.",
    date: "Jul 28, 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 13,
    category: "Infrastructure",
    title: "Scaling AI without scaling complexity",
    description:
      "How we're improving reliability, observability and performance across the Rivinity platform.",
    date: "Jul 22, 2026",
    readingTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
];

const researchPosts: Post[] = [
  {
    id: 21,
    category: "Agents",
    title: "Building reliable AI agents for complex workflows",
    description:
      "How agent architectures can reason, use tools, recover from failures and complete long-running tasks.",
    date: "Jul 19, 2026",
    readingTime: "12 min read",
    authors: "Rivinity Research",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 22,
    category: "Inference",
    title: "Making AI inference faster without sacrificing quality",
    description:
      "Exploring the systems techniques that improve model latency, throughput and efficiency in production environments.",
    date: "Jul 15, 2026",
    readingTime: "10 min read",
    authors: "Rivinity Research",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 23,
    category: "Architecture",
    title: "Designing AI systems that can evolve",
    description:
      "Why adaptable architecture matters when models, APIs, infrastructure and product requirements change constantly.",
    date: "Jul 11, 2026",
    readingTime: "9 min read",
    authors: "Rivinity Engineering",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 24,
    category: "Agents",
    title: "How tool use changes what AI systems can accomplish",
    description:
      "A practical exploration of giving language models access to external tools, memory and structured workflows.",
    date: "Jul 07, 2026",
    readingTime: "11 min read",
    authors: "Rivinity Research",
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 25,
    category: "AI Systems",
    title: "Why context engineering matters for modern AI",
    description:
      "Beyond prompting: how context selection, memory, retrieval and tool results shape intelligent systems.",
    date: "Jul 02, 2026",
    readingTime: "13 min read",
    authors: "Rivinity Research",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 26,
    category: "Engineering",
    title: "Building observability into AI applications",
    description:
      "What to measure when traditional application monitoring is no longer enough.",
    date: "Jun 27, 2026",
    readingTime: "8 min read",
    authors: "Rivinity Engineering",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
];

const companyUpdates: Post[] = [
  {
    id: 31,
    category: "Company",
    title: "Building Rivinity for the next generation of software",
    description:
      "The principles guiding how we're building our company and technology.",
    date: "Jul 18, 2026",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 32,
    category: "Company",
    title: "Why we're building for developers first",
    description:
      "Our perspective on making powerful technology accessible to the people who build with it.",
    date: "Jul 04, 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 33,
    category: "Company",
    title: "The principles behind Rivinity",
    description:
      "A few ideas that continue to shape the products and systems we build.",
    date: "Jun 20, 2026",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=90&auto=format&fit=crop",
    href: "#",
  },
];

const latestPosts: Post[] = [
  {
    id: 41,
    category: "AI",
    title: "Understanding latency in production AI systems",
    description:
      "A breakdown of where time goes during an AI request and how engineers can systematically reduce it.",
    date: "Aug 12, 2026",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 42,
    category: "AI Agents",
    title: "Planning, execution, and recovery in autonomous systems",
    description:
      "The engineering patterns that help agents handle multi-step tasks without falling apart when something goes wrong.",
    date: "Aug 09, 2026",
    readingTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 43,
    category: "Engineering",
    title: "The case for small, reversible engineering decisions",
    description:
      "Why incremental technical decisions can outperform large architectural bets in fast-moving AI products.",
    date: "Aug 06, 2026",
    readingTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 44,
    category: "Research",
    title: "What makes an AI system genuinely useful?",
    description:
      "Moving beyond impressive demos toward systems that consistently create value for real users.",
    date: "Aug 02, 2026",
    readingTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 45,
    category: "Product",
    title: "From prototypes to production AI",
    description:
      "The engineering journey between discovering a promising technique and making it dependable enough for users.",
    date: "Jul 29, 2026",
    readingTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 46,
    category: "AI Systems",
    title: "From research to production",
    description:
      "How promising research becomes reliable software that can operate at real-world scale.",
    date: "Jul 25, 2026",
    readingTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 47,
    category: "Infrastructure",
    title: "Designing infrastructure for intelligent applications",
    description:
      "The architectural decisions that matter when AI workloads become part of the core product.",
    date: "Jul 21, 2026",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 48,
    category: "Developer",
    title: "A practical guide to building with AI APIs",
    description:
      "The fundamentals developers should understand before taking an AI-powered application into production.",
    date: "Jul 17, 2026",
    readingTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=85&auto=format&fit=crop",
    href: "#",
  },
];

const categories = [
  "All",
  "AI",
  "AI Agents",
  "Research",
  "Engineering",
  "Product",
  "Infrastructure",
  "Developer",
];

const POSTS_PER_PAGE = 4;

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const filteredLatestPosts = useMemo(() => {
    return latestPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredLatestPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredLatestPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredLatestPosts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const slideContainer = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "next" | "previous"
  ) => {
    const el = ref.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-orange-500 selection:text-white font-sans antialiased overflow-x-clip flex flex-col justify-between">
      <Header />

      <main className="w-full bg-white pt-28 pb-12">
        {/* ================= 1. HERO / FEATURED SECTION ================= */}
        <section className="relative bg-white pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-orange-100/50">
          <div className="pointer-events-none absolute -top-24 right-10 -z-10 size-64 sm:size-[420px] rounded-full bg-orange-400/8 blur-[90px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 pb-4 sm:pb-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                  Blog
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
                  Perspectives on artificial intelligence, systems research, and modern engineering.
                </p>
              </div>

              {/* Slider Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => slideContainer(featuredRef, "previous")}
                  aria-label="Previous"
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40 shadow-2xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => slideContainer(featuredRef, "next")}
                  aria-label="Next"
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40 shadow-2xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Smooth Scroll Container */}
            <div
              ref={featuredRef}
              className="blog-carousel -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3.5 sm:gap-5 overflow-x-auto pb-2 scroll-smooth"
            >
              {featuredPosts.map((post) => (
                <FeaturedCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= 2. RESEARCH BLOG SECTION ================= */}
        <section className="relative bg-white py-8 sm:py-12 border-b border-orange-100/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 pb-4 sm:pb-6">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-orange-600">
                  SYSTEMS RESEARCH & PAPERS
                </span>
                <h2 className="mt-0.5 text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                  Research blog
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-lg leading-relaxed">
                  Foundational ideas and systems research for production AI.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => slideContainer(researchRef, "previous")}
                  aria-label="Previous"
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40 shadow-2xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => slideContainer(researchRef, "next")}
                  aria-label="Next"
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40 shadow-2xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Research Cards Scroll Container */}
            <div
              ref={researchRef}
              className="blog-carousel -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3.5 sm:gap-5 overflow-x-auto pb-2 scroll-smooth"
            >
              {researchPosts.map((post) => (
                <ResearchCard key={post.id} post={post} />
              ))}
            </div>

            {/* Bottom Research Badges */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-orange-100/70 pt-4 sm:pt-6 text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-400">
              <span className="cursor-pointer hover:text-orange-600 transition">RIVINITY LABS</span>
              <span className="cursor-pointer hover:text-orange-600 transition">AI RESEARCH</span>
              <span className="cursor-pointer hover:text-orange-600 transition">ENGINEERING</span>
              <span className="cursor-pointer hover:text-orange-600 transition">OPEN RESEARCH</span>
            </div>
          </div>
        </section>

        {/* ================= 3. COMPANY UPDATES ================= */}
        <section className="bg-white py-8 sm:py-12 border-b border-orange-100/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Company updates"
              description="Stories and updates from the Rivinity team."
            />

            <div className="mt-4 sm:mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {companyUpdates.map((post) => (
                <SmallPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. LATEST BLOG POSTS ================= */}
        <section className="bg-white py-8 sm:py-12 border-b border-orange-100/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4">
              <div>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                  Latest blog posts
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Showing {filteredLatestPosts.length} published articles.
                </p>
              </div>

              {/* Compact Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-full border border-neutral-200 bg-white py-1.5 pl-8 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/10 shadow-2xs transition"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="blog-carousel flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? "bg-orange-600 text-white shadow-xs"
                        : "bg-white border border-neutral-200 text-neutral-600 hover:border-orange-300 hover:text-orange-600"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Articles List */}
            <div className="mt-4 divide-y divide-orange-100/70 rounded-2xl border border-orange-100/80 bg-white px-3 sm:px-6 shadow-[0_4px_20px_rgba(249,115,22,0.02)]">
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <LatestPostRow key={post.id} post={post} />
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900">No articles found</p>
                  <p className="mt-1 text-[11px] text-neutral-500">Try selecting another category or clear search terms.</p>
                </div>
              )}
            </div>

            {/* Numbered Pagination */}
            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-100 pt-4">
                <p className="text-[11px] text-neutral-500">
                  Page <span className="font-bold text-neutral-900">{currentPage}</span> of{" "}
                  <span className="font-bold text-neutral-900">{totalPages}</span>
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                    className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:border-orange-500 hover:text-orange-600 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold transition cursor-pointer ${
                        currentPage === page
                          ? "bg-orange-600 text-white shadow-2xs"
                          : "border border-neutral-200 bg-white text-neutral-700 hover:border-orange-400 hover:text-orange-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                    className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:border-orange-500 hover:text-orange-600 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Newsletter Brief */}
            <div className="mt-6 rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-md">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-700">
                  <Mail className="size-3" />
                  <span>RESEARCH BRIEF</span>
                </div>
                <h3 className="mt-1 text-sm sm:text-base font-bold text-neutral-950">
                  Get deep AI architecture blueprints bi-weekly.
                </h3>
                <p className="mt-0.5 text-[11px] text-neutral-500">
                  Zero marketing spam. Pure latency benchmarks and systems research.
                </p>
              </div>

              <div>
                {subscribed ? (
                  <div className="flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-2 text-xs font-bold text-emerald-700 shadow-2xs">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Subscribed successfully!</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (emailInput.trim()) setSubscribed(true);
                    }}
                    className="flex gap-1.5 w-full"
                  >
                    <input
                      type="email"
                      required
                      placeholder="engineer@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/10 shadow-2xs w-full sm:w-56"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-orange-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-orange-500 transition shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. CTA SECTION ================= */}
        <section className="bg-white py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-200/80 bg-gradient-to-b from-orange-50/40 via-white to-amber-50/30 px-4 py-8 sm:px-12 sm:py-12 text-center shadow-[0_8px_30px_rgba(249,115,22,0.05)]">
              <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-orange-600 uppercase">
                BUILD WITH RIVINITY
              </span>

              <h2 className="mx-auto mt-2 max-w-xl text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                Turn ideas into intelligent products.
              </h2>

              <p className="mx-auto mt-2 max-w-[55ch] text-xs sm:text-sm leading-relaxed text-neutral-600">
                Explore Rivinity&apos;s platform and start building the next generation of AI-powered software.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <Link
                  href="#"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-orange-500 shadow-md shadow-orange-600/20 active:scale-95"
                >
                  <span>Start building</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>

                <Link
                  href="#"
                  className="w-full sm:w-auto flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-400 shadow-2xs active:scale-95"
                >
                  Explore documentation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .blog-carousel {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
        }
        .blog-carousel::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   SUB-COMPONENTS (Compact & Mobile Frictionless)
============================================================ */

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[80vw] max-w-[320px] sm:max-w-none sm:w-[350px] shrink-0 snap-start"
    >
      <article className="flex flex-col h-full rounded-xl p-2.5 sm:p-3 border border-neutral-100 bg-white transition duration-200 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200/60">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 rounded bg-white/95 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-600 border border-orange-100 shadow-2xs">
            {post.category}
          </div>
        </div>

        <div className="mt-2.5 flex flex-1 flex-col justify-between px-0.5">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-medium">
              <span>{post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Clock3 className="size-2.5 text-orange-500" />
                {post.readingTime}
              </span>
            </div>

            <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-neutral-950 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>

            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
              {post.description}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SmallPostCard({ post }: { post: Post }) {
  return (
    <Link href={post.href || "#"} className="group block">
      <article className="rounded-xl p-2.5 sm:p-3 border border-neutral-100 bg-white transition duration-200 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200/60">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mt-2.5 px-0.5">
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
            <span className="text-orange-600 font-bold uppercase tracking-wide">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h3 className="mt-1 text-xs sm:text-sm font-bold tracking-tight text-neutral-950 group-hover:text-orange-600 transition line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-neutral-500">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

function ResearchCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[80vw] max-w-[300px] sm:max-w-none sm:w-[320px] shrink-0 snap-start"
    >
      <article className="flex h-[300px] sm:h-[330px] flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 transition duration-200 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition duration-300" />

        <div>
          <span className="inline-block rounded bg-orange-50 border border-orange-200/60 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-700">
            {post.category}
          </span>

          <h3 className="mt-2.5 text-sm sm:text-base font-bold leading-snug tracking-tight text-neutral-950 group-hover:text-orange-600 transition line-clamp-3">
            {post.title}
          </h3>

          <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-neutral-500 line-clamp-3">
            {post.description}
          </p>
        </div>

        <div>
          {post.authors && (
            <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
              {post.authors}
            </p>
          )}

          <div className="mt-2.5 flex items-center justify-between border-t border-neutral-100 pt-2.5">
            <span className="text-[10px] text-neutral-400 font-medium">
              {post.date}
            </span>
            <div className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition shadow-2xs">
              <ArrowUpRight className="size-3 sm:size-3.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function LatestPostRow({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block py-3.5 sm:py-4 transition first:pt-3.5 sm:first:pt-4 last:pb-3.5 sm:last:pb-4"
    >
      <article className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-[11px] text-neutral-500 font-medium">
            <span className="font-bold text-orange-600 uppercase tracking-wide shrink-0">
              {post.category}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="whitespace-nowrap shrink-0">{post.date}</span>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1 whitespace-nowrap shrink-0 text-neutral-400">
              <Clock3 className="size-2.5 text-orange-500" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-neutral-950 group-hover:text-orange-600 transition leading-snug">
            {post.title}
          </h3>

          <p className="mt-0.5 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-neutral-500">
            {post.description}
          </p>
        </div>

        <div className="relative aspect-[16/10] w-full sm:w-36 md:w-40 shrink-0 overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200/80 group-hover:border-orange-200">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </article>
    </Link>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950">
        {title}
      </h2>
      <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-neutral-500 max-w-xl">
        {description}
      </p>
    </div>
  );
}