"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    summary:
      "The categories below describe the Personal Data we collect from or about you when you provide the Services.",
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
    summary:
      "We gather information directly from you, automatically through use, and from third-party sources.",
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
    summary:
      "We utilize personal data to operate, secure, enhance, and market our services effectively.",
    blocks: [
      {
        subheading: "For Account and Profile Registration.",
        body: "To verify your identity and set up your user account profile.",
      },
      {
        subheading: "To Provide and Maintain Our Services.",
        body: "To deliver core functionalities, execute commands, and process your project files.",
      },
      {
        subheading: "To Communicate With You.",
        body: "To send service updates, technical notices, security alerts, and support messages.",
      },
      {
        subheading: "For Marketing Purposes.",
        body: "To send promotional communications about new features, updates, and events where permitted.",
      },
      {
        subheading: "To Analyze, Maintain, and Enhance Our Services.",
        body: "To monitor usage trends, run analytics, and improve user experience and AI performance.",
      },
      {
        subheading: "For Preventing Fraud, Security, and Other Malicious Activity.",
        body: "To detect, prevent, and respond to potential security threats, fraud, or violations.",
      },
      {
        subheading: "For Legal and Compliance Purposes.",
        body: "To comply with legal obligations, legal processes, and enforce our terms.",
      },
    ],
  },
  {
    id: "how-we-share-or-disclose",
    number: "4",
    heading: "How We Share or Disclose Personal Data",
    summary:
      "We share personal data with trusted vendors, partners, and under specific legal compliance guidelines.",
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
    summary:
      "You retain rights to manage, access, or delete your personal information.",
    blocks: [
      {
        subheading: "Your Privacy Rights.",
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
        subheading: "Exercising Your Rights.",
        body: "You can submit a rights request by contacting us directly. We will complete identity verification and support authorized-agent processes where applicable.",
      },
      {
        subheading: "Additional Choices and Preferences.",
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
    summary:
      "Specific regional provisions apply depending on whether you reside in the EU, UK, or under state laws like the CCPA.",
    blocks: [
      {
        subheading: "Legal Bases.",
        body: "If subject to GDPR or UK GDPR, we process data based on consent, contract fulfillment, compliance with legal obligations, and legitimate business interests.",
      },
      {
        subheading: "EU Representative and Your Rights.",
        body: "EEA and UK users can exercise rights or file complaints with their local supervisory authority by reaching out to our designated privacy contact.",
      },
      {
        subheading: "Cookies.",
        body: "We use cookie categories to optimize site performance and delivery:",
        list: [
          "Strictly Necessary Cookies",
          "Functional Cookies",
          "Analytical or Performance Cookies",
          "Marketing Related Cookies",
        ],
      },
      {
        subheading: "Notice at Collection.",
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
    summary:
      "We employ technical and organizational safeguards to protect your personal data.",
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
    summary:
      "External sites linked through our platform operate under their own independent policies.",
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
    summary:
      "Your data may be hosted and processed internationally using compliant legal safeguards.",
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
    summary:
      "We will provide notice whenever material modifications are made to this policy.",
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
    summary:
      "Get in touch with our team if you have questions or concerns regarding your privacy.",
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
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-28 sm:pt-32 md:pt-36 pb-20"
      >
        <div className="mx-auto px-4 sm:px-6 max-w-3xl">
          
          {/* Header Container */}
          <div className="border-b border-[#E5E7EB] pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
              Privacy Policy
            </h1>
            <p className="mt-1.5 text-xs font-medium text-[#6B7280]">
              Last updated: August 20, 2026
            </p>

            {/* Dropdown Container */}
            <div className="mt-2">
              <button
                onClick={() => setOpenPreviousVersions((v) => !v)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <span>Previous Versions</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openPreviousVersions ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openPreviousVersions && (
                <ul className="mt-1.5 text-xs font-medium">
                  <li>
                    <a href="#" className="text-[#FF6B00] hover:underline">
                      August 20, 2025 — Initial Release Archive
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Introductory Notice Container */}
            <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] p-4 text-xs leading-relaxed text-[#6B7280]">
              Rivinity, Inc., its subsidiaries and affiliates value the privacy of individuals who use our website and related Services (collectively, the "Services"). This privacy policy ("Privacy Policy") explains how we collect, use, and share Personal Data about you when providing our Services. Beyond this Privacy Policy, your use of our Services is also subject to our{" "}
              <Link href="/terms" className="text-[#FF6B00] font-bold hover:underline">
                Terms of Service
              </Link>
              .
            </div>
          </div>

          {/* Main Block Stack Container */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">
                  {section.number}. {section.heading}
                </h2>
                {section.summary && (
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-[#6B7280]">
                    {section.summary}
                  </p>
                )}

                <div className="mt-3 space-y-3">
                  {section.blocks.map((block, idx) => (
                    <div key={idx} className="text-xs sm:text-sm leading-relaxed text-[#6B7280]">
                      {block.subheading ? (
                        <p>
                          <span className="font-bold text-[#1A1A1A] mr-1.5">
                            {block.subheading}
                          </span>
                          {block.body}
                        </p>
                      ) : (
                        block.body && <p>{block.body}</p>
                      )}

                      {block.list && (
                        <ul className="mt-1.5 list-disc pl-5 space-y-1">
                          {block.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
              This policy outlines our data handling practices. For specific legal inquiries, please contact our compliance team at{" "}
              <a href="mailto:privacy@rivinity.com" className="text-[#FF6B00] font-bold hover:underline">
                privacy@rivinity.com
              </a>.
            </div>
          </div>

        </div>
      </motion.main>

      <Footer />
    </div>
  );
}