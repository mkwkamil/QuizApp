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