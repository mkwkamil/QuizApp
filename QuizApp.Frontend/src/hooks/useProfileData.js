import { useEffect, useState } from 'react';
import {Email, Person, Cake} from '@mui/icons-material';
import api from '../config/axiosConfig';

export const useProfileData = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/user/data');

                const data = response.data;

                setProfileData({
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
                        { id: 'memberSince', label: 'Member Since', value: new Date(data.createdAt).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}), icon: <Cake /> }
                    ]
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setProfileData(null);
            }
        })();
    }, []);
    
    return profileData;
}