import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileUpdate } from "@interfaces/profile";
import api from "@config/axiosConfig";
import { toast } from "react-toastify";

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ( data: ProfileUpdate ) => {
            const response = await api.put("/profile", data);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profile", "summary"] });
            toast.success("Profile updated successfully!");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to update profile";
            toast.error(errorMessage);
        },
    })
}