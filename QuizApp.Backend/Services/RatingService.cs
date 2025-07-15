using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Ratings;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class RatingService(AppDbContext context) : IRatingService
{
    public async Task RateQuizAsync(int userId, RatingRequestDto request)
    {
        var existingRating = await context.Ratings
            .FirstOrDefaultAsync(r => r.QuizId == request.QuizId && r.UserId == userId);

        if (existingRating != null)
        {
            existingRating.Value = request.Value;
        }
        else
        {
            var rating = new Rating
            {
                UserId = userId,
                QuizId = request.QuizId,
                Value = request.Value
            };
            context.Ratings.Add(rating);
        }

        await context.SaveChangesAsync();
        
        var quizRatings = await context.Ratings
            .Where(r => r.QuizId == request.QuizId)
            .ToListAsync();

        var quiz = await context.Quizzes.FindAsync(request.QuizId);
        if (quiz != null)
        {
            quiz.AverageScore = Math.Round(quizRatings.Average(r => r.Value), 2);
            quiz.RatingCount = quizRatings.Count;
            await context.SaveChangesAsync();
        }
    }
    
    public async Task<RatingSummaryDto> GetRatingSummaryAsync(int quizId)
    {
        var ratings = await context.Ratings
            .Where(r => r.QuizId == quizId)
            .ToListAsync();

        if (ratings.Count == 0)
        {
            return new RatingSummaryDto
            {
                Average = 0,
                Breakdown = new Dictionary<int, int>()
            };
        }
        
        var average = Math.Round(ratings.Average(r => r.Value), 2);
        
        var breakdown = ratings
            .GroupBy(r => r.Value)
            .ToDictionary(g => g.Key, g => g.Count());

        return new RatingSummaryDto
        {
            Average = average,
            Breakdown = breakdown
        };
    }
}