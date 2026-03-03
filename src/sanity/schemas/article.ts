import { defineType, defineField } from "sanity";

export const articleSchema = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "seoTitle", title: "SEO Title (max 60 chars)", type: "string", validation: (R) => R.max(60) }),
    defineField({ name: "seoDescription", title: "SEO Description (max 160 chars)", type: "string", validation: (R) => R.max(160) }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "region", title: "Regions", type: "array", of: [{ type: "reference", to: [{ type: "region" }] }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time (minutes)", type: "number" }),
  ],
  preview: {
    select: { title: "title", media: "heroImage" },
  },
});
