using LoginComponentBackend.Models;

namespace LoginComponentBackend.Services;

public interface IAuthService
{
    Task<bool> Register(User user, string password);
    Task<string> Login(string username, string password);
    Task<bool> UserExists(string username);
}