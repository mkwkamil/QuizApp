import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@config/axiosConfig";
import {useAuthStore} from "@store/auth/authStore.ts";
import {toast} from "react-toastify";

export const useFollowUser = (targetUserId: number) => {
    const queryClient = useQueryClient();
    const currentUserId = Number(useAuthStore((state) => state.user?.id));

    const follow = useMutation<void, Error, void>({
        mutationKey: ["follow-user", targetUserId],
        mutationFn: async () => {
            await api.post("/user-follow/follow", { followingId: targetUserId });
        },
        onSuccess: async () => {
            queryClient.setQueryData(["is-following", targetUserId], true);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["follow-list", currentUserId, "following"] }),
                queryClient.invalidateQueries({ queryKey: ["profile", "summary"] }),
                queryClient.invalidateQueries({ queryKey: ["explore-user-stats", currentUserId] })
            ]);
        },
        onError: () => {
            toast.error("Failed to follow user! Please try again.");
        }
    });

    const unfollow = useMutation<void, Error, void>({
        mutationKey: ["unfollow-user", targetUserId],
        mutationFn: async () => {
            await api.post("/user-follow/unfollow", { followingId: targetUserId });
        },
        onSuccess: async () => {
            queryClient.setQueryData(["is-following", targetUserId], false);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["follow-list", currentUserId, "following"] }),
                queryClient.invalidateQueries({ queryKey: ["profile", "summary"] }),
                queryClient.invalidateQueries({ queryKey: ["explore-user-stats", currentUserId] })
            ]);
        },
        onError: () => {
            toast.error("Failed to unfollow user! Please try again.");
        }
    });

    const removeFollower = useMutation<void, Error, void>({
        mutationKey: ["remove-follower", targetUserId],
        mutationFn: async () => {
            await api.post("/user-follow/remove-follower", { followerId: targetUserId });
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["follow-list", currentUserId, "followers"] }),
                queryClient.invalidateQueries({ queryKey: ["profile", "summary"] }),
                queryClient.invalidateQueries({ queryKey: ["explore-user-stats", currentUserId] })
            ]);
        },
        onError: () => {
            toast.error("Failed to remove follower! Please try again.");
        }
    });

    return { follow, unfollow, removeFollower };
};