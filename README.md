# Rivinity Website

A Next.js 15 website for Rivinity, built with React 19 and TypeScript. The project includes a marketing landing page, product and research pages, authentication screens, contact and pricing flows, and legal and compliance content.

## Key Features

- Next.js pages for the landing page, product information, research, documentation, and company content
- Reusable landing-page and research-section components
- Framer Motion animations and carousel components
- Responsive styling with Tailwind CSS and global CSS
- Authentication, pricing, contact, and compliance-related pages

## Tech Stack

- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons**: Lucide React
- **Dev Tools**: ESLint, PostCSS

## Prerequisites

- Node.js 18+ and npm

## Install

```bash
npm install
```

## Available scripts

- `npm run dev` — Starts the Next.js development server (localhost:3000)
- `npm run build` — Builds the production bundle
- `npm run start` — Runs the production server after build
- `npm run lint` — Runs Next.js/ESLint checks

## Project Structure

### Pages (`pages/`)
- `_app.tsx` — Application wrapper and global configuration
- `index.tsx` — Main landing page with hero, features, and CTA sections
- `about.tsx` — About page with company information
- `apitest.tsx` — API testing and integration page
- `blog.tsx` — Blog and articles page
- `carrers.tsx` — Careers and job opportunities page (the filename is intentionally spelled `carrers`)
- `certificate.tsx` — Certificate or credentials display page
- `Compliance.tsx` — Compliance standards and regulations page
- `contact.tsx` — Contact form and communication page
- `documentation.tsx` — Product documentation and guides page
- `login.tsx` — User login page
- `pricing.tsx` — Pricing plans and tiers page
- `privacy.tsx` — Privacy policy page
- `research.tsx` — Research findings and case studies page
- `security.tsx` — Security information and compliance details page
- `signup.tsx` — User registration page
- `terms.tsx` — Terms of service page
- `global.css` — Global styles and Tailwind/PostCSS styles; this is not a route

### Components (`components/`)
**Landing Page Sections:**
- `herosection.tsx` — Hero section with headline and CTA
- `benchmark.tsx` — Performance/benchmark showcase
- `column4.tsx` — Four-column feature grid
- `cta-section.tsx` — Call-to-action section
- `faq-section.tsx` — Frequently asked questions
- `footer.tsx` — Footer with links and information
- `header.tsx` — Navigation header
- `logoslide.tsx` — Logo carousel/slider
- `poweredby.tsx` — "Powered by" partners section
- `pricing.tsx` — Pricing comparison table
- `research-section.tsx` — Research findings/statistics section
- `testimonials-section.tsx` — Customer testimonials carousel

**UI Components (`ui/`):**
- `DotMatrixIcon.tsx` — Dot matrix visual effect component
- `HeroWorkflow.tsx` — Hero workflow visualization component
- `ScrollReveal.tsx` — Scroll reveal animation component
- `infinite-slider.tsx` — Infinite scrolling carousel component

**Research Components (`ui/research/`):**
- `animated-service-card.tsx` — Animated service card component with interactive effects
- `bento.tsx` — Bento grid layout component for feature showcase
- `marquee.tsx` — Marquee scrolling text and content component
- `open.tsx` — Supporting research UI component
- `ProcessSection.tsx` — Process section display component for workflow visualization

### Utilities (`lib/`)
- `utils.ts` — Shared utility functions used by components

### Configuration Files
- `next.config.js` — Next.js configuration
- `tsconfig.json` — TypeScript configuration
- `postcss.config.js` — PostCSS configuration
- `tailwind.config.js` — Tailwind CSS customization
- `public/` — Static assets (images, favicons, etc.)

## Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero, features, testimonials, and CTA |
| `/about` | Company information and mission |
| `/carrers` | Job openings and career opportunities |
| `/pricing` | Pricing plans and feature comparison |
| `/contact` | Contact form and inquiry page |
| `/signup` | User registration and onboarding |
| `/login` | User authentication |
| `/certificate` | Credentials or certification information |
| `/security` | Security standards and compliance details |
| `/privacy` | Privacy policy and data handling |
| `/terms` | Terms of service and legal agreements |
| `/blog` | Blog posts and articles |
| `/research` | Research findings and case studies |
| `/documentation` | Product documentation and guides |
| `/Compliance` | Compliance standards and regulations |
| `/apitest` | API testing and integration documentation |

## Notable Dependencies

- **framer-motion** — Smooth animations and interactive transitions for components
- **lucide-react** — Comprehensive icon library for UI elements
- **clsx** — Utility for conditional CSS class composition
- **tailwind-merge** — Intelligently merge Tailwind CSS class lists without conflicts
- **react-use-measure** — React hook for measuring DOM element dimensions
- **next** — React framework with built-in optimization and routing

## Development Notes

### Customizing the Site
- **Landing Page Composition**: Modify `pages/index.tsx` to change component order and visibility
- **Component Content**: Edit individual component files in `components/` to update copy, layout, images, and styles
- **Global Styles**: Add custom styles in `pages/global.css` alongside Tailwind utilities
- **Theme Configuration**: Adjust colors, fonts, and breakpoints in `tailwind.config.js`
- **Animations**: Framer Motion animation properties can be customized in individual components

### File Organization Tips
- Page-level components (full-screen sections) go in `pages/`
- Reusable sections and components go in `components/`
- Small utility or visual components go in `components/ui/`
- Keep component files focused and single-responsibility

## Building & Deploying

1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Start production server: `npm run start`

Deploy the `.next` build output using any Node-compatible hosting (Vercel, Netlify with adapters, or a custom Node server).

## Suggested next steps

- Run `npm run dev` and open http://localhost:3000 to preview locally.
- Review `components/` to adapt sections and content for your brand.

## License

Provided as-is for development and demonstration purposes.
