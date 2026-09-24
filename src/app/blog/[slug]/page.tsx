import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Clock, Calendar, Tag, ArrowLeft } from "lucide-react";
import { getArticle, getAllArticleSlugs } from "@/lib/sanity";
import { getStaticArticle, getAllStaticArticles, StaticArticle } from "@/lib/static-articles";
import { formatDate } from "@/lib/utils";
import { createBlogPostingSchema, getSchemaScript } from "@/lib/schema-org";
import type { Article } from "@/types";

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  // Static articles always available
  getAllStaticArticles().forEach((a) => params.push({ slug: a.slug }));
  // Sanity articles if configured
  try {
    const slugs = await getAllArticleSlugs();
    slugs.forEach((s) => {
      if (!params.find((p) => p.slug === s.slug)) params.push({ slug: s.slug });
    });
  } catch {
    // Sanity not configured
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Try Sanity first
  try {
    const article: Article = await getArticle(slug);
    if (article) {
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
    }
  } catch {
    // fall through
  }
  // Fall back to static article
  const sa = getStaticArticle(slug);
  if (sa) {
    return {
      title: sa.seoTitle,
      description: sa.seoDescription,
      openGraph: {
        title: sa.seoTitle,
        description: sa.seoDescription,
        type: "article",
        publishedTime: sa.publishedAt,
        tags: sa.tags,
        images: [{ url: sa.heroImage }],
      },
      alternates: { canonical: `/blog/${slug}` },
    };
  }
  return { title: "Article Not Found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Try Sanity first
  let sanityArticle: Article | null = null;
  try {
    const fetched = await getArticle(slug);
    if (fetched) sanityArticle = fetched;
  } catch {
    // Sanity not configured
  }

  // Fall back to static article
  const staticArticle: StaticArticle | undefined = !sanityArticle ? getStaticArticle(slug) : undefined;
  if (!sanityArticle && !staticArticle) notFound();

  const a = sanityArticle ?? staticArticle!;
  const isStatic = !sanityArticle && !!staticArticle;

  const blogSchema = createBlogPostingSchema(
    {
      title: isStatic ? staticArticle!.seoTitle : (sanityArticle!.seoTitle ?? sanityArticle!.title),
      slug,
      description: isStatic ? staticArticle!.seoDescription : (sanityArticle!.seoDescription ?? sanityArticle!.excerpt),
      publishedAt: a.publishedAt,
      readingTime: a.readingTime,
      heroImage: isStatic ? staticArticle!.heroImage : undefined,
    },
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanzaniatripplanner.com"
  );

  return (
    <>
      <Script
        id={`blog-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getSchemaScript(blogSchema) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-stone-700 hover:text-amber-600 text-sm mb-8 transition-colors">
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

        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600 mb-8 pb-8 border-b border-stone-200">
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
          {!isStatic && (sanityArticle?.region?.length ?? 0) > 0 && (
            <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">{sanityArticle!.region[0].name}</span>
          )}
        </div>

        {/* Hero image */}
        {isStatic ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={staticArticle!.heroImage} alt={staticArticle!.title} className="w-full h-72 object-cover rounded-2xl mb-8" />
        ) : (
          <div className="h-72 bg-gradient-to-br from-amber-50 to-stone-200 rounded-2xl flex items-center justify-center text-8xl mb-8">
            {a.tags?.includes("kilimanjaro") ? "⛰️" : a.tags?.includes("zanzibar") ? "🏝️" : a.tags?.includes("wildlife") || a.tags?.includes("safari") ? "🦁" : "🌍"}
          </div>
        )}

        {/* Article body */}
        {isStatic ? (
          <div
            className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-800 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-lg prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-table:text-sm prose-td:py-2 prose-th:py-2 prose-li:marker:text-amber-500"
            dangerouslySetInnerHTML={{ __html: staticArticle!.bodyHtml }}
          />
        ) : (
          <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-800 prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
            {sanityArticle?.body ? (
              <p className="text-stone-700 italic text-sm">[Article content renders from Sanity CMS]</p>
            ) : (
              <p className="text-stone-700">Content is being loaded from the CMS.</p>
            )}
          </div>
        )}

        {/* AdSense slot (mid-article) */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <div className="my-10 bg-stone-50 rounded-2xl p-4 text-center text-xs text-stone-600 border border-dashed border-stone-200">
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
