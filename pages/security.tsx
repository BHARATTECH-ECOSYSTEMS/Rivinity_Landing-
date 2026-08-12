"use client";

import type { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import LogoMarquee from "../components/logoslide";

// If this file lives at app/security/page.tsx, export metadata from a
// separate server-only file (metadata can't be exported from a "use client"
// file). Example, in app/security/layout.tsx or a sibling metadata file:
//
// export const metadata: Metadata = { title: "Security - Rivinity" };

const LOGOS = [
  "Northgate Labs",
  "Fenwick & Cross",
  "Loom & Larch",
  "Ardent Systems",
  "Halcyon Works",
];

const CARDS = [
  { icon: "☁", title: "Managed deploys", body: "Runs on isolated cloud infrastructure, patched automatically." },
  { icon: "▦", title: "Object storage", body: "Files and assets are stored with encryption at rest." },
  { icon: "◈", title: "Workspace isolation", body: "Projects never share compute or memory with one another." },
  { icon: "◉", title: "DDoS protection", body: "Traffic is filtered at the edge before it reaches your app." },
];

const ENTERPRISE_CARDS = [
  { icon: "◎", title: "SSO", body: "SAML and OIDC with Okta, Azure AD, Google, and any compliant identity provider." },
  { icon: "⌘", title: "SCIM", body: "Automated provisioning and deprovisioning synced from your identity provider." },
  { icon: "♟", title: "Role-based access", body: "Granular permissions for viewing, editing, and deploying across your org." },
  { icon: "▣", title: "Private deployments", body: "Keep internal projects private and control exactly who can reach them." },
  { icon: "▤", title: "Audit logging", body: "Full visibility into who did what and when, across every workspace." },
  { icon: "◍", title: "Security center", body: "Act on vulnerabilities in bulk across every app in your organization." },
];

const LAYERS = [
  {
    title: "Security from the first line of code",
    body: "Isolated sandboxes, workspace separation, built-in auth, and dependency scanning — working from the moment you start a project.",
    tags: [
      { title: "Isolated sandboxes", body: "Hardened containers for every workspace, no shared state." },
      { title: "Workspace separation", body: "A real backend boundary, not just row-level rules." },
    ],
  },
  {
    title: "Your data is locked down by default",
    body: "Development and production data are fully separated, and secrets are encrypted and never exposed to the model.",
  },
  {
    title: "Enterprise-grade infrastructure, out of the box",
    body: "Every customer gets an isolated environment, DDoS protection, and a web application firewall by default — even on the free tier.",
  },
  {
    title: "Continuously tested and hardened",
    body: "Automated scans and periodic third-party testing keep the platform hardened as it evolves.",
  },
];

const FOUNDER_ITEMS = [
  { icon: "⚙", text: "Pre-publish scanning catches issues before they ship" },
  { icon: "▥", text: "Separate dev and production data, so changes never leak across" },
  { icon: "♟", text: "24×7 monitoring for newly disclosed vulnerabilities in your dependencies" },
  { icon: "↶", text: "Automatic backups mean you can always roll back" },
];

const FAQS = [
  { q: "Where does my data live?", a: "Rivinity infrastructure runs on isolated cloud environments with encrypted storage for every workspace." },
  { q: "How are workspaces isolated?", a: "Each project runs in its own sandbox, so resources and data never cross between workspaces." },
  { q: "How are secrets and API keys managed?", a: "Store credentials in the Secrets vault instead of your code. Secrets are encrypted and only decrypted at runtime." },
  { q: "Does Rivinity scan for vulnerabilities before deployment?", a: "Pre-deployment scanning flags known issues before you publish." },
  { q: "Is Rivinity SOC 2 compliant?", a: "Rivinity's SOC 2 program is in progress — details are available in the Trust Center as they're finalized." },
  { q: "What happens if there's a security incident?", a: "Monitoring and response processes are designed to detect issues early and keep you informed throughout." },
];

export default function SecurityPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [layerOpen, setLayerOpen] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [foundersShown, setFoundersShown] = useState(false);
  const founderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!founderRef.current) return;
    const el = founderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFoundersShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="security-page">
      <Header/>

      <main>
        {/* Hero */}
        <section className="sec-hero">
          <div className="sec-hero-inner">
            <div className="sec-kicker">Security at Rivinity</div>
            <h1>Secure by default</h1>
            <p>
              Every workspace, model call, and integration on Rivinity runs behind the same
              protections — encryption, isolation, and monitoring — whether you&apos;re a solo
              builder or an enterprise team.
            </p>
            <div className="sec-actions">
              <a className="sec-btn sec-btn-light" href="#">Trust Center</a>
              <a className="sec-btn sec-btn-solid" href="#">Get started free →</a>
            </div>
          </div>
        </section>

        {/* Logo marquee */}
        <LogoMarquee/>

        {/* Data security */}
        <section className="sec-section">
          <div className="sec-wrap sec-two">
            <div className="sec-visual">
              <div className="visual-top">
                <span>API Keys</span>
                <span>Protected</span>
              </div>
              <div className="visual-window">
                <div className="tiny">Secrets</div>
                <h3>Your keys stay yours.</h3>
                <div className="scan-row">
                  <div className="scan-lock">🔒</div>
                  <div>
                    <b>Prompt protection</b>
                    <span>Sensitive values are caught before they&apos;re sent.</span>
                  </div>
                </div>
                <div className="scan-row">
                  <div className="scan-lock">✦</div>
                  <div>
                    <b>Encrypted storage</b>
                    <span>Keys are encrypted at rest and injected at runtime.</span>
                  </div>
                </div>
                <div className="pill-key">
                  <span>OPENAI_API_KEY</span>
                  <span className="dots">••••••••••</span>
                </div>
              </div>
            </div>
            <div className="sec-copy">
              <div className="label">Secure by default</div>
              <h2>Better defaults for keeping API keys secure</h2>
              <p>
                Rivinity checks every prompt to prevent sensitive values from leaking into a
                model call. Drop a key into the editor and we&apos;ll steer you to the Secrets
                vault instead.
              </p>
              <p>
                Secrets are encrypted at rest, never exposed to the model, and only decrypted at
                the moment your app needs them.
              </p>
            </div>
          </div>
        </section>

        {/* Infra cards */}
        <section className="sec-section">
          <div className="sec-wrap sec-two">
            <div className="sec-copy">
              <div className="label">Infrastructure security</div>
              <h2>Isolated environments for every workspace</h2>
              <p>
                Every Rivinity project runs in its own sandboxed environment, with resource
                isolation and DDoS protection built into the deployment path.
              </p>
            </div>
            <div className="sec-card-grid">
              {CARDS.map((c) => (
                <article className="sec-card" key={c.title}>
                  <div className="card-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="sec-section sec-enterprise">
          <div className="sec-wrap">
            <div className="sec-hero-inner" style={{ textAlign: "left", maxWidth: "none", margin: 0 }}>
              <div className="label" style={{ marginBottom: 16 }}>Enterprise security</div>
              <h2>Built for enterprise teams</h2>
              <p style={{ marginTop: 20, maxWidth: 560 }}>
                The controls, compliance, and visibility your IT and security teams already
                expect — all built in, not bolted on.
              </p>
            </div>
            <div className="enterprise-grid">
              {ENTERPRISE_CARDS.map((c) => (
                <article className="enterprise-card" key={c.title}>
                  <div className="card-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Layers accordion */}
        <section className="sec-section sec-layers">
          <div className="sec-wrap">
            <div className="layers-top">
              <div>
                <h2>Secured on all fronts</h2>
                <p>Independent layers of protection work together to reduce risk at every level.</p>
              </div>
              <a className="layers-link" href="#">Read the security overview →</a>
            </div>
            <div className="layers-grid">
              <div>
                {LAYERS.map((layer, i) => {
                  const open = layerOpen === i;
                  return (
                    <div className={`layer-item${open ? " open" : ""}`} key={layer.title}>
                      <div
                        className="layer-head"
                        onClick={() => setLayerOpen(open ? null : i)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="layer-num">{String(i + 1).padStart(2, "0")}</span>
                        <h3>{layer.title}</h3>
                        <span className="layer-toggle">+</span>
                      </div>
                      <div className="layer-body">
                        <div className="layer-body-inner">
                          {layer.body}
                          {layer.tags && (
                            <div className="layer-tags">
                              {layer.tags.map((t) => (
                                <div className="layer-tag" key={t.title}>
                                  <b>{t.title}</b>
                                  {t.body}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="diamond-wrap">
                <svg className="diamond-svg" viewBox="0 0 340 400" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={1.3}>
                    <line x1="170" y1="10" x2="170" y2="90" />
                    <line x1="20" y1="200" x2="20" y2="330" />
                    <line x1="320" y1="200" x2="320" y2="330" />
                    <line x1="170" y1="330" x2="170" y2="390" />
                    <polygon points="170,90 320,168 170,246 20,168" stroke="#FF7A1A" strokeWidth={1.6} />
                    <polygon points="170,168 320,246 170,324 20,246" opacity={0.55} />
                    <polygon points="170,196 320,274 170,352 20,274" opacity={0.35} />
                    <polygon points="170,224 320,302 170,380 20,302" opacity={0.2} />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="sec-section sec-founder">
          <div className="sec-wrap">
            <div className="sec-copy">
              <div className="label">For founders</div>
              <h2>Shipping your first app? You&apos;re already covered.</h2>
              <p>
                Every app you build on Rivinity gets the same protections our enterprise
                customers get — from day one, not as an add-on.
              </p>
            </div>
            <div className="founder-list" ref={founderRef}>
              {FOUNDER_ITEMS.map((item, i) => (
                <div
                  className={`founder-item${foundersShown ? " show" : ""}`}
                  key={item.text}
                  style={{ transitionDelay: foundersShown ? `${i * 220}ms` : "0ms" }}
                >
                  <div className="fi">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="sec-compliance">
          <div className="sec-wrap">
            <div className="compliance-card">
              <h2>Compliant and certified</h2>
              <div className="soc-badge">
                <div className="soc-text">
                  <span>SOC 2</span>
                  <small>In progress</small>
                </div>
              </div>
              <a className="trust-link" href="#">Visit our Trust Center ↗</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec-faq">
          <div className="sec-wrap faq-wrap">
            <h2>Frequently asked questions</h2>
            {FAQS.map((item, i) => {
              const open = faqOpen === i;
              return (
                <div className={`faq-item${open ? " open" : ""}`} key={item.q}>
                  <button
                    className="faq-q"
                    type="button"
                    onClick={() => setFaqOpen(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-plus">+</span>
                  </button>
                  <div className="faq-a">{item.a}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="sec-final">
          <div className="sec-wrap sec-final-inner">
            <div className="sec-final-copy">
              <h2>Ship fearlessly</h2>
              <p>
                Start building on a platform where security is built in from day one — not
                something you have to remember to turn on.
              </p>
            </div>
            <div className="sec-final-actions">
              <a className="sec-btn sec-btn-solid" href="#">Get started free →</a>
              <a className="sec-btn sec-btn-light sec-btn-outline" href="#">Contact sales</a>
            </div>
          </div>
        </section>
      </main>

      <Footer/>

      <style jsx global>{`
        :root {
          --rv-bg: #fafafa;
          --rv-paper: #f3f0ec;
          --rv-white: #ffffff;
          --rv-ink: #161616;
          --rv-muted: #6b6f76;
          --rv-line: rgba(22, 22, 22, 0.12);
          --rv-orange: #ff7a1a;
          --rv-orange-deep: #ff3c00;
          --rv-radius: 24px;
          --rv-radius-sm: 18px;
          --sp-9: 100px;
          --sp-10: 120px;
        }
        .security-page {
          background: var(--rv-bg);
          color: var(--rv-ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: clip;
        }
        .security-page * {
          box-sizing: border-box;
        }
        .sec-wrap {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
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
          background: rgba(250, 250, 250, 0.9);
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

        /* Hero */
        .sec-hero {
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--sp-9) 24px 90px;
          border-bottom: 1px solid var(--rv-line);
          position: relative;
        }
        .sec-hero:before,
        .sec-hero:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--rv-line);
        }
        .sec-hero:before {
          left: max(24px, calc(50% - 590px));
        }
        .sec-hero:after {
          right: max(24px, calc(50% - 590px));
        }
        .sec-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
        }
        .sec-kicker {
          font-size: 14px;
          color: var(--rv-muted);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .sec-hero h1 {
          margin: 0;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(44px, 7vw, 84px);
          line-height: 1;
          letter-spacing: -0.045em;
          font-weight: 700;
        }
        .sec-hero p {
          max-width: 620px;
          margin: 26px auto 34px;
          color: var(--rv-muted);
          font-size: 18px;
          line-height: 1.55;
        }
        .sec-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .sec-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid var(--rv-line);
          transition: transform 0.15s ease;
        }
        .sec-btn-solid {
          background: var(--rv-orange-deep);
          border-color: var(--rv-orange-deep);
          color: #fff;
        }
        .sec-btn-light {
          background: transparent;
          color: var(--rv-ink);
        }
        .sec-btn:hover {
          transform: translateY(-1px);
        }

        /* Logos marquee */
        .sec-logos {
          width: 100%;
          border-bottom: 1px solid var(--rv-line);
          overflow: hidden;
          padding: 38px 0;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 64px,
            #000 calc(100% - 64px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 64px,
            #000 calc(100% - 64px),
            transparent 100%
          );
        }
        .sec-logos-track {
          display: flex;
          align-items: center;
          gap: 64px;
          width: max-content;
          animation: logoScroll 22s linear infinite;
        }
        .sec-logos:hover .sec-logos-track {
          animation-play-state: paused;
        }
        @keyframes logoScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .sec-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #9a968f;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .sec-logo .dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: #c9c4bc;
        }

        /* Generic section */
        .sec-section {
          padding: var(--sp-10) 0;
        }
        .sec-section + .sec-section {
          border-top: 1px solid var(--rv-line);
        }
        .sec-two {
          display: grid;
          grid-template-columns: minmax(280px, 0.82fr) minmax(420px, 1.18fr);
          gap: 80px;
          align-items: center;
        }
        .sec-copy .label {
          font-size: 13px;
          color: var(--rv-orange-deep);
          margin-bottom: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .sec-copy h2 {
          margin: 0;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(32px, 4.2vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 700;
        }
        .sec-copy p {
          font-size: 16px;
          line-height: 1.6;
          color: var(--rv-muted);
          max-width: 540px;
          margin: 22px 0 0;
        }

        .sec-visual {
          min-height: 420px;
          border-radius: var(--rv-radius);
          border: 1px solid var(--rv-line);
          background: linear-gradient(160deg, #ffe8d6, #fff2e8);
          overflow: hidden;
          position: relative;
          padding: 22px;
        }
        .visual-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #8a6b54;
          font-size: 12px;
          font-weight: 500;
        }
        .visual-window {
          margin-top: 26px;
          background: #fff;
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius-sm);
          padding: 26px;
          box-shadow: 0 18px 50px rgba(24, 24, 24, 0.06);
        }
        .visual-window .tiny {
          font-size: 12px;
          color: #a08d7c;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .visual-window h3 {
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 23px;
          margin: 0 0 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .scan-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 15px;
          border-radius: 14px;
          background: #fafafa;
          border: 1px solid var(--rv-line);
          margin: 9px 0;
        }
        .scan-lock {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #ffe3cc;
          display: grid;
          place-items: center;
          color: var(--rv-orange-deep);
          flex-shrink: 0;
        }
        .scan-row b {
          font-size: 14px;
          font-weight: 600;
          display: block;
        }
        .scan-row span {
          display: block;
          font-size: 12px;
          color: #8a8781;
          margin-top: 3px;
        }
        .pill-key {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fafafa;
          border: 1px solid var(--rv-line);
          border-radius: 10px;
          padding: 11px 14px;
          margin-top: 14px;
          font-size: 13px;
          font-weight: 600;
          color: #4a4844;
        }
        .pill-key .dots {
          color: #b5b0a9;
          letter-spacing: 2px;
          margin-left: auto;
        }

        /* Feature cards */
        .sec-card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .sec-card {
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius);
          padding: 30px;
          min-height: 230px;
          background: var(--rv-white);
        }
        .sec-card:nth-child(2) {
          background: #fff1e6;
        }
        .sec-card:nth-child(3) {
          background: #ffead9;
        }
        .sec-card:nth-child(4) {
          background: #fff7ef;
        }
        .sec-card .card-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.75);
          display: grid;
          place-items: center;
          margin-bottom: 38px;
          font-size: 18px;
        }
        .sec-card h3 {
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }
        .sec-card p {
          font-size: 14px;
          line-height: 1.5;
          color: var(--rv-muted);
          margin: 0;
        }

        /* Enterprise */
        .sec-enterprise {
          background: #141414;
          color: #fff;
        }
        .sec-enterprise .label {
          color: var(--rv-orange);
        }
        .sec-enterprise p {
          color: #b4b0aa;
        }
        .sec-enterprise h2 {
          margin: 0;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(38px, 5.5vw, 60px);
          letter-spacing: -0.03em;
          font-weight: 700;
        }
        .enterprise-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 56px;
        }
        .enterprise-card {
          min-height: 200px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--rv-radius-sm);
          padding: 26px;
          background: #1e1e1e;
        }
        .enterprise-card .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: #2b2b2b;
          color: var(--rv-orange);
          margin-bottom: 40px;
          font-size: 17px;
        }
        .enterprise-card h3 {
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 19px;
          font-weight: 600;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .enterprise-card p {
          font-size: 13px;
          line-height: 1.5;
          color: #9c9890;
          margin: 0;
        }

        /* Layers accordion */
        .sec-layers {
          background: #141414;
          color: #fff;
        }
        .layers-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }
        .layers-top h2 {
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(34px, 5vw, 54px);
          letter-spacing: -0.03em;
          font-weight: 700;
          margin: 0 0 12px;
        }
        .layers-top p {
          color: #9c9890;
          font-size: 16px;
          max-width: 480px;
          margin: 0;
        }
        .layers-link {
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          padding: 11px 18px;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          white-space: nowrap;
        }
        .layers-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: start;
        }
        .layer-item {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          padding: 26px 0;
        }
        .layer-item:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        }
        .layer-head {
          display: flex;
          align-items: center;
          gap: 18px;
          cursor: pointer;
        }
        .layer-num {
          font-size: 13px;
          color: #7a766f;
          width: 24px;
          flex-shrink: 0;
        }
        .layer-head h3 {
          flex: 1;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0;
          color: #fff;
        }
        .layer-toggle {
          font-size: 20px;
          color: #9c9890;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .layer-item.open .layer-toggle {
          transform: rotate(45deg);
        }
        .layer-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .layer-item.open .layer-body {
          max-height: 280px;
        }
        .layer-body-inner {
          padding: 16px 0 0 42px;
          color: #9c9890;
          font-size: 15px;
          line-height: 1.6;
          max-width: 480px;
        }
        .layer-tags {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .layer-tag {
          background: #232323;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 13px;
          color: #dad7d1;
          max-width: 220px;
        }
        .layer-tag b {
          display: block;
          color: #fff;
          margin-bottom: 4px;
          font-size: 13px;
        }
        .diamond-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        .diamond-svg {
          width: 100%;
          max-width: 340px;
          height: auto;
        }

        /* Founders */
        .sec-founder {
          padding-bottom: 100px;
        }
        .founder-list {
          margin-top: 50px;
          display: grid;
          gap: 10px;
        }
        .founder-item {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 20px 24px;
          border: 1px solid var(--rv-line);
          border-radius: var(--rv-radius-sm);
          background: #fff3ea;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s ease;
        }
        .founder-item.show {
          opacity: 1;
          transform: translateY(0);
        }
        .founder-item:nth-child(2) {
          background: #ffe9d6;
        }
        .founder-item:nth-child(3) {
          background: #fff7ef;
        }
        .founder-item:nth-child(4) {
          background: #ffead9;
        }
        .founder-item .fi {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.75);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: var(--rv-orange-deep);
          font-weight: 700;
        }
        .founder-item span {
          font-size: 14px;
          color: #4a4844;
        }

        /* Compliance */
        .sec-compliance {
          padding: 90px 0;
        }
        .compliance-card {
          max-width: 1000px;
          margin: 0 auto;
          background: #f3f0ec;
          border-radius: 32px;
          padding: 70px 40px;
          text-align: center;
        }
        .compliance-card h2 {
          margin: 0 0 40px;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(40px, 5.5vw, 58px);
          line-height: 1;
          letter-spacing: -0.04em;
          font-weight: 700;
        }
        .soc-badge {
          width: 104px;
          height: 104px;
          margin: 0 auto 26px;
          border-radius: 50%;
          background: linear-gradient(160deg, var(--rv-orange), var(--rv-orange-deep));
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .soc-badge::after {
          content: "";
          position: absolute;
          inset: 4px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
        }
        .soc-text {
          position: relative;
          z-index: 2;
          color: #fff;
          text-align: center;
        }
        .soc-text span {
          display: block;
          font-size: 17px;
          font-weight: 700;
        }
        .soc-text small {
          display: block;
          margin-top: 4px;
          font-size: 9px;
          opacity: 0.85;
        }
        .trust-link {
          color: #6b6f76;
          text-decoration: none;
          font-size: 14px;
        }
        .trust-link:hover {
          color: var(--rv-ink);
        }

        /* FAQ */
        .sec-faq {
          padding: var(--sp-10) 0;
        }
        .faq-wrap {
          max-width: 860px;
          margin: 0 auto;
        }
        .faq-wrap h2 {
          text-align: center;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(36px, 5.5vw, 60px);
          line-height: 1;
          letter-spacing: -0.04em;
          font-weight: 700;
          margin: 0 0 60px;
        }
        .faq-item {
          border-top: 1px solid var(--rv-line);
        }
        .faq-item:last-child {
          border-bottom: 1px solid var(--rv-line);
        }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 23px 0;
          background: none;
          border: 0;
          text-align: left;
          font: inherit;
          font-size: 16px;
          font-weight: 500;
          color: var(--rv-ink);
          cursor: pointer;
        }
        .faq-plus {
          font-size: 22px;
          font-weight: 300;
          transition: transform 0.2s;
          flex-shrink: 0;
          color: var(--rv-muted);
        }
        .faq-a {
          display: none;
          padding: 0 55px 23px 0;
          color: var(--rv-muted);
          font-size: 14px;
          line-height: 1.6;
        }
        .faq-item.open .faq-a {
          display: block;
        }
        .faq-item.open .faq-plus {
          transform: rotate(45deg);
        }

        /* Final CTA */
        .sec-final {
          padding: 70px 0;
          background: #efebe5;
          border-top: 1px solid var(--rv-line);
        }
        .sec-final-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .sec-final-copy h2 {
          margin: 0 0 12px;
          font-family: "Inter Tight", "Inter", sans-serif;
          font-size: clamp(36px, 5.5vw, 58px);
          line-height: 1;
          letter-spacing: -0.04em;
          font-weight: 700;
        }
        .sec-final-copy p {
          max-width: 480px;
          margin: 0;
          color: var(--rv-muted);
          line-height: 1.5;
          font-size: 15px;
        }
        .sec-final-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        .sec-btn-outline {
          border-color: var(--rv-line);
        }

        /* Footer */
        .rv-footer {
          background: var(--rv-paper);
          border-top: 1px solid var(--rv-line);
          padding: 56px 0 26px;
        }
        .rv-footer-inner {
          width: min(1180px, calc(100% - 48px));
          margin: auto;
        }
        .rv-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 13px;
          color: #8a8781;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .sec-two {
            gap: 56px;
          }
          .layers-grid {
            grid-template-columns: 1fr;
          }
          .diamond-wrap {
            order: -1;
          }
        }
        @media (max-width: 900px) {
          .rv-nav,
          .rv-actions {
            display: none;
          }
          .rv-menu {
            display: block;
            margin-left: auto;
          }
          .sec-two {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .enterprise-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sec-section {
            padding: 70px 0;
          }
        }
        @media (max-width: 600px) {
          .rv-header {
            height: 56px;
            padding: 0 16px;
          }
          .sec-wrap {
            width: calc(100% - 32px);
          }
          .sec-hero {
            min-height: 420px;
            padding: 70px 16px 60px;
          }
          .sec-hero:before,
          .sec-hero:after {
            display: none;
          }
          .sec-actions {
            flex-direction: column;
            width: min(320px, 100%);
            margin: auto;
          }
          .sec-btn {
            width: 100%;
          }
          .sec-card-grid,
          .enterprise-grid {
            grid-template-columns: 1fr;
          }
          .sec-final-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .sec-final {
            padding: 56px 20px;
          }
          .sec-final-actions {
            width: 100%;
          }
          .sec-final-actions .sec-btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}