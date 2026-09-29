"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Clubs", href: "/clubs" },
  { label: "Communities", href: "#communities" },
  { label: "Crews", href: "/crews/c1" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 h-[64px] border-b border-[#2A2A35] bg-[rgba(9,9,11,0.85)] backdrop-blur-[20px]">
      <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left Side: Logo */}
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

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors duration-200"
              style={{ fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Icon */}
          <button
            type="button"
            aria-label="Search"
            className="text-[#A1A1AA] hover:text-white transition-colors duration-200 p-1.5 rounded-md hover:bg-white/5 focus:outline-none"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Sign In (Desktop) */}
          <Link
            href="/signin"
            className="hidden sm:inline-flex text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors duration-200 px-2 py-1"
          >
            Sign in
          </Link>

          {/* Join VibeUp Button (Visible on Desktop & Mobile) */}
          <Link
            href="/join"
            className="inline-flex items-center justify-center text-white text-sm font-medium rounded-[8px] bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors duration-200 shadow-sm"
            style={{ padding: "8px 18px" }}
          >
            Join VibeUp
          </Link>

          {/* Mobile Hamburger Menu Icon */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#A1A1AA] hover:text-white transition-colors duration-200 p-1.5 rounded-md hover:bg-white/5 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#2A2A35] bg-[#09090B]/95 backdrop-blur-[20px] px-6 py-5 flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#A1A1AA] hover:text-white text-base font-medium py-1 transition-colors duration-200"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#2A2A35] flex items-center justify-between">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
