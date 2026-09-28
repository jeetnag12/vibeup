import Link from "next/link";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventReviewsSectionProps {
  event: DetailedEvent;
}

export default function EventReviewsSection({
  event,
}: EventReviewsSectionProps) {
  return (
    <section className="w-full my-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
            VERIFIED ATTENDEE FEEDBACK
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
            style={{ fontWeight: 700 }}
          >
            REVIEWS
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-sans mt-1">
            Authentic ratings from attendees who checked in at XYZ Club.
          </p>
        </div>

        <Link
          href={`/events/${event.id}/reviews`}
          className="group inline-flex items-center gap-1.5 text-[#8B5CF6] hover:text-purple-300 font-medium text-sm transition-colors shrink-0"
        >
          <span>VIEW ALL REVIEWS</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Ratings Overview Card */}
      <div className="p-6 rounded-[16px] bg-[#141418] border border-[#2A2A35] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Main Score */}
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
              <p className="font-sans text-xs text-[#A1A1AA]">
                Based on{" "}
                <span className="text-white font-medium">
                  {event.reviewCount} verified attendees
                </span>
              </p>
            </div>
          </div>

          {/* Rating Dimensions: MUSIC 4.8, CROWD 4.6, VENUE 4.5 */}
          <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-[#2A2A35] pt-4 md:pt-0 md:pl-8">
            <div>
              <span className="font-mono text-[11px] text-[#A1A1AA] block mb-1">
                MUSIC
              </span>
              <span className="font-mono text-lg font-bold text-white">
                {event.ratingDimensions.music}
              </span>
            </div>

            <div>
              <span className="font-mono text-[11px] text-[#A1A1AA] block mb-1">
                CROWD
              </span>
              <span className="font-mono text-lg font-bold text-white">
                {event.ratingDimensions.crowd}
              </span>
            </div>

            <div>
              <span className="font-mono text-[11px] text-[#A1A1AA] block mb-1">
                VENUE
              </span>
              <span className="font-mono text-lg font-bold text-white">
                {event.ratingDimensions.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {event.reviews.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.avatar}
                    alt={r.authorName}
                    className="w-9 h-9 rounded-full object-cover border border-[#2A2A35]"
                  />
                  <div>
                    <h5 className="font-sans font-semibold text-white text-sm">
                      {r.authorName}
                    </h5>
                    <div className="flex items-center gap-1 text-[#22C55E] text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Attendee</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{r.rating}</span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#D4D4D8] leading-relaxed mb-4">
                &ldquo;{r.comment}&rdquo;
              </p>
            </div>

            <span className="font-mono text-[11px] text-[#71717A] pt-3 border-t border-[#2A2A35]">
              Attended: {r.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
