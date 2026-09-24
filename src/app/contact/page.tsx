"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setForm({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Contact Us</h1>
      <p className="text-stone-600 mb-8">
        Have a question, suggestion, or want to work with us? We typically respond within 24 hours.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-amber-50 rounded-2xl p-5 flex items-start gap-3">
          <Mail className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="font-semibold text-stone-800 text-sm">General Enquiries</p>
            <p className="text-stone-600 text-xs mt-0.5">hello@tanzaniatripplanner.com</p>
          </div>
        </div>
        <div className="bg-stone-50 rounded-2xl p-5 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-stone-700 mt-0.5" />
          <div>
            <p className="font-semibold text-stone-800 text-sm">Partnerships</p>
            <p className="text-stone-600 text-xs mt-0.5">partners@tanzaniatripplanner.com</p>
          </div>
        </div>
      </div>

      {status === "sent" ? (
        <div className="text-center py-12 bg-green-50 rounded-2xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-bold text-stone-800 text-lg mb-2">Message sent!</h2>
          <p className="text-stone-600 text-sm">We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-stone-700 mb-1">
                Name
              </label>
              <input
                id="contact-name"
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <input
                id="contact-email"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium text-stone-700 mb-1">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-stone-700 mb-1">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              placeholder="Tell us more..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-full transition-colors"
          >
            <Send className="w-4 h-4" />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "error" && <p className="text-red-600 text-sm text-center">Something went wrong. Please email us directly.</p>}
        </form>
      )}
    </div>
  );
}
