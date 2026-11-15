import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Terms · VibeUp" };

export default function TermsPage() {
  return (
    <InfoPage
      kicker="Terms of use · draft"
      title="The"
      accent="rules"
      intro="Draft for the prototype. Have a lawyer review these terms before launch."
      updated="13 Nov 2026"
    >
      <section>
        <h2>Who can use VibeUp</h2>
        <p>You must be 18 or older. Some events are 21+, and venues may refuse entry without valid photo ID.</p>
      </section>
      <section>
        <h2>Tickets</h2>
        <ul>
          <li>Tickets are issued by the event organiser and sold through VibeUp.</li>
          <li>Refunds and cancellations follow the policy shown on each event page.</li>
          <li>Tickets may not be resold above face value.</li>
        </ul>
      </section>
      <section>
        <h2>Crews, communities and messages</h2>
        <ul>
          <li>Be respectful. Harassment, hate speech and unwanted contact lead to removal.</li>
          <li>Community creators must keep their community within these rules.</li>
          <li>Do not share another person&apos;s private details without consent.</li>
        </ul>
      </section>
      <section>
        <h2>Changes</h2>
        <p>We may update these terms. We will tell you in the app before major changes take effect.</p>
      </section>
    </InfoPage>
  );
}
