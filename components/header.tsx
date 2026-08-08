"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

type DropdownItem = {
  label: string;
  href: string;
  description?: string;
};

type DropdownSection = {
  heading?: string;
  items: DropdownItem[];
};

type NavItem =
  | { label: string; href: string; type: "link" }
  | { label: string; type: "dropdown"; sections: DropdownSection[] };

const navItems: NavItem[] = [
  {
    label: "Products",
    type: "dropdown",
    sections: [
      {
        items: [
          { label: "Agent", href: "/products/agent" },
          { label: "Design", href: "/design" },
          { label: "Database", href: "/products/database" },
          { label: "Publish", href: "/products/deployments" },
          { label: "Integrations", href: "/integrations" },
          { label: "Mobile", href: "/products/mobile" },
        ],
      },
    ],
  },
  {
    label: "For Work",
    type: "dropdown",
    sections: [
      {
        items: [
          { label: "Pro", href: "/pro", description: "For serious builders" },
          { label: "Enterprise", href: "/enterprise", description: "Security & controls" },
        ],
      },
      {
        heading: "Use Cases",
        items: [
          { label: "Business Apps", href: "/usecases/business-apps" },
          { label: "Mobile Apps", href: "/usecases/mobile-apps" },
          { label: "Rapid Prototyping", href: "/usecases/rapid-prototyping" },
        ],
      },
      {
        heading: "Enterprise",
        items: [
          { label: "PM", href: "/usecases/product-managers" },
          { label: "Designers", href: "/usecases/designers" },
          { label: "Operations", href: "/usecases/operations" },
          { label: "Software Developers", href: "/usecases/software-engineers" },
        ],
      },
      {
        heading: "Small Businesses",
        items: [
          { label: "SMB Owners", href: "/usecases/smb" },
          { label: "Founders", href: "/usecases/founders" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    type: "dropdown",
    sections: [
      {
        heading: "Get Started",
        items: [
          { label: "Docs", href: "/docs" },
          { label: "Community", href: "/community" },
          { label: "Expert Network", href: "/experts" },
        ],
      },
      {
        heading: "Inspiration",
        items: [
          { label: "Customer Stories", href: "/customers" },
          { label: "Gallery", href: "/gallery" },
          { label: "Blog", href: "/blog" },
          { label: "News", href: "/news" },
        ],
      },
    ],
  },
  { label: "Security", href: "/security", type: "link" },
  { label: "Pricing", href: "/pricing", type: "link" },
  { label: "Careers", href: "/careers", type: "link" },
];

// Reusable "Agent 4" pill badge — built with CSS, no SVG dependency
function AgentBadge({ className = "" }: { className?: string }) {
  return (
    <Link href="/agent4" className={`relative inline-flex items-center mr-3 ${className}`}>
      <span className="flex items-center rounded-full bg-[#FF3C00] py-2 pl-4 pr-6 text-sm font-semibold text-white transition-transform group-hover:scale-105">
        Agent
      </span>
      <span className="absolute -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF3C00] text-sm font-bold text-white ring-4 ring-[#FAF6F1]">
        4
      </span>
    </Link>
  );
}

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
        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-2 lg:flex"
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2.5 text-[14px] font-medium text-[#3C3C43] transition hover:bg-[#E9E7E0] rounded-lg"
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
                  className={`flex items-center gap-2 rounded-lg px-2  py-2.5 text-[15px] font-medium text-[#3C3C43] transition-all duration-200
                      ${openDropdown === item.label
                      ? "bg-[#F1EFEA]"
                      : "bg-transparent hover:bg-[#F1EFEA]"
                    }`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 top-full z-50 mt-2 flex gap-8 rounded-xl border border-black/10 bg-[#F1F0EE] p-4 shadow-xl"
                      style={{ minWidth: item.sections.length > 1 ? "140px" : "80px" }}
                    >
                      {item.sections.map((section, idx) => (
                        <div key={idx} className="flex min-w-40 flex-col gap-1">
                          {section.heading && (
                            <span className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                              {section.heading}
                            </span>
                          )}
                          {section.items.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="rounded-lg px-2 py-2 text-sm font-medium text-gray-800 transition hover:bg-black/5"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {sub.label}
                              {sub.description && (
                                <span className="block text-xs font-normal text-gray-500">
                                  {sub.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}

          {/* <AgentBadge className="group ml-3" /> */}
        </nav>

        {/* Right Buttons */}
        <div className="hidden items-center gap-1 lg:flex ml-auto">
          <Link
            href="/enterprise"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-black/5 whitespace-nowrap"
          >
            Contact Sales
          </Link>
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-black/5"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#FF5A1F] px-3 py-2 text-base font-semibold text-[#FF5A1F] active:scale-95"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#FF5A1F] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Create Account
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden ml-auto shrink-0">
          {/* <AgentBadge className="group" /> */}
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
                  href="/login"
                  className="rounded-md px-3 py-3 text-center text-sm font-medium text-gray-700 hover:bg-black/5"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full border-2 border-solid border-[#FF5A1F] px-5 py-3 text-center text-sm font-semibold text-[#ff5a1f] transition-colors duration-200 hover:bg-[#ff5a1f] hover:text-white active:scale-95"
                >
                  Create Account
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
            {item.sections.map((section, idx) => (
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
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}