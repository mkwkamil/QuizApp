export interface RatingSummaryDto {
    average: number;
    breakdown: Record<number, number>;
}

export interface RatingRequestDto {
    quizId: number;
    value: number;
}

export interface UseQuizRatingProps {
    quizId: number;
    initialRating?: number;
}