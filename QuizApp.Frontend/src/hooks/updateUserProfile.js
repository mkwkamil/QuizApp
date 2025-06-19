import api from '../config/axiosConfig';

export const updateUserProfile = async ({ publicName, bio }) => {

    const response = await api.put(`/user/profile`, {publicName, bio});

    return response.data;
}