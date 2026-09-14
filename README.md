# Rivinity

Rivinity is a modern Next.js marketing and product website for an AI application-building platform. The platform presents an AI infrastructure and workspace layer designed for generating, orchestrating, and deploying intelligent applications with autonomous agents, collaborative canvas tools, and instant edge deployment.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router architecture)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS & custom CSS variable design tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Motion](https://motion.dev/)
- **Shaders & Effects**: [@paper-design/shaders-react](https://www.npmjs.com/package/@paper-design/shaders-react)
- **Primitives & UI**: [Radix UI](https://www.radix-ui.com/) (`NavigationMenu`, `Slot`), [Lucide React](https://lucide.dev/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Inter`, `JetBrains Mono`, `Fraunces`)
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
├── app/                                 # Next.js App Router root
│   ├── (routes)/                        # 26+ page routes (about, blog, docs, pricing, etc.)
│   ├── globals.css                      # Tailwind v4 theme, font definitions, and CSS variables
│   ├── layout.tsx                       # Root layout with fonts, metadata, OpenGraph, and AuthProvider
│   ├── not-found.tsx                    # Custom 404 page
│   └── page.tsx                         # Main homepage assembling landing sections
├── components/                          # UI components and layout building blocks
│   ├── assets/                          # Component-specific media assets
│   ├── auth/                            # Authentication context and modal system
│   │   ├── auth-context.tsx             # Auth state provider and hook (`useAuthModal`)
│   │   └── auth-modal.tsx               # Unified login/signup modal and standalone page card
│   ├── layout/                          # Site navigation and shell
│   │   ├── header.tsx                   # Sticky responsive navigation bar with mega menu
│   │   └── footer.tsx                   # Site-wide footer with links & newsletter
│   ├── sections/                        # Modular landing page sections
│   │   ├── bentofeatures.tsx            # Bento feature grid wrapper
│   │   ├── cta-section.tsx              # Conversion CTA block
│   │   ├── faq-section.tsx              # Interactive accordion FAQ
│   │   ├── how-it-works.tsx             # Step-by-step interactive workflow
│   │   ├── powered-by-rivinity.tsx      # Platform capabilities breakdown
│   │   ├── problem-statement.tsx        # Visual problem/solution contrast
│   │   └── testimonials-section.tsx     # Social proof & customer reviews
│   ├── ui/                              # Reusable UI primitives
│   │   ├── bento.tsx                    # Bento grid card components
│   │   ├── interactive-pixel-background.tsx # Atmospheric diffused glass background
│   │   └── ScrollReveal.tsx             # Viewport reveal animation component
│   ├── ArrowButton.tsx                  # Animated CTA arrow button
│   ├── GlassAssistant.tsx               # Glassmorphic interactive AI assistant widget
│   ├── Hero.tsx                         # Hero section with interactive visuals & badges
│   ├── Magnetic.tsx                     # Cursor attraction wrapper
│   ├── Reveal.tsx                       # Scroll-triggered reveal effect
│   └── logoslide.tsx                    # Infinite logo marquee slider
├── lib/                                 # Shared utilities
│   └── utils.ts                         # Class merging utility (`cn`)
├── public/                              # Static public assets
│   ├── images/                          # Product illustrations & `auth-bg.png`
│   ├── logos/                           # Integration and partner SVG logos
│   └── *.png                            # Brand logos, favicons, and banners
├── types/                               # TypeScript declarations & shared interfaces
│   └── index.ts                         # Navigation, team, FAQ, and testimonial types
├── next.config.js                       # Next.js configuration (images, compiler)
├── tailwind.config.js                   # Tailwind theme & color extensions
└── tsconfig.json                        # TypeScript path aliases & compiler settings
```

---

## Routes & Pages

All pages are located under the `app/` directory:

| Route | File Path | Description |
| :--- | :--- | :--- |
| `/` | `app/page.tsx` | Main Rivinity homepage with interactive bento sections and platform showcase |
| `/about` | `app/about/page.tsx` | About company, mission, leadership, and values |
| `/academy` | `app/academy/page.tsx` | Learning resources, certifications, and AI developer curriculum |
| `/apireference` | `app/apireference/page.tsx` | Developer API reference and client endpoints |
| `/blog` | `app/blog/page.tsx` | Engineering blog with custom procedural wireframe graphics and brand `#ff8b28` accents |
| `/careers` | `app/careers/page.tsx` | Career opportunities, interactive principles, and role application flow |
| `/certificate` | `app/certificate/page.tsx` | Certification verification portal |
| `/changelog` | `app/changelog/page.tsx` | Product changelog and chronological release notes |
| `/compliance` | `app/compliance/page.tsx` | Regulatory, HIPAA, GDPR, and enterprise compliance certifications |
| `/contact` | `app/contact/page.tsx` | Contact, support inquiries, and sales consultation |
| `/cybersecurity` | `app/cybersecurity/page.tsx` | Cybersecurity architecture, threat detection, and zero-trust controls |
| `/developer` | `app/developer/page.tsx` | Developer portal, SDKs, and code quickstarts |
| `/docs` | `app/docs/page.tsx` | Comprehensive product documentation and integration guides |
| `/education` | `app/education/page.tsx` | Higher education solutions, campus AI labs, and academic grants |
| `/enterprise` | `app/enterprise/page.tsx` | Enterprise-grade AI solutions, dedicated infrastructure, and SLA tiers |
| `/governance` | `app/governance/page.tsx` | AI governance, ethical guardrails, and transparency frameworks |
| `/government` | `app/government/page.tsx` | Sovereign AI, air-gapped deployments, and public sector compliance |
| `/integration` | `app/integration/page.tsx` | Ecosystem connectors and third-party workflow integrations |
| `/login` | `app/login/page.tsx` | Standalone sign-in page with atmospheric background |
| `/papers` | `app/papers/page.tsx` | Peer-reviewed research papers and technical whitepapers |
| `/pricing` | `app/pricing/page.tsx` | Subscription tiers, billing calculator, and feature comparison matrix |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy and data handling practices |
| `/research` | `app/research/page.tsx` | AI research mission, technical grid blueprint cards, and publication archive |
| `/security` | `app/security/page.tsx` | Security architecture and trust center |
| `/signup` | `app/signup/page.tsx` | Standalone registration page with unified auth context |
| `/status` | `app/status/page.tsx` | Real-time platform status, incident history, and uptime metrics |
| `/team` | `app/team/page.tsx` | Team members and leadership directory |
| `/terms` | `app/terms/page.tsx` | Terms of service and usage policies |
| `404` | `app/not-found.tsx` | Custom 404 Not Found error page |

---

## Configuration & Architecture

- **Path Aliases**: The `@/*` path alias is mapped to the workspace root in [tsconfig.json](file:///Users/hardik/Downloads/BharatTech/main%20rep/tsconfig.json) (e.g., `@/components/...`, `@/lib/...`).
- **SEO & Social Metadata**: [app/layout.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/app/layout.tsx) configures comprehensive SEO metadata, including `metadataBase` (`https://rivinity.ai`), OpenGraph cards, Twitter preview cards, keywords, and favicon icons.
- **Brand Identity & Color Tokens**: Tailored brand primary `#ff8b28` accents paired with clean monochrome slate/zinc palettes, dark borders, and responsive hover feedback.
- **Enhanced Header Navigation**: [components/layout/header.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/components/layout/header.tsx) features an expanded Platform mega menu with Core Products (including coming soon badges for Rivinity Cloud and Supernova), categorized solution columns (`BUILD`, `AUTOMATE`, `CREATE`, `UNDERSTAND`, `GOVERN`) with bold visual hierarchy, and smooth accordion controls on mobile.
- **Unified CTA Button System**: Standardized primary conversion buttons across all sub-pages (API Reference, Security, Compliance, Developer) with high-contrast pill styling, hover micro-interactions, and angled directional arrows.
- **Procedural Geometric Illustration System**: Dynamic, zero-raster geometric shapes and atmospheric accents across Security, Blog, and Research sections.
- **Typography & Font Optimization**: Managed via `next/font/google` for `--font-body` (`Inter`), `--font-mono` (`JetBrains Mono`), and serif accents (`Fraunces`).
- **Unified Authentication Architecture**: [components/auth/auth-modal.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/components/auth/auth-modal.tsx) consolidates login, signup, and password reset flows with built-in client rate limiting, input sanitization, and dual usage (overlay modal triggered by `useAuthModal()` or full-page embedded card).
- **Atmospheric Backgrounds**: [components/ui/interactive-pixel-background.tsx](file:///Users/hardik/Downloads/BharatTech/main%20rep/components/ui/interactive-pixel-background.tsx) renders ambient glass diffusion and high-resolution background art for auth views.
- **Styling System**: Tailwind CSS 4 is loaded in [app/globals.css](file:///Users/hardik/Downloads/BharatTech/main%20rep/app/globals.css) with design system variables extending [tailwind.config.js](file:///Users/hardik/Downloads/BharatTech/main%20rep/tailwind.config.js).
- **Image Optimization**: Configured in [next.config.js](file:///Users/hardik/Downloads/BharatTech/main%20rep/next.config.js) with `remotePatterns` for external image providers and automatic AVIF/WebP conversion.

---

## License

Provided as-is for development and demo purposes.
