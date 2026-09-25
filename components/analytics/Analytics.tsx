"use client";

import React, { useState, useMemo, useEffect } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import { useSidebarState } from "@/components/canvas/useSidebarState";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Search,
  Calendar,
  Info,
  CreditCard,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCcw,
  Check,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Filter,
} from "lucide-react";

/* =========================================================
   Animation Configuration
========================================================= */

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   Brand SVGs (16x16px / w-4 h-4)
========================================================= */

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} rounded-md shrink-0`} fill="none">
    <defs>
      <radialGradient id="igGradLight" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#igGradLight)" />
    <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.8" />
    <circle cx="16.3" cy="7.7" r="0.9" fill="white" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path
      d="M14.5 12h-2v7h-3v-7H8v-2.5h1.5V7.8c0-2 1.2-3.3 3.3-3.3 1 0 1.9.1 1.9.1v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4v1.2h2.5L14.5 12z"
      fill="white"
    />
  </svg>
);

const GoogleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const YouTubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M10 8.5v7l6-3.5-6-3.5z" fill="white" />
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <rect width="24" height="24" rx="6" fill="#000000" />
    <path
      d="M16.5 8.2a4.4 4.4 0 0 1-2.9-1.3V14a3.8 3.8 0 1 1-3.8-3.8c.3 0 .6 0 .9.1V13a1.8 1.8 0 1 0 1.8 1.8V4.5h2.1a4.4 4.4 0 0 0 4.1 3.7v2c-.8 0-1.5-.7-2.2-2z"
      fill="white"
    />
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <rect width="24" height="24" rx="6" fill="#0A66C2" />
    <path
      d="M7 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-.3 3.5H4.2V19h2.5V10zm4 0H8.3V19h2.4v-4.5c0-1.2.5-2 1.7-2 1.2 0 1.6.9 1.6 2.1V19h2.5v-5.2c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.8-2.5 1.4V10z"
      fill="white"
    />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <rect width="24" height="24" rx="6" fill="#0F1419" />
    <path
      d="M14.2 10.3l5.5-6.3h-1.3l-4.8 5.5-3.8-5.5H5.4l5.8 8.4-5.8 6.6h1.3l5-5.7 4 5.7h4.4l-5.9-8.7zm-1.8 2l-.6-.8-4.7-6.7h2l3.8 5.4.6.8 5 7.1h-2l-4.1-5.8z"
      fill="white"
    />
  </svg>
);

const PinterestIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <circle cx="12" cy="12" r="12" fill="#E60023" />
    <path
      d="M12 5a6.5 6.5 0 0 0-2.4 12.5c0-.5.1-1.3.3-1.8l1-4.2s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.8 0 1.1.6 1.1 1.3 0 .8-.5 1.9-.8 3-.2.9.5 1.6 1.4 1.6 1.7 0 2.8-2.1 2.8-4.7 0-1.9-1.3-3.4-3.7-3.4-2.7 0-4.4 2-4.4 4.3 0 .8.3 1.6.7 2.1.1.1.1.2 0 .4l-.2 1c0 .2-.2.3-.4.2-1.3-.6-1.9-2.2-1.9-3.6 0-2.7 2.3-5.9 6.8-5.9 3.6 0 6 2.6 6 5.4 0 3.7-2.1 6.5-5.2 6.5-1 0-2-.5-2.3-1.2l-.6 2.5c-.2.9-.8 2-1.2 2.6A6.5 6.5 0 1 0 12 5z"
      fill="white"
    />
  </svg>
);

const TelegramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <circle cx="12" cy="12" r="12" fill="#24A1DE" />
    <path
      d="M5.5 11.5l11.5-4.5c.5-.2 1 .2.8.7l-2 9.5c-.1.5-.7.7-1.1.4l-3.2-2.4-1.5 1.5c-.2.2-.5.1-.6-.2l-.6-3.8 6.5-5.8c.2-.2 0-.4-.2-.2L7.3 13l-1.8-.6c-.5-.2-.5-.8 0-.9z"
      fill="white"
    />
  </svg>
);

/* =========================================================
   Flag SVGs
========================================================= */

const USFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="16" fill="#B22234" />
    <path d="M0 2.46h24v1.23H0zM0 4.92h24v1.23H0zM0 7.38h24v1.23H0zM0 9.84h24v1.23H0zM0 12.3h24v1.23H0zM0 14.77h24v1.23H0z" fill="#FFF" />
    <rect width="10" height="8.6" fill="#3C3B6E" />
    <circle cx="2" cy="2" r="0.6" fill="#FFF" /><circle cx="5" cy="2" r="0.6" fill="#FFF" /><circle cx="8" cy="2" r="0.6" fill="#FFF" />
    <circle cx="3.5" cy="4.3" r="0.6" fill="#FFF" /><circle cx="6.5" cy="4.3" r="0.6" fill="#FFF" />
    <circle cx="2" cy="6.6" r="0.6" fill="#FFF" /><circle cx="5" cy="6.6" r="0.6" fill="#FFF" /><circle cx="8" cy="6.6" r="0.6" fill="#FFF" />
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="16" fill="#012169" />
    <path d="M0 0l24 16M24 0L0 16" stroke="#FFF" strokeWidth="2.5" />
    <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.3" />
    <path d="M12 0v16M0 8h24" stroke="#FFF" strokeWidth="4.5" />
    <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.7" />
  </svg>
);

const GermanyFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="5.33" fill="#000000" />
    <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
    <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
  </svg>
);

const IndiaFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="5.33" fill="#FF9933" />
    <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
    <rect y="10.66" width="24" height="5.34" fill="#138808" />
    <circle cx="12" cy="8" r="2.1" stroke="#000080" strokeWidth="0.5" fill="none" />
    <circle cx="12" cy="8" r="0.6" fill="#000080" />
  </svg>
);

const CanadaFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="6" height="16" fill="#FF0000" />
    <rect x="6" width="12" height="16" fill="#FFFFFF" />
    <rect x="18" width="6" height="16" fill="#FF0000" />
    <path d="M12 4.5l.8 2.2 2.2-.4-1.2 1.8 1.4 1.2-2.2.4v1.8h-2V9.7l-2.2-.4 1.4-1.2-1.2-1.8 2.2.4z" fill="#FF0000" />
  </svg>
);

const JapanFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="16" fill="#FFFFFF" />
    <circle cx="12" cy="8" r="4.8" fill="#BC002D" />
  </svg>
);

const AustraliaFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="16" fill="#00008B" />
    <path d="M0 0l12 8M12 0L0 8" stroke="#FFF" strokeWidth="1.2" />
    <path d="M6 0v8M0 4h12" stroke="#CC0000" strokeWidth="1.4" />
    <circle cx="6" cy="12" r="1.4" fill="#FFF" />
    <circle cx="18" cy="4" r="0.8" fill="#FFF" />
    <circle cx="19" cy="8" r="0.8" fill="#FFF" />
    <circle cx="17" cy="11" r="0.8" fill="#FFF" />
    <circle cx="21" cy="11" r="0.8" fill="#FFF" />
  </svg>
);

const BangladeshFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="16" fill="#006A4E" />
    <circle cx="10.5" cy="8" r="4.8" fill="#F42A41" />
  </svg>
);

const FranceFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="8" height="16" fill="#002395" />
    <rect x="8" width="8" height="16" fill="#FFFFFF" />
    <rect x="16" width="8" height="16" fill="#ED2939" />
  </svg>
);

const BrazilFlag = () => (
  <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-slate-200/40">
    <rect width="24" height="16" fill="#009739" />
    <polygon points="12,2 22,8 12,14 2,8" fill="#FED100" />
    <circle cx="12" cy="8" r="3.2" fill="#002776" />
  </svg>
);

/* =========================================================
   Semi-Circle Gauge Component
========================================================= */

const TrafficVeracityGauge = () => {
  const totalLength = 194.78;
  const organicLength = totalLength * 0.503;
  const invalidLength = totalLength * 0.175;
  const referralLength = totalLength * 0.124;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
      <div className="relative w-36 h-20 flex items-end justify-center">
        <svg viewBox="0 0 160 90" className="w-full h-full overflow-visible">
          <path
            d="M 18 82 A 62 62 0 0 1 142 82"
            fill="none"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            d="M 18 82 A 62 62 0 0 1 142 82"
            fill="none"
            stroke="#6366F1"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${organicLength} ${totalLength}`}
            initial={{ strokeDashoffset: totalLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M 18 82 A 62 62 0 0 1 142 82"
            fill="none"
            stroke="#F97316"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${invalidLength} ${totalLength}`}
            initial={{ strokeDashoffset: totalLength }}
            animate={{ strokeDashoffset: -organicLength }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M 18 82 A 62 62 0 0 1 142 82"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${referralLength} ${totalLength}`}
            initial={{ strokeDashoffset: totalLength }}
            animate={{ strokeDashoffset: -(organicLength + invalidLength) }}
            transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Traffic</span>
          <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            8,358
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-1.5 w-full sm:w-auto text-[11px] border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80 pt-2 sm:pt-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3 rounded-full bg-[#6366F1]" />
          <span className="font-bold text-slate-900 dark:text-white text-xs">50.3%</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium ml-0.5">Organic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3 rounded-full bg-[#F97316]" />
          <span className="font-bold text-slate-900 dark:text-white text-xs">17.5%</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium ml-0.5">Invalid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3 rounded-full bg-[#FBBF24]" />
          <span className="font-bold text-slate-900 dark:text-white text-xs">12.4%</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium ml-0.5">Referral</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Analytics Main Export Component
========================================================= */

const Analytics = () => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();

  const [dateRange, setDateRange] = useState("10 Feb - 21 Nov 2026");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const [headerSearchTerm] = useState("");
  const [showSavingsInfo, setShowSavingsInfo] = useState(false);

  const [dimension, setDimension] = useState("Country");
  const [campaign, setCampaign] = useState("Campaign Type");
  const [source, setSource] = useState("UTM Source");

  const [activeTab, setActiveTab] = useState("All");
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("totalViewsNum");
  const [sortAsc, setSortAsc] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [channelPage, setChannelPage] = useState(1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const initialData = useMemo(
    () => [
      {
        country: "United States",
        flag: <USFlag />,
        timeOnPage: "3 mins 21 ses",
        pageViews: "78,189",
        bounceRate: "25.13%",
        conversionRate: "32.36%",
        totalViews: "980,232.00",
        totalViewsNum: 980232,
        pageViewsNum: 78189,
        type: "Organic",
      },
      {
        country: "United Kingdom",
        flag: <UKFlag />,
        timeOnPage: "2 mins 12 ses",
        pageViews: "59,893",
        bounceRate: "24.35%",
        conversionRate: "28.83%",
        totalViews: "896,365.12",
        totalViewsNum: 896365,
        pageViewsNum: 59893,
        type: "Referrals",
      },
      {
        country: "Germany",
        flag: <GermanyFlag />,
        timeOnPage: "3 mins 05 ses",
        pageViews: "64,310",
        bounceRate: "21.40%",
        conversionRate: "31.15%",
        totalViews: "745,190.50",
        totalViewsNum: 745190,
        pageViewsNum: 64310,
        type: "Organic",
      },
      {
        country: "India",
        flag: <IndiaFlag />,
        timeOnPage: "2 mins 45 ses",
        pageViews: "71,450",
        bounceRate: "29.80%",
        conversionRate: "24.50%",
        totalViews: "712,400.00",
        totalViewsNum: 712400,
        pageViewsNum: 71450,
        type: "Social",
      },
      {
        country: "Bangladesh",
        flag: <BangladeshFlag />,
        timeOnPage: "1 mins 18 ses",
        pageViews: "56,238",
        bounceRate: "32.18%",
        conversionRate: "20.18%",
        totalViews: "683,723.83",
        totalViewsNum: 683723,
        pageViewsNum: 56238,
        type: "Direct",
      },
      {
        country: "Canada",
        flag: <CanadaFlag />,
        timeOnPage: "3 mins 40 ses",
        pageViews: "48,920",
        bounceRate: "22.65%",
        conversionRate: "29.70%",
        totalViews: "598,110.20",
        totalViewsNum: 598110,
        pageViewsNum: 48920,
        type: "Email",
      },
      {
        country: "France",
        flag: <FranceFlag />,
        timeOnPage: "4 mins 39 ses",
        pageViews: "30,896",
        bounceRate: "18.72%",
        conversionRate: "28.48%",
        totalViews: "453,483.48",
        totalViewsNum: 453483,
        pageViewsNum: 30896,
        type: "Social",
      },
      {
        country: "Japan",
        flag: <JapanFlag />,
        timeOnPage: "4 mins 12 ses",
        pageViews: "28,640",
        bounceRate: "16.40%",
        conversionRate: "34.20%",
        totalViews: "412,890.00",
        totalViewsNum: 412890,
        pageViewsNum: 28640,
        type: "Organic",
      },
      {
        country: "Australia",
        flag: <AustraliaFlag />,
        timeOnPage: "2 mins 55 ses",
        pageViews: "25,120",
        bounceRate: "26.10%",
        conversionRate: "26.30%",
        totalViews: "389,450.75",
        totalViewsNum: 389450,
        pageViewsNum: 25120,
        type: "Invalid",
      },
      {
        country: "Brazil",
        flag: <BrazilFlag />,
        timeOnPage: "1 mins 50 ses",
        pageViews: "22,400",
        bounceRate: "33.50%",
        conversionRate: "18.90%",
        totalViews: "320,800.10",
        totalViewsNum: 320800,
        pageViewsNum: 22400,
        type: "Social",
      },
    ],
    []
  );

  const processedData = useMemo(() => {
    const result = initialData.filter((row) => {
      const query = (tableSearchQuery || headerSearchTerm).toLowerCase();
      const matchesSearch = row.country.toLowerCase().includes(query);
      const matchesTab = activeTab === "All" || row.type === activeTab;
      return matchesSearch && matchesTab;
    });

    result.sort((a, b) => {
      const aVal = a[sortField as keyof typeof a];
      const bVal = b[sortField as keyof typeof b];

      if (typeof aVal === "string") {
        return sortAsc
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      return sortAsc
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [initialData, tableSearchQuery, headerSearchTerm, activeTab, sortField, sortAsc]);

  const channelPagesData = useMemo(
    () => ({
      1: [
        { name: "Instagram", icon: <InstagramIcon />, pct: "65.05%", fill: 65.05, color: "linear-gradient(135deg, #fd5949 0%, #d6249f 50%, #285AEB 100%)" },
        { name: "Facebook", icon: <FacebookIcon />, pct: "32.12%", fill: 32.12, color: "#1877F2" },
        { name: "Google", icon: <GoogleIcon />, pct: "21.14%", fill: 21.14, color: "#4285F4" },
      ],
      2: [
        { name: "YouTube", icon: <YouTubeIcon />, pct: "54.20%", fill: 54.2, color: "#FF0000" },
        { name: "TikTok", icon: <TikTokIcon />, pct: "41.80%", fill: 41.8, color: "#000000" },
        { name: "LinkedIn", icon: <LinkedInIcon />, pct: "18.60%", fill: 18.6, color: "#0A66C2" },
      ],
      3: [
        { name: "X (Twitter)", icon: <TwitterIcon />, pct: "36.40%", fill: 36.4, color: "#0F1419" },
        { name: "Pinterest", icon: <PinterestIcon />, pct: "22.10%", fill: 22.1, color: "#E60023" },
        { name: "Telegram", icon: <TelegramIcon />, pct: "15.80%", fill: 15.8, color: "#24A1DE" },
      ],
      4: [
        { name: "Organic Search", icon: <GoogleIcon />, pct: "48.90%", fill: 48.9, color: "#4285F4" },
        { name: "Email Broadcast", icon: <InstagramIcon />, pct: "27.40%", fill: 27.4, color: "linear-gradient(135deg, #fd5949 0%, #d6249f 50%, #285AEB 100%)" },
        { name: "Partner Referrals", icon: <FacebookIcon />, pct: "14.20%", fill: 14.2, color: "#1877F2" },
      ],
    }),
    []
  );

  const currentChannels = channelPagesData[channelPage as keyof typeof channelPagesData] || channelPagesData[1];

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleExportCSV = () => {
    const headers = "Country,Time on Page,Page Views,Bounce Rate,Conversion Rate,Total Views\n";
    const rows = processedData
      .map(
        (r) =>
          `"${r.country}","${r.timeOnPage}","${r.pageViews}","${r.bounceRate}","${r.conversionRate}","${r.totalViews}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `analytics_traffic_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Exported data to CSV successfully!");
  };

  const handleReset = () => {
    setDimension("Country");
    setCampaign("Campaign Type");
    setSource("UTM Source");
    setActiveTab("All");
    setTableSearchQuery("");
    setSortField("totalViewsNum");
    setSortAsc(false);
    showToast("Filters reset to default!");
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden font-sans antialiased selection:bg-[var(--color-primary)]/25 transition-colors duration-300 bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--color-text)] text-[var(--color-white)] px-3.5 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 border border-[var(--color-border)]"
          >
            <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Integration */}
      <div className="relative z-50">
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onCollapse={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Scrollable Canvas Body */}
        <div className="w-full flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-4 sm:space-y-5">
            {/* Title & Global Filters Row */}
            <motion.div
              variants={itemVariants}
              className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                {/* EXACT MATCH to Image 2 "What will you craft today?" */}
                <h1 className="!text-2xl sm:!text-[28px] font-bold tracking-tight text-[#0f172a] dark:text-white flex items-center gap-2.5 leading-tight">
                  <div className="w-8 h-8 rounded-xl text-[var(--color-white)] shadow-xs bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span>Analytics</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] mt-1 font-normal">
                  Consolidated performance metrics, traffic veracity, and channel acquisition
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Date Range Picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDateDropdownOpen((prev) => !prev)}
                    className="h-8 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-bg-alt)] text-xs font-semibold text-[var(--color-text)] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    <span>{dateRange}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-secondary)] ml-0.5" />
                  </button>

                  <AnimatePresence>
                    {isDateDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 mt-1.5 w-44 bg-[var(--color-bg)] rounded-xl shadow-xl border border-[var(--color-border)] p-1 z-30"
                      >
                        {[
                          "10 Feb - 21 Nov 2026",
                          "Last 30 Days",
                          "This Month",
                          "This Quarter",
                        ].map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => {
                              setDateRange(option);
                              setIsDateDropdownOpen(false);
                              showToast(`Filter range set to: ${option}`);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                              dateRange === option
                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Row 1: Top 3 Cards */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
              {/* Card 1: Savings */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-4.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xs relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[var(--color-primary)]/15 via-[var(--color-primary)]/5 to-transparent rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10 mb-2">
                  <div className="flex items-center gap-1.5 relative">
                    <span className="text-xs sm:text-[13px] font-bold text-[var(--color-text)] tracking-tight">
                      Savings Benchmark
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSavingsInfo((p) => !p)}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors p-0.5 cursor-pointer"
                      title="Show Info"
                    >
                      <Info className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {showSavingsInfo && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="absolute left-0 top-6 z-20 w-56 p-2.5 bg-[var(--color-text)] text-[var(--color-white)] text-[10px] rounded-xl shadow-2xl leading-snug border border-[var(--color-border)]"
                        >
                          Automated pipeline savings benchmarked against full-time engineer & analyst hours.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Clean Upper-right Badge */}
                  <span className="text-[10px] font-bold tracking-wider text-[var(--color-primary)] uppercase bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    SAVINGS
                  </span>
                </div>

                <div className="mt-1 flex items-end justify-between gap-3 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-[var(--color-text-muted)] block mb-0.5">
                      Total Saved
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-[var(--color-text)] tracking-tight leading-tight">
                      $45,562.00
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 text-right font-mono">
                    <div>
                      <span className="text-[9px] uppercase font-semibold text-[var(--color-text-muted)] block">Last 30 Days</span>
                      <span className="text-xs font-semibold text-[var(--color-text)]">$5,215.10</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-semibold text-[var(--color-text-muted)] block">Next 30 Days</span>
                      <span className="text-xs font-semibold text-[var(--color-primary)]">$7,124.01</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Traffic Veracity */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-4.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xs relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-violet-500/15 via-purple-500/5 to-transparent rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between mb-1 relative z-10">
                  <span className="text-xs sm:text-[13px] font-bold text-[var(--color-text)] tracking-tight">
                    Traffic Veracity
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    AUDIENCE
                  </span>
                </div>

                <div className="relative z-10">
                  <TrafficVeracityGauge />
                </div>
              </motion.div>

              {/* Card 3: Traffic by Top Channel */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-4.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xs relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/15 via-blue-500/5 to-transparent rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between mb-2 relative z-10">
                  <span className="text-xs sm:text-[13px] font-bold text-[var(--color-text)] tracking-tight">
                    Traffic by Top Channel
                  </span>

                  <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-secondary)] font-mono">
                    <button
                      type="button"
                      onClick={() => setChannelPage((p) => (p > 1 ? p - 1 : 4))}
                      className="hover:text-[var(--color-primary)] p-0.5 rounded-lg hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span>{channelPage} of 4</span>
                    <button
                      type="button"
                      onClick={() => setChannelPage((p) => (p < 4 ? p + 1 : 1))}
                      className="hover:text-[var(--color-primary)] p-0.5 rounded-lg hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={channelPage}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-2"
                    >
                      {currentChannels.map((ch, idx) => (
                        <div key={ch.name}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-1.5 font-medium text-[var(--color-text)] text-xs">
                              {ch.icon}
                              <span>{ch.name}</span>
                            </div>
                            <span className="font-semibold font-mono text-[var(--color-text)] text-xs">
                              {ch.pct}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[var(--color-bg-alt)] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${ch.fill}%` }}
                              transition={{
                                duration: 0.6,
                                delay: idx * 0.06,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="h-full rounded-full"
                              style={{ background: ch.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Row 2: Filter Controls Bar */}
            <motion.div
              variants={itemVariants}
              className="p-3.5 sm:p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xs w-full grid grid-cols-1 lg:grid-cols-12 gap-3 items-center"
            >
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Dimension */}
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                    Dimension
                  </label>
                  <div className="relative">
                    <select
                      value={dimension}
                      onChange={(e) => {
                        setDimension(e.target.value);
                        showToast(`Dimension set to ${e.target.value}`);
                      }}
                      className="w-full appearance-none bg-[var(--color-bg-alt)] text-[var(--color-text)] border border-[var(--color-border)] rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer h-8.5"
                    >
                      <option value="Country">Country</option>
                      <option value="Region">Region</option>
                      <option value="City">City</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Campaign */}
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                    Campaign
                  </label>
                  <div className="relative">
                    <select
                      value={campaign}
                      onChange={(e) => {
                        setCampaign(e.target.value);
                        showToast(`Campaign set to ${e.target.value}`);
                      }}
                      className="w-full appearance-none bg-[var(--color-bg-alt)] text-[var(--color-text)] border border-[var(--color-border)] rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer h-8.5"
                    >
                      <option value="Campaign Type">Campaign Type</option>
                      <option value="Retargeting">Retargeting</option>
                      <option value="Prospecting">Prospecting</option>
                      <option value="Affiliate">Affiliate</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                    Source
                  </label>
                  <div className="relative">
                    <select
                      value={source}
                      onChange={(e) => {
                        setSource(e.target.value);
                        showToast(`Source set to ${e.target.value}`);
                      }}
                      className="w-full appearance-none bg-[var(--color-bg-alt)] text-[var(--color-text)] border border-[var(--color-border)] rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer h-8.5"
                    >
                      <option value="UTM Source">UTM Source</option>
                      <option value="Direct">Direct</option>
                      <option value="Paid Social">Paid Social</option>
                      <option value="Organic Search">Organic Search</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="lg:col-span-3 flex items-end h-full pt-1 lg:pt-0">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="w-full h-8.5 flex items-center justify-center gap-1.5 bg-[var(--color-bg)] border border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-xl px-3 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Row 3: Traffic by Top Countries Table */}
            <motion.div
              variants={itemVariants}
              className="p-4 sm:p-4.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xs w-full space-y-3.5"
            >
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Clean Section Heading matching Image 2 "Creative Tools" */}
                  <h2 className="!text-sm sm:!text-base font-bold tracking-tight text-[#0f172a] dark:text-white truncate">
                    Traffic by Top Countries
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute left-2.5" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={tableSearchQuery}
                      onChange={(e) => setTableSearchQuery(e.target.value)}
                      className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] pl-7.5 pr-2.5 h-8 rounded-xl focus:outline-none focus:border-[var(--color-primary)] w-28 sm:w-36 md:w-44 transition-colors"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast("Filter options panel opened")}
                    className="h-8 flex items-center gap-1 px-2.5 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors shadow-xs cursor-pointer shrink-0"
                  >
                    <Filter className="w-3 h-3 text-[var(--color-text-secondary)]" />
                    <span className="hidden xs:inline">Filter</span>
                  </button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportCSV}
                    className="h-8 px-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-white)] text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Export</span>
                  </motion.button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [&-webkit-scrollbar]:hidden">
                {[
                  "All",
                  "Organic",
                  "Invalid",
                  "Referrals",
                  "Direct",
                  "Social",
                  "Email",
                ].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`h-7 px-3 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap border cursor-pointer shrink-0 ${
                        isActive
                          ? "bg-[var(--color-primary)] text-[var(--color-white)] border-transparent shadow-xs"
                          : "bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-border)]"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Countries Table Container */}
              <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <table className="w-full text-left border-collapse min-w-[680px]">
                  <thead>
                    <tr className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                      <th
                        onClick={() => toggleSort("country")}
                        className="py-2.5 pr-3 cursor-pointer hover:text-[var(--color-text)] transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>Countries</span>
                          {sortField === "country" && (
                            sortAsc ? <ArrowUp className="w-3 h-3 text-[var(--color-primary)]" /> : <ArrowDown className="w-3 h-3 text-[var(--color-primary)]" />
                          )}
                        </div>
                      </th>
                      <th className="py-2.5 px-3">Time on Page</th>
                      <th
                        onClick={() => toggleSort("pageViewsNum")}
                        className="py-2.5 px-3 cursor-pointer hover:text-[var(--color-text)] transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>Page Views</span>
                          {sortField === "pageViewsNum" && (
                            sortAsc ? <ArrowUp className="w-3 h-3 text-[var(--color-primary)]" /> : <ArrowDown className="w-3 h-3 text-[var(--color-primary)]" />
                          )}
                        </div>
                      </th>
                      <th className="py-2.5 px-3">Bounce Rate</th>
                      <th className="py-2.5 px-3">Conversion Rate</th>
                      <th
                        onClick={() => toggleSort("totalViewsNum")}
                        className="py-2.5 pl-3 text-right cursor-pointer hover:text-[var(--color-text)] transition-colors select-none"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>Totals Views</span>
                          {sortField === "totalViewsNum" && (
                            sortAsc ? <ArrowUp className="w-3 h-3 text-[var(--color-primary)]" /> : <ArrowDown className="w-3 h-3 text-[var(--color-primary)]" />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)] text-xs font-medium">
                    {processedData.map((row) => (
                      <tr
                        key={row.country}
                        className="hover:bg-[var(--color-bg-alt)] transition-colors group cursor-default"
                      >
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-2">
                            {row.flag}
                            <span className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors text-xs">
                              {row.country}
                            </span>
                            <span className="text-[9px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-alt)] px-1.5 py-0.5 rounded">
                              {row.type}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-[var(--color-text-secondary)] font-mono text-xs">
                          {row.timeOnPage}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--color-text-secondary)] font-mono text-xs">
                          {row.pageViews}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--color-text-secondary)] font-mono text-xs">
                          {row.bounceRate}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--color-text-secondary)] font-mono text-xs">
                          {row.conversionRate}
                        </td>
                        <td className="py-2.5 pl-3 text-right font-bold font-mono text-[var(--color-text)] text-xs">
                          {row.totalViews}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;