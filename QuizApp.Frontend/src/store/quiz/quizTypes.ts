import type { QuestionPayload } from "@interfaces/quiz-manage.ts";

export interface QuizBasicInfo {
    title: string;
    description: string;
    thumbnailUrl: string | null;
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
    setQuizId: (id: number) => void;
    setBasicInfo: (info: Partial<QuizBasicInfo>) => void;
    setQuestions: (questions: QuestionPayload[]) => void;
    setThumbnailFile: (file: File | null) => void;
    reset: () => void;
}