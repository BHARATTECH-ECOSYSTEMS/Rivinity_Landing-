"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/auth-modal";

export default function SignInPage() {
  const router = useRouter();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-100/60">
      <AuthModal
        isOpen={true}
        onClose={handleClose}
        defaultMode="login"
      />
    </div>
  );
}