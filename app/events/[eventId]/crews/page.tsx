"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/event/EventHeader";
import EventNavTabs from "@/components/event/EventNavTabs";
import CrewHero from "@/components/event/CrewHero";
import CrewStats from "@/components/event/CrewStats";
import CrewFilters, {
  CrewFilterType,
  CrewSortType,
} from "@/components/event/CrewFilters";
import EventCrewCard from "@/components/event/EventCrewCard";
import CreateCrewCTA from "@/components/event/CreateCrewCTA";
import CreateCrewModal from "@/components/event/CreateCrewModal";
import InviteCrewModal from "@/components/event/InviteCrewModal";
import LookingForCrew from "@/components/event/LookingForCrew";
import CrewPlanningPreview from "@/components/event/CrewPlanningPreview";
import JoinConfirmModal from "@/components/event/JoinConfirmModal";

import { getEventById, DetailedEvent } from "@/lib/events-data";
import {
  getCrewsForEvent,
  EventCrew,
  mockLookingAttendees,
  LookingAttendee,
} from "@/lib/crews-data";
import {
  Users,
  SearchX,
  Plus,
  CheckCircle2,
} from "lucide-react";

interface CrewsPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventCrewsPage({ params }: CrewsPageProps) {
  const routeParams = useParams();
  const rawId =
    (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";

  // Event Data
  const event: DetailedEvent = useMemo(() => getEventById(rawId), [rawId]);

  // Crews State (initialized with mock event crews)
  const initialCrews = useMemo(() => getCrewsForEvent(rawId), [rawId]);
  const [crews, setCrews] = useState<EventCrew[]>(initialCrews);

  // Authentication State (default true; toggleable for demonstration/testing)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<CrewFilterType>("ALL");
  const [activeSort, setActiveSort] = useState<CrewSortType>("Recommended");

  // User Interaction States
  const [joinedCrewsMap, setJoinedCrewsMap] = useState<Record<string, boolean>>({});
  const [requestedCrewsMap, setRequestedCrewsMap] = useState<Record<string, boolean>>({});

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedInviteAttendee, setSelectedInviteAttendee] = useState<LookingAttendee | null>(null);
  const [targetJoinCrew, setTargetJoinCrew] = useState<EventCrew | null>(null);
  const [justCreatedCrew, setJustCreatedCrew] = useState<EventCrew | null>(null);

