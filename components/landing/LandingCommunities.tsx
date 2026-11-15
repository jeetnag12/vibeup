import Link from "next/link";
import Image from "next/image";
import { allCommunitiesData } from "@/lib/communities-data";
import { Tag } from "./EventTile";

const picks = allCommunitiesData.slice(0, 3);
const badge = (i: number, trending?: boolean) =>
  i === 0 ? { text: "VERIFIED", cls: "bg-sky" } : trending ? { text: "TRENDING", cls: "bg-yellow" } : { text: "NEW", cls: "bg-lime" };

export default function LandingCommunities() {
  return (
    <section id="communities" className="max-w-[1280px] mx-auto px-5 sm:px-6 pt-24 pb-6 scroll-mt-20">
      <div className="flex flex-wrap justify-between items-end gap-5 mb-7">
        <div>
          <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-3">↗ Communities</p>
          <h2 className="font-extrabold uppercase text-[clamp(44px,7vw,100px)] leading-[0.88] m-0">
            Find your <span className="text-pink">people</span>
          </h2>
        </div>
        <Link href="/communities" className="rounded-full border border-[#3A3A48] px-5 py-3 text-[15px] font-semibold hover:bg-tile transition-colors">
          Browse all communities
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {picks.map((c, i) => {
          const b = badge(i, c.trending);
          return (
            <Link key={c.id} href={`/communities/${c.id}`} className="group bg-tile border border-line rounded-[22px] overflow-hidden flex flex-col hover:border-[#3A3A48] transition-colors">
              <div className="relative h-[150px] overflow-hidden">
                <Image src={c.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night/90" />
                <Tag className={`absolute right-3 top-3 ${b.cls}`}>{b.text}</Tag>
                <h3 className="absolute left-4 bottom-2.5 right-4 m-0 font-display font-extrabold uppercase text-[24px] leading-[0.95]" style={{ fontStretch: "110%" }}>
                  {c.name}
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                <p className="m-0 text-muted text-[14px] line-clamp-2">{c.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-mono text-[12px] text-muted">
                    <b className="text-white font-sans text-[15px]">{c.memberCountDisplay}</b> members
                  </span>
                  <span className="font-mono text-[12px] text-muted">
                    <b className="text-white font-sans text-[15px]">{c.upcomingEventsCount ?? 2}</b> events
                  </span>
                  <span className="rounded-full bg-yellow text-night text-[13px] font-semibold px-3.5 py-2">Join</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
