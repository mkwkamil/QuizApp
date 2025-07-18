import { useQuery } from "@tanstack/react-query";
import type { QuizCategory } from "@interfaces/meta";
import api from "@config/axiosConfig";

export const useCategories = () => {
    return useQuery<QuizCategory[]>({
        queryKey: ["quiz-categories"],
        queryFn: async () => {
            const { data } = await api.get<QuizCategory[]>("/quiz/meta/categories");
            return data;
        },
        staleTime: 1000 * 60 * 60,
    });
};