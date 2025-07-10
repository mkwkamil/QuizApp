using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO;

namespace QuizApp.Backend.Services;

public class QuizService(AppDbContext context, RatingService ratingService, CommentsService commentsService)
{
    public async Task<QuizSummaryDto?> GetQuizSummaryAsync(int quizId)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Author)
            .Include(q => q.Category)
            .Include(q => q.Difficulty)
            .Include(q => q.Questions)
            .Where(q => q.Id == quizId && q.IsPublic && !q.IsDraft)
            .FirstOrDefaultAsync();

        if (quiz == null) return null;

        var ratingSummary = await ratingService.GetRatingSummaryAsync(quizId);
        var comments = await commentsService.GetCommentsForQuizAsync(quizId, 3);

        return new QuizSummaryDto
        {
            Id = quiz.Id,
            Title = quiz.Title ?? "Untitled Quiz",
            Description = quiz.Description ?? "No description available",
            ThumbnailUrl = quiz.ThumbnailUrl ?? "default-thumbnail.png",
            Category = quiz.Category.Name,
            Difficulty = quiz.Difficulty.Name,
            QuestionCount = quiz.Questions.Count,
            Rating = ratingSummary.Average,
            RatingsBreakdown = ratingSummary.Breakdown,
            Plays = quiz.Plays,
            AverageScore = quiz.AverageScore,
            Author = new AuthorDto
            {
                Id = quiz.Author.Id,
                Name = quiz.Author.PublicName ?? quiz.Author.Username,
                AvatarUrl = quiz.Author.Avatar ?? "default-avatar.png",
                JoinedAt = quiz.Author.CreatedAt
            },
            Comments = comments
        };
    }
}
