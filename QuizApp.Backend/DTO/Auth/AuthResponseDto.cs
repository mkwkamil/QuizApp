namespace QuizApp.Backend.DTO.Auth;

public class AuthResponseDto
{
    public string? Token { get; set; }
    public AuthUserDto User { get; set; } = new();
}