"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/sections/cta-section";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

interface EditorialBlock {
  eyebrow: string;
  body: string;
  bullets: string[];
  reverse?: boolean;
}

const teamMembers: TeamMember[] = [
  { name: "Alex Rivera", role: "Founder & CEO", initials: "AR" },
  { name: "Sarah Chen", role: "Co-Founder & Head of Design", initials: "SC" },
  { name: "David Miller", role: "Chief Technology Officer", initials: "DM" },
  { name: "Elena Rostova", role: "VP of Product", initials: "ER" },
  { name: "Marcus Vance", role: "VP of Engineering", initials: "MV" },
];

const editorialBlocks: EditorialBlock[] = [
  {
    eyebrow: "What we're building",
    body: "We're creating an AI platform that eliminates barriers between idea and deployment by creating:",
    bullets: [
      "Intuitive tools that make software creation feel completely natural",
      "An AI Agent that handles complex infrastructure and architecture automatically",
    ],
  },
  {
    eyebrow: "What inspires us",
    body: "We focus on inspiring creativity, generating value for builders, and fostering a community where:",
    bullets: [
      "Software creation is as accessible as typing a prompt",
      "Complex ideas become live production apps through conversation",
    ],
    reverse: true,
  },
  {
    eyebrow: "What drives us",
    body: "Our success is measured by:",
    bullets: [
      "Empowering millions of new creators to build software",
      "Democratizing advanced AI infrastructure for everyone",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rp-main w-full pt-28 sm:pt-32 md:pt-36"
      >
          {/* Hero */}
          <section className="rp-hero">
            <div className="rp-container">
              <div className="rp-heroContent">
                <h1 className="rp-heroTitle">
                  Empowering the next generation of software creators
                </h1>
                <p className="rp-heroSubtitle">
                  We believe software creation should be accessible to everyone. Our mission is to make turning an idea into production software as intuitive as writing a sentence.
                </p>
              </div>
            </div>
          </section>

          {/* Editorial alternating blocks */}
          <section className="rp-editorial">
            <div className="rp-container">
              {editorialBlocks.map((block) => (
                <div
                  key={block.eyebrow}
                  className={`rp-editorialRow ${block.reverse ? "rp-editorialRowReverse" : ""
                    }`}
                >
                  <div className="rp-editorialGraphic">
                    <div className="rp-graphicBadge">
                      <span>{block.eyebrow}</span>
                    </div>
                  </div>
                  <div className="rp-editorialText">
                    <p className="rp-editorialEyebrow">{block.eyebrow}</p>
                    <p className="rp-editorialBody">{block.body}</p>
                    <ul className="rp-editorialList">
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Leadership team */}
          <section className="rp-team">
            <div className="rp-container">
              <h2 className="rp-teamHeading w-full max-w-5xl text-center">Meet our leadership team</h2>
              <div className="rp-teamGrid">
                {teamMembers.map((member) => (
                  <div key={member.name} className="rp-teamCard">
                    <div className="team-avatar">
                      <span className="avatar-initials">{member.initials}</span>
                    </div>
                    <h4 className="rp-teamName">{member.name}</h4>
                    <p className="rp-teamRole">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Unified CTA Section */}
          <CtaSection
            title="Join us in democratizing software creation"
            description="We are building tools that give every developer the power to create extraordinary intelligent systems."
            buttonText="See our open positions"
            buttonHref="/careers"
          />

          <style jsx>{`
            .rp-main {
              --local-bg: var(--rp-bg, #ffffff);
              --local-text: var(--rp-text, #1b2333);
              --local-text-secondary: var(--rp-text-secondary, #666d79);
              --local-orange: var(--rp-orange, #ff5a1f);

              background-color: var(--local-bg);
              color: var(--local-text);
              font-family: var(
                --rp-font,
                -apple-system,
                BlinkMacSystemFont,
                sans-serif
              );
            }

            .rp-container {
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 24px;
            }

            /* ---------- Hero ---------- */
            .rp-hero {
              padding: 80px 0 32px;
            }

            .rp-heroContent {
              max-width: 720px;
              margin: 0 auto;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .rp-heroTitle {
              font-size: 44px;
              line-height: 1.1;
              letter-spacing: -0.02em;
              font-weight: 700;
              margin: 16px 0;
            }

            @media (min-width: 1000px) {
              .rp-heroTitle {
                font-size: 64px;
              }
            }

            .rp-heroSubtitle {
              font-size: 18px;
              line-height: 1.5;
              color: var(--local-text-secondary);
              margin: 8px 0;
            }

            /* ---------- Editorial Rows ---------- */
            .rp-editorial {
              padding: 28px 0;
            }

            .rp-editorialRow {
              display: grid;
              grid-template-columns: 1fr;
              gap: 32px;
              align-items: center;
              margin-bottom: 64px;
            }

            @media (min-width: 1024px) {
              .rp-editorialRow {
                grid-template-columns: 1fr 1fr;
                gap: 64px;
              }

              .rp-editorialRowReverse {
                direction: rtl;
              }

              .rp-editorialRowReverse > :global(*) {
                direction: ltr;
              }
            }

            .rp-editorialGraphic {
              width: 100%;
              aspect-ratio: 16 / 10;
              border-radius: 20px;
              background: #f4efe9;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid rgba(0, 0, 0, 0.06);
            }

            .rp-graphicBadge {
              padding: 10px 20px;
              background: #ffffff;
              border-radius: 999px;
              font-weight: 700;
              font-size: 14px;
              color: var(--local-orange);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }

            .rp-editorialEyebrow {
              font-size: 20px;
              font-weight: 700;
              margin: 0 0 8px;
            }

            .rp-editorialBody {
              font-size: 16px;
              line-height: 1.6;
              color: var(--local-text-secondary);
              margin: 0 0 12px;
            }

            .rp-editorialList {
              list-style: disc;
              margin: 0 0 0 20px;
              padding: 0;
            }

            .rp-editorialList li {
              font-size: 15px;
              line-height: 1.5;
              color: var(--local-text-secondary);
              margin: 6px 0;
            }

            /* ---------- Team Avatars & Grid ---------- */
            .rp-team {
              padding: 48px 0 96px;
              text-align: center; /* Centers the section heading and inline contents */
            }

            .rp-teamHeading {
              width: 100%;
              max-width: none;
              text-align: center;
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 48px;
            }

            .rp-teamGrid {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 32px;
              max-width: 900px;
              margin: 0 auto;
            }

            .rp-teamCard {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              width: calc(33.333% - 22px);
              min-width: 200px;
            }

            @media (min-width: 768px) {
              .rp-teamGrid {
                grid-template-columns: repeat(3, 1fr);
              }
            }

            .rp-teamCard {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .team-avatar {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              background: linear-gradient(135deg, #ff5a1f, #ff8c42);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 16px;
              box-shadow: 0 4px 14px rgba(255, 90, 31, 0.2);
            }

            .avatar-initials {
              font-size: 32px;
              font-weight: 700;
              color: #ffffff;
              letter-spacing: 0.02em;
            }

            .rp-teamName {
              margin: 0 0 4px;
              font-size: 18px;
              font-weight: 700;
            }

            .rp-teamRole {
              margin: 0;
              font-size: 14px;
              color: var(--local-text-secondary);
            }

            /* ---------- CTA ---------- */
            .rp-cta {
              padding: 48px 0 80px;
              text-align: center;
            }

            .rp-ctaHeading {
              width: 100%;
              max-width: none;
              text-align: center;
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 16px;
            }

            .rp-ctaLink {
              font-size: 18px;
              font-weight: 700;
              color: var(--local-orange);
              text-decoration: none;
            }

            .rp-ctaLink:hover {
              text-decoration: underline;
            }
          `}</style>
        </motion.main>
        <Footer />
      </div>
  );
}