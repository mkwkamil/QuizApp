import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export const useDeleteQuizMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (quizId) => api.delete(`/profile/my-quizzes/${quizId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["user-quizzes"]);
        },
    })
}