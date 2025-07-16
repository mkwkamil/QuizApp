import { useEffect, useState } from "react";
import api from "../../config/axiosConfig";

export const useFilteredQuizzes = (filters) => {
    const {
        page = 1,
        selectedCategories = [],
        sortBy = "popular",
        includeAnswered = true,
        selectedDifficulties = [],
        selectedLengths = [],
        selectedRatings = null
    } = filters;

    const categories = selectedCategories;

    const [quizzes, setQuizzes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const params = new URLSearchParams();
                
                if (categories.length > 0) {
                    params.append("categories", categories.join(","));
                }
                
                if (sortBy && sortBy.toLowerCase() !== "popular") {
                    params.append("sort", sortBy.toLowerCase());
                }
                
                if (!includeAnswered) {
                    params.append("includeAnswered", "false");
                }

                if (selectedDifficulties.length > 0) {
                    params.append("difficulties", selectedDifficulties.join(","));
                }

                if (selectedRatings) {
                    params.append("ratings", selectedRatings.toString());
                }

                if (selectedLengths.length > 0) {
                    params.append("lengths", selectedLengths.join(","));
                }

                const response = await api.get(`/explore/page/${page}?${params.toString()}`);

                setQuizzes(response.data.quizzes || []);
                setTotalPages(response.data.totalPages || 0);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        void fetchQuizzes();
    }, [page, categories, sortBy, includeAnswered, selectedDifficulties, selectedRatings, selectedLengths]);

    return { quizzes, totalPages, loading, error };
};