"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidingAuthCard } from "@/components/auth/sliding-auth-card";

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#FAF7F2] overflow-x-hidden p-4 sm:p-6 md:p-8">
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-pink-400/20 via-purple-400/15 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-400/20 via-pink-400/15 to-purple-400/10 blur-[140px]" />
      </div>

      {/* Top Navigation / Brand */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-2">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-gray-900 group">
          <Image
            src="/logo.png"
            alt="Rivinity Logo"
            width={32}
            height={32}
            className="h-8 w-8 group-hover:scale-105 transition-transform"
          />
          <span>Rivinity</span>
        </Link>
        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-full bg-white/60 hover:bg-white/90 border border-gray-200/80 backdrop-blur-md transition-all"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Centered Glassmorphism Sliding Auth */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center py-6">
        <SlidingAuthCard initialMode="signup" />
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl text-center py-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Rivinity Inc. All rights reserved.</p>
      </footer>
    </main>
  );
}