import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, ExternalLink, CheckCircle } from "lucide-react";
import { getHotel, getAllHotelSlugs } from "@/lib/sanity";
import { getPriceLabel } from "@/lib/utils";
import type { Hotel } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllHotelSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const hotel: Hotel = await getHotel(slug);
    return {
      title: `${hotel.name} — ${hotel.region?.name ?? "Tanzania"}`,
      description: `Book ${hotel.name} in ${hotel.region?.name ?? "Tanzania"}. ${getPriceLabel(hotel.priceRange)} accommodation.`,
    };
  } catch {
    return { title: "Hotel Not Found" };
  }
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  let hotel: Hotel;

  try {
    hotel = await getHotel(slug);
    if (!hotel) notFound();
  } catch {
    notFound();
  }

  const affiliateUrl = hotel.affiliateLinks?.bookingCom ?? hotel.affiliateLinks?.safaribookings ?? hotel.affiliateLinks?.direct;
  const bookingUrl = affiliateUrl
    ? `/api/track-click?program=${hotel.affiliateLinks?.bookingCom ? "booking" : hotel.affiliateLinks?.safaribookings ? "safaribookings" : "direct"}&hotel=${hotel.slug}&dest=${encodeURIComponent(affiliateUrl)}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    description: `${hotel.type?.replace("_", " ")} in ${hotel.region?.name ?? "Tanzania"}`,
    address: { "@type": "PostalAddress", addressCountry: "TZ" },
    ...(hotel.lat && hotel.lng ? { geo: { "@type": "GeoCoordinates", latitude: hotel.lat, longitude: hotel.lng } } : {}),
    ...(hotel.stars ? { starRating: { "@type": "Rating", ratingValue: hotel.stars } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/hotels" className="hover:text-amber-600">Hotels</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-700">{hotel.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image placeholder */}
            <div className="h-72 bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center text-7xl mb-6">
              {hotel.type === "beach_resort" ? "🏖️" : hotel.type === "safari_camp" || hotel.type === "tented_camp" ? "🏕️" : "🏨"}
            </div>

            <h1 className="text-3xl font-bold text-stone-800 mb-2">{hotel.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {hotel.region && (
                <div className="flex items-center gap-1 text-stone-600 text-sm">
                  <MapPin className="w-4 h-4" />{hotel.region.name}
                </div>
              )}
              {hotel.stars && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              )}
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                {getPriceLabel(hotel.priceRange)}
              </span>
              {hotel.type && (
                <span className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full capitalize">
                  {hotel.type.replace("_", " ")}
                </span>
              )}
            </div>

            {/* Amenities */}
            {hotel.amenities?.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-stone-800 mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 text-sm rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="capitalize">{a.replace("_", " ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best for */}
            {hotel.bestFor?.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-stone-800 mb-3">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {hotel.bestFor.map((b) => (
                    <span key={b} className="px-3 py-1.5 bg-amber-50 text-amber-800 text-sm rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            )}

            {hotel.ageRestriction && (
              <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-sm text-blue-800">
                <strong>👶 Age restriction:</strong> Minimum age {hotel.ageRestriction} years.
              </div>
            )}

            <div className="bg-amber-50 rounded-2xl p-4 text-xs text-stone-500">
              <strong>Affiliate disclosure:</strong> Booking links on this page may be affiliate links. We earn a small commission if you book through them, at no extra cost to you.
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sticky top-24">
              <h2 className="font-bold text-stone-800 text-xl mb-1">{hotel.name}</h2>
              <p className="text-stone-500 text-sm mb-4">{hotel.region?.name ?? "Tanzania"}</p>

              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full mb-3 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {hotel.affiliateLinks?.bookingCom ? "Book on Booking.com" : hotel.affiliateLinks?.safaribookings ? "Book via SafariBookings" : "Book Direct"}
                </a>
              ) : (
                <div className="w-full py-3 bg-stone-100 text-stone-500 text-center rounded-full text-sm mb-3">
                  Contact hotel directly
                </div>
              )}

              {hotel.affiliateLinks?.safaribookings && hotel.affiliateLinks?.bookingCom && (
                <a
                  href={`/api/track-click?program=safaribookings&hotel=${hotel.slug}&dest=${encodeURIComponent(hotel.affiliateLinks.safaribookings)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-medium rounded-full transition-colors"
                >
                  Also on SafariBookings
                </a>
              )}

              <div className="mt-4 pt-4 border-t border-stone-100">
                <Link href="/plan" className="text-sm text-amber-700 hover:text-amber-600 font-medium">
                  → Add to my itinerary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
