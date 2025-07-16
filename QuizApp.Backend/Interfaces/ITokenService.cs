using System.Security.Claims;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
    ClaimsPrincipal? ValidateToken(string token);
}