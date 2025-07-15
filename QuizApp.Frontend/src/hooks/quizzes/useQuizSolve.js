import {useQuery} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export function useQuizSolve(quizId) {
    return useQuery({
        queryKey: ['quiz-solve', quizId],
        queryFn: async () => {
            const res = await api(`/quiz/${quizId}/play`);
            return res.data;
        },
        enabled: Boolean(quizId)
    });
}