"use client";

export default function DiscussionPostSkeleton() {
  return (
    <div className="p-5 sm:p-6 rounded-[12px] bg-[#15151C] border border-[#25252F] flex flex-col gap-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#25252F] shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="w-28 h-4 rounded bg-[#25252F]" />
          <div className="w-20 h-3 rounded bg-[#25252F]" />
        </div>
      </div>

      {/* Text Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-3.5 rounded bg-[#25252F]" />
        <div className="w-4/5 h-3.5 rounded bg-[#25252F]" />
      </div>

      {/* Actions Skeleton */}
      <div className="flex items-center gap-4 pt-3 border-t border-[#25252F]/60">
        <div className="w-12 h-4 rounded bg-[#25252F]" />
        <div className="w-16 h-4 rounded bg-[#25252F]" />
        <div className="w-12 h-4 rounded bg-[#25252F]" />
      </div>
    </div>
  );
}
