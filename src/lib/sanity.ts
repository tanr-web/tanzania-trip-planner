import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "@/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isSanityConfigured = Boolean(projectId && /^[a-z0-9-]+$/.test(projectId));

export const sanityClient = createClient({
  projectId: isSanityConfigured ? projectId! : "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  // Prevent network calls when not configured
  ...(isSanityConfigured ? {} : { ignoreBrowserTokenWarning: true }),
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Helper — throws if Sanity isn't configured
function requireSanity(): void {
  if (!isSanityConfigured) {
    throw new Error("Sanity not configured");
  }
}

// ─── Query helpers ────────────────────────────────────────────────────────────

export async function getAllArticleSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "article"]{ "slug": slug.current }`
  );
}

export async function getArticle(slug: string) {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
      _id, title, "slug": slug.current,
      seoTitle, seoDescription, heroImage, body,
      "region": region[]->{name, "slug": slug.current},
      tags, publishedAt, readingTime
    }`,
    { slug }
  );
}

export async function getLatestArticles(limit = 3) {
  return sanityClient.fetch(
    `*[_type == "article"] | order(publishedAt desc) [0...$limit]{
      _id, title, "slug": slug.current,
      seoDescription, heroImage, publishedAt, readingTime,
      "region": region[]->{name, "slug": slug.current}
    }`,
    { limit }
  );
}

export async function getAllArticles() {
  return sanityClient.fetch(
    `*[_type == "article"] | order(publishedAt desc){
      _id, title, "slug": slug.current,
      seoDescription, heroImage, publishedAt, readingTime, tags,
      "region": region[]->{name, "slug": slug.current}
    }`
  );
}

export async function getAllHotelSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "hotel"]{ "slug": slug.current }`
  );
}

export async function getHotel(slug: string) {
  return sanityClient.fetch(
    `*[_type == "hotel" && slug.current == $slug][0]{
      _id, name, "slug": slug.current,
      "region": region->{name, "slug": slug.current},
      type, stars, priceRange, lat, lng, images,
      amenities, affiliateLinks, description, bestFor, ageRestriction
    }`,
    { slug }
  );
}

export async function getAllHotels() {
  return sanityClient.fetch(
    `*[_type == "hotel"] | order(stars desc){
      _id, name, "slug": slug.current,
      "region": region->{name, "slug": slug.current},
      type, stars, priceRange, lat, lng, images,
      amenities, affiliateLinks, bestFor, ageRestriction
    }`
  );
}

export async function getAllRestaurantSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "restaurant"]{ "slug": slug.current }`
  );
}

export async function getRestaurant(slug: string) {
  return sanityClient.fetch(
    `*[_type == "restaurant" && slug.current == $slug][0]{
      _id, name, "slug": slug.current,
      "region": region->{name, "slug": slug.current},
      city, cuisine, priceRange, atmosphere, dietaryOptions,
      lat, lng, images, description, mustTryDishes, openingHours, googleMapsUrl
    }`,
    { slug }
  );
}

export async function getAllRestaurants() {
  return sanityClient.fetch(
    `*[_type == "restaurant"] | order(name asc){
      _id, name, "slug": slug.current,
      "region": region->{name, "slug": slug.current},
      city, cuisine, priceRange, atmosphere, dietaryOptions,
      lat, lng, images, mustTryDishes, openingHours, googleMapsUrl
    }`
  );
}

export async function getAllRegions() {
  return sanityClient.fetch(
    `*[_type == "region"] | order(name asc){
      _id, name, "slug": slug.current,
      mapCenter, heroImage, description, highlights, bestMonths, circuit
    }`
  );
}

export async function getAllRegionSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "region"]{ "slug": slug.current }`
  );
}

export async function getRegion(slug: string) {
  return sanityClient.fetch(
    `*[_type == "region" && slug.current == $slug][0]{
      _id, name, "slug": slug.current,
      mapCenter, heroImage, description, highlights, bestMonths, circuit
    }`,
    { slug }
  );
}

export async function getHotelsByRegion(regionSlug: string) {
  return sanityClient.fetch(
    `*[_type == "hotel" && region->slug.current == $regionSlug] | order(stars desc){
      _id, name, "slug": slug.current, type, stars, priceRange, images, affiliateLinks, bestFor
    }`,
    { regionSlug }
  );
}

export async function getArticlesByRegion(regionSlug: string) {
  return sanityClient.fetch(
    `*[_type == "article" && $regionSlug in region[]->slug.current] | order(publishedAt desc){
      _id, title, "slug": slug.current, seoDescription, heroImage, publishedAt, readingTime
    }`,
    { regionSlug }
  );
}
