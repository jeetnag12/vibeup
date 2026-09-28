"use client";

import { useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Star, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { getEventById } from "@/lib/events-data";

interface ReviewsPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventReviewsPage({ params }: ReviewsPageProps) {
  const routeParams = useParams();
  const rawId = (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";
  const event = useMemo(() => getEventById(rawId), [rawId]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO EVENT</span>
          </Link>

          <div className="mb-8">
            <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
              ATTENDEE EXPERIENCES
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white">
              Event Reviews &amp; Ratings
            </h1>
            <p className="text-sm text-[#A1A1AA] font-sans mt-1">
              {event.title} · Based on {event.reviewCount} verified attendees at {event.venue}
            </p>
          </div>

          {/* Rating Breakdown Summary */}
          <div className="p-6 rounded-[16px] bg-[#141418] border border-[#2A2A35] mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A21] border border-[#2A2A35] flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-sans text-white">
                  {event.overallRating}
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">OUT OF 5</span>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#A1A1AA] font-sans">
                  {event.reviewCount} verified attendees reviewed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t sm:border-t-0 sm:border-l border-[#2A2A35] pt-4 sm:pt-0 sm:pl-8 text-center sm:text-left">
              <div>
                <span className="font-mono text-xs text-[#A1A1AA] block mb-1">
                  MUSIC
                </span>
                <span className="font-mono text-lg font-bold text-white">
                  {event.ratingDimensions.music}
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A1A1AA] block mb-1">
                  CROWD
                </span>
                <span className="font-mono text-lg font-bold text-white">
                  {event.ratingDimensions.crowd}
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A1A1AA] block mb-1">
                  VENUE
                </span>
                <span className="font-mono text-lg font-bold text-white">
                  {event.ratingDimensions.venue}
                </span>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {event.reviews.map((r) => (
              <div
                key={r.id}
                className="p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.avatar}
                      alt={r.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#2A2A35]"
                    />
                    <div>
                      <h4 className="font-sans font-semibold text-white text-base">
                        {r.authorName}
                      </h4>
                      <div className="flex items-center gap-1 text-[#22C55E] text-xs font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Attendee</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{r.rating}</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#D4D4D8] leading-relaxed mb-4 pl-1">
                  &ldquo;{r.comment}&rdquo;
                </p>

                <span className="font-mono text-xs text-[#71717A]">
                  Attended: {r.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
