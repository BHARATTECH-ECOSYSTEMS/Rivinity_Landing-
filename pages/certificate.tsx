import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  RefreshCw,
  Globe,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Get Your Replit Certification for LinkedIn | Replit",
  description:
    "Earn your official Replit certification, see your builder proficiency level, and add a verified credential to your LinkedIn profile in seconds.",
};

interface ProficiencyLevel {
  level: number;
  title: string;
  points: string[];
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const trustedLogos = ["pe", "Microsoft", "gusto", "Google", "Adobe", "Atlassian"];

const proficiencyLevels: ProficiencyLevel[] = [
  {
    level: 1,
    title: "Beginner Builder",
    points: [
      "Navigate the Replit workspace",
      "Write basic prompts",
      "Preview and deploy simple projects",
    ],
  },
  {
    level: 2,
    title: "Core Builder",
    points: [
      "Build more complex applications",
      "Store and manage data",
      "Provide effective context to the Agent",
    ],
  },
  {
    level: 3,
    title: "Proficient Builder",
    points: [
      "Connect external services",
      "Configure applications properly",
      "Optimize how you use resources",
    ],
  },
  {
    level: 4,
    title: "Advanced Builder",
    points: [
      "Build production-ready applications",
      "Manage complete development workflows",
      "Use advanced prompting techniques",
    ],
  },
  {
    level: 5,
    title: "Master Builder",
    points: [
      "Solve complex problems independently",
      "Extend platform capabilities",
      "Contribute to the community",
    ],
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: "Build on Replit",
    description:
      "Create projects, deploy applications, and grow your portfolio using Replit's AI-powered development environment.",
  },
  {
    number: 2,
    title: "Get Certified",
    description:
      "Instantly unlock your verified Replit developer status and access your professional certification profile.",
  },
  {
    number: 3,
    title: "Share Your Skills",
    description:
      "Add your official Replit certification to LinkedIn with one click to showcase your verified building skills.",
  },
];

const features: Feature[] = [
  {
    icon: <RefreshCw size={20} strokeWidth={2} />,
    title: "Automatic Updates",
    description: "Your certification keeps pace as you build more on Replit.",
  },
  {
    icon: <Globe size={20} strokeWidth={2} />,
    title: "LinkedIn Integration",
    description: "Push your certification straight to your LinkedIn profile.",
  },
  {
    icon: <Globe size={20} strokeWidth={2} />,
    title: "Shareable Profile",
    description: "Get a public profile link you can share anywhere.",
  },
];

const footerColumns: FooterColumn[] = [
  {
    heading: "Handy Links",
    links: [
      { label: "Vibe Coding 101", href: "/vibe-coding-101" },
      { label: "How to guides", href: "/build" },
      { label: "Import from GitHub", href: "/github" },
      { label: "Help", href: "/help" },
      { label: "Status", href: "https://status.replit.com/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Brand kit", href: "/brand" },
      { label: "Certifications", href: "/certifications" },
      { label: "Partnerships", href: "/partners" },
      { label: "Additional resources", href: "/additional-resources" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of service", href: "/legal/terms-of-service" },
      { label: "Commercial agreement", href: "/legal/commercial-agreement" },
      { label: "Privacy", href: "/legal/privacy-policy" },
      { label: "Subprocessors", href: "/legal/subprocessors" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Report abuse", href: "/report-abuse" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "X / Twitter", href: "https://x.com/replit" },
      { label: "TikTok", href: "https://www.tiktok.com/@replit" },
      { label: "Facebook", href: "https://www.facebook.com/replit/" },
      { label: "Instagram", href: "https://www.instagram.com/repl.it" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/repl-it/" },
    ],
  },
];

function SiteHeader() {
  return (
    <Header/>
  );
}

function SiteFooter() {
  return (
    <Footer/>
  );
}

export default function CertificationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="cert-main">
        {/* Hero */}
        <section className="cert-hero">
          <div className="cert-heroInner">
            <div className="cert-heroText">
              <p className="cert-eyebrow">Replit Certification</p>
              <h1 className="cert-heroTitle">
                Get your
                <br />
                <span className="cert-heroTitleAccent">Replit</span>
                <br />
                <span className="cert-heroTitleAccent">Certification.</span>
              </h1>
              <p className="cert-heroSubtitle">
                Fetch your official Replit certification and add it to your
                LinkedIn profile in seconds.
              </p>
              <div className="cert-heroActions">
                <Link href="/certifications/start" className="cert-primaryBtn">
                  Get My Certification
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
                <a href="#proficiency-levels" className="cert-secondaryBtn">
                  Explore the levels
                </a>
              </div>
            </div>

            <div className="cert-heroVisual">
              <div className="cert-certCard">
                <Sparkles className="cert-sparkleTopRight" size={28} />
                <Sparkles className="cert-sparkleBottomLeft" size={16} />
                <div className="cert-certBadge">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cert-certRibbon"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M8.5 14L7 21L12 18.5L17 21L15.5 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="cert-certCheck">
                    <Check size={14} strokeWidth={3} />
                  </span>
                </div>
                <p className="cert-certVerifiedLabel">Verified by Replit</p>
                <p className="cert-certTitle">Official Builder Certification</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted by */}
        <section className="cert-trustedBy">
          <p className="cert-trustedByLabel">
            Trusted by builders at the world&apos;s best companies
          </p>
          <div className="cert-logoRow">
            {trustedLogos.map((name) => (
              <span key={name} className="cert-logoItem">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Proficiency levels */}
        <section id="proficiency-levels" className="cert-proficiency">
          <div className="cert-sectionIntro">
            <p className="cert-eyebrowLight">Proficiency</p>
            <h2 className="cert-proficiencyTitle">The 5 proficiency levels.</h2>
            <p className="cert-proficiencySubtitle">
              Showcase your growth and expertise within the Replit ecosystem
              with an officially recognized proficiency level.
            </p>
          </div>

          <div className="cert-levelGrid">
            {proficiencyLevels.map((level) => (
              <div key={level.level} className="cert-levelCard">
                <span className="cert-levelBadge">Level {level.level}</span>
                <h3 className="cert-levelTitle">{level.title}</h3>
                <ul className="cert-levelList">
                  {level.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="cert-howItWorks">
          <div className="cert-howItWorksInner">
            <div className="cert-howItWorksIntro">
              <p className="cert-eyebrowLight">How it works</p>
              <h2 className="cert-howItWorksTitle">
                Certified in three
                <br />
                simple steps.
              </h2>
              <p className="cert-howItWorksSubtitle">
                Getting your Replit certification is simple and automatic.
              </p>
              <p className="cert-howItWorksNote">
                * Please note that an active Replit subscription is required
                to qualify for certification.
              </p>
            </div>

            <ol className="cert-timeline">
              {steps.map((step) => (
                <li key={step.number} className="cert-timelineItem">
                  <span className="cert-timelineDot" aria-hidden="true" />
                  <h3 className="cert-timelineTitle">
                    {step.number}. {step.title}
                  </h3>
                  <p className="cert-timelineDescription">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Feature cards */}
        <section className="cert-features">
          <div className="cert-featureGrid">
            {features.map((feature) => (
              <div key={feature.title} className="cert-featureCard">
                <span className="cert-featureIcon">{feature.icon}</span>
                <h3 className="cert-featureTitle">{feature.title}</h3>
                <p className="cert-featureDescription">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cert-cta">
          <h2 className="cert-ctaTitle">Ready to get certified?</h2>
          <p className="cert-ctaSubtitle">
            Sign in with your Replit account to fetch your certification level
            and add it to your professional profile.
          </p>
          <Link href="/certifications/start" className="cert-ctaBtn">
            Get My Certification
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </section>
      </main>
      <SiteFooter />

      {/* Global styles (self-contained, no CSS module).
          Must be "global" — SiteHeader/SiteFooter are separate components,
          and scoped styled-jsx only reaches JSX inside the component that
          declares the <style> tag. All classes are cert-* prefixed to avoid
          collisions with the rest of the app. */}
      <style jsx global>{`
        /* Design tokens shared with the rest of the site (see globals.css :root) */
        .cert-main,
        .cert-header,
        .cert-footer {
          --rp-cream: var(--rp-bg, #faf6f1);
          --rp-black: #0b0b0b;
          --rp-orange: var(--rp-orange, #ff3c00);
          --rp-text: var(--rp-text, #1b2333);
          --rp-text-secondary: var(--rp-text-secondary, #666d79);
          --rp-border: rgba(27, 35, 51, 0.1);
          --rp-font: var(--rp-font, "ABCDiatype", -apple-system, BlinkMacSystemFont, sans-serif);
          font-family: var(--rp-font);
        }

        /* =========================================================
           Header
        ========================================================= */
        .cert-header {
          position: sticky;
          top: 0;
          z-index: 40;
          background-color: var(--rp-cream);
          border-bottom: 1px solid var(--rp-border);
        }

        .cert-headerInner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .cert-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 22px;
          font-weight: 700;
          color: var(--rp-text);
          text-decoration: none;
          margin-right: 8px;
        }

        .cert-logoMark {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background-color: var(--rp-orange);
          display: inline-block;
        }

        .cert-nav {
          display: none;
          align-items: center;
          gap: 4px;
          flex: 1;
        }

        @media (min-width: 990px) {
          .cert-nav {
            display: flex;
          }
        }

        .cert-navItem {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: var(--rp-text);
          padding: 8px 14px;
          border-radius: 6px;
          text-decoration: none;
          font-family: inherit;
          transition: opacity 0.2s ease;
        }

        .cert-navItem:hover {
          opacity: 0.6;
        }

        .cert-agentPill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: var(--rp-orange);
          color: #faf6f1;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 10px 6px 14px;
          border-radius: 999px;
          text-decoration: none;
          margin-left: 8px;
        }

        .cert-agentBadge {
          background-color: rgba(255, 255, 255, 0.25);
          border-radius: 999px;
          padding: 1px 7px;
          font-size: 12px;
        }

        .cert-headerActions {
          display: none;
          align-items: center;
          gap: 8px;
        }

        @media (min-width: 990px) {
          .cert-headerActions {
            display: flex;
          }
        }

        .cert-createAccountBtn {
          border: 1px solid var(--rp-orange);
          color: var(--rp-orange);
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .cert-createAccountBtn:hover {
          background-color: var(--rp-orange);
          color: #ffffff;
        }

        /* =========================================================
           Shared section helpers
        ========================================================= */
        .cert-main {
          background-color: var(--rp-cream);
          color: var(--rp-text);
        }

        .cert-eyebrow,
        .cert-eyebrowLight {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--rp-orange);
          margin: 0 0 16px;
        }

        /* =========================================================
           Hero
        ========================================================= */
        .cert-hero {
          padding: 64px 32px 48px;
        }

        .cert-heroInner {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .cert-heroInner {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 64px;
          }
        }

        .cert-heroTitle {
          font-size: 56px;
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 24px;
          color: var(--rp-text);
        }

        @media (min-width: 1024px) {
          .cert-heroTitle {
            font-size: 72px;
          }
        }

        .cert-heroTitleAccent {
          color: var(--rp-orange);
        }

        .cert-heroSubtitle {
          font-size: 18px;
          line-height: 1.5;
          color: var(--rp-text-secondary);
          max-width: 40ch;
          margin: 0 0 32px;
        }

        .cert-heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cert-primaryBtn,
        .cert-ctaBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--rp-orange);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 22px;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .cert-primaryBtn:hover,
        .cert-ctaBtn:hover {
          background-color: #d63500;
        }

        .cert-secondaryBtn {
          display: inline-flex;
          align-items: center;
          background-color: transparent;
          color: var(--rp-text);
          font-size: 15px;
          font-weight: 600;
          padding: 14px 22px;
          border-radius: 8px;
          border: 1px solid var(--rp-border);
          text-decoration: none;
          transition: border-color 0.2s ease;
        }

        .cert-secondaryBtn:hover {
          border-color: var(--rp-text);
        }

        .cert-heroVisual {
          display: flex;
          justify-content: center;
        }

        .cert-certCard {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 1 / 0.82;
          background-color: rgba(27, 35, 51, 0.045);
          border-radius: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 32px;
          text-align: center;
        }

        .cert-sparkleTopRight {
          position: absolute;
          top: 20px;
          right: 24px;
          color: var(--rp-orange);
        }

        .cert-sparkleBottomLeft {
          position: absolute;
          bottom: 20px;
          left: 24px;
          color: var(--rp-orange);
          opacity: 0.6;
        }

        .cert-certBadge {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background-color: rgba(255, 60, 0, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .cert-certRibbon {
          width: 40px;
          height: 40px;
          color: var(--rp-orange);
        }

        .cert-certCheck {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: var(--rp-orange);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid var(--rp-cream);
        }

        .cert-certVerifiedLabel {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--rp-text-secondary);
          margin: 0;
        }

        .cert-certTitle {
          font-size: 22px;
          font-weight: 700;
          color: var(--rp-text);
          margin: 0;
          max-width: 20ch;
        }

        /* =========================================================
           Trusted by
        ========================================================= */
        .cert-trustedBy {
          padding: 48px 32px 96px;
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
        }

        .cert-trustedByLabel {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--rp-text-secondary);
          margin: 0 0 32px;
        }

        .cert-logoRow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 48px;
        }

        .cert-logoItem {
          font-size: 24px;
          font-weight: 700;
          color: var(--rp-text-secondary);
          opacity: 0.6;
          letter-spacing: -0.01em;
        }

        /* =========================================================
           Proficiency levels (light section)
        ========================================================= */
        .cert-proficiency {
          background-color: var(--rp-cream);
          padding: 48px 32px 96px;
        }

        .cert-sectionIntro {
          max-width: 640px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .cert-proficiencyTitle {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
          color: var(--rp-text);
        }

        @media (min-width: 800px) {
          .cert-proficiencyTitle {
            font-size: 52px;
          }
        }

        .cert-proficiencySubtitle {
          font-size: 17px;
          line-height: 1.5;
          color: var(--rp-text-secondary);
          margin: 0;
        }

        .cert-levelGrid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .cert-levelGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .cert-levelGrid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .cert-levelCard {
          background-color: #ffffff;
          border: 1px solid var(--rp-border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cert-levelBadge {
          align-self: flex-start;
          background-color: rgba(255, 60, 0, 0.12);
          color: var(--rp-orange);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .cert-levelTitle {
          font-size: 19px;
          font-weight: 700;
          margin: 0;
          color: var(--rp-text);
        }

        .cert-levelList {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 4px 0 0;
          padding: 0;
        }

        .cert-levelList li {
          position: relative;
          padding-left: 14px;
          font-size: 14px;
          line-height: 1.4;
          color: var(--rp-text-secondary);
        }

        .cert-levelList li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 7px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--rp-orange);
        }

        /* =========================================================
           How it works (dark section)
        ========================================================= */
        .cert-howItWorks {
          background-color: var(--rp-black);
          color: #ffffff;
          padding: 96px 32px;
        }

        .cert-howItWorksInner {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 900px) {
          .cert-howItWorksInner {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 96px;
          }
        }

        .cert-howItWorksTitle {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 20px;
          color: #ffffff;
        }

        @media (min-width: 800px) {
          .cert-howItWorksTitle {
            font-size: 48px;
          }
        }

        .cert-howItWorksSubtitle {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 24px;
        }

        .cert-howItWorksNote {
          font-size: 13px;
          font-style: italic;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }

        .cert-timeline {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }

        .cert-timeline::before {
          content: "";
          position: absolute;
          top: 8px;
          bottom: 8px;
          left: 5px;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .cert-timelineItem {
          position: relative;
          padding-left: 32px;
        }

        .cert-timelineDot {
          position: absolute;
          left: 0;
          top: 4px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: var(--rp-orange);
          box-shadow: 0 0 0 4px rgba(255, 60, 0, 0.2);
        }

        .cert-timelineTitle {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px;
          color: #ffffff;
        }

        .cert-timelineDescription {
          font-size: 15px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          max-width: 46ch;
        }

        /* =========================================================
           Feature cards (light section)
        ========================================================= */
        .cert-features {
          background-color: var(--rp-cream);
          padding: 56px 32px;
        }

        .cert-featureGrid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 800px) {
          .cert-featureGrid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .cert-featureCard {
          background-color: #ffffff;
          border: 1px solid var(--rp-border);
          border-radius: 16px;
          padding: 28px;
        }

        .cert-featureIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(255, 60, 0, 0.12);
          color: var(--rp-orange);
          margin-bottom: 20px;
        }

        .cert-featureTitle {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 8px;
          color: var(--rp-text);
        }

        .cert-featureDescription {
          font-size: 14px;
          line-height: 1.5;
          color: var(--rp-text-secondary);
          margin: 0;
        }

        /* =========================================================
           CTA (orange section)
        ========================================================= */
        .cert-cta {
          background-color: var(--rp-orange);
          color: #ffffff;
          text-align: center;
          padding: 96px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cert-ctaTitle {
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }

        @media (min-width: 800px) {
          .cert-ctaTitle {
            font-size: 56px;
          }
        }

        .cert-ctaSubtitle {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          max-width: 46ch;
          margin: 0 0 32px;
        }

        .cert-ctaBtn {
          background-color: #ffffff;
          color: var(--rp-text);
        }

        .cert-ctaBtn:hover {
          background-color: rgba(255, 255, 255, 0.85);
        }

        /* =========================================================
           Footer
        ========================================================= */
        .cert-footer {
          background-color: var(--rp-cream);
          border-top: 1px solid var(--rp-border);
          padding: 56px 32px 32px;
        }

        .cert-footerInner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        @media (min-width: 900px) {
          .cert-footerInner {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .cert-footerLogo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 24px;
          font-weight: 700;
          color: var(--rp-text);
        }

        .cert-footerColumns {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (min-width: 640px) {
          .cert-footerColumns {
            grid-template-columns: repeat(4, 1fr);
            gap: 48px;
          }
        }

        .cert-footerColumn {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cert-footerHeading {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--rp-text-secondary);
        }

        .cert-footerLinkList {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cert-footerLink {
          font-size: 14px;
          color: var(--rp-text);
          text-decoration: none;
        }

        .cert-footerLink:hover {
          opacity: 0.6;
        }

        .cert-footerBottom {
          max-width: 1400px;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid var(--rp-border);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cert-footerClock {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--rp-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cert-footerClockZone {
          font-size: 10px;
          font-weight: 600;
          color: var(--rp-text-secondary);
        }

        .cert-footerLegal {
          font-size: 13px;
          color: var(--rp-text-secondary);
          line-height: 1.5;
        }

        .cert-footerLegal p {
          margin: 0;
        }
      `}</style>
    </>
  );
}