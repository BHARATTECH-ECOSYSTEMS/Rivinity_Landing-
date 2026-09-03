"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import AuthModal, { Mode } from "@/components/auth/auth-modal";

interface AuthContextType {
  isOpen: boolean;
  mode: "signin" | "signup" | "login";
  bannerImage?: string;
  openAuth: (mode?: "signin" | "signup" | "login", bannerImage?: string) => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup" | "login">("login");
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);

  const openAuth = useCallback((initialMode: "signin" | "signup" | "login" = "login", customImage?: string) => {
    setMode(initialMode);
    if (customImage) setBannerImage(customImage);
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsOpen(false);
  }, []);

  const modalMode: Mode = mode === "signup" ? "signup" : "login";

  return (
    <AuthContext.Provider value={{ isOpen, mode, bannerImage, openAuth, closeAuth }}>
      {children}

      <AuthModal
        isOpen={isOpen}
        onClose={closeAuth}
        defaultMode={modalMode}
      />
    </AuthContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthProvider");
  }
  return context;
}
