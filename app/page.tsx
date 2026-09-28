import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingSection from "@/components/TrendingSection";
import PopularClubs from "@/components/PopularClubs";
import FindYourCrowd from "@/components/FindYourCrowd";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden relative w-full">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <Hero />

      {/* 3. TrendingSection */}
      <TrendingSection />

      {/* 4. PopularClubs */}
      <PopularClubs />

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
