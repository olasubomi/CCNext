// API endpoints are injected by the deployment environment at build time.
// Never fall back to the production API for a non-production deployment.
export const BASE_URL_LIVE = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL_DEV = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
