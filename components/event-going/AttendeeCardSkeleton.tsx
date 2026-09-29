"use client";

export default function AttendeeCardSkeleton() {
  return (
    <div className="p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col justify-between animate-pulse h-[280px]">
      <div>
        {/* Top: Avatar + Vibe Score Skeleton */}
        <div className="flex items-start justify-between gap-2.5 mb-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A]" />
          <div className="flex flex-col items-end gap-1">
            <div className="w-12 h-2.5 rounded bg-[#1A1A1A]" />
            <div className="w-8 h-4 rounded bg-[#1A1A1A]" />
          </div>
        </div>

        {/* Name & Area Skeleton */}
        <div className="space-y-1.5 mb-3">
          <div className="w-28 h-4 rounded bg-[#1A1A1A]" />
          <div className="w-20 h-3 rounded bg-[#1A1A1A]" />
        </div>

        {/* Bio Skeleton */}
        <div className="space-y-1.5 mb-3">
          <div className="w-full h-3 rounded bg-[#1A1A1A]" />
          <div className="w-3/4 h-3 rounded bg-[#1A1A1A]" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-1.5 mb-3">
          <div className="w-12 h-4 rounded bg-[#1A1A1A]" />
          <div className="w-14 h-4 rounded bg-[#1A1A1A]" />
          <div className="w-10 h-4 rounded bg-[#1A1A1A]" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="pt-3 border-t border-[#1A1A1A]/60 flex flex-col gap-2">
        <div className="w-full h-[36px] rounded-xl bg-[#1A1A1A]" />
        <div className="w-full h-[24px] rounded-xl bg-[#1A1A1A]/50" />
      </div>
    </div>
  );
}
