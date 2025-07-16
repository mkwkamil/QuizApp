import {useQuery} from "@tanstack/react-query";
import api from "../../config/axiosConfig";
import useAuthStore from "../../store/authStore";

export const useUserSummary = () => {
    const token = useAuthStore(state => state.token);
    
    return useQuery({
        queryKey: ['user', 'profile'],
        queryFn: async () => {
            const res = await api.get('/explore/user-summary');
            const data = res.data;

            return {
                publicName: data.publicName,
                bio: data.bio,
                avatar: data.avatar,
                followers: data.followers,
                following: data.following,
                quizzesCreated: data.quizzesCreated,
                userRank: data.userRank,
                favoriteCategory: data.favoriteCategory,
                quizzesSolved: data.quizzesSolved,
                accuracy: data.accuracy
            };
        },
        enabled: Boolean(token),
    });
};