import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Help & contact · VibeUp" };

const faqs = [
  ["How do I get my ticket?", "After payment your QR ticket appears in your account. Show it at the door with a government photo ID."],
  ["Can I cancel or get a refund?", "Refunds follow each event's policy, shown on the event page before you pay."],
  ["What is a crew?", "A small group going to the same event. Public crews anyone can join; private crews are invite-only."],
  ["Who can message me?", "Only verified people you both follow. You can change this to 'no one' in your profile at any time."],
  ["How old do I need to be?", "VibeUp is 18+. Some events are 21+ and the venue checks ID at entry."],
  ["How do I start a community?", "Verified members can apply. We review every application before it goes live."],
];

export default function HelpPage() {
  return (
    <InfoPage
      kicker="Help & contact"
      title="How can we"
      accent="help?"
      intro="Quick answers to the most common questions. Can't find yours? Message us on Instagram @vibeup.bangalore."
    >
      {faqs.map(([q, a]) => (
        <section key={q}>
          <h2>{q}</h2>
          <p>{a}</p>
        </section>
      ))}
      <section>
        <h2>Report a problem at an event</h2>
        <p>Tell venue staff first. Then report it from the event page or message us, and we follow up within 24 hours.</p>
      </section>
    </InfoPage>
  );
}
