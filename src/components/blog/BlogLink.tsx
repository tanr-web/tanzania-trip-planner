"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar as CalendarIcon } from "lucide-react";
import { trackBlogView } from "@/lib/analytics";
import { formatDate } from "@/lib/utils";

interface Article {
  _id?: string;
  slug: string;
  title: string;
  seoDescription?: string;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: number;
  heroImage?: string;
}

interface BlogLinkProps {
  article: Article;
}

export default function BlogLink({ article }: BlogLinkProps) {
  const handleClick = () => {
    trackBlogView(article.slug, article.title);
  };

  return (
    <Link
      href={`/blog/${article.slug}`}
      onClick={handleClick}
      className="group block bg-white rounded-2xl border border-stone-200 hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="h-48 bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
        {article.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl">📖</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-stone-800 text-lg group-hover:text-amber-700 transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-stone-600 text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
          {article.publishedAt && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </div>
          )}
          {article.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime} min read
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
          Read Article <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
