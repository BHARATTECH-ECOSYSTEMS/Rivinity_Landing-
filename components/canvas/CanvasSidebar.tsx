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
  LogIn,
  LogOut,
  X,
  Plus,
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

/** Credit segment type for multi-arc ring */
type CreditSegment = {
  label: string;
  value: number;
  max: number;
  color: string;
};

/** Multi-segment circular credit ring around the user avatar */
const CreditRing = ({
  segments,
  size = 38,
  strokeWidth = 2.5,
  tooltipSide = "right",
  hideTooltip = false,
  children,
}: {
  segments: CreditSegment[];
  size?: number;
  strokeWidth?: number;
  tooltipSide?: "right" | "top";
  hideTooltip?: boolean;
  children: React.ReactNode;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const totalMax = segments.reduce((s, seg) => s + seg.max, 0);
  const totalValue = segments.reduce((s, seg) => s + seg.value, 0);
  const totalPct = totalMax > 0 ? Math.round((totalValue / totalMax) * 100) : 0;

  // Gap between segments (in SVG units)
  const gapAngle = segments.length > 1 ? 3 : 0; // degrees
  const gapLength = (gapAngle / 360) * circumference;

  // Build arcs
  let cursor = 0;
  const arcs = segments.map((seg) => {
    const rawLength = totalMax > 0 ? (seg.value / totalMax) * circumference : 0;
    const arcLength = Math.max(0, rawLength - gapLength);
    const startOffset = cursor + gapLength / 2;
    cursor += rawLength;
    return { ...seg, arcLength, startOffset };
  });

  const tooltipCls =
    tooltipSide === "right"
      ? "left-[calc(100%+10px)] top-1/2 -translate-y-1/2"
      : "bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2";

  return (
    <div className="group/credit relative shrink-0" style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-zinc-700/60"
        />
        {/* Colored segments */}
        {arcs.map((arc, i) =>
          arc.arcLength > 0 ? (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arc.arcLength} ${circumference - arc.arcLength}`}
              strokeDashoffset={-arc.startOffset}
              strokeLinecap="round"
            />
          ) : null
        )}
      </svg>
      {/* Avatar centered inside */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
      {/* Hover tooltip — hidden when dropdown menu is open */}
      {!hideTooltip && (
        <div
          className={`pointer-events-none absolute z-[120] ${tooltipCls} rounded-lg bg-white dark:bg-[#1e1e22] text-slate-700 dark:text-zinc-200 px-2.5 py-1.5 shadow-lg border border-slate-200 dark:border-white/[0.12] opacity-0 group-hover/credit:opacity-100 transition-all duration-150 scale-95 group-hover/credit:scale-100 select-none`}
        >
          <div className="text-[9.5px] font-bold mb-0.5 text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Credits — {totalPct}%
          </div>
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] leading-[15px] whitespace-nowrap">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-slate-500 dark:text-zinc-400">{seg.label}</span>
              <span className="font-semibold tabular-nums text-slate-700 dark:text-zinc-200 ml-auto">
                {seg.value}/{seg.max}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
    path: "/chat",
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
    id: "history",
    label: "History",
    icon: History,
    path: "/history",
  },
];

const productItems: NavItem[] = [
  {
    id: "agents",
    label: "Agents Playground",
    icon: Bot,
    path: "/agent-playground",
  },
  {
    id: "rivinity-lm",
    label: "RivinityLM",
    icon: GraduationCap,
    path: "/rivinitylm",
  },
  {
    id: "image-generation",
    label: "Image Generation",
    icon: Sparkles,
    path: "/image-generation",
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
    path: "/appbuilder",
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
  if (pathname === "/chat" || pathname === "/app" || pathname.startsWith("/chat")) return "chat";
  if (
    pathname === "/agent-playground" ||
    pathname === "/agents" ||
    pathname === "/agents-playground" ||
    pathname === "/agentplayground"
  )
    return "agents";
  if (pathname === "/knowledge-base" || pathname === "/knowledgebase") return "knowledge-base";
  if (pathname.startsWith("/marketplace")) return "marketplace";
  if (pathname === "/analytics") return "analytics";
  if (pathname === "/history") return "history";
  if (pathname === "/rivinity-lm" || pathname === "/rivinitylm") return "rivinity-lm";
  if (
    pathname === "/image-generation" ||
    pathname === "/imagegeneration" ||
    pathname === "/image-enhancer" ||
    pathname === "/imageenhancer"
  )
    return "image-generation";
  if (pathname === "/audio-lab" || pathname === "/audiolab") return "audio-lab";
  if (pathname === "/app-builder" || pathname === "/appbuilder") return "app-builder";
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isSettledCollapsed = !isOpen;
  const [transitionsReady, setTransitionsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionsReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const { logout, user, isAuthenticated, openAuth } = useAuthModal();
  const displayName = isAuthenticated && user?.name ? user.name : (isAuthenticated ? USER.name : "Guest User");
  const displayInitials = isAuthenticated && user?.initials ? user.initials : (isAuthenticated ? USER.initials : "GU");
  const displayPlan = isAuthenticated ? (user?.plan || USER.plan || "Pro Workspace") : "Free Plan";

  // Credit ring segments: blue = daily, yellow = ad, pink = pro
  const isPro = displayPlan.toLowerCase().includes("pro");
  // TODO: replace with real credit data from API
  const creditSegments: CreditSegment[] = isPro
    ? [
        { label: "Pro Credits",   value: 380, max: 500, color: "#ec4899" },
        { label: "Daily Credits", value: 80,  max: 100, color: "#3b82f6" },
        { label: "Ad Credits",    value: 20,  max: 50,  color: "#eab308" },
      ]
    : [
        { label: "Daily Credits", value: 65,  max: 100, color: "#3b82f6" },
        { label: "Ad Credits",    value: 15,  max: 50,  color: "#eab308" },
      ];

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
            router.push("/dashboard");
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

  const visibleMenuItems = menuItems;
  const visibleProductItems = productItems;
  const visibleWorkspaceItems = workspaceItems;

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

  const handleNewChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId("chat");
    if (pathname === "/chat" || pathname === "/app" || pathname.startsWith("/chat")) {
      window.dispatchEvent(new CustomEvent("rivinity:new-chat"));
    } else {
      router.push("/chat");
    }
    closeOnMobile();
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
        data-sidebar-aside="true"
        className={`sticky top-0 h-screen h-[100dvh] max-h-[100dvh] flex flex-col shrink-0 bg-white dark:bg-[#0d0d0d] border-r border-[#e2e8f0] dark:border-white/[0.08] select-none z-30 max-w-[85vw] md:max-w-none will-change-[width] ${
          transitionsReady
            ? "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "transition-none"
        } ${
          isSettledCollapsed || isOpen ? "overflow-visible" : "overflow-hidden"
        } ${
          isOpen ? "w-[260px]" : "w-[68px]"
        }`}
      >
        <div className={`relative w-full h-full ${isSettledCollapsed || isOpen ? "overflow-visible" : "overflow-hidden"}`}>
          {/* COLLAPSED STATE */}
          <div
            data-sidebar-collapsed="true"
            className={`absolute inset-y-0 left-0 w-[68px] flex flex-col items-center justify-between py-3.5 px-2 ${
              transitionsReady
                ? "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : "transition-none"
            } ${
              isOpen
                ? "opacity-0 pointer-events-none -translate-x-2"
                : "opacity-100 pointer-events-auto translate-x-0"
            } ${isSettledCollapsed ? "overflow-visible" : "overflow-hidden"}`}
          >
            <div className="flex flex-col items-center gap-2.5 w-full">
              {/* Logo / Expand Toggle */}
              <button
                type="button"
                onClick={() => handleActionToggle()}
                className="group relative w-10 h-10 flex items-center justify-center bg-transparent border-0 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Expand sidebar"
              >
                <img
                  src={logoSrc}
                  onError={(e) => {
                    e.currentTarget.src = "/watermark.png";
                  }}
                  alt="Rivinity"
                  className="w-9 h-9 object-contain drop-shadow-[0_2px_8px_rgba(255,107,0,0.25)] select-none transition-all duration-200 group-hover:opacity-0 group-hover:scale-90"
                />
                <PanelLeft className="absolute w-5 h-5 text-slate-700 dark:text-zinc-200 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100" />
                <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[100] whitespace-nowrap rounded-full bg-[#18181b] dark:bg-[#212121] text-white px-3.5 py-1.5 text-[13px] font-medium shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-150 scale-95 group-hover:scale-100 select-none">
                  Expand sidebar
                </span>
              </button>

              {/* Primary Navigation Icons */}
              <div className="flex flex-col items-center gap-1.5 w-full">
                {/* Collapsed New Chat (+) Button */}
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="group/tooltip relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F6FA] dark:bg-white/[0.06] hover:bg-[#E8EEF5] dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/[0.08] hover:border-[#FF6B00]/40 transition-all duration-150 cursor-pointer mb-1 shadow-2xs"
                  aria-label="New Chat"
                >
                  <Plus className="w-5 h-5 text-[#FF6B00] group-hover/tooltip:rotate-90 transition-transform duration-200" strokeWidth={2.4} />
                  <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[100] whitespace-nowrap rounded-full bg-[#18181b] dark:bg-[#212121] text-white px-3.5 py-1.5 text-[13px] font-medium shadow-2xl border border-white/10 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-150 scale-95 group-hover/tooltip:scale-100 select-none">
                    New Chat
                  </span>
                </button>

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
                      onClick={() => {
                        if (item.path) {
                          router.push(item.path);
                          setSelectedId(item.id);
                        }
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

            {/* Bottom avatar / Login */}
            <div ref={collapsedMenuContainerRef} className="relative mt-auto">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="relative cursor-pointer hover:opacity-90 transition-opacity bg-transparent border-0 p-0"
                    aria-label={`${displayName} (${displayPlan})`}
                  >
                    <CreditRing segments={creditSegments} size={40} strokeWidth={2.5} tooltipSide="right" hideTooltip={userMenuOpen}>
                      <div className="w-[30px] h-[30px] rounded-full !bg-[#FF6B00] text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                        {displayInitials}
                      </div>
                    </CreditRing>
                  </button>
                  {userMenuOpen && renderUserDropdownMenu(true)}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="group/tooltip relative w-10 h-10 flex items-center justify-center rounded-full bg-[#FF6B00] hover:bg-[#E66000] text-white transition-all duration-150 cursor-pointer shadow-sm"
                  aria-label="Login"
                >
                  <LogIn className="w-5 h-5" strokeWidth={2} />
                  <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[100] whitespace-nowrap rounded-full bg-[#18181b] dark:bg-[#212121] text-white px-3.5 py-1.5 text-[13px] font-medium shadow-2xl border border-white/10 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-150 scale-95 group-hover/tooltip:scale-100 select-none">
                    Login
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* EXPANDED STATE */}
          <div
            data-sidebar-expanded="true"
            className={`absolute inset-y-0 left-0 w-[260px] flex flex-col justify-between h-full ${
              transitionsReady
                ? "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : "transition-none"
            } ${
              isOpen
                ? "opacity-100 pointer-events-auto translate-x-0"
                : "opacity-0 pointer-events-none -translate-x-2"
            }`}
          >
            {/* Scrollable upper content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pt-3.5 pb-2 [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Top Header: Logo on left, Collapse Toggle on right */}
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
                      if (onCollapse) {
                        onCollapse();
                      } else if (onToggle) {
                        onToggle();
                      } else {
                        setInternalOpen(false);
                      }
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors cursor-pointer border-0 shrink-0"
                    aria-label="Collapse sidebar"
                    title="Collapse sidebar"
                  >
                    <PanelLeft className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Dedicated New Chat Button above Dashboard */}
              <button
                type="button"
                onClick={handleNewChat}
                className="w-full flex items-center justify-between px-3.5 py-2.5 mb-2.5 rounded-2xl text-[14.5px] font-medium text-slate-800 dark:text-zinc-100 bg-[#F3F6FA] dark:bg-white/[0.06] hover:bg-[#E8EEF5] dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/50 transition-all cursor-pointer group shadow-2xs select-none"
              >
                <div className="flex items-center gap-3.5">
                  <Plus className="w-5 h-5 text-[#FF6B00] group-hover:rotate-90 transition-transform duration-200 shrink-0" strokeWidth={2.4} />
                  <span className="font-semibold">New Chat</span>
                </div>
              </button>

              {/* Primary Navigation List */}
              <nav className="flex flex-col gap-1 w-full">
                {visibleMenuItems.map(renderSectionItem)}
              </nav>

              {/* PRODUCTS Section */}
              {visibleProductItems.length > 0 && (
                <div className={`mt-3 pt-1 ${pathname === "/" || pathname === "/dashboard" ? "hidden lg:block" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setProductsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-800 dark:hover:text-zinc-200 transition-colors cursor-pointer bg-transparent border-0"
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

              {/* WORKSPACE Section */}
              {visibleWorkspaceItems.length > 0 && (
                <div className="mt-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setWorkspaceOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-800 dark:hover:text-zinc-200 transition-colors cursor-pointer bg-transparent border-0"
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
            </div>

            {/* Bottom Profile Bar / Login Button */}
            <div
              ref={userMenuContainerRef}
              className="relative pt-1.5 pb-1.5 px-2 border-t border-slate-200 dark:border-white/[0.08] w-full shrink-0"
            >
              {isAuthenticated ? (
                <>
                  {userMenuOpen && renderUserDropdownMenu(false)}
                  <div className="flex items-center gap-1 rounded-2xl bg-[#F3F6FA] p-1 dark:bg-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                      className="min-w-0 flex-1 cursor-pointer rounded-xl border-0 bg-transparent px-2 py-1.5 text-left transition-opacity hover:opacity-80"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <CreditRing segments={creditSegments} size={36} strokeWidth={2.5} tooltipSide="top" hideTooltip={userMenuOpen}>
                          <div className="w-[27px] h-[27px] rounded-full !bg-[#FF6B00] text-white flex items-center justify-center text-[10.5px] font-bold shadow-xs">
                            {displayInitials}
                          </div>
                        </CreditRing>
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
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        router.push("/plans-and-credits");
                        closeOnMobile();
                      }}
                      aria-label="Plans and Credits"
                      className="group/tooltip relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-0 bg-transparent text-slate-600 dark:text-zinc-300"
                    >
                      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6" fill="none">
                        <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="4.5" />
                        <circle cx="24" cy="24" r="13.5" stroke="currentColor" strokeWidth="4.5" />
                        <path d="M24 16.5C27.2 21 27 21.2 31.5 24C27 26.8 27.2 27 24 31.5C20.8 27 21 26.8 16.5 24C21 21.2 20.8 21 24 16.5Z" fill="currentColor" />
                      </svg>
                      <span className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#18181b] px-3.5 py-1.5 text-[13px] font-medium text-white opacity-0 shadow-2xl transition-all duration-150 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100 scale-95">
                        Plans and Credits
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="w-full px-3 py-2.5 rounded-2xl flex items-center justify-center gap-2.5 bg-[#FF6B00] hover:bg-[#E66000] text-white font-semibold text-[14px] transition-all duration-150 cursor-pointer shadow-sm border-0 select-none"
                >
                  <LogIn className="w-4.5 h-4.5" strokeWidth={2.2} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export const RecentChatsPanel = () => null;

export default CanvasSidebar;
