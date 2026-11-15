import Link from "next/link";
import InfoPage from "@/components/InfoPage";

export const metadata = { title: "About · VibeUp" };

export default function AboutPage() {
  return (
    <InfoPage
      kicker="About VibeUp"
      title="Don't go"
      accent="solo."
      intro="VibeUp is Bangalore's social nightlife app. Book tickets, join a crew going to the same event, and meet people who like the same music as you."
    >
      <section>
        <h2>Tickets</h2>
        <p>Every gig, club night, rooftop session and comedy show in one place, with a QR ticket you show at the door.</p>
      </section>
      <section>
        <h2>Communities and crews</h2>
        <p>
          Communities are long-running groups built around a sound or a scene. Crews are small groups for one event, public or
          invite-only, so nobody has to walk in alone.
        </p>
      </section>
      <section>
        <h2>People</h2>
        <p>
          Your vibe score grows when you book, show up, join crews and get good ratings. Vibe match shows who shares your genres,
          areas and favourite clubs. Messages open only between verified people who follow each other.
        </p>
      </section>
      <section>
        <h2>Coming next</h2>
        <p>VibeUp Social, short videos from the night itself, arrives with the mobile app.</p>
        <p className="mt-6">
          <Link href="/signup" className="inline-block rounded-full bg-yellow text-night font-semibold px-6 py-3 no-underline">
            Join VibeUp →
          </Link>
        </p>
      </section>
    </InfoPage>
  );
}
