"use client";

import Link from "next/link";
import { HomeIcon, CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-[#0f172a]">
      <div className="flex flex-col items-center justify-center text-center p-4">
        {/* Header / Title area */}
        <div className="flex flex-col items-center">
          <div className="mask-b-from-20% mask-b-to-80% font-semibold text-[180px] sm:text-[200px] tracking-tight bg-gradient-to-b from-[#0f172a] via-[#0f172a]/80 to-transparent bg-clip-text text-transparent select-none leading-none">
            404
          </div>
          <p className="mt-2 text-[#64748b] text-sm sm:text-base font-normal">
            The page you&apos;re looking for might have been <br />
            moved or doesn&apos;t exist.
          </p>
        </div>

        {/* Content / Buttons area */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {/* Go Home Button */}
          <div className="text-white">
            <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full text-sm font-semibold min-h-[44px] px-6 py-2.5 bg-[#0f172a] text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2"
          >
            <HomeIcon className="size-4 mr-2" data-icon="inline-start" />
            Go Home
          </Link>
          </div>
          

          {/* Explore Docs Button */}
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-full text-sm font-semibold min-h-[44px] px-6 py-2.5 border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2"
          >
            <CompassIcon className="size-4 mr-2" data-icon="inline-start" />
            Explore Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
