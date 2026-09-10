"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/sections/cta-section";

type Post = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  readingTime?: string;
  image?: string;
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

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#ff8b28] selection:text-white font-sans antialiased overflow-x-clip flex flex-col justify-between">
      <Header />

      <main className="w-full bg-white pt-28 pb-12">
        {/* ================= 1. HERO / FEATURED SECTION ================= */}
        <section className="relative bg-white pt-6 sm:pt-10 pb-8 sm:pb-12">
          <div className="pointer-events-none absolute -top-24 right-10 -z-10 size-64 sm:size-[420px] rounded-full bg-[#ff8b28]/8 blur-[90px]" />

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
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-[#ff8b28] hover:text-[#ff8b28] hover:bg-[#ff8b28]/10 shadow-2xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => slideContainer(featuredRef, "next")}
                  aria-label="Next"
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-[#ff8b28] hover:text-[#ff8b28] hover:bg-[#ff8b28]/10 shadow-2xs transition active:scale-95 cursor-pointer"
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


        {/* ================= 3. COMPANY UPDATES ================= */}
        <section className="bg-white py-8 sm:py-12">
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
        <section className="bg-white py-8 sm:py-12">
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
                  className="w-full rounded-full border border-neutral-200 bg-white py-1.5 pl-8 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-[#ff8b28] focus:outline-none focus:ring-2 focus:ring-[#ff8b28]/15 shadow-2xs transition"
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
                        ? "bg-[#ff8b28] text-white shadow-xs"
                        : "bg-white border border-neutral-200 text-neutral-600 hover:border-[#ff8b28]/50 hover:text-[#ff8b28]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Articles List */}
            <div className="mt-6 border-t border-gray-200">
              {filteredLatestPosts.length > 0 ? (
                filteredLatestPosts.map((post) => (
                  <LatestPostRow key={post.id} post={post} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900">No articles found</p>
                  <p className="mt-1 text-[11px] text-neutral-500">Try selecting another category or clear search terms.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pre-footer CTA */}
        <CtaSection
          title="Stay ahead of the frontier in AI engineering"
          description="Get our technical breakdowns, system architecture deep-dives, benchmark analyses, and model releases delivered directly to you."
          buttonText="Subscribe to Updates"
          buttonHref="#newsletter"
          secondaryText="Explore All Articles"
          secondaryHref="#featured"
        />
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
   SUB-COMPONENTS (With Image 1 & 2 Vector Shapes)
============================================================ */

function BlogShapeGraphic({
  id,
  className = "",
}: {
  id: number;
  className?: string;
}) {
  const variant = Math.abs(id) % 12;

  switch (variant) {
    case 1: // Image 1, Card 1: Spiral with vertical arrow (Signal Over Noise)
      return (
        <div className={`size-full bg-[#ff8b28]/15 border border-[#ff8b28]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#ff8b28] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <line x1="50" y1="85" x2="50" y2="18" strokeWidth="1.8" />
            <polyline points="43,26 50,16 57,26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="50" cy="74" rx="36" ry="10" strokeWidth="1.6" />
            <ellipse cx="50" cy="58" rx="32" ry="9" strokeWidth="1.6" />
            <ellipse cx="50" cy="42" rx="26" ry="8" strokeWidth="1.6" />
            <ellipse cx="50" cy="28" rx="18" ry="6" strokeWidth="1.6" />
          </svg>
        </div>
      );
    case 2: // Image 1, Card 2: Ascending angled bars (Make Knowledge Last)
      return (
        <div className={`size-full bg-[#5B889C]/15 border border-[#5B889C]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#2B637B] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <path d="M16 80 L16 68 L22 62 L22 80 Z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M28 80 L28 58 L34 52 L34 80 Z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M40 80 L40 48 L46 42 L46 80 Z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M52 80 L52 38 L58 32 L58 80 Z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M64 80 L64 28 L70 22 L70 80 Z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M76 80 L76 18 L82 12 L82 80 Z" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 3: // Image 1, Card 4: Joyful Smiling Sunburst (Joyful By Design)
      return (
        <div className={`size-full bg-[#EE94A0]/15 border border-[#EE94A0]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#C94757] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="22" strokeWidth="1.6" />
            <path d="M40 45 Q44 41 48 45" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M52 45 Q56 41 60 45" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M42 53 Q50 63 58 53" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="50" y1="18" x2="50" y2="24" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="50" y1="76" x2="50" y2="82" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="18" y1="50" x2="24" y2="50" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="76" y1="50" x2="82" y2="50" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="27" y1="27" x2="32" y2="32" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="68" y1="68" x2="73" y2="73" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="27" y1="73" x2="32" y2="68" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="68" y1="32" x2="73" y2="27" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="38" y1="21" x2="40" y2="26" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="62" y1="21" x2="60" y2="26" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="38" y1="79" x2="40" y2="74" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="62" y1="79" x2="60" y2="74" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 4: // Image 1, Card 6: 3D Wireframe Isometric Cube (Your Work)
      return (
        <div className={`size-full bg-slate-100 border border-slate-200/90 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-slate-700 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" strokeWidth="1.6" strokeLinejoin="round" />
            <line x1="50" y1="48" x2="50" y2="85" strokeWidth="1.6" />
            <line x1="50" y1="48" x2="20" y2="32" strokeWidth="1.6" />
            <line x1="50" y1="48" x2="80" y2="32" strokeWidth="1.6" />
          </svg>
        </div>
      );
    case 5: // Image 1, Card 7: Circular Maze with Arrow (Less Chaos)
      return (
        <div className={`size-full bg-[#9F72BE]/15 border border-[#9F72BE]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#6D3B92] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="38" strokeWidth="1.4" />
            <path d="M22 50 A28 28 0 0 1 78 50 A28 28 0 0 1 50 78" strokeWidth="1.4" />
            <path d="M50 70 A20 20 0 0 1 30 50 A20 20 0 0 1 70 50" strokeWidth="1.4" />
            <path d="M40 50 A10 10 0 1 1 60 50" strokeWidth="1.4" />
            <line x1="50" y1="12" x2="50" y2="22" strokeWidth="1.4" />
            <line x1="68" y1="38" x2="78" y2="44" strokeWidth="1.4" />
            <line x1="28" y1="62" x2="36" y2="68" strokeWidth="1.4" />
            <line x1="8" y1="50" x2="88" y2="50" strokeWidth="1.8" strokeDasharray="3 2" />
            <polyline points="80,44 89,50 80,56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 6: // Image 1, Card 8: Atomic Planetary Orbits (Everything)
      return (
        <div className={`size-full bg-[#E85B51]/15 border border-[#E85B51]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#B82B21] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <ellipse cx="50" cy="50" rx="38" ry="15" strokeWidth="1.5" />
            <ellipse cx="50" cy="50" rx="38" ry="15" strokeWidth="1.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="38" ry="15" strokeWidth="1.5" transform="rotate(120 50 50)" />
            <circle cx="88" cy="50" r="3" fill="currentColor" />
            <circle cx="31" cy="83" r="3" fill="currentColor" />
            <circle cx="31" cy="17" r="3" fill="currentColor" />
          </svg>
        </div>
      );
    case 7: // Image 1, Card 3: Zigzag with Diagonal Arrows (Async & Always In-Sync)
      return (
        <div className={`size-full bg-[#6E8853]/15 border border-[#6E8853]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#47602F] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <path d="M15 78 L28 42 L15 22 L38 22" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M28 78 L42 42 L28 22 L52 22" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M42 78 L56 42 L42 22 L66 22" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M56 78 L70 42 L56 22 L80 22" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M70 78 L84 42 L70 22 L94 22" strokeWidth="1.5" strokeLinejoin="round" />
            <polyline points="33,18 38,22 33,26" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="47,18 52,22 47,26" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="61,18 66,22 61,26" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="75,18 80,22 75,26" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 8: // Image 1, Card 5: Heart with Circle Faces (Big Teams)
      return (
        <div className={`size-full bg-[#E8B931]/15 border border-[#E8B931]/30 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#A67E11] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <path d="M50 64 C38 52 32 44 32 36 C32 29 38 24 45 25 C48 26 50 28 50 28 C50 28 52 26 55 25 C62 24 68 29 68 36 C68 44 62 52 50 64 Z" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="50" cy="14" r="6" strokeWidth="1.3" />
            <circle cx="74" cy="22" r="6" strokeWidth="1.3" />
            <circle cx="85" cy="46" r="6" strokeWidth="1.3" />
            <circle cx="78" cy="72" r="6" strokeWidth="1.3" />
            <circle cx="50" cy="85" r="6" strokeWidth="1.3" />
            <circle cx="22" cy="72" r="6" strokeWidth="1.3" />
            <circle cx="15" cy="46" r="6" strokeWidth="1.3" />
            <circle cx="26" cy="22" r="6" strokeWidth="1.3" />
          </svg>
        </div>
      );
    case 9: // Image 2, 01: 4-lobed wave harmonic spirograph
      return (
        <div className={`size-full bg-pink-50 border border-pink-200/90 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-pink-600 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <g transform="translate(50, 50)" strokeWidth="0.8" opacity="0.9">
              <ellipse rx="38" ry="20" transform="rotate(0)" />
              <ellipse rx="38" ry="20" transform="rotate(22.5)" />
              <ellipse rx="38" ry="20" transform="rotate(45)" />
              <ellipse rx="38" ry="20" transform="rotate(67.5)" />
              <ellipse rx="38" ry="20" transform="rotate(90)" />
              <ellipse rx="38" ry="20" transform="rotate(112.5)" />
              <ellipse rx="38" ry="20" transform="rotate(135)" />
              <ellipse rx="38" ry="20" transform="rotate(157.5)" />
            </g>
          </svg>
        </div>
      );
    case 10: // Image 2, 04: 6-pointed star spirograph
      return (
        <div className={`size-full bg-sky-50 border border-sky-200/90 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-sky-600 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <g transform="translate(50, 50)" strokeWidth="0.8" opacity="0.9">
              <ellipse rx="38" ry="24" transform="rotate(0)" />
              <ellipse rx="38" ry="24" transform="rotate(30)" />
              <ellipse rx="38" ry="24" transform="rotate(60)" />
              <ellipse rx="38" ry="24" transform="rotate(90)" />
              <ellipse rx="38" ry="24" transform="rotate(120)" />
              <ellipse rx="38" ry="24" transform="rotate(150)" />
            </g>
          </svg>
        </div>
      );
    case 11: // Image 2, 07: 3-lobed trefoil spirograph
      return (
        <div className={`size-full bg-purple-50 border border-purple-200/90 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-purple-600 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <g transform="translate(50, 50)" strokeWidth="0.8" opacity="0.9">
              <circle cx="0" cy="-14" r="22" />
              <circle cx="12" cy="7" r="22" />
              <circle cx="-12" cy="7" r="22" />
              <circle cx="0" cy="-14" r="18" />
              <circle cx="12" cy="7" r="18" />
              <circle cx="-12" cy="7" r="18" />
              <circle cx="0" cy="-14" r="26" />
              <circle cx="12" cy="7" r="26" />
              <circle cx="-12" cy="7" r="26" />
            </g>
          </svg>
        </div>
      );
    default: // 0: Image 2, 09: 4-petal flower loop spirograph
      return (
        <div className={`size-full bg-lime-50 border border-lime-200/90 flex items-center justify-center p-2.5 sm:p-3 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-lime-700 transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor">
            <g transform="translate(50, 50)" strokeWidth="0.8" opacity="0.9">
              <ellipse rx="36" ry="12" transform="rotate(0)" />
              <ellipse rx="36" ry="12" transform="rotate(45)" />
              <ellipse rx="36" ry="12" transform="rotate(90)" />
              <ellipse rx="36" ry="12" transform="rotate(135)" />
              <ellipse rx="30" ry="9" transform="rotate(0)" />
              <ellipse rx="30" ry="9" transform="rotate(45)" />
              <ellipse rx="30" ry="9" transform="rotate(90)" />
              <ellipse rx="30" ry="9" transform="rotate(135)" />
            </g>
          </svg>
        </div>
      );
  }
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[80vw] max-w-[320px] sm:max-w-none sm:w-[350px] shrink-0 snap-start"
    >
      <article className="flex flex-col h-full rounded-xl p-2.5 sm:p-3 border border-neutral-100 bg-white transition duration-200 hover:border-[#ff8b28]/40 hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <BlogShapeGraphic id={post.id} />
          <div className="absolute top-2 left-2 rounded bg-white/95 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#ff8b28] border border-[#ff8b28]/20 shadow-2xs">
            {post.category}
          </div>
        </div>

        <div className="mt-2.5 flex flex-1 flex-col justify-between px-0.5">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-medium">
              <span>{post.date}</span>
            </div>

            <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-neutral-950 group-hover:text-[#ff8b28] transition-colors line-clamp-2 leading-snug">
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
      <article className="rounded-xl p-2.5 sm:p-3 border border-neutral-100 bg-white transition duration-200 hover:border-[#ff8b28]/40 hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <BlogShapeGraphic id={post.id} />
        </div>

        <div className="mt-2.5 px-0.5">
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
            <span className="text-[#ff8b28] font-bold uppercase tracking-wide">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h3 className="mt-1 text-xs sm:text-sm font-bold tracking-tight text-neutral-950 group-hover:text-[#ff8b28] transition line-clamp-2">
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


/* ============================================================
   LATEST BLOG POSTS ANALYTICS SHAPES (12 Wireframe Geometries)
============================================================ */

function LatestAnalyticsShapeGraphic({
  id,
  className = "",
}: {
  id: number;
  className?: string;
}) {
  const variant = ((((id >= 41 ? id - 40 : id) - 1) % 12) + 12) % 12 + 1;
  const containerClass = `size-full bg-[#EDE8FA] border border-[#DDD6FE] flex items-center justify-center p-2.5 sm:p-3 ${className}`;
  const svgClass = "w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] text-[#18181b] transition-transform duration-300 group-hover:scale-105";

  switch (variant) {
    case 1: // 1. Churn Analysis: Stepped cross / interlocking perimeter
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <rect x="24" y="24" width="52" height="52" />
            <rect x="37" y="11" width="26" height="78" />
            <rect x="11" y="37" width="78" height="26" />
          </svg>
        </div>
      );
    case 2: // 2. Demand Forecasting: Horizontal bus lines braiding into fanning nodes
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="16" y1="28" x2="42" y2="28" />
            <circle cx="16" cy="28" r="2.5" fill="currentColor"/>
            <line x1="16" y1="39" x2="42" y2="39" />
            <circle cx="16" cy="39" r="2.5" fill="currentColor"/>
            <line x1="16" y1="50" x2="42" y2="50" />
            <circle cx="16" cy="50" r="2.5" fill="currentColor"/>
            <line x1="16" y1="61" x2="42" y2="61" />
            <circle cx="16" cy="61" r="2.5" fill="currentColor"/>
            <line x1="16" y1="72" x2="42" y2="72" />
            <circle cx="16" cy="72" r="2.5" fill="currentColor"/>

            <path d="M42 28 C54 28 62 18 62 12" />
            <circle cx="62" cy="12" r="2.5" fill="currentColor"/>
            <path d="M42 39 C56 39 68 20 68 12" />
            <circle cx="68" cy="12" r="2.5" fill="currentColor"/>
            <path d="M42 50 C58 50 74 24 74 12" />
            <circle cx="74" cy="12" r="2.5" fill="currentColor"/>
            <path d="M42 61 C62 61 80 28 80 12" />
            <circle cx="80" cy="12" r="2.5" fill="currentColor"/>
            <path d="M42 72 C66 72 86 32 86 12" />
            <circle cx="86" cy="12" r="2.5" fill="currentColor"/>

            <path d="M42 72 C54 72 62 82 62 88" />
            <circle cx="62" cy="88" r="2.5" fill="currentColor"/>
            <path d="M42 61 C56 61 68 80 68 88" />
            <circle cx="68" cy="88" r="2.5" fill="currentColor"/>
            <path d="M42 50 C58 50 74 76 74 88" />
            <circle cx="74" cy="88" r="2.5" fill="currentColor"/>
            <path d="M42 39 C62 39 80 72 80 88" />
            <circle cx="80" cy="88" r="2.5" fill="currentColor"/>
            <path d="M42 28 C66 28 86 68 86 88" />
            <circle cx="86" cy="88" r="2.5" fill="currentColor"/>

            <path d="M42 28 C56 28 72 40 86 42" />
            <circle cx="86" cy="42" r="2.5" fill="currentColor"/>
            <path d="M42 39 C56 39 72 46 86 48" />
            <circle cx="86" cy="48" r="2.5" fill="currentColor"/>
            <path d="M42 50 C58 50 72 54 86 54" />
            <circle cx="86" cy="54" r="2.5" fill="currentColor"/>
            <path d="M42 61 C58 61 72 60 86 60" />
            <circle cx="86" cy="60" r="2.5" fill="currentColor"/>
            <path d="M42 72 C58 72 72 66 86 66" />
            <circle cx="86" cy="66" r="2.5" fill="currentColor"/>
          </svg>
        </div>
      );
    case 3: // 3. Lead Scoring: 4 stepped pairs of vertical pillars
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <rect x="42" y="12" width="16" height="76" />
            <line x1="50" y1="12" x2="50" y2="88" />
            <rect x="30" y="28" width="12" height="60" />
            <rect x="58" y="28" width="12" height="60" />
            <rect x="20" y="46" width="10" height="42" />
            <rect x="70" y="46" width="10" height="42" />
            <rect x="11" y="62" width="9" height="26" />
            <rect x="80" y="62" width="9" height="26" />
          </svg>
        </div>
      );
    case 4: // 4. Conversion: Centrifugal vortex with terminal dots
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="50" cy="42" r="2.5" fill="currentColor"/>
            <circle cx="58" cy="54" r="2.5" fill="currentColor"/>
            <circle cx="44" cy="56" r="2.5" fill="currentColor"/>

            <path d="M42 34 A18 18 0 0 1 66 38" strokeLinecap="round"/>
            <circle cx="66" cy="38" r="2.5" fill="currentColor"/>

            <path d="M66 50 A18 18 0 0 1 52 68" strokeLinecap="round"/>
            <circle cx="52" cy="68" r="2.5" fill="currentColor"/>

            <path d="M42 66 A18 18 0 0 1 32 50" strokeLinecap="round"/>
            <circle cx="32" cy="50" r="2.5" fill="currentColor"/>

            <path d="M34 22 A34 34 0 0 1 76 26" strokeLinecap="round"/>
            <circle cx="76" cy="26" r="2.5" fill="currentColor"/>

            <path d="M82 46 A34 34 0 0 1 62 82" strokeLinecap="round"/>
            <circle cx="62" cy="82" r="2.5" fill="currentColor"/>

            <path d="M48 84 A34 34 0 0 1 18 60" strokeLinecap="round"/>
            <circle cx="18" cy="60" r="2.5" fill="currentColor"/>

            <path d="M22 38 A34 34 0 0 1 40 18" strokeLinecap="round"/>
            <circle cx="40" cy="18" r="2.5" fill="currentColor"/>
          </svg>
        </div>
      );
    case 5: // 5. Segmentations: 6 overlapping wireframe squares stacked diagonally
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <rect x="14" y="50" width="36" height="36" />
            <rect x="21" y="43" width="36" height="36" />
            <rect x="28" y="36" width="36" height="36" />
            <rect x="35" y="29" width="36" height="36" />
            <rect x="42" y="22" width="36" height="36" />
            <rect x="49" y="15" width="36" height="36" />
          </svg>
        </div>
      );
    case 6: // 6. Search: 4 intersecting circles with crosslines
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="35" cy="35" r="20" />
            <circle cx="65" cy="35" r="20" />
            <circle cx="35" cy="65" r="20" />
            <circle cx="65" cy="65" r="20" />
            <line x1="21" y1="21" x2="79" y2="79" strokeLinecap="round"/>
            <line x1="79" y1="21" x2="21" y2="79" strokeLinecap="round"/>
            <circle cx="35" cy="35" r="2.5" fill="currentColor"/>
            <circle cx="65" cy="35" r="2.5" fill="currentColor"/>
            <circle cx="35" cy="65" r="2.5" fill="currentColor"/>
            <circle cx="65" cy="65" r="2.5" fill="currentColor"/>
          </svg>
        </div>
      );
    case 7: // 7. Life Time Value: 4-tier perspective pyramid
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <polygon points="50,14 36,34 64,34" />
            <polygon points="34,37 66,37 76,52 24,52" />
            <polygon points="22,55 78,55 86,70 14,70" />
            <polygon points="12,73 88,73 94,86 6,86" />
            <line x1="50" y1="14" x2="50" y2="86" />
            <line x1="50" y1="14" x2="28" y2="86" />
            <line x1="50" y1="14" x2="72" y2="86" />
          </svg>
        </div>
      );
    case 8: // 8. Customer Feedback: Concentric stepped brackets around center square
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <rect x="42" y="42" width="16" height="16" />
            <path d="M36 34 H42 M36 66 H42 M36 34 V66" />
            <path d="M64 34 H58 M64 66 H58 M64 34 V66" />
            <path d="M30 26 H42 M30 74 H42 M30 26 V74" />
            <path d="M70 26 H58 M70 74 H58 M70 26 V74" />
            <path d="M22 18 H42 M22 82 H42 M22 18 V82" />
            <path d="M78 18 H58 M78 82 H58 M78 18 V82" />
            <path d="M14 10 H42 M14 90 H42 M14 10 V90" />
            <path d="M86 10 H58 M86 90 H58 M86 10 V90" />
          </svg>
        </div>
      );
    case 9: // 9. Product Analytics: Alternating concentric squares and diamonds
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <rect x="14" y="14" width="72" height="72" />
            <line x1="14" y1="14" x2="86" y2="86" />
            <line x1="86" y1="14" x2="14" y2="86" />
            <polygon points="50,14 86,50 50,86 14,50" />
            <rect x="32" y="32" width="36" height="36" />
            <polygon points="50,32 68,50 50,68 32,50" />
            <rect x="41" y="41" width="18" height="18" />
          </svg>
        </div>
      );
    case 10: // 10. Marketing Analytics: Ticked crosshairs with scatter plot circles
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="12" y1="50" x2="88" y2="50" />
            <line x1="50" y1="12" x2="50" y2="88" />
            <line x1="20" y1="46" x2="20" y2="54" />
            <line x1="28" y1="46" x2="28" y2="54" />
            <line x1="36" y1="46" x2="36" y2="54" />
            <line x1="44" y1="46" x2="44" y2="54" />
            <line x1="56" y1="46" x2="56" y2="54" />
            <line x1="64" y1="46" x2="64" y2="54" />
            <line x1="72" y1="46" x2="72" y2="54" />
            <line x1="80" y1="46" x2="80" y2="54" />
            <line x1="46" y1="20" x2="54" y2="20" />
            <line x1="46" y1="28" x2="54" y2="28" />
            <line x1="46" y1="36" x2="54" y2="36" />
            <line x1="46" y1="44" x2="54" y2="44" />
            <line x1="46" y1="56" x2="54" y2="56" />
            <line x1="46" y1="64" x2="54" y2="64" />
            <line x1="46" y1="72" x2="54" y2="72" />
            <line x1="46" y1="80" x2="54" y2="80" />
            <circle cx="28" cy="30" r="3.5" />
            <circle cx="70" cy="32" r="3.5" />
            <circle cx="34" cy="74" r="3.5" />
            <circle cx="76" cy="80" r="3.5" />
          </svg>
        </div>
      );
    case 11: // 11. Fraud Analysis: Square perspective tunnel to center circle
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <rect x="14" y="14" width="72" height="72" />
            <rect x="23" y="23" width="54" height="54" />
            <rect x="32" y="32" width="36" height="36" />
            <line x1="14" y1="14" x2="38" y2="38" />
            <line x1="86" y1="14" x2="62" y2="38" />
            <line x1="86" y1="86" x2="62" y2="62" />
            <line x1="14" y1="86" x2="38" y2="62" />
            <circle cx="50" cy="50" r="7.5" />
          </svg>
        </div>
      );
    case 12: // 12. Credit Scoring: Segmented circular wheel with concentric rings and crossbars
    default:
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" className={svgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="16" />
            <line x1="14" y1="50" x2="86" y2="50" />
            <line x1="50" y1="14" x2="50" y2="86" />
            <line x1="39" y1="39" x2="25" y2="25" />
            <line x1="61" y1="39" x2="75" y2="25" />
            <line x1="61" y1="61" x2="75" y2="75" />
            <line x1="39" y1="61" x2="25" y2="75" />
          </svg>
        </div>
      );
  }
}

function LatestPostRow({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block border-b border-gray-200 hover:border-black py-4 sm:py-5 transition-colors duration-200"
    >
      <article className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-[11px] text-neutral-500 font-medium">
            <span className="font-bold text-[#ff8b28] uppercase tracking-wide shrink-0">
              {post.category}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="whitespace-nowrap shrink-0">{post.date}</span>
          </div>

          <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-neutral-950 group-hover:text-[#ff8b28] transition leading-snug">
            {post.title}
          </h3>

          <p className="mt-0.5 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-neutral-500">
            {post.description}
          </p>
        </div>

        <div className="relative aspect-[16/10] w-full sm:w-44 md:w-48 shrink-0 overflow-hidden rounded-xl">
          <LatestAnalyticsShapeGraphic id={post.id} />
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