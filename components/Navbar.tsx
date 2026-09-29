"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Clubs", href: "/clubs" },
  { label: "Communities", href: "/communities" },
  { label: "Crews", href: "/crews" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 w-full z-50 h-[56px] border-b border-[#111111]"
      style={{
        background: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div className="max-w-[1440px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: VIBEUP brand link */}
        <Link
          href="/"
          className="text-white font-sans text-[16px] tracking-[-0.02em] select-none"
          style={{ fontWeight: 700 }}
        >
          VIBEUP
        </Link>

        {/* Center: Desktop Navigation Links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-[13px] text-[#555555] hover:text-white transition-colors duration-150 tracking-[0.02em]"
              style={{ fontWeight: 400 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <Link
            href="/discover"
            aria-label="Search"
            className="text-[#444444] hover:text-white transition-colors duration-150 p-1 flex items-center justify-center focus:outline-none"
          >
            <Search className="w-[18px] h-[18px]" />
          </Link>

          {/* Separator line (desktop only) */}
          <span
            className="hidden sm:block w-[1px] h-4 bg-[#1A1A1A]"
            aria-hidden="true"
          />

          {/* Log in Link (desktop only) */}
          <Link
            href="/login"
            className="hidden sm:inline-block font-sans text-[13px] text-[#666666] hover:text-white transition-colors duration-150"
            style={{ fontWeight: 400 }}
          >
            Log in
          </Link>

          {/* Join Button */}
          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-white text-[13px] bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors duration-150 rounded-[4px]"
            style={{
              fontWeight: 600,
              padding: "7px 18px",
            }}
          >
            Join
          </Link>

          {/* Mobile Hamburger Icon */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#444444] hover:text-white transition-colors duration-150 p-1 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b border-[#111111] px-6 py-5 flex flex-col gap-4 animate-in fade-in duration-150"
          style={{
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-[14px] text-[#555555] hover:text-white transition-colors duration-150 py-1"
                style={{ fontWeight: 400 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between gap-4">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-[13px] text-[#666666] hover:text-white transition-colors duration-150"
              style={{ fontWeight: 400 }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center text-white text-[13px] bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors duration-150 rounded-[4px]"
              style={{
                fontWeight: 600,
                padding: "7px 18px",
              }}
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
