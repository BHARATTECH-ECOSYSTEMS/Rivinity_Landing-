"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
          { label: "Integrations", href: "/integrations" },
        ],
      },
      {
        label: "Create",
        items: [{ label: "Mobile", href: "/products/mobile" }],
      },
      {
        label: "Understand",
        items: [
          // add items here
        ],
      },
      {
        label: "Govern",
        items: [
          // add items here
        ],
      },
    ],
  },
  {
    // Replit "For Work" pattern (https://replit.com/enterprise), relabeled for Rivinity
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
            href: "/developers",
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
          { label: "Blog", href: "/blog" },
          // Only keep "Papers" once there's real published research to link to
          { label: "Papers", href: "/research/papers" },
          { label: "Rivinity Academy", href: "/academy" },
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
          { label: "About", href: "/about" },
          // { label: "Team", href: "/team" },
          { label: "Careers", href: "/carrers" },
          { label: "Certificate", href: "/certificate" },
          { label: "Contact", href: "/contact" },
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
    <div className="w-180 p-5">
      {/* Flagship row */}
      <div className="grid grid-cols-3 gap-1 pb-4 mb-4 border-b border-black/10">
        {featured.map((product) => {
          const Icon = product.icon;
          return (
            <Link
              key={product.label}
              href={product.href}
              onClick={onNavigate}
              className="group relative flex items-start gap-3 rounded-lg p-3 hover:bg-black/5 transition-colors"
            >
              <Icon className="h-5 w-5 mt-0.5 text-gray-500 group-hover:text-gray-900 transition-colors shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{product.label}</span>
                  {product.badge && (
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-black/5 text-gray-500">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{product.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Compact categorized list */}
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.label}>
            <h4 className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              {category.label}
            </h4>
            {category.items.length > 0 ? (
              <ul className="list-none m-0 p-0 space-y-0.5">
                {category.items.map((link) => (
                  <li key={link.label} className="list-none">
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-2 py-1.5 text-sm font-medium text-gray-800 hover:bg-black/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="px-2 text-sm text-gray-400">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function hasDescriptions(sections: DropdownSection[]) {
  return sections.some((section) => section.items.some((item) => item.description));
}

// ---------- Header ----------

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#fafafa]">
      <div className="mx-auto flex h-19 max-w-360 items-center justify-start px-4 sm:px-6 lg:px-10 gap-3 sm:gap-6 lg:gap-15">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1 shrink-0">
          <div className="relative h-[clamp(36px,8vw,60px)] w-[clamp(36px,8vw,60px)] transition-transform duration-300 group-hover:scale-110">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="text-foreground text-[clamp(17px,4.2vw,28px)] font-semibold tracking-[-1px] text-[#313337] transition-colors whitespace-nowrap">
            RIVINITY
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex" onMouseLeave={() => setOpenDropdown(null)}>
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2.5 text-[14px] text-gray-500 transition hover:bg-[#E9E7E0] rounded-lg"
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
              >
                <button
                  className={`flex items-center gap-2 rounded-lg px-2 py-2.5 text-[15px] font-medium text-[#3C3C43] transition-all duration-200
                      ${openDropdown === item.label ? "bg-[#F1EFEA]" : "bg-transparent hover:bg-[#F1EFEA]"}`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 top-full z-50 mt-2 rounded-xl border border-black/10 bg-[#F1F0EE] shadow-xl overflow-hidden"
                      style={
                        item.variant === "platform"
                          ? { minWidth: "720px" }
                          : {
                              minWidth: hasDescriptions(item.sections)
                                ? "280px"
                                : item.sections.length > 1
                                ? "140px"
                                : "80px",
                            }
                      }
                    >
                      {item.variant === "platform" ? (
                        <PlatformDropdownPanel
                          featured={item.featured}
                          categories={item.categories}
                          onNavigate={() => setOpenDropdown(null)}
                        />
                      ) : (
                        <div className="flex gap-8 p-4">
                          {item.sections.map((section, idx) => (
                            <div key={idx} className="flex min-w-40 flex-col gap-0.5">
                              {section.heading && (
                                <span className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                  {section.heading}
                                </span>
                              )}
                              {section.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className="rounded-lg px-3 py-2 text-sm font-medium leading-snug text-gray-800 transition hover:bg-black/5"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {sub.label}
                                  {sub.description && (
                                    <span className="mt-0.5 block text-xs font-normal leading-snug text-gray-500">
                                      {sub.description}
                                    </span>
                                  )}
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
            )
          )}
        </nav>

        {/* Right utility: Docs / Sign in / Get Started */}
        <div className="hidden items-center gap-1 lg:flex ml-auto">
          <Link
            href="/docs"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-black/5"
          >
            Docs
          </Link>
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-black/5"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#FF5A1F] px-4 py-2 text-sm font-semibold text-[#FF5A1F] active:scale-95"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#FF5A1F] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Get Started
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden ml-auto shrink-0">
          <button
            className="rounded-md p-2 shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-black/10 bg-[#FAF6F1] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 sm:px-6 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-black/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <MobileAccordion key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                )
              )}

              <div className="mt-4 flex flex-col gap-2 border-t border-black/10 pt-4">
                <Link
                  href="/docs"
                  className="rounded-md px-3 py-3 text-center text-sm font-medium text-gray-700 hover:bg-black/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-3 text-center text-sm font-medium text-gray-700 hover:bg-black/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full border-2 border-solid border-[#FF5A1F] px-5 py-3 text-center text-sm font-semibold text-[#ff5a1f] transition-colors duration-200 hover:bg-[#ff5a1f] hover:text-white active:scale-95"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
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
        className="appearance-none border-0 bg-transparent flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-black/5"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-3"
          >
            {item.variant === "platform" ? (
              <div className="py-2">
                {/* Flagship items, flattened for mobile */}
                <span className="px-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Featured
                </span>
                {item.featured.map((product) => {
                  const Icon = product.icon;
                  return (
                    <Link
                      key={product.label}
                      href={product.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-black/5"
                      onClick={onNavigate}
                    >
                      <Icon size={16} className="text-gray-500 shrink-0" />
                      {product.label}
                      {product.badge && (
                        <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-black/5 text-gray-500">
                          {product.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                {item.categories.map((category) =>
                  category.items.length > 0 ? (
                    <div key={category.label} className="mt-3">
                      <span className="px-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                        {category.label}
                      </span>
                      {category.items.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-black/5"
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
              item.sections.map((section, idx) => (
                <div key={idx} className="py-2">
                  {section.heading && (
                    <span className="px-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                      {section.heading}
                    </span>
                  )}
                  {section.items.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-black/5"
                      onClick={onNavigate}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}