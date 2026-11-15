"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { allCrewsData } from "@/lib/crews-data";
import { mockPeopleData } from "@/lib/people-data";

const crew = allCrewsData[0];
const match = mockPeopleData[0];

const CHAT: { text: string; me: boolean }[] = [
  { text: "who’s coming saturday?", me: false },
  { text: "", me: true }, // typing
  { text: "me + 2 friends, reaching by 10", me: true },
  { text: "adding you to the crew 🙌", me: false },
];

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[11px] tracking-[0.09em] uppercase text-muted">{children}</span>;
}

function QR() {
  const cells = [];
  for (let y = 0; y < 17; y++)
    for (let x = 0; x < 17; x++) {
      const finder = (x < 5 && y < 5) || (x > 11 && y < 5) || (x < 5 && y > 11);
      let on: boolean;
      if (finder) {
        const lx = x > 11 ? x - 12 : x;
        const ly = y > 11 ? y - 12 : y;
        on = lx === 0 || lx === 4 || ly === 0 || ly === 4 || (lx === 2 && ly === 2);
      } else on = (x * 7 + y * 13 + x * y) % 5 < 2;
      cells.push(<i key={`${x}-${y}`} className={on ? "bg-night" : ""} />);
    }
  return (
    <div className="relative w-24 h-24 shrink-0 bg-white rounded-[10px] p-[7px] grid grid-cols-[repeat(17,1fr)] overflow-hidden border border-[#E6DDC8]" aria-hidden="true">
      {cells}
      <span className="absolute left-0 right-0 h-[3px] bg-pink shadow-[0_0_12px_#FF4FA3] animate-[qrScan_2s_ease-in-out_infinite_alternate]" />
    </div>
  );
}

