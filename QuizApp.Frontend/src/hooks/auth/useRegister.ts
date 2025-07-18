import { useMutation } from "@tanstack/react-query";
import api from "@config/axiosConfig";
import { useAuthStore } from "@store/auth/authStore";
import type { AuthCredentials, RegisterRequestDto } from "@store/auth/authTypes";
import {toast} from "react-toastify";

export const useRegister = () => {
    const login = useAuthStore(state => state.login);
    
    return useMutation({
        mutationFn: async (credentials: RegisterRequestDto): Promise<AuthCredentials> => {
            const { data } = await api.post('/auth/register', credentials);
            return data;
        },
        onSuccess: (data) => {
            login(data);
            toast.success("Registration successful! You are now logged in.");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    })
};