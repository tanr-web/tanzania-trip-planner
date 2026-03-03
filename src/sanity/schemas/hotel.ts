import { defineType, defineField } from "sanity";

export const hotelSchema = defineType({
  name: "hotel",
  title: "Hotel",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (R) => R.required() }),
    defineField({ name: "region", title: "Region", type: "reference", to: [{ type: "region" }], validation: (R) => R.required() }),
    defineField({
      name: "type", title: "Type", type: "string",
      options: { list: ["beach_resort", "safari_camp", "city_hotel", "boutique", "tented_camp"] },
    }),
    defineField({ name: "stars", title: "Stars", type: "number", validation: (R) => R.min(1).max(5) }),
    defineField({
      name: "priceRange", title: "Price Range", type: "string",
      options: { list: ["budget", "mid", "luxury"] },
    }),
    defineField({ name: "lat", title: "Latitude", type: "number" }),
    defineField({ name: "lng", title: "Longitude", type: "number" }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }] }),
    defineField({
      name: "amenities", title: "Amenities", type: "array",
      of: [{ type: "string" }],
      options: { list: ["pool", "wifi", "airstrip", "spa", "child_friendly", "all_inclusive", "game_drives", "bush_walks"] },
    }),
    defineField({
      name: "affiliateLinks", title: "Affiliate Links", type: "object",
      fields: [
        { name: "bookingCom", title: "Booking.com URL", type: "url" },
        { name: "safaribookings", title: "SafariBookings URL", type: "url" },
        { name: "direct", title: "Direct Booking URL", type: "url" },
      ],
    }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "bestFor", title: "Best For", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ageRestriction", title: "Minimum Age Restriction", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "priceRange", media: "images.0" },
  },
});