export default function NightBento() {
  const [step, setStep] = useState(1);
  const [ringOn, setRingOn] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setStep((s) => (s >= CHAT.length ? 1 : s + 1)), step === CHAT.length ? 2600 : 1300);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const el = ringRef.current;
    if (!el || !("IntersectionObserver" in window)) return setRingOn(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRingOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = CHAT.slice(0, Math.min(step, CHAT.length)).filter((m, i, arr) => m.text || i === arr.length - 1);
  const filled = crew.memberCount;
  const total = crew.maxMembers;

  return (
    <section id="crews" className="max-w-[1280px] mx-auto px-5 sm:px-6 pt-24 pb-6 scroll-mt-20">
      <div className="flex flex-wrap justify-between items-end gap-5 mb-7">
        <div>
          <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-3">↗ Crews · people · tickets</p>
          <h2 className="font-extrabold uppercase text-[clamp(44px,7vw,100px)] leading-[0.88] m-0">
            Your night, <span className="text-yellow">sorted.</span>
          </h2>
        </div>
        <p className="text-muted max-w-[38ch] m-0">
          Going alone? Join a crew for the same event, chat before you go, and walk in with people on your wavelength.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] auto-rows-[minmax(170px,auto)] gap-3.5">
        {/* Crew */}
        <div className="md:col-span-2 lg:col-span-1 lg:row-span-3 bg-tile border border-line rounded-[22px] p-5 flex flex-col gap-3 relative overflow-hidden"
          style={{ background: "radial-gradient(90% 60% at 100% 0%, rgba(255,79,163,.28), transparent 65%), #15151C" }}>
          <span className="absolute right-4 top-4 font-mono text-[11px] font-semibold text-night bg-yellow rounded-full px-2.5 py-1.5">
            {total - filled} spots left
          </span>
          <Label>Crew · {crew.date} · {crew.time}</Label>
          <h3 className="font-display font-extrabold uppercase text-[32px] leading-[0.95] m-0" style={{ fontStretch: "110%" }}>
            {crew.name}
          </h3>
          <span className="text-muted text-[14px]">{crew.venue} · {crew.area} · going to {crew.eventName.toLowerCase()}</span>
          <ul className="flex flex-col gap-2.5 mt-1">
            {crew.members.slice(0, 3).map((m) => (
              <li key={m.id} className="flex items-center gap-3 text-[14px]">
                <Image src={m.avatar} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-semibold">{m.name}</span>
                <span className="ml-auto font-mono text-[12px] text-lime">{m.vibeMatch}% match</span>
              </li>
            ))}
          </ul>
          <div className="mt-1">
            <div className="flex justify-between text-[13px] text-muted mb-1.5">
              <span>{filled} of {total} spots filled</span>
              <span>{total - filled} left</span>
            </div>
            <div className="h-2 bg-line rounded-full overflow-hidden">
              <i className="block h-full rounded-full bg-gradient-to-r from-yellow to-pink" style={{ width: `${(filled / total) * 100}%` }} />
            </div>
          </div>
          <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-muted text-[13px]">Started by {crew.createdBy}</span>
            <Link href={`/crews/${crew.id}`} className="rounded-full bg-yellow text-night font-semibold text-[14px] px-4 py-2.5 hover:bg-[#FFEA80] transition-colors">
              View crew
            </Link>
          </div>
        </div>

        {/* Vibe score */}
        <div ref={ringRef} className="bg-tile border border-line rounded-[22px] p-5 flex items-center gap-5">
          <svg viewBox="0 0 96 96" className="w-24 h-24 shrink-0 -rotate-90" aria-hidden="true">
            <circle cx="48" cy="48" r="41" fill="none" strokeWidth="10" className="stroke-line" />
            <circle cx="48" cy="48" r="41" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-sky"
              style={{ strokeDasharray: 258, strokeDashoffset: ringOn ? 34 : 258, transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)" }} />
          </svg>
          <div className="flex flex-col gap-1">
            <Label>Your vibe score</Label>
            <span className="font-display font-black text-[46px] leading-none" style={{ fontStretch: "120%" }}>87</span>
            <span className="text-lime text-[13px]">▲ 4 this week · 6 events attended</span>
          </div>
        </div>

        {/* Chat */}
        <div className="bg-tile border border-line rounded-[22px] p-5 flex flex-col gap-2.5 min-h-[190px]" aria-label="Example crew chat">
          <Label>Crew chat</Label>
          {shown.map((m, i) =>
            m.text ? (
              <div key={i} className={`max-w-[92%] px-3.5 py-2 text-[14px] animate-[popIn_.35s_cubic-bezier(.3,1.5,.5,1)_both] ${
                m.me ? "self-end bg-pink text-night rounded-[16px_16px_4px_16px]" : "self-start bg-[#22222C] rounded-[16px_16px_16px_4px]"}`}>
                {m.text}
              </div>
            ) : (
              <div key={i} className="self-end bg-[#22222C] rounded-[16px_16px_4px_16px] px-3.5 py-3 flex gap-1" aria-label="typing">
                {[0, 1, 2].map((d) => (
                  <i key={d} className="w-1.5 h-1.5 rounded-full bg-muted animate-[typingDot_1s_infinite]" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            )
          )}
        </div>

        {/* Ticket */}
        <Link href="/checkout?event=techno-night-playboy&tier=t1" className="bg-paper text-night border border-paper rounded-[22px] p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <QR />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] tracking-[0.09em] uppercase text-[#6B6458]">Entry pass</span>
            <b className="font-display font-extrabold uppercase text-[22px] leading-none" style={{ fontStretch: "115%" }}>Techno Night</b>
            <span className="text-[13px] text-[#4C463C]">Playboy Club · Sat 19 Jul<br />Show this QR at the door</span>
          </div>
        </Link>

        {/* Vibe match */}
        <Link href={`/people/${match.id}`} className="bg-tile border border-line rounded-[22px] p-5 flex items-center gap-4 hover:border-[#3A3A48] transition-colors">
          <div className="flex shrink-0">
            <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop" alt="" width={52} height={52} className="w-[52px] h-[52px] rounded-full object-cover border-[3px] border-tile" />
            <Image src={match.avatar} alt="" width={52} height={52} className="w-[52px] h-[52px] rounded-full object-cover border-[3px] border-tile -ml-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <Label>Vibe match</Label>
            <b className="font-display font-black text-[30px] leading-none text-lime" style={{ fontStretch: "120%" }}>{match.vibeMatch}%</b>
            <p className="m-0 text-muted text-[13px]">You and {match.name.split(" ")[0]} both love {match.genres[0]?.toLowerCase() ?? "techno"} and hang out in {match.area}.</p>
          </div>
        </Link>

        {/* Areas */}
        <Link href="/discover" className="md:col-span-2 bg-tile border border-line rounded-[22px] p-5 flex flex-col justify-between gap-3 overflow-hidden hover:border-[#3A3A48] transition-colors">
          <Label>Your areas</Label>
          <div className="overflow-hidden -mx-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="flex gap-2 w-max animate-[bandScroll_18s_linear_infinite]">
              {[0, 1].flatMap((h) =>
                ["Indiranagar", "Koramangala", "HSR Layout", "UB City", "Whitefield", "MG Road"].map((a, i) => (
                  <span key={`${h}-${a}`} className={`px-3 py-2 rounded-full text-[14px] whitespace-nowrap ${
                    i % 3 === 2 ? "bg-yellow text-night" : i % 4 === 3 ? "bg-sky text-night" : "bg-[#22222C]"}`}>
                    {a}
                  </span>
                ))
              )}
            </div>
          </div>
          <span className="text-muted text-[13px]">14 events near you this weekend</span>
        </Link>
      </div>
    </section>
  );
}
