"use client";

import { useEffect } from "react";
import { X, Users } from "lucide-react";
import { EventCrew } from "@/lib/crews-data";

interface JoinConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  crew: EventCrew | null;
  eventTitle: string;
  onConfirmJoin: (crewId: string) => void;
  onLeaveCrew?: (crewId: string) => void;
  isCurrentlyJoined: boolean;
}

export default function JoinConfirmModal({
  isOpen,
  onClose,
  crew,
  eventTitle,
  onConfirmJoin,
  onLeaveCrew,
  isCurrentlyJoined,
}: JoinConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !crew) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-7 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-[4px] text-[#666666] hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="text-center pt-2">
          <div className="w-14 h-14 mx-auto rounded-[12px] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-4">
            <Users className="w-7 h-7" />
          </div>

          <h3 id="join-modal-title" className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight mb-2">
            {isCurrentlyJoined ? "LEAVE CREW?" : "JOIN CREW?"}
          </h3>

          <p className="text-sm text-[#666666] font-sans max-w-xs mx-auto mb-6">
            {isCurrentlyJoined
              ? `You are currently in ${crew.name}. Do you want to leave this crew?`
              : `You'll join the crew for ${eventTitle}.`}
          </p>

          {/* Crew Snapshot Card */}
          <div className="p-4 rounded-xl bg-[#111111] border border-[#1A1A1A] text-left mb-6">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-sans font-bold text-white text-sm">
                {crew.name}
              </span>
              <span className="font-mono text-[10px] text-[#EC4899] bg-[#EC4899]/15 px-2 py-0.5 rounded">
                {crew.area}
              </span>
            </div>
            <p className="text-xs text-[#666666] font-sans line-clamp-2">
              {crew.description}
            </p>
            <div className="mt-3 pt-2.5 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] font-mono text-[#666666]">
              <span>Host: {crew.creatorName}</span>
              <span className="text-[#8B5CF6] font-bold">
                {crew.openSpots} spots open
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-[#666666] hover:text-white font-mono text-xs font-semibold border border-[#1A1A1A] transition-colors"
            >
              CANCEL
            </button>

            {isCurrentlyJoined ? (
              <button
                type="button"
                onClick={() => {
                  if (onLeaveCrew) onLeaveCrew(crew.id);
                  onClose();
                }}
                className="py-2.5 px-4 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-mono text-xs font-bold transition-all shadow-[0_0_16px_rgba(239,68,68,0.3)]"
              >
                LEAVE CREW
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onConfirmJoin(crew.id);
                  onClose();
                }}
                className="py-2.5 px-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
              >
                JOIN CREW
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
