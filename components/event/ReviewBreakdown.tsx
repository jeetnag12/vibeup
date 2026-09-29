"use client";

import { ReviewDimensions } from "@/lib/reviews-data";

interface ReviewBreakdownProps {
  dimensions: ReviewDimensions;
}

export default function ReviewBreakdown({
  dimensions = {
    music: 4.8,
    crowd: 4.6,
    venue: 4.5,
    experience: 4.7,
  },
}: ReviewBreakdownProps) {
  const items = [
    { label: "MUSIC", score: dimensions.music, color: "#8B5CF6" },
    { label: "CROWD", score: dimensions.crowd, color: "#EC4899" },
    { label: "VENUE", score: dimensions.venue, color: "#22C55E" },
    { label: "EXPERIENCE", score: dimensions.experience, color: "#EAB308" },
  ];

  return (
    <div className="w-full rounded-[20px] bg-[#141418] border border-[#2A2A35] p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-mono text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
          DIMENSION BREAKDOWN
        </h3>
        <span className="font-mono text-[11px] text-[#8B5CF6]">
          Scale of 5.0
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const percentage = (item.score / 5) * 100;

          return (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-white tracking-wider">
                  {item.label}
                </span>
                <span className="font-bold text-white">
                  {item.score.toFixed(1)}
                </span>
              </div>

              {/* Progress bar container */}
              <div
                role="progressbar"
                aria-valuenow={item.score}
                aria-valuemin={0}
                aria-valuemax={5}
                aria-label={`${item.label} score ${item.score} out of 5`}
                className="w-full h-2 rounded-full bg-[#1A1A21] border border-[#2A2A35] overflow-hidden"
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
