using QuizApp.Backend.DTO.Auth;

namespace QuizApp.Backend.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginRequestDto dto);
    Task<bool> LogoutAsync(string token);
}