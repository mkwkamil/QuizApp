using QuizApp.Backend.DTO.Ratings;

namespace QuizApp.Backend.Interfaces;

public interface IRatingService
{
    Task RateQuizAsync(int userId, RatingRequestDto request);
    Task<RatingSummaryDto> GetRatingSummaryAsync(int quizId);
}