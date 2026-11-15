import Link from "next/link";
import Image from "next/image";
import { CatalogEvent, formatINR, unsplash } from "@/lib/event-catalog";

const TAG_COLORS: Record<string, string> = {
  TECHNO: "bg-yellow",
  ELECTRONIC: "bg-yellow",
  HOUSE: "bg-sky",
  BOLLYWOOD: "bg-pink",
  "LIVE MUSIC": "bg-sky",
  ROOFTOP: "bg-paper",
  COMEDY: "bg-lime",
  JAZZ: "bg-sky",
};

export function Tag({
  children,
  className = "bg-paper",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-mono text-[11px] font-semibold tracking-[0.06em] leading-none text-night px-2.5 py-1.5 rounded-full whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

/** Event card used on the landing page and anywhere a compact event preview is needed. */
export default function EventTile({ event }: { event: CatalogEvent }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col bg-tile border border-line rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3A3A48]"
    >
      <div className="relative aspect-[4/3.4] overflow-hidden bg-[#1c1c24]">
        <Image
          src={unsplash(event.img, 700)}
          alt={`${event.title} at ${event.venue}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-3 top-3 flex justify-between items-start gap-2">
          <Tag className={TAG_COLORS[event.category] ?? "bg-paper"}>{event.category}</Tag>
          {event.age === "21+" && <Tag className="bg-pink">21+</Tag>}
        </div>
        <Tag className="absolute left-3 bottom-3 bg-paper/90 backdrop-blur">+{event.going} going</Tag>
      </div>
      <div className="flex flex-col gap-1 p-4 flex-1">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-yellow">
          {event.date} · {event.time}
        </span>
        <h3 className="text-[19px] font-bold leading-tight tracking-[-0.02em] mt-0.5">{event.title}</h3>
        <span className="text-muted text-[13px]">
          {event.venue} · {event.area}
        </span>
        <div className="flex justify-between items-end mt-auto pt-4">
          <span className="text-[18px] font-bold leading-none">
            <small className="block font-mono text-[10px] text-muted tracking-[0.06em] mb-1">FROM</small>
            {formatINR(event.price)}
          </span>
          <span className="text-[13px] font-semibold bg-yellow text-night rounded-full px-3.5 py-2 group-hover:bg-[#FFEA80] transition-colors">
            Get tickets
          </span>
        </div>
      </div>
    </Link>
  );
}
