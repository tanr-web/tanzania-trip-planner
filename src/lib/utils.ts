import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getPriceLabel(range: string): string {
  const map: Record<string, string> = {
    budget: "$ Budget",
    mid: "$$ Mid-Range",
    luxury: "$$$ Luxury",
    upscale: "$$$ Upscale",
  };
  return map[range] ?? range;
}

export function getMonthName(month: number): string {
  return new Date(2000, month - 1, 1).toLocaleString("en-US", { month: "long" });
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}
