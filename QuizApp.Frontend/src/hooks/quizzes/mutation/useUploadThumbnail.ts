import { useMutation } from "@tanstack/react-query";
import api from "@config/axiosConfig.ts";

const BASE_URL = "http://localhost:5203/";

export const useUploadThumbnail = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('ThumbnailFile', file);

            const { data } = await api.post<{ thumbnailUrl: string }>("/upload/quiz-thumbnail", formData);

            return `${BASE_URL}${data.thumbnailUrl}`;
        },
    });
};