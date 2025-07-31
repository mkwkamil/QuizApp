using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Profile;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Services;

public class ProfileService(AppDbContext context) : IProfileService
{
    public async Task<PublicProfileDto?> UpdatePublicDataAsync(int userId, ProfileUpdateDto dataDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return null;
        
        user.PublicName = string.IsNullOrWhiteSpace(dataDto.PublicName) || dataDto.PublicName.Contains(' ')
            ? user.Username
            : dataDto.PublicName.Trim();

        user.Bio = string.IsNullOrWhiteSpace(dataDto.Bio)
            ? string.Empty
            : dataDto.Bio;

        await context.SaveChangesAsync();

        return new PublicProfileDto
        {
            PublicName = user.PublicName,
            Bio = user.Bio
        };
    }

    public async Task<ProfileSummaryDto?> GetProfileSummaryAsync(int userId)
    {
        var user = await context.Users
            .Include(u => u.Followers)
            .Include(u => u.Following)
            .FirstOrDefaultAsync(u => u.Id == userId);
        
        if (user == null) return null;
        
        return new ProfileSummaryDto
        {
            PublicName = user.PublicName ?? user.Username,
            Bio = user.Bio ?? "No bio available",
            AvatarUrl = user.Avatar ?? "/avatars/default.png",
            Username = user.Username,
            Email = user.Email,
            JoinDate = user.CreatedAt.ToString("yyyy-MM-dd"),
            FollowersCount = user.Followers.Count,
            FollowingCount = user.Following.Count
        };
    }
}