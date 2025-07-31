import {useMutation, useQueryClient} from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@config/axiosConfig";

export const useAvatarUpload = () => {
    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: ["profile", "avatar", "upload"],
        mutationFn: async (file: File) => {
            if (!file) return null;

            const formData = new FormData();
            formData.append("AvatarFile", file);

            const response = await api.post<{ avatar: string }>("/upload/avatar", formData);
            return response.data.avatar;
        },
        onSuccess: async () => {
            toast.success("Avatar updated!");
            await queryClient.invalidateQueries({ queryKey: ["profile", "summary"] });
        },
        onError: () => {
            toast.error("Failed to upload avatar. Try again.");
        },
    });
};