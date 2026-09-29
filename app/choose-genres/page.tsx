"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Search,
  AlertCircle,
  Music,
  Disc,
  Radio,
  Zap,
  Headphones,
  Sparkles,
  Flame,
  Waves,
  Mic2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type GenreCategory = "ALL" | "ELECTRONIC" | "INDIAN" | "URBAN" | "OTHER";

export interface GenreItem {
  id: string;
  label: string;
  category: "ELECTRONIC" | "INDIAN" | "URBAN" | "OTHER";
  icon: React.ComponentType<{ className?: string }>;
}

const GENRES_DATA: GenreItem[] = [
  // Electronic
  { id: "house", label: "HOUSE", category: "ELECTRONIC", icon: Disc },
  { id: "techno", label: "TECHNO", category: "ELECTRONIC", icon: Zap },
  { id: "afro-house", label: "AFRO HOUSE", category: "ELECTRONIC", icon: Flame },
  { id: "tech-house", label: "TECH HOUSE", category: "ELECTRONIC", icon: Disc },
  { id: "melodic-techno", label: "MELODIC TECHNO", category: "ELECTRONIC", icon: Waves },
  { id: "progressive-house", label: "PROGRESSIVE HOUSE", category: "ELECTRONIC", icon: Headphones },
  { id: "deep-house", label: "DEEP HOUSE", category: "ELECTRONIC", icon: Disc },
  { id: "disco", label: "DISCO", category: "ELECTRONIC", icon: Sparkles },
  { id: "edm", label: "EDM", category: "ELECTRONIC", icon: Zap },
  { id: "trance", label: "TRANCE", category: "ELECTRONIC", icon: Waves },
  { id: "drum-and-bass", label: "DRUM & BASS", category: "ELECTRONIC", icon: Radio },
  { id: "dubstep", label: "DUBSTEP", category: "ELECTRONIC", icon: Zap },

  // Indian
  { id: "bollywood", label: "BOLLYWOOD", category: "INDIAN", icon: Sparkles },
  { id: "bollywood-remix", label: "BOLLYWOOD REMIX", category: "INDIAN", icon: Disc },
  { id: "punjabi", label: "PUNJABI", category: "INDIAN", icon: Flame },

  // Urban
  { id: "hip-hop", label: "HIP HOP", category: "URBAN", icon: Mic2 },
  { id: "r-and-b", label: "R&B", category: "URBAN", icon: Music },
  { id: "pop", label: "POP", category: "URBAN", icon: Sparkles },
  { id: "funk", label: "FUNK", category: "URBAN", icon: Disc },

  // Other
  { id: "indie", label: "INDIE", category: "OTHER", icon: Headphones },
  { id: "rock", label: "ROCK", category: "OTHER", icon: Zap },
  { id: "jazz", label: "JAZZ", category: "OTHER", icon: Music },
  { id: "reggae", label: "REGGAE", category: "OTHER", icon: Waves },
  { id: "latin", label: "LATIN", category: "OTHER", icon: Flame },
  { id: "k-pop", label: "K-POP", category: "OTHER", icon: Sparkles },
  { id: "classical", label: "CLASSICAL", category: "OTHER", icon: Music },
  { id: "live-music", label: "LIVE MUSIC", category: "OTHER", icon: Mic2 },
  { id: "alternative", label: "ALTERNATIVE", category: "OTHER", icon: Headphones },
];

const CATEGORIES: GenreCategory[] = [
  "ALL",
  "ELECTRONIC",
  "INDIAN",
  "URBAN",
  "OTHER",
];

