import { Email, Person, Cake } from '@mui/icons-material';
import {useQuery} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export const useProfileSummary = () => {
    return useQuery({
        queryKey: ["profile", "summary"],
        queryFn: async () => {
            const res = await api.get('/profile/summary');
            const data = res.data;
            
            return {
                publicName: data.publicName,
                bio: data.bio,
                avatarUrl: data.avatarUrl,
                quizzesCreated: data.quizzesCreated,
                quizzesAccuracy: data.accuracy,
                basicInfo: [
                    { id: 'email', label: 'Email', value: data.email, icon: <Email /> },
                    { id: 'username', label: 'Username', value: data.username, icon: <Person /> },
                    { id: 'memberSince', label: 'Member Since', value: new Date(data.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: <Cake /> }
                ],
            };
        }
    });
};