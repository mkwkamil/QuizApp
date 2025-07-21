import { useMutation } from "@tanstack/react-query";
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

    return useMutation({
        mutationFn: async ({ quizId, payload }: UpdateQuizPayload) => {
            const { data } = await api.put<{ quizId: number }>(`/quiz-management/${quizId}`, payload);
            return data.quizId;
        },
        onSuccess: (quizId) => {
            toast.success("Quiz updated successfully!");
            navigate(`/quiz/${quizId}`, { replace: true });
        },
        onError: () => {
            toast.error("Failed to update quiz. Please try again.");
        },
    })
}