"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Info, Sparkles, User, AtSign, Calendar as CalendarIcon, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reserved usernames for mock validation
const RESERVED_USERNAMES = new Set([
  "admin",
  "vibeup",
  "support",
  "root",
  "help",
  "team",
  "official",
  "bangalore",
]);

export default function SignupPage() {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Error states per field
  const [errors, setErrors] = useState<{
    fullName?: string;
    username?: string;
    phone?: string;
    dob?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  // Phone input formatting (5 + 5 digits)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    if (rawVal.length <= 10) {
      if (rawVal.length > 5) {
        setPhoneNumber(`${rawVal.slice(0, 5)} ${rawVal.slice(5)}`);
      } else {
        setPhoneNumber(rawVal);
      }
    }
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  // Username sanitization and input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/\s+/g, "");
    setUsername(val);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  // Validate age (18+)
  const validateAge = (dobString: string): boolean => {
    if (!dobString) return false;
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return false;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      fullName?: string;
      username?: string;
      phone?: string;
      dob?: string;
    } = {};

    // 1. Full name validation
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = "FULL NAME REQUIRED";
    } else if (trimmedName.length < 2) {
      newErrors.fullName = "PLEASE ENTER YOUR FULL NAME";
    }

    // 2. Username validation
    const trimmedUser = username.trim();
    if (!trimmedUser) {
      newErrors.username = "USERNAME REQUIRED";
    } else if (trimmedUser.length < 3) {
      newErrors.username = "USERNAME TOO SHORT (MIN 3 CHARACTERS)";
    } else if (trimmedUser.length > 20) {
      newErrors.username = "USERNAME TOO LONG (MAX 20 CHARACTERS)";
    } else if (!/^[a-z0-9._]+$/.test(trimmedUser)) {
      newErrors.username = "LETTERS, NUMBERS, PERIOD & UNDERSCORE ONLY";
    } else if (RESERVED_USERNAMES.has(trimmedUser)) {
      newErrors.username = "USERNAME ALREADY EXISTS";
    }

    // 3. Phone validation
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (!digitsOnly) {
      newErrors.phone = "PHONE NUMBER REQUIRED";
    } else if (digitsOnly.length !== 10 || !/^[6-9]\d{9}$/.test(digitsOnly)) {
      newErrors.phone = "PLEASE ENTER A VALID MOBILE NUMBER";
    }

    // 4. Date of birth validation (18+ nightlife platform restriction)
    if (!dateOfBirth) {
      newErrors.dob = "DATE OF BIRTH REQUIRED";
    } else if (!validateAge(dateOfBirth)) {
      newErrors.dob = "YOU MUST BE 18 OR OLDER TO USE VIBEUP.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    // Prepare profile signup payload safely in sessionStorage for upcoming onboarding flow
    if (typeof window !== "undefined") {
      try {
        const signupPayload = {
          fullName: trimmedName,
          username: trimmedUser,
          phone: `+91 ${phoneNumber}`,
          dateOfBirth,
        };
        sessionStorage.setItem(
          "vibeup_auth_signup",
          JSON.stringify(signupPayload)
        );
        sessionStorage.setItem("vibeup_auth_phone", `+91 ${phoneNumber}`);
      } catch {
        // Fallback gracefully if storage restricted
      }
    }

    // Smooth local transition to OTP screen
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
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ================================================== */}
      {/* MINIMAL AUTHENTICATION HEADER */}
      {/* ================================================== */}
      <header className="w-full h-[64px] border-b border-[#2A2A35]/60 bg-[rgba(9,9,11,0.8)] backdrop-blur-md relative z-20">
        <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* VibeUp Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded-lg p-1"
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
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </header>

      {/* ================================================== */}
      {/* MAIN AUTHENTICATION CONTAINER */}
      {/* ================================================== */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ------------------------------------------------ */}
          {/* DESKTOP LEFT SIDE: VIBEUP BRAND AREA */}
          {/* ------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-6 space-y-6"
          >
            {/* Brand Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141418] border border-[#2A2A35] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider">
                JOIN THE NIGHTLIFE NETWORK
              </span>
            </div>

            {/* Brand Title */}
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] font-bold tracking-widest uppercase block mb-1">
                VIBEUP
              </span>
              <h1 className="text-4xl xl:text-5xl font-bold font-sans text-white tracking-tight leading-tight">
                JOIN YOUR CROWD.
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base text-[#A1A1AA] font-sans leading-relaxed max-w-md">
              Create your VibeUp profile and start discovering your people.
            </p>

            {/* Platform Identity Features */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#141418] border border-[#2A2A35]/80 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                </span>
                <div>
                  <span className="font-sans font-bold text-xs text-white block">
                    Your Nightlife Taste Identity
                  </span>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Music genres, clubs and real vibe matches across Bangalore
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141418] border border-[#2A2A35]/80 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#EC4899]" />
                </span>
                <div>
                  <span className="font-sans font-bold text-xs text-white block">
                    18+ Verified Community
                  </span>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Safe, curated social spaces for real nightlife attendees
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------ */}
          {/* RIGHT SIDE (OR CENTERED ON MOBILE): SIGNUP CARD */}
          {/* ------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-6 w-full max-w-[480px] mx-auto"
          >
            <div className="rounded-[24px] bg-[#141418] border border-[#2A2A35] p-6 sm:p-8 shadow-2xl relative">
              {/* Mobile-Only Compact Brand Badge */}
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
                <span className="font-mono text-[11px] text-[#8B5CF6] font-bold uppercase tracking-widest">
                  VIBEUP · JOIN YOUR CROWD
                </span>
              </div>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                  CREATE YOUR ACCOUNT
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-1.5 leading-relaxed">
                  It only takes a minute to get started.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateAccount} noValidate className="space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label
                    htmlFor="full-name-input"
                    className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-1.5 font-medium"
                  >
                    FULL NAME
                  </label>

                  <div
                    className={`flex items-center rounded-xl bg-[#1A1A21] border transition-colors ${
                      errors.fullName
                        ? "border-[#EF4444] focus-within:border-[#EF4444]"
                        : "border-[#2A2A35] focus-within:border-[#8B5CF6]"
                    }`}
                  >
                    <span className="pl-3 text-[#71717A]">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="full-name-input"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder="Your name"
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "full-name-error" : undefined}
                      className="w-full bg-transparent px-3 py-3 text-sm font-sans text-white placeholder-[#71717A] focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  {errors.fullName && (
                    <div
                      id="full-name-error"
                      role="alert"
                      className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-[#EF4444]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* 2. Username */}
                <div>
                  <label
                    htmlFor="username-input"
                    className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-1.5 font-medium"
                  >
                    USERNAME
                  </label>

                  <div
                    className={`flex items-center rounded-xl bg-[#1A1A21] border transition-colors ${
                      errors.username
                        ? "border-[#EF4444] focus-within:border-[#EF4444]"
                        : "border-[#2A2A35] focus-within:border-[#8B5CF6]"
                    }`}
                  >
                    <span className="pl-3 text-[#71717A]">
                      <AtSign className="w-4 h-4" />
                    </span>
                    <input
                      id="username-input"
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Choose a username"
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.username)}
                      aria-describedby={errors.username ? "username-error" : undefined}
                      className="w-full bg-transparent px-3 py-3 text-sm font-mono text-white placeholder-[#71717A] focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  {errors.username && (
                    <div
                      id="username-error"
                      role="alert"
                      className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-[#EF4444]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.username}</span>
                    </div>
                  )}
                </div>

                {/* 3. Mobile Number */}
                <div>
                  <label
                    htmlFor="signup-phone-input"
                    className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-1.5 font-medium"
                  >
                    MOBILE NUMBER
                  </label>

                  <div
                    className={`flex items-center rounded-xl bg-[#1A1A21] border transition-colors ${
                      errors.phone
                        ? "border-[#EF4444] focus-within:border-[#EF4444]"
                        : "border-[#2A2A35] focus-within:border-[#8B5CF6]"
                    }`}
                  >
                    {/* Country Code Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-3 border-r border-[#2A2A35] text-xs font-mono text-white select-none shrink-0">
                      <span className="text-base leading-none" role="img" aria-label="India flag">
                        🇮🇳
                      </span>
                      <span className="font-bold text-[#E4E4E7]">+91</span>
                    </div>

                    <input
                      id="signup-phone-input"
                      type="tel"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="98765 43210"
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "signup-phone-error" : undefined}
                      className="w-full bg-transparent px-3.5 py-3 text-sm font-mono text-white placeholder-[#71717A] focus:outline-none disabled:opacity-50 tracking-wider"
                    />
                  </div>

                  {errors.phone && (
                    <div
                      id="signup-phone-error"
                      role="alert"
                      className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-[#EF4444]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* 4. Date of Birth (18+ Requirement) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="dob-input"
                      className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider font-medium"
                    >
                      DATE OF BIRTH
                    </label>
                    <span className="text-[10px] font-mono text-[#8B5CF6] uppercase font-semibold">
                      18+ REQUIRED
                    </span>
                  </div>

                  <div
                    className={`flex items-center rounded-xl bg-[#1A1A21] border transition-colors ${
                      errors.dob
                        ? "border-[#EF4444] focus-within:border-[#EF4444]"
                        : "border-[#2A2A35] focus-within:border-[#8B5CF6]"
                    }`}
                  >
                    <span className="pl-3 text-[#71717A]">
                      <CalendarIcon className="w-4 h-4" />
                    </span>
                    <input
                      id="dob-input"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        if (errors.dob) {
                          setErrors((prev) => ({ ...prev, dob: undefined }));
                        }
                      }}
                      max={new Date().toISOString().split("T")[0]}
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.dob)}
                      aria-describedby={errors.dob ? "dob-error" : undefined}
                      className="w-full bg-transparent px-3 py-3 text-sm font-mono text-white focus:outline-none disabled:opacity-50 [color-scheme:dark]"
                    />
                  </div>

                  {errors.dob && (
                    <div
                      id="dob-error"
                      role="alert"
                      className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-[#EF4444]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.dob}</span>
                    </div>
                  )}
                </div>

                {/* Create Account CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
                >
                  {isLoading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>CREATING ACCOUNT...</span>
                    </>
                  ) : (
                    <span>CREATE ACCOUNT</span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#2A2A35]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#141418] px-3 font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                    OR
                  </span>
                </div>
              </div>

              {/* Secondary Google Signup Button */}
              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-white font-medium transition-colors flex items-center justify-center gap-2.5 disabled:opacity-60"
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
                      Google sign-up will be connected soon. Please use Mobile Number to continue.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Existing Account Link */}
              <div className="mt-5 pt-4 border-t border-[#2A2A35]/60 text-center">
                <span className="font-mono text-xs text-[#A1A1AA]">
                  ALREADY HAVE AN ACCOUNT?{" "}
                </span>
                <Link
                  href="/login"
                  className="font-mono text-xs text-[#8B5CF6] hover:text-[#A78BFA] font-bold hover:underline transition-colors ml-1"
                >
                  LOG IN
                </Link>
              </div>

              {/* Terms of Service & Privacy Policy */}
              <p className="mt-4 text-[11px] font-sans text-[#71717A] text-center leading-relaxed">
                By creating an account, you agree to VibeUp&apos;s{" "}
                <Link
                  href="/terms"
                  className="text-[#A1A1AA] hover:text-white underline transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#A1A1AA] hover:text-white underline transition-colors"
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
      <footer className="w-full py-4 text-center border-t border-[#2A2A35]/40 text-[11px] font-mono text-[#71717A]">
        VIBEUP · BANGALORE NIGHTLIFE PLATFORM
      </footer>
    </main>
  );
}
