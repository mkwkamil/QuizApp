export type QuestionType = "single" | "multiple" | "boolean";

export interface UserQuizSummary {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    isDraft: boolean;
    questionCount: number;
    playedBy: number;
    averageRating: number;
}

export interface QuizLoad {
    quizId: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    categoryId: number | null;
    difficultyId: number | null;
    isPublic: boolean;
    isDraft: boolean;
    revealAnswers: boolean;
    shuffleQuestions: boolean;
    questions: LoadQuestion[];
}

export interface LoadQuestion {
    text: string;
    type: QuestionType;
    options: string[];
    correctAnswers: number[];
}

export interface QuizOverview {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    category: string;
    difficulty: string;
    questionCount: number;
    plays: number;
    averageScore: number;
    author: QuizAuthor;
    comments: QuizComment[];
}

export interface QuizAuthor {
    id: number;
    name: string;
    avatarUrl: string;
    joinedAt: string;
}

export interface QuizComment {
    id: number;
    authorName: string;
    content: string;
    createdAt: string;
}

export interface QuizSolve {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    questions: SolveQuestion[];
}

export interface SolveQuestion {
    id: number;
    text: string;
    type: QuestionType;
    answers: SolveAnswer[];
}

export interface SolveAnswer {
    id: number;
    text: string;
}

export interface QuizSubmission {
    quizId: number;
    timeTaken: number;
    answers: SubmittedAnswer[];
}

export interface SubmittedAnswer {
    questionId: number;
    selectedAnswerIds: number[];
}

export interface QuizSubmissionResult {
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
}