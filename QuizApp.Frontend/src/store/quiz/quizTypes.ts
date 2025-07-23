import type { QuestionPayload } from "@interfaces/quiz-manage.ts";

export interface QuizBasicInfo {
    title: string;
    description: string;
    thumbnailUrl: string;
    categoryId: number | null;
    difficultyId: number | null;
    isPublic: boolean;
    isDraft: boolean;
    revealAnswers: boolean;
    shuffleQuestions: boolean;
}

export interface QuizStoreState {
    quizId: number | null;
    basicInfo: QuizBasicInfo;
    thumbnailFile: File | null;
    questions: QuestionPayload[];
    setBasicInfo: (info: Partial<QuizBasicInfo>) => void;
    setThumbnailFile: (file: File | null) => void;
    setQuestions: (questions: QuestionPayload[]) => void;
    setQuizId: (id: number) => void;
    reset: () => void;
}