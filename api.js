// API endpoints are injected by the deployment environment at build time.
export const BASE_URL_LIVE = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL_DEV = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
