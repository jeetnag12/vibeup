"use client";

import { useState } from "react";
import { Star, CheckCircle2, ThumbsUp, Share2, MoreHorizontal, Flag } from "lucide-react";
import { EventReview } from "@/lib/reviews-data";

interface ReviewCardProps {
  review: EventReview;
  isHelpful: boolean;
  onToggleHelpful: (reviewId: string) => void;
  onReport: (review: EventReview) => void;
  onShare: (review: EventReview) => void;
}

export default function ReviewCard({
  review,
  isHelpful,
  onToggleHelpful,
  onReport,
  onShare,
}: ReviewCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const displayHelpfulCount = review.helpfulCount + (isHelpful ? 1 : 0);

  return (
    <article
      aria-label={`Review by ${review.author.name}`}
      className="p-5 sm:p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all duration-200 flex flex-col justify-between relative group"
    >
      <div>
        {/* Top Header: Author + Rating + Verified Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={review.author.avatar}
              alt={review.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#2A2A35] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-sans font-bold text-sm sm:text-base text-white truncate">
                  {review.author.name}
                </span>

                {review.verifiedAttendee && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED ATTENDEE</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-[#A1A1AA] mt-0.5">
                <span>{review.createdAt}</span>
                {review.recommend !== undefined && (
                  <>
                    <span>·</span>
                    <span className="text-[#8B5CF6]">
                      {review.recommend ? "Recommends this event" : "Mixed feelings"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Rating Display */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#141418] border border-[#2A2A35] shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono text-xs sm:text-sm font-bold text-white">
              {review.overallRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-4 max-w-2xl">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Dimension Scores: MUSIC, CROWD, VENUE */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 pt-3 border-t border-[#2A2A35]/80 font-mono text-[11px]">
          <div className="px-2.5 py-1 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center gap-1.5">
            <span className="text-[#A1A1AA]">MUSIC</span>
            <span className="text-white font-bold">{review.musicRating.toFixed(1)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center gap-1.5">
            <span className="text-[#A1A1AA]">CROWD</span>
            <span className="text-white font-bold">{review.crowdRating.toFixed(1)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center gap-1.5">
            <span className="text-[#A1A1AA]">VENUE</span>
            <span className="text-white font-bold">{review.venueRating.toFixed(1)}</span>
          </div>
          {review.tags && review.tags.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Helpful Count + Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#2A2A35] text-xs font-mono text-[#A1A1AA]">
        <span>
          {displayHelpfulCount} {displayHelpfulCount === 1 ? "PERSON" : "PEOPLE"} FOUND THIS HELPFUL
        </span>

        <div className="flex items-center gap-1.5 relative">
          {/* Helpful Button */}
          <button
            type="button"
            onClick={() => onToggleHelpful(review.id)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 ${
              isHelpful
                ? "bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white"
                : "bg-[#141418] border border-[#2A2A35] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/40"
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? "text-[#8B5CF6] fill-[#8B5CF6]" : ""}`} />
            <span>{isHelpful ? "HELPFUL ✓" : "HELPFUL"}</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={() => onShare(review)}
            aria-label="Share review"
            className="p-1.5 rounded-lg bg-[#141418] border border-[#2A2A35] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/40 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* 3-Dot More Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="More review options"
              className="p-1.5 rounded-lg bg-[#141418] border border-[#2A2A35] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/40 transition-colors"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-36 bg-[#141418] border border-[#2A2A35] rounded-xl shadow-xl p-1 z-20 animate-in fade-in duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onReport(review);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors text-left"
                >
                  <Flag className="w-3 h-3" />
                  <span>REPORT REVIEW</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
