import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import api from "../config/axiosConfig";

export const useAuth = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuthStore();
    
    const handleLogin = async (data, onError) => {
        try {
            const response = await api.post('/auth/login', {
                username: data.username,
                password: data.password
            });
            
            login({
                token: response.data.token,
                username: response.data.username,
                role: response.data.role
            });
            
            toast.success(`Login successful! Welcome back, ${data.username}!`);

            // navigate('/');
        } 
        catch (error) {
            if (error.response?.status === 401) {
                onError('Invalid username or password. Please try again.');
            } else if (error.response?.data?.message) {
                onError(error.response.data.message);
            } else {
                onError('An unexpected error occurred. Please try again later.');
            }
        }
    };
    
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            logout();
            toast.success('Logout successful!');
            navigate('/');
        }
        catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.');
        }
    };
    
    const handleRegister = async(data, onError) => {
        try {
            await api.post('/auth/register', data);
            
            toast.success('Registration successful! You can now log in.');

            navigate('/login');
        }
        catch (error) {
            if (error.response?.status === 401) {
                onError('Invalid username or password. Please try again.');
            } else if (error.response?.data?.message) {
                onError(error.response.data.message);
            } else {
                onError('An unexpected error occurred. Please try again later.');
            }
        }
    };
    
    return { handleLogin, handleLogout, handleRegister };
};