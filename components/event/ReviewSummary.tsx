"use client";

import { Star, ShieldCheck, Users } from "@/components/icons";

interface ReviewSummaryProps {
  overallRating: number;
  totalReviews: number;
}

export default function ReviewSummary({
  overallRating = 4.7,
  totalReviews = 126,
}: ReviewSummaryProps) {
  return (
    <div className="w-full rounded-[12px] bg-[#15151C] border border-[#25252F] p-6 sm:p-7 relative overflow-hidden">
      {/* Eyebrow & Title */}
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-4 h-4 text-[#FFE14D]" />
        <span className="font-mono text-xs font-semibold text-[#FFE14D] uppercase tracking-wider">
          VERIFIED ATTENDEE REPUTATION
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight mb-1">
        EVENT REVIEWS
      </h2>
      <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans mb-6">
        See what people who experienced this night had to say.
      </p>

      {/* Main Score Box */}
      <div className="flex items-center gap-5 pt-4 border-t border-[#25252F]">
        <div className="w-20 h-20 rounded-[12px] bg-[#15151C] border border-[#25252F] flex flex-col items-center justify-center shrink-0">
          <span className="text-3xl font-bold font-sans text-white leading-none">
            {overallRating.toFixed(1)}
          </span>
          <span className="text-[10px] font-mono text-[#8E8C9C] mt-1">OUT OF 5</span>
        </div>

        <div>
          {/* Star icons */}
          <div className="flex items-center gap-1 text-amber-400 mb-2" aria-label={`Rating: ${overallRating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                className={`w-4 h-4 ${
                  starIndex <= Math.round(overallRating)
                    ? "text-[#FFE14D]"
                    : "text-[#6B6979]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-white font-bold">
            <Users className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>{totalReviews} VERIFIED REVIEWS</span>
          </div>

          <p className="text-[11px] font-sans text-[#8E8C9C] mt-0.5">
            100% checked-in ticket holders
          </p>
        </div>
      </div>
    </div>
  );
}
