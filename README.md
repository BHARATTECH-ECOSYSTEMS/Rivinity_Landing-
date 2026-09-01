# Rivinity

Rivinity is a modern Next.js marketing and product website for an AI application-building platform. The platform presents an AI workspace designed for generating, orchestrating, and deploying intelligent applications with autonomous agents, collaborative canvas tools, and instant edge deployment.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router architecture)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS & custom CSS variable tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Motion](https://motion.dev/)
- **Shaders & Effects**: [@paper-design/shaders-react](https://www.npmjs.com/package/@paper-design/shaders-react)
- **Primitives & UI**: [Radix UI](https://www.radix-ui.com/) (`NavigationMenu`, `Slot`), [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority`, `react-use-measure`

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or newer
- **Package Manager**: `npm` (or `pnpm` / `yarn` / `bun`)

### Setup & Run

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "main rep"
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on `http://localhost:3000` |
| `npm run build` | Builds the production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to identify and report syntax/style issues |

---

## Project Structure

```text
├── app/                        # Next.js App Router root
│   ├── (routes)/               # 26+ page routes (about, blog, docs, pricing, etc.)
│   ├── globals.css             # Tailwind v4 theme, font definitions, and CSS variables
│   ├── layout.tsx              # Root layout with fonts, metadata, and AuthProvider
│   ├── not-found.tsx           # Custom 404 page
│   └── page.tsx                # Main homepage assembling landing sections
├── components/                 # UI components and layout building blocks
│   ├── assets/                 # Component-specific media assets
│   ├── auth/                   # Authentication context and sliding cards
│   │   ├── auth-context.tsx    # Auth state management
│   │   └── sliding-auth-card.tsx
│   ├── layout/                 # Site navigation and shell
│   │   ├── header.tsx          # Sticky responsive navigation bar with mega menu
│   │   └── footer.tsx          # Site-wide footer with links & newsletter
│   ├── sections/               # Modular landing page sections
│   │   ├── bentofeatures.tsx   # Bento feature grid wrapper
│   │   ├── cta-section.tsx     # Conversion CTA block
│   │   ├── faq-section.tsx     # Interactive accordion FAQ
│   │   ├── how-it-works.tsx    # Step-by-step interactive workflow
│   │   ├── powered-by-rivinity.tsx # Platform capabilities breakdown
│   │   ├── problem-statement.tsx # Visual problem/solution contrast
│   │   └── testimonials-section.tsx # Social proof & customer reviews
│   ├── ui/                     # Reusable UI primitives
│   │   ├── auth-switch.tsx     # Toggleable login/signup modal
│   │   ├── bento.tsx           # Bento grid card components
│   │   └── ScrollReveal.tsx    # Viewport reveal animation component
│   ├── ArrowButton.tsx         # Animated CTA arrow button
│   ├── GlassAssistant.tsx      # Glassmorphic interactive AI assistant widget
│   ├── Hero.tsx                # Hero section with interactive visuals & badges
│   ├── Magnetic.tsx            # Cursor attraction wrapper
│   ├── Reveal.tsx              # Scroll-triggered reveal effect
│   └── logoslide.tsx           # Infinite logo marquee slider
├── lib/                        # Shared utilities
│   └── utils.ts                # Class merging utility (`cn`)
├── public/                     # Static public assets
│   ├── images/                 # Product and enterprise illustrations
│   ├── logos/                  # Integration and partner SVG logos
│   └── *.png                   # Brand logos and banners
├── types/                      # TypeScript declarations & shared interfaces
│   └── index.ts                # Navigation, team, FAQ, and testimonial types
├── next.config.js              # Next.js configuration (images, compiler)
├── tailwind.config.js          # Tailwind theme & color extensions
└── tsconfig.json               # TypeScript path aliases & compiler settings
```

---

## Routes & Pages

All pages are located under the `app/` directory:

| Route | File Path | Description |
| :--- | :--- | :--- |
| `/` | `app/page.tsx` | Main Rivinity homepage |
| `/about` | `app/about/page.tsx` | About company and mission |
| `/academy` | `app/academy/page.tsx` | Learning resources and tutorials |
| `/advertise` | `app/advertise/page.tsx` | Partnership and advertising info |
| `/apireference` | `app/apireference/page.tsx` | Developer API reference |
| `/blog` | `app/blog/page.tsx` | Company news and engineering blog |
| `/careers` | `app/careers/page.tsx` | Open roles and culture |
| `/certificate` | `app/certificate/page.tsx` | Certification verification |
| `/changelog` | `app/changelog/page.tsx` | Product changelog and release notes |
| `/compliance` | `app/compliance/page.tsx` | Regulatory and compliance certifications |
| `/contact` | `app/contact/page.tsx` | Contact and support channels |
| `/cybersecurity` | `app/cybersecurity/page.tsx` | Cybersecurity architecture & practices |
| `/developer` | `app/developer/page.tsx` | Developer portal and SDKs |
| `/docs` | `app/docs/page.tsx` | Comprehensive product documentation |
| `/enterprise` | `app/enterprise/page.tsx` | Enterprise-grade AI solutions |
| `/governance` | `app/governance/page.tsx` | AI governance & ethical frameworks |
| `/integration` | `app/integration/page.tsx` | Ecosystem and third-party integrations |
| `/login` | `app/login/page.tsx` | Authentication login page |
| `/papers` | `app/papers/page.tsx` | Research papers and technical whitepapers |
| `/pricing` | `app/pricing/page.tsx` | Subscription tiers and feature comparison |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy and data handling |
| `/research` | `app/research/page.tsx` | AI research and innovation initiatives |
| `/security` | `app/security/page.tsx` | Security architecture and trust center |
| `/signup` | `app/signup/page.tsx` | Account registration |
| `/status` | `app/status/page.tsx` | Real-time platform status and uptime |
| `/team` | `app/team/page.tsx` | Team members and leadership |
| `/terms` | `app/terms/page.tsx` | Terms of service |
| `404` | `app/not-found.tsx` | Custom 404 Not Found error page |

---

## Configuration & Architecture

- **Path Aliases**: The `@/*` path alias is mapped to the workspace root in [tsconfig.json](file:///Users/hardik/Downloads/BharatTech/main%20rep/tsconfig.json) (e.g. `@/components/...`, `@/lib/...`).
- **Typography & Font Optimization**: Fonts are loaded in [app/layout.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/app/layout.tsx) via `next/font/google` using `--font-body` (`Inter`) and `--font-mono` (`JetBrains Mono`).
- **Styling System**: Tailwind CSS 4 is imported in [app/globals.css](file:///Users/hardik/Downloads/BharatTech/main%20rep/app/globals.css) with a centralized design system token set for colors, borders, and animations, extending [tailwind.config.js](file:///Users/hardik/Downloads/BharatTech/main%20rep/tailwind.config.js).
- **Image Optimization**: [next.config.js](file:///Users/hardik/Downloads/BharatTech/main%20rep/next.config.js) is configured with `remotePatterns` (allowing all HTTPS domains) and AVIF/WebP next-gen format support.
- **Global Authentication Context**: Wrapped in [app/layout.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/app/layout.tsx) via `AuthProvider` from [components/auth/auth-context.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/components/auth/auth-context.tsx).

---

## License

Provided as-is for development and demo purposes.
