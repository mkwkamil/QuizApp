import { useQuery } from "@tanstack/react-query";
import type { QuizLoad } from "@interfaces/quizzes";
import api from "@config/axiosConfig";

export const useLoadQuiz = (quizId: number) => {
    return useQuery<QuizLoad, Error>({
        queryKey: ['quiz-load', quizId],
        queryFn: async () => {
            const { data } = await api.get<QuizLoad>(`/quiz-management/${quizId}`);
            return data;
        },
        enabled: Boolean(quizId),
    });
};