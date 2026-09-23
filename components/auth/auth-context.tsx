"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AuthModal, { Mode } from "@/components/auth/auth-modal";

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  plan: string;
}

interface AuthContextType {
  isOpen: boolean;
  mode: "signin" | "signup" | "login";
  bannerImage?: string;
  isAuthenticated: boolean;
  user: UserProfile | null;
  openAuth: (mode?: "signin" | "signup" | "login", bannerImage?: string) => void;
  closeAuth: () => void;
  login: (userData?: Partial<UserProfile>) => void;
  signup: (userData?: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup" | "login">("signup");
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("rivinity_authenticated");
      const savedUser = localStorage.getItem("rivinity_user");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser({
            name: "Abhay Chauhan",
            initials: "AC",
            email: "abhay@rivinity.ai",
            plan: "Pro Workspace",
          });
        }
      }
    } catch {}
  }, []);

  const login = useCallback((userData?: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      name: userData?.name || "Abhay Chauhan",
      initials: userData?.name ? userData.name.slice(0, 2).toUpperCase() : "AC",
      email: userData?.email || "user@rivinity.ai",
      plan: userData?.plan || "Pro Workspace",
    };
    setIsAuthenticated(true);
    setUser(newUser);
    try {
      localStorage.setItem("rivinity_authenticated", "true");
      localStorage.setItem("rivinity_user", JSON.stringify(newUser));
    } catch {}
    setIsOpen(false);
  }, []);

  const signup = useCallback((userData?: Partial<UserProfile>) => {
    login(userData);
  }, [login]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem("rivinity_authenticated");
      localStorage.removeItem("rivinity_user");
    } catch {}
  }, []);

  const openAuth = useCallback((initialMode: "signin" | "signup" | "login" = "signup", customImage?: string) => {
    setMode(initialMode);
    if (customImage) setBannerImage(customImage);
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleAuthSuccess = useCallback((userData?: any) => {
    signup(userData);
  }, [signup]);

  const modalMode: Mode = mode === "signup" ? "signup" : "login";

  return (
    <AuthContext.Provider value={{ isOpen, mode, bannerImage, isAuthenticated, user, openAuth, closeAuth, login, signup, logout }}>
      {children}

      <AuthModal
        isOpen={isOpen}
        onClose={closeAuth}
        onSuccess={handleAuthSuccess}
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
