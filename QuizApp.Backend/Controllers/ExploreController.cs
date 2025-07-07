using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExploreController(AppDbContext context) : ControllerBase
{
    [HttpGet("popular")]
    public async Task<IActionResult> GetPopularQuizzes()
    {
        var popularQuizzes = await context.Quizzes
            .Where(q => !q.IsDraft && q.IsPublic)
            .Include(q => q.Results)
            .OrderByDescending(q => q.Results.Select(r => r.UserId).Distinct().Count())
            .Take(4)
            .Select(q => new
            {
                q.Id,
                q.Title,
                q.ThumbnailUrl,
                QuestionsCount = q.Questions.Count,
                PlayedBy = q.Results.Select(r => r.UserId).Distinct().Count(),
                AverageRating = q.Ratings.Any() ? q.Ratings.Average(r => r.Value) : 0
                
            })
            .ToListAsync();

        return Ok(popularQuizzes);
    }

    [HttpGet("page/{pageId:int}")]
    public async Task<IActionResult> GetQuizzesByPage(
        int pageId, 
        [FromQuery] string? categories,
        [FromQuery] string? sort,
        [FromQuery] string? difficulties,
        [FromQuery] string? lengths,
        [FromQuery] int? ratings,
        [FromQuery] bool includeAnswered = true
        )
    {
        var username = User.Identity?.Name;
        var currentUser = await context.Users.FirstOrDefaultAsync(u => u.Username == username);
        
        if (pageId < 1)
        {
            pageId = 1;
        }

        int pageSize = 7;
        
        var query = context.Quizzes
            .Include(q => q.Category)
            .Include(q => q.Ratings)
            .Include(q => q.Results)
            .Include(q => q.Questions)
            .Include(q => q.Difficulty)
            .Where(q => !q.IsDraft && q.IsPublic);
        
        if (!string.IsNullOrWhiteSpace(categories))
        {
            var categoryIds = categories
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .Where(s => int.TryParse(s, out _))
                .Select(int.Parse)
                .ToList();

            if (categoryIds.Count > 0)
            {
                query = query.Where(q => q.CategoryId.HasValue && categoryIds.Contains(q.CategoryId.Value));
            }
        }

        if (!includeAnswered && currentUser != null)
        {
            var userId = currentUser.Id;
            query = query.Where(q => q.Results.All(r => r.UserId != userId));
        }

        if (!string.IsNullOrWhiteSpace(difficulties))
        {
            var difficultyIds = difficulties
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .Where(s => int.TryParse(s, out _))
                .Select(int.Parse)
                .ToList();

            if (difficultyIds.Count > 0)
            {
                query = query.Where(q => q.DifficultyId.HasValue && difficultyIds.Contains(q.DifficultyId.Value));
            }
        }

        if (!string.IsNullOrWhiteSpace(lengths))
        {
            var lengthIds = lengths
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .Where(s => int.TryParse(s, out _))
                .Select(int.Parse)
                .ToList();

            if (lengthIds.Count > 0)
            {
                query = query.Where(q =>
                    (lengthIds.Contains(1) && q.Questions.Count < 6) ||
                    (lengthIds.Contains(2) && q.Questions.Count >= 6 && q.Questions.Count <= 15) ||
                    (lengthIds.Contains(3) && q.Questions.Count > 15)
                );
            }
        }

        if (ratings is >= 1 and <= 3)
        {
            var ratingThreshold = ratings switch
            {
                1 => 4,
                2 => 3,
                3 => 2,
                _ => 0
            };

            query = query.Where(q =>
                q.Ratings.Count == 0 || q.Ratings.Average(r => r.Value) >= ratingThreshold);
        }

        query = sort?.ToLower() switch
        {
            "recent" => query.OrderByDescending(q => q.CreatedAt),
            "trending" => query.OrderByDescending(q => q.Results
                .Where(r => r.SolvedAt >= DateTime.UtcNow.AddDays(-7))
                .Select(r => r.UserId)
                .Distinct()
                .Count()),
            _ => query.OrderByDescending(q => q.Results
                .Select(r => r.UserId)
                .Distinct()
                .Count())
        };
        

        var totalCount = await query.CountAsync();
        var totalPages = Math.Ceiling(totalCount / (double)pageSize);

        var quizzes = await query
            .Skip((pageId - 1) * pageSize)
            .Take(pageSize)
            .Select(q => new
            {
                q.Id,
                q.Title,
                q.Description,
                q.ThumbnailUrl,
                QuestionsCount = q.Questions.Count,
                PlayedBy = q.Results.Select(r => r.UserId).Distinct().Count(),
                AverageRating = q.Ratings.Any() ? q.Ratings.Average(r => r.Value) : 0,
            })
            .ToListAsync();

        return Ok(new { totalPages, quizzes });
    }
}