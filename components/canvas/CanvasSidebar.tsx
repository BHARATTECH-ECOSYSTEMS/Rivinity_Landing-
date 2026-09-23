"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import SettingsDialog from "./SettingsDialog";

import { USER } from "@/lib/profile";
import { useAuthModal } from "@/components/auth/auth-context";

// Lucide Icons
import {
  PanelLeft,
  MessageSquare,
  LayoutDashboard,
  Bot,
  Box,
  Store,
  BarChart2,
  History,
  Users,
  Settings,
  Layers,
  GraduationCap,
  Sparkles,
  AudioWaveform,
  Clapperboard,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
  Search,
  X,
} from "lucide-react";

import rivinityLogo from "@/components/assets/Rivinity Logo.png";

const logoSrc = (rivinityLogo as any)?.src || (rivinityLogo as any);

type LucideIconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & {
    size?: number | string;
  }
>;

type NavItem = {
  id: string;
  label: string;
  icon: LucideIconType;
  path?: string;
  badge?: string;
};

const UpgradeArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "w-4.5 h-4.5",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2.5L2.5 11H7.5V19.5C7.5 20.6 8.4 21.5 9.5 21.5H14.5C15.6 21.5 16.5 20.6 16.5 19.5V11H21.5L12 2.5Z" />
    <path d="M10 14L12 12L14 14" />
    <path d="M10 17.5L12 15.5L14 17.5" />
  </svg>
);

const menuItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
    path: "/app",
  },
  {
    id: "agents",
    label: "Agents",
    icon: Bot,
    path: "/agent-playground",
  },
  {
    id: "knowledge-base",
    label: "Knowledge Base",
    icon: Box,
    path: "/knowledge-base",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: Store,
    path: "/marketplace",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    path: "/analytics",
  },
  {
    id: "history",
    label: "History",
    icon: History,
    path: "/history",
  },
];

const productItems: NavItem[] = [
  {
    id: "rivinity-lm",
    label: "RivinityLM",
    icon: GraduationCap,
    path: "/rivinity-lm",
  },
  {
    id: "image-enhancer",
    label: "Image Enhancer",
    icon: Sparkles,
    path: "/image-enhancer",
  },
  {
    id: "audio-lab",
    label: "Audio Lab",
    icon: AudioWaveform,
    path: "/audio-lab",
  },
  {
    id: "app-builder",
    label: "App Builder",
    icon: Layers,
    path: "/app-builder",
  },
  {
    id: "prompt-to-video",
    label: "Prompt to Video",
    icon: Clapperboard,
    path: "/prompt-to-video",
  },
];

const workspaceItems: NavItem[] = [
  {
    id: "team",
    label: "Team",
    icon: Users,
    path: "/team",
  },
];

function findActiveId(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") return "dashboard";
  if (pathname === "/app" || pathname.startsWith("/chat")) return "chat";
  if (pathname === "/agent-playground" || pathname === "/agents")
    return "agents";
  if (pathname === "/knowledge-base") return "knowledge-base";
  if (pathname.startsWith("/marketplace")) return "marketplace";
  if (pathname === "/analytics") return "analytics";
  if (pathname === "/history") return "history";
  if (pathname === "/rivinity-lm") return "rivinity-lm";
  if (pathname === "/image-enhancer") return "image-enhancer";
  if (pathname === "/audio-lab") return "audio-lab";
  if (pathname === "/app-builder") return "app-builder";
  if (pathname === "/prompt-to-video") return "prompt-to-video";
  if (pathname === "/team") return "team";
  return "";
}

export interface CanvasSidebarProps {
  open?: boolean;
  onToggle?: () => void;
  onCollapse?: () => void;
  searchQuery?: string;
}

