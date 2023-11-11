import { useEffect } from "react";
import { StoredJwt } from "../interfaces/stored-jwt.ts";
import useAuth from "./auth.hooks.ts";
import { privateAxios } from "../util/axios.ts";

export default function useAxios() {
    const { setIsAuthenticated } = useAuth();

    const api = privateAxios;

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(async req => {
            const token = localStorage.getItem('token');

            if (token) {
                const { token: jwtToken } = JSON.parse(token) as StoredJwt;
                req.headers.Authorization = `Bearer ${jwtToken}`;
            }

            return req;
        })

        const responseIntercept = api.interceptors.response.use(
            async res => res,
            async error => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const token = localStorage.getItem('token');
                    if (token) {
                        const { refreshToken } = JSON.parse(token) as StoredJwt;
                        localStorage.removeItem('token')

                        const response = await api.post(`/auth/refresh`, {
                            refreshToken,
                        })

                        if (response.status !== 200) {
                            setIsAuthenticated(false);
                            return error;
                        }

                        localStorage.setItem('token', JSON.stringify(response.data));
                        setIsAuthenticated(true);
                        return await api.request(originalRequest);
                    }
                }

                return error;
            })

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        }
    }, []);

    return api;
}