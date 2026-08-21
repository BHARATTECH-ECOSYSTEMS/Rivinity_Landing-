"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/carrers" },
      { label: "Governance", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Security", href: "/security" },
      { label: "Compliance", href: "/Compliance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Research", href: "/research" },
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/documentation" },
      { label: "API Status", href: "/apitest" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "CLOS-AI", href: "#" },
      { label: "Deepfake Detection", href: "#" },
      { label: "Post Your Ad", href: "#" },
      { label: "Agent as a Platform", href: "#" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Twitter/X", href: "https://twitter.com/rivinity" },
  { label: "GitHub", href: "https://github.com/rivinity" },
  { label: "LinkedIn", href: "https://linkedin.com/company/rivinity" },
  { label: "Discord", href: "https://discord.gg/rivinity" },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const navStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

const riseItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0,
    },
  },
};

const linkStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const linkItem: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.4,
      bounce: 0,
    },
  },
};

const heroBrandVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 1.1,
      bounce: 0,
    },
  },
};

/* ------------------------------------------------------------------ */
/* Footer column                                                       */
/* ------------------------------------------------------------------ */

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  return (
    <motion.div variants={riseItem} className="min-w-0">
      <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#8B8F8F]">
        {column.title}
      </h3>

      <motion.ul
        variants={linkStagger}
        className="m-0 mt-4 sm:mt-7 list-none space-y-3 sm:space-y-5 p-0"
      >
        {column.links.map((link) => (
          <motion.li key={link.label} variants={linkItem} className="m-0 p-0">
            <a
              href={link.href}
              className="inline-block text-sm sm:text-base leading-tight text-[#16181A] transition-colors duration-200 hover:text-[#6B6F72]"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const brandName = "RIVINITY";
  const description = "Made in India.";

  return (
    <footer
      className="relative w-full overflow-hidden rounded-t-3xl sm:rounded-t-4xl md:rounded-t-[3rem] font-sans antialiased pb-24 sm:pb-36 lg:pb-44 border-t border-gray-100">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="relative z-10 px-4 sm:px-10 pt-8 sm:pt-14 pb-0 lg:px-14 lg:pt-16 xl:px-20"
      >
        <div className="mx-auto flex max-w-350 flex-col justify-between gap-10 sm:gap-12 lg:flex-row lg:gap-20 xl:gap-28">
          {/* Brand block */}
          <motion.div
            variants={riseItem}
            className="flex shrink-0 flex-col gap-4 sm:gap-5 lg:max-w-60 xl:max-w-65"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 sm:h-12 w-auto items-center">
                <Image
                  src="/logo.png"
                  alt="RIVINITY logo"
                  width={48}
                  height={48}
                  className="h-auto w-auto object-contain"
                  sizes="48px"
                />
              </div>

              <span className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#16181A] select-none">
                {brandName}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-[1.6] font-light text-pretty whitespace-pre-line text-[#6B6F72]">
              {description}
            </p>
          </motion.div>

          {/* Navigation columns */}
          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid w-full max-w-200 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-10 lg:gap-x-16 xl:gap-x-24"
          >
            {COLUMNS.map((col) => (
              <FooterColumnBlock key={col.title} column={col} />
            ))}
          </motion.nav>
        </div>

        {/* Footer Bottom Bar */}
        <motion.div
          variants={riseItem}
          className="mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#16181A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#6B6F72]"
        >
          <p className="m-0">&copy; 2026 Rivinity, Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16181A] transition-colors duration-200 hover:text-[#6B6F72]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Hero brand name watermark */}
      <motion.div
        variants={heroBrandVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-0 select-none whitespace-nowrap font-bold text-black/5"
        style={{
          fontSize: "clamp(80px, 16vw, 240px)",
          lineHeight: 0.75,
        }}
      >
        {brandName}
      </motion.div>
    </footer>
  );
}