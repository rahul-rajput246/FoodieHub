// Centralized API Base URL configuration
// In local development, falls back to http://127.0.0.1:8000 (prevents Windows IPv6 localhost delays)
// In production (Vercel), uses VITE_API_BASE_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Normalizes image URLs:
 * 1. Converts any legacy "localhost:8000" references to "127.0.0.1:8000" (eliminates 2+ second IPv6 connection timeout on Windows)
 * 2. Prepends API_BASE_URL for relative backend storage paths like "uploads/..."
 * 3. Provides clean fallback if URL is missing
 */
export const normalizeImageUrl = (url, fallback = "/assets/images/burger.png") => {
  if (!url) return fallback;
  if (typeof url !== "string") return fallback;

  let normalized = url;

  // In production, map localhost/127.0.0.1 back to production API_BASE_URL
  if (API_BASE_URL && !API_BASE_URL.includes("127.0.0.1") && !API_BASE_URL.includes("localhost")) {
    normalized = normalized.replace(/http:\/\/(localhost|127\.0\.0\.1):8000/g, API_BASE_URL);
  } else {
    // Replace localhost:8000 with 127.0.0.1:8000 to eliminate Windows IPv6 delay locally
    normalized = normalized.replace(/http:\/\/localhost:8000/g, "http://127.0.0.1:8000");
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  if (normalized.startsWith("uploads/") || normalized.startsWith("/uploads/")) {
    const cleanPath = normalized.startsWith("/") ? normalized.slice(1) : normalized;
    return `${API_BASE_URL}/storage/${cleanPath}`;
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  return `/${normalized}`;
};
