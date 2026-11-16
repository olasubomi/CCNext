import Axios from "axios";
import { BASE_URL_LIVE, BASE_URL_DEV } from "../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const base_url = process.env.NODE_ENV === "development" ? BASE_URL_DEV : BASE_URL_LIVE;
if (!base_url) {
  throw new Error("NEXT_PUBLIC_API_URL must be set for deployed environments");
}

let axios = Axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 2000000
});

// Move the interceptors setup into a separate function
const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("x-auth-token");
      const publicAuthRoute = /^\/user\/(signin|signup|forgotpassword|resetpassword|google\/signin)(\?|$)/.test(config.url || "");
      if (token && !publicAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const publicAuthRoute = /^\/user\/(signin|signup|forgotpassword|resetpassword|google\/signin)(\?|$)/.test(originalRequest?.url || "");
      const refreshToken = localStorage.getItem("x-auth-refresh-token");
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !publicAuthRoute &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;

        try {
          const fetchResp = await fetch(`${base_url}/user/refresh-token`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          const response = await fetchResp.json();
          const newAccessToken = response.data.token;
          const newRefreshToken = response.data.refreshToken;

          localStorage.setItem("x-auth-refresh-token", newRefreshToken);
          localStorage.setItem("x-auth-token", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle errors if the token refresh fails
        }
      }

      return Promise.reject(error);
    }
  );
};

// Check if window is defined and call the setupAxiosInterceptors function
if (typeof window !== "undefined") {
  setupAxiosInterceptors();
}

export { base_url };
export default axios;
