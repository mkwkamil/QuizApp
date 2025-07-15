import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export function useAddComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ quizId, content }) => {
            const res = await api.post("/comments", { quizId, content });
            return res.data;
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries(["quiz-summary", variables.quizId]);
        }
    });
}