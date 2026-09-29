"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, CheckCircle2, RotateCw, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OTPVerificationPage() {
  const router = useRouter();

  // 6 individual digit states
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Masked phone display and origin flow
  const [displayPhone, setDisplayPhone] = useState("+91 ••••• 43210");
  const [originFlow, setOriginFlow] = useState<"login" | "signup">("login");

  // Resend timer countdown
  const [resendSeconds, setResendSeconds] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendNotice, setResendNotice] = useState(false);

  // Retrieve stored phone number on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedSignup = sessionStorage.getItem("vibeup_auth_signup");
        const storedPhone = sessionStorage.getItem("vibeup_auth_phone");

        if (storedSignup) {
          setOriginFlow("signup");
        }

        if (storedPhone) {
          // Format phone into masked style: +91 ••••• 43210
          const digits = storedPhone.replace(/\D/g, "");
          if (digits.length >= 10) {
            const last5 = digits.slice(-5);
            setDisplayPhone(`+91 ••••• ${last5}`);
          }
        }
      } catch {
        // Fallback to default masked phone
      }
    }

    // Auto-focus first input box
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for Resend Code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendSeconds > 0 && !canResend) {
      timer = setTimeout(() => {
        setResendSeconds((prev) => prev - 1);
      }, 1000);
    } else if (resendSeconds === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendSeconds, canResend]);

  // Handle single character change
  const handleDigitChange = (index: number, value: string) => {
    // Only allow numbers
    const cleanChar = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = cleanChar;
    setOtp(newOtp);

    if (error) setError(null);

    // Auto-advance to next input if digit entered
    if (cleanChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down navigation (backspace moves to previous)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste of 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);

    // Focus last filled index or the 6th box
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();

    if (error) setError(null);
  };

  // Resend action
  const handleResend = () => {
    if (!canResend) return;

    setOtp(["", "", "", "", "", ""]);
    setResendSeconds(30);
    setCanResend(false);
    setError(null);
    setResendNotice(true);

    inputRefs.current[0]?.focus();

    setTimeout(() => {
      setResendNotice(false);
    }, 4000);
  };

  // Form submit verification
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setError("ENTER THE 6-DIGIT CODE");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Development / mock verification flow
    // Standard mock OTP is 123456
    setTimeout(() => {
      if (fullOtp === "123456" || fullOtp === "000000") {
        setIsVerified(true);
        setIsLoading(false);

        // Transition to next auth step
        setTimeout(() => {
          if (originFlow === "signup") {
            // Prepared next onboarding step
            router.push("/create-profile");
          } else {
            // Logged in user enters platform
            router.push("/discover");
          }
        }, 800);
      } else {
        setIsLoading(false);
        setError("INVALID OTP. TRY AGAIN (DEV CODE: 123456)");
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* Ambient Radial Glow */}
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

          {/* Back to Previous Auth Step */}
          <Link
            href={originFlow === "signup" ? "/signup" : "/login"}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-white transition-colors p-1.5 rounded-[4px] hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CHANGE NUMBER</span>
          </Link>
        </div>
      </header>

      {/* ================================================== */}
      {/* MAIN AUTHENTICATION CONTAINER */}
      {/* ================================================== */}
      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
                PHONE VERIFICATION
              </span>
            </div>

            {/* Brand Title */}
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] font-bold tracking-widest uppercase block mb-1">
                VIBEUP
              </span>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight leading-tight">
                VERIFY YOUR NUMBER
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base text-[#666666] font-sans leading-relaxed max-w-md">
              Passwordless security for your nightlife profile. Enter your 6-digit one-time code to proceed.
            </p>

            {/* Nightlife Safety Badge */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]/80 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                </span>
                <div>
                  <span className="font-sans font-bold text-xs text-white block">
                    Verified Nightlife Identity
                  </span>
                  <span className="font-mono text-[11px] text-[#666666]">
                    Ensuring real Bangalore event-goers and authentic crews
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]/80 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#22C55E]" />
                </span>
                <div>
                  <span className="font-sans font-bold text-xs text-white block">
                    Zero Passwords to Remember
                  </span>
                  <span className="font-mono text-[11px] text-[#666666]">
                    Instant seamless login with one-time verification
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------ */}
          {/* RIGHT SIDE (OR CENTERED ON MOBILE): OTP CARD */}
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
                  VIBEUP · OTP VERIFICATION
                </span>
              </div>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  VERIFY YOUR NUMBER
                </h2>
                <div className="mt-2 text-xs sm:text-sm text-[#666666] font-sans leading-relaxed">
                  <span>We sent a verification code to </span>
                  <strong className="text-white font-mono tracking-wider">
                    {displayPhone}
                  </strong>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleVerify} noValidate className="space-y-6">
                {/* 6 Individual Digit Inputs */}
                <div>
                  <label
                    htmlFor="otp-digit-0"
                    className="block text-xs font-mono text-[#666666] uppercase tracking-wider mb-3 font-medium"
                  >
                    ENTER 6-DIGIT CODE
                  </label>

                  <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-digit-${idx}`}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete={idx === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        disabled={isLoading || isVerified}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        onPaste={handlePaste}
                        aria-label={`Digit ${idx + 1} of verification code`}
                        className={`w-11 sm:w-13 h-13 sm:h-14 rounded-xl bg-[#111111] border text-center text-xl sm:text-2xl font-mono font-bold text-white transition-all duration-150 focus:outline-none disabled:opacity-50 ${
                          error
                            ? "border-[#EF4444] focus:border-[#EF4444]"
                            : digit
                            ? "border-[#8B5CF6] "
                            : "border-[#1A1A1A] focus:border-[#8B5CF6]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Dev Helper Hint */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                    <span>Standard numeric code</span>
                    <span className="text-[#8B5CF6]/90">Dev Code: 123456</span>
                  </div>

                  {/* Error State */}
                  {error && (
                    <div
                      role="alert"
                      className="flex items-center gap-1.5 mt-2.5 text-xs font-mono text-[#EF4444]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Primary CTA / Success Transition */}
                <div>
                  {isVerified ? (
                    <div className="w-full py-3.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(34,197,94,0.3)]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>VERIFIED · REDIRECTING...</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>VERIFYING...</span>
                        </>
                      ) : (
                        <span>VERIFY &amp; CONTINUE</span>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Resend Code Section */}
              <div className="mt-6 pt-5 border-t border-[#1A1A1A]/60 text-center">
                <span className="font-mono text-xs text-[#666666] block mb-2">
                  DIDN&apos;T RECEIVE THE CODE?
                </span>

                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8B5CF6] hover:text-[#A78BFA] font-bold hover:underline transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>RESEND CODE</span>
                  </button>
                ) : (
                  <span className="font-mono text-xs text-[#666666]">
                    RESEND CODE IN <strong className="text-white">{resendSeconds}s</strong>
                  </span>
                )}
              </div>

              {/* Resend Confirmation Banner */}
              <AnimatePresence>
                {resendNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center gap-1.5 text-xs font-mono text-[#22C55E]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>NEW CODE SENT</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Change Number Option */}
              <div className="mt-5 text-center">
                <span className="font-mono text-xs text-[#666666]">
                  WRONG NUMBER?{" "}
                </span>
                <Link
                  href={originFlow === "signup" ? "/signup" : "/login"}
                  className="font-mono text-xs text-[#8B5CF6] hover:text-[#A78BFA] font-bold hover:underline transition-colors ml-1"
                >
                  CHANGE NUMBER
                </Link>
              </div>
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
