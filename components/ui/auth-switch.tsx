"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Mail,
  Lock,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface SlidingAuthProps {
  className?: string;
  defaultMode?: "signin" | "signup";
  bannerImage?: string;
  onSignIn?: (data: { email: string; pass: string }) => void;
  onSignUp?: (data: { name: string; email: string; pass: string }) => void;
}

export function SlidingAuth({
  className,
  defaultMode = "signin",
  bannerImage = "/auth-banner.png",
  onSignIn,
  onSignUp,
}: SlidingAuthProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup");

  // Form states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn?.({ email: signInEmail, pass: signInPassword });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp?.({ name: signUpName, email: signUpEmail, pass: signUpPassword });
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[900px] mx-auto rounded-3xl bg-white/90 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.9)_inset] border border-gray-200/90 overflow-hidden select-none",
        className
      )}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Top Floating Brand Logo                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Rivinity Logo"
            width={28}
            height={28}
            className="w-6 sm:w-7 h-6 sm:h-7 group-hover:scale-105 transition-transform"
          />
          <span className="text-sm sm:text-base font-bold tracking-tight text-gray-900">
            Rivinity
          </span>
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile Top Interactive Tab Switcher (< md)                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="block md:hidden pt-16 px-4 pb-2">
        <div className="relative flex w-full max-w-xs mx-auto p-1 rounded-full bg-gray-100/90 border border-gray-200">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={cn(
              "relative z-10 flex-1 py-2 text-xs font-bold transition-colors text-center cursor-pointer",
              !isSignUp ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={cn(
              "relative z-10 flex-1 py-2 text-xs font-bold transition-colors text-center cursor-pointer",
              isSignUp ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            Sign Up
          </button>
          {/* Animated active tab pill */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-white shadow-xs"
            initial={false}
            animate={{
              left: !isSignUp ? "4px" : "50%",
              width: "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Forms Container                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative w-full min-h-[500px] sm:min-h-[540px] grid grid-cols-1 md:grid-cols-2">
        {/* ================================================================ */}
        {/* 1. Sign In Form (Left Column)                                   */}
        {/* ================================================================ */}
        <div
          className={cn(
            "w-full h-full flex flex-col justify-center items-center px-6 sm:px-12 py-8 sm:py-12 transition-all duration-300",
            isSignUp
              ? "hidden md:flex md:opacity-100 md:pointer-events-auto"
              : "flex opacity-100"
          )}
        >
          <div className="w-full max-w-xs space-y-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Sign in to Rivinity
            </h2>

            {/* Social Icons Row */}
            <div className="flex justify-center items-center gap-3 pt-1">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white/90 shadow-2xs hover:shadow-xs hover:border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
                title="Sign in with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.04H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.53 13.83A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.53C7.3 7.85 9.46 6.13 12 6.13Z"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white/90 shadow-2xs hover:shadow-xs hover:border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
                title="Sign in with GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white/90 shadow-2xs hover:shadow-xs hover:border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
                title="Sign in with LinkedIn"
              >
                <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-400 font-medium">
              or use your email account:
            </p>

            {/* Inputs */}
            <form onSubmit={handleSignIn} className="space-y-3 pt-1">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200/90 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-400 transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200/90 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-400 transition-all"
                />
              </div>

              <div className="pt-1">
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-400 transition-all pb-0.5"
                >
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-6 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Sign In
              </button>

              {/* Mobile Switch Footer */}
              <div className="pt-3 block md:hidden">
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-xs text-gray-600 font-medium hover:underline cursor-pointer"
                >
                  Don&apos;t have an account? <span className="text-[#FD881F] font-bold">Sign Up</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 2. Sign Up Form (Right Column)                                  */}
        {/* ================================================================ */}
        <div
          className={cn(
            "w-full h-full flex flex-col justify-center items-center px-6 sm:px-12 py-8 sm:py-12 transition-all duration-300",
            !isSignUp
              ? "hidden md:flex md:opacity-100 md:pointer-events-auto"
              : "flex opacity-100"
          )}
        >
          <div className="w-full max-w-xs space-y-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>

            {/* Social Icons Row */}
            <div className="flex justify-center items-center gap-3 pt-1">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white/90 shadow-2xs hover:shadow-xs hover:border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
                title="Sign up with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.04H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.53 13.83A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.53C7.3 7.85 9.46 6.13 12 6.13Z"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white/90 shadow-2xs hover:shadow-xs hover:border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
                title="Sign up with GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white/90 shadow-2xs hover:shadow-xs hover:border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
                title="Sign up with LinkedIn"
              >
                <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-400 font-medium">
              or use your email for registration:
            </p>

            {/* Inputs */}
            <form onSubmit={handleSignUp} className="space-y-3 pt-1">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="Name"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200/90 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-400 transition-all"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200/90 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-400 transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200/90 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-400 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-6 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Sign Up
              </button>

              {/* Mobile Switch Footer */}
              <div className="pt-3 block md:hidden">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-xs text-gray-600 font-medium hover:underline cursor-pointer"
                >
                  Already have an account? <span className="text-[#FD881F] font-bold">Sign In</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Dynamic Sliding Image/Hero Overlay Panel (Desktop Only)            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={false}
        animate={{
          x: isSignUp ? "-100%" : "0%",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
          mass: 0.9,
        }}
        className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-20 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.2)]"
      >
        {/* Background Image with Ambient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        />

        {/* Translucent Glass Tint Overlay to make text pop over warm gradient */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

        {/* Ambient Brand Radiant Glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/20 blur-2xl pointer-events-none" />

        {/* Decorative Geometric Ambient Shapes */}
        <div className="absolute top-1/4 right-8 w-24 h-24 rounded-2xl bg-white/10 rotate-12 border border-white/20 pointer-events-none backdrop-blur-xs" />
        <div className="absolute bottom-1/4 left-8 w-20 h-20 rounded-full bg-white/10 border border-white/20 pointer-events-none backdrop-blur-xs" />

        {/* ---------------------------------------------------------------- */}
        {/* Content Container (Sliding Message & Action Pill)                */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center p-8 sm:p-12 text-white">
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.div
                key="overlay-to-signup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 max-w-sm"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md leading-tight">
                  Build Without Limits.
                </h3>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium drop-shadow-xs">
                  Join 50,000+ engineers orchestrating autonomous agent swarms, sub-10ms model routing, and persistent context.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="px-9 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="overlay-to-signin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 max-w-sm"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md leading-tight">
                  Resume Your Swarm.
                </h3>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium drop-shadow-xs">
                  Pick up where you left off with sandboxed execution, shared canvas memory, and real-time telemetry.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="px-9 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default SlidingAuth;
