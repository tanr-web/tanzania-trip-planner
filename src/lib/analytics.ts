// Google Analytics event tracking utility
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, eventParams);
}

// Trip Planner Events
export const trackPlanTripStart = () => trackEvent("plan_trip_start");
export const trackPlanTripComplete = (tripData?: {
  duration?: number;
  budget?: string;
  groupType?: string;
}) => trackEvent("plan_trip_complete", tripData);

// Hotel & Restaurant Events
export const trackHotelClick = (hotelName: string, region?: string) =>
  trackEvent("hotel_click", { hotel_name: hotelName, region });

export const trackRestaurantClick = (restaurantName: string, region?: string) =>
  trackEvent("restaurant_click", { restaurant_name: restaurantName, region });

export const trackDestinationView = (destinationName: string) =>
  trackEvent("destination_view", { destination: destinationName });

// Email Signup Events
export const trackEmailSignup = (source?: string) =>
  trackEvent("email_signup", { source });

export const trackNewsletterSubscribe = () =>
  trackEvent("newsletter_subscribe");

// Blog & Content Events
export const trackBlogView = (slug: string, title?: string) =>
  trackEvent("blog_view", { blog_slug: slug, blog_title: title });

export const trackArticleClick = (slug: string) =>
  trackEvent("article_click", { article_slug: slug });

// Navigation Events
export const trackNavClick = (destination: string) =>
  trackEvent("nav_click", { destination });

// Type augmentation for gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}
