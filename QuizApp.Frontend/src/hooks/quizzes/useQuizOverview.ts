import { useQuery } from "@tanstack/react-query";
import type { QuizOverview } from "@interfaces/quizzes";
import api from "@config/axiosConfig";

export const useQuizOverview = (quizId: number ) => {
    return useQuery<QuizOverview, Error>({
        queryKey: ['quiz-summary', quizId],
        queryFn: async () => {
            const { data } = await api.get<QuizOverview>(`/quiz/${quizId}/overview`);
            return data;
        },
        enabled: Boolean(quizId),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
};