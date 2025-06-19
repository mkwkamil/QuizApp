import axios from 'axios';
import useAuthStore from "../store/authStore";
import {useNavigate} from "react-router-dom";

const navigate = useNavigate()

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use(
    (config) => {
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
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const logout = useAuthStore.getState().logout;
            logout();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default api;