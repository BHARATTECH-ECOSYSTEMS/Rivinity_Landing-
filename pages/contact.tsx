"use client";

import { useState } from "react";
import Head from "next/head";
import { Send, Mail, MapPin, MessageSquare, ChevronDown, CheckCircle2 } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

const faqs = [
  {
    q: "How quickly does support respond?",
    a: "Our typical response time for general inquiries is within 4 hours. Enterprise plan customers receive 24/7 priority support with dedicated SLAs.",
  },
  {
    q: "Can I request a custom enterprise demo?",
    a: "Yes! Select 'Enterprise Sales' in the form topic, and our solutions engineering team will reach out to schedule a technical architecture walkthrough.",
  },
  {
    q: "Do you offer migration assistance?",
    a: "Absolutely. We provide hands-on support for migrating agents, workflows, and cloud deployments to Rivinity.",
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
    <>
      <Header />
      <Head>
        <title>Contact Us — Rivinity</title>
      </Head>
      <main className="min-h-screen pt-24 bg-[var(--color-bg-primary,#ffffff)]">
        {/* Hero & Contact Form Section */}
        <section className="section py-16 md:py-20">
          <div className="container">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl w-full max-w-none text-center">
                Let&apos;s talk about your <span className="text-[#FF6B00]">AI infrastructure</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
                Have questions about our agentic runtime, models, or enterprise security? Our team is here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
              {/* Left Column: Contact Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-6 flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">Email Us</h3>
                    <p className="text-xs text-[#6B7280] mt-1 mb-2">For general support and developer questions.</p>
                    <a href="mailto:support@rivinity.com" className="text-sm font-semibold text-[#FF6B00] hover:underline">
                      support@rivinity.com
                    </a>
                  </div>
                </div>

                <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-6 flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">Enterprise Sales</h3>
                    <p className="text-xs text-[#6B7280] mt-1 mb-2">Custom deployments, SLAs, and dedicated compute.</p>
                    <a href="mailto:sales@rivinity.com" className="text-sm font-semibold text-[#FF6B00] hover:underline">
                      sales@rivinity.com
                    </a>
                  </div>
                </div>

                <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-6 flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">Global HQ</h3>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Rivinity Technologies Inc.<br />
                      Lucknow, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xs">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Message Received</h3>
                    <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-6">
                      Thank you for reaching out! Our solutions team will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-[#FF6B00] hover:underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex Rivera"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] focus:bg-white transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] focus:bg-white transition cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Enterprise Sales">Enterprise Sales & Custom Pricing</option>
                        <option value="Technical Support">Technical Support & Docs</option>
                        <option value="Partnerships">Partnerships & Integrations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us about your project or technical requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] focus:bg-white transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#FF6B00] hover:bg-[#e66000] text-white py-3.5 px-6 rounded-xl font-semibold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick FAQ Section */}
        <section className="section py-20 bg-[#F7F7F8] border-t border-[#E5E7EB]">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#1A1A1A] sm:text-4xl w-full max-w-none text-center">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-6 cursor-pointer shadow-xs transition-colors hover:border-gray-300"
                  >
                    <summary className="font-medium list-none flex justify-between items-center text-sm sm:text-base text-[#1A1A1A]">
                      <span>{faq.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform duration-200 group-open:rotate-180">
                        <ChevronDown size={16} className="text-[#6B7280]" />
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}