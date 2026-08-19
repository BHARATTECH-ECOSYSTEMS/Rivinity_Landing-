"use client";

import { motion, type Variants } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Team", href: "#" },
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

const ctaVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 0.5,
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

  const description =
    "Made in India.\nAll rights reserved. Copyright © 2026 BharatTech, Inc.";

  const ctaLabel = "Explore now";
  const ctaHref = "#";

  return (
    <footer
      className="w-full overflow-hidden rounded-t-3xl sm:rounded-t-4xl md:rounded-t-[3rem] font-sans antialiased"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #E9BCD4 100%)",
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="px-4 sm:px-10 pt-8 sm:pt-14 pb-0 lg:px-14 lg:pt-16 xl:px-20"
      >
        <div className="mx-auto flex max-w-350 flex-col justify-between gap-10 sm:gap-12 lg:flex-row lg:gap-20 xl:gap-28">
          {/* Brand block */}
          <motion.div
            variants={riseItem}
            className="flex shrink-0 flex-col gap-4 sm:gap-5 lg:max-w-60 xl:max-w-65"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 sm:h-12 w-auto items-center">
                <img
                  src="/logo.png"
                  alt="RIVINITY logo"
                  className="h-full w-auto object-contain"
                />
              </div>

              <span className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#16181A] select-none">
                {brandName}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-[1.6] font-light text-pretty whitespace-pre-line text-[#6B6F72]">
              {description}
            </p>

            <motion.a
              href={ctaHref}
              variants={ctaVariant}
              whileTap={{ scale: 0.96 }}
              className="group mt-1 inline-flex w-fit items-center gap-2 sm:gap-2.5 rounded-full bg-[#F97316] py-0.5 pr-1 pl-4 sm:pl-5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] transition-[background-color,box-shadow] duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15),0_0_20px_rgba(22,24,26,0.12)]"
            >
              <span className="text-xs sm:text-sm font-medium text-[#16181A]">
                {ctaLabel}
              </span>

              <span className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-[#16181A]">
                <FaArrowRight className="size-3 sm:size-4 text-[#F4F0E6] transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </motion.div>

          {/* Navigation columns */}
          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid w-full max-w-200 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-10 lg:gap-x-16 xl:gap-x-24"
          >
            {COLUMNS.map((col) => (
              <FooterColumnBlock
                key={col.title}
                column={col}
              />
            ))}
          </motion.nav>
        </div>
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
        className="relative flex items-end justify-center overflow-hidden px-2 sm:px-6 pt-6 sm:pt-14 md:pt-20"
      >
        <svg
          className="h-auto w-full max-h-[14vw] sm:max-h-none translate-y-1 sm:translate-y-2 md:translate-y-6 select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
          viewBox={`0 0 ${Math.max(brandName.length * 90, 400)} 110`}
          preserveAspectRatio="xMidYMid meet"
          aria-label={brandName}
        >
          <defs>
            <filter id="brand-depth" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="#000000"
                floodOpacity="0.08"
              />
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="1.5"
                floodColor="#000000"
                floodOpacity="0.1"
              />
            </filter>
          </defs>

          <text
            x="50%"
            y="100%"
            dominantBaseline="alphabetic"
            textAnchor="middle"
            textLength="100%"
            lengthAdjust="spacing"
            filter="url(#brand-depth)"
            className="fill-gray-200 font-sans font-bold tracking-tight"
            fontSize="160"
          >
            {brandName}
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}