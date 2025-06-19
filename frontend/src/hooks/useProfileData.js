import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import {Email, Person, Cake} from '@mui/icons-material';
import api from '../config/axiosConfig';

export const useProfileData = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = useAuthStore.getState().token;
                const response = await api.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const data = response.data;
                
                setProfileData({
                    publicName: data.publicName,
                    bio: data.bio,
                    avatar: data.avatar,
                    stats: {
                        quizzesCreated: data.quizzesCreated,
                        quizzesSolved: data.quizzesSolved,
                        accuracy: data.accuracy,
                    },
                    basicInfo: [
                        { id: 'email', label: 'Email', value: data.email, icon: <Email /> },
                        { id: 'username', label: 'Username', value: data.username, icon: <Person /> },
                        { id: 'memberSince', label: 'Member Since', value: new Date(data.createdAt).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}), icon: <Cake /> }
                    ]
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setProfileData(null);
            }
        };
        fetchProfileData();
    }, []);
    
    return profileData;
}