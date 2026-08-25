"use client";

import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  BookOpen,
  HelpCircle,
  Terminal,
  Search,
  Sparkles,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

const quickHelpLinks = [
  {
    icon: Home,
    title: "Return Home",
    description: "Go back to the main landing page and features.",
    href: "/",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Explore API references, SDKs, and tutorials.",
    href: "/docs",
  },
  {
    icon: Terminal,
    title: "API Status",
    description: "Check operational status of runtimes and models.",
    href: "/apitest",
  },
  {
    icon: HelpCircle,
    title: "Contact Support",
    description: "Get in touch with our solutions engineering team.",
    href: "/contact",
  },
];

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Head>
        <title>404 — Page Not Found | Rivinity AI</title>
      </Head>
      <main className="min-h-screen pt-24 pb-16 bg-[var(--color-bg-primary,#ffffff)] flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle Glow Background Effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF6B00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* 404 Hero Content */}
        <section className="section py-12 md:py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10  px-4 py-2 rounded-full text-s font-bold uppercase tracking-widest">
                <span>Error 404</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1A1A1A] tracking-tight">
                Lost in <span className="text-[#FF6B00]">latent space</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-lg mx-auto">
                The page or route you are looking for doesn’t exist, has been moved, or an autonomous agent executed a dead link.
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-xs hover:bg-[#e66000] transition w-full sm:w-auto"
                >
                  <ArrowLeft size={16} />
                  Back to homepage
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 bg-[#F7F7F8] border border-[#E5E7EB] text-[#1A1A1A] px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm hover:border-gray-300 transition w-full sm:w-auto"
                >
                  View Documentation
                </Link>
              </div>

            </div>

            {/* Quick Links Navigation Grid */}
            <div className="mt-16 max-w-4xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280] text-center mb-6">
                Or try one of these pages
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickHelpLinks.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex items-start gap-4 hover:border-[#FF6B00]/40 transition-all hover:-translate-y-0.5 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                        <IconComp size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF6B00] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#6B7280] leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}