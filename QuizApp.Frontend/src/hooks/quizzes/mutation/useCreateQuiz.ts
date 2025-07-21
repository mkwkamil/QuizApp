import { useMutation } from "@tanstack/react-query";
import type { CreateQuizPayload } from "@interfaces/quiz-manage.ts";
import api from "@config/axiosConfig.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateQuiz = () => {
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: async (payload: CreateQuizPayload) => {
            const { data } = await api.post<{ quizId: number }>('/quiz-management', payload);
            return data.quizId;
        },
        onSuccess: (quizId) => {
            toast.success("Quiz created successfully!");
            navigate(`/quiz/${quizId}`, { replace: true });
        },
        onError: () => {
            toast.error("Failed to create quiz. Please try again.");
        },
    })
}