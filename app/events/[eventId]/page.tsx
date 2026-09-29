"use client";

import { useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHero from "@/components/event-details/EventHero";
import EventSocialSignal from "@/components/event-details/EventSocialSignal";
import EventInfoGrid from "@/components/event-details/EventInfoGrid";
import StickyTicketCard from "@/components/event-details/StickyTicketCard";
import WhosGoingSection from "@/components/event-details/WhosGoingSection";
import VibeMatchSection from "@/components/event-details/VibeMatchSection";
import EventDiscussionSection from "@/components/event-details/EventDiscussionSection";
import EventCrewsSection from "@/components/event-details/EventCrewsSection";
import EventDescriptionSection from "@/components/event-details/EventDescriptionSection";
import EventRulesSection from "@/components/event-details/EventRulesSection";
import EventReviewsSection from "@/components/event-details/EventReviewsSection";
import RelatedEventsSection from "@/components/event-details/RelatedEventsSection";
import { useParams } from "next/navigation";
import { getEventById } from "@/lib/events-data";

interface EventPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventDetailsPage({ params }: EventPageProps) {
  const routeParams = useParams();
  const rawId = (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";

  const event = useMemo(() => {
    return getEventById(rawId);
  }, [rawId]);

  const ticketCardRef = useRef<HTMLDivElement>(null);

  const scrollToTickets = () => {
    if (ticketCardRef.current) {
      ticketCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Container */}
      <div className="w-full pt-[88px] pb-[80px]">
        {/* Ambient Top Glow Blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Section: Hero + Social Signal */}
          <div className="mb-8">
            {/* 2. Event Hero */}
            <EventHero event={event} onGetTicketsClick={scrollToTickets} />

            {/* Event Social Signal (immediately below main event info) */}
            <EventSocialSignal event={event} />
          </div>

          {/* 3. Event Information (clean grid) */}
          <EventInfoGrid event={event} />

          {/* Main 2-Column Content + Sticky Ticket Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Content Column (Sections 5-11) */}
            <div className="lg:col-span-8 flex flex-col w-full">
              {/* 5. Who's Going */}
              <WhosGoingSection event={event} />

              {/* 6. People You May Vibe With */}
              <VibeMatchSection event={event} />

              {/* 7. Event Discussion */}
              <EventDiscussionSection event={event} />

              {/* 8. Event Crews */}
              <EventCrewsSection event={event} />

              {/* 9. Event Description */}
              <EventDescriptionSection event={event} />

              {/* 10. Event Details / Rules */}
              <EventRulesSection event={event} />

              {/* 11. Reviews */}
              <EventReviewsSection event={event} />
            </div>

            {/* Right Column: 4. Sticky Ticket Card */}
            <div ref={ticketCardRef} className="lg:col-span-4 w-full">
              <StickyTicketCard event={event} />
            </div>
          </div>

          {/* 12. Related Events */}
          <RelatedEventsSection />
        </div>
      </div>

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
