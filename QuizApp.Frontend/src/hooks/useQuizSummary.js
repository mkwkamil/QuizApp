import {useQuery} from "@tanstack/react-query";
import api from "../config/axiosConfig";

export function useQuizSummary(quizId) {
    return useQuery({
        queryKey: ["quiz-summary", quizId],
        queryFn: async () => {
            const res = await api.get(`/quiz/${quizId}/summary`);
            return res.data;
        },
        enabled: Boolean(quizId),
    })
}