/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    // Keep errors/warns in production logs; strip only log/debug/info.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  images: {
    // Never allow arbitrary remote hosts. Add hosts here only when needed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    // Canonicalize duplicated routes (old URLs keep working, SEO juice consolidates).
    return [
      { source: "/appbuilder", destination: "/app-builder", permanent: true },
      { source: "/audiolab", destination: "/audio-lab", permanent: true },
      { source: "/imageenhancer", destination: "/image-generation", permanent: true },
      { source: "/image-enhancer", destination: "/image-generation", permanent: true },
      { source: "/imagegeneration", destination: "/image-generation", permanent: true },
      { source: "/knowledgebase", destination: "/knowledge-base", permanent: true },
      { source: "/rivinitylm", destination: "/rivinity-lm", permanent: true },
    ];
  },
};

module.exports = nextConfig;