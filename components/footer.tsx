"use client";

import { useEffect, useState } from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const TOP_LEFT: FooterColumn = {
  title: "Company",
  links: [
    { label: "Our Story", href: "#" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Governance", href: "#" },
  ],
};

const TOP_RIGHT: FooterColumn = {
  title: "Legal",
  links: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Security", href: "#" },
    { label: "Compliance", href: "#" },
  ],
};

const BOTTOM_LEFT: FooterColumn = {
  title: "Resources",
  links: [
    { label: "Research", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "API Status", href: "#" },
  ],
};

const BOTTOM_RIGHT: FooterColumn = {
  title: "Product",
  links: [
    { label: "CLOS-AI", href: "#" },
    { label: "Deepfake Detection", href: "#" },
    { label: "Post Your Ad", href: "#" },
    { label: "Agent as a Platform", href: "#" },
  ],
};

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-[#8b8f8f]">
        {column.title}
      </span>
      <div className="flex flex-col gap-2.5">
        {column.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-base sm:text-lg text-[#6b6f72] transition-colors hover:text-[#16181A]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return <>{time ?? "--:--"}</>;
}

export default function Footer() {
  return (

    <footer className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-10 mb-20 overflow-x-hidden">
      <div className="mx-auto grid w-full max-w-330 grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-8">
        {/* Left: brand + globe + copyright — spans both mobile columns, becomes its own column at lg */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-10 sm:gap-16">
          <div className="flex items-center gap-3">
            <div className="grid h-16 w-12 grid-cols-2 gap-1">
              <img
                src="/logo.png"
                alt="Profile"
                width={60}
                height={60}
              />
            </div>
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#16181A]">RIVINITY</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c8c4b6]">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="absolute inset-0">
                <path d="M0 32H64" stroke="#c8c4b6" strokeWidth="1" />
                <path d="M32 0V64" stroke="#c8c4b6" strokeWidth="1" />
                <path d="M0 17H64" stroke="#c8c4b6" strokeWidth="1" />
                <path d="M0 47H64" stroke="#c8c4b6" strokeWidth="1" />
                <ellipse cx="32" cy="32" rx="15" ry="32" stroke="#c8c4b6" strokeWidth="1" />
              </svg>
              <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-0.5 rounded-lg border border-[#c8c4b6] bg-[#F4F0E6] px-3 py-2 text-center">
                <span className="text-[10px] font-medium text-[#8b8f8f]">IN</span>
                <span className="text-xs font-medium text-[#16181A]">
                  <LiveClock />
                </span>
                <span className="text-[10px] text-[#8b8f8f]">31°C</span>
              </div>
            </div> */}

            <div className="flex flex-col gap-3 pl-2 sm:pl-10">
              <span className="text-sm text-[#6b6f72]">Made in India.</span>
              <div className="h-px w-full max-w-60 bg-[#c8c4b6]" />
              <span className="text-sm text-[#6b6f72]">
                All rights reserved. Copyright © 2026 BharatTech, Inc.
              </span>
            </div>
          </div>
        </div>

        {/* Middle column: Company / Resources — sits side by side with the next column on mobile */}
        <div className="flex flex-col gap-10 sm:gap-16 lg:ml-34">
          <FooterColumnBlock column={TOP_LEFT} />
          <FooterColumnBlock column={BOTTOM_LEFT} />
        </div>
        {/* Right column: Legal / Product */}
        <div className="flex flex-col gap-10 sm:gap-16 lg:ml-20">
          <FooterColumnBlock column={TOP_RIGHT} />
          <FooterColumnBlock column={BOTTOM_RIGHT} />
        </div>
      </div>
    </footer>
  );
}