import React from "react";

export interface ExploreUserStats {
    userId: number;
    publicName: string;
    bio: string;
    avatarUrl: string;
    followers: number;
    following: number;
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
    averageRating: number | null;
}

export interface FilteredQuiz {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    questionsCount: number;
    playedBy: number;
    averageRating: number | null;
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

export interface FiltersCardProps {
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export interface FilteredQuizListProps {
    quizzes: FilteredQuiz[];
    loading: boolean;
    totalPages: number;
    page: number;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}