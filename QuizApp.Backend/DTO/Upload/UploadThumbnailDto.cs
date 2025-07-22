using System.ComponentModel.DataAnnotations;

namespace QuizApp.Backend.DTO.Upload;

public class UploadThumbnailDto
{
    [Required]
    public IFormFile ThumbnailFile { get; set; } = null!;
}