import axios from 'axios';
import { isAuth } from "../store/auth";
import type { StoredJwt } from "../interfaces/StoredJwt";
import { TOKEN_KEY } from "../constants/stored-token-key";

const BASE_URL = 'http://localhost:8080/api/v1'

export const publicAxios = axios.create({
    baseURL: BASE_URL,
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// interceptors
privateAxios.interceptors.request.use(
    async req => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            const { token: jwtToken } = JSON.parse(token) as StoredJwt;
            req.headers.Authorization = `Bearer ${jwtToken}`;
        }

        return req;
    }
)

privateAxios.interceptors.response.use(
    async res => res,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                const { refreshToken } = JSON.parse(token) as StoredJwt;
                localStorage.removeItem(TOKEN_KEY)

                const response = await privateAxios.post(`/auth/refresh`, {
                    refreshToken,
                })

                if (response.status !== 200) {
                    isAuth.set(false);
                    return error;
                }

                console.log("refreshed token");
                localStorage.setItem(TOKEN_KEY, JSON.stringify(response.data));
                isAuth.set(true);
                return await privateAxios.request(originalRequest);
            }
        }

        return error;
    })
