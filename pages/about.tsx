import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our mission, leadership team, and vision for helping the next billion creators build and ship software.",
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface EditorialBlock {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const teamMembers: TeamMember[] = [
  { name: "Amjad Masad", role: "Founder & CEO", image: "/team/amjad-masad.jpg" },
  { name: "Haya Odeh", role: "Co-Founder, Design", image: "/team/haya-odeh.jpg" },
  { name: "Luis Héctor Chávez", role: "CTO", image: "/team/luis-hector-chavez.jpg" },
  { name: "Michele Catasta", role: "President", image: "/team/michele-catasta.jpg" },
  { name: "Scott Kennedy", role: "VP of Engineering", image: "/team/scott-kennedy.jpg" },
];

const editorialBlocks: EditorialBlock[] = [
  {
    eyebrow: "What we're building",
    heading: "",
    body: "We're creating a platform that eliminates barriers between imagination and implementation by creating:",
    bullets: [
      "Intuitive tools that make software creation feel more natural",
      "An Agent that empowers human creativity by handling technical complexities",
    ],
    image: "/about/what-we-are-building.jpg",
    imageAlt: "What we're building",
  },
  {
    eyebrow: "What inspires us",
    heading: "",
    body: "We focus on inspiring creativity, generating value for creators, and fostering a community where:",
    bullets: [
      "Software creation is as accessible as using a smartphone",
      "Ideas become reality through conversation rather than code",
    ],
    image: "/about/what-inspires-us.jpg",
    imageAlt: "What inspires us",
    reverse: true,
  },
  {
    eyebrow: "What drives us",
    heading: "",
    body: "Our success is measured by:",
    bullets: [
      "Empowering more people to create software",
      "Democratizing software creation",
    ],
    image: "/about/what-drives-us.jpg",
    imageAlt: "What drives us",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="rp-main">
        {/* Hero */}
        <section className="rp-hero">
          <div className="rp-container">
            <div className="rp-heroContent">
              <h1 className="rp-heroTitle">
                Empowering the next billion software creators
              </h1>
              <p className="rp-heroSubtitle">
                We believe software creation should be accessible to everyone,
                not just programmers — our mission is to make turning an idea
                into working software as intuitive as drawing a picture or
                writing a story.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial alternating blocks */}
        <section className="rp-editorial">
          <div className="rp-container">
            {editorialBlocks.map((block, i) => (
              <div
                key={block.eyebrow}
                className={`rp-editorialRow ${block.reverse ? "rp-editorialRowReverse" : ""
                  }`}
              >
                <div className="rp-editorialImageWrap">
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className="rp-editorialImage"
                    priority={i === 0}
                  />
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
            <h2 className="rp-teamHeading">Meet our leadership team</h2>
            <div className="rp-teamGrid">
              {teamMembers.map((member) => (
                <div key={member.name} className="rp-teamCard">
                  <div className="rp-teamImageWrap">
                    <Image
                      src={member.image}
                      alt={`Portrait picture of ${member.name}`}
                      fill
                      sizes="(max-width: 800px) 50vw, 20vw"
                      className="rp-teamImage"
                    />
                  </div>
                  <h4 className="rp-teamName">{member.name}</h4>
                  <p className="rp-teamRole">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rp-cta">
          <div className="rp-container">
            <h2 className="rp-ctaHeading">
              Join us in democratizing software creation
            </h2>
            <Link href="/careers" className="rp-ctaLink">
              See our open positions →
            </Link>
          </div>
        </section>

        {/* Scoped styles (self-contained, no CSS module) */}
        <style jsx>{`
        /* Relies on global tokens defined in globals.css :root
           --rp-bg, --rp-orange, --rp-text, --rp-text-secondary, --rp-font
           Fallbacks provided here so this file works standalone too. */

        .rp-main {
          --local-bg: var(--rp-bg, #ffffff);
          --local-text: var(--rp-text, #1b2333);
          --local-text-secondary: var(--rp-text-secondary, #666d79);
          --local-orange: var(--rp-orange, #ff3c00);
          --local-footer-bg: hsl(33, 47%, 96%);

          background-color: var(--local-bg);
          color: var(--local-text);
          font-family: var(--rp-font, "ABCDiatype", -apple-system, BlinkMacSystemFont, sans-serif);
        }

        .rp-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- Hero ---------- */
        .rp-hero {
          padding: 96px 0 32px;
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
          font-weight: 600;
          margin: 16px 0;
        }

        @media (min-width: 1000px) {
          .rp-heroTitle {
            font-size: 72px;
          }
        }

        .rp-heroSubtitle {
          font-size: 17px;
          line-height: 1.5;
          opacity: 0.8;
          margin: 8px 0;
        }

        @media (min-width: 800px) {
          .rp-heroSubtitle {
            font-size: 20px;
          }
        }

        /* ---------- Editorial alternating rows ---------- */
        .rp-editorial {
          padding: 32px 0;
        }

        .rp-editorialRow {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: center;
          margin-bottom: 64px;
        }

        .rp-editorialRow:last-child {
          margin-bottom: 0;
        }

        @media (min-width: 1200px) {
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

        .rp-editorialImageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 24px;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.04);
        }

        .rp-editorialImage {
          object-fit: cover;
        }

        .rp-editorialText {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .rp-editorialEyebrow {
          font-size: 17px;
          font-weight: 700;
          margin: 8px 0;
        }

        @media (min-width: 800px) {
          .rp-editorialEyebrow {
            font-size: 20px;
          }
        }

        .rp-editorialBody {
          font-size: 17px;
          line-height: 1.5;
          opacity: 0.8;
          margin: 8px 0;
        }

        @media (min-width: 800px) {
          .rp-editorialBody {
            font-size: 20px;
          }
        }

        .rp-editorialList {
          list-style: disc;
          margin: 8px 0 8px 24px;
          padding: 0;
        }

        .rp-editorialList li {
          font-size: 17px;
          line-height: 1.5;
          opacity: 0.8;
          margin: 8px 0;
        }

        @media (min-width: 800px) {
          .rp-editorialList li {
            font-size: 20px;
          }
        }

        /* ---------- Team ---------- */
        .rp-team {
          padding: 32px 0 96px;
        }

        .rp-teamHeading {
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 40px;
        }

        @media (min-width: 800px) {
          .rp-teamHeading {
            font-size: 36px;
          }
        }

        .rp-teamGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (min-width: 800px) {
          .rp-teamGrid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        .rp-teamCard {
          display: flex;
          flex-direction: column;
        }

        .rp-teamImageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 14px;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.04);
        }

        .rp-teamImage {
          object-fit: cover;
        }

        .rp-teamName {
          margin-top: 8px;
          font-size: 17px;
          opacity: 0.8;
        }

        @media (min-width: 800px) {
          .rp-teamName {
            font-size: 20px;
          }
        }

        .rp-teamRole {
          font-size: 14px;
          opacity: 0.8;
        }

        /* ---------- CTA ---------- */
        .rp-cta {
          padding: 64px 0;
          text-align: center;
        }

        .rp-ctaHeading {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        @media (min-width: 800px) {
          .rp-ctaHeading {
            font-size: 30px;
          }
        }

        .rp-ctaLink {
          font-size: 17px;
          font-weight: 700;
          color: var(--local-orange);
          text-decoration: none;
        }

        @media (min-width: 800px) {
          .rp-ctaLink {
            font-size: 20px;
          }
        }

        .rp-ctaLink:hover {
          text-decoration: underline;
        }
      `}</style>
      </main>
      <Footer />
    </>
  );
}