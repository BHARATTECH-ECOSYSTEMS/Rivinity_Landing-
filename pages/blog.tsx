import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

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
   FEATURED POSTS
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

/* ============================================================
   PRODUCT UPDATES
============================================================ */

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

/* ============================================================
   RESEARCH POSTS
============================================================ */

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

/* ============================================================
   COMPANY UPDATES
============================================================ */

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

/* ============================================================
   LATEST POSTS
============================================================ */

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
   PAGE
============================================================ */

export default function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  const [featuredAtStart, setFeaturedAtStart] = useState(true);
  const [featuredAtEnd, setFeaturedAtEnd] = useState(false);

  const [researchAtStart, setResearchAtStart] = useState(true);
  const [researchAtEnd, setResearchAtEnd] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);

  const filteredLatestPosts = useMemo(() => {
    if (activeCategory === "All") {
      return latestPosts;
    }

    return latestPosts.filter(
      (post) => post.category === activeCategory
    );
  }, [activeCategory]);

  const visibleLatestPosts = filteredLatestPosts.slice(
    0,
    visiblePosts
  );

  /* ==========================================================
     CAROUSEL POSITION
  ========================================================== */

  const updateFeaturedButtons = () => {
    const el = featuredRef.current;

    if (!el) return;

    const atStart = el.scrollLeft <= 1;

    const atEnd =
      el.scrollLeft + el.clientWidth >=
      el.scrollWidth - 1;

    setFeaturedAtStart(atStart);
    setFeaturedAtEnd(atEnd);
  };

  const updateResearchButtons = () => {
    const el = researchRef.current;

    if (!el) return;

    const atStart = el.scrollLeft <= 1;

    const atEnd =
      el.scrollLeft + el.clientWidth >=
      el.scrollWidth - 1;

    setResearchAtStart(atStart);
    setResearchAtEnd(atEnd);
  };

  useEffect(() => {
    updateFeaturedButtons();
    updateResearchButtons();

    const featured = featuredRef.current;
    const research = researchRef.current;

    featured?.addEventListener(
      "scroll",
      updateFeaturedButtons,
      { passive: true }
    );

    research?.addEventListener(
      "scroll",
      updateResearchButtons,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateFeaturedButtons
    );

    window.addEventListener(
      "resize",
      updateResearchButtons
    );

    return () => {
      featured?.removeEventListener(
        "scroll",
        updateFeaturedButtons
      );

      research?.removeEventListener(
        "scroll",
        updateResearchButtons
      );

      window.removeEventListener(
        "resize",
        updateFeaturedButtons
      );

      window.removeEventListener(
        "resize",
        updateResearchButtons
      );
    };
  }, []);

  /* ==========================================================
     CAROUSEL ACTIONS
  ========================================================== */

  const slideFeatured = (direction: "next" | "previous") => {
    const el = featuredRef.current;

    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const amount = Math.max(280, el.clientWidth * 0.82);

    const target =
      direction === "next"
        ? Math.min(el.scrollLeft + amount, maxScroll)
        : Math.max(el.scrollLeft - amount, 0);

    el.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  const slideResearch = (direction: "next" | "previous") => {
    const el = researchRef.current;

    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const amount = Math.max(260, el.clientWidth * 0.82);

    const target =
      direction === "next"
        ? Math.min(el.scrollLeft + amount, maxScroll)
        : Math.max(el.scrollLeft - amount, 0);

    el.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  const handleCategory = (category: string) => {
    setActiveCategory(category);
    setVisiblePosts(6);
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

      <main className="min-h-screen bg-[#fafafa] text-[#111111]">

        {/* ======================================================
            BLOG + FEATURED
        ====================================================== */}

        <section className="overflow-hidden border-b border-black/[0.06]">

          <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10">

            {/* Header */}

            <div className="flex items-end justify-between gap-6">

              <h1 className="text-5xl font-medium tracking-[-0.065em] sm:text-6xl lg:text-[5rem]">
                Blog
              </h1>

              <div className="flex items-center gap-2 pb-1">

                <CarouselButton
                  direction="previous"
                  disabled={featuredAtStart}
                  onClick={() =>
                    slideFeatured("previous")
                  }
                />

                <CarouselButton
                  direction="next"
                  disabled={featuredAtEnd}
                  onClick={() =>
                    slideFeatured("next")
                  }
                />

              </div>

            </div>

            {/* Featured carousel */}

            <div
              ref={featuredRef}
              className="blog-carousel mt-10 flex gap-5 overflow-x-auto overflow-y-hidden pb-1"
            >

              {featuredPosts.map((post) => (
                <FeaturedCard
                  key={post.id}
                  post={post}
                />
              ))}

            </div>

          </div>

        </section>

        {/* ======================================================
            PRODUCT UPDATES
        ====================================================== */}

        <section className="bg-white">

          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">

            <SectionTitle
              title="Product updates"
              description="The latest products, capabilities and improvements from Rivinity."
            />

            <div className="mt-7 grid gap-5 md:grid-cols-3">

              {productUpdates.map((post) => (
                <SmallPostCard
                  key={post.id}
                  post={post}
                />
              ))}

            </div>

          </div>

        </section>

        {/* ======================================================
            RESEARCH BLOG
        ====================================================== */}

        <section className="overflow-hidden bg-[#05051f] text-white">

          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">

            <div className="flex items-end justify-between gap-6">

              <div>

                <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                  Research blog
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                  Foundational ideas and systems research for
                  production AI.
                </p>

              </div>

              <div className="flex items-center gap-2">

                <DarkCarouselButton
                  direction="previous"
                  disabled={researchAtStart}
                  onClick={() =>
                    slideResearch("previous")
                  }
                />

                <DarkCarouselButton
                  direction="next"
                  disabled={researchAtEnd}
                  onClick={() =>
                    slideResearch("next")
                  }
                />

              </div>

            </div>

            <div
              ref={researchRef}
              className="blog-carousel mt-8 flex gap-4 overflow-x-auto overflow-y-hidden pb-1"
            >

              {researchPosts.map((post) => (
                <ResearchCard
                  key={post.id}
                  post={post}
                />
              ))}

            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-7 text-[10px] font-medium tracking-wider text-white/25">

              <span>RIVINITY LABS</span>
              <span>AI RESEARCH</span>
              <span>ENGINEERING</span>
              <span>OPEN RESEARCH</span>

            </div>

          </div>

        </section>

        {/* ======================================================
            COMPANY UPDATES
        ====================================================== */}

        <section className="bg-white">

          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">

            <SectionTitle
              title="Company updates"
              description="Stories and updates from the Rivinity team."
            />

            <div className="mt-7 grid gap-5 md:grid-cols-3">

              {companyUpdates.map((post) => (
                <SmallPostCard
                  key={post.id}
                  post={post}
                />
              ))}

            </div>

          </div>

        </section>

        {/* ======================================================
            LATEST BLOG POSTS
        ====================================================== */}

        <section className="bg-[#fafafa]">

          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">

            <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
              Latest blog posts
            </h2>

            {/* Filters */}

            <div className="blog-carousel mt-6 flex gap-2 overflow-x-auto overflow-y-hidden pb-1">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategory(category)
                  }
                  className={`whitespace-nowrap rounded-sm border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                    activeCategory === category
                      ? "border-black bg-black !text-white"
                      : "border-black/10 bg-white text-black/45 hover:border-black/25 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>

            {/* Articles */}

            <div className="mt-5">

              {visibleLatestPosts.length > 0 ? (
                visibleLatestPosts.map((post) => (
                  <LatestPostRow
                    key={post.id}
                    post={post}
                  />
                ))
              ) : (
                <div className="border-y border-black/[0.08] py-14 text-center text-sm text-black/35">
                  No posts found in this category.
                </div>
              )}

            </div>

            {visiblePosts < filteredLatestPosts.length && (
              <div className="flex justify-center pt-7">

                <button
                  type="button"
                  onClick={() =>
                    setVisiblePosts(
                      (current) => current + 3
                    )
                  }
                  className="rounded-md bg-black px-7 py-3 text-xs font-semibold !text-white transition hover:bg-black/80"
                >
                  Load more
                </button>

              </div>
            )}

          </div>

        </section>

        {/* ======================================================
            CTA
        ====================================================== */}

        <section className="bg-white">

          <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10">

            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#eef5fb] px-7 py-12 text-center sm:px-12 sm:py-16">

              <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/70 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-white/70 blur-3xl" />

              <div className="relative">

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                  Build with Rivinity
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                  Turn ideas into intelligent products.
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-black/45">
                  Explore Rivinity&apos;s platform and start
                  building the next generation of AI-powered
                  software.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">

                  <Link
                    href="#"
                    className="group flex items-center gap-2 rounded-md bg-black px-6 py-3 text-xs font-semibold !text-white transition hover:bg-black/85"
                  >
                    Start building

                    <ArrowUpRight className="size-3.5 !text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="#"
                    className="rounded-md border border-black/10 bg-white px-6 py-3 text-xs font-semibold text-black transition hover:bg-black/[0.03]"
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
   CAROUSEL BUTTON
============================================================ */

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={
        direction === "previous"
          ? "Previous"
          : "Next"
      }
      className={`flex size-10 items-center justify-center rounded-md border transition ${
        disabled
          ? "cursor-not-allowed border-black/[0.05] bg-[#f5f5f5] text-black/15"
          : "border-black/[0.07] bg-[#f1f1f1] text-black/55 hover:bg-black hover:text-white"
      }`}
    >
      {direction === "previous" ? (
        <ArrowLeft className="size-4" />
      ) : (
        <ArrowRight className="size-4" />
      )}
    </button>
  );
}

/* ============================================================
   DARK CAROUSEL BUTTON
============================================================ */

function DarkCarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={
        direction === "previous"
          ? "Previous"
          : "Next"
      }
      className={`flex size-9 items-center justify-center rounded-md border transition ${
        disabled
          ? "cursor-not-allowed border-white/[0.05] bg-white/[0.03] text-white/10"
          : "border-white/10 bg-white/[0.05] text-white/45 hover:bg-white hover:text-black"
      }`}
    >
      {direction === "previous" ? (
        <ArrowLeft className="size-3.5" />
      ) : (
        <ArrowRight className="size-3.5" />
      )}
    </button>
  );
}

/* ============================================================
   FEATURED CARD
============================================================ */

function FeaturedCard({
  post,
}: {
  post: Post;
}) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[78vw] shrink-0 sm:w-[54vw] md:w-[40vw] lg:w-[31.5%]"
    >

      <article>

        <div className="relative aspect-[1.55/1] overflow-hidden rounded-[0.35rem] bg-[#eeeeee]">

          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"
          />

        </div>

        <div className="mt-3">

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider text-black/35">

            <span className="rounded-sm border border-black/10 px-2 py-1">
              {post.category}
            </span>

            <span>{post.date}</span>

          </div>

          <h3 className="mt-2 text-lg font-medium leading-[1.18] tracking-[-0.025em] transition-colors group-hover:text-black/55 sm:text-xl">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/40">
            {post.description}
          </p>

        </div>

      </article>

    </Link>
  );
}

/* ============================================================
   SMALL POST CARD
============================================================ */

function SmallPostCard({
  post,
}: {
  post: Post;
}) {
  return (
    <Link
      href={post.href || "#"}
      className="group block"
    >

      <article>

        <div className="relative aspect-[1.45/1] overflow-hidden rounded-[0.35rem] bg-[#eeeeee]">

          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />

        </div>

        <div className="mt-3 flex items-center gap-2">

          <span className="rounded-sm border border-black/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-black/45">
            {post.category}
          </span>

          <span className="text-[9px] text-black/30">
            {post.date}
          </span>

        </div>

        <h3 className="mt-2 text-base font-medium leading-[1.2] tracking-[-0.02em]">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/40">
          {post.description}
        </p>

      </article>

    </Link>
  );
}

/* ============================================================
   RESEARCH CARD
============================================================ */

function ResearchCard({
  post,
}: {
  post: Post;
}) {
  return (
    <Link
      href={post.href || "#"}
      className="group block w-[78vw] shrink-0 sm:w-[47%] md:w-[31%] lg:w-[23%]"
    >

      <article className="relative flex aspect-[0.88/1] flex-col justify-between overflow-hidden rounded-sm border border-white/[0.08] bg-white/[0.055] p-5 transition duration-300 group-hover:bg-white/[0.09]">

        <div>

          <span className="rounded-sm border border-white/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-white/50">
            {post.category}
          </span>

          <h3 className="mt-5 text-base font-medium leading-[1.18] tracking-[-0.02em] text-white sm:text-lg">
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-4 text-xs leading-5 text-white/40">
            {post.description}
          </p>

        </div>

        <div>

          {post.authors && (
            <p className="text-[9px] uppercase tracking-wider text-white/25">
              {post.authors}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">

            <span className="text-[9px] text-white/30">
              {post.date}
            </span>

            <ArrowUpRight className="size-3.5 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

          </div>

        </div>

      </article>

    </Link>
  );
}

/* ============================================================
   LATEST POST ROW
============================================================ */

function LatestPostRow({
  post,
}: {
  post: Post;
}) {
  return (
    <Link
      href={post.href || "#"}
      className="group block border-b border-black/[0.08] py-5 first:border-t"
    >

      <article className="grid grid-cols-[1fr_105px] items-center gap-5 sm:grid-cols-[105px_1fr_145px] sm:gap-8">

        <div className="hidden sm:block">

          <span className="inline-flex rounded-sm border border-black/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-black/45">
            {post.category}
          </span>

        </div>

        <div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-black/30">

            <span>{post.date}</span>

            <span className="size-1 rounded-full bg-black/15" />

            <span className="flex items-center gap-1">
              <Clock3 className="size-2.5" />
              {post.readingTime}
            </span>

          </div>

          <h3 className="mt-2 text-base font-medium leading-[1.2] tracking-[-0.02em] sm:text-lg">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 max-w-2xl text-xs leading-5 text-black/40">
            {post.description}
          </p>

        </div>

        <div className="relative aspect-[1.45/1] overflow-hidden rounded-sm bg-[#eeeeee]">

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

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>

      <h2 className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-xl text-xs leading-5 text-black/40 sm:text-sm">
        {description}
      </p>

    </div>
  );
}