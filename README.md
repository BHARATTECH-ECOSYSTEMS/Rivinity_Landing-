# Rivinity

Rivinity is a Next.js marketing and product site for an AI application-building platform. The homepage presents an AI workspace for generating, integrating, and deploying applications, supported by animated workflows, model integrations, research content, and trust-focused pages.

## Tech stack

- Next.js 15 with the Pages Router
- React 19 and TypeScript
- Tailwind CSS 4 with PostCSS
- Framer Motion and Motion for animation
- Paper Design shaders for visual effects
- Lucide React and React Icons
- Embla Carousel and React Use Measure
- `clsx` and `tailwind-merge` for class utilities

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. Next.js will reload the page as files change.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the configured Next.js lint command |

## Routes

Next.js maps each file in `pages/` to a route. The current site includes:

| Route | Page |
| --- | --- |
| `/` | Main Rivinity landing page |
| `/about` | About Rivinity |
| `/academy` | Academy and learning content |
| `/advertise` | Advertising information |
| `/apireference` | API reference |
| `/blog` | Blog and articles |
| `/careers` | Careers |
| `/certificate` | Certificates |
| `/changelog` | Product changelog |
| `/compliance` | Compliance information |
| `/contact` | Contact page |
| `/cybersecurity` | Cybersecurity information |
| `/developer` | Developer resources |
| `/docs` | Documentation |
| `/enterprise` | Enterprise offering |
| `/governance` | Governance information |
| `/integration` | Integrations |
| `/login` | Login |
| `/papers` | Research papers |
| `/pricing` | Pricing |
| `/privacy` | Privacy policy |
| `/research` | Research and innovation |
| `/security` | Security and trust |
| `/signup` | Account registration |
| `/status` | Service status |
| `/team` | Team information |
| `/terms` | Terms of service |

## Project structure

```text
components/       Shared site components and UI helpers
lib/              Shared utilities
pages/            Pages Router routes and global styles
public/            Static assets
next.config.js     Next.js image and runtime configuration
tailwind.config.js Tailwind theme configuration
tsconfig.json      TypeScript compiler configuration
```

### Key files

- `pages/index.tsx` composes the shared header and footer around the homepage.
- `pages/homepage.tsx` contains the main interactive landing-page sections.
- `pages/_app.tsx` loads global styles and site-wide metadata.
- `components/header.tsx` and `components/footer.tsx` provide the shared site shell.
- `components/ui/` contains reusable visual components such as `HeroWorkflow`, `ScrollReveal`, and the logo slider.
- `lib/utils.ts` contains shared class-name utilities.

## Configuration notes

- The `@/*` TypeScript path alias points to the repository root.
- Remote images are configured in `next.config.js` and are optimized as AVIF or WebP where supported.
- Tailwind scans files under `pages/` and `components/`.

## License

Provided as-is for development and demo purposes.
