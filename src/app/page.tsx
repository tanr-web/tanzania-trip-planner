import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ArrowRight, Star, Zap, MapPin, BookOpen } from "lucide-react";
import { SEASONAL_CALENDAR } from "@/lib/constants";
import { getLatestArticles } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { createOrganizationSchema, getSchemaScript } from "@/lib/schema-org";
import HeroCTA from "@/components/home/HeroCTA";

export const revalidate = 86400;

const featuredRegions = [
  { name: "Serengeti", slug: "serengeti", tagline: "The Great Migration", image: "/images/destinations/serengeti.jpg", bestTime: "Jun–Oct" },
  { name: "Zanzibar", slug: "zanzibar", tagline: "Pristine Beaches", image: "/images/destinations/zanzibar.jpg", bestTime: "Jun–Oct" },
  { name: "Ngorongoro", slug: "ngorongoro", tagline: "The Eighth Wonder", image: "/images/destinations/ngorongoro.jpg", bestTime: "Year-round" },
  { name: "Kilimanjaro", slug: "kilimanjaro", tagline: "Roof of Africa", image: "/images/destinations/kilimanjaro.jpg", bestTime: "Jan–Feb, Jun–Oct" },
  { name: "Tarangire", slug: "tarangire", tagline: "Land of Giants", image: "/images/destinations/tarangire.jpg", bestTime: "Jun–Oct" },
  { name: "Mafia Island", slug: "mafia-island", tagline: "Diving Paradise", image: "/images/destinations/mafia-island.jpg", bestTime: "Oct–Feb" },
];

export default async function HomePage() {
  const currentMonth = new Date().getMonth() + 1;
  const monthData = SEASONAL_CALENDAR[currentMonth];
  let latestArticles: Awaited<ReturnType<typeof getLatestArticles>> = [];
  try {
    latestArticles = await getLatestArticles(3);
  } catch {
    // Sanity not yet configured — silently skip
  }

  const orgSchema = createOrganizationSchema(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanzaniatripplanner.com");

  return (
    <div>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getSchemaScript(orgSchema) }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/serengeti.jpg"
          alt="Serengeti at sunrise with wildebeest"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest mb-4">
            AI-Powered Tanzania Travel Planning
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            Your Perfect Tanzania<br />Adventure, Planned in Minutes
          </h1>
          <p className="text-lg sm:text-xl text-stone-200 mb-8 max-w-2xl mx-auto">
            AI-powered itineraries. Handpicked hotels. Real local insight.
            From the Serengeti to Zanzibar&apos;s white sands.
          </p>
          <HeroCTA />
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-stone-800 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: "✏️", title: "Tell Us Your Style", desc: "Answer 6 quick questions about your dates, group, budget, and interests." },
              { icon: "🤖", title: "Get Your Itinerary", desc: "Our AI generates a personalised day-by-day plan in seconds, streamed live." },
              { icon: "🏨", title: "Book with Confidence", desc: "Handpicked hotel recommendations and restaurants for every stop on your trip." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/plan" className="inline-flex items-center gap-2 px-7 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-colors shadow-md">
              Start Planning — It&apos;s Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── This Month in Tanzania ───────────────────────────────────── */}
      <section className="py-10 bg-stone-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-xl font-bold">
            {monthData.label.slice(0, 3)}
          </div>
          <div>
            <p className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-1">This Month in Tanzania</p>
            <h2 className="text-xl font-bold mb-1">{monthData.highlight}</h2>
            <p className="text-stone-300 text-sm">{monthData.note}</p>
          </div>
          <Link href="/plan" className="flex-shrink-0 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full text-sm transition-colors">
            Plan a {monthData.label} Trip
          </Link>
        </div>
      </section>

      {/* ── Featured Regions ─────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">Explore Destinations</h2>
          <Link href="/destinations" className="text-amber-700 hover:text-amber-600 text-sm font-semibold flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredRegions.map((region) => (
            <Link key={region.slug} href={`/destinations/${region.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow">
              <Image src={region.image} alt={region.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <span className="text-xs bg-amber-500/90 px-2 py-0.5 rounded-full font-medium mb-1 inline-block">Best: {region.bestTime}</span>
                <h3 className="font-bold text-lg leading-tight">{region.name}</h3>
                <p className="text-stone-300 text-xs">{region.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────────────────── */}
      <section className="py-12 bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: <BookOpen className="w-7 h-7 text-amber-600" />, stat: "50+", label: "Destination Guides" },
            { icon: <Zap className="w-7 h-7 text-amber-600" />, stat: "AI-Powered", label: "Personalised Itineraries" },
            { icon: <Star className="w-7 h-7 text-amber-600" />, stat: "300+", label: "Curated Hotels & Lodges" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">{item.icon}</div>
              <p className="text-2xl font-bold text-stone-800">{item.stat}</p>
              <p className="text-stone-600 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest Articles ──────────────────────────────────────────── */}
      {latestArticles.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">Latest Travel Guides</h2>
            <Link href="/blog" className="text-amber-700 hover:text-amber-600 text-sm font-semibold flex items-center gap-1">
              All guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {latestArticles.map((article: { slug: string; title: string; seoDescription?: string; publishedAt?: string }) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 p-5">
                <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2">{article.title}</h3>
                {article.seoDescription && <p className="text-stone-700 text-sm line-clamp-2">{article.seoDescription}</p>}
                {article.publishedAt && <p className="text-xs text-stone-600 mt-3">{formatDate(article.publishedAt)}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <MapPin className="w-10 h-10 mx-auto mb-4 text-amber-200" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Get Our Free Tanzania Packing List</h2>
          <p className="text-amber-100 mb-6">Plus monthly travel tips, migration updates, and exclusive deals.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="POST">
            <input type="email" name="email" required placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-full text-stone-900 text-sm outline-none focus:ring-2 focus:ring-amber-300" />
            <button type="submit" className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full text-sm transition-colors">Get the List →</button>
          </form>
          <p className="text-xs text-amber-200 mt-3">No spam. Unsubscribe any time.</p>
        </div>
      </section>
    </div>
  );
}
