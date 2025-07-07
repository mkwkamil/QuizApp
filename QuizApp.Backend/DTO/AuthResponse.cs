namespace QuizApp.Backend.DTO;

public class AuthResponse
{
    public string? Token { get; set; }
    public UserDto? User { get; set; }
}