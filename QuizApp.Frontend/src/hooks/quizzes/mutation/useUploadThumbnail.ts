import {useMutation} from "@tanstack/react-query";
import api from "@config/axiosConfig.ts";

export const useUploadThumbnail = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('thumbnail', file);
            
            const { data } = await api.post<{ url: string}>("/uploads/quiz-thumbnail", formData);
            return data.url;
        },
    });
};