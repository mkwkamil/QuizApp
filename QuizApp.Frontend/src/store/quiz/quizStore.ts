import type {QuizBasicInfo, QuizStoreState} from "@store/quiz/quizTypes.ts";
import {create} from "zustand";

const defaultBasicInfo: QuizBasicInfo = {
    title: "",
    description: "",
    thumbnailUrl: null,
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
    thumbnailFile: null,
    questions: [],

    setQuizId: (id) => set({ quizId: id }),

    setBasicInfo: (info) =>
        set((state) => ({
            basicInfo: { ...state.basicInfo, ...info },
        })),

    setQuestions: (questions) => set({ questions }),

    setThumbnailFile: (file) =>
        set(() => ({
            thumbnailFile: file,
        })),

    reset: () =>
        set({
            quizId: null,
            basicInfo: defaultBasicInfo,
            thumbnailFile: null,
            questions: [],
        }),
}));