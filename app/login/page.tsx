"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Info, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  // Clean phone input and allow only digits with readable spacing
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, ""); // digits only
    if (rawVal.length <= 10) {
      // Format as 5 digits + 5 digits: 98765 43210
      if (rawVal.length > 5) {
        setPhoneNumber(`${rawVal.slice(0, 5)} ${rawVal.slice(5)}`);
      } else {
        setPhoneNumber(rawVal);
      }
    }
    if (error) setError(null);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phoneNumber.replace(/\D/g, "");

    if (!digitsOnly) {
      setError("PHONE NUMBER REQUIRED");
      return;
    }

    if (digitsOnly.length !== 10 || !/^[6-9]\d{9}$/.test(digitsOnly)) {
      setError("PLEASE ENTER A VALID 10-DIGIT MOBILE NUMBER");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Save formatted phone safely in sessionStorage for the upcoming OTP screen
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("vibeup_auth_phone", `+91 ${phoneNumber}`);
      } catch {
        // Fallback gracefully if storage blocked
      }
    }

    // Brief realistic local transition to OTP screen
    setTimeout(() => {
      router.push("/otp");
    }, 600);
  };

  const handleGoogleClick = () => {
    setGoogleNotice(true);
    setTimeout(() => {
      setGoogleNotice(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ================================================== */}
      {/* MINIMAL AUTHENTICATION HEADER */}
      {/* ================================================== */}
      <header className="w-full h-[64px] border-b border-[#1A1A1A]/60 bg-[rgba(9,9,11,0.8)] backdrop-blur-md relative z-20">
        <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* VibeUp Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded-[4px] p-1"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0 shadow-[0_0_10px_#8B5CF6]"
              aria-hidden="true"
            />
            <span className="text-white font-bold text-lg tracking-tight font-sans">
              VIBEUP
            </span>
          </Link>

          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-white transition-colors p-1.5 rounded-[4px] hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </header>

      {/* ================================================== */}
      {/* MAIN AUTHENTICATION CONTAINER */}
      {/* ================================================== */}
      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ------------------------------------------------ */}
          {/* DESKTOP LEFT SIDE: VIBEUP BRAND AREA */}
          {/* ------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-8 space-y-6"
          >
            {/* Brand Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#1A1A1A] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-mono text-xs text-[#666666] uppercase tracking-wider">
                BANGALORE NIGHTLIFE PLATFORM
              </span>
            </div>

            {/* Brand Title */}
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] font-bold tracking-widest uppercase block mb-1">
                VIBEUP
              </span>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight leading-tight">
                FIND YOUR CROWD.
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base text-[#666666] font-sans leading-relaxed max-w-md">
              Discover events, meet your people and make plans for the night.
            </p>

            {/* Social Nightlife Highlights */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]/80 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                </span>
                <div>
                  <span className="font-sans font-bold text-xs text-white block">
                    Curated Nightlife & Underground Events
                  </span>
                  <span className="font-mono text-[11px] text-[#666666]">
                    Techno, House, Hip-hop and Live gigs across Bangalore
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]/80 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs text-[#EC4899] font-bold">
                    👥
                  </span>
                </span>
                <div>
                  <span className="font-sans font-bold text-xs text-white block">
                    Real Event Crews & Social Plans
                  </span>
                  <span className="font-mono text-[11px] text-[#666666]">
                    Join or create crews so you never have to go out alone
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------ */}
          {/* RIGHT SIDE (OR CENTERED ON MOBILE): LOGIN CARD */}
          {/* ------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-6 w-full max-w-[460px] mx-auto"
          >
            <div className="rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl relative">
              {/* Mobile-Only Compact Brand Badge */}
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
                <span className="font-mono text-[11px] text-[#8B5CF6] font-bold uppercase tracking-widest">
                  VIBEUP · FIND YOUR CROWD
                </span>
              </div>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  WELCOME BACK
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1.5 leading-relaxed">
                  Log in to continue discovering your next night.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleContinue} noValidate className="space-y-4">
                {/* Phone Input Field */}
                <div>
                  <label
                    htmlFor="mobile-number-input"
                    className="block text-xs font-mono text-[#666666] uppercase tracking-wider mb-2 font-medium"
                  >
                    MOBILE NUMBER
                  </label>

                  <div
                    className={`flex items-center rounded-xl bg-[#111111] border transition-colors ${
                      error
                        ? "border-[#EF4444] focus-within:border-[#EF4444]"
                        : "border-[#1A1A1A] focus-within:border-[#8B5CF6]"
                    }`}
                  >
                    {/* Country Code Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-3 border-r border-[#1A1A1A] text-xs font-mono text-white select-none shrink-0">
                      <span className="text-base leading-none" role="img" aria-label="India flag">
                        🇮🇳
                      </span>
                      <span className="font-bold text-[#E4E4E7]">+91</span>
                    </div>

                    {/* Phone Number Input */}
                    <input
                      id="mobile-number-input"
                      type="tel"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="98765 43210"
                      disabled={isLoading}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "phone-error-msg" : undefined}
                      className="w-full bg-transparent px-3.5 py-3 text-sm font-mono text-white placeholder-[#666666] focus:outline-none disabled:opacity-50 tracking-wider"
                    />
                  </div>

                  {/* Error State */}
                  {error && (
                    <div
                      id="phone-error-msg"
                      role="alert"
                      className="flex items-center gap-1.5 mt-2 text-xs font-mono text-[#EF4444]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>CONTINUING...</span>
                    </>
                  ) : (
                    <span>CONTINUE</span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#1A1A1A]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#111111] px-3 font-mono text-[11px] text-[#666666] uppercase tracking-wider">
                    OR
                  </span>
                </div>
              </div>

              {/* Secondary Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={isLoading}
                className="w-full py-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-xs font-mono text-white font-medium transition-colors flex items-center justify-center gap-2.5 disabled:opacity-60"
              >
                {/* Google Icon SVG */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
                  />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>

              {/* Google Notice Banner */}
              <AnimatePresence>
                {googleNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-start gap-2 text-xs font-mono text-[#D4D4D8]"
                  >
                    <Info className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <span>
                      Google authentication will be connected soon. Please use Mobile Number to continue.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Signup Link */}
              <div className="mt-6 pt-5 border-t border-[#1A1A1A]/60 text-center">
                <span className="font-mono text-xs text-[#666666]">
                  NEW TO VIBEUP?{" "}
                </span>
                <Link
                  href="/signup"
                  className="font-mono text-xs text-[#8B5CF6] hover:text-[#A78BFA] font-bold hover:underline transition-colors ml-1"
                >
                  CREATE ACCOUNT
                </Link>
              </div>

              {/* Terms of Service & Privacy Policy */}
              <p className="mt-5 text-[11px] font-sans text-[#666666] text-center leading-relaxed">
                By continuing, you agree to VibeUp&apos;s{" "}
                <Link
                  href="/terms"
                  className="text-[#666666] hover:text-white underline transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#666666] hover:text-white underline transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <footer className="w-full py-4 text-center border-t border-[#1A1A1A]/40 text-[11px] font-mono text-[#666666]">
        VIBEUP · BANGALORE NIGHTLIFE PLATFORM
      </footer>
    </main>
  );
}
