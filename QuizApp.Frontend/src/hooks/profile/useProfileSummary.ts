import { useQuery } from "@tanstack/react-query";
import type { ProfileSummary } from "@interfaces/profile";
import api from "@config/axiosConfig";

export const useProfileSummary = () => {
    return useQuery<ProfileSummary>({
        queryKey: ["profile", "summary"],
        queryFn: async () => {
            const { data } = await api.get<ProfileSummary>("/profile/summary");
            return data;
        },
    });
};
