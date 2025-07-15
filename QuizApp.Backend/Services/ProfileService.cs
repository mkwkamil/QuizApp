using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Profile;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Services;

public class ProfileService(AppDbContext context) : IProfileService
{
    public async Task<ExploreUserSummaryDto?> GetExploreUserSummaryAsync(int userId)
    {
        var user = await context.Users
            .Include(u => u.Quizzes)
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
            PublicName = user.PublicName ?? user.Username,
            Bio = user.Bio ?? "No bio available",
            AvatarUrl = user.Avatar ?? "/avatars/default.png",
            Followers = user.Followers.Count,
            Following = user.Following.Count,
            QuizzesCreated = user.Quizzes.Count,
            QuizzesSolved = user.SolvedQuizzes.Count,
            Accuracy = accuracy,
            FavoriteCategory = favoriteCategory,
            UserRank = user.UserRank ?? "Beginner"
        };
    }

    public async Task<PublicProfileDto?> UpdatePublicDataAsync(int userId, ProfileUpdateDto dataDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) return null;
        
        user.PublicName = dataDto.PublicName;
        user.Bio = dataDto.Bio;

        await context.SaveChangesAsync();

        return new PublicProfileDto
        {
            PublicName = user.PublicName,
            Bio = user.Bio
        };
    }

    public async Task<AvatarUpdateResponseDto?> UpdateAvatarAsync(int userId, IFormFile avatarFile)
    {
        if (avatarFile.Length == 0) return null;

        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return null;
        
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension)) return null;
        
        var avatarFolder = Path.Combine("wwwroot", "avatars");
        Directory.CreateDirectory(avatarFolder);
        
        var fileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(avatarFolder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await avatarFile.CopyToAsync(stream);
        
        user.Avatar = $"/avatars/{fileName}";
        await context.SaveChangesAsync();
        
        return new AvatarUpdateResponseDto
        {
            AvatarUrl = user.Avatar
        };
    }
}