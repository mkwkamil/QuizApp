import {useMutation, useQueryClient} from "@tanstack/react-query";
import type { CreateQuizPayload } from "@interfaces/quiz-manage.ts";
import api from "@config/axiosConfig.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateQuiz = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['quiz', 'create'],
        mutationFn: async (payload: CreateQuizPayload) => {
            const { data } = await api.post<{ quizId: number }>('/quiz-management', payload);
            return data.quizId;
        },
        onSuccess: async (quizId) => {
            toast.success("Quiz created successfully!");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['quiz-load'] }),
                queryClient.invalidateQueries({ queryKey: ['user-quizzes'] }),
                queryClient.invalidateQueries({ queryKey: ['quizzes', 'filtered'] }),
                queryClient.invalidateQueries({ queryKey: ['quizzes', 'popular', 'explore'] }),
                queryClient.invalidateQueries({ queryKey: ['explore-user-stats'] }),
            ]);
            navigate(`/quiz/${quizId}`, { replace: true });
        },
        onError: () => {
            toast.error("Failed to create quiz. Please try again.");
        },
    })
}