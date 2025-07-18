using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Auth;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class AuthService(AppDbContext context, ITokenService tokenService) : IAuthService
{
    public async Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto dto)
    {
        if (await context.Users.AnyAsync(u => u.Username == dto.Username)) return null;
        
        CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = hash,
            PasswordSalt = salt,
            PublicName = dto.Username,
            CreatedAt = DateTime.UtcNow,
            Role = "User"
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var token = tokenService.CreateToken(user);
        
        return new AuthResponseDto
        {
            Token = token,
            User = new AuthUserDto
            {
                Id = user.Id,
                Username = user.Username,
                PublicName = user.PublicName ?? user.Username,
                Email = user.Email,
                Role = user.Role
            }
        };
    }
    
    public async Task<AuthResponseDto?> LoginAsync(LoginRequestDto dto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null || !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt)) return null;

        var token = tokenService.CreateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            User = new AuthUserDto
            {
                Id = user.Id,
                Username = user.Username,
                PublicName = user.PublicName ?? user.Username,
                Email = user.Email,
                Role = user.Role
            }
        };
    }

    public async Task<bool> LogoutAsync(string token)
    {
        var principal = tokenService.ValidateToken(token);
        if (principal == null) return false;

        context.BlackListedTokens.Add(new BlacklistedToken
        {
            Token = token,
            ExpiryDate = DateTime.UtcNow.AddHours(1)
        });
        
        await context.SaveChangesAsync();

        return true;
    }

    private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }
    
    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using var hmac = new HMACSHA512(storedSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        
        return computedHash.SequenceEqual(storedHash);
    }
}