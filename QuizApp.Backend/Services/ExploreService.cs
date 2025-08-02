using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Explore;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Services;

public class ExploreService(AppDbContext context) : IExploreService
{
    public async Task<ExploreUserSummaryDto?> GetExploreUserSummaryAsync(int userId)
    {
        var user = await context.Users
            .Include(u => u.SolvedQuizzes).ThenInclude(sq => sq.Quiz)
            .Include(u => u.Following)
            .Include(u => u.Followers)
            .FirstOrDefaultAsync(u => u.Id == userId);
        
        if (user == null) return null;
        
        int totalCorrect = user.SolvedQuizzes.Sum(sq => sq.CorrectAnswers);
        int totalQuestions = user.SolvedQuizzes.Sum(sq => sq.TotalQuestions);
        
        var accuracy = totalQuestions > 0 
            ? $"{(totalCorrect * 100.0 / totalQuestions):F2}%"
            : "0%";

        var mostUsedCategoryId = user.SolvedQuizzes
            .Where(sq => sq.Quiz.CategoryId != null)
            .GroupBy(sq => sq.Quiz.CategoryId)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefault();
        
        var favoriteCategory = mostUsedCategoryId.HasValue
            ? await context.QuizCategories
                .Where(c => c.Id == mostUsedCategoryId.Value)
                .Select(c => c.Name)
                .FirstOrDefaultAsync() ?? "Technology"
            : " - ";

        return new ExploreUserSummaryDto
        {
            UserId = userId,
            PublicName = user.PublicName ?? user.Username,
            Bio = user.Bio ?? "No bio available",
            AvatarUrl = user.Avatar ?? "/avatars/default.png",
            Followers = user.Followers.Count,
            Following = user.Following.Count,
            QuizzesSolved = user.SolvedQuizzes.Count,
            Accuracy = accuracy,
            FavoriteCategory = favoriteCategory,
            UserRank = user.UserRank ?? "Beginner"
        };
    }

    public async Task<List<PopularQuizDto>> GetPopularQuizzesAsync()
    {
        return await context.Quizzes
            .Where(q => !q.IsDraft && q.IsPublic)
            .OrderByDescending(q => q.Plays)
            .Take(4)
            .Select(q => new PopularQuizDto
            {
                Id = q.Id,
                Title = q.Title,
                ThumbnailUrl = q.ThumbnailUrl ?? "/thumbnails/default.png",
                QuestionsCount = q.Questions.Count,
                PlayedBy = q.Plays,
                AverageRating = q.RatingCount > 0 ? q.AverageScore : null
            })
            .ToListAsync();
    }

    public async Task<FilteredQuizzesResultDto> GetFilteredQuizzesAsync(QuizFilterRequestDto dto)
    {
        var query = context.Quizzes
            .Include(q => q.Category)
            .Include(q => q.Difficulty)
            .Include(q => q.Questions)
            .Where(q => !q.IsDraft && q.IsPublic);

        if (!string.IsNullOrWhiteSpace(dto.CategoryIds))
        {
            var categoryIds = dto.CategoryIds.Split(',').Select(int.Parse).ToList();
            query = query.Where(q => q.CategoryId.HasValue && categoryIds.Contains(q.CategoryId.Value));
        }
        
        if (dto is { IncludeAnswered: false, UserId: not null })
        {
            var userId = dto.UserId.Value;
            query = query.Where(q => q.Results.All(r => r.UserId != userId));
        }

        if (!string.IsNullOrWhiteSpace(dto.DifficultyIds))
        {
            var diffIds = dto.DifficultyIds.Split(',').Select(int.Parse).ToList();
            query = query.Where(q => q.DifficultyId.HasValue && diffIds.Contains(q.DifficultyId.Value));
        }
        
        if (!string.IsNullOrWhiteSpace(dto.Lengths))
        {
            var lengths = dto.Lengths.Split(',').Select(int.Parse).ToList();
            query = query.Where(q =>
                (lengths.Contains(1) && q.Questions.Count < 6) ||
                (lengths.Contains(2) && q.Questions.Count >= 6 && q.Questions.Count <= 15) ||
                (lengths.Contains(3) && q.Questions.Count > 15));
        }
        
        if (dto.MinRating is >= 1 and <= 3)
        {
            var threshold = dto.MinRating switch
            {
                1 => 4,
                2 => 3,
                3 => 2,
                _ => 0
            };
            query = query.Where(q => q.AverageScore >= threshold);
        }
        
        query = dto.Sort?.ToLower() switch
        {
            "recent" => query.OrderByDescending(q => q.CreatedAt),
            "trending" => query.OrderByDescending(q =>
                q.Results.Where(r => r.SolvedAt >= DateTime.UtcNow.AddDays(-7))
                    .Select(r => r.UserId)
                    .Distinct()
                    .Count()),
            _ => query.OrderByDescending(q => q.Plays)
        };

        const int pageSize = 7;
        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var quizzes = await query
            .Skip((dto.PageId - 1) * pageSize)
            .Take(pageSize)
            .Select(q => new FilteredQuizDto
            {
                Id = q.Id,
                Title = q.Title,
                Description = q.Description,
                ThumbnailUrl = q.ThumbnailUrl ?? "/thumbnails/default.png",
                QuestionsCount = q.Questions.Count,
                PlayedBy = q.Plays,
                AverageRating = q.RatingCount > 0 ? q.AverageScore : null
            })
            .ToListAsync();

        return new FilteredQuizzesResultDto
        {
            TotalPages = totalPages,
            Quizzes = quizzes
        };
    }
}