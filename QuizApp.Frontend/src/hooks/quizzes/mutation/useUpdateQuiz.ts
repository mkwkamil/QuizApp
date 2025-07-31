import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuizPayload } from "@interfaces/quiz-manage.ts";
import api from "@config/axiosConfig.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type UpdateQuizPayload = {
    quizId: number;
    payload: CreateQuizPayload;
};

export const useUpdateQuiz = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['quiz', 'update'],
        mutationFn: async ({ quizId, payload }: UpdateQuizPayload) => {
            const { data } = await api.put<{ quizId: number }>(`/quiz-management/${quizId}`, payload);
            return data.quizId;
        },
        onSuccess: async (quizId) => {
            toast.success("Quiz updated successfully!");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['quiz-load', quizId] }),
                queryClient.invalidateQueries({ queryKey: ['user-quizzes'] }),
                queryClient.invalidateQueries({ queryKey: ['quizzes', 'filtered'] }),
                queryClient.invalidateQueries({ queryKey: ['quizzes', 'popular', 'explore'] }),
                queryClient.invalidateQueries({ queryKey: ['explore-user-stats'] }),
            ]);
            navigate(`/quiz/${quizId}`, { replace: true });
        },
        onError: () => {
            toast.error("Failed to update quiz. Please try again.");
        },
    });
};