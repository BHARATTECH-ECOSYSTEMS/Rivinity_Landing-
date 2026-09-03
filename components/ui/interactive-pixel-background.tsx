"use client";

import React from "react";
import Image from "next/image";

interface InteractivePixelBackgroundProps {
  className?: string;
  cellSize?: number;
  gap?: number;
}

export function InteractivePixelBackground({
  className = "absolute inset-0 w-full h-full pointer-events-none",
}: InteractivePixelBackgroundProps) {
  return (
    <div className={className}>
      {/* High-Resolution Atmospheric Image Background */}
      <div className="absolute inset-0 w-full h-full bg-[#FAF7F2] overflow-hidden">
        <Image
          src="/images/auth-bg.png"
          alt="Auth Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Subtle Atmospheric Glass Diffusion */}
        <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-[1px]" />
      </div>
    </div>
  );
}

export default InteractivePixelBackground;
