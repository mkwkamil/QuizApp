import {useEffect, useState} from "react";
import api from "../../config/axiosConfig";

export const usePopularQuizzes = () => {
    const [popularQuizzes, setPopularQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularQuizzes = async () => {
            try {
                const response = await api.get('/explore/popular');
                setPopularQuizzes(response.data || []);
            } catch (err) {
                setError(err.message || "Failed to fetch popular quizzes");
            } finally {
                setLoading(false);
            }
        }
        
        void fetchPopularQuizzes();
    }, []);
    
    return { popularQuizzes, loading, error };
}