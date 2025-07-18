import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {RatingRequestDto} from "@interfaces/ratings";
import api from "@config/axiosConfig";
import {toast} from "react-toastify";

export const useRateQuizMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation<void, unknown, RatingRequestDto>({
        mutationFn: async ({ quizId, value }) => {
            await api.post("/ratings", { quizId, value})
        },
        onSuccess: async (_, { quizId }) => {
            await queryClient.invalidateQueries({ queryKey: ["quiz", quizId, "ratingSummary"] });
            toast.success("Rating submitted successfully!");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to submit rating";
            toast.error(errorMessage);
        }
    });
};