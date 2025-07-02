import { create } from "zustand";
import api from "../config/axiosConfig";

export const useQuizStore = create((set) => ({
    // First Stage: Basic Info
    basicInfo: {
        title: '',
        description: '',
        category: '',
        difficulty: '',
        thumbnailUrl: '',
        options: {
            isPublic: true,
            revealAnswers: true,
            shuffleQuestions: false,
        }
    },
    
    // Second Stage: Questions
    questions: [],
    
    // Actions
    setBasicInfo: (info) => set({ basicInfo: info }),
    setQuestions: (questions) => set({ questions }),
    
    // Third Stage: Review & Publish
    submitQuiz: async (isDraft = false) => {
        const state = useQuizStore.getState();

        const quizData = {
            title: state.basicInfo.title,
            description: state.basicInfo.description,
            thumbnailUrl: state.basicInfo.thumbnailUrl,
            category: state.basicInfo.category,
            difficulty: state.basicInfo.difficulty,
            isPublic: state.basicInfo.options.isPublic,
            isDraft: isDraft,
            revealAnswers: state.basicInfo.options.revealAnswers,
            shuffleQuestions: state.basicInfo.options.shuffleQuestions,
            questions: state.questions.map(q => ({
                text: q.text,
                type: q.type,
                options: q.options,
                correctAnswers: q.correctAnswers
            }))
        };

        try {
            const res = await api.post('/quiz', quizData);
            const { quizId } = res.data;
            console.log("Quiz submitted:", quizId);
            return { success: true, quizId };
        } catch (error) {
            console.error("Quiz submission failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Unknown error"
            };
        }
    },
    
    // Reset store
    reset: () => set({
        basicInfo: {
            title: '',
            description: '',
            category: '',
            difficulty: '',
            thumbnailUrl: '',
            options: {
                isPublic: true,
                revealAnswers: true,
                shuffleQuestions: false,
            }
        },
        questions: []
    })
}));