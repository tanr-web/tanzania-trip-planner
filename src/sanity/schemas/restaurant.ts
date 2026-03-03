import { defineType, defineField } from "sanity";

export const restaurantSchema = defineType({
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (R) => R.required() }),
    defineField({ name: "region", title: "Region", type: "reference", to: [{ type: "region" }] }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({
      name: "cuisine", title: "Cuisine", type: "string",
      options: { list: ["swahili", "african", "seafood", "indian", "italian", "international", "street_food", "bbq", "vegetarian"] },
    }),
    defineField({
      name: "priceRange", title: "Price Range", type: "string",
      options: { list: ["budget", "midrange", "luxury"] },
    }),
    defineField({
      name: "atmosphere", title: "Atmosphere", type: "string",
      options: { list: ["fine_dining", "casual", "outdoor", "rooftop", "family", "beachfront", "beach", "bush_dinner", "romantic"] },
    }),
    defineField({
      name: "dietaryOptions", title: "Dietary Options", type: "array", of: [{ type: "string" }],
      options: { list: ["vegetarian", "vegan", "halal", "gluten_free"] },
    }),
    defineField({ name: "lat", title: "Latitude", type: "number" }),
    defineField({ name: "lng", title: "Longitude", type: "number" }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }] }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "mustTryDishes", title: "Must-Try Dishes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "openingHours", title: "Opening Hours", type: "string" }),
    defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "city", media: "images.0" },
  },
});

