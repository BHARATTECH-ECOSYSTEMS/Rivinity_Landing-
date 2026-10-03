"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (mode: ThemeMode) => void;
  isDashboardRoute: boolean;
}

const THEME_STORAGE_KEY = "rivinity_theme";

const DASHBOARD_ROUTES = [
  "/dashboard",
  "/chat",
  "/app",
  "/knowledge-base",
  "/knowledgebase",
  "/marketplace",
  "/history",
  "/agent-playground",
  "/agents-playground",
  "/agentplayground",
  "/agents",
  "/rivinity-lm",
  "/rivinitylm",
  "/image-generation",
  "/imagegeneration",
  "/image-enhancer",
  "/imageenhancer",
  "/audio-lab",
  "/audiolab",
  "/app-builder",
  "/appbuilder",
  "/prompt-to-video",
  "/analytics",
  "/plans-and-credits",
  "/team",
  "/settings",
  "/login",
  "/signup",
];

const ThemeContext = createContext<ThemeContextType | null>(null);

function isRouteInDashboard(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/") return false;
  return DASHBOARD_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = isRouteInDashboard(pathname);

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
        if (saved && (saved === "light" || saved === "dark" || saved === "system")) {
          return saved;
        }
      } catch {}
    }
    return "dark";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  const applyTheme = useCallback(
    (selectedTheme: ThemeMode, inDashboard: boolean) => {
      if (typeof window === "undefined") return;

      const root = document.documentElement;

      // RULE: Landing pages and public marketing pages are NEVER in dark mode
      if (!inDashboard) {
        root.classList.remove("dark");
        setResolvedTheme("light");
        return;
      }

      let isDark = true;
      if (selectedTheme === "light") {
        isDark = false;
      } else if (selectedTheme === "dark") {
        isDark = true;
      } else if (selectedTheme === "system") {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      if (isDark) {
        root.classList.add("dark");
        setResolvedTheme("dark");
      } else {
        root.classList.remove("dark");
        setResolvedTheme("light");
      }
    },
    [],
  );

  useEffect(() => {
    applyTheme(theme, isDashboard);
  }, [theme, isDashboard, applyTheme]);

  // Listen to system preference changes if system theme is selected
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (isDashboard) {
        applyTheme("system", true);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, isDashboard, applyTheme]);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeState(mode);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch {}
      applyTheme(mode, isDashboard);
    },
    [isDashboard, applyTheme],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        isDashboardRoute: isDashboard,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: () => {},
      isDashboardRoute: false,
    };
  }
  return context;
}
