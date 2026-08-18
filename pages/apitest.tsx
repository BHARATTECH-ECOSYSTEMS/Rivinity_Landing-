import Head from "next/head";
import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock3,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Activity,
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
    <>
      <Head>
        <title>API Status — Rivinity</title>

        <meta
          name="description"
          content="Real-time status and uptime information for Rivinity services and APIs."
        />
      </Head>

      <main className="min-h-screen bg-[#fafafa] text-[#171717]">

        {/* =====================================================
            HERO
        ====================================================== */}
      <Header/>
        <section className="border-b border-black/[0.08]">
          <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">

            <div className="flex flex-col items-center text-center">

              {/* <div className="mb-6 flex size-11 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm">
                <Activity className="size-5" />
              </div> */}

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                Rivinity System Status
              </p>

              <h1 className="mt-4 text-5xl font-medium tracking-[-0.055em] sm:text-6xl md:text-7xl">
                API Status
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-black/45 sm:text-base">
                Real-time information about Rivinity&apos;s APIs,
                infrastructure, and platform services.
              </p>

            </div>

          </div>
        </section>

        {/* =====================================================
            OVERALL STATUS
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">

          <div className="rounded-[1.75rem] border border-emerald-200/70 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="size-5" />
                </div>

                <div>
                  <h2 className="text-xl font-medium tracking-tight">
                    All systems operational
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    All Rivinity services are running normally.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>

                Operational
              </div>

            </div>

            {/* Uptime line */}
            <div className="mt-7 h-2 overflow-hidden rounded-full bg-emerald-50">
              <div className="h-full w-full rounded-full bg-emerald-400" />
            </div>

            <div className="mt-3 flex justify-between text-[11px] text-black/35">
              <span>Last checked just now</span>
              <span>100% operational</span>
            </div>

          </div>

        </section>

        {/* =====================================================
            SCHEDULED MAINTENANCE
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-5 pb-12 sm:px-8">

          <div className="overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-white">

            <div className="flex items-center justify-between border-b border-black/[0.08] px-6 py-5 sm:px-8">

              <div className="flex items-center gap-3">

                <div className="flex size-9 items-center justify-center rounded-full bg-black/[0.04]">
                  <Clock3 className="size-4" />
                </div>

                <h2 className="font-medium">
                  Scheduled maintenance
                </h2>

              </div>

              <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black/45">
                Upcoming
              </span>

            </div>

            <div className="p-6 sm:p-8">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                    August 18, 2026
                  </p>

                  <h3 className="mt-2 text-lg font-medium">
                    Routine infrastructure maintenance
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
                    We&apos;ll perform routine infrastructure maintenance to
                    improve reliability and performance. Some services may
                    experience brief interruptions.
                  </p>

                </div>

                <div className="shrink-0 rounded-2xl bg-[#f5f5f3] px-5 py-4">

                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock3 className="size-4 text-black/40" />
                    09:00 PM – 10:00 PM
                  </div>

                  <p className="mt-1 text-xs text-black/35">
                    IST · India Standard Time
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            SERVICES
        ====================================================== */}

        <section className="border-y border-black/[0.08] bg-white">

          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">

            <div className="mb-8">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
                System status
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.035em]">
                All services
              </h2>

              <p className="mt-2 text-sm text-black/45">
                Current operational status of Rivinity services.
              </p>

            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.08]">

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

        {/* =====================================================
            UPTIME
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">

          <div className="mb-8">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
              Reliability
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.035em]">
              Uptime
            </h2>

            <p className="mt-2 text-sm text-black/45">
              Service availability over recent periods.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-3">

            <UptimeCard
              period="Today"
              uptime="100%"
              bars={30}
            />

            <UptimeCard
              period="Last 30 days"
              uptime="99.99%"
              bars={30}
            />

            <UptimeCard
              period="Last 90 days"
              uptime="99.98%"
              bars={30}
            />

          </div>

        </section>

        {/* =====================================================
            INCIDENT HISTORY
        ====================================================== */}

        <section className="border-y border-black/[0.08] bg-[#f5f5f3]">

          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">

            <div className="mb-8 flex items-end justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
                  History
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.035em]">
                  Past incidents
                </h2>

                <p className="mt-2 text-sm text-black/45">
                  Recent incidents and maintenance events.
                </p>

              </div>

              <span className="hidden text-xs text-black/30 sm:block">
                Last 90 days
              </span>

            </div>

            <div className="space-y-3">

              {incidents.map((incident) => (
                <IncidentCard
                  key={incident.title}
                  incident={incident}
                />
              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            SUBSCRIBE
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#111111] px-6 py-10 text-white sm:px-10 sm:py-14">

            <div className="pointer-events-none absolute -right-28 -top-28 size-72 rounded-full border border-white/[0.08]" />

            <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full border border-white/[0.06]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <div className="mb-5 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                  <Bell className="size-4" />
                </div>

                <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                  Stay up to date
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
                  Get notified when there&apos;s an incident, maintenance
                  window, or important change to Rivinity services.
                </p>

              </div>

              {subscribed ? (
                <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
                  <CheckCircle2 className="size-4" />
                  You&apos;re subscribed
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/30 sm:w-64"
                  />

                  <button
                    type="submit"
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Subscribe
                    <ArrowUpRight className="size-4" />
                  </button>
                </form>
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <Footer />

      </main>
    </>
  );
}

/* ============================================================
   SERVICE ROW
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
      className={`group flex flex-col gap-4 px-5 py-5 transition hover:bg-black/[0.015] sm:flex-row sm:items-center sm:justify-between sm:px-6 ${
        !isLast ? "border-b border-black/[0.08]" : ""
      }`}
    >
      <div className="flex items-center gap-4">

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/55 transition group-hover:bg-black group-hover:text-white">
          {service.icon}
        </div>

        <div>
          <h3 className="text-sm font-medium">
            {service.name}
          </h3>

          <p className="mt-1 text-xs text-black/40">
            {service.description}
          </p>
        </div>

      </div>

      <div className="flex items-center justify-between gap-8 sm:justify-end">

        <div className="text-right">
          <p className="text-xs font-medium">
            {service.uptime}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-wider text-black/30">
            uptime
          </p>
        </div>

        <div className="flex min-w-[110px] items-center justify-end gap-2">

          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>

          <span className="text-xs font-medium text-emerald-600">
            {service.status}
          </span>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   UPTIME CARD
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
    <div className="rounded-[1.5rem] border border-black/[0.08] bg-white p-5">

      <div className="flex items-center justify-between">

        <span className="text-xs font-medium text-black/45">
          {period}
        </span>

        <span className="text-sm font-semibold">
          {uptime}
        </span>

      </div>

      <div className="mt-5 flex h-8 items-end gap-[2px]">

        {Array.from({ length: bars }).map((_, index) => (
          <div
            key={index}
            className="h-full flex-1 rounded-[2px] bg-emerald-400/80 transition hover:bg-emerald-500"
            style={{
              height:
                index % 11 === 0
                  ? "82%"
                  : index % 7 === 0
                    ? "94%"
                    : "100%",
            }}
          />
        ))}

      </div>

      <div className="mt-3 flex justify-between text-[10px] text-black/25">
        <span>90 days ago</span>
        <span>Today</span>
      </div>

    </div>
  );
}

/* ============================================================
   INCIDENT CARD
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
    <div className="rounded-[1.5rem] border border-black/[0.08] bg-white p-5 sm:p-6">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex gap-4">

          <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-black/[0.04]">
            <AlertCircle className="size-4 text-black/45" />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-sm font-medium">
                {incident.title}
              </h3>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                {incident.status}
              </span>

            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
              {incident.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-black/30">

              <span>{incident.date}</span>

              <span>•</span>

              <span>{incident.duration}</span>

            </div>

          </div>

        </div>

        <ArrowUpRight className="hidden size-4 text-black/20 sm:block" />

      </div>

    </div>
  );
}   