using QuizApp.Backend.DTO.Upload;

namespace QuizApp.Backend.Interfaces;

public interface IUploadService
{
    Task<AvatarUpdateResponseDto?> UploadAvatarAsync(int userId, IFormFile avatarFile);
    Task<ThumbnailUploadResponseDto?> UploadThumbnailAsync(IFormFile thumbnailFile);
}