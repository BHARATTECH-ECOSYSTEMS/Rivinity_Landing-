import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

const sections = [
  {
    id: "registration",
    number: "1",
    heading: "Registration",
    summary: "[One-line summary of this section, shown in bold above the body.]",
    blocks: [
      {
        subheading: "a. Registration",
        body: "[Describe account creation requirements — accurate contact info, who may create an account, parental consent needs, etc.]",
      },
      {
        subheading: "b. Minimum Age",
        body: "[State your minimum age requirement and any parental-consent process for users below the general age of majority.]",
      },
      {
        subheading: undefined,
        body: "[Describe the user's responsibility for account security — safeguarding credentials, restricting access, and accepting responsibility for authorized use.]",
      },
    ],
  },
  {
    id: "acceptable-use",
    number: "2",
    heading: "Acceptable Use",
    summary: "[Summary — the Service may only be used lawfully and in line with these Terms.]",
    blocks: [
      {
        subheading: "a. Prohibited Conduct",
        list: [
          "[Interfering with, disrupting, or attacking the Service or its infrastructure]",
          "[Circumventing access, security, or usage limitations]",
          "[Reverse engineering or unauthorized automated access]",
          "[Uploading malware or harmful code]",
          "[Scraping or harvesting data without authorization]",
          "[Impersonating any person or entity]",
          "[Violating others' privacy or intellectual property rights]",
        ],
      },
      {
        subheading: "b. Prohibited Content",
        list: [
          "[Defamatory, obscene, or unlawful content]",
          "[Content that infringes intellectual property]",
          "[Content depicting or facilitating exploitation or abuse]",
          "[Malicious code or security exploits]",
        ],
      },
      {
        subheading: "c. Privacy Obligations",
        body: "[Describe user obligations when the Service is used to process others' personal information — lawful basis, disclosures, and security requirements.]",
      },
      {
        subheading: "d. Quotas and Limits",
        body: "[Describe any usage quotas, rate limits, or resource restrictions and how they may change.]",
      },
    ],
  },
  {
    id: "content",
    number: "3",
    heading: "Content on Rivinity",
    summary: "[Summary — you own your content; Rivinity needs certain rights to operate the Service.]",
    blocks: [
      {
        subheading: "a. Your Content and Ownership",
        body: "[Confirm the user retains ownership of content they submit, and describe the license they grant Rivinity to host, display, and operate the Service.]",
      },
      {
        subheading: "b. Third-Party Content",
        body: "[Describe how integrations or third-party content/services are treated — disclaim responsibility where appropriate.]",
      },
      {
        subheading: "c. Rivinity Ownership",
        body: "[State that the Service itself (excluding user content) — its code, design, and trademarks — remains Rivinity's property.]",
      },
      {
        subheading: "d. Copyright Violations",
        body: "[Describe your DMCA / copyright takedown process, and link to a dedicated policy page if you have one.]",
      },
    ],
  },
  {
    id: "purchases",
    number: "4",
    heading: "Purchases",
    summary: "[Summary — paid features are billed on a recurring or usage basis; describe cancellation and refund policy.]",
    blocks: [
      {
        subheading: "a. Subscription Terms",
        body: "[Describe auto-renewal, cancellation timing, and how price changes are communicated.]",
      },
      {
        subheading: "b. Pricing and Usage Fees",
        body: "[Reference your pricing page and describe when charges apply, including usage-based charges if applicable.]",
      },
      {
        subheading: "c. Refunds",
        body: "[State your refund policy, including any conditions or exceptions.]",
      },
    ],
  },
  {
    id: "changes-termination",
    number: "5",
    heading: "Notices, Changes, and Termination",
    summary: "[Summary — Rivinity may update these Terms and may suspend or terminate access under certain conditions.]",
    blocks: [
      {
        subheading: "a. Modification of Terms",
        body: "[Describe how and when updates to these Terms take effect and how users are notified.]",
      },
      {
        subheading: "b. Service Announcements",
        body: "[Describe what communications users consent to receive by using the Service.]",
      },
      {
        subheading: "c. Account Termination",
        body: "[Describe grounds for suspension/termination by either party and what happens to content/data afterward.]",
      },
      {
        subheading: "d. Survival",
        body: "[List which provisions survive termination — e.g. payment obligations, limitations of liability, indemnity.]",
      },
      {
        subheading: "e. Deprecation of Service Features",
        body: "[Describe your process for deprecating or changing features, and any notice period.]",
      },
    ],
  },
  {
    id: "disputes",
    number: "6",
    heading: "Limitations and Disclaimers",
    summary: "[Summary — the Service is provided 'as is'; liability is limited as described below. Have this section reviewed carefully by counsel.]",
    blocks: [
      {
        subheading: "a. Content Accuracy",
        body: "[Disclaim responsibility for accuracy of user- or AI-generated content where applicable.]",
      },
      {
        subheading: "b. Use at Your Own Risk",
        body: "[Standard as-is / at-your-own-risk language, reviewed by counsel for your jurisdiction.]",
      },
      {
        subheading: "c. Disclaimer of Warranties",
        body: "[Standard warranty disclaimer language — to be reviewed by counsel.]",
      },
      {
        subheading: "d. Limitation of Liability",
        body: "[Standard liability cap / exclusion of indirect damages language — to be reviewed by counsel.]",
      },
      {
        subheading: "e. Indemnification",
        body: "[Describe what the user agrees to indemnify Rivinity against.]",
      },
    ],
  },
  {
    id: "resolving-disputes",
    number: "7",
    heading: "Disputes",
    summary: "[Summary — describe your dispute resolution process, including arbitration if applicable. This section carries significant legal weight — do not publish without counsel review.]",
    blocks: [
      {
        subheading: undefined,
        body: "[Describe informal resolution process, arbitration agreement (if any), class-action waiver (if any), and any opt-out mechanism and timeline.]",
      },
      {
        subheading: "What is arbitration?",
        body: "[Plain-language explanation of what arbitration means for the user, if your Terms include an arbitration clause.]",
      },
      {
        subheading: "Can claims be part of a class action or proceeding?",
        body: "[State your policy on class actions / consolidated proceedings, if applicable.]",
      },
      {
        subheading: "What's the process to start arbitration?",
        body: "[Describe the notice and filing process.]",
      },
      {
        subheading: "How can I opt out of arbitration?",
        body: "[Describe the opt-out window and method, if offered.]",
      },
    ],
  },
  {
    id: "general-terms",
    number: "8",
    heading: "General Terms",
    summary: "[Summary of miscellaneous provisions below.]",
    blocks: [
      { subheading: "a. Feedback and Suggestions", body: "[Describe rights over user feedback/suggestions submitted about the Service.]" },
      { subheading: "b. Export Control and Sanctions", body: "[Standard export-control / sanctions compliance language.]" },
      { subheading: "c. Jurisdiction", body: "[State governing law and venue.]" },
      { subheading: "d. Entire Agreement", body: "[Standard entire-agreement / severability clause.]" },
      { subheading: "e. Assignment", body: "[State assignment restrictions, if any.]" },
      { subheading: "f. Third-Party APIs", body: "[Describe use of third-party APIs/model providers and applicable terms, if relevant.]" },
      { subheading: "g. Contact", body: "[How users can reach you with questions about these Terms.]" },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Terms of Service - Rivinity</title>
        <meta
          name="description"
          content="[Rivinity's short meta description for this page.]"
        />
      </Head>
      <Header/>
      <main className="bg-[#fafafa]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10 pt-32 pb-20">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1a1a1a]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: [Month Day, Year]
          </p>

          <div className="mt-8 rounded-lg border border-black/10 bg-black/2 p-5 text-sm text-gray-700">
            This agreement governs your access to and use of the Services and is
            between you and Rivinity, Inc. ("Rivinity", "we," "us," or "our") and is
            binding on you individually and, if applicable, on behalf of any entity
            or business you represent. Please read these Terms carefully. If you do
            not agree, you must not use the Services.
            <br />
            <br />
            [Insert your actual arbitration notice here if applicable — clearly
            summarizing that disputes are resolved through individual arbitration
            rather than court or jury trial, if that's your policy. This must be
            reviewed by counsel before publishing.]
          </div>

          <div className="mt-10 flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.number}. {section.heading}
                </h2>
                <p className="mt-2 text-sm font-medium text-gray-500">{section.summary}</p>

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
                      {("list" in block && block.list) && (
                        <ul className="mt-1 list-disc pl-5 flex flex-col gap-1">
                          {block.list.map((item: string) => (
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
            This page is a structural template only. All bracketed content — and
            especially the arbitration, liability, and dispute-resolution sections —
            must be replaced with accurate, lawyer-reviewed language before
            publishing. This is not a substitute for legal advice.
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