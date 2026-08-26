"use client";

import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Cta from "@/components/cta-section";

// If this lives at app/careers/page.tsx, export metadata from a server file
// instead (a "use client" file can't export metadata):
// export const metadata = { title: "Careers at Rivinity" };

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="container">
        <main>
          {/* Hero */}
          <section className="cr-hero mt-12">
            <div className="cr-wrap">
              <h1 className="cr-kicker">Careers at Rivinity</h1>
              <p className="cr-tagline">Help builders ship ideas, not tickets.</p>
              <div>
                <a className="cr-btn" href="#">See open positions</a>
              </div>
            </div>
          </section>

          {/* Intro / mission */}
          <section className="cr-intro">
            <div className="cr-wrap">
              <div className="cr-intro-card">
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
              </div>
            </div>
          </section>

          {/* CTA banner 1 */}
          <section className="cr-cta-module">
            <div className="cr-wrap cr-wrap-narrow">
              <div className="cr-cta-card">
                <div className="cr-cta-overlay"></div>

                <div className="cr-cta-copy">
                  <h2>Help shape Rivinity&apos;s next chapter</h2>
                  <p>
                    Bring your judgment and curiosity to a small team moving fast on a product
                    people rely on daily. We&apos;re still early — what you build will matter.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How we work */}
          {/* How we work */}
          <section className="cr-section">
            <div className="cr-wrap">
              <div className="cr-text-content">
                <h2>How we work</h2>
                <p>
                  <strong>Ship it, then sharpen it.</strong> We&apos;d rather see a rough version in
                  front of real users than a perfect one in a design file. This is a place for people
                  who care about craft, move quickly, and want their work to hold up once it&apos;s
                  out in the world.
                </p>
              </div>
            </div>
          </section>

          {/* Where we work */}
          <section className="cr-section">
            <div className="cr-wrap">
              <div className="cr-text-content">
                <h2>Where we work</h2>
                <p>
                  <strong>Hybrid, on purpose.</strong> Most of the team works together from our
                  Indore office a few days a week, with the rest remote. In-person time keeps
                  decisions fast and feedback direct; the rest of the week is yours to build with
                  focus.
                </p>
              </div>
            </div>
          </section>

          {/* Join our team */}
          <section className="cr-section">
            <div className="cr-wrap">
              <h2>Join our team</h2>
              <p>We&apos;re looking for people who are:</p>
              <ul className="cr-list">
                {JOIN_TRAITS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Benefits */}
          <section className="cr-section">
            <div className="cr-wrap">
              <h2>Benefits</h2>
              <p>
                Our benefits are built to support you day-to-day and over the long run, not just
                on paper.
              </p>
              <div className="cr-benefits-grid">
                {BENEFITS.map((group) => (
                  <div className="cr-benefit-card" key={group.title}>
                    <div className="cr-benefits-group">
                      <h3>{group.title}</h3>
                      <ul className="cr-list">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <p className="cr-more-link">
                Learn more about our <a className="cr-link" href="#">interview process →</a>
              </p>
            </div>
          </section>



          <Cta />
        </main>

        <style jsx global>{`
        :root {
          --rv-bg: #fafafa;
          --rv-paper: #f3f0ec;
          --rv-white: #fffdf9;
          --rv-ink: #181818;
          --rv-muted: #666d79;
          --rv-line: rgba(24, 24, 24, 0.14);
          --rv-orange: #ff7a1a;
          --rv-orange-deep: #ff3c00;
          --rv-radius: 24px;
          --rv-radius-sm: 14px;
          --sp-1: 8px;
          --sp-2: 12px;
          --sp-3: 16px;
          --sp-4: 24px;
          --sp-5: 32px;
          --sp-6: 48px;
          --sp-7: 64px;
          --sp-8: 80px;
          --sp-9: 100px;
        }
        .careers-page {
          background: var(--rv-bg);
          color: var(--rv-ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .careers-page * {
          box-sizing: border-box;
        }
        .careers-page ul {
          margin: 0;
          padding: 0;
        }

        /* Header */
        .rv-header {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 64px;
          padding: 0 28px;
          display: flex;
          align-items: center;
          gap: 28px;
          background: rgba(250, 250, 250, 0.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--rv-line);
        }
        .rv-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          color: var(--rv-ink);
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        .rv-mark {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: linear-gradient(135deg, var(--rv-orange), var(--rv-orange-deep));
          flex-shrink: 0;
        }
        .rv-nav {
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1;
        }
        .rv-nav a,
        .rv-login {
          padding: 9px 12px;
          border-radius: 8px;
          color: var(--rv-ink);
          text-decoration: none;
          font-size: 14px;
        }
        .rv-nav a:hover,
        .rv-login:hover {
          background: #eeeae5;
        }
        .rv-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rv-signup {
          padding: 10px 17px;
          border-radius: 999px;
          background: var(--rv-orange-deep);
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }
        .rv-signup:hover {
          opacity: 0.9;
        }
        .rv-menu {
          display: none;
          border: 0;
          background: none;
          padding: 8px;
          cursor: pointer;
        }
        .rv-menu span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: var(--rv-ink);
          margin: 4px 0;
        }

        .cr-wrap {
          width: min(920px, calc(100% - 48px));
          margin: 0 auto;
        }
        .cr-wrap-narrow {
          width: min(1000px, calc(100% - 48px));
        }

        /* Hero */
        .cr-hero {
          padding: var(--sp-9) 24px var(--sp-7);
        }
        .cr-hero .cr-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .cr-kicker {
          margin: 0 0 var(--sp-2);
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1.02;
          letter-spacing: -0.04em;
          font-weight: 700;
        }
        .cr-tagline {
          margin: 0 0 var(--sp-4);
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: var(--rv-muted);
        }
        .cr-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          border: 1px solid transparent;
          background: var(--rv-orange-deep);
          color: #fff;
          transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(255, 60, 0, 0.22);
        }
        .cr-btn:hover {
          background: #d63500;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 60, 0, 0.3);
        }

        /* Intro card */
        .cr-intro {
          padding: 0 24px var(--sp-7);
        }
        .cr-intro-card {
          background: var(--rv-white);
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius);
          padding: var(--sp-6);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }
        .cr-intro p {
          max-width: 760px;
          color: var(--rv-muted);
          font-size: 18px;
          line-height: 1.65;
          margin: 0 0 var(--sp-4);
        }
        .cr-intro p:last-of-type {
          margin-bottom: 0;
        }
        .cr-intro p strong {
          color: var(--rv-ink);
          font-weight: 700;
        }

        /* CTA banner */
        .cr-cta-module {
          padding: var(--sp-4) 24px var(--sp-7);
        }
        .cr-cta-card {
          position: relative;
          border-radius: var(--rv-radius);
          overflow: hidden;
          min-height: 220px;
          display: flex;
          align-items: center;
          padding: var(--sp-6);
         background: linear-gradient(120deg, #ff9a4d 0%, #ff7a1a 45%, #ff3c00 100%);
          box-shadow: 0 16px 32px rgba(255, 122, 26, 0.15);
        }
        .cr-cta-card-team {
          background: linear-gradient(115deg, #2a2a2a 0%, #1a1a1a 55%, #ff3c00 140%);
        }
       .cr-cta-copy {
          position: relative;
          z-index: 1;
          max-width: 620px;
        }

        .cr-cta-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 0;
        }
        .cr-cta-card h2 {
          margin: 0 0 var(--sp-3);
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(26px, 3.6vw, 36px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #fff;
        }
        .cr-cta-card p {
          margin: 0 0 var(--sp-3);
          color: rgba(255, 255, 255, 0.88);
          font-size: 16px;
          line-height: 1.55;
          max-width: 500px;
        }
        .cr-cta-card-team h2 {
          margin-bottom: var(--sp-3);
        }

        /* Standard section */
        .cr-section {
          padding: var(--sp-4) 24px var(--sp-7);
        }
        .cr-text-content {
          max-width: 672px;
        }
        .cr-section h2 {
          margin: 0 0 var(--sp-3);
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(26px, 3.4vw, 34px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 700;
        }
        .cr-section p {
          max-width: 760px;
          color: var(--rv-muted);
          font-size: 18px;
          line-height: 1.65;
          margin: 0 0 var(--sp-3);
        }
        .cr-section p strong {
          color: var(--rv-ink);
          font-weight: 700;
        }
        .cr-link {
          color: var(--rv-orange-deep);
          text-decoration: none;
          font-weight: 500;
        }
        .cr-link:hover {
          text-decoration: underline;
        }
        .cr-more-link {
          padding: 20px;
        }

        .cr-list {
          list-style: none;
          max-width: 760px;
          margin: var(--sp-3) 0 0;
          padding: 0;
        }
        .cr-list li {
          position: relative;
          padding-left: 18px;
          color: var(--rv-muted);
          font-size: 16px;
          line-height: 1.5;
          margin: 0 0 var(--sp-2);
        }
        .cr-list li:before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--rv-orange-deep);
        }

        /* Benefits grid */
        .cr-benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--sp-4);
          margin-top: var(--sp-5);
        }
        .cr-benefit-card {
          background: var(--rv-white);
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius-sm);
          padding: var(--sp-5);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cr-benefit-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
        }
        .cr-benefits-group h3 {
          margin: 0 0 var(--sp-3);
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--rv-ink);
        }
        .cr-benefit-card .cr-list {
          margin: 0;
        }
        .cr-benefit-card .cr-list li {
          font-size: 15px;
          margin-bottom: var(--sp-2);
        }

        /* Footer */
        .rv-footer {
          background: var(--rv-paper);
          border-top: 1px solid var(--rv-line);
          color: var(--rv-ink);
        }
        .rv-footer-inner {
          width: min(1380px, calc(100% - 48px));
          margin: auto;
          padding: var(--sp-9) 0 var(--sp-8);
        }
        .rv-footer-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: var(--sp-6);
          padding-bottom: var(--sp-8);
        }
        .rv-footer-brand {
          display: flex;
          flex-direction: column;
          gap: var(--sp-6);
          max-width: 420px;
        }
        .rv-footer-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--rv-ink);
          text-decoration: none;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        .rv-footer-logo .rv-mark {
          width: 24px;
          height: 24px;
        }
        .rv-footer-meta {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .rv-globe {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          flex-shrink: 0;
          border: 1px solid #aaa49f;
          position: relative;
          background: linear-gradient(#aaa49f, #aaa49f) center/100% 1px no-repeat,
            linear-gradient(#aaa49f, #aaa49f) center/1px 100% no-repeat;
        }
        .rv-globe:after {
          content: "";
          position: absolute;
          inset: 5px;
          border: 1px solid #aaa49f;
          border-radius: 50%;
        }
        .rv-footer-loc-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 14px;
        }
        .rv-footer-loc-text span {
          color: #767270;
        }
        .rv-divider {
          height: 1px;
          background: #a9a49f;
          width: 100%;
        }
        .rv-footer-links {
          display: grid;
          grid-template-columns: repeat(4, minmax(120px, 150px));
          gap: var(--sp-6);
        }
        .rv-footer-links div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .rv-footer-links h4 {
          margin: 0 0 var(--sp-2);
          color: #767270;
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .rv-footer-links a {
          color: #767270;
          text-decoration: none;
          font-size: 16px;
          line-height: 1.9;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .rv-footer-links a:hover {
          opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .rv-nav,
          .rv-actions {
            display: none;
          }
          .rv-menu {
            display: block;
            margin-left: auto;
          }
          .rv-footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--sp-5) var(--sp-4);
          }
        }
        @media (max-width: 600px) {
          .cr-wrap,
          .cr-wrap-narrow {
            width: 100%;
          }
          .rv-header {
            height: 56px;
            padding: 0 16px;
          }
          .cr-hero {
            padding: 64px 16px 48px;
          }
          .cr-intro,
          .cr-section {
            padding-left: 16px;
            padding-right: 16px;
          }
          .cr-intro-card {
            padding: 20px 16px;
          }
          .cr-cta-module {
            padding: 8px 16px 48px;
          }
          .cr-cta-card {
            min-height: 200px;
            padding: 20px 16px;
          }
          .cr-benefits-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .cr-benefit-card {
            padding: 20px 16px;
          }
          .rv-footer-inner {
            width: calc(100% - 32px);
            padding: 64px 0 56px;
          }
          .rv-footer-top {
            flex-direction: column;
            padding-bottom: 48px;
          }
          .rv-footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 20px;
          }
          .rv-footer-links a {
            font-size: 14px;
          }
        }
      `}</style>
      </div>
      <Footer />
    </>
  );
}