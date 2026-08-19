import Head from "next/head";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";

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
   DATA ARRAYS
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

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);

  const filteredLatestPosts = useMemo(() => {
    if (activeCategory === "All") return latestPosts;
    return latestPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const visibleLatestPosts = filteredLatestPosts.slice(0, visiblePosts);

  const slideFeatured = (direction: "next" | "previous") => {
    const el = featuredRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "next" ? 380 : -380,
      behavior: "smooth",
    });
  };

  const slideResearch = (direction: "next" | "previous") => {
    const el = researchRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "next" ? 340 : -340,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Head>
        <title>Blog — Rivinity</title>
        <meta
          name="description"
          content="Explore Rivinity's latest research, engineering ideas, product updates and perspectives on AI."
        />
      </Head>

      <Header/>
      

      <main className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
        
        {/* HERO / FEATURED SECTION */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-6 pb-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-neutral-950">
                  Blog
                </h1>
                <p className="mt-2 text-sm text-neutral-500 max-w-md">
                  Perspectives on artificial intelligence, systems research, and modern engineering.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => slideFeatured("previous")}
                  aria-label="Previous"
                  className="flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:text-black shadow-xs transition active:scale-95"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => slideFeatured("next")}
                  aria-label="Next"
                  className="flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:text-black shadow-xs transition active:scale-95"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <div
              ref={featuredRef}
              className="blog-carousel mt-8 flex gap-6 overflow-x-auto overflow-y-hidden pb-4"
            >
              {featuredPosts.map((post) => (
                <FeaturedCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH BLOG (LIGHT SOPHISTICATED THEME) */}
        <section className="bg-[#f8fafc] border-b border-neutral-200/80">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-semibold tracking-widest text-blue-600 uppercase">
                   Rivinity Labs
                </span>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl text-neutral-950">
                  Research blog
                </h2>
                <p className="mt-2 max-w-md text-sm text-neutral-500">
                  Foundational ideas and systems research for production AI.
                </p>
              </div>

              {/* Light Arrow Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => slideResearch("previous")}
                  aria-label="Previous"
                  className="flex size-9 items-center justify-center rounded-full border border-neutral-300/90 bg-white text-neutral-700 hover:border-neutral-400 hover:text-black shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => slideResearch("next")}
                  aria-label="Next"
                  className="flex size-9 items-center justify-center rounded-full border border-neutral-300/90 bg-white text-neutral-700 hover:border-neutral-400 hover:text-black shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Research Cards Carousel */}
            <div
              ref={researchRef}
              className="blog-carousel mt-10 flex gap-5 overflow-x-auto overflow-y-hidden pb-4"
            >
              {researchPosts.map((post) => (
                <ResearchCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 border-t border-neutral-200 pt-8 text-xs font-semibold tracking-widest text-neutral-400">
              <span className="cursor-pointer hover:text-neutral-900 transition">RIVINITY LABS</span>
              <span className="cursor-pointer hover:text-neutral-900 transition">AI RESEARCH</span>
              <span className="cursor-pointer hover:text-neutral-900 transition">ENGINEERING</span>
              <span className="cursor-pointer hover:text-neutral-900 transition">OPEN RESEARCH</span>
            </div>
          </div>
        </section>

        {/* COMPANY UPDATES */}
        <section className="bg-white border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <SectionTitle
              title="Company updates"
              description="Stories and updates from the Rivinity team."
            />

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {companyUpdates.map((post) => (
                <SmallPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* LATEST BLOG POSTS */}
        <section className="bg-[#fafafa] border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Latest blog posts
            </h2>

            {/* Category Filter Pills */}
            <div className="blog-carousel mt-6 flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setVisiblePosts(6);
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    activeCategory === category
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200 bg-white rounded-2xl px-6 sm:px-8 shadow-xs">
              {visibleLatestPosts.length > 0 ? (
                visibleLatestPosts.map((post) => (
                  <LatestPostRow key={post.id} post={post} />
                ))
              ) : (
                <div className="py-16 text-center text-sm text-neutral-500">
                  No posts found in this category.
                </div>
              )}
            </div>

            {visiblePosts < filteredLatestPosts.length && (
              <div className="flex justify-center pt-10">
                <button
                  type="button"
                  onClick={() => setVisiblePosts((current) => current + 3)}
                  className="rounded-full bg-neutral-900 px-8 py-3 text-xs font-medium text-white shadow-sm transition hover:bg-neutral-800"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA SECTION (LIGHT THEME MATCHING REST OF UI) */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-gradient-to-b from-slate-50 to-slate-100/70 px-8 py-16 text-center shadow-xs sm:px-16 sm:py-20">
              
              {/* Subtle background glow */}
              <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-blue-500/5 blur-3xl" />
              
              <div className="relative z-10">
                <span className="inline-block text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
                  BUILD WITH RIVINITY
                </span>

                <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  Turn ideas into intelligent products.
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
                  Explore Rivinity&apos;s platform and start building the next generation of AI-powered software.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link 
  href="#" 
  className="flex items-center gap-2 rounded-xl bg-white border border-neutral-200 px-6 py-3 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-50 shadow-sm"
> 
  <span>Start building</span> 
  <ArrowUpRight className="size-4" /> 
</Link>


                  <Link
                    href="#"
                    className="rounded-xl border border-neutral-300 bg-white px-6 py-3 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50 shadow-xs"
                  >
                    Explore documentation
                  </Link>
                </div>
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
        }
        .blog-carousel::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .blog-carousel {
          scroll-behavior: smooth;
          overscroll-behavior-x: contain;
        }
      `}</style>
    </>
  );
}

/* ============================================================
   SUB-COMPONENTS (LIGHT THEMED)
============================================================ */

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[85vw] shrink-0 sm:w-[50vw] md:w-[380px]"
    >
      <article>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="text-neutral-900 font-semibold">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

function SmallPostCard({ post }: { post: Post }) {
  return (
    <Link href={post.href || "#"} className="group block">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 font-medium">
          <span className="text-neutral-900 font-semibold">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <h3 className="mt-2 text-base font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-600 transition line-clamp-2">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {post.description}
        </p>
      </article>
    </Link>
  );
}

function ResearchCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[85vw] shrink-0 sm:w-[320px]"
    >
      <article className="flex h-[350px] flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-6 transition duration-300 hover:border-neutral-300 hover:shadow-md">
        <div>
          <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            {post.category}
          </span>

          <h3 className="mt-4 text-base sm:text-lg font-semibold leading-snug tracking-tight text-neutral-950 group-hover:text-neutral-600 transition line-clamp-3">
            {post.title}
          </h3>

          <p className="mt-2.5 text-xs leading-relaxed text-neutral-500 line-clamp-3">
            {post.description}
          </p>
        </div>

        <div>
          {post.authors && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              {post.authors}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
            <span className="text-xs text-neutral-400 font-medium">
              {post.date}
            </span>
            <div className="flex size-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition group-hover:bg-neutral-950 group-hover:text-white">
              <ArrowUpRight className="size-3.5" />
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
      className="group block py-6 transition first:pt-8 last:pb-8"
    >
      <article className="flex items-center justify-between gap-6 sm:gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
            <span className="font-semibold text-neutral-900 uppercase tracking-wide text-[11px]">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock3 className="size-3" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="mt-2 text-base sm:text-lg font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-600 transition">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-neutral-500">
            {post.description}
          </p>
        </div>

        <div className="relative aspect-[16/10] w-28 sm:w-44 shrink-0 overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200/80">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
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
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}