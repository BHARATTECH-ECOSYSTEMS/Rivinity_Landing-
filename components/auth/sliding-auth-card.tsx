"use client";

import React from "react";
import { SlidingAuth } from "@/components/ui/auth-switch";
import { X } from "lucide-react";

interface SlidingAuthCardProps {
  initialMode?: "signin" | "signup";
  bannerImage?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export function SlidingAuthCard({
  initialMode = "signin",
  bannerImage,
  isModal = false,
  onClose,
}: SlidingAuthCardProps) {
  return (
    <div className="relative w-full flex items-center justify-center">
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-gray-500 hover:text-gray-900 hover:bg-white hover:scale-105 transition-all shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <SlidingAuth
        defaultMode={initialMode}
        bannerImage={bannerImage}
      />
    </div>
  );
}

export default SlidingAuthCard;
