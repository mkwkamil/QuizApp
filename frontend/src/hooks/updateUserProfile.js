import axios from "axios";
import useAuthStore from "../store/authStore";

export const updateUserProfile = async ({ publicName, bio }) => {

    const response = await axios.put(
        `api/user/profile`,
        { publicName, bio },
        {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().token}`,
                'Content-Type': 'application/json',
            }
        }
    );

    return response.data;
}