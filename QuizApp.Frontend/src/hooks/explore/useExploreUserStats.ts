import { useAuthStore } from "@store/auth/authStore";
import { useQuery } from "@tanstack/react-query";
import type { ExploreUserStats } from "@interfaces/explore";
import api from "@config/axiosConfig";

export const useExploreUserStats = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    
    return useQuery<ExploreUserStats>({
        queryKey: ['explore-user-stats', user?.id],
        queryFn: async () => {
            const { data } = await api.get<ExploreUserStats>("/explore/user-summary");
            return data;
        },
        enabled: Boolean(token),
    });
}