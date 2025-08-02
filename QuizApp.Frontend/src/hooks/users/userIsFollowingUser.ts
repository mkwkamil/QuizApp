import { useQuery } from "@tanstack/react-query";
import api from "@config/axiosConfig";

export const useIsFollowingUser = (userId: number) => {
    return useQuery<boolean>({
        queryKey: ["is-following", userId],
        queryFn: async () => {
            const { data } = await api.get<boolean>(`/user-follow/is-following/${userId}`);
            return data;
        },
        enabled: !!userId,
    });
};