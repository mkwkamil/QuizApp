using System.ComponentModel.DataAnnotations;

namespace QuizApp.Backend.DTO.Upload;

public class UploadAvatarDto
{
    [Required]
    public IFormFile AvatarFile { get; set; } = null!;
}