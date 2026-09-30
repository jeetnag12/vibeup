import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CardCarousel, { CarouselItem } from "@/components/CardCarousel";
import TrendingSection from "@/components/TrendingSection";
import PopularClubs from "@/components/PopularClubs";
import {
  StarShape,
  DotGrid,
  CrossHair,
  TriangleSet,
} from "@/components/Decoratives";
import FindYourCrowd from "@/components/FindYourCrowd";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const weekendCarouselItems: CarouselItem[] = [
  {
    id: "techno-night-playboy",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Techno night",
    subtitle: "Playboy Club · Indiranagar",
    price: "₹999",
    date: "Sat Jul 19",
  },
  {
    id: "bollywood-saturdays-toit",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "Bollywood Saturdays",
    subtitle: "Toit · Koramangala",
    price: "₹599",
    date: "Sat Jul 19",
  },
  {
    id: "parvaaz-live-phoenix",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    title: "Parvaaz Live",
    subtitle: "Phoenix · Whitefield",
    price: "₹1299",
    date: "Sun Jul 20",
  },
  {
    id: "sundowner-the-skyye",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    title: "Sundowner",
    subtitle: "The Skyye · UB City",
    price: "₹799",
    date: "Sun Jul 20",
  },
  {
    id: "comedy-night-canvas",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=800&auto=format&fit=crop",
    category: "COMEDY",
    title: "Comedy Night",
    subtitle: "Canvas Laugh · Indiranagar",
    price: "₹699",
    date: "Fri Jul 18",
  },
  {
    id: "underground-rave-secret",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    category: "ELECTRONIC",
    title: "Underground Rave",
    subtitle: "Secret Venue · Central BLR",
    price: "₹1499",
    date: "Sat Jul 19",
  },
  {
    id: "jazz-evening-windmills",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
    category: "JAZZ",
    title: "Jazz Evening",
    subtitle: "Windmills · Whitefield",
    price: "₹899",
    date: "Sun Jul 20",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden relative w-full">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <div className="relative w-full overflow-hidden">
        <Hero />

        {/* StarShape (60px) — top right of hero section */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            right: "8%",
            zIndex: 25,
            transform: "rotate(15deg)",
          }}
        >
          <StarShape size={60} />
        </div>

        {/* TriangleSet — scattered in hero */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            top: "16%",
            left: "8%",
            zIndex: 25,
            opacity: 0.7,
            transform: "rotate(-10deg)",
          }}
        >
          <TriangleSet size={44} />
        </div>

        <div
          className="absolute pointer-events-none"
          style={{
            top: "64%",
            right: "10%",
            zIndex: 25,
            opacity: 0.65,
            transform: "rotate(20deg)",
          }}
        >
          <TriangleSet size={36} />
        </div>
      </div>

      {/* 2.5. FULL WIDTH 3D CARD CAROUSEL (BETWEEN HERO AND TRENDING) */}
      <section
        className="w-full relative z-10 select-none overflow-hidden"
        style={{
          backgroundColor: "#000000",
          padding: "80px 0",
        }}
      >
        {/* Section header (px-8 max-width 1440px mx-auto mb-12) */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 mb-12">
          <span
            className="block font-mono text-[#8B5CF6] uppercase mb-2 font-bold"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
            }}
          >
            ↗ EVENTS THIS WEEKEND
          </span>
          <h2
            className="font-sans text-white m-0 leading-[0.95]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
            }}
          >
            DISCOVER WHAT&apos;S ON
          </h2>
        </div>

        {/* Full-width CardCarousel */}
        <CardCarousel
          items={weekendCarouselItems}
          initialIndex={2}
          autoPlay={true}
          interval={3000}
        />
      </section>

      {/* 3. TrendingSection */}
      <div className="relative w-full">
        <TrendingSection />
        {/* DotGrid — bottom left of trending section */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "40px",
            left: "40px",
            zIndex: 20,
          }}
        >
          <DotGrid />
        </div>
      </div>

      {/* 4. PopularClubs */}
      <div className="relative w-full overflow-hidden">
        <PopularClubs />
        {/* CrossHair (48px) — top right of clubs section */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "40px",
            right: "48px",
            zIndex: 20,
          }}
        >
          <CrossHair size={48} stroke="rgba(139, 92, 246, 0.4)" />
        </div>
      </div>

      {/* 5. FindYourCrowd */}
      <FindYourCrowd />

      {/* 6. HowItWorks */}
      <HowItWorks />

      {/* 7. CTASection */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
