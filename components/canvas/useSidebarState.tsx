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

let globalSidebarState: boolean | null = null;

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(true);

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024;

    if (isMobileOrTablet) {
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

  useEffect(() => {
    globalSidebarState = sidebarOpen;
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
    } catch {}
  }, [sidebarOpen]);

  useEffect(() => {
    let wasDesktop = window.innerWidth >= 1024;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (wasDesktop && !isDesktop) {
        setSidebarOpenState(false);
      }
      wasDesktop = isDesktop;
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STORAGE_KEY && e.newValue !== null) {
        const val = window.innerWidth >= 1024 && e.newValue === "true";
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
