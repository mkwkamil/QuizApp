import { useQuery } from "@tanstack/react-query";
import type { QuizSolve } from "@interfaces/quizzes";
import api from "@config/axiosConfig";

export const useQuizSolve = (quizId: number) => {
    return useQuery<QuizSolve, Error>({
        queryKey: ["quiz-solve", quizId],
        queryFn: async () => {
            const { data } = await api.get<QuizSolve>(`/quiz/${quizId}/solve`);
            return data;
        },
        enabled: Boolean(quizId),
        staleTime: 1000 * 60 * 5,
    });
};