import { useMutation } from "@tanstack/react-query";
import api from "@config/axiosConfig";
import { toast } from "react-toastify";
import { useAuthStore } from "@store/auth/authStore";
import type { AuthCredentials, LoginRequestDto } from "@store/auth/authTypes.ts";

export const useLogin = () => {
    const login = useAuthStore((state) => state.login);
    
    return useMutation({
        mutationFn: async (credentials: LoginRequestDto): Promise<AuthCredentials> => {
            const { data } = await api.post('auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            login(data);
            toast.success("Login successful!");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        },
    });
};