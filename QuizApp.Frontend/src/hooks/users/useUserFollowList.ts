import { useQuery } from "@tanstack/react-query";
import api from "@config/axiosConfig";

export type FollowUserInfo = {
    userId: number;
    username: string;
    publicName?: string;
    avatarUrl?: string;
};

export const useUserFollowList = (userId: number, type: "followers" | "following") => {
    return useQuery<FollowUserInfo[]>({
        queryKey: ["follow-list", userId, type],
        queryFn: async () => {
            const { data } = await api.get<FollowUserInfo[]>(`/user-follow/${userId}/${type}`);
            return data;
        },
        enabled: !!userId,
    });
};