"use client";

import { useEffect, useRef, useState } from "react";
import { X, Star, CheckCircle2, AlertCircle } from "lucide-react";
import { EventReview } from "@/lib/reviews-data";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventId: string;
  onSubmitReview: (review: EventReview) => void;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  eventTitle,
  eventId,
  onSubmitReview,
}: WriteReviewModalProps) {
  const [overallRating, setOverallRating] = useState(5);
  const [musicRating, setMusicRating] = useState(5);
  const [crowdRating, setCrowdRating] = useState(5);
  const [venueRating, setVenueRating] = useState(5);
  const [experienceText, setExperienceText] = useState("");
  const [recommend, setRecommend] = useState<boolean | null>(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experienceText.trim()) {
      setErrorMsg("Please write a short note about your experience.");
      return;
    }

    const newReview: EventReview = {
      id: `rev-${Date.now()}`,
      eventId,
      author: {
        id: "current-user",
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop",
      },
      verifiedAttendee: true,
      overallRating,
      musicRating,
      crowdRating,
      venueRating,
      experienceRating: overallRating,
      text: experienceText.trim(),
      createdAt: "JUST NOW",
      helpfulCount: 0,
      tags: ["High Energy", "Verified"],
      recommend: recommend ?? true,
    };

    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitReview(newReview);
      onClose();
    }, 1200);
  };

  const renderStarSelector = (
    label: string,
    currentScore: number,
    setScore: (v: number) => void
  ) => {
    return (
      <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#111111] border border-[#1A1A1A]">
        <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
          {label}
        </span>
        <div className="flex items-center gap-1.5" role="radiogroup" aria-label={label}>
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={starValue === currentScore}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""} for ${label}`}
              onClick={() => setScore(starValue)}
              className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] rounded"
            >
              <Star
                className={`w-4 h-4 ${
                  starValue <= currentScore
                    ? "fill-amber-400 text-amber-400"
                    : "text-[#52525B]"
                }`}
              />
            </button>
          ))}
          <span className="font-mono text-xs font-bold text-white w-6 text-right ml-1">
            {currentScore}.0
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-8 shadow-2xl relative my-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close review modal"
          className="absolute top-5 right-5 p-2 rounded-[4px] text-[#666666] hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Submission Confirmation View */
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-sans text-white">
              REVIEW SUBMITTED ✓
            </h3>
            <p className="text-sm text-[#666666] font-sans max-w-xs mx-auto">
              Thanks for helping the next crowd know what to expect.
            </p>
          </div>
        ) : (
          /* Review Form */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#22C55E] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VERIFIED ATTENDEE REVIEW</span>
              </div>
              <h3 id="write-review-title" className="text-2xl font-bold font-sans text-white tracking-tight">
                WRITE YOUR REVIEW
              </h3>
              <p className="text-xs text-[#666666] font-sans mt-0.5">
                Rating your experience for <strong className="text-white">{eventTitle}</strong>
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center gap-2 text-xs text-[#EF4444]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selectors */}
              <div className="space-y-2">
                {renderStarSelector("OVERALL EXPERIENCE", overallRating, setOverallRating)}
                {renderStarSelector("MUSIC & SOUND", musicRating, setMusicRating)}
                {renderStarSelector("CROWD & VIBE", crowdRating, setCrowdRating)}
                {renderStarSelector("VENUE & PRODUCTION", venueRating, setVenueRating)}
              </div>

              {/* Textarea */}
              <div>
                <label
                  htmlFor="review-experience-text"
                  className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-1.5"
                >
                  YOUR EXPERIENCE
                </label>
                <textarea
                  id="review-experience-text"
                  rows={4}
                  required
                  placeholder="What should people know before they go? Sound quality, arrival timing, bar service, vibe..."
                  value={experienceText}
                  onChange={(e) => {
                    setExperienceText(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] font-sans resize-none transition-all"
                />
              </div>

              {/* Recommendation toggle */}
              <div>
                <span className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-2">
                  WOULD YOU RECOMMEND THIS EVENT?
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRecommend(true)}
                    className={`py-2 px-4 rounded-xl text-xs font-mono font-semibold border transition-all ${
                      recommend === true
                        ? "bg-[#22C55E]/15 border-[#22C55E] text-[#22C55E]"
                        : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white"
                    }`}
                  >
                    YES, RECOMMENDED
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecommend(false)}
                    className={`py-2 px-4 rounded-xl text-xs font-mono font-semibold border transition-all ${
                      recommend === false
                        ? "bg-[#EF4444]/15 border-[#EF4444] text-[#EF4444]"
                        : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white"
                    }`}
                  >
                    MIXED / NOT REALLY
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#1A1A1A] flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-[#666666] hover:text-white font-mono text-xs font-medium border border-[#1A1A1A] transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
