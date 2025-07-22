using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Upload;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Services;

public class UploadService(AppDbContext context, IWebHostEnvironment env) : IUploadService
{
    public async Task<AvatarUpdateResponseDto?> UploadAvatarAsync(int userId, IFormFile avatarFile)
    {
        if (avatarFile.Length == 0) return null;

        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return null;

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var ext = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(ext)) return null;

        var folder = Path.Combine(env.WebRootPath, "avatars");
        Directory.CreateDirectory(folder);

        var fileName = $"{Guid.NewGuid()}{ext}";
        var path = Path.Combine(folder, fileName);

        await using var stream = new FileStream(path, FileMode.Create);
        await avatarFile.CopyToAsync(stream);

        user.Avatar = $"/avatars/{fileName}";
        await context.SaveChangesAsync();

        return new AvatarUpdateResponseDto { AvatarUrl = user.Avatar };
    }

    public async Task<ThumbnailUploadResponseDto?> UploadThumbnailAsync(IFormFile thumbnailFile)
    {
        if (thumbnailFile.Length == 0) return null;

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var ext = Path.GetExtension(thumbnailFile.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(ext)) return null;

        var folder = Path.Combine(env.WebRootPath, "thumbnails");
        Directory.CreateDirectory(folder);

        var fileName = $"{Guid.NewGuid()}{ext}";
        var path = Path.Combine(folder, fileName);

        await using var stream = new FileStream(path, FileMode.Create);
        await thumbnailFile.CopyToAsync(stream);

        return new ThumbnailUploadResponseDto { ThumbnailUrl = $"/thumbnails/{fileName}" };
    }
}