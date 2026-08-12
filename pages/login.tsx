"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-[#FAF7F2] text-[#181818]">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[480px_1fr]">
                {/* LEFT: LOGIN */}
                <section className="relative flex min-h-screen flex-col bg-[#FAF7F2] px-6 sm:px-10 lg:px-21.5">
                    {/* Logo */}
                    <div className="pt-8 lg:pt-9">
                        <Link href="/" className="inline-flex items-center gap-1 text-xl font-medium">
                            <img
                                src="/logo.png"
                                alt="Your Logo"
                                className="h-10 w-10"
                            />
                            Rivinity
                        </Link>
                    </div>

                    {/* Form */}
                    <div className="mx-auto flex w-full max-w-77.5 flex-1 flex-col justify-center py-12">
                        <h1 className="mb-7 text-xl font-semibold tracking-[-0.03em]">
                            Log in to Replit
                        </h1>

                        <div className="space-y-2.5">
                            <button
                                type="button"
                                className="flex h-10 w-full items-center rounded-lg border border-[#DCD9D5] bg-[#FFFEFC] px-3.5 text-left text-[15px] transition hover:bg-white"
                            >
                                <svg
                                    className="mr-3 h-5 w-5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
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
                                Continue with Google
                            </button>

                            <button
                                type="button"
                                className="flex h-10 w-full items-center rounded-lg border border-[#DCD9D5] bg-[#FFFEFC] px-3.5 text-left text-[15px] transition hover:bg-white"
                            >
                                <svg
                                    className="mr-3 h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                                    />
                                </svg>
                                Continue with GitHub
                            </button>

                            <button
                                type="button"
                                className="flex h-10 w-full items-center rounded-lg border border-[#DCD9D5] bg-[#FFFEFC] px-3.5 text-left text-[15px] transition hover:bg-white"
                            >
                                <svg
                                    className="mr-3 h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.09.8 1.2-.24 2.35-.93 3.63-.84 1.54.12 2.7.73 3.46 1.84-3.18 1.9-2.43 6.09.49 7.25-.58 1.53-1.34 3.05-2.67 3.92ZM12.03 7.25C11.88 4.97 13.73 3.1 15.84 3c.29 2.63-2.38 4.6-3.81 4.25Z" />
                                </svg>
                                Continue with Apple
                            </button>
                        </div>

                        <div className="my-5 flex items-center gap-3">
                            <div className="h-px flex-1 bg-[#D9D5D0]" />
                            <span className="text-[13px] text-[#767270]">or</span>
                            <div className="h-px flex-1 bg-[#D9D5D0]" />
                        </div>

                        <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                            <label className="block">
                                <span className="mb-1.5 block text-[13px] text-[#625F5B]">
                                    Email
                                </span>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 text-[#9B9792]" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="h-10 w-full rounded-lg border border-[#DCD9D5] bg-[#FFFEFC] px-3 text-[13px] outline-none transition placeholder:text-[#8E8984] focus:border-[#A7A19A]"
                                    />
                                </div>
                            </label>

                            <label className="block">
                                <span className="mb-1.5 block text-[13px] text-[#625F5B]">
                                    Password
                                </span>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••"
                                        className="h-10 w-full rounded-lg border border-[#DCD9D5] bg-[#FFFEFC] px-3 pr-12 text-[13px] outline-none transition placeholder:text-[#8E8984] focus:border-[#A7A19A]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#767270] bg-transparent"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </label>

                            <div className="flex justify-end">
                                <a
                                    href="#"
                                    className="text-[12px] text-[#767270] hover:text-[#F04A00]"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="h-10 w-full rounded-full bg-[#F54A00] text-[14px] font-semibold text-white transition hover:bg-[#E74400]"
                            >
                                Log in
                            </button>
                        </form>

                        <p className="mt-5 text-center text-[13px] text-[#767270]">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="font-medium text-[#F04A00] hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>

                    {/* Bottom agreement */}
                    <div className="pb-8 text-[12px] leading-5 text-[#767270]">
                        By continuing, you agree to Replit&apos;s{" "}
                        <a href="#" className="underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="underline">Privacy Policy</a>.
                    </div>
                </section>

                <AuthMarketingPanel />
            </div>
        </main>
    );
}

function AuthMarketingPanel() {
    return (
        <aside className="relative hidden min-h-screen overflow-hidden lg:block">
            <div className="absolute inset-0 bg-[#101017]" />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 18% 12%, rgba(135,48,19,0.78) 0%, rgba(75,28,20,0.58) 26%, rgba(20,20,30,0) 58%), radial-gradient(circle at 82% 78%, rgba(43,42,100,0.72) 0%, rgba(19,19,31,0) 58%)",
                }}
            />

            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
                    backgroundSize: "54px 54px",
                }}
            />

            <div className="absolute bottom-14.5 left-13.5 max-w-152.5">
                <span className="mb-8 inline-flex rounded-full border border-[#3A3C4B] bg-[#191B25]/70 px-3 py-1.5 text-[10px] text-[#A9B0C5]">
                    Trusted by 50M+ creators
                </span>

                <h2 className="max-w-155 text-[27px] font-medium leading-[1.3] tracking-[-0.035em] text-[#FAF7F2]">
                    Build and deploy software collaboratively with the power of AI,
                    without spending a second on setup.
                </h2>

                <p className="mt-5 text-[11px] text-[#A6A5AF]">— Rivinity</p>
            </div>
        </aside>
    );
}