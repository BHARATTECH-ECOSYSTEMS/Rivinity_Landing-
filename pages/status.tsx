"use client";

import Head from "next/head";
import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock3,
  ArrowUpRight,
  Bell,
  Database,
  ShieldCheck,
  Cpu,
  Globe2,
  Zap,
  Server,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

type Service = {
  name: string;
  description: string;
  status: "Operational" | "Degraded" | "Outage";
  uptime: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    name: "Rivinity API",
    description: "Core API requests and platform services",
    status: "Operational",
    uptime: "99.99%",
    icon: <Server className="size-4" />,
  },
  {
    name: "Authentication",
    description: "Login, signup and authentication services",
    status: "Operational",
    uptime: "99.99%",
    icon: <ShieldCheck className="size-4" />,
  },
  {
    name: "AI & Inference",
    description: "AI model and inference endpoints",
    status: "Operational",
    uptime: "99.98%",
    icon: <Cpu className="size-4" />,
  },
  {
    name: "Database",
    description: "Primary data storage and database services",
    status: "Operational",
    uptime: "100%",
    icon: <Database className="size-4" />,
  },
  {
    name: "Web Dashboard",
    description: "Rivinity web application and dashboard",
    status: "Operational",
    uptime: "99.99%",
    icon: <Globe2 className="size-4" />,
  },
  {
    name: "Webhooks",
    description: "Event delivery and webhook processing",
    status: "Operational",
    uptime: "99.97%",
    icon: <Zap className="size-4" />,
  },
];

const incidents = [
  {
    date: "August 08, 2026",
    title: "Elevated API latency",
    description:
      "Some API requests experienced increased response times. The issue was identified and resolved.",
    duration: "24 minutes",
    status: "Resolved",
  },
  {
    date: "July 21, 2026",
    title: "Scheduled database maintenance",
    description:
      "Routine maintenance was completed successfully with no customer impact.",
    duration: "32 minutes",
    status: "Resolved",
  },
  {
    date: "June 14, 2026",
    title: "Authentication service interruption",
    description:
      "A temporary authentication issue affected a small number of login attempts.",
    duration: "11 minutes",
    status: "Resolved",
  },
];

