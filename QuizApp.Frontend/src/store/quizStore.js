import { create } from "zustand";

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
    submitQuiz: async () => {
        const state = useQuizStore.getState();
        const quizData = {
            title: state.basicInfo.title,
            description: state.basicInfo.description,
            category: state.basicInfo.category,
            difficulty: state.basicInfo.difficulty,
            thumbnailUrl: state.basicInfo.thumbnailUrl,
            options: state.basicInfo.options,
            questions: state.questions
        };

        console.log("Submitting quiz data:", quizData);
        return { success: true, message: "Quiz submitted successfully!", quizId: "12345" };
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