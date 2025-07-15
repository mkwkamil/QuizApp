import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export function useRateQuizMutation() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ quizId, value }) => 
            api.post("/ratings", { quizId, value }),
        onSuccess: (_, { quizId }) => {
            queryClient.invalidateQueries(["quiz", quizId, "ratings"]);
        },
    });
}