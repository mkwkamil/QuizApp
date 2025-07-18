import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@config/axiosConfig.ts";
import { toast } from "react-toastify";

export const useDeleteQuizMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (quizId: number): Promise<void> => {
            await api.delete(`/quiz-management/${quizId}`);
        },
        onSuccess: async (_, quizId) => {
            await queryClient.invalidateQueries({ queryKey: ['user-quizzes'] });
            toast.success(`Quiz ${quizId} deleted successfully.`);
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to delete quiz. Please try again.";
            toast.error(errorMessage);
        },
    });
};