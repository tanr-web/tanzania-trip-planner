import { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { getAllArticles } from "@/lib/sanity";
import { getAllStaticArticles, StaticArticle } from "@/lib/static-articles";
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

  // Fall back to static articles when Sanity has no content
  const useStatic = articles.length === 0;
  let staticArticles: StaticArticle[] = [];
  if (useStatic) {
    staticArticles = getAllStaticArticles();
    if (tag && tag !== "All") staticArticles = staticArticles.filter((a) => a.tags.includes(tag));
  }

  const displayArticles = useStatic ? staticArticles : articles;
  const featuredStatic = useStatic ? staticArticles[0] : null;
  const restStatic = useStatic ? staticArticles.slice(1) : [];
  const featuredArticle = !useStatic ? articles[0] : null;
  const restArticles = !useStatic ? articles.slice(1) : [];

  function filterLink(value: string) {
    return value === "All" ? "/blog" : `/blog?tag=${value}`;
  }

  function tagEmoji(tags: string[] | undefined) {
    if (!tags) return "🌍";
    if (tags.includes("kilimanjaro")) return "⛰️";
    if (tags.includes("zanzibar")) return "🏝️";
    if (tags.includes("wildlife") || tags.includes("safari")) return "🦁";
    if (tags.includes("budget")) return "💰";
    if (tags.includes("family")) return "👨‍👩‍👧";
    if (tags.includes("photography")) return "📷";
    return "🌍";
  }

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

      {/* Static articles (Sanity not yet configured) */}
      {useStatic && (
        <>
          {featuredStatic && (
            <Link href={`/blog/${featuredStatic.slug}`} className="group block mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-3xl border border-stone-200 hover:shadow-xl transition-shadow overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredStatic.heroImage}
                  alt={featuredStatic.title}
                  className="h-56 lg:h-full w-full object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  {featuredStatic.tags[0] && (
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                      {featuredStatic.tags[0]}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors mb-3">
                    {featuredStatic.title}
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{featuredStatic.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-stone-400">
                    <span>{formatDate(featuredStatic.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{featuredStatic.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restStatic.map((a) => (
              <Link key={a._id} href={`/blog/${a.slug}`} className="group block bg-white rounded-2xl border border-stone-200 hover:shadow-lg transition-shadow overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.heroImage} alt={a.title} className="h-44 w-full object-cover" />
                <div className="p-5">
                  {a.tags[0] && (
                    <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Tag className="w-3 h-3" />{a.tags[0]}
                    </div>
                  )}
                  <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug mb-2">
                    {a.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-3">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>{formatDate(a.publishedAt)}</span>
                    <div className="flex items-center gap-1 text-amber-600 font-medium group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {displayArticles.length === 0 && (
            <p className="text-center text-stone-500 py-12">No articles found for this tag. <Link href="/blog" className="text-amber-600 underline">View all</Link></p>
          )}
        </>
      )}

      {/* Sanity CMS articles */}
      {!useStatic && (
        <>
          {featuredArticle && (
            <Link href={`/blog/${featuredArticle.slug}`} className="group block mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-3xl border border-stone-200 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-56 lg:h-auto bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center text-8xl">
                  {tagEmoji(featuredArticle.tags ?? [])}
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
