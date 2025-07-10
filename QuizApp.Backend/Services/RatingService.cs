using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;

namespace QuizApp.Backend.Services;

public class RatingService(AppDbContext context)
{
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

public class RatingSummaryDto
{
    public double Average { get; set; }
    public Dictionary<int, int> Breakdown { get; set; } = new();
}