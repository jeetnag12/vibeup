"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (val: number) => void;
  ariaLabel?: string;
}

export default function StarRating({
  value,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  ariaLabel,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const starClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      role={interactive ? "radiogroup" : "img"}
      aria-label={ariaLabel || `${value} out of ${max} stars`}
      className="inline-flex items-center gap-1"
    >
      {[...Array(max)].map((_, i) => {
        const starNumber = i + 1;
        const isFilled = starNumber <= Math.round(value);

        if (interactive) {
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={starNumber === value}
              aria-label={`${starNumber} star${starNumber > 1 ? "s" : ""}`}
              onClick={() => onChange?.(starNumber)}
              className="p-1 text-amber-400 hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] rounded"
            >
              <Star
                className={`${starClass} transition-colors ${
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-600 hover:text-amber-300"
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={i}
            className={`${starClass} ${
              isFilled ? "fill-amber-400 text-amber-400" : "text-zinc-600"
            }`}
          />
        );
      })}
    </div>
  );
}
