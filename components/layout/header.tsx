"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  MessageSquare,
  Bot,
  Sparkles,
  Store,
  Cloud,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useAuthModal } from "@/components/auth/auth-context";

// ---------- Types ----------

type DropdownItem = {
  label: string;
  href: string;
  description?: string;
};

type DropdownSection = {
  heading?: string;
  items: DropdownItem[];
};

type FeaturedItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
};

type CategoryGroup = {
  label: string;
  items: DropdownItem[];
};

type NavItem =
  | { label: string; href: string; type: "link" }
  | { label: string; type: "dropdown"; variant?: "sections"; sections: DropdownSection[] }
  | {
    label: string;
    type: "dropdown";
    variant: "platform";
    featured: FeaturedItem[];
    categories: CategoryGroup[];
  };

// ---------- Nav data ----------

const navItems: NavItem[] = [
  {
    label: "Platform",
    type: "dropdown",
    variant: "platform",
    featured: [
      {
        label: "AI Chat",
        href: "/products/ai-chat",
        icon: MessageSquare,
        description: "Talk to your data and workflows",
      },
      {
        label: "Agent Studio",
        href: "/products/agent-studio",
        icon: Bot,
        description: "Build and deploy custom agents",
      },
      {
        label: "RivinityLM",
        href: "/products/rivinitylm",
        icon: Sparkles,
        description: "Your own fine-tuned model",
      },
      {
        label: "Marketplace",
        href: "/marketplace",
        icon: Store,
        description: "Extend Rivinity with plugins",
      },
      {
        label: "Rivinity Cloud",
        href: "/products/cloud",
        icon: Cloud,
        description: "Managed infra for your agents",
      },
      {
        label: "Supernova",
        href: "/products/supernova",
        icon: Zap,
        description: "Next-gen orchestration engine",
        badge: "Coming soon",
      },
    ],
    categories: [
      {
        label: "Build",
        items: [
          { label: "Agent", href: "/products/agent" },
          { label: "Design", href: "/design" },
          { label: "Database", href: "/products/database" },
        ],
      },
      {
        label: "Automate",
        items: [
          { label: "Publish", href: "/products/deployments" },
          { label: "Integrations", href: "/integration" },
        ],
      },
      {
        label: "Create",
        items: [{ label: "Mobile", href: "/products/mobile" }],
      },
      {
        label: "Understand",
        items: [
          { label: "Analytics", href: "/products/analytics" },
          { label: "Observability", href: "/products/observability" },
        ],
      },
      {
        label: "Govern",
        items: [
          { label: "Guardrails", href: "/products/guardrails" },
          { label: "Compliance", href: "/compliance" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    type: "dropdown",
    sections: [
      {
        items: [
          {
            label: "Enterprise",
            href: "/enterprise",
            description: "Scale Rivinity across your org with security & controls",
          },
          {
            label: "Government & Defense",
            href: "/government",
            description: "FedRAMP-ready deployments for public sector teams",
          },
          {
            label: "Cybersecurity",
            href: "/cybersecurity",
            description: "Harden and audit agent workflows",
          },
          {
            label: "Developers",
            href: "/developer",
            description: "APIs, SDKs, and CLI tooling",
          },
          {
            label: "Education & Research",
            href: "/education",
            description: "Free access for students & researchers",
          },
        ],
      },
    ],
  },
  {
    label: "Research",
    type: "dropdown",
    sections: [
      {
        items: [
          { label: "Research", href: "/research", description: "Advancing foundational AI architecture" },
          { label: "Blog", href: "/blog", description: "Product updates, engineering deep dives" },
          { label: "Papers", href: "/papers", description: "Published academic benchmarks & papers" },
          { label: "Rivinity Academy", href: "/academy", description: "Guides, tutorials, and certifications" },
        ],
      },
    ],
  },
  { label: "Pricing", href: "/pricing", type: "link" },
  {
    label: "Company",
    type: "dropdown",
    sections: [
      {
        items: [
          { label: "About", href: "/about", description: "Our mission to revolutionize AI workflows" },
          { label: "Team", href: "/team", description: "The builders and researchers behind Rivinity" },
          { label: "Careers", href: "/careers", description: "Join our fast-growing global team" },
          { label: "Certificate", href: "/certificate", description: "Verify official partner certificates" },
          { label: "Contact", href: "/contact", description: "Talk with our product specialists" },
        ],
      },
    ],
  },
];



// ---------- Platform flagship panel ----------

function PlatformDropdownPanel({
  featured,
  categories,
  onNavigate,
}: {
  featured: FeaturedItem[];
  categories: CategoryGroup[];
  onNavigate: () => void;
}) {
  return (
    <div className="w-[720px] p-5 bg-white" style={{ backgroundColor: "#ffffff" }}>
      {/* Flagship row */}
      <div className="grid grid-cols-3 gap-2 pb-4 mb-4 border-b border-neutral-100">
        {featured.map((product) => {
          const Icon = product.icon;
          return (
            <Link
              key={product.label}
              href={product.href}
              onClick={onNavigate}
              className="group relative flex items-start gap-3 rounded-xl p-2.5 hover:bg-neutral-50 transition-all"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-[#FF5A1F] shrink-0 group-hover:bg-[#FF5A1F] group-hover:text-white transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#FF5A1F] transition-colors">
                    {product.label}
                  </span>
                  {product.badge && (
                    <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-orange-100 text-[#FF5A1F] font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                  {product.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Categorized list */}
      <div className="grid grid-cols-5 gap-3">
        {categories.map((category) => (
          <div key={category.label}>
            <h4 className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              {category.label}
            </h4>
            {category.items.length > 0 ? (
              <ul className="list-none m-0 p-0 space-y-0.5">
                {category.items.map((link) => (
                  <li key={link.label} className="list-none">
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-2 py-1 text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="px-2 text-xs text-neutral-400">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RegularDropdownPanel({
  sections,
  onNavigate,
}: {
  sections: DropdownSection[];
  onNavigate: () => void;
}) {
  return (
    <div className="flex gap-4 p-4 min-w-[320px] max-w-[480px] bg-white" style={{ backgroundColor: "#ffffff" }}>
      {sections.map((section, idx) => (
        <div key={idx} className="flex flex-1 flex-col gap-1">
          {section.heading && (
            <span className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              {section.heading}
            </span>
          )}
          {section.items.map((sub) => (
            <Link
              key={sub.label}
              href={sub.href}
              className="group rounded-xl px-3 py-2 text-xs transition-colors hover:bg-neutral-50"
              onClick={onNavigate}
            >
              <div className="font-semibold text-neutral-900 group-hover:text-[#FF5A1F] transition-colors">
                {sub.label}
              </div>
              {sub.description && (
                <div className="mt-0.5 text-[11px] leading-snug text-neutral-500">
                  {sub.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

// ---------- Header ----------

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const { openAuth } = useAuthModal();

  useEffect(() => {
    // Delay enabling mouseenter hover until after page has fully loaded
    const timer = setTimeout(() => {
      setCanHover(true);
    }, 400);

    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: "#ffffff" }}
        className={`pointer-events-auto mx-auto flex h-[60px] sm:h-[66px] max-w-6xl items-center justify-between px-5 sm:px-7 rounded-full border border-neutral-200/80 bg-white transition-all duration-300 ${scrolled
          ? "shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
          : "shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center shrink-0 py-1">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center transition-transform duration-200"
          >
            <Image
              src="/rivinity_logo_cropped.png"
              alt="Rivinity Logo"
              width={140}
              height={46}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                href={item.href}
                style={{ color: "#404040" }}
                className="appearance-none border-0 outline-none bg-transparent inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-medium hover:!text-neutral-950 hover:bg-neutral-100 transition-colors select-none"
              >
                <span>{item.label}</span>
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (canHover) setOpenDropdown(item.label);
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                  style={{ color: openDropdown === item.label ? "#0a0a0a" : "#404040" }}
                  className={`appearance-none border-0 outline-none inline-flex items-center justify-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer select-none ${openDropdown === item.label
                    ? "bg-neutral-100 !text-neutral-950"
                    : "bg-transparent hover:!text-neutral-950 hover:bg-neutral-100"
                    }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={14}
                    style={{ color: openDropdown === item.label ? "#0a0a0a" : "#737373" }}
                    className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      style={{ backgroundColor: "#ffffff" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.06)] z-50 overflow-hidden"
                    >
                      {item.variant === "platform" ? (
                        <PlatformDropdownPanel
                          featured={item.featured}
                          categories={item.categories}
                          onNavigate={() => setOpenDropdown(null)}
                        />
                      ) : (
                        <RegularDropdownPanel
                          sections={item.sections}
                          onNavigate={() => setOpenDropdown(null)}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}
        </nav>

        {/* Right CTA Area (Desktop) */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <Link
            href="/docs"
            style={{ color: "#404040" }}
            className="appearance-none border-0 outline-none bg-transparent inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-medium hover:!text-neutral-950 hover:bg-neutral-100 transition-colors select-none"
          >
            <span>Docs</span>
          </Link>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => openAuth("signin")}
            style={{ color: "#404040" }}
            className="appearance-none border-0 outline-none bg-transparent inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-medium hover:!text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer select-none"
          >
            <span>Sign in</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => openAuth("signup")}
            className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#FF7A45] hover:from-[#E54D15] hover:to-[#FF5A1F] shadow-[0_2px_10px_rgba(255,90,31,0.28)] hover:shadow-[0_4px_16px_rgba(255,90,31,0.4)] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="rounded-full p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: "#ffffff" }}
            className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl border border-neutral-200 bg-white shadow-2xl p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1 max-h-[75vh] overflow-y-auto px-2">
              {navItems.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-xl px-3 py-2.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <MobileAccordion
                    key={item.label}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                  />
                )
              )}

              <div className="mt-3 flex flex-col gap-2 border-t border-neutral-100 pt-3">
                <Link
                  href="/docs"
                  className="appearance-none bg-transparent rounded-xl px-3 py-2 text-center text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Docs
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openAuth("signin");
                  }}
                  className="appearance-none border-0 outline-none bg-transparent rounded-xl px-3 py-2 text-center text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openAuth("signup");
                  }}
                  className="rounded-full bg-[#FF5A1F] hover:bg-[#E54D15] px-4 py-2.5 text-center text-xs font-semibold text-white shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileAccordion({
  item,
  onNavigate,
}: {
  item: Extract<NavItem, { type: "dropdown" }>;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="appearance-none border-0 outline-none bg-transparent flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`text-neutral-500 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden pl-2"
          >
            {item.variant === "platform" ? (
              <div className="py-2 space-y-3">
                <div className="space-y-1">
                  <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Featured
                  </span>
                  {item.featured.map((product) => {
                    const Icon = product.icon;
                    return (
                      <Link
                        key={product.label}
                        href={product.href}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={onNavigate}
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-orange-50 text-[#FF5A1F]">
                          <Icon size={13} />
                        </div>
                        <span className="font-medium text-neutral-900">{product.label}</span>
                        {product.badge && (
                          <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.2 rounded-full bg-orange-100 text-[#FF5A1F] font-medium ml-auto">
                            {product.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {item.categories.map((category) =>
                  category.items.length > 0 ? (
                    <div key={category.label} className="space-y-1">
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        {category.label}
                      </span>
                      {category.items.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block rounded-lg px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
                          onClick={onNavigate}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <div className="py-1 space-y-1">
                {item.sections.map((section, idx) => (
                  <div key={idx} className="space-y-0.5">
                    {section.heading && (
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        {section.heading}
                      </span>
                    )}
                    {section.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block rounded-lg px-3 py-1.5 text-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
                        onClick={onNavigate}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}