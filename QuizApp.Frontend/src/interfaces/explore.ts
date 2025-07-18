export interface ExploreUserStats {
    userId: number;
    publicName: string;
    bio: string;
    avatarUrl: string;
    followers: number;
    following: number;
    quizzesCreated: number;
    quizzesSolved: number;
    accuracy: string;
    favoriteCategory: string;
    userRank: string;
}

export interface PopularQuiz {
    id: number;
    title: string;
    thumbnailUrl: string;
    questionsCount: number;
    playedBy: number;
    averageRating: number;
}

export interface FilteredQuiz {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    questionsCount: number;
    playedBy: number;
    averageRating: number;
}

export interface FilteredQuizzesResponse {
    quizzes: FilteredQuiz[];
    totalPages: number;
}

export interface ExploreFilters {
    page?: number;
    selectedCategories?: number[];
    sortBy?: string;
    includeAnswered?: boolean;
    selectedDifficulties?: number[];
    selectedLengths?: number[];
    selectedRatings?: number | null;
}