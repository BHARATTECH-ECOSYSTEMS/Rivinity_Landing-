export const siteConfig = {
  name: "Rivinity",
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://lighthearted-donut-ea2217.netlify.app",
  description: "The AI infrastructure layer for engineering teams.",
  // PLACEHOLDER — replace before launch (audit section H):
  supportEmail: "support@rivinity.com",
  social: {
    x: "https://twitter.com/rivinity",
    github: "https://github.com/rivinity",
    linkedin: "https://linkedin.com/company/rivinity",
  },
} as const;
