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
    thumbnailFile: null,
    questions: [],
    
    setBasicInfo: (info) => set((state) => ({
        basicInfo: {...state.basicInfo, ...info}
    })),
    
    setThumbnailFile: (file) => {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                if (img.width <= img.height)
                    return console.log("Only landscape images are allowed.");
                
                const previewUrl = URL.createObjectURL(file);
                set((state) => ({
                    thumbnailFile: file,
                    basicInfo: {...state.basicInfo, thumbnailUrl: previewUrl}
                }))
            };
            if (typeof reader.result === 'string') {
                img.src = reader.result;
            }
        };
        reader.readAsDataURL(file);
    },
    
    setQuestions: (questions) => set({questions}),
    
    setQuizId: (id) => set({quizId: id}),
    
    reset: () => set({
        quizId: null,
        basicInfo: defaultBasicInfo,
        thumbnailFile: null,
        questions: []
    })
}));