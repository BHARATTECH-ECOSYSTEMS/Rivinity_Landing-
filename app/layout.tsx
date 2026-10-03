import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-context";
import { SidebarProvider } from "@/components/canvas/useSidebarState";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://lighthearted-donut-ea2217.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Rivinity | The AI Infrastructure Layer for Engineering Teams",
    template: "%s | Rivinity",
  },
  description:
    "One orchestration platform. Every major model. Sub-50ms routing. Deploy autonomous AI agents in minutes, not weeks.",
  keywords: [
    "AI infrastructure",
    "LLM orchestration",
    "model routing",
    "persistent memory",
    "autonomous agents",
    "enterprise AI",
    "developer tools",
  ],
  authors: [{ name: "Rivinity Engineering" }],
  creator: "Rivinity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: "Rivinity | The AI Infrastructure Layer for Engineering Teams",
    description:
      "One orchestration platform. Every major model. Sub-50ms routing. Deploy autonomous AI agents in minutes.",
    siteName: "Rivinity",
    images: [
      {
        url: "/rivinity_logo_cropped.png",
        width: 1200,
        height: 630,
        alt: "Rivinity AI Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivinity | The AI Infrastructure Layer for Engineering Teams",
    description:
      "One orchestration platform. Every major model. Sub-50ms routing. Deploy autonomous AI agents in minutes.",
    creator: "@rivinity",
    images: ["/rivinity_logo_cropped.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

// FIX-14: Remove minimumScale: 1 to restore mobile pinch-to-zoom (WCAG 1.4.4)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname;var isDash=p!=='/'&&(/^(?:\\/dashboard|\\/chat|\\/app|\\/knowledge-base|\\/marketplace|\\/history|\\/agent-playground|\\/agents|\\/rivinity-lm|\\/image-generation|\\/audio-lab|\\/app-builder|\\/prompt-to-video|\\/analytics|\\/plans-and-credits|\\/team|\\/settings|\\/login|\\/signup)(?:\\/|$)/.test(p));if(isDash){var t=localStorage.getItem('rivinity_theme')||'dark';var isDark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(isDark){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}else{document.documentElement.classList.remove('dark');}var s=localStorage.getItem('rivinity_sidebar_open');var closed=window.innerWidth<768||s==='false';if(closed){document.documentElement.setAttribute('data-sidebar-closed','');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <SidebarProvider>
              {/* FIX-09: motion reducedMotion integration */}
              <MotionConfig reducedMotion="user">
                {children}
              </MotionConfig>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
