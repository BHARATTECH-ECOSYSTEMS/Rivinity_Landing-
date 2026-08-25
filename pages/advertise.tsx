import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";

export default function AdvertisePage() {
  const [selectedFormat, setSelectedFormat] = useState('in-feed');
  const [duration, setDuration] = useState('7');

  const stats = [
    { value: '2.4M+', label: 'Monthly Active Impressions' },
    { value: '82%', label: 'Developers, CTOs & AI Engineers' },
    { value: '1.9%', label: 'Average Click-Through Rate (CTR)' },
    { value: '< 2 hrs', label: 'Ad Review & Approval Turnaround' },
  ];

  const adFormats = [
    {
      id: 'in-feed',
      title: 'Sponsored In-Feed Card',
      badge: 'Most Popular',
      price: '$299 / week',
      specs: '1200x630 Image, 80 char headline, CTA button',
      desc: 'Blends natively with organic feed listings for maximum developer engagement.',
    },
    {
      id: 'top-banner',
      title: 'Sticky Top Billboard',
      badge: 'High Visibility',
      price: '$549 / week',
      specs: '728x90 or 970x250 Banner, external URL link',
      desc: 'Pinned to the upper viewport on all desktop and mobile documentation pages.',
    },
    {
      id: 'newsletter',
      title: 'Developer Newsletter Blast',
      badge: 'Direct Reach',
      price: '$399 / send',
      specs: 'Logo, 150 words markdown, 2 primary links',
      desc: 'Featured sponsor slot sent directly to 45,000+ verified engineering subscribers.',
    },
  ];

  const faqs = [
    {
      q: 'How fast will my ad go live after payment?',
      a: 'All self-serve ads undergo a quick automated safety and compliance review. Once approved (typically under 2 hours), your ad immediately begins delivery.',
    },
    {
      q: 'Do you provide real-time analytics and tracking?',
      a: 'Yes, you receive a dedicated campaign dashboard showing real-time impressions, clicks, CTR, and referrers with UTM parameter support.',
    },
    {
      q: 'Can I change my ad creative after launching?',
      a: 'Yes, you can edit your headline, destination URL, or creative assets anytime from your advertiser dashboard without pausing the campaign.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section */}
<section className="border-b border-[#e5e7eb] px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">
            Self-Serve Ad Engine
          </span>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl leading-[1.15]">
            Put Your Product in Front of Verified Technical Decision Makers
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-[#4b5563] leading-relaxed">
            Self-serve advertising built for software tools, dev infra, and AI enterprise platforms. Launch high-impact
            campaigns in under 5 minutes with zero sales calls.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#builder"
              style={{ color: '#ffffff' }}
              className="rounded-md bg-[#111827] px-6 py-3 text-center text-sm font-semibold !text-white transition hover:bg-[#1f2937]"
            >
              Configure & Launch Ad &darr;
            </a>
            <a
              href="#formats"
              className="rounded-md border border-[#d1d5db] bg-white px-6 py-3 text-center font-mono text-sm text-[#111827] transition hover:border-[#9ca3af] hover:bg-[#f9fafb]"
            >
              View Ad Inventory & Specs
            </a>
          </div>
        </div>
      </section>

      {/* Reach & Performance Stats */}
      <section className="border-b border-[#e5e7eb] bg-[#f9fafb]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-[#e5e7eb] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={idx} className="p-6 sm:p-8">
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#111827]">{s.value}</div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#6b7280]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Inventory Formats */}
      <section id="formats" className="border-b border-[#e5e7eb] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">
              High-Impact Inventory
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
              Available Ad Placements
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
              Designed with strict ad-to-content ratios so your brand receives authentic developer attention without banner
              blindness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {adFormats.map((format) => (
              <div
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`cursor-pointer rounded-lg border p-6 sm:p-8 transition flex flex-col justify-between ${
                  selectedFormat === format.id
                    ? 'border-[#111827] bg-[#f9fafb] ring-1 ring-[#111827]'
                    : 'border-[#e5e7eb] bg-white hover:border-[#9ca3af]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#6b7280]">
                    <span>{format.badge}</span>
                    <span className="font-semibold text-[#111827]">{format.price}</span>
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#111827]">{format.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed">{format.desc}</p>
                </div>
                <div className="mt-6 sm:mt-8 border-t border-[#e5e7eb] pt-4 font-mono text-xs text-[#6b7280]">
                  <span className="font-medium text-[#111827]">Specs: </span>
                  {format.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Serve Ad Builder & Buy Flow */}
      <section id="builder" className="border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-10 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">
              Step-by-Step Configuration
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
              Create & Schedule Your Campaign
            </h2>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-8 lg:p-10 shadow-sm">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 sm:space-y-8">
              {/* Step 1: Format Selector */}
              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#4b5563]">
                  1. Selected Placement
                </label>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {adFormats.map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setSelectedFormat(f.id)}
                      className={`rounded-md border p-3 text-left font-mono text-xs transition ${
                        selectedFormat === f.id
                          ? 'border-[#111827] bg-[#111827] text-white font-semibold'
                          : 'border-[#d1d5db] bg-white text-[#4b5563] hover:border-[#9ca3af]'
                      }`}
                    >
                      {f.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Creative Details */}
              <div className="space-y-4">
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#4b5563]">
                  2. Campaign Creative & Target URL
                </label>
                <div>
                  <label className="block text-xs font-medium text-[#374151]">Ad Title / Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Next-Gen Vector Database for High-Throughput AI"
                    className="mt-1 w-full rounded-md border border-[#d1d5db] px-3.5 sm:px-4 py-2.5 text-sm text-[#111827] focus:border-[#111827] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151]">Destination URL (Include UTMs)</label>
                  <input
                    type="url"
                    placeholder="https://yourproduct.io/?ref=enterprise-ai"
                    className="mt-1 w-full rounded-md border border-[#d1d5db] px-3.5 sm:px-4 py-2.5 text-sm text-[#111827] focus:border-[#111827] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151]">Short Copy (Max 140 chars)</label>
                  <textarea
                    rows={2}
                    placeholder="Accelerate your LLM query throughput with zero cold-start latency. Start free today."
                    className="mt-1 w-full rounded-md border border-[#d1d5db] px-3.5 sm:px-4 py-2.5 text-sm text-[#111827] focus:border-[#111827] focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 3: Duration & Budget */}
              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#4b5563]">
                  3. Campaign Duration
                </label>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { days: '7', label: '7 Days', price: '$299' },
                    { days: '14', label: '14 Days', price: '$549' },
                    { days: '30', label: '30 Days (Save 15%)', price: '$999' },
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.days}
                      onClick={() => setDuration(d.days)}
                      className={`rounded-md border p-3.5 sm:p-4 text-center transition ${
                        duration === d.days
                          ? 'border-[#111827] bg-[#f9fafb] ring-1 ring-[#111827]'
                          : 'border-[#d1d5db] bg-white hover:border-[#9ca3af]'
                      }`}
                    >
                      <div className="font-bold text-sm sm:text-base text-[#111827]">{d.label}</div>
                      <div className="mt-1 font-mono text-xs text-[#6b7280]">{d.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="border-t border-[#e5e7eb] pt-6">
                <button
                  type="button"
                  style={{ color: '#ffffff' }}
                  className="w-full rounded-md bg-[#111827] py-3.5 text-sm font-semibold !text-white transition hover:bg-[#1f2937] active:scale-[0.99]"
                >
                  Proceed to Secure Checkout &rarr;
                </button>
                <p className="mt-2 text-center font-mono text-[11px] sm:text-xs text-[#9ca3af]">
                  Instant invoice generated &bull; Stripe secured &bull; 2-hour SLA review
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-[#e5e7eb] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">FAQ</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111827]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-[#e5e7eb]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5 sm:py-6">
                <h3 className="text-sm sm:text-base font-semibold text-[#111827]">{faq.q}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4b5563] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}