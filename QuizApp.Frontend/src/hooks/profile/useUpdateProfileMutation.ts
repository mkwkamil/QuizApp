import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileUpdate } from "@interfaces/profile";
import api from "@config/axiosConfig";
import { toast } from "react-toastify";
import {useAuthStore} from "@store/auth/authStore.ts";

export const useUpdateProfileMutation = () => {
    const {updateUser, user} = useAuthStore();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ( data: ProfileUpdate ) => {
            const response = await api.put("/profile", data);
            return response.data;
        },
        onSuccess: async (_, data) => {
            await queryClient.invalidateQueries({ queryKey: ["profile", "summary"] });
            toast.success("Profile updated successfully!");
            const newPublicName = !data.publicName?.trim() ? user?.username : data.publicName;
            
            updateUser({ publicName: newPublicName });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to update profile";
            toast.error(errorMessage);
        },
    })
}