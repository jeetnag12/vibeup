"use client";

import Link from "next/link";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const discoverLinks = [
    { label: "Events", href: "/events" },
    { label: "Clubs", href: "/clubs" },
    { label: "Communities", href: "/communities" },
    { label: "Crews", href: "/crews" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ];

  const supportLinks = [
    { label: "Help", href: "/help" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer className="w-full bg-[#09090B] border-t border-[#2A2A35] pt-[48px] pb-[32px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* 4 columns desktop, 2 columns mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand & Social */}
          <div className="col-span-2 sm:col-span-1 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0"
                aria-hidden="true"
              />
              <Link
                href="/"
                className="text-white font-bold text-lg tracking-tight font-sans"
                style={{ fontWeight: 700 }}
              >
                VIBEUP
              </Link>
            </div>

            <p className="text-[#A1A1AA] italic text-sm font-sans">
              Find Your Crowd.
            </p>

            <a
              href="https://instagram.com/vibeup.bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors duration-200 group"
              aria-label="Instagram @vibeup.bangalore"
            >
              <div className="w-8 h-8 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center justify-center group-hover:border-[#8B5CF6] group-hover:text-[#EC4899] transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs text-[#A1A1AA] group-hover:text-white transition-colors">
                @vibeup.bangalore
              </span>
            </a>
          </div>

          {/* Column 2: Discover */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-sans text-sm font-semibold tracking-wider uppercase">
              Discover
            </h4>
            <ul className="flex flex-col gap-2.5">
              {discoverLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A1A1AA] hover:text-white text-sm font-sans transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-sans text-sm font-semibold tracking-wider uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A1A1AA] hover:text-white text-sm font-sans transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-sans text-sm font-semibold tracking-wider uppercase">
              Support
            </h4>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A1A1AA] hover:text-white text-sm font-sans transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#2A2A35] pt-[24px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-mono text-[12px] text-[#A1A1AA]">
            © 2026 VibeUp. All rights reserved.
          </p>
          <p className="font-mono text-[12px] text-[#A1A1AA]">
            Made for Bangalore 🔥
          </p>
        </div>
      </div>
    </footer>
  );
}
