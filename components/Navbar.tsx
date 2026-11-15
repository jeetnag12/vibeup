"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "@/components/icons";

const navLinks = [
  { label: "Events", href: "/discover" },
  { label: "Clubs", href: "/clubs" },
  { label: "Communities", href: "/communities" },
  { label: "Crews", href: "/crews" },
  { label: "People", href: "/people" },
];

export function Logo({ className = "text-[22px]" }: { className?: string }) {
  return (
    <span
      className={`font-display font-black tracking-[-0.03em] text-white select-none ${className}`}
      style={{ fontStretch: "140%" }}
    >
      vibeup<span className="text-pink">.</span>
    </span>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href + "/"));

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 border-b border-line bg-night/85 backdrop-blur-xl">
      <div className="max-w-[1280px] h-[64px] mx-auto px-5 sm:px-6 flex items-center gap-8">
        <Link href="/" aria-label="VibeUp home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 mr-auto" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[14px] font-medium transition-colors duration-150 ${
                isActive(link.href) ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <Link
            href="/discover"
            aria-label="Search events"
            className="w-9 h-9 rounded-full grid place-items-center text-muted hover:text-white hover:bg-tile transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
          </Link>

          <Link
            href="/login"
            className="hidden sm:inline-block text-[14px] font-medium text-muted hover:text-white transition-colors"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-night text-[14px] font-semibold bg-yellow hover:bg-[#FFEA80] transition-colors rounded-full px-4 py-2"
          >
            Join free
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full grid place-items-center text-muted hover:text-white hover:bg-tile transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-night px-5 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-display font-extrabold uppercase text-[28px] leading-tight py-1 ${
                isActive(link.href) ? "text-yellow" : "text-white"
              }`}
              style={{ fontStretch: "115%" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-line flex items-center gap-4">
            <Link href="/login" className="text-[15px] font-medium text-muted hover:text-white">
              Log in
            </Link>
            <Link href="/messages" className="text-[15px] font-medium text-muted hover:text-white">
              Messages
            </Link>
            <Link href="/saved" className="text-[15px] font-medium text-muted hover:text-white">
              Saved
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
