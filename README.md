# Rivinity

Rivinity is a full-stack AI workspace and marketing platform built with Next.js 15. It combines a rich public-facing marketing site with a fully-featured authenticated product workspace — including an AI canvas/chat interface, analytics dashboard, audio lab, app builder, history view, marketplace, and a Rivinity LM multi-tool suite.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router architecture)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS & custom CSS variable design tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Motion](https://motion.dev/)
- **Shaders & Effects**: [@paper-design/shaders-react](https://www.npmjs.com/package/@paper-design/shaders-react)
- **Primitives & UI**: [Radix UI](https://www.radix-ui.com/) (`Dialog`, `Switch`, `Slider`, `DropdownMenu`, `NavigationMenu`, `Slot`), [Lucide React](https://lucide.dev/), [shadcn/ui](https://ui.shadcn.com/)
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
│   ├── (marketing routes)/              # 26+ public-facing marketing pages
│   ├── analytics/page.tsx               # Analytics dashboard page
│   ├── app/page.tsx                     # App builder inner page
│   ├── chat/                            # Chat routing (inner workspace)
│   ├── dashboard/page.tsx               # Main product dashboard (authenticated)
│   ├── rivinitylm/page.tsx              # Rivinity LM multi-tool suite page
│   ├── globals.css                      # Tailwind v4 theme, fonts, and CSS variables
│   ├── layout.tsx                       # Root layout with fonts, metadata, OpenGraph, AuthProvider
│   ├── not-found.tsx                    # Custom 404 page
│   └── page.tsx                         # Main homepage assembling landing sections
├── components/
│   ├── analytics/
│   │   └── Analytics.tsx                # Analytics dashboard with charts and metrics
│   ├── app-builder/
│   │   ├── AppBuilder.tsx               # App builder shell
│   │   ├── AppBuilderMain.tsx           # Main workbench layout
│   │   └── BuilderWorkbench.tsx         # Code editor & preview panel
│   ├── audio-lab/
│   │   ├── AudioLab.tsx                 # Audio Lab shell
│   │   ├── AudioLabMain.tsx             # Audio lab main panel router
│   │   ├── AudioLabRightPanel.tsx       # Properties/output panel
│   │   └── views/                       # TTS, STT, Generator, Voice Clone views
│   ├── canvas/
│   │   ├── CanvasMain.tsx               # Primary AI chat canvas interface
│   │   ├── CanvasSidebar.tsx            # Sidebar with credits, model selector, user controls
│   │   ├── ChatEmptyState.tsx           # Empty state with prompt suggestions
│   │   ├── ModelSelectorCard.tsx        # Floating model/credit selector card
│   │   ├── SettingsDialog.tsx           # Full-featured settings dialog (14 sections)
│   │   ├── SidebarShell.tsx             # Sidebar layout shell with navigation
│   │   └── useSidebarState.tsx          # Sidebar open/close state hook
│   ├── history/
│   │   └── HistoryPage.tsx              # Conversation history browser
│   ├── image-generation/
│   │   └── ImageGenerator.tsx           # AI image generation studio (diffusion models)
│   ├── marketplace/
│   │   └── MarketplaceHome.tsx          # Integration and plugin marketplace
│   ├── rivinity-lm/
│   │   ├── RivinityLM.tsx               # Rivinity LM shell
│   │   ├── RivinityLMMain.tsx           # LM tool router
│   │   └── views/                       # Smart Notes, Flashcards, Quizzes, Debate,
│   │                                    # Homework Planner, Exam Lab, Study Companion,
│   │                                    # AI Podcast, Data Analyst, Voice Transcribe,
│   │                                    # Contextual Chat views
│   ├── auth/
│   │   ├── auth-context.tsx             # Auth state provider and hook (`useAuthModal`)
│   │   └── auth-modal.tsx               # Unified login/signup modal and standalone page card
│   ├── layout/
│   │   ├── header.tsx                   # Sticky responsive navigation bar with mega menu
│   │   └── footer.tsx                   # Site-wide footer with links & newsletter
│   ├── sections/                        # Modular landing page sections
│   └── ui/                              # Reusable UI primitives (shadcn/ui + custom)
├── lib/
│   └── utils.ts                         # Class merging utility (`cn`)
├── public/                              # Static public assets
├── types/
│   └── index.ts                         # Shared TypeScript interfaces
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Routes & Pages

### Public Marketing Pages

| Route | Description |
| :--- | :--- |
| `/` | Main Rivinity homepage |
| `/about` | Company, mission, leadership |
| `/academy` | Learning resources and certifications |
| `/apireference` | Developer API reference |
| `/blog` | Engineering blog |
| `/careers` | Career opportunities |
| `/changelog` | Product changelog |
| `/compliance` | HIPAA, GDPR, compliance certs |
| `/contact` | Contact and sales |
| `/cybersecurity` | Security architecture |
| `/developer` | Developer portal and SDKs |
| `/docs` | Product documentation |
| `/education` | Education solutions |
| `/enterprise` | Enterprise AI solutions |
| `/government` | Sovereign AI for public sector |
| `/login` | Sign-in page |
| `/pricing` | Subscription tiers and billing |
| `/privacy` | Privacy policy |
| `/research` | AI research mission |
| `/security` | Security trust center |
| `/signup` | Registration page |
| `/status` | Platform status and uptime |
| `/terms` | Terms of service |

### Authenticated Product Pages

| Route | Description |
| :--- | :--- |
| `/dashboard` | Main product dashboard with workspace overview |
| `/app` | App builder workspace |
| `/analytics` | Analytics dashboard with usage metrics and charts |
| `/rivinitylm` | Rivinity LM multi-tool suite (Notes, Flashcards, Quizzes, etc.) |
| `/chat/*` | AI canvas chat interface with model selection and credit tracking |

---

## Key Features (feat/inner-pages)

### AI Canvas Chat Interface
- Real-time AI chat with model selector (Rivinity Apex, Lite, Spark, Flash)
- Credit system supporting Free (daily + ad credits), and Pro (monthly credits) tiers
- Animated credit circle indicator with per-tier color coding (blue = daily, yellow = ad, pink = pro)
- Hover tooltip and click popup for credit breakdown
- Sidebar with collapsible chat history, quick-action buttons, and user avatar

### Settings Dialog
- 14-section settings panel: General, Notifications, Personalization, Integrations, Voice, Billing, Data Controls, Storage, Security & Login, Parental Controls, Trusted Contact, Account, Keyboard Shortcuts
- Sidebar with search filter, active state highlighting (slate-gray pill), and Workspace links
- Custom orange toggle switch (`CustomSwitch`) replacing shadcn/ui Switch for brand consistency
- Integrations tab with connected tools list (HubSpot, Salesforce, Slack, OpenAI, Claude, Gemini, MongoDB, GitHub, Brevo, Stripe) and per-item toggle
- API Keys tab with copy, rotate, and revoke actions
- Clean compact size: 740px wide × 640px tall, no DPR zoom scaling

### Dashboard
- Workspace overview with quick-access tiles for all product modules
- Recent activity feed and team collaboration shortcuts

### Analytics
- Usage charts, API call metrics, model performance breakdowns

### Rivinity LM Suite
- 11 specialized AI tools: Smart Notes, Flashcards, Quizzes, AI Debate, Homework Planner, Exam Lab, Study Companion, AI Podcast, Data Analyst, Voice Transcribe, Contextual Chat

---

## Configuration & Architecture

- **Path Aliases**: `@/*` mapped to workspace root in `tsconfig.json`
- **SEO & Social Metadata**: Configured in `app/layout.tsx` with `metadataBase`, OpenGraph, Twitter cards
- **Brand Colors**: Primary `#ff6600` / `#ff8b28` accent with zinc/slate neutral palette
- **Auth System**: `auth-context.tsx` + `auth-modal.tsx` — unified login/signup/reset with rate limiting and input sanitization
- **Image Optimization**: `next.config.js` with `remotePatterns` and automatic AVIF/WebP conversion
- **Styling System**: Tailwind CSS 4 via `app/globals.css` with CSS variable design tokens

---

## License

Provided as-is for development and demo purposes.
