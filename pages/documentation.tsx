import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";


/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

type NavItem = {
  label: string;
  href: string;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const guideSections: NavSection[] = [
  {
    label: "Guides",
    items: [
      { label: "Working with the API", href: "#api" },
      { label: "Data Models", href: "#data-models" },
      { label: "Entities", href: "#entities" },
      { label: "ACH", href: "#ach" },
      { label: "Domestic Wire", href: "#domestic-wire" },
      { label: "International Wires", href: "#international-wires" },
      { label: "Realtime Payments", href: "#realtime" },
      { label: "Checks", href: "#checks" },
      { label: "Loans", href: "#loans" },
    ],
  },
  {
    label: "API Reference",
    items: [
      { label: "Entity", href: "#entity" },
      { label: "Bank Account", href: "#bank-account" },
      { label: "Account Number", href: "#account-number" },
      { label: "Loans", href: "#loans-reference" },
      { label: "Counterparty", href: "#counterparty" },
      { label: "ACH Transfer", href: "#ach-transfer" },
      { label: "ACH Positive Pay", href: "#ach-positive-pay" },
      { label: "Book Transfer", href: "#book-transfer" },
      { label: "Wire Transfer", href: "#wire-transfer" },
      { label: "International Wire", href: "#international-wire" },
      { label: "Realtime Transfer", href: "#realtime-transfer" },
      { label: "Check Transfer", href: "#check-transfer" },
      { label: "Transfer", href: "#transfer" },
      { label: "Simulation", href: "#simulation" },
    ],
  },
];

const supportCards = [
  {
    title: "Share feedback",
    description:
      "Share what you love, what could be better, or what you want to see next.",
    cta: "Contact us",
    href: "mailto:developers@rivinity.com",
  },
  {
    title: "Technical support",
    description:
      "Get help from our team when you run into an issue with your integration.",
    cta: "Contact us",
    href: "mailto:support@rivinity.com",
  },
  {
    title: "Reach the team",
    description:
      "Questions, complaints, or compliments — reach the Rivinity team directly.",
    cta: "Contact us",
    href: "mailto:team@rivinity.com",
  },
];

const guides = [
  {
    category: "Technical Guide",
    title: "Getting Started",
    description:
      "Build your first workflow with Rivinity APIs and start integrating production-ready infrastructure.",
  },
  {
    category: "Use Case",
    title: "Working with the API",
    description:
      "Learn how to authenticate requests, create resources, manage responses, and build reliable integrations.",
  },
  {
    category: "Use Case",
    title: "Data Models",
    description:
      "Understand the core objects, relationships, and data structures used throughout the Rivinity platform.",
  },
  {
    category: "Developer Guide",
    title: "API Reference",
    description:
      "Explore endpoints, parameters, request formats, responses, and examples for the Rivinity API.",
  },
];

const companyLinks: [string, string][] = [
  ["About", "/about"],
  ["Careers", "/careers"],
  ["Certificate", "/certificate"],
  ["Contact", "/contact"],
];

const mobileNavLinks: [string, string][] = [
  ["Platform", "/"],
  ["Solutions", "#"],
  ["Research", "/research"],
  ["Pricing", "#"],
];

function RivinityMark() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer geometric frame */}
      <rect
        x="4.5"
        y="4.5"
        width="25"
        height="25"
        rx="7"
        stroke="#C4622D"
        strokeWidth="1.8"
      />

      {/* Central R-inspired mark */}
      <path
        d="M11 23V11H17.2C20.2 11 22 12.55 22 15C22 17.15 20.55 18.55 18.35 18.9L22.5 23"
        stroke="#C4622D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M11 18.5H16.6C18.7 18.5 20 17.2 20 15.3C20 13.45 18.7 12 16.6 12H11"
        stroke="#C4622D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10H15M10.5 5.5L15 10L10.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-40"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.7" cy="8.7" r="5.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 9.5L10 4L17 9.5M4.5 8.5V16H15.5V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR                                                                    */
