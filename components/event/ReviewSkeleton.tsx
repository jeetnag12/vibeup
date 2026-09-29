"use client";

export default function ReviewSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Summary Skeleton */}
      <div className="rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-6 space-y-4">
        <div className="h-4 w-32 bg-[#1A1A1A] rounded" />
        <div className="h-8 w-48 bg-[#1A1A1A] rounded" />
        <div className="h-16 w-full bg-[#111111] rounded-xl" />
      </div>

      {/* Review Card Skeletons */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A]" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-32 bg-[#1A1A1A] rounded" />
                <div className="h-3 w-20 bg-[#1A1A1A] rounded" />
              </div>
              <div className="h-7 w-12 bg-[#1A1A1A] rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-[#1A1A1A] rounded" />
              <div className="h-3.5 w-4/5 bg-[#1A1A1A] rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-[#111111] rounded" />
              <div className="h-6 w-20 bg-[#111111] rounded" />
              <div className="h-6 w-20 bg-[#111111] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
