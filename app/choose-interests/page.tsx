"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Moon,
  Music,
  Flame,
  Utensils,
  Compass,
  Sparkles,
  Palette,
  Camera,
  Dumbbell,
  Smile,
  Film,
  Mic2,
  Ticket,
  Building2,
  Coffee,
  Waves,
  Mountain,
  Gamepad2,
  Wand2,
  Users,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InterestItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INTERESTS_DATA: InterestItem[] = [
  { id: "nightlife", label: "NIGHTLIFE", icon: Moon },
  { id: "music", label: "MUSIC", icon: Music },
  { id: "dance", label: "DANCE", icon: Flame },
  { id: "food", label: "FOOD", icon: Utensils },
  { id: "travel", label: "TRAVEL", icon: Compass },
  { id: "fashion", label: "FASHION", icon: Sparkles },
  { id: "art", label: "ART", icon: Palette },
  { id: "photography", label: "PHOTOGRAPHY", icon: Camera },
  { id: "fitness", label: "FITNESS", icon: Dumbbell },
  { id: "comedy", label: "COMEDY", icon: Smile },
  { id: "movies", label: "MOVIES", icon: Film },
  { id: "live-music", label: "LIVE MUSIC", icon: Mic2 },
  { id: "festivals", label: "FESTIVALS", icon: Ticket },
  { id: "rooftops", label: "ROOFTOPS", icon: Building2 },
  { id: "cafes", label: "CAFÉS", icon: Coffee },
  { id: "beaches", label: "BEACHES", icon: Waves },
  { id: "adventure", label: "ADVENTURE", icon: Mountain },
  { id: "gaming", label: "GAMING", icon: Gamepad2 },
  { id: "creative", label: "CREATIVE", icon: Wand2 },
  { id: "social-events", label: "SOCIAL EVENTS", icon: Users },
];

export default function ChooseInterestsPage() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [limitWarning, setLimitWarning] = useState(false);

  // Restore previously selected interests from sessionStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("vibeup_interests");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSelectedInterests(parsed);
          }
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== id));
      if (limitWarning) setLimitWarning(false);
    } else {
      if (selectedInterests.length >= 10) {
        setLimitWarning(true);
        setTimeout(() => setLimitWarning(false), 3000);
        return;
      }
      setSelectedInterests((prev) => [...prev, id]);
    }
  };

  const isMinMet = selectedInterests.length >= 3;

  const handleContinue = () => {
    if (!isMinMet) return;

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          "vibeup_interests",
          JSON.stringify(selectedInterests)
        );
      } catch {
        // Fallback
      }
    }

    router.push("/choose-genres");
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
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
      {/* ONBOARDING MINIMAL TOP HEADER */}
      {/* ================================================== */}
      <header className="w-full h-[64px] border-b border-[#1A1A1A]/60 bg-[rgba(9,9,11,0.8)] backdrop-blur-md relative z-20">
        <div className="max-w-[850px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/create-profile"
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
            STEP 2 OF 5
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
          className="w-full max-w-[850px] mx-auto"
        >
          {/* Subtle Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-2 uppercase">
              <span className="text-[#22C55E]">✓ 1. PROFILE</span>
              <span className="text-[#8B5CF6] font-bold">2. INTERESTS</span>
              <span>3. GENRES</span>
              <span>4. AREAS</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#111111] border border-[#1A1A1A] overflow-hidden flex">
              <div className="w-2/5 h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full transition-all duration-300" />
              <div className="w-3/5 h-full bg-transparent" />
            </div>
          </div>

          {/* Headline & Narrative */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
              WHAT ARE YOU INTO?
            </h1>
            <p className="text-sm text-[#666666] font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Pick at least 3 interests to personalize your VibeUp experience.
            </p>
          </div>

          {/* Main Card with Interest Grid */}
          <div className="rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-5 sm:p-8 shadow-2xl space-y-6">
            {/* Top Status & Live Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1A1A1A]/60">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#666666]">
                  SELECTED:
                </span>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                    isMinMet
                      ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                      : "bg-[#111111] text-white border border-[#1A1A1A]"
                  }`}
                >
                  {selectedInterests.length} / 10
                </span>
              </div>

              <div className="text-xs font-mono">
                {selectedInterests.length < 3 ? (
                  <span className="text-[#8B5CF6]">
                    Select {3 - selectedInterests.length} more to continue
                  </span>
                ) : (
                  <span className="text-[#22C55E] inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Minimum requirement met
                  </span>
                )}
              </div>
            </div>

            {/* Warning Message on Max Limit */}
            <AnimatePresence>
              {limitWarning && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs font-mono text-[#EF4444] flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>YOU CAN SELECT UP TO 10 INTERESTS.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interest Grid: 2 Cols Mobile, 3 Cols Tablet, 4 Cols Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {INTERESTS_DATA.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedInterests.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    aria-pressed={isSelected}
                    className={`group relative p-3.5 sm:p-4 rounded-[12px] border text-left transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                      isSelected
                        ? "bg-[#8B5CF6]/15 border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.25)] scale-[1.02]"
                        : "bg-[#111111] border-[#1A1A1A] hover:border-[#8B5CF6]/40 hover:bg-[#111111]/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#8B5CF6] text-white shadow-sm"
                            : "bg-[#111111] text-[#666666] group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        className={`font-mono text-xs font-bold truncate transition-colors ${
                          isSelected
                            ? "text-white"
                            : "text-[#D4D4D8] group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Selection Indicator */}
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "bg-[#8B5CF6] border-[#8B5CF6] text-white"
                          : "border-[#1A1A1A] bg-transparent opacity-0 group-hover:opacity-60"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Continue Section */}
            <div className="pt-4 border-t border-[#1A1A1A]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/create-profile"
                className="w-full sm:w-auto px-5 py-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors text-center"
              >
                ← BACK TO PROFILE
              </Link>

              <button
                type="button"
                onClick={handleContinue}
                disabled={!isMinMet}
                className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#111111] disabled:text-[#666666] disabled:border disabled:border-[#1A1A1A] disabled:cursor-not-allowed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-[0.99] text-center"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Accent */}
      <footer className="w-full py-4 text-center border-t border-[#1A1A1A]/40 text-[11px] font-mono text-[#666666]">
        VIBEUP · ONBOARDING STEP 2 OF 5
      </footer>
    </main>
  );
}
