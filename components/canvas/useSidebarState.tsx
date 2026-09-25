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
const SIDEBAR_EVENT_NAME = "sidebar-toggle-event";

export interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

// Module-level persistent cache across client-side page transitions
let globalSidebarState: boolean | null = null;

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => {
    // If we already have a cached state on client, use it synchronously
    if (globalSidebarState !== null) {
      return globalSidebarState;
    }
    return true;
  });

  useEffect(() => {
    // Only runs once on initial root layout mount
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved !== null) {
      const val = saved === "true";
      globalSidebarState = val;
      setSidebarOpenState(val);
    } else if (window.innerWidth < 768) {
      globalSidebarState = false;
      setSidebarOpenState(false);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        globalSidebarState = false;
        setSidebarOpenState(false);
      }
    };

    const handleCustomEvent = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      if (typeof ce.detail === "boolean") {
        globalSidebarState = ce.detail;
        setSidebarOpenState(ce.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STORAGE_KEY && e.newValue !== null) {
        const val = e.newValue === "true";
        globalSidebarState = val;
        setSidebarOpenState(val);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener(SIDEBAR_EVENT_NAME, handleCustomEvent);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener(SIDEBAR_EVENT_NAME, handleCustomEvent);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setSidebarOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setSidebarOpenState((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        globalSidebarState = next;
        if (typeof window !== "undefined") {
          localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
          window.dispatchEvent(
            new CustomEvent(SIDEBAR_EVENT_NAME, { detail: next })
          );
        }
        return next;
      });
    },
    []
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

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
