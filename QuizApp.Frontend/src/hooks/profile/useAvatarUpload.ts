import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@config/axiosConfig";

export const useAvatarUpload = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await api.post<{ avatar: string }>("/profile/avatar", formData);
            return response.data.avatar;
        },
        onSuccess: () => {
            toast.success("Avatar updated!");
        },
        onError: () => {
            toast.error("Failed to upload avatar. Try again.");
        },
    });
};