export default function ApiStatusPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <Head>
        <title>API Status — Rivinity</title>
        <meta
          name="description"
          content="Real-time status and uptime information for Rivinity services and APIs."
        />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mt-20">
          <div className="mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.15]">
                API Status
              </h1>
              <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-[#6B7280] leading-relaxed">
                Real-time information about Rivinity&apos;s APIs, infrastructure, and platform services.
              </p>
            </div>
          </div>
        </section>

        {/* Overall Status Banner */}
        <section className="section py-8 sm:py-12 bg-[#F7F7F8] border-b border-[#E5E7EB]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="rounded-2xl sm:rounded-3xl border border-emerald-200 bg-white p-5 sm:p-8 shadow-xs max-w-5xl mx-auto">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-8">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                      All systems operational
                    </h2>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#6B7280]">
                      All Rivinity services are running normally.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 self-start sm:self-center bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Operational
                </div>
              </div>

              {/* Uptime Line */}
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>

              <div className="mt-3 flex justify-between text-[11px] font-semibold text-[#6B7280]">
                <span>Last checked just now</span>
                <span>100% operational</span>
              </div>
            </div>
          </div>
        </section>

        {/* Scheduled Maintenance */}
        <section className="section py-8 sm:py-12 border-b border-[#E5E7EB]">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5E7EB] bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 sm:px-8 py-4 bg-[#F7F7F8]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] text-[#1A1A1A]">
                    <Clock3 className="size-6" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    Scheduled Maintenance
                  </h2>
                </div>

                <span className="rounded-full bg-[#FF6B00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF6B00] border border-[#FF6B00]/20">
                  Upcoming
                </span>
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B00]">
                      August 18, 2026
                    </p>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-[#1A1A1A]">
                      Routine infrastructure maintenance
                    </h3>
                    <p className="mt-2 max-w-xl text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                      We&apos;ll perform routine infrastructure maintenance to improve reliability and performance. Some services may experience brief interruptions.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-[#F7F7F8] border border-[#E5E7EB] px-4 py-3.5 sm:px-5">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A1A1A]">
                      <Clock3 className="size-4 text-[#FF6B00]" />
                      09:00 PM – 10:00 PM
                    </div>
                    <p className="mt-1 text-[11px] text-[#6B7280] font-medium">
                      IST · India Standard Time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="mb-8">
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#1A1A1A]">
                All Services
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">
                Current operational status of Rivinity services.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5E7EB] bg-white shadow-xs">
              {services.map((service, index) => (
                <ServiceRow
                  key={service.name}
                  service={service}
                  isLast={index === services.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Uptime Reliability Section */}
        <section className="section py-12 sm:py-20 bg-[#F7F7F8] border-y border-[#E5E7EB]">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="mb-8">
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#1A1A1A]">
                Uptime Overview
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">
                Service availability over recent historical periods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <UptimeCard period="Today" uptime="100%" bars={30} />
              <UptimeCard period="Last 30 days" uptime="99.99%" bars={30} />
              <UptimeCard period="Last 90 days" uptime="99.98%" bars={30} />
            </div>
          </div>
        </section>

        {/* Incident History Section */}
        <section className="section py-12 sm:py-20 bg-white border-b border-[#E5E7EB]">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#1A1A1A]">
                  Past Incidents
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">
                  Recent incidents and maintenance events.
                </p>
              </div>

              <span className="hidden text-xs font-bold text-[#6B7280] sm:block">
                Last 90 days
              </span>
            </div>

            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.title} incident={incident} />
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Notifications Section */}
        <section className="section py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xs">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-[#FF6B00]/20 text-[#FF6B00]">
                    <Bell className="size-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold">
                    Stay up to date
                  </h2>
                  <p className="mt-2 max-w-md text-xs sm:text-sm text-black leading-relaxed">
                    Get notified when there&apos;s an incident, maintenance window, or important operational change to Rivinity services.
                  </p>
                </div>

                {subscribed ? (
                  <div className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#1A1A1A]">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    You&apos;re subscribed
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      className="h-12 w-full rounded-2xl border border-neutral-700 bg-neutral-900 px-4 text-sm text-white outline-none placeholder:text-white focus:border-[#FF6B00] transition-all sm:w-64"
                    />

                    <button
                      type="submit"
                      className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FF6B00] px-6 text-sm font-bold text-white transition hover:bg-[#FF6B00]/90 active:scale-95 cursor-pointer"
                    >
                      Subscribe
                      <ArrowUpRight className="size-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ============================================================
   SERVICE ROW SUB-COMPONENT
============================================================ */

function ServiceRow({
  service,
  isLast,
}: {
  service: Service;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 px-5 py-4 transition sm:flex-row sm:items-center sm:justify-between sm:px-6 hover:bg-[#F7F7F8] ${!isLast ? "border-b border-[#E5E7EB]" : ""
        }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#F7F7F8] border border-[#E5E7EB] text-[#1A1A1A] mb-6">
          {service.icon}
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#1A1A1A]">{service.name}</h3>
          <p className="mt-0.5 text-xs text-[#6B7280]">{service.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-8 sm:justify-end">
        <div className="text-right">
          <p className="text-xs font-bold text-[#1A1A1A]">{service.uptime}</p>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280]">
            uptime
          </p>
        </div>

        <div className="flex min-w-[110px] items-center justify-end gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-emerald-600">
            {service.status}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   UPTIME CARD SUB-COMPONENT
============================================================ */

function UptimeCard({
  period,
  uptime,
  bars,
}: {
  period: string;
  uptime: string;
  bars: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#6B7280]">{period}</span>
        <span className="text-xs font-extrabold text-[#1A1A1A]">{uptime}</span>
      </div>

      <div className="mt-4 flex h-7 items-end gap-[2px]">
        {Array.from({ length: bars }).map((_, index) => (
          <div
            key={index}
            className="h-full flex-1 rounded-[2px] bg-emerald-500/80 transition hover:bg-emerald-600"
            style={{
              height:
                index % 11 === 0 ? "80%" : index % 7 === 0 ? "92%" : "100%",
            }}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-between text-[10px] font-bold text-[#6B7280]">
        <span>90 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

/* ============================================================
   INCIDENT CARD SUB-COMPONENT
============================================================ */

function IncidentCard({
  incident,
}: {
  incident: {
    date: string;
    title: string;
    description: string;
    duration: string;
    status: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB] mt-4">
            <AlertCircle className="size-4 text-[#FF6B00]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                {incident.title}
              </h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-600 border border-emerald-200">
                {incident.status}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-2xl">
              {incident.description}
            </p>

            <div className="mt-3 flex items-center gap-3 text-[11px] font-bold text-[#6B7280]">
              <span>{incident.date}</span>
              <span>•</span>
              <span>{incident.duration}</span>
            </div>
          </div>
        </div>

        <ArrowUpRight className="hidden size-4 text-[#6B7280] sm:block shrink-0" />
      </div>
    </div>
  );
}