import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Star, Leaf, ExternalLink } from "lucide-react";
import { getRestaurant, getAllRestaurantSlugs } from "@/lib/sanity";
import { getPriceLabel } from "@/lib/utils";
import type { Restaurant } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllRestaurantSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const r: Restaurant = await getRestaurant(slug);
    return {
      title: `${r.name} — ${r.region?.name ?? "Tanzania"} Restaurant`,
      description: `${r.name}: ${r.cuisine ?? ""} dining in ${r.region?.name ?? "Tanzania"}. ${r.openingHours ?? ""}`,
    };
  } catch {
    return { title: "Restaurant Not Found" };
  }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { slug } = await params;
  let restaurant: Restaurant;

  try {
    restaurant = await getRestaurant(slug);
    if (!restaurant) notFound();
  } catch {
    notFound();
  }

  const r = restaurant;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    servesCuisine: r.cuisine,
    address: { "@type": "PostalAddress", addressCountry: "TZ", addressRegion: r.region?.name },
    ...(r.openingHours ? { openingHours: r.openingHours } : {}),
    priceRange: r.priceRange === "budget" ? "$" : (r.priceRange === "midrange" || r.priceRange === "mid") ? "$$" : "$$$",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone-700 mb-6">
          <Link href="/restaurants" className="hover:text-amber-600">Restaurants</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-700">{r.name}</span>
        </nav>

        {/* Hero */}
        <div className="h-64 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl flex items-center justify-center text-8xl mb-8">
          {r.cuisine === "seafood" ? "🦞" : r.cuisine === "swahili" ? "🫕" : r.cuisine === "indian" ? "🍛" : r.atmosphere === "bush_dinner" ? "🌿" : "🍽️"}
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">{r.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              {r.region && (
                <span className="flex items-center gap-1 text-stone-600 text-sm"><MapPin className="w-4 h-4" />{r.region.name}</span>
              )}
              {r.priceRange && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">{getPriceLabel(r.priceRange)}</span>
              )}
              {r.cuisine && (
                <span className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full capitalize">{r.cuisine}</span>
              )}
            </div>
          </div>

          {r.googleMapsUrl && (
            <a
              href={r.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-colors self-start"
            >
              <ExternalLink className="w-4 h-4" />
              View on Maps
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Must-try dishes */}
            {r.mustTryDishes?.length > 0 && (
              <div>
                <h2 className="font-bold text-stone-800 text-lg mb-3">Must-Try Dishes</h2>
                <ul className="space-y-2">
                  {r.mustTryDishes.map((d: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5 text-stone-700">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Atmosphere */}
            {r.atmosphere && (
              <div>
                <h2 className="font-bold text-stone-800 text-lg mb-2">Atmosphere</h2>
                <p className="text-stone-600 capitalize">{r.atmosphere.replace("_", " ")}</p>
              </div>
            )}

            {/* Dietary */}
            {r.dietaryOptions?.length > 0 && (
              <div>
                <h2 className="font-bold text-stone-800 text-lg mb-3">Dietary Options</h2>
                <div className="flex flex-wrap gap-2">
                  {r.dietaryOptions.map((d: string) => (
                    <span key={d} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 text-sm rounded-full">
                      <Leaf className="w-3.5 h-3.5" />
                      <span className="capitalize">{d}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info sidebar */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 h-fit">
            <h3 className="font-bold text-stone-800">Quick Info</h3>
            {r.openingHours && (
              <div className="flex items-start gap-2 text-sm text-stone-600">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{r.openingHours}</span>
              </div>
            )}
            {r.priceRange && (
              <div className="text-sm">
                <span className="font-medium text-stone-700">Price: </span>
                <span className="text-stone-600">{getPriceLabel(r.priceRange)}</span>
              </div>
            )}
            {r.googleMapsUrl && (
              <a href={r.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-amber-700 text-sm font-medium hover:text-amber-600">
                <ExternalLink className="w-3.5 h-3.5" />Get Directions
              </a>
            )}
            <div className="pt-3 border-t border-stone-100">
              <Link href="/plan" className="text-sm text-amber-700 hover:text-amber-600 font-medium">
                → Build a full itinerary
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
