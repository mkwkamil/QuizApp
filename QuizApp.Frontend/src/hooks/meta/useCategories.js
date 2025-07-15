import { useEffect, useState } from 'react';
import api from "../../config/axiosConfig";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/quiz/categories');
                setCategories(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    return { categories, loading, error };
};