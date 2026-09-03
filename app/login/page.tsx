"use client";

import React from "react";
import AuthModal from "@/components/auth/auth-modal";
import { InteractivePixelBackground } from "@/components/ui/interactive-pixel-background";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#EDF3ED] overflow-x-hidden p-4 sm:p-6 md:p-8">
      {/* Diffused Atmospheric Gradient Background (Sage, Lime & Forest) */}
      <InteractivePixelBackground className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      {/* Centered Auth Card */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center py-6">
        <AuthModal defaultMode="login" isPage={true} />
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl text-center py-4 text-xs text-gray-500 font-medium">
        <p>© {new Date().getFullYear()} Rivinity Inc. All rights reserved.</p>
      </footer>
    </main>
  );
}