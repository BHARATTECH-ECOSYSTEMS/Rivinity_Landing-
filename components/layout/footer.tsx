"use client";

import { motion, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const riseItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0.1,
    },
  },
};

/* Explicit style helper to guarantee hover effect despite global CSS overrides */
const linkStyle = "text-gray-500 hover:!text-gray-900 transition-colors duration-200 cursor-pointer text-xs sm:text-sm";
const socialStyle = "text-gray-400 hover:!text-gray-900 transition-colors duration-200 cursor-pointer p-1";

/* ------------------------------------------------------------------ */
/* Footer Component                                                   */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-12 sm:pt-16 pb-0 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full"
      >
        {/* Main Grid Content */}
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-start">
            {/* Brand Column */}
            <motion.div variants={riseItem} className="col-span-2 sm:col-span-3 md:col-span-2">
              <a href="/" className="text-xl font-bold text-gray-900">
                Rivinity
              </a>
              <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 max-w-xs leading-relaxed">
                Empowering humanity with intelligent productivity. Build, deploy, and scale with AI.
              </p>
              <div className="flex gap-3 sm:gap-4 mt-5 sm:mt-6">
                <motion.a
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  href="https://twitter.com/rivinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className={socialStyle}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  href="https://github.com/rivinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={socialStyle}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  href="https://linkedin.com/company/rivinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialStyle}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Product Column */}
            <motion.div variants={riseItem}>
              <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3 sm:mb-4">Product</h4>
              <ul className="space-y-2 sm:space-y-3 p-0 m-0 list-none">
                <li>
                  <a href="/ai-chat" className={linkStyle}>
                    AI Chat
                  </a>
                </li>
                <li>
                  <a href="/app-builder" className={linkStyle}>
                    App Builder
                  </a>
                </li>
                <li>
                  <a href="/agents" className={linkStyle}>
                    Agents
                  </a>
                </li>
                <li>
                  <a href="/pricing" className={linkStyle}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/enterprise" className={linkStyle}>
                    Enterprise
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div variants={riseItem}>
              <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3 sm:mb-4">Company</h4>
              <ul className="space-y-2 sm:space-y-3 p-0 m-0 list-none">
                <li>
                  <a href="/about" className={linkStyle}>
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className={linkStyle}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/careers" className={linkStyle}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/research" className={linkStyle}>
                    Research
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Resources Column */}
            <motion.div variants={riseItem}>
              <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2 sm:space-y-3 p-0 m-0 list-none">
                <li>
                  <a href="/docs" className={linkStyle}>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/apireference" className={linkStyle}>
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="/changelog" className={linkStyle}>
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="/status" className={linkStyle}>
                    Status
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Legal Column */}
            <motion.div variants={riseItem}>
              <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3 sm:mb-4">Legal</h4>
              <ul className="space-y-2 sm:space-y-3 p-0 m-0 list-none">
                <li>
                  <a href="/privacy" className={linkStyle}>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className={linkStyle}>
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/security" className={linkStyle}>
                    Security
                  </a>
                </li>
                <li>
                  <a href="/compliance" className={linkStyle}>
                    Compliance
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Copyright Bar */}
          <motion.div
            variants={riseItem}
            className="border-t border-gray-100 mt-10 sm:mt-12 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-8"
          >
            <div className="m-0 text-center sm:text-left">© 2026 Rivinity, Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="/status" className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </a>
              <span className="text-gray-200">|</span>
              <div className="m-0 text-center sm:text-right">Made with care in India</div>
            </div>
          </motion.div>
        </div>

        {/* Edge-to-Edge Fully Responsive Glassmorphic Gradient Typography SVG with Smooth Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="container relative w-full overflow-hidden select-none pointer-events-none -mt-1 sm:-mt-3 md:-mt-4"
        >
          {/* Ambient Glassmorphic Diffusion Blobs behind the text */}
          <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-16 pointer-events-none opacity-45 blur-3xl">
            <div className="w-64 sm:w-96 h-24 sm:h-32 rounded-full bg-orange-200/50" />
            <div className="w-64 sm:w-96 h-24 sm:h-32 rounded-full bg-pink-200/50" />
            <div className="w-64 sm:w-96 h-24 sm:h-32 rounded-full bg-purple-200/50" />
          </div>

          <svg
            viewBox="0 0 1440 260"
            className="w-full h-auto block select-none relative z-10"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Lighter, Luminous Multi-Stop Pastel Glassmorphism Gradient */}
              <linearGradient
                id="footerGlassGradient"
                x1="0%"
                y1="15%"
                x2="100%"
                y2="45%"
              >
                <stop offset="0%" stopColor="#FFA666" stopOpacity="0.78" />
                <stop offset="20%" stopColor="#FF9678" stopOpacity="0.75" />
                <stop offset="42%" stopColor="#FF8AA8" stopOpacity="0.72" />
                <stop offset="62%" stopColor="#EB72B8" stopOpacity="0.75" />
                <stop offset="82%" stopColor="#BA8EF6" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#9C6EF3" stopOpacity="0.82" />
              </linearGradient>

              {/* Glass Specular Rim Highlight (Crisp White Top Edge Reflection) */}
              <linearGradient
                id="footerGlassRim"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
              </linearGradient>

              {/* Subtle Glass Depth Shadow */}
              <filter id="glassDepth" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#8B5CF6" floodOpacity="0.12" />
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF6A00" floodOpacity="0.06" />
              </filter>
            </defs>

            <text
              x="50%"
              y="76%"
              textAnchor="middle"
              fill="url(#footerGlassGradient)"
              stroke="url(#footerGlassRim)"
              strokeWidth="2.5"
              filter="url(#glassDepth)"
              textLength="1420"
              lengthAdjust="spacingAndGlyphs"
              className="select-none"
              style={{
                fontFamily:
                  'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: "275px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              RIVINITY
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </footer>
  );
}