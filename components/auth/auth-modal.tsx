"use client";

import React, { useState, useEffect, useRef } from "react";
import { Inter, Fraunces } from "next/font/google";

import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap", variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["italic"], weight: ["500"], display: "swap", variable: "--font-fraunces" });

export type Mode = "login" | "signup";

export interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: (user?: { name?: string; email?: string }) => void;
  defaultMode?: Mode;
  isPage?: boolean;
}

/* ─── Security helpers ─── */
const sanitize = (s: string, max = 128) => s.replace(/[<>&\"';`{}\\[\]$]/g, "").slice(0, max);
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;

/* ─── Rate limiter (simple ref-based) ─── */
function useRateLimit(max = 5, windowMs = 60000) {
  const ref = useRef({ attempts: 0, resetAt: 0 });
  return () => {
    const now = Date.now();
    if (now > ref.current.resetAt) { ref.current = { attempts: 0, resetAt: now + windowMs }; }
    if (ref.current.attempts >= max) return { ok: false, wait: Math.ceil((ref.current.resetAt - now) / 1000) };
    ref.current.attempts++;
    return { ok: true, wait: 0 };
  };
}

/* ─── Icons (crisp, properly-sized) ─── */
const Close = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
);

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
);

const Google = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const GitHub = () => (
  <svg className="h-5 w-5 fill-[#181717]" viewBox="0 0 24 24">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const Apple = () => (
  <svg className="h-5 w-5 fill-[#000000]" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.66-2.83 1.44-.59.67-1.11 1.77-.97 2.83 1.11.09 2.2-.54 2.84-1.32Z" />
  </svg>
);

/* Enterprise SSO / Key Round Icon */
const SSO = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-neutral-800"
  >
    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

const SOCIALS = [
  { id: "google", name: "Google", Icon: Google },
  { id: "github", name: "GitHub", Icon: GitHub },
  { id: "apple", name: "Apple", Icon: Apple },
  { id: "sso", name: "SSO", Icon: SSO },
];

/* ================================================================
   MAIN MODAL
================================================================ */
export default function AuthModal({ isOpen = true, onClose, onSuccess, defaultMode = "login", isPage = false }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [busy, setBusy] = useState(false);
  const [slide, setSlide] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);
  const checkRate = useRateLimit(5, 60000);

  const isLogin = mode === "login";

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  /* Lock scroll */
  useEffect(() => {
    if (!isOpen || isPage) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, [isOpen, isPage]);

  /* Focus trap + ESC */
  useEffect(() => {
    if (!isOpen || isPage) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
      if (e.key !== "Tab") return;
      const nodes = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handler);
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => { document.removeEventListener("keydown", handler); clearTimeout(t); };
  }, [isOpen, isPage, onClose]);

  const switchMode = (next: Mode) => {
    if (busy || next === mode) return;
    setSlide(true);
    setMode(next);
    setTimeout(() => setSlide(false), 350);
  };

  if (!isOpen && !isPage) return null;

  const cardContent = (
    <div
      ref={modalRef}
      className="relative w-full max-w-[95vw] sm:max-w-[440px] md:max-w-[960px] md:h-[620px] rounded-[24px] sm:rounded-[26px] border border-[#E8E8EC] bg-white md:bg-[#FAFAFA] shadow-[0_12px_40px_rgba(10,10,12,0.06)] md:shadow-[0_20px_70px_rgba(10,10,12,0.08)] overflow-hidden"
      style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Top Header Bar for Mobile & Desktop */}
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6 md:px-0 md:pt-0">
        {/* Logo with Clean Glassmorphism Effect */}
        <div className="md:absolute md:left-8 md:top-7 md:z-30">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] group hover:bg-white transition-all"
          >
            <Image
              src="/logo.png"
              alt="Rivinity Logo"
              width={32}
              height={32}
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <span className="text-[18px] sm:text-[19px] font-bold tracking-tight text-[#0A0A0C]">Rivinity</span>
          </Link>
        </div>

        {/* Close or Back Button */}
        {isPage ? (
          <Link
            href="/"
            aria-label="Back to home"
            className="md:absolute md:right-6 md:top-6 md:z-50 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-white/95 hover:bg-white text-[#0A0A0C] backdrop-blur-xl border border-slate-200/80 transition shadow-[0_4px_20px_rgba(0,0,0,0.04)] cursor-pointer"
          >
            ← Back to Home
          </Link>
        ) : (
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="md:absolute md:right-6 md:top-6 md:z-50 flex h-9 w-9 items-center justify-center rounded-full text-[#0A0A0C] hover:bg-white bg-white/95 backdrop-blur-xl border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 cursor-pointer transition shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          >
            <Close />
          </button>
        )}
      </div>

      {/* Clean Ambient Background (Desktop Only - Old photo removed so ASCII flower is crisp & visible) */}
      <div className="hidden md:block absolute inset-0 overflow-hidden bg-[#F6F7F9] pointer-events-none rounded-[20px] sm:rounded-[26px]">
        {/* Soft subtle warmth glow highlights */}
        <div className="absolute -top-[15%] -left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-orange-100/35 via-amber-50/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-[15%] -right-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-slate-200/35 to-transparent blur-3xl" />
      </div>

      {/* Marketing — Login (White Card & Botanical ASCII Art on Clean Backdrop) */}
      <div
        className={`hidden md:flex flex-col absolute inset-y-0 right-0 z-10 w-[48%] justify-between items-end px-7 lg:px-10 pt-16 pb-7 lg:pb-8 transition-all duration-300 ${
          isLogin ? "opacity-100 translate-x-0" : "pointer-events-none opacity-0 translate-x-4"
        }`}
      >
        {/* Upper Area: Botanical ASCII Dot Art (matching Image 2) */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0 pointer-events-none">
          <div className="relative w-[230px] h-[210px] lg:w-[260px] lg:h-[235px] flex items-center justify-center">
            <img
              src="/images/auth-flower.png"
              alt="Botanical ASCII art"
              className="relative w-full h-full object-contain select-none opacity-95 transition-transform duration-700 hover:scale-105"
              draggable={false}
            />
          </div>
        </div>

        {/* Bottom Text Box */}
        <div className="w-full max-w-[280px] p-4.5 sm:p-5 rounded-[20px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] shrink-0">
          <h2 className="!m-0 text-[23px] font-semibold !leading-[1.14] tracking-[-0.03em] text-[#0A0A0C]">
            Welcome<br />
            <span
              className="inline-block text-[23px] font-normal italic leading-[1.14] text-[#0A0A0C]"
              style={{ fontFamily: "var(--font-fraunces),Georgia,serif", paddingLeft: "0.05em" }}
            >
              back.
            </span>
          </h2>
          <p className="!m-0 mt-2 text-[12.5px] font-medium leading-[1.5] text-neutral-600">
            Your projects, your work and your people are exactly where you left them.
          </p>
        </div>
      </div>

      {/* Marketing — Signup (White Card & Botanical ASCII Art on Clean Backdrop) */}
      <div
        className={`hidden md:flex flex-col absolute inset-y-0 left-0 z-10 w-[48%] justify-between items-start px-7 lg:px-10 pt-16 pb-7 lg:pb-8 transition-all duration-300 ${
          isLogin ? "pointer-events-none opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
        }`}
      >
        {/* Upper Area: Botanical ASCII Dot Art (matching Image 2) */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0 pointer-events-none">
          <div className="relative w-[230px] h-[210px] lg:w-[260px] lg:h-[235px] flex items-center justify-center">
            <img
              src="/images/auth-flower.png"
              alt="Botanical ASCII art"
              className="relative w-full h-full object-contain select-none opacity-95 transition-transform duration-700 hover:scale-105"
              draggable={false}
            />
          </div>
        </div>

        {/* Bottom Text Box */}
        <div className="w-full max-w-[280px] p-4.5 sm:p-5 rounded-[20px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] shrink-0">
          <h2 className="!m-0 text-[23px] font-semibold !leading-[1.14] tracking-[-0.03em] text-[#0A0A0C]">
            Start your<br />
            <span
              className="inline-block text-[23px] font-normal italic leading-[1.14] text-[#0A0A0C]"
              style={{ fontFamily: "var(--font-fraunces),Georgia,serif", paddingLeft: "0.08em", paddingRight: "0.08em" }}
            >
              journey.
            </span>
          </h2>
          <p className="!m-0 mt-2 text-[12.5px] font-medium leading-[1.5] text-neutral-600">
            One account for your projects, your ideas and everything you build with Rivinity.
          </p>
        </div>
      </div>

      {/* Form Panel */}
      <div
        className={`relative w-full md:absolute md:inset-y-0 md:left-0 md:z-20 md:w-[58%] bg-white md:shadow-[0_0_50px_rgba(0,0,0,0.06)] md:transition-transform md:duration-[400ms] md:ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isLogin ? "auth-panel-login" : "auth-panel-signup"
        }`}
      >
        <div className={`flex h-full w-full items-center px-5 py-5 sm:px-8 sm:py-8 ${isLogin ? "md:pl-10 md:pr-14 lg:pl-12 lg:pr-16" : "md:pl-16 md:pr-10 lg:pl-20 lg:pr-12"}`}>
          <div className={`w-full max-w-[420px] mx-auto md:mx-0 md:transition-all md:duration-300 ${slide ? "md:opacity-0 md:-translate-x-5" : "opacity-100 translate-x-0"}`}>
            <FormContent
              mode={mode}
              busy={busy}
              setBusy={setBusy}
              onSwitch={() => switchMode(isLogin ? "signup" : "login")}
              honeyRef={honeyRef}
              checkRate={checkRate}
              onSuccess={onSuccess}
              onClose={onClose}
              isPage={isPage}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (isPage) {
    return (
      <div className={`${inter.variable} ${fraunces.variable} w-full flex items-center justify-center`}>
        {cardContent}
      </div>
    );
  }

  return (
    <div className={`${inter.variable} ${fraunces.variable}`}>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
        role="dialog" aria-modal="true"
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0A0A0C]/40 backdrop-blur-sm" />
        {cardContent}
      </div>
    </div>
  );
}

