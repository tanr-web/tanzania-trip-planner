import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, MapPin, Clock, Backpack } from "lucide-react";
import { getRegion, getAllRegionSlugs, getHotelsByRegion, getArticlesByRegion } from "@/lib/sanity";
import { REGIONS } from "@/lib/constants";
import { getDestinationGuide } from "@/lib/destination-guides";
import { createTouristDestinationSchema, getSchemaScript } from "@/lib/schema-org";
import type { Region, Hotel, Article } from "@/types";

export const revalidate = 86400;

interface Props {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllRegionSlugs();
    return slugs.map((s) => ({ region: s.slug }));
  } catch {
    return REGIONS.map((r) => ({ region: r.slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  try {
    const r: Region = await getRegion(region);
    return {
      title: `${r.name} Travel Guide — Tanzania`,
      description: (typeof r.description === "string" ? r.description : null) ?? `Explore ${r.name}, Tanzania. Find the best hotels, safari camps, and travel tips.`,
      alternates: { canonical: `/destinations/${region}` },
    };
  } catch {
    const staticR = REGIONS.find((r) => r.slug === region);
    if (!staticR) return { title: "Destination Not Found" };
    return { title: `${staticR.name} Travel Guide — Tanzania` };
  }
}

export default async function RegionDetailPage({ params }: Props) {
  const { region: slug } = await params;
  let regionData: Region | null = null;
  let hotels: Hotel[] = [];
  let articles: Article[] = [];

  try {
    regionData = await getRegion(slug);
  } catch {
    const staticR = REGIONS.find((r) => r.slug === slug);
    if (!staticR) notFound();
    regionData = { _id: staticR!.slug, name: staticR!.name, slug: staticR!.slug, bestMonths: staticR!.bestMonths } as unknown as Region;
  }

  if (!regionData) notFound();

  try {
    [hotels, articles] = await Promise.all([
      getHotelsByRegion(slug),
      getArticlesByRegion(slug),
    ]);
  } catch {
    // Sanity not configured
  }

  const staticR = REGIONS.find((r) => r.slug === slug);
  const guide = getDestinationGuide(slug);
  const destSchema = createTouristDestinationSchema(
    {
      name: regionData.name,
      description: typeof regionData.description === "string" ? regionData.description : guide?.overview || regionData.name,
      lat: staticR?.mapCenter?.lat,
      lng: staticR?.mapCenter?.lng,
    },
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanzaniatripplanner.com",
    slug
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Script
        id={`destination-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getSchemaScript(destSchema) }}
      />
      <Link href="/destinations" className="inline-flex items-center gap-2 text-stone-700 hover:text-amber-600 text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />All Destinations
      </Link>

      {/* Hero */}
      <div className="h-64 bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center text-8xl mb-8">
        🌍
      </div>

      <h1 className="text-3xl font-bold text-stone-800 mb-2">{regionData.name}</h1>

      {regionData.bestMonths?.length > 0 && (
        <div className="flex items-center gap-2 text-stone-700 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          Best time to visit: {Array.isArray(regionData.bestMonths) ? regionData.bestMonths.join(", ") : regionData.bestMonths}
        </div>
      )}

      {typeof regionData.description === "string" && regionData.description && (
        <p className="text-stone-600 leading-relaxed mb-8 max-w-3xl">{regionData.description}</p>
      )}

      {/* Guide content if available */}
      {guide && (
        <>
          <p className="text-stone-600 leading-relaxed mb-8 max-w-3xl">{guide.overview}</p>

          {/* Highlights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Highlights</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.highlights.map((highlight, i) => (
                <li key={i} className="flex gap-3 text-stone-600">
                  <span className="text-amber-600 font-bold">★</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2 text-amber-900">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Best Time to Visit</h3>
              </div>
              <p className="text-sm text-stone-600">{guide.bestTime}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2 text-amber-900">
                <Backpack className="w-5 h-5" />
                <h3 className="font-semibold">Accommodation</h3>
              </div>
              <p className="text-sm text-stone-600">{guide.accommodation}</p>
            </div>
          </div>

          {/* Activities */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Activities & Experiences</h2>
            <ul className="space-y-2">
              {guide.activities.map((activity, i) => (
                <li key={i} className="flex gap-3 text-stone-600">
                  <span className="text-amber-600">●</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Getting There */}
          <section className="bg-stone-50 rounded-2xl p-6 mb-10">
            <h3 className="text-lg font-bold text-stone-800 mb-3">Getting There</h3>
            <p className="text-stone-600">{guide.gettingThere}</p>
          </section>

          {/* Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Pro Tips</h2>
            <ul className="space-y-2">
              {guide.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-stone-600">
                  <span className="text-amber-600">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* Coordinates if from static data */}
      {staticR?.mapCenter && (
        <div className="bg-amber-50 rounded-2xl p-4 text-sm text-stone-600 mb-8">
          <strong>📍 Coordinates:</strong> {staticR.mapCenter.lat}°N, {staticR.mapCenter.lng}°E
        </div>
      )}

      {/* Hotels in this region */}
      {hotels.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-stone-800">Hotels & Camps in {regionData.name}</h2>
            <Link href={`/hotels?region=${slug}`} className="text-amber-600 text-sm hover:text-amber-700">See all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotels.slice(0, 3).map((h) => (
              <Link key={h._id} href={`/hotels/${h.slug}`} className="group block bg-white rounded-xl border border-stone-200 hover:shadow-md transition-shadow p-4">
                <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors text-sm mb-1">{h.name}</h3>
                <p className="text-xs text-stone-600 capitalize">{h.type?.replace("_", " ")}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-stone-800">Travel Guides for {regionData.name}</h2>
            <Link href={`/blog?region=${slug}`} className="text-amber-600 text-sm hover:text-amber-700">See all →</Link>
          </div>
          <div className="space-y-3">
            {articles.slice(0, 4).map((a) => (
              <Link key={a._id} href={`/blog/${a.slug}`} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:shadow-md transition-shadow group">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors text-sm">{a.title}</h3>
                  {a.excerpt && <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">{a.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="bg-amber-50 rounded-2xl p-6 text-center">
        <h2 className="font-bold text-stone-800 text-lg mb-2">Planning a Trip to {regionData.name}?</h2>
        <p className="text-stone-600 text-sm mb-4">Our AI builds a personalised itinerary in under 60 seconds.</p>
        <Link href="/plan" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
          Plan My {regionData.name} Trip →
        </Link>
      </div>
    </div>
  );
}
