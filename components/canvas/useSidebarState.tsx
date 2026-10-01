"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const SIDEBAR_STORAGE_KEY = "rivinity_sidebar_open";

export interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

// Module-level persistent cache across client-side page transitions
let globalSidebarState: boolean | null = null;

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(true);

  // Sync from localStorage / screen width on client mount (post-hydration)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      globalSidebarState = false;
      setSidebarOpenState(false);
      return;
    }

    try {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (saved !== null) {
        const val = saved === "true";
        globalSidebarState = val;
        setSidebarOpenState(val);
      } else if (globalSidebarState !== null) {
        setSidebarOpenState(globalSidebarState);
      }
    } catch {}
  }, []);

  // Sync to localStorage and global cache whenever state changes
  useEffect(() => {
    globalSidebarState = sidebarOpen;
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
    } catch {}
  }, [sidebarOpen]);

  // Handle window resize and cross-tab storage changes
  useEffect(() => {
    let wasDesktop = window.innerWidth >= 768;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      if (wasDesktop && !isDesktop) {
        setSidebarOpenState(false);
      }
      wasDesktop = isDesktop;
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STORAGE_KEY && e.newValue !== null) {
        const val = window.innerWidth >= 768 && e.newValue === "true";
        globalSidebarState = val;
        setSidebarOpenState(val);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setSidebarOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setSidebarOpenState((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        globalSidebarState = next;
        return next;
      });
    },
    []
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpenState((prev) => {
      const next = !prev;
      globalSidebarState = next;
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarState(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (context) {
    return context;
  }
  return {
    sidebarOpen: globalSidebarState !== null ? globalSidebarState : true,
    setSidebarOpen: () => {},
    toggleSidebar: () => {},
  };
}
