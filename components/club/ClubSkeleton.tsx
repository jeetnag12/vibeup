"use client";

export default function ClubSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="bg-[#1A1A21] rounded-[18px] border border-[#2A2A35] overflow-hidden flex flex-col justify-between"
        >
          {/* Top image placeholder */}
          <div className="w-full h-[180px] bg-[#2A2A35]/60" />

          {/* Content placeholder */}
          <div className="p-5 space-y-3">
            <div className="h-5 w-3/4 bg-[#2A2A35] rounded" />
            <div className="h-3 w-1/2 bg-[#2A2A35] rounded" />
            <div className="flex gap-2">
              <div className="h-4 w-14 bg-[#141418] rounded" />
              <div className="h-4 w-14 bg-[#141418] rounded" />
            </div>
            <div className="h-9 w-full bg-[#141418] rounded-xl pt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
