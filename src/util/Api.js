import Axios from 'axios';
import { BASE_URL_LIVE, BASE_URL_DEV } from '../../api';
import createAuthRefreshInterceptor from 'axios-auth-refresh';


console.error("______ process.env.NODE_ENV ____", process.env.NODE_ENV)
let base_url = `http://localhost:3000/api/`;
// let base_url = `https://chopchowserver.vercel.app/api/`;

if (process.env.NODE_ENV !== "development") {
    // base_url = `https://chopchowserver.vercel.app/api/`;
    base_url = BASE_URL_LIVE
} else {
    // base_url = `http://localhost:5000/api/`;
    base_url = BASE_URL_DEV
}


let axios = Axios.create({
    baseURL: base_url,  //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    }
});

if (typeof window !== 'undefined') {

    const token = localStorage.getItem('x-auth-token');

    console.error("__ token __", token);
    // axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('x-auth-token');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        console.log('here', error.response.status ,!originalRequest._retry)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('x-auth-refresh-token');
                const fetchResp = await fetch(`${base_url}/user/refresh-token`, {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                })
                
                const response = await fetchResp.json()
                const newAccessToken = response.data.token;
                const newRefreshToken = response.data.refreshToken

                localStorage.setItem('x-auth-refresh-token', newRefreshToken);
                localStorage.setItem('x-auth-token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (error) {

            }
        }

        return Promise.reject(error);
    }
);


export { base_url }
export default axios;
