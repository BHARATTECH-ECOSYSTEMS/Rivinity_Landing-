import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-context";
import { SidebarProvider } from "@/components/canvas/useSidebarState";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rivinity.ai"),
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
    url: "https://rivinity.ai",
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
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
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
            __html: `(function(){try{var s=localStorage.getItem('rivinity_sidebar_open');var closed=window.innerWidth<768||s==='false';if(closed){document.documentElement.setAttribute('data-sidebar-closed','');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
