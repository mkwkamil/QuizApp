import { useQuery } from "@tanstack/react-query";
import type { QuizDifficulty } from "@interfaces/meta.ts";
import api from "@config/axiosConfig.ts";

export const useDifficulties = () => {
    return useQuery<QuizDifficulty[]>({
        queryKey: ["quiz-difficulties"],
        queryFn: async () => {
            const {data} = await api.get<QuizDifficulty[]>("/quiz/meta/difficulties");
            return data;
        },
        staleTime: 1000 * 60 * 60,
    });
};