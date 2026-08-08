# Rivinity Landing Page

A modern marketing landing page built with Next.js, React, Tailwind CSS, and Framer Motion. The site is composed from small, reusable React/TypeScript components and is configured for local development and production builds.

## Quick Overview

- Framework: Next.js 15 + React 19
- Styling: Tailwind CSS 4 (configured in `tailwind.config.js`)
- Animations: Framer Motion
- Language: TypeScript

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

- `pages/`
  - `_app.tsx` — App wrapper
  - `index.tsx` — Main landing page composition
  - `global.css` — Tailwind imports and global styles
- `components/` — Page sections and reusable UI pieces
  - `benchmark.tsx`
  - `column4.tsx`
  - `cta-section.tsx`
  - `faq-section.tsx`
  - `footer.tsx`
  - `header.tsx`
  - `herosection.tsx`
  - `logoslide.tsx`
  - `poweredby.tsx`
  - `pricing.tsx`
  - `research-section.tsx`
  - `testimonials-section.tsx`
  - `ui/` — small UI helpers
    - `DotMatrixIcon.tsx`
    - `infinite-slider.tsx`
- `public/` — Static assets (images, favicons, etc.)
- `next.config.js`, `tsconfig.json`, `postcss.config.js`, `tailwind.config.js`

## Notable dependencies

- `framer-motion` — animations
- `lucide-react` — icons
- `clsx` — conditional classNames
- `tailwind-merge` — merge Tailwind class lists
- `react-router-dom` — included in `package.json` but Next.js routing is used for the landing page

## Development notes

- Modify the page composition in `pages/index.tsx` to change which components appear and in what order.
- Edit component files in `components/` to update copy, layout, or images.
- Tailwind utility configuration lives in `tailwind.config.js` and can be adjusted for colors, breakpoints, and plugins.

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
