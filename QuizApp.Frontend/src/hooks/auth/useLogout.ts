import { useMutation } from "@tanstack/react-query";
import api from "@config/axiosConfig.ts";
import { toast } from "react-toastify";
import { useAuthStore } from "@store/auth/authStore.ts";

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    
    return useMutation({
        mutationFn: async (): Promise<void> => {
            await api.post('/auth/logout');
        },
        onSuccess: () => {
            logout();
            toast.success("Logout successful!");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
            toast.error(errorMessage);
        },
    });
};