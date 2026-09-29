"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Check,
  AlertCircle,
  User,
  X,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";

// Local mock reserved/taken usernames list
const TAKEN_USERNAMES = new Set([
  "admin",
  "vibeup",
  "test",
  "jeet",
  "root",
  "support",
  "official",
  "bangalore",
]);

export default function CreateProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Profile Form States
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [hasInteractedUsername, setHasInteractedUsername] = useState(false);
  const [hasInteractedName, setHasInteractedName] = useState(false);

  // Attempt to pre-fill from signup draft in sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("vibeup_auth_signup");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) setDisplayName(parsed.fullName);
          if (parsed.username) setUsername(parsed.username.toLowerCase());
        }
      } catch {
        // Fallback gracefully
      }
    }
  }, []);

  // Photo upload handling
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoUrl(previewUrl);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Username validation helper
  const cleanUsername = username.toLowerCase().replace(/\s+/g, "");
  const isUsernameEmpty = cleanUsername.length === 0;
  const isUsernameTooShort = cleanUsername.length > 0 && cleanUsername.length < 3;
  const isUsernameTooLong = cleanUsername.length > 20;
  const isUsernameInvalidChars =
    cleanUsername.length > 0 && !/^[a-z0-9._]+$/.test(cleanUsername);
  const isUsernameTaken = TAKEN_USERNAMES.has(cleanUsername);
  const isUsernameValid =
    !isUsernameEmpty &&
    !isUsernameTooShort &&
    !isUsernameTooLong &&
    !isUsernameInvalidChars &&
    !isUsernameTaken;

  // Display Name validation helper
  const cleanDisplayName = displayName.trim();
  const isDisplayNameValid = cleanDisplayName.length >= 2;

  // Can Continue?
  const canContinue = isDisplayNameValid && isUsernameValid;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;

    // Save profile state locally in sessionStorage for subsequent onboarding steps
    if (typeof window !== "undefined") {
      try {
        const profileData = {
          photo: photoUrl,
          displayName: cleanDisplayName,
          username: cleanUsername,
          bio: bio.trim(),
        };
        sessionStorage.setItem("vibeup_profile", JSON.stringify(profileData));
      } catch {
        // Fallback
      }
    }

    // Advance to Step 2
    router.push("/choose-interests");
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ================================================== */}
      {/* ONBOARDING MINIMAL TOP HEADER */}
      {/* ================================================== */}
      <header className="w-full h-[64px] border-b border-[#1A1A1A]/60 bg-[rgba(9,9,11,0.8)] backdrop-blur-md relative z-20">
        <div className="max-w-[720px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/otp"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-white transition-colors p-1.5 rounded-[4px] hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </Link>

          {/* VibeUp Logo */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0 shadow-[0_0_10px_#8B5CF6]"
              aria-hidden="true"
            />
            <span className="text-white font-bold text-base tracking-tight font-sans">
              VIBEUP
            </span>
          </div>

          {/* Step Indicator */}
          <span className="font-mono text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full">
            STEP 1 OF 5
          </span>
        </div>
      </header>

      {/* ================================================== */}
      {/* MAIN ONBOARDING CONTENT CONTAINER */}
      {/* ================================================== */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[620px] mx-auto"
        >
          {/* Subtle Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-2 uppercase">
              <span className="text-[#8B5CF6] font-bold">1. PROFILE IDENTITY</span>
              <span>2. INTERESTS</span>
              <span>3. GENRES</span>
              <span>4. AREAS</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#111111] border border-[#1A1A1A] overflow-hidden flex">
              <div className="w-1/5 h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full transition-all duration-300" />
              <div className="w-4/5 h-full bg-transparent" />
            </div>
          </div>

          {/* Page Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
              LET&apos;S BUILD YOUR VIBE
            </h1>
            <p className="text-sm text-[#666666] font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Tell us a little about yourself. You can always change this later.
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl space-y-6">
            <form onSubmit={handleContinue} noValidate className="space-y-6">
              {/* ================================================== */}
              {/* 4. PROFILE PHOTO SECTION */}
              {/* ================================================== */}
              <div className="flex flex-col items-center justify-center text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                  aria-label="Upload profile photo"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer w-28 h-28 rounded-full bg-[#111111] border-2 border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      fileInputRef.current?.click();
                    }
                  }}
                  aria-label="Select avatar image"
                >
                  {photoUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-mono">
                        <Upload className="w-4 h-4 mb-0.5" />
                        <span>CHANGE</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#666666] group-hover:text-white transition-colors">
                      <Camera className="w-7 h-7 mb-1 text-[#8B5CF6]" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666] group-hover:text-white">
                        + ADD PHOTO
                      </span>
                    </div>
                  )}

                  {/* Remove photo button if set */}
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 border border-[#1A1A1A] text-white hover:text-[#EF4444] flex items-center justify-center transition-colors"
                      title="Remove photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="mt-2.5 flex items-center gap-3 text-xs font-mono">
                  {photoUrl ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Change photo
                    </button>
                  ) : (
                    <span className="text-[#666666]">
                      Photo is optional · You can skip for now
                    </span>
                  )}
                </div>
              </div>

              {/* ================================================== */}
              {/* 5. DISPLAY NAME FIELD */}
              {/* ================================================== */}
              <div>
                <label
                  htmlFor="display-name-input"
                  className="block text-xs font-mono text-[#666666] uppercase tracking-wider mb-1.5 font-medium"
                >
                  DISPLAY NAME <span className="text-[#8B5CF6]">*</span>
                </label>

                <div
                  className={`flex items-center rounded-xl bg-[#111111] border transition-colors ${
                    hasInteractedName && !isDisplayNameValid
                      ? "border-[#EF4444] focus-within:border-[#EF4444]"
                      : "border-[#1A1A1A] focus-within:border-[#8B5CF6]"
                  }`}
                >
                  <span className="pl-3.5 text-[#666666]">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="display-name-input"
                    type="text"
                    autoComplete="name"
                    value={displayName}
                    maxLength={40}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setHasInteractedName(true);
                    }}
                    onBlur={() => setHasInteractedName(true)}
                    placeholder="e.g. Jeet"
                    className="w-full bg-transparent px-3 py-3 text-sm font-sans text-white placeholder-[#666666] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between mt-1.5 text-xs font-mono">
                  {hasInteractedName && !isDisplayNameValid ? (
                    <span className="text-[#EF4444] inline-flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Display name is required (min 2 chars)
                    </span>
                  ) : (
                    <span className="text-[#666666]">
                      This is how people will see you on VibeUp.
                    </span>
                  )}
                  <span className="text-[#666666]">{displayName.length} / 40</span>
                </div>
              </div>

              {/* ================================================== */}
              {/* 6. USERNAME FIELD */}
              {/* ================================================== */}
              <div>
                <label
                  htmlFor="username-input"
                  className="block text-xs font-mono text-[#666666] uppercase tracking-wider mb-1.5 font-medium"
                >
                  USERNAME <span className="text-[#8B5CF6]">*</span>
                </label>

                <div
                  className={`flex items-center rounded-xl bg-[#111111] border transition-colors ${
                    hasInteractedUsername && !isUsernameValid
                      ? "border-[#EF4444] focus-within:border-[#EF4444]"
                      : isUsernameValid
                      ? "border-[#22C55E]/60 focus-within:border-[#22C55E]"
                      : "border-[#1A1A1A] focus-within:border-[#8B5CF6]"
                  }`}
                >
                  <span className="pl-3.5 font-mono text-sm font-bold text-[#8B5CF6]">
                    @
                  </span>
                  <input
                    id="username-input"
                    type="text"
                    autoComplete="username"
                    value={username}
                    maxLength={20}
                    onChange={(e) => {
                      setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""));
                      setHasInteractedUsername(true);
                    }}
                    onBlur={() => setHasInteractedUsername(true)}
                    placeholder="yourusername"
                    className="w-full bg-transparent px-2.5 py-3 text-sm font-mono text-white placeholder-[#666666] focus:outline-none"
                  />
                </div>

                {/* Validation Feedback */}
                <div className="mt-1.5 text-xs font-mono">
                  {hasInteractedUsername && isUsernameEmpty ? (
                    <span className="text-[#EF4444] inline-flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Username is required
                    </span>
                  ) : hasInteractedUsername && isUsernameTooShort ? (
                    <span className="text-[#EF4444] inline-flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Minimum 3 characters
                    </span>
                  ) : hasInteractedUsername && isUsernameInvalidChars ? (
                    <span className="text-[#EF4444] inline-flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Letters, numbers, period &amp; underscore only
                    </span>
                  ) : hasInteractedUsername && isUsernameTaken ? (
                    <span className="text-[#EF4444] inline-flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      USERNAME ALREADY TAKEN
                    </span>
                  ) : isUsernameValid ? (
                    <span className="text-[#22C55E] inline-flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      USERNAME AVAILABLE
                    </span>
                  ) : (
                    <span className="text-[#666666]">
                      Your unique VibeUp username (letters, numbers, _ and .).
                    </span>
                  )}
                </div>
              </div>

              {/* ================================================== */}
              {/* 7. BIO FIELD */}
              {/* ================================================== */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="bio-input"
                    className="block text-xs font-mono text-[#666666] uppercase tracking-wider font-medium"
                  >
                    BIO <span className="text-[#666666] font-normal lowercase">(optional)</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#666666]">
                    {bio.length} / 150
                  </span>
                </div>

                <div className="rounded-xl bg-[#111111] border border-[#1A1A1A] focus-within:border-[#8B5CF6] transition-colors p-3">
                  <textarea
                    id="bio-input"
                    rows={3}
                    maxLength={150}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell people what you're into..."
                    className="w-full bg-transparent text-sm font-sans text-white placeholder-[#666666] focus:outline-none resize-none leading-relaxed"
                  />
                </div>
                <p className="text-[11px] font-mono text-[#666666] mt-1.5">
                  e.g. Techno nights • Bangalore • Always looking for a good crowd
                </p>
              </div>

              {/* ================================================== */}
              {/* 8. LIVE PROFILE PREVIEW */}
              {/* ================================================== */}
              <div className="pt-2 border-t border-[#1A1A1A]/60">
                <span className="text-[10px] font-mono text-[#8B5CF6] uppercase font-bold tracking-widest block mb-2.5">
                  PROFILE PREVIEW
                </span>

                <div className="p-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-start gap-4">
                  {/* Avatar Preview */}
                  <div className="w-14 h-14 rounded-full bg-[#111111] border border-[#1A1A1A] shrink-0 overflow-hidden flex items-center justify-center">
                    {photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photoUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-base font-bold text-[#8B5CF6]">
                        {cleanDisplayName ? cleanDisplayName.charAt(0).toUpperCase() : "V"}
                      </span>
                    )}
                  </div>

                  {/* Details Preview */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-sm text-white truncate">
                        {cleanDisplayName || "Your Name"}
                      </span>
                      <span className="text-[9px] font-mono text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-1.5 py-0.5 rounded uppercase font-semibold">
                        NEW VIBE
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#666666] block mt-0.5">
                      @{cleanUsername || "yourusername"}
                    </span>

                    <p className="text-xs text-[#666666] font-sans mt-1.5 line-clamp-2 leading-relaxed">
                      {bio.trim() ||
                        "Techno nights • Bangalore • Always looking for a good crowd"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================================================== */}
              {/* 9. CONTINUE BUTTON */}
              {/* ================================================== */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!canContinue}
                  className="w-full py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#111111] disabled:text-[#666666] disabled:border disabled:border-[#1A1A1A] disabled:cursor-not-allowed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-[0.99]"
                >
                  CONTINUE
                </button>

                {!canContinue && (
                  <p className="text-center text-[11px] font-mono text-[#666666] mt-2">
                    Enter a valid Display Name and Username to continue
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Accent */}
      <footer className="w-full py-4 text-center border-t border-[#1A1A1A]/40 text-[11px] font-mono text-[#666666]">
        VIBEUP · ONBOARDING STEP 1 OF 5
      </footer>
    </main>
  );
}
