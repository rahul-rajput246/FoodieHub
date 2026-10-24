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

  // Never allow ui-avatars.com placeholder as banner or content image
  if (url.includes("ui-avatars.com")) {
    return fallback;
  }

  // Base64 Data URIs are self-contained and durable
  if (url.startsWith("data:image/")) {
    return url;
  }

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

/**
 * Returns a smart, category-appropriate fallback image for food items.
 */
export const getFoodFallback = (item) => {
  const name = (item?.food_name || item?.name || "").toLowerCase();
  const cat = (item?.category_name || "").toLowerCase();

  if (name.includes("pizza") || cat.includes("pizza")) return "/assets/images/cheese_pizza.jfif";
  if (name.includes("drink") || name.includes("mojito") || name.includes("tea") || name.includes("coffee") || name.includes("shake") || name.includes("soda") || cat.includes("drink") || cat.includes("chill")) return "/assets/images/mojito.jfif";
  if (name.includes("cake") || name.includes("sweet") || name.includes("dessert") || name.includes("jamun") || name.includes("ice") || name.includes("brownie") || cat.includes("sweet")) return "/assets/images/blackForest_cake.webp";
  if (name.includes("chole") || name.includes("paneer") || name.includes("dal") || name.includes("rice") || name.includes("puri") || cat.includes("desi")) return "/assets/images/chole_bhature.jfif";
  if (name.includes("chicken") || name.includes("wing")) return "/assets/images/chicken_wings_img.jfif";
  if (name.includes("sandwich") || name.includes("sandwitch")) return "/assets/images/sandwitch_img.jfif";
  return "/assets/images/burger.png";
};