const CanvasSidebar = ({
  open: controlledOpen,
  onToggle,
  onCollapse,
}: CanvasSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routeActiveId = findActiveId(pathname || "");
  const [selectedId, setSelectedId] = useState<string>(routeActiveId);
  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const [productsOpen, setProductsOpen] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { logout, user, isAuthenticated, openAuth } = useAuthModal();
  const displayName = isAuthenticated && user?.name ? user.name : (isAuthenticated ? USER.name : "Guest User");
  const displayInitials = isAuthenticated && user?.initials ? user.initials : (isAuthenticated ? USER.initials : "GU");
  const displayPlan = isAuthenticated ? (user?.plan || USER.plan || "Pro Workspace") : "Free Plan";

  const userMenuContainerRef = useRef<HTMLDivElement>(null);
  const collapsedMenuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        userMenuContainerRef.current?.contains(target) ||
        collapsedMenuContainerRef.current?.contains(target)
      ) {
        return;
      }
      setUserMenuOpen(false);
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const renderUserDropdownMenu = (isFloating = false) => (
    <div
      className={`${
        isFloating
          ? "absolute bottom-[calc(100%+10px)] left-0"
          : "absolute bottom-[calc(100%+8px)] left-2 right-2"
      } z-[100] w-[248px] bg-white dark:bg-[#1e1e22] text-slate-800 dark:text-zinc-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/[0.12] p-1.5 animate-in fade-in zoom-in-95 duration-150 select-none`}
    >
      {/* User Header Tile */}
      <div className="flex items-center justify-between p-2 rounded-xl">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full !bg-[#FF6B00] text-white flex items-center justify-center text-[12px] font-bold shrink-0 shadow-xs">
            {displayInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13.5px] font-semibold text-slate-900 dark:text-white truncate leading-tight">
              {displayName}
            </span>
            <span className="text-[11.5px] text-slate-500 dark:text-zinc-400 font-normal truncate leading-tight mt-0.5">
              {displayPlan}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-white/[0.08] my-1 mx-1" />

      {/* Upgrade plan */}
      <button
        type="button"
        onClick={() => {
          setUserMenuOpen(false);
          router.push("/checkout");
        }}
        className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13.5px] font-medium text-slate-700 dark:text-zinc-200 bg-transparent border-0 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
      >
        <UpgradeArrowIcon className="w-4.5 h-4.5 text-slate-500 dark:text-zinc-400 shrink-0" />
        <span>Upgrade plan</span>
      </button>

      {/* Settings */}
      <button
        type="button"
        onClick={() => {
          setUserMenuOpen(false);
          setSettingsOpen(true);
        }}
        className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13.5px] font-medium text-slate-700 dark:text-zinc-200 bg-transparent border-0 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
      >
        <Settings className="w-4.5 h-4.5 text-slate-500 dark:text-zinc-400" />
        <span>Settings</span>
      </button>

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-white/[0.08] my-1 mx-1" />

      {/* Help */}
      <button
        type="button"
        onClick={() => {
          setUserMenuOpen(false);
          window.open("https://docs.rivinity.ai", "_blank");
        }}
        className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[13.5px] font-medium text-slate-700 dark:text-zinc-200 bg-transparent border-0 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left group"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-4.5 h-4.5 text-slate-500 dark:text-zinc-400" />
          <span>Help</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-500 group-hover:text-slate-600 dark:group-hover:text-zinc-200 transition-colors" />
      </button>

      {/* Log out or Sign up / Log in */}
      {isAuthenticated ? (
        <button
          type="button"
          onClick={() => {
            setUserMenuOpen(false);
            logout();
            router.push("/");
          }}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13.5px] font-medium text-slate-700 dark:text-zinc-200 bg-transparent border-0 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4.5 h-4.5 text-slate-500 dark:text-zinc-400" />
          <span>Log out</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setUserMenuOpen(false);
            openAuth("signup");
          }}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13.5px] font-medium text-[#FF6B00] bg-transparent border-0 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4.5 h-4.5 text-[#FF6B00]" />
          <span>Sign up / Log in</span>
        </button>
      )}
    </div>
  );

  const query = localSearchQuery.trim().toLowerCase();
  const visibleMenuItems = query
    ? menuItems.filter((i) => i.label.toLowerCase().includes(query))
    : menuItems;
  const visibleProductItems = query
    ? productItems.filter((i) => i.label.toLowerCase().includes(query))
    : productItems;
  const visibleWorkspaceItems = query
    ? workspaceItems.filter((i) => i.label.toLowerCase().includes(query))
    : workspaceItems;

  const handleActionToggle = () => {
    if (onToggle) {
      onToggle();
      return;
    }
    if (onCollapse) {
      onCollapse();
      return;
    }
    setInternalOpen((prev) => !prev);
  };

  const handleLogoClick = () => {
    if (!isOpen) {
      handleActionToggle();
    } else {
      router.push("/dashboard");
    }
  };

  const closeOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (onCollapse) {
        onCollapse();
      } else if (onToggle) {
        onToggle();
      } else {
        setInternalOpen(false);
      }
    }
  };

  const renderSectionItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive =
      pathname === item.path ||
      (item.path === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) ||
      (Boolean(item.path && pathname && item.path !== "/" && pathname.startsWith(item.path)));

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          setSelectedId(item.id);
          if (item.id === "settings") {
            setSettingsOpen(true);
            return;
          }
          if (item.path) {
            router.push(item.path);
            closeOnMobile();
          }
        }}
        className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-[14.5px] transition-all duration-150 cursor-pointer border-0 group ${
          isActive
            ? "!bg-[#E8EEF5] dark:!bg-white/10 text-[#0f172a] dark:text-white font-semibold"
            : "bg-transparent hover:!bg-[#F3F6FA] dark:hover:!bg-white/[0.05] text-[#64748b] dark:text-zinc-400 hover:text-[#0f172a] dark:hover:text-white font-medium"
        }`}
      >
        <Icon
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-[#0f172a] dark:text-white"
              : "text-[#64748b] dark:text-zinc-400 group-hover:text-[#0f172a] dark:group-hover:text-white"
          }`}
          strokeWidth={isActive ? 2.2 : 1.8}
        />
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <>
      <aside
        className={`sticky top-0 h-screen h-[100dvh] max-h-[100dvh] flex flex-col shrink-0 bg-white dark:bg-[#0d0d0d] border-r border-[#e2e8f0] dark:border-white/[0.08] select-none transition-all duration-300 z-30 max-w-[85vw] md:max-w-none ${
          isOpen ? "w-[260px]" : "w-[68px]"
        }`}
        style={{
          width: isOpen
            ? typeof window !== "undefined" && window.innerWidth < 768
              ? "min(260px, 85vw)"
              : "260px"
            : "68px",
        }}
      >
        {!isOpen ? (
          /* COLLAPSED STATE */
          <div
            onClick={(e) => {
              // Clicking anywhere on small left bar makes left panel bigger
              if (
                collapsedMenuContainerRef.current?.contains(e.target as Node)
              ) {
                return;
              }
              handleActionToggle();
            }}
            className="flex flex-col items-center justify-between h-full w-full py-3.5 px-2 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2.5 w-full">
              {/* Logo / Expand Toggle (Swaps to PanelLeft icon on hover like ChatGPT) */}
              {/* Logo / Expand Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleActionToggle();
                }}
                className="group relative w-10 h-10 flex items-center justify-center bg-transparent border-0 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Expand sidebar"
              >
                <img
                  src={logoSrc}
                  onError={(e) => {
                    e.currentTarget.src = "/watermark.png";
                  }}
                  alt="Rivinity"
                  className="w-9 h-9 object-contain drop-shadow-[0_2px_8px_rgba(255,107,0,0.25)] select-none transition-transform"
                />
                <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[100] whitespace-nowrap rounded-full bg-[#18181b] dark:bg-[#212121] text-white px-3.5 py-1.5 text-[13px] font-medium shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-150 scale-95 group-hover:scale-100 select-none">
                  Expand sidebar
                </span>
              </button>

              {/* Primary Navigation Icons (Clicking anywhere expands sidebar) */}
              <div className="flex flex-col items-center gap-1.5 w-full">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.path ||
                    (item.path === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) ||
                    (Boolean(item.path && pathname && item.path !== "/" && pathname.startsWith(item.path)));
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.path) {
                          router.push(item.path);
                          setSelectedId(item.id);
                        }
                        handleActionToggle();
                      }}
                      className={`group/tooltip relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-150 cursor-pointer border-0 ${
                        isActive
                          ? "!bg-[#E8EEF5] dark:!bg-white/10 text-[#0f172a] dark:text-white font-semibold"
                          : "bg-transparent hover:!bg-[#F3F6FA] dark:hover:!bg-white/[0.05] text-[#64748b] hover:text-[#0f172a]"
                      }`}
                      aria-label={item.label}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-colors ${
                          isActive
                            ? "text-[#0f172a] dark:text-white"
                            : "text-[#64748b] group-hover/tooltip:text-[#0f172a] dark:group-hover/tooltip:text-white"
                        }`}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                      <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[100] whitespace-nowrap rounded-full bg-[#18181b] dark:bg-[#212121] text-white px-3.5 py-1.5 text-[13px] font-medium shadow-2xl border border-white/10 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-150 scale-95 group-hover/tooltip:scale-100 select-none">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom avatar */}
            <div ref={collapsedMenuContainerRef} className="relative mt-auto">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="relative w-8 h-8 rounded-full !bg-[#FF6B00] text-white flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
                aria-label={`${displayName} (${displayPlan})`}
              >
                {displayInitials}
              </button>
              {userMenuOpen && renderUserDropdownMenu(true)}
            </div>
          </div>
        ) : (
          /* EXPANDED STATE (Matching Image 3) */
          <div className="flex flex-col justify-between h-full w-full">
            {/* Scrollable upper content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pt-3.5 pb-2 [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Top Header: Logo on left, Search & Toggle on right (Matching ChatGPT layout) */}
              <div className="flex items-center justify-between w-full h-9 mb-3 px-1">
                <div
                  onClick={handleLogoClick}
                  className="flex items-center gap-2 cursor-pointer select-none group min-w-0"
                >
                  <div className="relative shrink-0 flex items-center justify-center w-8.5 h-8.5">
                    <img
                      src={logoSrc}
                      onError={(e) => {
                        e.currentTarget.src = "/watermark.png";
                      }}
                      alt="Rivinity"
                      className="w-8.5 h-8.5 object-contain select-none shrink-0 drop-shadow-[0_2px_8px_rgba(255,107,0,0.25)]"
                      draggable={false}
                    />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tracking-tight text-[17px] group-hover:text-[#FF6B00] transition-colors truncate">
                    Rivinity
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen((prev) => !prev);
                      if (searchOpen) setLocalSearchQuery("");
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 ${
                      searchOpen
                        ? "bg-slate-100 text-slate-900"
                        : "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                    aria-label="Search"
                    title="Search"
                  >
                    <Search className="w-4.5 h-4.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleActionToggle}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border-0"
                    aria-label="Collapse sidebar"
                    title="Collapse sidebar"
                  >
                    <PanelLeft className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Collapsible Search Input */}
              {searchOpen && (
                <div className="relative mb-3 px-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    className="w-full h-8 pl-8 pr-7 text-[13px] bg-slate-100 dark:bg-zinc-800/80 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 border border-transparent focus:border-slate-300 dark:focus:border-zinc-600 focus:outline-hidden transition-colors"
                  />
                  {localSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setLocalSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Primary Navigation List */}
              {visibleMenuItems.length > 0 && (
                <nav className="flex flex-col gap-1 w-full">
                  {visibleMenuItems.map(renderSectionItem)}
                </nav>
              )}

              {/* PRODUCTS Section (Matching Image 3) */}
              {visibleProductItems.length > 0 && (
                <div className="mt-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setProductsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-800 transition-colors cursor-pointer bg-transparent border-0"
                  >
                    <span>PRODUCTS</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        productsOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </button>
                  {productsOpen && (
                    <div className="flex flex-col gap-1 mt-0.5">
                      {visibleProductItems.map(renderSectionItem)}
                    </div>
                  )}
                </div>
              )}

              {/* WORKSPACE Section (Collapsible Dropdown) */}
              {visibleWorkspaceItems.length > 0 && (
                <div className="mt-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setWorkspaceOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-800 transition-colors cursor-pointer bg-transparent border-0"
                  >
                    <span>WORKSPACE</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        workspaceOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </button>
                  {workspaceOpen && (
                    <div className="flex flex-col gap-1 mt-0.5">
                      {visibleWorkspaceItems.map(renderSectionItem)}
                    </div>
                  )}
                </div>
              )}

              {/* Empty Search State */}
              {query &&
                visibleMenuItems.length === 0 &&
                visibleProductItems.length === 0 &&
                visibleWorkspaceItems.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 dark:text-zinc-500">
                    No matching items found
                  </div>
                )}
            </div>

            {/* Bottom Profile Bar */}
            <div
              ref={userMenuContainerRef}
              className="relative pt-1.5 pb-1.5 px-2 border-t border-slate-200 dark:border-white/[0.08] w-full shrink-0"
            >
              {userMenuOpen && renderUserDropdownMenu(false)}

              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className={`w-full px-2 py-1.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer text-left group ${
                  userMenuOpen
                    ? "bg-slate-100 dark:bg-white/[0.08]"
                    : "hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full !bg-[#FF6B00] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                    {displayInitials}
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-xs font-semibold text-[#0f172a] dark:text-zinc-200 truncate">
                      {displayName}
                    </span>
                    <span className="text-[10.5px] text-[#64748b] dark:text-zinc-400 truncate">
                      {displayPlan}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </aside>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export const RecentChatsPanel = () => null;

export default CanvasSidebar;
