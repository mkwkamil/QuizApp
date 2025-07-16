import { useEffect, useState } from 'react';
import api from "../../config/axiosConfig";

export const useDifficulties = () => {
    const [difficulties, setDifficulties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/quiz/meta/difficulties');
                setDifficulties(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    return { difficulties, loading, error };
};