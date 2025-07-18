import { useAuthStore } from "@store/auth/authStore";
import { useQuery } from "@tanstack/react-query";
import type { ExploreUserStats } from "@interfaces/explore";
import api from "@config/axiosConfig";

export const useExploreUserStats = () => {
    const token = useAuthStore((state) => state.token);
    
    return useQuery<ExploreUserStats>({
        queryKey: ["user", "profile", "stats", "explore"],
        queryFn: async () => {
            const { data } = await api.get<ExploreUserStats>("/explore/user-summary");
            return data;
        },
        enabled: Boolean(token),
    });
}