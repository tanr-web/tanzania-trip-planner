import { MetadataRoute } from "next";
import { getAllArticleSlugs, getAllHotelSlugs, getAllRestaurantSlugs, getAllRegionSlugs } from "@/lib/sanity";
import { REGIONS } from "@/lib/constants";

const BASE_URL = "https://tanzaniatripplanner.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/plan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/hotels`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/restaurants`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/migration-calendar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/packing-list`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/cost-estimator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Static region pages (fallback)
  const regionPages: MetadataRoute.Sitemap = REGIONS.map((r) => ({
    url: `${BASE_URL}/destinations/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic pages from Sanity
  let articlePages: MetadataRoute.Sitemap = [];
  let hotelPages: MetadataRoute.Sitemap = [];
  let restaurantPages: MetadataRoute.Sitemap = [];
  let sanityRegionPages: MetadataRoute.Sitemap = [];

  try {
    const [articles, hotels, restaurants, regions] = await Promise.all([
      getAllArticleSlugs(),
      getAllHotelSlugs(),
      getAllRestaurantSlugs(),
      getAllRegionSlugs(),
    ]);

    articlePages = articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    hotelPages = hotels.map((h) => ({
      url: `${BASE_URL}/hotels/${h.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    restaurantPages = restaurants.map((r) => ({
      url: `${BASE_URL}/restaurants/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

    sanityRegionPages = regions.map((r) => ({
      url: `${BASE_URL}/destinations/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Sanity not configured — return static pages only
  }

  const finalRegionPages = sanityRegionPages.length > 0 ? sanityRegionPages : regionPages;

  return [...staticPages, ...finalRegionPages, ...articlePages, ...hotelPages, ...restaurantPages];
}
