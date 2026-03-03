import Link from "next/link";
import { Menu, X, Map } from "lucide-react";

const navLinks = [
  { href: "/plan", label: "Plan My Trip" },
  { href: "/destinations", label: "Destinations" },
  { href: "/hotels", label: "Hotels" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/blog", label: "Travel Guides" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-amber-700">
            <Map className="w-5 h-5" />
            <span className="hidden sm:inline">Tanzania Trip Planner</span>
            <span className="sm:hidden">TTP</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/plan"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Plan My Trip →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
