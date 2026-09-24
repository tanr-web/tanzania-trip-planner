"use client";

import { FormEvent, useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { trackNewsletterSubscribe, trackEmailSignup } from "@/lib/analytics";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      // Track signup attempt in GA
      trackEmailSignup("homepage_hero");

      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Track successful signup
        trackNewsletterSubscribe();
        setStatus("success");
        setEmail("");
        setMessage("Check your email for the packing list!");

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200">
      <div className="flex items-start gap-3 mb-4">
        <Mail className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-stone-800 text-lg">Get Our Free Packing List</h3>
          <p className="text-stone-600 text-sm">Plus updates on Tanzania travel tips, deals, and new guides</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-stone-50"
            aria-label="Your email address"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 text-white font-semibold rounded-lg transition-colors"
            aria-label="Subscribe to newsletter"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "✓ Subscribed" : "Subscribe"}
          </button>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 p-3 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-xs text-stone-700">
          We respect your privacy. Unsubscribe anytime. See our <a href="/privacy" className="text-amber-600 hover:underline">privacy policy</a>.
        </p>
      </form>
    </div>
  );
}
