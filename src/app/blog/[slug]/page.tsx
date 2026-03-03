import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, Tag, ArrowLeft } from "lucide-react";
import { getArticle, getAllArticleSlugs } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article: Article = await getArticle(slug);
    if (!article) return { title: "Article Not Found" };
    return {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      openGraph: {
        title: article.seoTitle ?? article.title,
        description: article.seoDescription ?? article.excerpt,
        type: "article",
        publishedTime: article.publishedAt,
        tags: article.tags,
      },
      alternates: { canonical: `/blog/${slug}` },
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let article: Article;

  try {
    article = await getArticle(slug);
    if (!article) notFound();
  } catch {
    notFound();
  }

  const a = article;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.seoTitle ?? a.title,
    description: a.seoDescription ?? a.excerpt,
    author: { "@type": "Organization", name: "Tanzania Trip Planner" },
    publisher: {
      "@type": "Organization",
      name: "Tanzania Trip Planner",
      url: "https://tanzaniatripplanner.com",
    },
    datePublished: a.publishedAt,
    dateModified: a.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://tanzaniatripplanner.com/blog/${slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to Blog
        </Link>

        {/* Tags */}
        {a.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {a.tags.map((t: string) => (
              <Link
                key={t}
                href={`/blog?tag=${t}`}
                className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full hover:bg-amber-100 transition-colors"
              >
                <Tag className="w-3 h-3" />{t}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 leading-tight">{a.title}</h1>

        {a.excerpt && (
          <p className="text-lg text-stone-600 mb-6 leading-relaxed">{a.excerpt}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 mb-8 pb-8 border-b border-stone-200">
          {a.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />{formatDate(a.publishedAt)}
            </span>
          )}
          {a.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />{a.readingTime} min read
            </span>
          )}
          {a.region?.length > 0 && (
            <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">{a.region[0].name}</span>
          )}
        </div>

        {/* Hero image placeholder */}
        <div className="h-72 bg-gradient-to-br from-amber-50 to-stone-200 rounded-2xl flex items-center justify-center text-8xl mb-8">
          {a.tags?.includes("kilimanjaro") ? "⛰️" : a.tags?.includes("zanzibar") ? "🏝️" : a.tags?.includes("wildlife") || a.tags?.includes("safari") ? "🦁" : "🌍"}
        </div>

        {/* Portable text content */}
        {a.body ? (
          <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-800 prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
            {/* Rendered by @portabletext/react in production */}
            <p className="text-stone-500 italic text-sm">[Article content renders from Sanity CMS]</p>
          </div>
        ) : (
          <div className="prose prose-stone prose-lg max-w-none">
            <p className="text-stone-500">Content is being loaded from the CMS. Please configure your Sanity project.</p>
          </div>
        )}

        {/* AdSense slot (mid-article) */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <div className="my-10 bg-stone-50 rounded-2xl p-4 text-center text-xs text-stone-400 border border-dashed border-stone-200">
            [AdSense ad — insert ins tag here]
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-amber-50 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-stone-800 mb-2">Ready to Plan Your Tanzania Trip?</h2>
          <p className="text-stone-600 text-sm mb-4">Let our AI build a personalised day-by-day itinerary for you — in under 60 seconds.</p>
          <Link href="/plan" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
            Generate My Itinerary →
          </Link>
        </div>
      </article>
    </>
  );
}
