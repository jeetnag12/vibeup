"use client";

export default function ReviewSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Summary Skeleton */}
      <div className="rounded-[20px] bg-[#141418] border border-[#2A2A35] p-6 space-y-4">
        <div className="h-4 w-32 bg-[#2A2A35] rounded" />
        <div className="h-8 w-48 bg-[#2A2A35] rounded" />
        <div className="h-16 w-full bg-[#1A1A21] rounded-xl" />
      </div>

      {/* Review Card Skeletons */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2A2A35]" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-32 bg-[#2A2A35] rounded" />
                <div className="h-3 w-20 bg-[#2A2A35] rounded" />
              </div>
              <div className="h-7 w-12 bg-[#2A2A35] rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-[#2A2A35] rounded" />
              <div className="h-3.5 w-4/5 bg-[#2A2A35] rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-[#141418] rounded" />
              <div className="h-6 w-20 bg-[#141418] rounded" />
              <div className="h-6 w-20 bg-[#141418] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
