import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Tanzania Trip Planner",
  description: "Affiliate disclosure and transparency information for Tanzania Trip Planner.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Affiliate Disclosure</h1>

      <div className="prose prose-stone prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold text-stone-800">Transparency Statement</h2>
          <p>
            Tanzania Trip Planner is transparent about how we earn money. This page explains our affiliate relationships and business model.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">How We Make Money</h2>
          <p>
            Tanzania Trip Planner is entirely free to use. We do not charge for itineraries, guides, or tools. We make money through:
          </p>
          <ol>
            <li>
              <strong>Affiliate Commissions</strong> — When you book a hotel through our links, we earn a commission from Booking.com, Airbnb, or other booking platforms. This is at no extra cost to you.
            </li>
            <li>
              <strong>Google AdSense</strong> — We display contextual ads on the site. Again, this is free for you.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">Affiliate Links</h2>
          <p>
            When you see a link to book a hotel, restaurant, or experience on Tanzania Trip Planner, it's likely an affiliate link. This means:
          </p>
          <ul>
            <li>✅ You get the same price (no markup from us)</li>
            <li>✅ You get the same terms as booking directly</li>
            <li>✅ We earn a small commission (typically 2-5% of the booking value)</li>
            <li>✅ You have no obligation to use our links — you can book directly if you prefer</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">Which Companies We're Affiliated With</h2>
          <ul>
            <li><strong>Booking.com</strong> — Hotel and accommodation booking</li>
            <li><strong>Airbnb</strong> — Holiday rentals</li>
            <li><strong>Klook</strong> — Tours and experiences</li>
            <li><strong>Viator</strong> — Tours and activities</li>
            <li><strong>Amazon Associates</strong> — Travel gear and cameras</li>
          </ul>
          <p>
            We may add or remove affiliate programs over time as our needs change.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">Our Commitment to Honesty</h2>
          <p>
            Despite our affiliate relationships, we:
          </p>
          <ul>
            <li>✅ Only recommend hotels and services we genuinely believe in</li>
            <li>✅ Do not rank hotels higher because they have an affiliate program</li>
            <li>✅ Do not accept bribes or paid placements</li>
            <li>✅ Disclose affiliate links clearly</li>
            <li>✅ Recommend budget options even when we earn less commission</li>
            <li>✅ Include critical safety information regardless of commercial impact</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">Why Affiliate Links?</h2>
          <p>
            Affiliate commissions let us:
          </p>
          <ul>
            <li>Keep all content and tools free forever</li>
            <li>Invest in improving our AI planner</li>
            <li>Pay for hosting, APIs, and infrastructure</li>
            <li>Hire writers to create better guides</li>
          </ul>
          <p>
            Without affiliate revenue, we couldn't offer a free service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">FTC & CMA Compliance</h2>
          <p>
            We comply with the U.S. Federal Trade Commission's Endorsement Guides and the UK Competition and Markets Authority guidelines regarding affiliate disclosure. All affiliate links are clearly marked where possible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">Questions?</h2>
          <p>
            If you have questions about our affiliate relationships or business model, please contact us:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:hello@tanzaniatripplanner.com">hello@tanzaniatripplanner.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800">Cookie Consent Notice</h2>
          <p>
            Tanzania Trip Planner uses cookies and similar technologies (including Google Analytics) to improve your experience and track how the site is used. By continuing to use the site, you consent to our cookie use.
          </p>
          <p>
            <strong>You can:</strong>
          </p>
          <ul>
            <li>Disable cookies in your browser settings (may affect functionality)</li>
            <li>Opt out of Google Analytics tracking via <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google's opt-out browser extension</a></li>
            <li>Review our <a href="/privacy">Privacy Policy</a> for full cookie details</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
