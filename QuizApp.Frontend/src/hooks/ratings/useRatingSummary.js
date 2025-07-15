import {useQuery} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export function useRatingSummary(quizId) {
    return useQuery({
        queryKey: ["quiz", quizId, "ratingSummary"],
        queryFn: async () => {
            const res = await api.get(`/ratings/${quizId}/summary`);
            return res.data;
        },
        enabled: Boolean(quizId),
    })
}