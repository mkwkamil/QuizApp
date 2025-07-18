import { useQuery } from "@tanstack/react-query";
import type { PopularQuiz } from "@interfaces/explore";
import api from "@config/axiosConfig";

export const usePopularQuizzes = () => {
    return useQuery<PopularQuiz[]>({
        queryKey: ["quizzes", "popular"],
        queryFn: async () => {
            const { data } = await api.get<PopularQuiz[]>("/explore/popular");
            return data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};