export type QuestionType = "single" | "multiple" | "truefalse";

export type CreateQuizPayload = {
    title: string;
    description: string;
    thumbnailUrl: string;
    categoryId: number;
    difficultyId: number;
    isPublic: boolean;
    isDraft: boolean;
    revealAnswers: boolean;
    shuffleQuestions: boolean;
    questions: QuestionPayload[];
};

export type QuestionPayload = {
    id?: string;
    text: string;
    type: QuestionType;
    options: string[];
    correctAnswers: number[];
};

export type CreateDraftPayload = {
    title: string;
    description?: string;
    thumbnailUrl?: string;
    categoryId?: number | null;
    difficultyId?: number | null;
    isPublic: boolean;
    isDraft: true;
    revealAnswers: boolean;
    shuffleQuestions: boolean;
    questions: DraftQuestionPayload[];
};

export type DraftQuestionPayload = {
    text?: string;
    type?: QuestionType;
    options?: string[];
    correctAnswers?: number[];
};

export interface EditableQuestion {
    id: string;
    text: string;
    type: QuestionType;
    options: string[];
    correctAnswers: number[];
}
