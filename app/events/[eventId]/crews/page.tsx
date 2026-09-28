"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, Plus, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { getEventById, EventCrew } from "@/lib/events-data";

interface CrewsPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventCrewsPage({ params }: CrewsPageProps) {
  const routeParams = useParams();
  const rawId = (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";
  const event = useMemo(() => getEventById(rawId), [rawId]);
  const [joinedCrews, setJoinedCrews] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCrewName, setNewCrewName] = useState("");
  const [newCrewVibe, setNewCrewVibe] = useState("");
  const [crewsList, setCrewsList] = useState<EventCrew[]>(event.crews);

  const toggleJoin = (id: string) => {
    setJoinedCrews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrewName.trim()) return;

    const newCrew: EventCrew = {
      id: `crew-${Date.now()}`,
      name: newCrewName.toUpperCase(),
      membersCount: 1,
      maxSpots: 8,
      eventName: event.title,
      creatorName: "You",
      vibeTag: newCrewVibe || "Good Vibes",
      membersAvatars: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      ],
    };

    setCrewsList([newCrew, ...crewsList]);
    setJoinedCrews((prev) => ({ ...prev, [newCrew.id]: true }));
    setNewCrewName("");
    setNewCrewVibe("");
    setShowCreateModal(false);
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO EVENT</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
                GROUPS &amp; TABLES
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white">
                Event Crews
              </h1>
              <p className="text-sm text-[#A1A1AA] font-sans mt-1">
                Find or create a crew for {event.title}. Never party alone.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-colors shadow-lg shadow-purple-500/25 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE A CREW</span>
            </button>
          </div>

          {/* Crews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crewsList.map((crew) => {
              const isJoined = joinedCrews[crew.id] ?? false;
              const currentCount = isJoined
                ? crew.membersCount + 1
                : crew.membersCount;

              return (
                <div
                  key={crew.id}
                  className="p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-sans font-bold text-white text-lg">
                        {crew.name}
                      </h3>
                      <span className="font-mono text-[10px] text-[#EC4899] bg-[#EC4899]/10 px-2 py-0.5 rounded-full shrink-0">
                        {crew.vibeTag}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-[#A1A1AA] mb-4">
                      Host: <span className="text-white">{crew.creatorName}</span>
                    </p>

                    <div className="flex items-center justify-between mb-6 pt-3 border-t border-[#2A2A35]">
                      <div className="flex items-center -space-x-2">
                        {crew.membersAvatars.map((url, idx) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={idx}
                            src={url}
                            alt="Member"
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#1A1A21]"
                          />
                        ))}
                      </div>

                      <span className="font-mono text-xs font-bold text-[#8B5CF6]">
                        {currentCount}/{crew.maxSpots} spots filled
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJoin(crew.id)}
                    className={`w-full py-2.5 rounded-[10px] font-sans text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isJoined
                        ? "bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E]"
                        : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>YOU HAVE JOINED THIS CREW</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        <span>JOIN THIS CREW</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Crew Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#1A1A21] border border-[#2A2A35] rounded-[16px] p-6 shadow-2xl relative">
            <h3 className="font-sans font-bold text-xl text-white mb-1">
              Create a Crew
            </h3>
            <p className="text-xs text-[#A1A1AA] font-sans mb-5">
              Host a group for {event.title}. Set your vibe and approve members.
            </p>

            <form onSubmit={handleCreateCrew} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                  Crew Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HSR RAVERS or FIRST TIMERS"
                  value={newCrewName}
                  onChange={(e) => setNewCrewName(e.target.value)}
                  className="w-full bg-[#141418] border border-[#2A2A35] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#8B5CF6] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                  Vibe Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Casual Pre-drinks · Front Row"
                  value={newCrewVibe}
                  onChange={(e) => setNewCrewVibe(e.target.value)}
                  className="w-full bg-[#141418] border border-[#2A2A35] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#8B5CF6] font-sans"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-[10px] border border-[#2A2A35] text-[#A1A1AA] hover:text-white font-sans text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-[10px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-colors"
                >
                  Launch Crew
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
