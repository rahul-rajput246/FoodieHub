// Centralized API Base URL configuration
// In local development, falls back to http://localhost:8000
// In production (Vercel), uses VITE_API_BASE_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
