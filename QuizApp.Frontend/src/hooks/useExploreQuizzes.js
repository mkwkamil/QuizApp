import { useEffect, useState } from "react";
import api from "../config/axiosConfig";

export const useExploreQuizzes = ({ page = 1, categories = [] }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const params = new URLSearchParams();
                if (categories.length > 0) {
                    params.append("categories", categories.join(","));
                }

                const response = await api.get(`/explore/page/${page}?${params.toString()}`);

                setQuizzes(response.data.quizzes || []);
                setTotalPages(response.data.totalPages || 0);
            } catch (err) {
                setError(err.message || "Failed to fetch quizzes");
            } finally {
                setLoading(false);
            }
        };

        void fetchQuizzes();
    }, [page, categories]);

    return { quizzes, totalPages, loading, error };
};