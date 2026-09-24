import Link from "next/link";
import { Map } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Map className="w-5 h-5 text-amber-500" />
              Tanzania Trip Planner
            </Link>
            <p className="text-sm text-stone-400">
              AI-powered Tanzania itineraries. Handpicked hotels. Real local insight.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations" className="hover:text-amber-400 transition-colors">Destinations</Link></li>
              <li><Link href="/migration-calendar" className="hover:text-amber-400 transition-colors">Migration Calendar</Link></li>
              <li><Link href="/hotels" className="hover:text-amber-400 transition-colors">Hotels & Lodges</Link></li>
              <li><Link href="/restaurants" className="hover:text-amber-400 transition-colors">Restaurants</Link></li>
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h3 className="text-white font-semibold mb-3">Plan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/plan" className="hover:text-amber-400 transition-colors">AI Itinerary Planner</Link></li>
              <li><Link href="/packing-list" className="hover:text-amber-400 transition-colors">Packing List</Link></li>
              <li><Link href="/cost-estimator" className="hover:text-amber-400 transition-colors">Cost Estimator</Link></li>
              <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Travel Guides</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-amber-400 transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Tanzania Trip Planner. All rights reserved.</p>
          <p className="text-center">
            This site contains affiliate links. We may earn a commission if you book through our links,
            at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
