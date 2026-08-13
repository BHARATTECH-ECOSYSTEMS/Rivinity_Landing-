# Rivinity Landing Page

A modern, high-performance marketing landing page built with Next.js 15 and React 19. Features a fully responsive design with smooth animations, multiple conversion funnels (pricing, signup, contact), and a comprehensive information architecture including about, careers, security, and policy pages.

## Key Features

- 🚀 **High Performance** — Next.js with built-in optimization, fast page loads
- ✨ **Smooth Animations** — Framer Motion animations for engaging interactions
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS
- 🎨 **Modern UI** — Component-based architecture with reusable sections
- 🔒 **Professional Pages** — Security, privacy, terms, and career sections
- 💰 **Pricing & Conversion** — Pricing table, signup, and contact pages
- 🎯 **SEO Ready** — Next.js SEO optimization support

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
- `careers.tsx` — Careers and job opportunities page
- `certificate.tsx` — Certificate or credentials display page
- `contact.tsx` — Contact form and communication page
- `login.tsx` — User login page
- `pricing.tsx` — Pricing plans and tiers page
- `privacy.tsx` — Privacy policy page
- `security.tsx` — Security information and compliance page
- `signup.tsx` — User registration page
- `terms.tsx` — Terms of service page
- `global.css` — Tailwind imports and global styles

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
- `infinite-slider.tsx` — Infinite scrolling carousel

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
| `/careers` | Job openings and career opportunities |
| `/pricing` | Pricing plans and feature comparison |
| `/contact` | Contact form and inquiry page |
| `/signup` | User registration and onboarding |
| `/login` | User authentication |
| `/certificate` | Credentials or certification information |
| `/security` | Security standards and compliance details |
| `/privacy` | Privacy policy and data handling |
| `/terms` | Terms of service and legal agreements |

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