export default function ChooseGenresPage() {
  const router = useRouter();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GenreCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [limitWarning, setLimitWarning] = useState(false);

  // Restore stored genres if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("vibeup_genres");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSelectedGenres(parsed);
          }
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  // Filter genres based on search query and category
  const filteredGenres = useMemo(() => {
    return GENRES_DATA.filter((genre) => {
      const matchesCategory =
        selectedCategory === "ALL" || genre.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        genre.label.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Selection toggle
  const toggleGenre = (id: string) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres((prev) => prev.filter((item) => item !== id));
      if (limitWarning) setLimitWarning(false);
    } else {
      if (selectedGenres.length >= 10) {
        setLimitWarning(true);
        setTimeout(() => setLimitWarning(false), 3000);
        return;
      }
      setSelectedGenres((prev) => [...prev, id]);
    }
  };

  const isMinMet = selectedGenres.length >= 3;

  const handleContinue = () => {
    if (!isMinMet) return;

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("vibeup_genres", JSON.stringify(selectedGenres));
      } catch {
        // Fallback
      }
    }

    router.push("/choose-areas");
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
        <div className="max-w-[900px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/choose-interests"
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
            STEP 3 OF 5
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
          className="w-full max-w-[900px] mx-auto"
        >
          {/* Progress Bar (60%) */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-2 uppercase">
              <span className="text-[#22C55E]">✓ 1. PROFILE</span>
              <span className="text-[#22C55E]">✓ 2. INTERESTS</span>
              <span className="text-[#8B5CF6] font-bold">3. GENRES</span>
              <span>4. AREAS</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#111111] border border-[#1A1A1A] overflow-hidden flex">
              <div className="w-3/5 h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full transition-all duration-300" />
              <div className="w-2/5 h-full bg-transparent" />
            </div>
          </div>

          {/* Headline & Narrative */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
              WHAT&apos;S YOUR SOUND?
            </h1>
            <p className="text-sm text-[#666666] font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Pick at least 3 genres so we can find events and people that match your vibe.
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-5 sm:p-8 shadow-2xl space-y-6">
            {/* Top Bar: Search & Status Counter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]/60">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search genres... (e.g. techno, bolly)"
                  className="w-full bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] rounded-xl pl-9 pr-9 py-2.5 text-xs font-mono text-white placeholder-[#666666] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#666666] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Live Count & Min Status */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
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
                    {selectedGenres.length} / 10
                  </span>
                </div>

                <div className="text-xs font-mono">
                  {selectedGenres.length < 3 ? (
                    <span className="text-[#8B5CF6]">
                      {3 - selectedGenres.length} more needed
                    </span>
                  ) : (
                    <span className="text-[#22C55E] inline-flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Ready
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-150 whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-[#8B5CF6] text-white font-bold "
                        : "bg-[#111111] text-[#666666] hover:text-white hover:bg-[#1A1A1A] border border-[#1A1A1A]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
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
                  <span>YOU CAN SELECT UP TO 10 GENRES.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Genres Grid: 2 Cols Mobile, 3 Cols Tablet, 4 Cols Desktop */}
            {filteredGenres.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
                {filteredGenres.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedGenres.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleGenre(item.id)}
                      aria-pressed={isSelected}
                      className={`group relative p-3 sm:p-3.5 rounded-[12px] border text-left transition-all duration-200 flex items-center justify-between gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                        isSelected
                          ? "bg-[#8B5CF6]/15 border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.25)] scale-[1.02]"
                          : "bg-[#111111] border-[#1A1A1A] hover:border-[#8B5CF6]/40 hover:bg-[#111111]/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#8B5CF6] text-white shadow-sm"
                              : "bg-[#111111] text-[#666666] group-hover:text-white"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
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
            ) : (
              <div className="py-12 text-center space-y-2">
                <Music className="w-8 h-8 text-[#666666] mx-auto" />
                <p className="font-mono text-xs text-[#666666]">
                  No genres found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("ALL");
                  }}
                  className="text-xs font-mono text-[#8B5CF6] hover:underline"
                >
                  Clear search &amp; filters
                </button>
              </div>
            )}

            {/* Bottom Continue Section */}
            <div className="pt-4 border-t border-[#1A1A1A]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/choose-interests"
                className="w-full sm:w-auto px-5 py-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors text-center"
              >
                ← BACK TO INTERESTS
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
        VIBEUP · ONBOARDING STEP 3 OF 5
      </footer>
    </main>
  );
}
