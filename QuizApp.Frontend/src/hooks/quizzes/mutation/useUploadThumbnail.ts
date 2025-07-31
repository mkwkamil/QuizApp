import { useMutation } from "@tanstack/react-query";
import api from "@config/axiosConfig.ts";

export const useUploadThumbnail = () => {
    return useMutation({
        mutationFn: async (file?: File | null) => {
            if (!file) return null;

            const formData = new FormData();
            formData.append('ThumbnailFile', file);

            const { data } = await api.post<{ thumbnailUrl: string }>("/upload/quiz-thumbnail", formData);
            return data.thumbnailUrl;
        },
    });
};