// JSON-LD Schema.org markup utilities for SEO

export type SchemaType = Record<string, any>;

export function createOrganizationSchema(siteUrl: string): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tanzania Trip Planner",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description: "AI-powered Tanzania travel planning with curated hotels, restaurants, and guides",
    sameAs: [
      "https://www.facebook.com/tanzaniatripplanner",
      "https://twitter.com/ttpplanner",
      "https://www.instagram.com/tanzaniatripplanner",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@tanzaniatripplanner.com",
      contactType: "Customer Service",
    },
  };
}

export function createTouristDestinationSchema(
  destination: {
    name: string;
    description: string;
    lat?: number;
    lng?: number;
  },
  siteUrl: string,
  slug: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.description,
    url: `${siteUrl}/destinations/${slug}`,
    ...(destination.lat && destination.lng && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: destination.lat,
        longitude: destination.lng,
      },
    }),
    // Popular activities/attractions
    hasMap: `${siteUrl}/`,
    isAccessibleForFree: true,
  };
}

export function createLodgingBusinessSchema(
  hotel: {
    name: string;
    slug: string;
    description: string;
    type: string;
    priceRange?: string;
    stars?: number;
    lat?: number;
    lng?: number;
  },
  siteUrl: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    description: hotel.description,
    url: `${siteUrl}/hotels/${hotel.slug}`,
    ...(hotel.lat && hotel.lng && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: hotel.lat,
        longitude: hotel.lng,
      },
    }),
    ...(hotel.stars && {
      starRating: {
        "@type": "Rating",
        ratingValue: hotel.stars,
      },
    }),
    priceRange: hotel.priceRange === "budget" ? "$" : hotel.priceRange === "mid" ? "$$" : "$$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TZ",
    },
    amenityFeature: [
      { "@type": "Text", name: "WiFi" },
      { "@type": "Text", name: "Restaurant" },
      { "@type": "Text", name: "Game Drives" },
    ],
  };
}

export function createRestaurantSchema(
  restaurant: {
    name: string;
    slug: string;
    description: string;
    cuisine: string | string[];
    priceRange?: string;
    lat?: number;
    lng?: number;
  },
  siteUrl: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    url: `${siteUrl}/restaurants/${restaurant.slug}`,
    ...(restaurant.lat && restaurant.lng && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: restaurant.lat,
        longitude: restaurant.lng,
      },
    }),
    servesCuisine: Array.isArray(restaurant.cuisine) ? restaurant.cuisine : [restaurant.cuisine],
    priceRange: restaurant.priceRange === "budget" ? "$" : restaurant.priceRange === "mid" ? "$$" : "$$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TZ",
    },
  };
}

export function createBlogPostingSchema(
  article: {
    title: string;
    slug: string;
    description?: string;
    excerpt?: string;
    publishedAt?: string;
    readingTime?: number;
    heroImage?: string;
  },
  siteUrl: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description || article.excerpt || article.title,
    url: `${siteUrl}/blog/${article.slug}`,
    ...(article.publishedAt && {
      datePublished: new Date(article.publishedAt).toISOString(),
    }),
    ...(article.heroImage && {
      image: {
        "@type": "ImageObject",
        url: article.heroImage,
      },
    }),
    author: {
      "@type": "Organization",
      name: "Tanzania Trip Planner",
    },
    publisher: {
      "@type": "Organization",
      name: "Tanzania Trip Planner",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.ico`,
      },
    },
  };
}

export function createBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
  siteUrl: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http") ? crumb.url : `${siteUrl}${crumb.url}`,
    })),
  };
}

export function createProductSchema(
  product: {
    name: string;
    description: string;
    price?: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
  },
  siteUrl: string,
  slug?: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(slug && { url: `${siteUrl}/${slug}` }),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.currency || "USD",
      },
    }),
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
      },
    }),
  };
}

export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Utility to embed schema in Next.js metadata
export function getSchemaScript(schema: SchemaType): string {
  return JSON.stringify(schema);
}
