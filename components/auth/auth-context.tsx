"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidingAuth } from "@/components/ui/auth-switch";
import { X } from "lucide-react";

interface AuthContextType {
  isOpen: boolean;
  mode: "signin" | "signup";
  bannerImage?: string;
  openAuth: (mode?: "signin" | "signup", bannerImage?: string) => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);

  const openAuth = useCallback((initialMode: "signin" | "signup" = "signin", customImage?: string) => {
    setMode(initialMode);
    if (customImage) setBannerImage(customImage);
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeAuth();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeAuth]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AuthContext.Provider value={{ isOpen, mode, bannerImage, openAuth, closeAuth }}>
      {children}

      {/* Global On-Screen Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeAuth}
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 w-full max-w-[900px] my-auto max-h-[95vh] overflow-y-auto rounded-3xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeAuth}
                className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-50 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-200/90 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Sliding Double-Panel Auth Card */}
              <SlidingAuth
                defaultMode={mode}
                bannerImage={bannerImage}
                onSignIn={() => {
                  closeAuth();
                }}
                onSignUp={() => {
                  closeAuth();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
