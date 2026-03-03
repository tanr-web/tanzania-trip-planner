import { defineType, defineField } from "sanity";

export const regionSchema = defineType({
  name: "region",
  title: "Region",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (R) => R.required() }),
    defineField({
      name: "mapCenter", title: "Map Center", type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "bestMonths", title: "Best Months (1–12)", type: "array", of: [{ type: "number" }] }),
    defineField({
      name: "circuit", title: "Circuit", type: "string",
      options: { list: ["northern", "southern", "zanzibar", "kilimanjaro", "western"] },
    }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
