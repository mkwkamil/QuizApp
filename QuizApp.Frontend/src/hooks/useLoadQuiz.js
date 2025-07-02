import {useQuizStore} from "../store/quizStore";
import {useEffect, useState} from "react";
import api from "../config/axiosConfig";

export function useLoadQuiz(quizId) {
    const setBasicInfo = useQuizStore(state => state.setBasicInfo);
    const setQuestions = useQuizStore(state => state.setQuestions);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!quizId) return;
        
        const fetchQuiz = async () => {
            try {
                const res = await api.get(`/quiz/${quizId}`);
                const data = res.data;
                
                setBasicInfo({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    difficulty: data.difficulty,
                    thumbnailUrl: data.thumbnailUrl,
                    options: {
                        isPublic: data.isPublic,
                        revealAnswers: data.revealAnswers,
                        shuffleQuestions: data.shuffleQuestions,
                    },
                });
                
                const questions = data.questions.map(q => ({
                    id: q.id,
                    text: q.text,
                    type: q.type,
                    options: q.options,
                    correctAnswers: q.correctAnswers,
                }));
                
                setQuestions(questions);
                
                setLoading(false);
            } catch (err) {
                console.error("Failed to load quiz:", err);
                setError("Failed to load quiz. Please try again later.");
                setLoading(false);
            }
        };
        
        void fetchQuiz();
    }, [quizId, setBasicInfo, setQuestions]);
    
    return {loading, error};
}