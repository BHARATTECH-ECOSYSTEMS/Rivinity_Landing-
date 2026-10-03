"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/auth-modal";

export default function SignUpPage() {
  const router = useRouter();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-3 sm:p-6 bg-slate-100/80 dark:bg-zinc-950 transition-colors">
      <AuthModal
        isOpen={true}
        onClose={handleClose}
        defaultMode="signup"
        isPage={true}
      />
    </div>
  );
}