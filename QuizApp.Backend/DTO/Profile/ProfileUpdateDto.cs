using System.ComponentModel.DataAnnotations;

namespace QuizApp.Backend.DTO.Profile;

public class ProfileUpdateDto
{
    [Required]
    [MaxLength(30, ErrorMessage = "Public name cannot exceed 30 characters.")]
    public string PublicName { get; set; } = string.Empty;

    [MaxLength(200, ErrorMessage = "Bio cannot exceed 200 characters.")]
    public string Bio { get; set; } = string.Empty;
}