/* -------------------------------------------------------------------------- */

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col py-5">
      {/* HOME */}
      <div className="mb-7">
        <a
          href="#home"
          onClick={onNavigate}
          className="group flex h-10 items-center gap-3 rounded-lg bg-white px-3 text-[13px] font-semibold text-[#10253F] shadow-[0_1px_3px_rgba(20,35,50,0.05)] transition-all duration-200 hover:shadow-[0_3px_10px_rgba(20,35,50,0.08)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F1F4F6] text-[#31516B] transition-colors duration-200 group-hover:bg-[#E8EEF2]">
            <HomeIcon />
          </span>

          <span>Home</span>
        </a>
      </div>

      {/* GUIDE SECTIONS */}
      <div className="flex flex-col gap-8">
        {guideSections.map((section) => (
          <div key={section.label}>
            {/* SECTION TITLE */}
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A0A9B2]">
              {section.label}
            </p>

            {/* SECTION ITEMS */}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onNavigate}
                  className="group flex min-h-9 items-center justify-between rounded-md px-3 text-[13px] font-medium text-[#68737E] transition-all duration-150 hover:bg-white hover:text-[#10253F]"
                >
                  <span className="truncate">{item.label}</span>

                  <span className="ml-3 flex h-5 w-5 shrink-0 items-center justify-center text-[#AAB3BB] opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-[#31516B]">
                    <ChevronRight />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* GUIDE CARD                                                                 */
/* -------------------------------------------------------------------------- */

function GuideCard({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href="#"
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E5E0D8] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D7CEC2] hover:shadow-[0_20px_55px_rgba(31,48,67,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] focus-visible:ring-offset-2"
    >
      {/* ------------------------------------------------------------------ */}
      {/* VISUAL HEADER                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative h-[170px] overflow-hidden border-b border-[#EAE5DE] bg-[#F8F5F0]">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(#D9D2C8 1px, transparent 1px), linear-gradient(90deg, #D9D2C8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Soft center glow */}
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C4622D]/[0.06] blur-2xl" />

        {/* Orbit system */}
        <div className="absolute left-1/2 top-1/2 h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C4622D]/20" />

        <div className="absolute left-1/2 top-1/2 h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C4622D]/25" />

        <div className="absolute left-1/2 top-1/2 h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C4622D]/30 bg-white/70" />

        {/* Center node */}
        <div className="absolute left-1/2 top-1/2 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C4622D] shadow-[0_0_0_5px_rgba(196,98,45,0.08)]">
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </div>

        {/* Orbit nodes */}
        <span className="absolute left-[calc(50%-59px)] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-[#C4622D]/40 bg-[#F8F5F0]" />

        <span className="absolute left-1/2 top-[calc(50%-59px)] h-2 w-2 -translate-x-1/2 rounded-full border border-[#C4622D]/40 bg-[#F8F5F0]" />

        <span className="absolute bottom-[calc(50%-59px)] right-[calc(50%-59px)] h-2 w-2 rounded-full border border-[#10253F]/20 bg-[#F8F5F0]" />

        {/* Top label */}
        <div className="absolute left-5 top-5">
          <span className="inline-flex items-center rounded-full border border-[#E2D9CE] bg-white/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F6A63] backdrop-blur-sm">
            Guide
          </span>
        </div>

        {/* Index */}
        <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.12em] text-[#A19A91]">
          01
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />

          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#C4622D]">
            {category}
          </p>
        </div>

        {/* Title */}
        <h3 className="max-w-[90%] text-[19px] font-semibold leading-[1.25] tracking-[-0.025em] text-[#10253F]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[13px] leading-[1.75] text-[#687482]">
          {description}
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* FOOTER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-[#ECE7E0] pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A847C]">
              Read guide
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDD6CC] bg-[#FAF8F5] text-[#10253F] transition-all duration-300 group-hover:border-[#C4622D] group-hover:bg-[#C4622D] group-hover:text-white">
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight />
              </span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function DocsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);

  // Close the company dropdown on outside click or Escape.
  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCompanyOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div id="home" className="min-h-screen bg-[#FCFBF9] text-[#10253f]">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <Header/>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE MENU                                                        */}
      {/* ------------------------------------------------------------------ */}

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-[#10253f]/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[310px] overflow-y-auto bg-[#f8f5ef] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e5dfd6] bg-white px-5 py-5">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <RivinityMark />
                <span className="font-semibold tracking-[-0.03em]">RIVINITY</span>
              </Link>

              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-[#10253f] transition hover:bg-[#f8f5ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-3 py-4">
              <div className="mb-4 rounded-xl bg-white p-2">
                {mobileNavLinks.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#25384e] transition hover:bg-[#f8f5ef]"
                  >
                    {label}
                  </Link>
                ))}

                <Link
                  href="/docs"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg bg-[#f8f5ef] px-3 py-2.5 text-sm font-medium text-[#10253f]"
                >
                  Documentation
                </Link>
              </div>

              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden border-b border-[#e9e3da] bg-[#FCFBF9]">
        <div className="mx-auto max-w-[1180px] px-5 pb-14 pt-14 sm:pb-16 sm:pt-16 lg:px-7 lg:pb-20 lg:pt-20">
          <div className="max-w-[820px]">

            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e4ddd4] bg-[#F7F4EF] px-3.5 py-2 text-[11px] font-medium tracking-[0.01em] text-[#66717d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />
              Developer Documentation
            </div>

            {/* Heading */}
            <h1 className="max-w-[800px] text-[50px] font-medium leading-[0.98] tracking-[-0.055em] text-[#18304A] sm:text-[64px] lg:text-[76px]">
              Build with
              <br />
              <span className="text-[#9AA3AC]">Rivinity.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[600px] text-[16px] leading-7 text-[#68737E] sm:text-[17px]">
              Everything you need to build, integrate, and ship with the
              Rivinity platform. Explore guides, API references, and
              developer resources.
            </p>

            {/* Search */}
            <div className="mt-9 flex h-[56px] w-full max-w-[620px] items-center gap-3 rounded-xl border border-[#DED8CF] bg-white px-4 transition-all duration-200 focus-within:border-[#C4622D]/50 focus-within:ring-4 focus-within:ring-[#C4622D]/10">
              <span className="flex shrink-0 items-center text-[#8E98A2]">
                <SearchIcon />
              </span>

              <input
                type="text"
                placeholder="Search documentation..."
                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#18304A] outline-none placeholder:text-[#A0A7AE]"
              />

              <kbd className="hidden rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-1 font-mono text-[10px] text-[#9AA3AC] sm:block">
                /
              </kbd>
            </div>

            {/* Quick links */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#89929B]">
              <span className="text-[#68737E]">Popular:</span>

              <a
                href="#getting-started"
                className="transition-colors hover:text-[#C4622D]"
              >
                Getting Started
              </a>

              <a
                href="#api-reference"
                className="transition-colors hover:text-[#C4622D]"
              >
                API Reference
              </a>

              <a
                href="#authentication"
                className="transition-colors hover:text-[#C4622D]"
              >
                Authentication
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DOCUMENTATION AREA                                                 */}
      {/* ------------------------------------------------------------------ */}

      <div className="mx-auto flex w-full max-w-[1440px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 w-[250px] shrink-0 border-r border-[#E7E3DD]">
          <SidebarContent />
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 pl-10 lg:pl-14">
          <div className="mx-auto max-w-[800px]">
            {/* Intro */}
            <section className="mb-14">
              <p className="text-[15px] leading-7 text-[#687482]">
                For feedback email us at{" "}
                <a
                  href="mailto:developers@rivinity.com"
                  className="font-medium text-[#C4622D] hover:underline"
                >
                  developers@rivinity.com
                </a>
                . For technical support email us at{" "}
                <a
                  href="mailto:support@rivinity.com"
                  className="font-medium text-[#C4622D] hover:underline"
                >
                  support@rivinity.com
                </a>
                , and if you want to reach the founding team directly, you can
                write to{" "}
                <a
                  href="mailto:team@rivinity.com"
                  className="font-medium text-[#C4622D] hover:underline"
                >
                  team@rivinity.com
                </a>
                .
              </p>
            </section>

            {/* Support */}
            <section className="mb-16">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {supportCards.map((card) => (
                  <div
                    key={card.title}
                    className="group rounded-[16px] border border-[#e5dfd6] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d8c9ba] hover:shadow-[0_15px_35px_rgba(29,44,61,0.06)]"
                  >
                    <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F5F0] text-[#C4622D]">
                      <ArrowRight />
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#10253f]">{card.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#687482]">{card.description}</p>
                    <a
                      href={card.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#C4622D] hover:underline"
                    >
                      {card.cta}
                      <ArrowRight />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Guides Section */}
            <section className="mb-20">
              <h2 className="mb-6 text-[22px] font-semibold text-[#10253f]">Guides & Tutorials</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {guides.map((guide) => (
                  <GuideCard
                    key={guide.title}
                    category={guide.category}
                    title={guide.title}
                    description={guide.description}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}