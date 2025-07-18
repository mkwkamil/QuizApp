import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommentDto, AddCommentPayload } from "@interfaces/comments";
import api from "@config/axiosConfig.ts";
import { toast } from "react-toastify";

export const useAddComment = () => {
    const queryClient = useQueryClient();
    
    return useMutation<CommentDto, unknown, AddCommentPayload>({
        mutationFn: async (payload) => {
            const { data } = await api.post<CommentDto>("/comments", payload);
            return data;
        },
        onSuccess: async (_, { quizId }) => {
            await queryClient.invalidateQueries({ queryKey: ["quiz-summary", quizId] });
            toast.success("Comment added successfully!");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to add comment. Please try again.";
            toast.error(errorMessage);
        },
    });
};