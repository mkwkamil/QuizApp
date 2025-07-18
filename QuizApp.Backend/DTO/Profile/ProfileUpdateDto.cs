using System.ComponentModel.DataAnnotations;

namespace QuizApp.Backend.DTO.Profile;

public class ProfileUpdateDto
{
    [MaxLength(30, ErrorMessage = "Public name cannot exceed 30 characters.")]
    [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Public name can only contain letters, numbers, and underscores.")]
    public string? PublicName { get; set; } = string.Empty;

    [MaxLength(200, ErrorMessage = "Bio cannot exceed 200 characters.")]
    public string? Bio { get; set; } = string.Empty;
}