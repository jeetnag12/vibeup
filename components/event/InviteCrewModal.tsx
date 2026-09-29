"use client";

import { useEffect, useState } from "react";
import { X, Check, Sparkles, MapPin, Send } from "lucide-react";
import { LookingAttendee, EventCrew, mockLookingAttendees } from "@/lib/crews-data";

interface InviteCrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  crewName?: string;
  availableCrews?: EventCrew[];
  preselectedAttendee?: LookingAttendee | null;
}

export default function InviteCrewModal({
  isOpen,
  onClose,
  crewName = "Your Crew",
  availableCrews = [],
  preselectedAttendee = null,
}: InviteCrewModalProps) {
  const [invitedMap, setInvitedMap] = useState<Record<string, boolean>>({});
  const [selectedCrew, setSelectedCrew] = useState<string>(crewName);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (crewName) setSelectedCrew(crewName);
  }, [crewName]);

  if (!isOpen) return null;

  const handleToggleInvite = (id: string) => {
    setInvitedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // If a single attendee was preselected from "People Looking for a Crew", show them at top or focus
  const displayAttendees = preselectedAttendee
    ? [
        preselectedAttendee,
        ...mockLookingAttendees.filter((a) => a.id !== preselectedAttendee.id),
      ]
    : mockLookingAttendees;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close invite modal"
          className="absolute top-5 right-5 p-2 rounded-[4px] text-[#666666] hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
              GROW YOUR GROUP
            </span>
          </div>
          <h3 id="invite-modal-title" className="text-2xl font-bold font-sans text-white tracking-tight">
            INVITE PEOPLE
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
            Send an invite to fellow attendees heading to this event.
          </p>

          {/* Target Crew Selector if multiple crews exist */}
          {availableCrews.length > 1 && (
            <div className="mt-4 pt-3 border-t border-[#1A1A1A]">
              <label htmlFor="target-crew-select" className="block text-[11px] font-mono text-[#666666] uppercase mb-1">
                INVITING TO CREW:
              </label>
              <select
                id="target-crew-select"
                value={selectedCrew}
                onChange={(e) => setSelectedCrew(e.target.value)}
                className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                {availableCrews.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#111111] text-white">
                    {c.name} ({c.area})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Attendees List */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#1A1A1A]">
          {displayAttendees.map((attendee) => {
            const isInvited = invitedMap[attendee.id] ?? false;

            return (
              <div
                key={attendee.id}
                className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-between gap-3 hover:border-[#8B5CF6]/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={attendee.avatar}
                    alt={attendee.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#1A1A1A] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-sm text-white truncate">
                        {attendee.name}
                      </span>
                      {attendee.vibeMatch && (
                        <span className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/15 px-1.5 py-0.5 rounded font-bold shrink-0">
                          {attendee.vibeMatch}% MATCH
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#666666] mt-0.5">
                      <span className="inline-flex items-center gap-1 text-[#EC4899]">
                        <MapPin className="w-3 h-3" />
                        {attendee.area}
                      </span>
                      <span>·</span>
                      <span className="truncate">{attendee.interests.slice(0, 2).join(", ")}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleInvite(attendee.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                    isInvited
                      ? "bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E]"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white "
                  }`}
                >
                  {isInvited ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>INVITED ✓</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>INVITE</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex items-center justify-between">
          <span className="text-xs font-mono text-[#666666]">
            {Object.values(invitedMap).filter(Boolean).length} invites sent
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-semibold transition-colors"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
