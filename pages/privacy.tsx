import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Header from "../components/header";  
import Footer from "../components/footer";

type Block = {
  subheading?: string;
  body?: string;
  list?: string[];
};

type Section = {
  id: string;
  number: string;
  heading: string;
  blocks: Block[];
};

const sections: Section[] = [
  {
    id: "personal-data-we-collect",
    number: "1",
    heading: "Personal Data We Collect",
    blocks: [
      {
        body: "[Intro line: we may collect Personal Data from or about you when you provide the Services. The categories below describe the Personal Data we collect.]",
      },
      {
        subheading: "Registration and Profile Data.",
        body: "[Describe account data collected at signup — name, username, email, phone, and, if applicable, third-party auth account info (e.g. Google), plus billing/contact data associated with the account.]",
      },
      {
        subheading: "Content and Data You Create or Provide.",
        body: "[Describe content the user creates or uploads — code, project files, prompts, and other inputs, plus other data they provide such as project names, revision history, and timestamps.]",
      },
      {
        subheading: "Collaboration and Group Data.",
        body: "[Describe data about teams/organizations the user is part of, and data related to permissions, comments, and other interactions with content or users through the Services.]",
      },
      {
        subheading: "Usage and Interaction Data.",
        body: "[Describe data collected about interactions with the Services — pages viewed, searches, prompts entered, commands run, and time spent.]",
      },
      {
        subheading: "Communications.",
        body: "[Describe data collected from communications with you — name, email, message content, and attachments when contacting support or similar.]",
      },
      {
        subheading: "Payment and Transaction Data.",
        body: "[Describe payment-related data collected, and clarify that full payment credentials are handled by a payment processor rather than stored directly, if that's accurate for your setup.]",
      },
      {
        subheading: "Device Data.",
        body: "[Describe device/software data collected — IP address, browser type, OS, device identifiers, and mobile advertising identifiers if applicable.]",
      },
      {
        subheading: "Location Data.",
        body: "[Describe any general or precise location data inferred or collected, and how a user can limit this.]",
      },
    ],
  },
  {
    id: "how-we-collect-or-receive",
    number: "2",
    heading: "How We Collect or Receive Personal Data",
    blocks: [
      {
        subheading: "Your Use of the Services.",
        body: "[Describe data received directly from account creation, project/content activity, and prompts.]",
      },
      {
        subheading: "Automatically Through Our Services.",
        body: "[Describe data collected automatically through cookies, analytics, and similar technologies during use.]",
      },
      {
        subheading: "From Cookies and Similar Technologies.",
        body: "[Cross-reference the Cookies subsection below.]",
      },
      {
        subheading: "From Collaborators and Employers.",
        body: "[Describe data received when a collaborator, team, or employer manages your access to the Services.]",
      },
      {
        subheading: "From Third Parties.",
        body: "[Describe data received from third-party services — e.g. authentication providers, marketing partners — if applicable.]",
      },
      {
        subheading: "From Legal Claims, Requests, and Orders.",
        body: "[Describe data received in connection with legal claims, requests, or orders involving other parties.]",
      },
    ],
  },
  {
    id: "how-we-use-personal-data",
    number: "3",
    heading: "How We Use Personal Data",
    blocks: [
      { subheading: "For Account and Profile Registration.", body: "[Purpose description.]" },
      { subheading: "To Provide and Maintain Our Services.", body: "[Purpose description.]" },
      { subheading: "To Communicate With You.", body: "[Purpose description.]" },
      { subheading: "For Marketing Purposes.", body: "[Purpose description, if applicable.]" },
      { subheading: "To Analyze, Maintain, and Enhance Our Services.", body: "[Purpose description.]" },
      { subheading: "For Preventing Fraud, Security, and Other Malicious Activity.", body: "[Purpose description.]" },
      { subheading: "For Legal and Compliance Purposes.", body: "[Purpose description.]" },
    ],
  },
  {
    id: "how-we-share-or-disclose",
    number: "4",
    heading: "How We Share or Disclose Personal Data",
    blocks: [
      { body: "[Intro: we share Personal Data with the following categories of third parties.]" },
      { subheading: "Service Providers.", body: "[List vendor categories — hosting, analytics, payment processing, customer support tools, etc.]" },
      { subheading: "Users and Others.", body: "[Describe what's visible to other users/collaborators or publicly, if applicable.]" },
      { subheading: "As Required by Law and Similar Disclosures.", body: "[Standard legal-compliance disclosure language.]" },
      { subheading: "Merger, Sale, or Other Asset Transfers.", body: "[Standard business-transfer disclosure language.]" },
      { subheading: "Affiliates.", body: "[Describe sharing with corporate affiliates, if applicable.]" },
      { subheading: "Third Party App Integrations.", body: "[Describe data shared when a user connects a third-party integration.]" },
      { subheading: "Consent.", body: "[We may also disclose data with your consent or as instructed.]" },
    ],
  },
  {
    id: "your-privacy-rights",
    number: "5",
    heading: "Your Privacy Rights and Choices",
    blocks: [
      {
        subheading: "Your Privacy Rights",
        body: "[Describe rights available depending on jurisdiction — access, deletion, correction, appeal, opt-out of sale/sharing, etc.]",
        list: [
          "[Access and Portability]",
          "[Deletion]",
          "[Opt out of Sale/Sharing]",
          "[Correction]",
          "[Right to Appeal]",
        ],
      },
      {
        subheading: "Exercising Your Rights",
        body: "[Describe how a user submits a rights request, including any authorized-agent process and identity verification steps.]",
      },
      {
        subheading: "Additional Choices and Preferences",
        list: [
          "[Marketing Communications — unsubscribe process]",
          "[App Notification Preferences]",
        ],
      },
    ],
  },
  {
    id: "additional-jurisdictional-disclosures",
    number: "6",
    heading: "Additional Jurisdictional Disclosures",
    blocks: [
      {
        subheading: "Legal Bases",
        body: "[If subject to GDPR/UK GDPR or similar, describe the legal bases relied on for processing — consent, contract, legal obligation, legitimate interest.]",
      },
      {
        subheading: "EU Representative and Your Rights",
        body: "[If applicable, name your EU representative and how EEA/UK users can exercise their rights or file a complaint with a supervisory authority.]",
      },
      {
        subheading: "Cookies",
        body: "[Describe cookie categories used.]",
        list: [
          "[Strictly Necessary Cookies]",
          "[Functional Cookies]",
          "[Analytical or Performance Cookies]",
          "[Marketing Related Cookies]",
        ],
      },
      {
        subheading: "Notice at Collection",
        body: "[Cross-reference sections above summarizing categories collected, purposes, and third parties, as required under applicable state law (e.g. CCPA) if relevant.]",
      },
    ],
  },
  {
    id: "children",
    number: "7",
    heading: "Children",
    blocks: [
      {
        body: "[State your service's intended audience and minimum age, and your process if you learn a child's data was collected without proper consent.]",
      },
    ],
  },
  {
    id: "security",
    number: "8",
    heading: "Security",
    blocks: [
      {
        body: "[Describe, at a high level, the technical/organizational safeguards used, while noting no method of transmission or storage is 100% secure.]",
      },
    ],
  },
  {
    id: "third-party-sites",
    number: "9",
    heading: "Third Party Sites",
    blocks: [
      {
        body: "[State that links to third-party sites/services are not covered by this policy and you encourage users to review those parties' own policies.]",
      },
    ],
  },
  {
    id: "cross-border-transfers",
    number: "10",
    heading: "Cross-Border Data Transfers",
    blocks: [
      {
        body: "[Describe where the Services are hosted/processed and how data may be transferred internationally, plus any safeguards used.]",
      },
    ],
  },
  {
    id: "changes",
    number: "11",
    heading: "Changes",
    blocks: [
      {
        body: "[Describe how and when you'll notify users of material changes to this policy.]",
      },
    ],
  },
  {
    id: "contact",
    number: "12",
    heading: "Contact",
    blocks: [
      {
        body: "[Contact email and mailing address for privacy questions.]",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [openLegalBasis, setOpenLegalBasis] = useState(false);

  return (
    <>
      <Head>
        <title>Privacy Policy - Rivinity</title>
        <meta
          name="description"
          content="[Rivinity's short meta description for this page.]"
        />
      </Head>
      <Header/>

      <main className="bg-[#fafafa]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10 pt-32 pb-20">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1a1a1a]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: [Month Day, Year]
          </p>

          {/* Previous versions dropdown pattern */}
          <div className="mt-2">
            <button
              onClick={() => setOpenLegalBasis((v) => !v)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              Previous Versions
              <ChevronDown
                size={14}
                className={`transition-transform ${openLegalBasis ? "rotate-180" : ""}`}
              />
            </button>
            {openLegalBasis && (
              <ul className="mt-2 flex flex-col gap-1 text-sm">
                <li>
                  <a href="#" className="text-[#FF5A1F] hover:underline">
                    [Month Day, Year] — [link to archived version]
                  </a>
                </li>
              </ul>
            )}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-gray-700">
            [Intro paragraph: Rivinity, Inc., its subsidiaries and affiliates value
            the privacy of individuals who use our website and related Services
            (collectively, the "Services"). This privacy policy ("Privacy Policy")
            explains how we collect, use, and share Personal Data about you when
            providing our Services. Beyond this Privacy Policy, your use of our
            Services is also subject to our{" "}
            <Link href="/terms" className="text-[#FF5A1F] hover:underline">
              Terms of Service
            </Link>
            .]
          </p>

          <div className="mt-10 flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.number}. {section.heading}
                </h2>

                <div className="mt-4 flex flex-col gap-4">
                  {section.blocks.map((block, idx) => (
                    <div key={idx}>
                      {block.subheading && (
                        <h3 className="text-base font-semibold text-gray-900">
                          {block.subheading}
                        </h3>
                      )}
                      {block.body && (
                        <p className="mt-1 text-sm leading-relaxed text-gray-700">
                          {block.body}
                        </p>
                      )}
                      {block.list && (
                        <ul className="mt-1 list-disc pl-5 flex flex-col gap-1">
                          {block.list.map((item) => (
                            <li key={item} className="text-sm leading-relaxed text-gray-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-black/10 pt-6 text-xs text-gray-400">
            This page is a structural template only. All bracketed content must be
            replaced with accurate, lawyer-reviewed language before publishing —
            especially the Legal Bases, Cross-Border Transfers, and Children
            sections, which carry direct regulatory exposure (GDPR, CCPA, COPPA,
            etc. depending on your users). This is not a substitute for legal
            advice.
          </div>

          <div className="mt-8">
            <Link href="/" className="text-sm text-[#FF5A1F] hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}