/* ================================================================
   FORM CONTENT (login + signup in one place)
================================================================ */
function FormContent({
  mode,
  busy,
  setBusy,
  onSwitch,
  honeyRef,
  checkRate,
  onSuccess,
  onClose,
  isPage,
}: {
  mode: Mode;
  busy: boolean;
  setBusy: (v: boolean) => void;
  onSwitch: () => void;
  honeyRef: React.RefObject<HTMLInputElement | null>;
  checkRate: () => { ok: boolean; wait: number };
  onSuccess?: (user?: { name?: string; email?: string }) => void;
  onClose?: () => void;
  isPage?: boolean;
}) {
  const isLogin = mode === "login";
  const [showPwd, setShowPwd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [keep, setKeep] = useState(isLogin);
  const [err, setErr] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const clearErr = (field: string) => setErr((p) => { const n = { ...p }; delete n[field]; delete n.general; return n; });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!isLogin) {
      if (!name.trim()) e.name = "Name is required";
      else if (name.trim().length < 2) e.name = "Too short";
    }
    if (!email.trim()) e.email = "Email is required";
    else if (!emailOk(email.trim())) e.email = "Invalid email";
    if (!pwd) e.password = "Password is required";
    else if (pwd.length < (isLogin ? 6 : 8)) e.password = `Min ${isLogin ? 6 : 8} chars`;
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy || loading) return;
    if (honeyRef.current?.value) return; // bot
    const rate = checkRate();
    if (!rate.ok) { setErr({ general: `Too many attempts. Wait ${rate.wait}s.` }); return; }
    if (!validate()) return;

    setLoading(true); setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      onSuccess?.({ name: name.trim(), email: email.trim() });
      if (isPage) {
        window.location.href = "/dashboard";
      } else {
        onClose?.();
      }
    } catch {
      setErr({ general: isLogin ? "Invalid credentials." : "Signup failed. Try again." });
    } finally {
      setLoading(false); setBusy(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-3 sm:mb-4 text-[24px] sm:text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#0A0A0C]">
        {isLogin ? "Log in" : "Sign up"}
      </h1>

      {/* Socials */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {SOCIALS.map(({ id, name, Icon }) => (
          <button
            key={id}
            type="button"
            disabled={busy || loading}
            onClick={() => {
              onSuccess?.({ name: `${name} User`, email: `user@${id}.com` });
              if (isPage) {
                window.location.href = "/dashboard";
              } else {
                onClose?.();
              }
            }}
            aria-label={`Continue with ${name}`}
            className="inline-flex h-10 sm:h-11 w-full items-center justify-center rounded-xl border border-neutral-200/90 bg-[#FAFAFA] text-neutral-800 shadow-2xs transition-all hover:bg-white hover:border-neutral-300 hover:shadow-xs active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 disabled:opacity-50 cursor-pointer"
          >
            <Icon />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="my-2.5 sm:my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E8E8EC]" />
        <span className="text-[10px] uppercase text-[#6B6B75]" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>or</span>
        <div className="h-px flex-1 bg-[#E8E8EC]" />
      </div>

      <form onSubmit={submit} className="w-full" noValidate>
        {/* Honeypot */}
        <input ref={honeyRef} type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute opacity-0 w-0 h-0" aria-hidden="true" />

        {/* Name (signup only) */}
        {!isLogin && (
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-[#6B6B75]">Name</span>
            <input type="text" placeholder="Your name" value={name} maxLength={64} autoComplete="name" disabled={busy || loading}
              onChange={(e) => { setName(sanitize(e.target.value, 64)); clearErr("name"); }}
              className={`h-9 sm:h-10 w-full border-0 border-b bg-transparent px-0 text-[13px] text-[#0A0A0C] outline-none placeholder:text-[#6B6B75]/40 focus:border-[#7C3AED] ${err.name ? "border-red-400" : "border-[#E8E8EC]"}`} />
            {err.name && <span className="mt-1 block text-[11px] text-red-500">{err.name}</span>}
          </label>
        )}

        {/* Email */}
        <label className={`block ${isLogin ? "" : "mt-2 sm:mt-3"}`}>
          <span className="mb-1 block text-[11px] font-medium text-[#6B6B75]">Email</span>
          <input type="email" placeholder="you@example.com" value={email} maxLength={254} autoComplete="email" disabled={busy || loading}
            onChange={(e) => { setEmail(sanitize(e.target.value, 254)); clearErr("email"); }}
            className={`h-9 sm:h-10 w-full border-0 border-b bg-transparent px-0 text-[13px] text-[#0A0A0C] outline-none placeholder:text-[#6B6B75]/40 focus:border-[#7C3AED] ${err.email ? "border-red-400" : "border-[#E8E8EC]"}`} />
          {err.email && <span className="mt-1 block text-[11px] text-red-500">{err.email}</span>}
        </label>

        {/* Password */}
        <label className="mt-2 block sm:mt-3">
          <span className="mb-1 block text-[11px] font-medium text-[#6B6B75]">Password</span>
          <div className="relative">
            <input type={showPwd ? "text" : "password"} placeholder="••••••••" value={pwd} maxLength={128} autoComplete={isLogin ? "current-password" : "new-password"} disabled={busy || loading}
              onChange={(e) => { setPwd(sanitize(e.target.value, 128)); clearErr("password"); }}
              className={`h-9 sm:h-10 w-full border-0 border-b bg-transparent px-0 pr-12 text-[13px] text-[#0A0A0C] outline-none placeholder:text-[#6B6B75]/40 focus:border-[#7C3AED] ${err.password ? "border-red-400" : "border-[#E8E8EC]"}`} />
            <button
              type="button"
              disabled={busy || loading}
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#6B6B75] hover:text-[#7C3AED] transition outline-none border-none bg-transparent cursor-pointer"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
          {err.password && <span className="mt-1 block text-[11px] text-red-500">{err.password}</span>}
        </label>

        {/* Login extras */}
        {isLogin && (
          <div className="my-3 flex items-center justify-between gap-2 sm:my-4">
            <label className="flex items-center gap-2 text-[11px] text-[#6B6B75] cursor-pointer select-none">
              <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} disabled={busy || loading} className="h-3.5 w-3.5 accent-[#7C3AED] rounded" />
              <span>Keep me signed in</span>
            </label>
            <button
              type="button"
              disabled={busy || loading}
              className="text-[11px] text-[#F97316] hover:underline transition outline-none border-none bg-transparent cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* General error */}
        {err.general && (
          <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600 border border-red-100">{err.general}</div>
        )}

        {/* Submit */}
        <button type="submit" disabled={busy || loading} className="mt-4 h-10 sm:h-11 w-full rounded-[9px] bg-[#0A0A0C] text-[13px] font-semibold text-white transition hover:bg-[#12131A] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
          {loading ? <><Spinner /> {isLogin ? "Signing in..." : "Creating..."}</> : isLogin ? "Log in" : "Create account"}
        </button>

        {/* Footer toggle */}
        <p className="mt-3 text-center text-[12px] text-[#6B6B75] sm:mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            disabled={busy || loading}
            onClick={onSwitch}
            className="font-semibold text-[#7C3AED] underline underline-offset-2 hover:text-[#EC4899] transition outline-none border-none bg-transparent cursor-pointer"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
}
