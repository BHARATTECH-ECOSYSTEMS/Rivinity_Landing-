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
  summary?: string;
  blocks: Block[];
};

const sections: Section[] = [
  {
    id: "personal-data-we-collect",
    number: "1",
    heading: "Personal Data We Collect",
    summary: "The categories below describe the Personal Data we collect from or about you when you provide the Services.",
    blocks: [
      {
        subheading: "Registration and Profile Data.",
        body: "We collect account data at signup including your name, username, email, phone, and third-party authentication info (e.g., Google), plus billing and contact data associated with your account.",
      },
      {
        subheading: "Content and Data You Create or Provide.",
        body: "We collect content you create or upload, such as code, project files, prompts, project names, revision history, and timestamps.",
      },
      {
        subheading: "Collaboration and Group Data.",
        body: "We collect data regarding teams and organizations you belong to, permissions, comments, and interactions with content and other users through the Services.",
      },
      {
        subheading: "Usage and Interaction Data.",
        body: "We collect data about your interactions with the Services, including pages viewed, searches, prompts entered, commands run, and time spent.",
      },
      {
        subheading: "Communications.",
        body: "We collect information when you contact support or communicate with us, including your name, email, message content, and attachments.",
      },
      {
        subheading: "Payment and Transaction Data.",
        body: "We collect payment-related details. Full payment credentials are securely handled and processed by our third-party payment processor rather than stored directly on our servers.",
      },
      {
        subheading: "Device Data.",
        body: "We collect device and software data including your IP address, browser type, operating system, device identifiers, and mobile advertising identifiers where applicable.",
      },
      {
        subheading: "Location Data.",
        body: "We collect general or precise location data inferred from your IP address or device settings, with options to limit this via your device settings.",
      },
    ],
  },
  {
    id: "how-we-collect-or-receive",
    number: "2",
    heading: "How We Collect or Receive Personal Data",
    summary: "We gather information directly from you, automatically through use, and from third-party sources.",
    blocks: [
      {
        subheading: "Your Use of the Services.",
        body: "We receive data directly when you create an account, perform project or content activities, and enter prompts.",
      },
      {
        subheading: "Automatically Through Our Services.",
        body: "We collect data automatically via cookies, analytics, and similar tracing technologies during your use.",
      },
      {
        subheading: "From Cookies and Similar Technologies.",
        body: "Please cross-reference the Cookies subsection under Additional Jurisdictional Disclosures below.",
      },
      {
        subheading: "From Collaborators and Employers.",
        body: "We receive data when a collaborator, team, or employer manages your access to the Services.",
      },
      {
        subheading: "From Third Parties.",
        body: "We obtain data from third-party services such as authentication providers and marketing partners.",
      },
      {
        subheading: "From Legal Claims, Requests, and Orders.",
        body: "We may receive data in connection with legal claims, official requests, or legal orders.",
      },
    ],
  },
  {
    id: "how-we-use-personal-data",
    number: "3",
    heading: "How We Use Personal Data",
    summary: "We utilize personal data to operate, secure, enhance, and market our services effectively.",
    blocks: [
      { subheading: "For Account and Profile Registration.", body: "To verify your identity and set up your user account profile." },
      { subheading: "To Provide and Maintain Our Services.", body: "To deliver core functionalities, execute commands, and process your project files." },
      { subheading: "To Communicate With You.", body: "To send service updates, technical notices, security alerts, and support messages." },
      { subheading: "For Marketing Purposes.", body: "To send promotional communications about new features, updates, and events where permitted." },
      { subheading: "To Analyze, Maintain, and Enhance Our Services.", body: "To monitor usage trends, run analytics, and improve user experience and AI performance." },
      { subheading: "For Preventing Fraud, Security, and Other Malicious Activity.", body: "To detect, prevent, and respond to potential security threats, fraud, or violations." },
      { subheading: "For Legal and Compliance Purposes.", body: "To comply with legal obligations, legal processes, and enforce our terms." },
    ],
  },
  {
    id: "how-we-share-or-disclose",
    number: "4",
    heading: "How We Share or Disclose Personal Data",
    summary: "We share personal data with trusted vendors, partners, and under specific legal compliance guidelines.",
    blocks: [
      {
        subheading: "Service Providers.",
        body: "We share data with vendor categories including cloud hosting providers, analytics tools, payment processors, and customer support software.",
      },
      {
        subheading: "Users and Others.",
        body: "Certain profile and content data may be visible to other collaborators or the public depending on your sharing settings.",
      },
      {
        subheading: "As Required by Law and Similar Disclosures.",
        body: "We disclose information to law enforcement or government authorities when required by applicable legal obligations.",
      },
      {
        subheading: "Merger, Sale, or Other Asset Transfers.",
        body: "Information may be transferred as part of a corporate transaction, merger, acquisition, or sale of assets.",
      },
      {
        subheading: "Affiliates.",
        body: "We may share data with corporate subsidiaries and affiliates under common control.",
      },
      {
        subheading: "Third Party App Integrations.",
        body: "Data is shared with external applications when you choose to connect third-party integrations to your account.",
      },
      {
        subheading: "Consent.",
        body: "We may disclose your data with your explicit consent or according to your direct instructions.",
      },
    ],
  },
  {
    id: "your-privacy-rights",
    number: "5",
    heading: "Your Privacy Rights and Choices",
    summary: "You retain rights to manage, access, or delete your personal information.",
    blocks: [
      {
        subheading: "Your Privacy Rights",
        body: "Depending on your jurisdiction, you may have legal rights concerning your data:",
        list: [
          "Access and Data Portability",
          "Deletion of your personal data",
          "Opt out of Sale or Sharing",
          "Correction of inaccurate data",
          "Right to Appeal decisions regarding your requests",
        ],
      },
      {
        subheading: "Exercising Your Rights",
        body: "You can submit a rights request by contacting us directly. We will complete identity verification and support authorized-agent processes where applicable.",
      },
      {
        subheading: "Additional Choices and Preferences",
        list: [
          "Marketing Communications — unsubscribe via the link provided in any promotional email.",
          "App Notification Preferences — update toggle settings directly inside your account profile.",
        ],
      },
    ],
  },
  {
    id: "additional-jurisdictional-disclosures",
    number: "6",
    heading: "Additional Jurisdictional Disclosures",
    summary: "Specific regional provisions apply depending on whether you reside in the EU, UK, or under state laws like the CCPA.",
    blocks: [
      {
        subheading: "Legal Bases",
        body: "If subject to GDPR or UK GDPR, we process data based on consent, contract fulfillment, compliance with legal obligations, and legitimate business interests.",
      },
      {
        subheading: "EU Representative and Your Rights",
        body: "EEA and UK users can exercise rights or file complaints with their local supervisory authority by reaching out to our designated privacy contact.",
      },
      {
        subheading: "Cookies",
        body: "We use cookie categories to optimize site performance and delivery:",
        list: [
          "Strictly Necessary Cookies",
          "Functional Cookies",
          "Analytical or Performance Cookies",
          "Marketing Related Cookies",
        ],
      },
      {
        subheading: "Notice at Collection",
        body: "A summary of data categories collected, processing purposes, and sharing practices under state privacy laws like the CCPA is detailed in preceding sections.",
      },
    ],
  },
  {
    id: "children",
    number: "7",
    heading: "Children",
    summary: "Our services are not intended for minors under the minimum age requirement.",
    blocks: [
      {
        body: "Rivinity's services are intended for users who are at least 18 years old. We do not knowingly collect personal data from children. If we learn that we have inadvertently collected data from a child without proper parental consent, we will take steps to delete it promptly.",
      },
    ],
  },
  {
    id: "security",
    number: "8",
    heading: "Security",
    summary: "We employ technical and organizational safeguards to protect your personal data.",
    blocks: [
      {
        body: "We implement industry-standard technical and organizational security measures to protect data against unauthorized access, loss, or alteration. However, no method of transmission over the internet or electronic storage is 100% secure.",
      },
    ],
  },
  {
    id: "third-party-sites",
    number: "9",
    heading: "Third Party Sites",
    summary: "External sites linked through our platform operate under their own independent policies.",
    blocks: [
      {
        body: "Links to third-party websites or services are not covered by this Privacy Policy. We encourage you to review the separate privacy policies of any third-party services you visit.",
      },
    ],
  },
  {
    id: "cross-border-transfers",
    number: "10",
    heading: "Cross-Border Data Transfers",
    summary: "Your data may be hosted and processed internationally using compliant legal safeguards.",
    blocks: [
      {
        body: "Rivinity's services are hosted and processed globally. Your personal data may be transferred to and processed in countries outside your home jurisdiction, supported by appropriate legal data protection safeguards.",
      },
    ],
  },
  {
    id: "changes",
    number: "11",
    heading: "Changes",
    summary: "We will provide notice whenever material modifications are made to this policy.",
    blocks: [
      {
        body: "We may update this Privacy Policy from time to time. When we make material changes, we will notify you through the Services or via email prior to the changes taking effect.",
      },
    ],
  },
  {
    id: "contact",
    number: "12",
    heading: "Contact",
    summary: "Get in touch with our team if you have questions or concerns regarding your privacy.",
    blocks: [
      {
        body: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@rivinity.com or via mail at Rivinity Privacy Team.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [openPreviousVersions, setOpenPreviousVersions] = useState(false);

  return (
    <>
      <Head>
        <title>Privacy Policy - Rivinity</title>
        <meta
          name="description"
          content="Read Rivinity's Privacy Policy to learn how we collect, use, and protect your personal data."
        />
      </Head>
      <Header/>

      <main className="container">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10 pt-32 pb-20">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1a1a1a]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: August 20, 2026
          </p>

          {/* Previous versions dropdown pattern */}
          <div className="mt-2">
            <button
              onClick={() => setOpenPreviousVersions((v) => !v)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              Previous Versions
              <ChevronDown
                size={14}
                className={`transition-transform ${openPreviousVersions ? "rotate-180" : ""}`}
              />
            </button>
            {openPreviousVersions && (
              <ul className="mt-2 flex flex-col gap-1 text-sm">
                <li>
                  <a href="#" className="text-[#FF5A1F] hover:underline">
                    August 20, 2025 — Initial Release Archive
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
            Rivinity, Inc., its subsidiaries and affiliates value the privacy of individuals who use our website and related Services (collectively, the "Services"). This privacy policy ("Privacy Policy") explains how we collect, use, and share Personal Data about you when providing our Services. Beyond this Privacy Policy, your use of our Services is also subject to our{" "}
            <Link href="/terms" className="text-[#FF5A1F] hover:underline">
              Terms of Service
            </Link>
            .
          </div>

          <div className="mt-10 flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.number}. {section.heading}
                </h2>
                {section.summary && (
                  <p className="mt-2 text-sm font-medium text-gray-500">{section.summary}</p>
                )}

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
            This policy outlines our data handling practices. For specific legal inquiries, please contact our compliance team.
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