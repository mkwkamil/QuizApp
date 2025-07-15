using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public interface IAuthService
{
    Task<bool> Register(User user, string password);
    Task<string?> Login(string username, string password);
    Task<bool> Logout(string token);
    Task<bool> UserExists(string username);
    Task<User?> GetUserByUsername(string username);
}