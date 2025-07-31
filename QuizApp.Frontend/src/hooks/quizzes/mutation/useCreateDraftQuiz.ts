import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateDraftPayload } from "@interfaces/quiz-manage";
import api from "@config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateDraftQuiz = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['quiz', 'draft', 'create'],
        mutationFn: async (payload: CreateDraftPayload) => {
            const { data } = await api.post<{ draftId: number }>('/quiz-management/draft', payload);
            return data.draftId;
        },
        onSuccess: async () => {
            toast.success("Draft saved successfully!");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['user-quizzes'] }),
                queryClient.invalidateQueries({ queryKey: ['quizzes', 'filtered'] }),
                queryClient.invalidateQueries({ queryKey: ['quizzes', 'popular', 'explore'] }),
                queryClient.invalidateQueries({ queryKey: ['explore-user-stats'] }),
            ]);
            navigate("/profile", { replace: true });
        },
        onError: () => {
            toast.error("Failed to save draft. Please try again.");
        },
    });
};