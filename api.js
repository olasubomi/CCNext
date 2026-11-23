// CCD-501 isolated diagnostic preview only: route read-only homepage traffic to
// the same production backend as www.chopchow.app to isolate environment behavior.
// Do not merge this diagnostic override to main; do not log in or transact here.
export const BASE_URL_LIVE = "https://chopchowsd.onrender.com/api";
export const BASE_URL_DEV = "https://chopchowsd.onrender.com/api";
