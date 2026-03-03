import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Tanzania Trip Planner",
  description: "We're passionate travellers building the best free Tanzania trip planning resource — combining AI technology with local knowledge.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-4">About Tanzania Trip Planner</h1>

      <div className="h-48 bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center text-7xl mb-8">
        🌍
      </div>

      <div className="prose prose-stone prose-lg max-w-none space-y-6">
        <p>
          Tanzania Trip Planner was built by travellers who fell deeply in love with Tanzania — and wanted to make it easier for others to experience its magic without spending weeks planning.
        </p>

        <p>
          We combine real local knowledge with AI technology to generate personalised, accurate itineraries tailored to your budget, interests, and travel style — in under 60 seconds.
        </p>

        <h2 className="text-xl font-bold text-stone-800 !mt-8 !mb-3">What We Offer</h2>
        <ul className="space-y-2 !my-0">
          {[
            "🦁 AI-powered itinerary generator (GPT-4o)",
            "🏕️ Curated hotel and safari camp recommendations",
            "🍽️ Restaurant guides for every region and budget",
            "📅 Great Migration calendar with month-by-month herd tracking",
            "🎒 Interactive packing list customised to your trip type",
            "💰 Real-time trip cost estimator with park fees",
            "✍️ In-depth travel guides written by Tanzania experts",
          ].map((item) => (
            <li key={item} className="text-stone-600 text-sm flex items-start gap-2">
              <span className="mt-0.5">{item.split(" ")[0]}</span>
              <span>{item.split(" ").slice(1).join(" ")}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-stone-800 !mt-8 !mb-3">Our Commitment</h2>
        <p>
          Everything on this site is free to use. We earn money through affiliate commissions when you book hotels through our links (at no extra cost to you) and through Google AdSense. This lets us keep all planning tools free forever.
        </p>

        <p>
          We only recommend hotels and camps we&apos;d genuinely book ourselves, and our editorial content is always independent of our commercial relationships.
        </p>

        <h2 className="text-xl font-bold text-stone-800 !mt-8 !mb-3">Responsible Travel</h2>
        <p>
          Tanzania&apos;s wildlife and ecosystems are irreplaceable. We encourage travellers to choose responsible operators, respect wildlife distances, stay in eco-certified lodges where possible, and support local communities through their tourism spending.
        </p>
      </div>

      <div className="mt-12 bg-amber-50 rounded-2xl p-6 text-center">
        <h2 className="font-bold text-stone-800 text-lg mb-2">Questions or Feedback?</h2>
        <p className="text-stone-600 text-sm mb-4">We&apos;d love to hear from you.</p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
