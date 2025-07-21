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
    questions: QuestionPayload[];
    setBasicInfo: (info: Partial<QuizBasicInfo>) => void;
    setQuestions: (questions: QuestionPayload[]) => void;
    addQuestion: (question: QuestionPayload) => void;
    updateQuestion: (index: number, question: Partial<QuestionPayload>) => void;
    removeQuestion: (index: number) => void;
    setQuizId: (id: number) => void;
    reset: () => void;
}