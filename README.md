# Rivinity Landing Page

A modern marketing landing page built with Next.js, React, Tailwind CSS, and Framer Motion. The project includes a responsive homepage layout with navigation, hero section, logo carousel, agency showcase, testimonials, pricing cards, and a polished footer.

## Features

- Next.js 15 app with `pages/index.tsx`
- Tailwind CSS 4 for utility-first styling
- Responsive header with dropdown navigation
- Animated sections using `framer-motion`
- Custom hero, logo slide, meet agent, testimonials, and pricing components
- Accessible and mobile-friendly layout
- Production-ready build scripts

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React icons
- clsx
- tailwind-merge

## Project Structure

- `pages/` - Application routes and page entry points
  - `pages/index.tsx` - Main landing page
- `components/` - Reusable UI sections and page components
  - `header.tsx` - Site navigation and mobile menu
  - `footer.tsx` - Footer layout with links and branding
  - `herosection.tsx` - Hero content block
  - `logoslide.tsx` - Logo carousel section
  - `meetagent.tsx` - Agent/product highlight section
  - `poweredby.tsx` - Partner or brand section
  - `testimonials-component.tsx` - Testimonials showcase
  - `pricing.tsx` - Pricing cards section
- `public/` - Static assets and image files
- `styles/` or `global.css` - Global styling and Tailwind imports

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to preview the site.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Lint the project

```bash
npm run lint
```

## Notes

- The site is configured as a private package with the `name` set to `untitled` in `package.json`.
- The homepage is assembled from modular React components under `components/`.
- Some dependencies such as `react-router-dom` are included in `package.json` even though the current landing page uses Next.js routing.

## Customize

- Modify `pages/index.tsx` to change page composition and section order.
- Update component content in `components/` to change copy, images, or layout.
- Tailwind configuration is managed by `tailwind.config.js` and `postcss.config.js`.

## License

This project is provided as-is for development and demonstration purposes.
