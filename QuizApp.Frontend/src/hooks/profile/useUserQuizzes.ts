import { useQuery } from "@tanstack/react-query";
import type { UserQuizSummary } from "@interfaces/quizzes";
import api from "@config/axiosConfig";

export const useUserQuizzes = () => {
    return useQuery<UserQuizSummary[]>({
        queryKey: ['user-quizzes'],
        queryFn: async () => {
            const { data } = await api.get<UserQuizSummary[]>('/quiz-management/my-quizzes');
            return data;
        },
        staleTime: 1000 * 60 * 5, 
    });
};