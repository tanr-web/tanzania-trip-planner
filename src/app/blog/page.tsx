import { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { getAllArticles } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Tanzania Travel Blog — Tips, Guides & Inspiration",
  description:
    "Expert Tanzania travel guides: safari planning, Kilimanjaro trekking, Zanzibar beaches, cultural experiences, and insider tips. Everything you need for your dream Tanzania trip.",
  alternates: { canonical: "/blog" },
};

const TAGS = ["All", "safari", "kilimanjaro", "zanzibar", "budget", "family", "photography", "culture", "wildlife"];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; region?: string }>;
}) {
  const { tag, region } = await searchParams;
  let articles: Article[] = [];

  try {
    articles = await getAllArticles();
    if (tag && tag !== "All") articles = articles.filter((a) => a.tags?.includes(tag));
    if (region) articles = articles.filter((a) => a.region?.some((r) => r.name?.toLowerCase().replace(" ", "-") === region));
  } catch {
    // Sanity not yet configured
  }

  function filterLink(value: string) {
    return value === "All" ? "/blog" : `/blog?tag=${value}`;
  }

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Tanzania Travel Blog</h1>
      <p className="text-stone-600 mb-8">
        Expert guides, insider tips, and honest advice — crafted by travellers who know Tanzania.
      </p>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TAGS.map((t) => (
          <Link
            key={t}
            href={filterLink(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              (tag ?? "All") === t
                ? "bg-amber-500 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {t === "All" ? "All Topics" : t.charAt(0).toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        /* Empty state — Sanity not configured */
        <div>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-xl font-bold text-stone-700 mb-2">Articles coming soon</h2>
            <p className="text-stone-500 mb-6 max-w-md mx-auto">
              Our team is writing in-depth Tanzania travel guides. Connect your Sanity CMS to start publishing.
            </p>
            <Link href="/plan" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
              Plan Your Trip →
            </Link>
          </div>

          {/* SEO placeholder cards */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-stone-800 mb-6">Upcoming Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {UPCOMING_GUIDES.map((g) => (
                <div key={g.title} className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <span className="text-2xl mb-3 block">{g.emoji}</span>
                  <h3 className="font-semibold text-stone-700 text-sm leading-snug">{g.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Featured article */}
          {featuredArticle && (
            <Link href={`/blog/${featuredArticle.slug}`} className="group block mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-3xl border border-stone-200 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-56 lg:h-auto bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center text-8xl">
                  🦁
                </div>
                <div className="p-8 flex flex-col justify-center">
                  {featuredArticle.tags?.[0] && (
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                      {featuredArticle.tags[0]}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors mb-3">
                    {featuredArticle.title}
                  </h2>
                  {featuredArticle.excerpt && (
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">{featuredArticle.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-stone-400">
                    {featuredArticle.publishedAt && <span>{formatDate(featuredArticle.publishedAt)}</span>}
                    {featuredArticle.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{featuredArticle.readingTime} min read
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restArticles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ArticleCard({ article: a }: { article: Article }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group block bg-white rounded-2xl border border-stone-200 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-44 bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center text-5xl">
        {a.tags?.includes("kilimanjaro") ? "⛰️" : a.tags?.includes("zanzibar") ? "🏝️" : a.tags?.includes("wildlife") ? "🐘" : "🌍"}
      </div>
      <div className="p-5">
        {a.tags?.[0] && (
          <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <Tag className="w-3 h-3" />{a.tags[0]}
          </div>
        )}
        <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug mb-2">
          {a.title}
        </h3>
        {a.excerpt && (
          <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-3">{a.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-stone-400">
          {a.publishedAt && <span>{formatDate(a.publishedAt)}</span>}
          <div className="flex items-center gap-1 text-amber-600 font-medium group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

const UPCOMING_GUIDES = [
  { emoji: "🦁", title: "The Ultimate Tanzania Safari Planning Guide" },
  { emoji: "⛰️", title: "Climbing Kilimanjaro: Routes, Cost & What to Expect" },
  { emoji: "🏝️", title: "Zanzibar Travel Guide: Beaches, Culture & Hidden Gems" },
  { emoji: "🐘", title: "Best Time to Visit Tanzania for Wildlife Viewing" },
  { emoji: "💰", title: "Tanzania on a Budget: How to Safari for Less" },
  { emoji: "👨‍👩‍👧", title: "Family Safari in Tanzania: Essential Tips" },
  { emoji: "📷", title: "Photography Safari Tips: Capture Tanzania's Big Five" },
  { emoji: "🗓️", title: "Great Migration Guide: When & Where to See It" },
  { emoji: "🌿", title: "Ngorongoro Crater: Nature's Finest Wildlife Arena" },
];
