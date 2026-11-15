"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { X, Users, Check, Plus } from "@/components/icons";
import { Attendee, EventCrew } from "@/lib/events-data";

interface InviteCrewModalProps {
  attendee: Attendee | null;
  eventId: string;
  onClose: () => void;
  onInviteSuccess: (attendeeId: string, crewName: string) => void;
  crews?: EventCrew[];
}

export default function InviteCrewModal({
  attendee,
  eventId,
  onClose,
  onInviteSuccess,
  crews = [],
}: InviteCrewModalProps) {
  const [selectedCrewId, setSelectedCrewId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  // Fallback demo crews if none provided
  const availableCrews = useMemo(() => {
    return crews.length > 0 ? crews : [
      {
        id: "c1",
        name: "SATURDAY TECHNO CREW",
        membersCount: 7,
        maxSpots: 10,
        eventName: "Saturday Techno Night",
        membersAvatars: [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
        ],
        creatorName: "Aarav",
        vibeTag: "Techno Purists",
      },
      {
        id: "c2",
        name: "KORAMANGALA CREW",
        membersCount: 5,
        maxSpots: 8,
        eventName: "Saturday Techno Night",
        membersAvatars: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
        ],
        creatorName: "Dev",
        vibeTag: "Pre-drinks & Deep House",
      },
    ];
  }, [crews]);

  useEffect(() => {
    if (availableCrews.length > 0 && !selectedCrewId) {
      setSelectedCrewId(availableCrews[0].id);
    }
  }, [availableCrews, selectedCrewId]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!attendee) return null;

  const handleSendInvite = () => {
    if (!selectedCrewId) return;
    setIsSubmitting(true);
    const chosenCrew = availableCrews.find((c) => c.id === selectedCrewId);
    setTimeout(() => {
      setIsSubmitting(false);
      setInviteSent(true);
      setTimeout(() => {
        onInviteSuccess(attendee.id, chosenCrew?.name || "Crew");
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-md rounded-[12px] bg-[#15151C] border border-[#25252F] p-6 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-[4px] text-[#8E8C9C] hover:text-white hover:bg-[#25252F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFE14D] uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>CREW INVITATION</span>
          </div>
          <h3
            id="invite-modal-title"
            className="text-xl font-bold font-sans text-white tracking-tight"
          >
            INVITE TO CREW
          </h3>
          <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans mt-1">
            Choose a crew to invite this person to.
          </p>
        </div>

        {/* Target Attendee Preview */}
        <div className="p-3.5 rounded-xl bg-[#15151C] border border-[#25252F] flex items-center gap-3 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={attendee.avatar}
            alt={attendee.name}
            className="w-11 h-11 rounded-full object-cover border border-[#FFE14D]/50 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white truncate">
                {attendee.name}
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#FFE14D]/15 text-[#FFE14D] font-medium shrink-0">
                Score {attendee.vibeScore}
              </span>
            </div>
            <p className="text-xs text-[#8E8C9C] font-sans truncate">
              {attendee.musicTaste} · {attendee.area}
            </p>
          </div>
        </div>

        {/* Crew Picker */}
        <div className="flex flex-col gap-2.5 mb-6">
          <label className="text-xs font-mono text-[#8E8C9C] uppercase tracking-wider">
            Select Your Crew
          </label>
          {availableCrews.length === 0 ? (
            <div className="p-4 rounded-xl bg-[#15151C] border border-[#25252F] text-center text-xs text-[#8E8C9C]">
              No crews yet.
            </div>
          ) : (
            availableCrews.map((crew) => {
              const isSelected = selectedCrewId === crew.id;
              return (
                <button
                  key={crew.id}
                  type="button"
                  onClick={() => setSelectedCrewId(crew.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? "bg-[#FFE14D]/10 border-[#FFE14D] text-white "
                      : "bg-[#15151C] border-[#25252F] text-[#8E8C9C] hover:border-[#FFE14D]/40 hover:text-white"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-sm text-white truncate">
                      {crew.name}
                    </div>
                    <div className="font-mono text-xs text-[#FFE14D] mt-0.5">
                      {crew.membersCount}/{crew.maxSpots} MEMBERS
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-[#FFE14D] border-[#FFE14D] text-[#0B0B10]"
                        : "border-[#6B6979]"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })
          )}

          {/* Create Crew Link */}
          <Link
            href={`/events/${eventId}/crews`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFE14D] hover:underline mt-1 self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ CREATE A CREW</span>
          </Link>
        </div>

        {/* Success Banner */}
        {inviteSent && (
          <div className="p-3 mb-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0" />
            <span>Invitation sent to {attendee.name}!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-end pt-2 border-t border-[#25252F]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-[4px] border border-[#25252F] hover:bg-[#25252F]/50 text-xs font-mono text-[#8E8C9C] hover:text-white transition-colors"
          >
            CANCEL
          </button>
          <button
            type="button"
            disabled={!selectedCrewId || isSubmitting || inviteSent}
            onClick={handleSendInvite}
            className="px-5 py-2.5 rounded-[4px] bg-[#FFE14D] hover:bg-[#F2CF2E] disabled:opacity-50 text-xs font-mono font-bold text-[#0B0B10] transition-all shadow-[0_0_16px_rgba(255,225,77,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? "SENDING..." : inviteSent ? "INVITED" : "INVITE"}
          </button>
        </div>
      </div>
    </div>
  );
}
