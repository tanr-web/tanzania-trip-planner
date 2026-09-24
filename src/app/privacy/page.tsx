import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tanzania Trip Planner",
  description: "Privacy policy for Tanzania Trip Planner — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Privacy Policy</h1>

      <div className="prose prose-stone prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold text-stone-800">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as:
          </p>
          <ul>
            <li><strong>Email address</strong> — when you sign up for our newsletter or create an itinerary</li>
            <li><strong>Trip preferences</strong> — travel dates, budget, group size, interests (only used to generate your itinerary)</li>
            <li><strong>Usage data</strong> — pages visited, links clicked (via Google Analytics)</li>
            <li><strong>Device information</strong> — browser type, IP address (via standard web analytics)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">2. How We Use Your Information</h2>
          <ul>
            <li><strong>Generate itineraries</strong> — Your preferences are sent to our AI (Groq) to create personalised trip plans</li>
            <li><strong>Email communication</strong> — We send newsletters, packing lists, and promotional content (you can unsubscribe anytime)</li>
            <li><strong>Analytics</strong> — We use Google Analytics to understand how you use the site, improve features, and track engagement</li>
            <li><strong>Legal compliance</strong> — We may use information to comply with laws or resolve disputes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">3. Data Storage & Security</h2>
          <ul>
            <li><strong>Itinerary data</strong> — Stored locally in your browser's localStorage (not our servers)</li>
            <li><strong>Email addresses</strong> — Stored securely with Resend (our email provider)</li>
            <li><strong>Analytics</strong> — Google Analytics data is stored by Google in accordance with their privacy policy</li>
            <li><strong>AI processing</strong> — Trip preferences are sent to Groq's servers for AI processing and then deleted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics</strong> — Tracks website usage and behavior</li>
            <li><strong>Groq API</strong> — Processes your trip preferences to generate itineraries</li>
            <li><strong>Resend</strong> — Handles email delivery and newsletter management</li>
            <li><strong>Sanity.io</strong> — Content management system for destinations, hotels, restaurants</li>
            <li><strong>Supabase</strong> — Database for user itineraries and data</li>
            <li><strong>Mapbox</strong> — Map services and location data</li>
          </ul>
          <p>Each provider has their own privacy policy. We recommend reviewing them.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">5. Cookies & Tracking</h2>
          <p>
            We use cookies and similar technologies for:
          </p>
          <ul>
            <li>Google Analytics (performance cookies)</li>
            <li>Storing your trip preferences locally (essential functionality)</li>
            <li>Session management (NextAuth)</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, though this may affect functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights including:
          </p>
          <ul>
            <li><strong>Right to access</strong> — Request what data we hold about you</li>
            <li><strong>Right to delete</strong> — Request deletion of your personal data</li>
            <li><strong>Right to opt-out</strong> — Unsubscribe from marketing emails anytime</li>
            <li><strong>Right to data portability</strong> — Request your data in a portable format</li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:hello@tanzaniatripplanner.com">hello@tanzaniatripplanner.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">7. Children's Privacy</h2>
          <p>
            Tanzania Trip Planner is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">8. GDPR Compliance (EU Users)</h2>
          <p>
            If you are in the EU, we process your data under the GDPR. We only collect data with your consent, and you have the right to withdraw it anytime. We use Resend and Google with Data Processing Agreements in place.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of major changes via email or by posting a notice on the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">10. Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our data practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:hello@tanzaniatripplanner.com">hello@tanzaniatripplanner.com</a><br />
            <strong>Last updated:</strong> September 2026
          </p>
        </section>
      </div>
    </div>
  );
}
