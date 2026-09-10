"use client";

import React, { useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

const FAQS = [
  {
    q: "How quickly does support respond?",
    a: "Our typical response time for general technical inquiries is within 4 hours during business days. Enterprise tier customers receive 24/7 priority support with dedicated Slack channels and sub-30 minute SLAs.",
  },
  {
    q: "Can I request a custom enterprise demo?",
    a: "Yes! Select 'Enterprise Sales' in the contact form, and our solutions engineering team will reach out to coordinate a deep-dive technical architecture and live benchmark walkthrough.",
  },
  {
    q: "Do you offer hands-on migration assistance?",
    a: "Absolutely. We provide dedicated systems engineers to help migrate your existing agent workflows, model harnesses, prompt pipelines, and vector infrastructure to Rivinity with zero downtime.",
  },
  {
    q: "Where is the Rivinity engineering team located?",
    a: "Our core engineering team operates across distributed hubs in San Francisco, Tokyo, and Berlin, with global headquarters in Lucknow, Uttar Pradesh, India.",
  },
];

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: "Email Us",
    description:
      "For developer questions, platform documentation, and general inquiries.",
    action: "support@rivinity.com",
    href: "mailto:support@rivinity.com",
  },
  {
    icon: MessageSquare,
    title: "Enterprise Sales",
    description:
      "Custom VPC clusters, dedicated H100 inference, volume discounts, and SLAs.",
    action: "sales@rivinity.com",
    href: "mailto:sales@rivinity.com",
  },
  {
    icon: Clock,
    title: "Response Guarantee",
    description:
      "Engineering team response within 4 hours. 24/7 dedicated escalation for Enterprise.",
    action: "Sub-30m Enterprise SLA",
    href: null,
  },
  {
    icon: MapPin,
    title: "Global HQ",
    description: "Rivinity Technologies Inc.\nLucknow, Uttar Pradesh, India",
    action: "Visit Office Information",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col justify-between">
      {/* Global Navigation */}
      <Header />

      {/* Main Contact Content */}
      <main className="w-full relative overflow-x-clip bg-white flex-1 pt-18 sm:pt-26 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================================================================
              SECTION 1: HERO, 4 TOP CARDS & CONTACT FORM (White & Gray-50)
              ================================================================ */}
          <section className="section section-hero text-center relative pt-4">
            {/* Centered Hero Header */}
            <div className="max-w-3xl mx-auto flex flex-col items-center mb-14 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.1] mb-6">
                Let&apos;s talk about your AI infrastructure
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                Have questions about our agentic runtime, model latency, or
                enterprise security? Our core systems team is ready to help you
                architect and scale.
              </p>
            </div>

            {/* TOP: 4 Contact Cards in a Row (Only Icons, White & Gray-50) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16 text-left">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.title}
                    className="relative rounded-3xl bg-gray-50 border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Icon Only Container (No Numbers) */}
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-gray-900 flex items-center justify-center shrink-0 shadow-xs mb-5 group-hover:border-orange-200 group-hover:text-orange-600 group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Details */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-950 tracking-tight mb-2">
                        {channel.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed whitespace-pre-line mb-6">
                        {channel.description}
                      </p>
                    </div>

                    {/* Bottom Action / Link */}
                    <div className="pt-4 border-t border-gray-200/70">
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="text-xs sm:text-sm font-semibold text-gray-950 hover:text-orange-600 transition-colors inline-flex items-center gap-1 group-hover:underline"
                        >
                          <span>{channel.action}</span>
                        </a>
                      ) : (
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">
                          {channel.action}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BELOW: Contact Form (Centered, White & Gray-50) */}
            <div
              id="contact-form"
              className="max-w-3xl mx-auto rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 md:p-12 shadow-xs text-left scroll-mt-28"
            >
              {submitted ? (
                <div className="text-center py-12 sm:py-16">
                  {/* Success Icon Only (No numbers) */}
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200 text-gray-950 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
                    <CheckCircle2 className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">
                    Message Received
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for contacting Rivinity. A systems engineer will
                    review your inquiry and follow up shortly via email.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-gray-50 hover:bg-white text-xs font-semibold text-gray-900 border border-gray-200 shadow-xs hover:border-gray-300 transition-all cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight mb-2">
                      Send a Message
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Fill out the form below and our team will get back to you
                      within 4 hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Rivera"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-950 placeholder-gray-400 focus:outline-none focus:border-gray-950 focus:bg-white transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-950 placeholder-gray-400 focus:outline-none focus:border-gray-950 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-950 focus:outline-none focus:border-gray-950 focus:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <option value="General Inquiry">
                        General Technical Inquiry
                      </option>
                      <option value="Enterprise Sales">
                        Enterprise Sales & Custom VPC Deployments
                      </option>
                      <option value="Technical Support">
                        Platform Support & Architecture Review
                      </option>
                      <option value="Partnerships">
                        Strategic Partnerships & Integrations
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your project, current stack, or technical requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-950 placeholder-gray-400 focus:outline-none focus:border-gray-950 focus:bg-white transition-all shadow-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-gray-950 hover:bg-black text-white py-3.5 px-6 rounded-2xl font-semibold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* ================================================================
              SECTION 2: FREQUENTLY ASKED QUESTIONS (Standardized Section)
              ================================================================ */}
          <FaqSection
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about our support, platform, and SLAs."
            items={FAQS}
            id="faqs"
            className="section-sm bg-white"
          />

          {/* ================================================================
              SECTION 3: PRE-FOOTER CTA (Standardized CtaSection)
              ================================================================ */}
          <CtaSection
            variant="subpage"
            title="Have questions? Our solutions team is here to help"
            description="Whether you need a custom enterprise architecture, private VPC deployment, or technical support, we're ready to partner with you."
            primaryText="Send Us a Message"
            primaryHref="#contact-form"
            secondaryText="Browse FAQs"
            secondaryHref="#faqs"
            className="section-sm"
          />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
