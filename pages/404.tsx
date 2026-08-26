"use client";

import Link from "next/link";
import { HomeIcon, CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-[#1A1A1A]">
      <div className="flex flex-col items-center justify-center text-center p-4">

        {/* Header / Title area */}
        <div className="flex flex-col items-center">
          <div className="mask-b-from-20% mask-b-to-80% font-extrabold text-[200px] tracking-tight bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent bg-clip-text text-transparent select-none">
            404
          </div>
          <p className="-mt-8 text-nowrap text-[#6B7280] text-sm sm:text-base font-medium">
            The page you're looking for might have been <br />
            moved or doesn't exist.
          </p>
        </div>

        {/* Content / Buttons area */}
        <div className="mt-6 flex gap-2">
          {/* Go Home Button (Primary Orange) */}
          <div className="text-white">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl text-sm font-bold h-10 px-5 py-2 bg-[#000000] text-white hover:bg-black/70 active:scale-95 transition-all shadow-xs"
            >
              <HomeIcon className="size-4 mr-2" data-icon="inline-start" />
              Go Home
            </Link>
          </div>

          {/* Explore Docs Button (Light Outline) */}
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-xl text-sm font-bold h-10 px-5 py-2 border border-[#E5E7EB] bg-[#F7F7F8] text-[#1A1A1A] hover:bg-gray-100 hover:border-gray-300 active:scale-95 transition-all shadow-xs"
          >
            <CompassIcon className="size-4 mr-2" data-icon="inline-start" />
            Explore Docs
          </Link>
        </div>

      </div>
    </div>
  );
}