import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Privacy · VibeUp" };

export default function PrivacyPage() {
  return (
    <InfoPage
      kicker="Privacy policy · draft"
      title="Your"
      accent="privacy"
      intro="Draft for the prototype. Have a lawyer review this against India's Digital Personal Data Protection Act, 2023 before launch."
      updated="13 Nov 2026"
    >
      <section>
        <h2>What we collect</h2>
        <ul>
          <li>Account details: name, username, phone number, date of birth.</li>
          <li>Profile choices: interests, music genres, areas, photo.</li>
          <li>Activity: tickets booked, events attended, crews and communities joined, follows and messages.</li>
          <li>Payments are processed by our payment partner. We never store full card numbers.</li>
        </ul>
      </section>
      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To sell and verify tickets, and check age at the door.</li>
          <li>To calculate vibe score and vibe match, and suggest events, crews and people.</li>
          <li>To keep the community safe: verification, blocking and reports.</li>
        </ul>
      </section>
      <section>
        <h2>Your controls</h2>
        <p>You choose who can message you, can hide your profile from search, and can download or delete your data from settings.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about your data: message @vibeup.bangalore on Instagram until our support email is live.</p>
      </section>
    </InfoPage>
  );
}
