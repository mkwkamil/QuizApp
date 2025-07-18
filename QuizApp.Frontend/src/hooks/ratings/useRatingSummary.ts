import { useQuery } from "@tanstack/react-query";
import api from "@config/axiosConfig";
import type { RatingSummaryDto } from "@interfaces/ratings";

export function useRatingSummary(quizId: number | undefined) {
    return useQuery<RatingSummaryDto>({
        queryKey: ["quiz", quizId, "ratingSummary"],
        queryFn: async () => {
            const { data } = await api.get<RatingSummaryDto>(`/ratings/${quizId}/summary`);
            return data;
        },
        enabled: Boolean(quizId),
    });
}