import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from "../store/auth/authStore";

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().token;
        
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            const logout = useAuthStore.getState().logout;
            logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;