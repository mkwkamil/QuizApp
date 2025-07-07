import {useEffect, useState} from "react";
import api from "../config/axiosConfig";

export function useLoadQuiz(quizId) {
    const [loading, setLoading] = useState(Boolean(quizId));
    const [error, setError] = useState(null);
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
        if (!quizId) return;

        let isMounted = true;

        const fetchQuiz = async () => {
            try {
                const res = await api.get(`/quiz/${quizId}`);
                if (!isMounted) return;
                setQuizData(res.data);

            } catch (err) {
                if (isMounted) {
                    setError("Failed to load quiz. Please try again later.");
                }
            } finally {
                setLoading(false);
                isMounted = false;
            }
        };

        void fetchQuiz();
    }, [quizId]);

    return { loading, error, quizData };
}