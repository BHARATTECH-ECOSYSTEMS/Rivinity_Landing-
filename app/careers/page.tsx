"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Cta from "@/components/cta-section";

const BENEFITS = [
  {
    title: "For you",
    items: [
      "Competitive salary and equity",
      "Monthly wellness stipend",
      "Health, dental, and vision insurance",
      "HSA/FSA with company contribution",
      "Mental healthcare support and services",
      "In-office setup reimbursement",
      "Commuter benefits & daily meals",
    ],
  },
  {
    title: "For your life",
    items: [
      "Flexible time off and paid sick leave",
      "Paid parental leave",
      "Paid medical, bonding & family care leave",
      "Short and long-term disability coverage",
      "Life and AD&D insurance",
    ],
  },
  {
    title: "For your development",
    items: [
      "Annual learning & development stipend",
      "Quarterly team gatherings",
      "Reward and recognition programs",
      "Career development & coaching opportunities",
    ],
  },
];

const JOIN_TRAITS = [
  "Passionate about making software creation accessible to everyone",
  "Excited to build products used by thousands of creators every day",
  "Committed to shipping fast without cutting corners on craft",
];

export default function CareersPage() {
  return (
    <div className="careers-page">
      <Header />

      <main className="careers-main">
        <div className="cr-wrap">
          
          {/* 1. Distinct Modern Hero Section */}
          <section className="cr-hero-spotlight">
            <div className="cr-spotlight-glow" aria-hidden="true" />
            <div className="cr-hero-grid" aria-hidden="true" />

            <div className="cr-hero-inner">

              {/* Title */}
              <h1 className="cr-kicker">Careers at Rivinity</h1>
              
              {/* Subtitle */}
              <p className="cr-tagline">Help builders ship ideas, not tickets.</p>
              
              {/* Primary Action Button */}
              <div className="cr-btn-wrapper">
                <a className="cr-btn" href="#open-positions">
                  <span>See open positions</span>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Subtle Meta Highlights */}
              <div className="cr-hero-meta">
                <span className="cr-meta-tag">Indore + Remote</span>
                <span className="cr-meta-dot">•</span>
                <span className="cr-meta-tag">Fast-paced</span>
                <span className="cr-meta-dot">•</span>
                <span className="cr-meta-tag">High Ownership</span>
              </div>
            </div>
          </section>

          {/* 2. Intro / Mission Card */}
          <section className="cr-card cr-intro-card">
            <p>
              Rivinity is a platform that helps teams turn raw ideas into working software
              faster without losing the craft that makes software good.
            </p>
            <p>
              We started as a small team scratching our own itch. Today we&apos;re building
              the tools we wished we&apos;d had: faster feedback loops, fewer handoffs, and an
              AI layer that does the tedious parts so people can focus on the interesting ones.
            </p>
            <p>
              <strong>Come help us build it.</strong>
            </p>
          </section>

          {/* 3. Orange Accent Card */}
          <section className="cr-banner-card">
            <div className="cr-banner-overlay" />
            <div className="cr-banner-copy">
              <h2>Help shape Rivinity&apos;s next chapter</h2>
              <p>
                Bring your judgment and curiosity to a small team moving fast on a product
                people rely on daily. We&apos;re still early — what you build will matter.
              </p>
            </div>
          </section>

          {/* 4. 2-Column Grid */}
          <div className="cr-grid-2">
            <section className="cr-card">
              <h2>How we work</h2>
              <p>
                <strong>Ship it, then sharpen it.</strong> We&apos;d rather see a rough version in
                front of real users than a perfect one in a design file. This is a place for people
                who care about craft, move quickly, and want their work to hold up once it&apos;s
                out in the world.
              </p>
            </section>

            <section className="cr-card">
              <h2>Where we work</h2>
              <p>
                <strong>Hybrid, on purpose.</strong> Most of the team works together from our
                Indore office a few days a week, with the rest remote. In-person time keeps
                decisions fast and feedback direct; the rest of the week is yours to build with
                focus.
              </p>
            </section>
          </div>

          {/* 5. Join Our Team Card */}
          <section className="cr-card" id="open-positions">
            <h2>Join our team</h2>
            <p className="cr-card-subtitle">We&apos;re looking for people who are:</p>
            <ul className="cr-trait-list">
              {JOIN_TRAITS.map((t) => (
                <li key={t}>
                  <span className="cr-bullet" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Benefits Card */}
          <section className="cr-card">
            <h2>Benefits</h2>
            <p className="cr-card-subtitle">
              Our benefits are built to support you day-to-day and over the long run, not just
              on paper.
            </p>
            
            <div className="cr-benefits-grid">
              {BENEFITS.map((group) => (
                <div className="cr-benefit-subcard" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="cr-sub-list">
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className="cr-sub-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="cr-more-link">
              <p>
                Learn more about our{" "}
                <a className="cr-link" href="#">
                  interview process →
                </a>
              </p>
            </div>
          </section>

          {/* 7. Bottom CTA (Tightened & Unified Spacing) */}
          <div className="cr-bottom-cta">
            <Cta />
          </div>

        </div>
      </main>

      <Footer />

      <style jsx global>{`
        :root {
          --rv-bg: #ffffff;
          --rv-card-bg: #ffffff;
          --rv-subtle: #faf9f7;
          --rv-ink: #141414;
          --rv-muted: #5f6672;
          --rv-line: rgba(20, 20, 20, 0.08);
          --rv-orange-deep: #ff3c00;
          --rv-orange-light: #ff7a1a;
          --rv-radius: 20px;
          --rv-radius-sm: 12px;
        }

        .careers-page {
          background: var(--rv-bg);
          color: var(--rv-ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          min-height: 100vh;
        }

        .careers-page * {
          box-sizing: border-box;
        }

        .careers-main {
          padding-top: 100px; 
          padding-bottom: 40px;
        }

        .cr-wrap {
          width: min(920px, calc(100% - 40px));
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* --- 1. Distinct Modern Hero Section --- */
        .cr-hero-spotlight {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid var(--rv-line);
          border-radius: 24px;
          padding: 64px 24px 44px;
          text-align: center;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
        }

        .cr-spotlight-glow {
          position: absolute;
          top: -90px;
          left: 50%;
          transform: translateX(-50%);
          width: 520px;
          height: 240px;
          background: radial-gradient(circle, rgba(255, 122, 26, 0.12) 0%, rgba(255, 60, 0, 0.03) 60%, transparent 80%);
          filter: blur(36px);
          pointer-events: none;
        }

        .cr-hero-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(20, 20, 20, 0.06) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.6;
          mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
          pointer-events: none;
        }

        .cr-hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 680px;
          margin: 0 auto;
        }

        .cr-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 60, 0, 0.06);
          border: 1px solid rgba(255, 60, 0, 0.14);
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--rv-orange-deep);
          margin-bottom: 20px;
        }

        .cr-pulse-indicator {
          width: 7px;
          height: 7px;
          background-color: var(--rv-orange-deep);
          border-radius: 50%;
          position: relative;
        }

        .cr-pulse-indicator::after {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(255, 60, 0, 0.4);
          animation: cr-pulse 2s infinite ease-out;
        }

        @keyframes cr-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .cr-kicker {
          margin: 0 0 14px;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(36px, 5.5vw, 54px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 800;
          color: var(--rv-ink);
        }

        .cr-tagline {
          margin: 0 0 28px;
          font-size: clamp(17px, 2.4vw, 21px);
          line-height: 1.4;
          letter-spacing: -0.015em;
          font-weight: 450;
          color: var(--rv-muted);
        }

        .cr-btn-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .cr-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 30px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          background: linear-gradient(180deg, #ff521a 0%, #ff3c00 100%);
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(255, 60, 0, 0.28);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cr-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 60, 0, 0.38);
        }

        .cr-hero-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #788190;
          font-weight: 500;
        }

        .cr-meta-dot {
          color: rgba(20, 20, 20, 0.2);
        }

        /* --- Common Cards --- */
        .cr-card {
          background: var(--rv-card-bg);
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius);
          padding: 38px 40px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
        }

        .cr-card h2 {
          margin: 0 0 12px;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(22px, 2.5vw, 26px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          font-weight: 700;
          color: var(--rv-ink);
        }

        .cr-card p {
          color: var(--rv-muted);
          font-size: 16px;
          line-height: 1.65;
          margin: 0;
        }

        .cr-card-subtitle {
          margin-bottom: 24px !important;
        }

        /* Intro */
        .cr-intro-card p {
          margin: 0 0 16px;
        }

        .cr-intro-card p:last-child {
          margin-bottom: 0;
        }

        .cr-intro-card p strong {
          color: var(--rv-ink);
          font-weight: 700;
        }

        /* Orange Banner */
        .cr-banner-card {
          position: relative;
          border-radius: var(--rv-radius);
          overflow: hidden;
          width: 100%;
          min-height: 160px;
          display: flex;
          align-items: center;
          padding: 38px 40px;
          background: linear-gradient(120deg, #ff9a4d 0%, #ff7a1a 45%, #ff3c00 100%);
          box-shadow: 0 12px 28px rgba(255, 122, 26, 0.14);
        }

        .cr-banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.1);
        }

        .cr-banner-copy {
          position: relative;
          z-index: 1;
          max-width: 620px;
        }

        .cr-banner-copy h2 {
          margin: 0 0 10px;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(24px, 3.2vw, 30px);
          line-height: 1.15;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #ffffff;
        }

        .cr-banner-copy p {
          margin: 0;
          color: rgba(255, 255, 255, 0.95);
          font-size: 15px;
          line-height: 1.55;
        }

        /* 2-Column Grid */
        .cr-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .cr-grid-2 .cr-card p strong {
          color: var(--rv-ink);
          font-weight: 700;
        }

        /* Trait List */
        .cr-trait-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cr-trait-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: var(--rv-ink);
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
        }

        .cr-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--rv-orange-deep);
          margin-top: 8px;
          flex-shrink: 0;
        }

        /* Benefits Grid */
        .cr-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 8px;
        }

        .cr-benefit-subcard {
          background: var(--rv-subtle);
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius-sm);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
        }

        .cr-benefit-subcard h3 {
          margin: 0 0 16px;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--rv-ink);
        }

        .cr-sub-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cr-sub-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--rv-muted);
          font-size: 14px;
          line-height: 1.45;
        }

        .cr-sub-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--rv-orange-deep);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .cr-more-link {
          margin-top: 28px !important;
          padding-top: 20px;
          border-top: 1px solid var(--rv-line);
        }

        .cr-link {
          color: var(--rv-orange-deep);
          text-decoration: none;
          font-weight: 600;
        }

        .cr-link:hover {
          text-decoration: underline;
        }

        /* --- Tightened Bottom CTA Styling --- */
        .cr-bottom-cta {
          margin: 0;
          padding: 0;
          width: 100%;
        }

        /* Strip default extra margins/paddings from the imported CTA component */
        .cr-bottom-cta :global(section),
        .cr-bottom-cta :global(.cta-section),
        .cr-bottom-cta :global(.container),
        .cr-bottom-cta :global(div) {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }

        .cr-bottom-cta :global(section) {
          padding-top: 36px !important;
          padding-bottom: 36px !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .careers-main {
            padding: 80px 0 20px;
          }

          .cr-wrap {
            width: calc(100% - 32px);
            gap: 18px;
          }

          .cr-hero-spotlight {
            padding: 48px 18px 32px;
          }

          .cr-card {
            padding: 28px 20px;
          }

          .cr-banner-card {
            padding: 28px 20px;
          }

          .cr-grid-2,
          .cr-benefits-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .cr-bottom-cta :global(section) {
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}