  // Notification Banner
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type: "success" | "info";
    actionCrewId?: string;
  } | null>(null);

  // Auto-dismiss notification after 6 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 6000);
    return () => clearTimeout(timer);
  }, [notification]);

  // Join Crew Handler
  const handleOpenJoinModal = (crew: EventCrew) => {
    setTargetJoinCrew(crew);
  };

  const handleConfirmJoin = (crewId: string) => {
    setJoinedCrewsMap((prev) => ({ ...prev, [crewId]: true }));
    const joined = crews.find((c) => c.id === crewId);
    setNotification({
      title: "JOINED CREW",
      message: `You're now in ${joined?.name || "the crew"} for ${event.title}.`,
      type: "success",
      actionCrewId: crewId,
    });
  };

  const handleLeaveCrew = (crewId: string) => {
    setJoinedCrewsMap((prev) => ({ ...prev, [crewId]: false }));
    const left = crews.find((c) => c.id === crewId);
    setNotification({
      title: "LEFT CREW",
      message: `You left ${left?.name || "the crew"}.`,
      type: "info",
    });
  };

  // Request to Join Private Crew Handler
  const handleRequestJoin = (crew: EventCrew) => {
    const isCurrentlyRequested = requestedCrewsMap[crew.id] ?? false;
    setRequestedCrewsMap((prev) => ({ ...prev, [crew.id]: !isCurrentlyRequested }));

    if (!isCurrentlyRequested) {
      setNotification({
        title: "REQUEST SENT",
        message: `Your request to join ${crew.name} was sent to ${crew.creatorName}.`,
        type: "success",
      });
    }
  };

  // Create Crew Handler
  const handleCrewCreated = (newCrew: EventCrew) => {
    // Immediately prepend to top of list
    setCrews((prev) => [newCrew, ...prev]);
    // Automatically join the newly created crew
    setJoinedCrewsMap((prev) => ({ ...prev, [newCrew.id]: true }));
    setShowCreateModal(false);
    setJustCreatedCrew(newCrew);

    setNotification({
      title: "CREW CREATED",
      message: "You can now invite people going to this event.",
      type: "success",
      actionCrewId: newCrew.id,
    });
  };

  // Invite Attendee from Looking section
  const handleInviteAttendee = (attendee: LookingAttendee) => {
    setSelectedInviteAttendee(attendee);
    setShowInviteModal(true);
  };

  // Filter and Sort Logic
  const filteredAndSortedCrews = useMemo(() => {
    let result = [...crews];

    // 1. Text Search Filter (name, description, area, genre/interests)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.area.toLowerCase().includes(q) ||
          (c.vibeTag && c.vibeTag.toLowerCase().includes(q)) ||
          c.interests.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // 2. Category Filters
    switch (activeFilter) {
      case "OPEN SPOTS":
        result = result.filter((c) => {
          const isJoined = joinedCrewsMap[c.id] ?? false;
          const openSpots = isJoined ? c.openSpots - 1 : c.openSpots;
          return openSpots > 0 && c.status !== "full";
        });
        break;
      case "NEARBY":
        // Prioritize event's venue area or major party hubs
        result = result.filter(
          (c) =>
            c.area.toLowerCase().includes("koramangala") ||
            c.area.toLowerCase().includes("indiranagar")
        );
        break;
      case "POPULAR":
        result = result.filter((c) => c.memberCount >= 6);
        break;
      case "NEW":
        // Newly added or highest open spots ratio
        result = result.filter((c) => c.id.startsWith("crew-") || c.openSpots >= 2);
        break;
      case "ALL":
      default:
        break;
    }

    // 3. Sorting
    switch (activeSort) {
      case "Most Members":
        result.sort((a, b) => {
          const aCount = (joinedCrewsMap[a.id] ? 1 : 0) + a.memberCount;
          const bCount = (joinedCrewsMap[b.id] ? 1 : 0) + b.memberCount;
          return bCount - aCount;
        });
        break;
      case "Most Open Spots":
        result.sort((a, b) => b.openSpots - a.openSpots);
        break;
      case "Newest":
        // Newly created first
        result.sort((a, b) => (b.id.startsWith("crew-") ? 1 : 0) - (a.id.startsWith("crew-") ? 1 : 0));
        break;
      case "Recommended":
      default:
        result.sort((a, b) => (b.matchPercentage ?? 80) - (a.matchPercentage ?? 80));
        break;
    }

    return result;
  }, [crews, searchQuery, activeFilter, activeSort, joinedCrewsMap]);

  // Statistics calculation
  const totalCrewsGoing = crews.length;
  const totalPeopleInCrews = useMemo(() => {
    return crews.reduce((acc, c) => acc + c.memberCount + (joinedCrewsMap[c.id] ? 1 : 0), 0);
  }, [crews, joinedCrewsMap]);
  const totalOpenSpots = useMemo(() => {
    return crews.reduce((acc, c) => acc + Math.max(0, c.openSpots - (joinedCrewsMap[c.id] ? 1 : 0)), 0);
  }, [crews, joinedCrewsMap]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Container */}
      <div className="w-full pt-[88px] pb-[80px]">
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Notification Banner / Toast */}
          {notification && (
            <div className="mb-6 p-4 rounded-2xl bg-[#141418] border border-[#8B5CF6]/50 shadow-[0_0_24px_rgba(139,92,246,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] font-sans">
                    {notification.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {notification.actionCrewId && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowInviteModal(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-semibold transition-colors"
                    >
                      INVITE PEOPLE
                    </button>
                    <Link
                      href={`/crews/${notification.actionCrewId}`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1A1A21] hover:bg-[#2A2A35] text-white text-xs font-mono font-medium border border-[#2A2A35] transition-colors"
                    >
                      VIEW CREW →
                    </Link>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setNotification(null)}
                  className="p-1.5 text-xs font-mono text-[#A1A1AA] hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* 2. Event Header */}
          <EventHeader event={event} />

          {/* 3. Event Navigation (Tabs) */}
          <EventNavTabs eventId={event.id} />

          {/* 4. Crew Hero */}
          <CrewHero
            eventId={event.id}
            onCreateCrew={() => setShowCreateModal(true)}
          />

          {/* 5. Crew Stats */}
          <CrewStats
            crewsCount={totalCrewsGoing}
            peopleCount={totalPeopleInCrews}
            openSpotsCount={totalOpenSpots}
          />

          {/* 6. Find a Crew (Search, Filters, Sort) */}
          <CrewFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeSort={activeSort}
            onSortChange={setActiveSort}
            totalCrewsCount={filteredAndSortedCrews.length}
          />

          {/* 7. Create a Crew CTA */}
          <CreateCrewCTA onCreateClick={() => setShowCreateModal(true)} />

          {/* 8. All Event Crews Grid */}
          <section className="w-full mb-16">
            {filteredAndSortedCrews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedCrews.map((crew) => {
                  const isJoined = joinedCrewsMap[crew.id] ?? false;
                  const hasRequested = requestedCrewsMap[crew.id] ?? false;

                  return (
                    <EventCrewCard
                      key={crew.id}
                      crew={crew}
                      isJoined={isJoined}
                      hasRequested={hasRequested}
                      onJoinClick={handleOpenJoinModal}
                      onRequestClick={handleRequestJoin}
                    />
                  );
                })}
              </div>
            ) : (
              /* 16. Empty State */
              <div className="p-10 sm:p-14 rounded-[20px] bg-[#141418] border border-[#2A2A35] text-center max-w-lg mx-auto">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-4">
                  <SearchX className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold font-sans text-white mb-2">
                  NO CREWS YET
                </h4>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mb-6">
                  {searchQuery || activeFilter !== "ALL"
                    ? "No crews match your current search or filter criteria. Try clearing filters or create a new crew."
                    : "Be the first to create a crew for this event."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>CREATE A CREW</span>
                  </button>

                  {searchQuery || activeFilter !== "ALL" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter("ALL");
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-white text-xs font-mono font-medium border border-[#2A2A35] transition-colors"
                    >
                      RESET FILTERS
                    </button>
                  ) : (
                    <Link
                      href={`/events/${event.id}/going`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-white text-xs font-mono font-medium border border-[#2A2A35] transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-[#EC4899]" />
                      <span>FIND PEOPLE</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* 9. Looking for Crew Section */}
          <LookingForCrew
            attendees={mockLookingAttendees}
            onInviteAttendee={handleInviteAttendee}
            eventId={event.id}
          />

          {/* 10. Crew Planning Preview */}
          <CrewPlanningPreview />
        </div>
      </div>

      {/* 11. Footer */}
      <Footer />

      {/* Create Crew Modal */}
      <CreateCrewModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        eventTitle={event.title}
        eventId={event.id}
        isAuthenticated={isAuthenticated}
        onAuthenticate={() => setIsAuthenticated(true)}
        onCrewCreated={handleCrewCreated}
      />

      {/* Invite Crew Modal */}
      <InviteCrewModal
        isOpen={showInviteModal}
        onClose={() => {
          setShowInviteModal(false);
          setSelectedInviteAttendee(null);
        }}
        crewName={justCreatedCrew?.name || "Your Crew"}
        availableCrews={crews}
        preselectedAttendee={selectedInviteAttendee}
      />

      {/* Join Confirmation Modal */}
      <JoinConfirmModal
        isOpen={!!targetJoinCrew}
        onClose={() => setTargetJoinCrew(null)}
        crew={targetJoinCrew}
        eventTitle={event.title}
        isCurrentlyJoined={targetJoinCrew ? !!joinedCrewsMap[targetJoinCrew.id] : false}
        onConfirmJoin={handleConfirmJoin}
        onLeaveCrew={handleLeaveCrew}
      />
    </main>
  );
}
