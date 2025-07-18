import { useQuery } from "@tanstack/react-query";
import type { QuizSummary } from "@interfaces/quizzes";
import api from "@config/axiosConfig";

export const useQuizSummary = (quizId: number | string | undefined) => {
    return useQuery<QuizSummary, Error>({
        queryKey: ['quiz-summary', quizId],
        queryFn: async () => {
            const { data } = await api.get<QuizSummary>(`/quiz/${quizId}/summary`);
            return data;
        },
        enabled: Boolean(quizId),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
};