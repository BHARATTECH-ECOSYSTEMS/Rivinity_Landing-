# Rivinity Website

A Next.js marketing website for Rivinity, built with React 19 and TypeScript. The app includes a polished landing page, research and security pages, authentication flows, pricing, documentation, contact, and legal/compliance sections.

## Recent updates

The project has been stabilized and modernized with the following changes:

- Rebuilt the homepage as a valid React/Next component
- Restored missing shared UI pieces such as the logo marquee and CTA section
- Fixed the TypeScript alias setup required by the shared utility import pattern
- Updated the home route to use the corrected component tree
- Verified the application builds successfully in production mode

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- clsx + tailwind-merge

## Prerequisites

- Node.js 18+
- npm

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

### Pages

- `pages/index.tsx` — homepage entry route
- `pages/homepage.tsx` — alternate/expanded landing-page implementation
- `pages/about.tsx` — company/about page
- `pages/contact.tsx` — contact page
- `pages/research.tsx` — research/resources page
- `pages/security.tsx` — security and trust page
- `pages/pricing.tsx` — pricing page
- `pages/login.tsx` — login screen
- `pages/signup.tsx` — signup screen
- `pages/documentation.tsx` — documentation page
- `pages/blog.tsx` — blog/news page
- `pages/certificate.tsx` — certificate/credentials page
- `pages/privacy.tsx` — privacy policy
- `pages/terms.tsx` — terms & conditions
- `pages/Compliance.tsx` — compliance page
- `pages/apitest.tsx` — API testing page

### Components

- `components/home.tsx` — active homepage content
- `components/header.tsx` — shared site header/navigation
- `components/footer.tsx` — shared footer
- `components/logoslide.tsx` — scrolling logo marquee
- `components/cta-section.tsx` — call-to-action block
- `components/ui/` — reusable UI primitives and visual helpers
- `components/ui/research/` — research-section UI components

### Utilities and config

- `lib/utils.ts` — shared utility helpers
- `next.config.js` — Next.js config
- `tsconfig.json` — TypeScript config
- `tailwind.config.js` — Tailwind config
- `postcss.config.js` — PostCSS config
- `public/` — static assets

## Current route overview

| Route | Purpose |
| --- | --- |
| `/` | Main landing page |
| `/about` | About the company |
| `/research` | Research and innovation content |
| `/security` | Security and trust overview |
| `/pricing` | Product pricing |
| `/contact` | Contact page |
| `/login` | Login |
| `/signup` | Registration |
| `/documentation` | Docs and product guides |
| `/blog` | Blog and articles |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/Compliance` | Compliance content |
| `/certificate` | Certificate/credentials page |
| `/apitest` | API testing page |

## Build status

This project has been verified with a production build:

```bash
npm run build
```

The build completes successfully with the current codebase.

## Development notes

- `pages/index.tsx` is the entry point for the main home route.
- `components/home.tsx` contains the current marketing homepage layout and copy.
- Shared UI blocks like the logo stripe and CTA section live in `components/` so the pages can reuse them cleanly.
- Styling is primarily handled through utility classes and shared global styling.

## License

Provided as-is for development and demo purposes.
