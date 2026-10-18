// Centralized API Base URL configuration
const RENDER_BACKEND_URL = "https://foodiehub-backend-1-gli2.onrender.com";

/**
 * Automatically determine the correct backend API URL:
 * - On live/production (e.g. Vercel), ALWAYS use the live Render backend.
 * - Defaults to Render backend so app works even when local MySQL/Apache is stopped.
 */
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";

    // On production / Vercel: NEVER allow localhost or 127.0.0.1
    if (!isLocal) {
      if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
        return envUrl.replace(/\/+$/, "");
      }
      return RENDER_BACKEND_URL;
    }
  }

  // Local development or build time
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl.replace(/\/+$/, "");
  }

  return RENDER_BACKEND_URL;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Normalizes image URLs:
 * 1. Converts any legacy "localhost:8000" or "127.0.0.1:8000" references to the active API_BASE_URL
 * 2. Prepends API_BASE_URL for relative backend storage paths like "uploads/..."
 * 3. Provides clean fallback if URL is missing
 */
export const normalizeImageUrl = (url, fallback = "/assets/images/burger.png") => {
  if (!url) return fallback;
  if (typeof url !== "string") return fallback;

  let normalized = url;

  // Replace any localhost:8000 or 127.0.0.1:8000 with active API_BASE_URL
  normalized = normalized.replace(/http:\/\/(localhost|127\.0\.0\.1):8000/g, API_BASE_URL);

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
