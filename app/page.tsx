import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/landing/LandingHero";
import Band from "@/components/landing/Band";
import WeekendEvents from "@/components/landing/WeekendEvents";
import NightBento from "@/components/landing/NightBento";
import LandingCommunities from "@/components/landing/LandingCommunities";

const WEEKEND_BAND = [
  "Sat 19 · Techno Night · Playboy Club",
  "Sun 20 · Parvaaz Live · Phoenix",
  "Sat 19 · Bollywood Saturdays · Toit",
  "Sun 20 · Sundowner · The Skyye",
  "Fri 18 · Comedy Night · Canvas Laugh",
];

const PROMISE_BAND = ["Find your crowd", "Book tickets", "Start a crew", "Meet your people", "Don’t go solo"];

export default function Home() {
  return (
    <main className="min-h-screen bg-night text-white overflow-x-hidden">
      <Navbar />
      <LandingHero />
      <Band items={WEEKEND_BAND} />
      <WeekendEvents />
      <div className="mt-16">
        <Band items={PROMISE_BAND} tone="pink" reverse tilt symbol="★" />
      </div>
      <NightBento />
      <LandingCommunities />

      <section className="mt-24 bg-yellow text-night">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 pt-[90px] pb-[100px]">
          <h2 className="font-black uppercase text-[clamp(60px,12vw,170px)] leading-[0.84] m-0" style={{ fontStretch: "120%" }}>
            Don&apos;t go
            <br />
            <span className="text-pink">solo.</span>
          </h2>
          <p className="text-[19px] max-w-[44ch] mt-6 mb-7">
            Join VibeUp free. Pick your music and your areas, and find the people going where you&apos;re going.
          </p>
          <Link href="/signup" className="inline-block rounded-full bg-night text-yellow font-semibold text-[16px] px-7 py-4 hover:-translate-y-0.5 transition-transform">
            Join VibeUp →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
