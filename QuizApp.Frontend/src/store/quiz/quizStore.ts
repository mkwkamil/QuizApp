import type {QuizBasicInfo, QuizStoreState} from "@store/quiz/quizTypes.ts";
import {create} from "zustand";

const defaultBasicInfo: QuizBasicInfo = {
    title: '',
    description: '',
    thumbnailUrl: '',
    categoryId: null,
    difficultyId: null,
    isPublic: true,
    isDraft: false,
    revealAnswers: true,
    shuffleQuestions: false,
};

export const useQuizStore = create<QuizStoreState>((set) => ({
    quizId: null,
    basicInfo: defaultBasicInfo,
    questions: [],
    
    setBasicInfo: (info) => set((state) => ({
        basicInfo: {...state.basicInfo, ...info}
    })),
    
    setQuestions: (questions) => set({questions}),
    
    addQuestion: (question) => set((state) => ({
        questions: [...state.questions, question]
    })),

    updateQuestion: (index, partial) => set((state) => {
        const updated = [...state.questions];
        updated[index] = { ...updated[index], ...partial };
        return { questions: updated };
    }),

    removeQuestion: (index) => set((state) => {
        const updated = [...state.questions];
        updated.splice(index, 1);
        return { questions: updated };
    }),
    
    setQuizId: (id) => set({quizId: id}),
    
    reset: () => set({
        quizId: null,
        basicInfo: defaultBasicInfo,
        questions: []
    })
}));