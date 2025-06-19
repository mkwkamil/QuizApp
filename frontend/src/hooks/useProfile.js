import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

function useProfile() {
    const token = useAuthStore(state => state.token);
    const setUser = useAuthStore(state => state.setUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (isMounted) {
                    setUser(res.data);
                }
            } catch (err) {
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (token) fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [setUser, token]);

    return { loading, error };
}

export default useProfile;