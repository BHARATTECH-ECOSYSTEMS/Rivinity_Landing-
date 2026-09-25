"use client";

import { useState, useEffect, useCallback } from "react";

const SIDEBAR_STORAGE_KEY = "rivinity_sidebar_open";
const SIDEBAR_EVENT_NAME = "sidebar-toggle-event";

export function useSidebarState() {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (saved !== null) {
        return saved === "true";
      }
      return window.innerWidth >= 768;
    }
    return true;
  });

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      if (typeof ce.detail === "boolean") {
        setSidebarOpenState(ce.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STORAGE_KEY && e.newValue !== null) {
        setSidebarOpenState(e.newValue === "true");
      }
    };

    window.addEventListener(SIDEBAR_EVENT_NAME, handleCustomEvent);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(SIDEBAR_EVENT_NAME, handleCustomEvent);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setSidebarOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setSidebarOpenState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
        window.dispatchEvent(new CustomEvent(SIDEBAR_EVENT_NAME, { detail: next }));
      }
      return next;
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

  return { sidebarOpen, setSidebarOpen, toggleSidebar };
}
