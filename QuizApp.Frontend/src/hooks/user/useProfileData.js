import { Email, Person, Cake } from '@mui/icons-material';
import {useQuery} from "@tanstack/react-query";
import api from "../../config/axiosConfig";
import useAuthStore from "../../store/authStore";

export const useProfileData = () => {
    const token = useAuthStore(state => state.token);
    
    return useQuery({
        queryKey: ['user', 'profile'],
        queryFn: async () => {
            const res = await api.get('/profile/explore-summary');
            const data = res.data;

            return {
                publicName: data.publicName,
                bio: data.bio,
                avatar: data.avatar ?? '',
                stats: {
                    quizzesCreated: data.quizzesCreated,
                    quizzesSolved: data.quizzesSolved,
                    accuracy: data.accuracy,
                    followers: data.followers,
                    following: data.following,
                    favoriteCategory: data.favoriteCategory,
                    userRank: data.userRank
                },
                basicInfo: [
                    { id: 'email', label: 'Email', value: data.email, icon: <Email /> },
                    { id: 'username', label: 'Username', value: data.username, icon: <Person /> },
                    { id: 'memberSince', label: 'Member Since', value: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: <Cake /> }
                ]
            };
        },
        enabled: Boolean(token),
    });
};