using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class AuthService(AppDbContext context, ITokenService tokenService) : IAuthService
{
    public async Task<bool> Register(User user, string password)
    {
        CreatePasswordHash(password, out byte[] hash, out byte[] salt);
        user.PasswordHash = hash;
        user.PasswordSalt = salt;
        user.CreatedAt = DateTime.UtcNow;
        user.PublicName = user.Username;
        
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return true;
    }
    
    public async Task<string?> Login(string username, string password)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username == username);
        if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

        return tokenService.CreateToken(user);
    }

    public async Task<bool> Logout(string token)
    {
        try
        {
            var principal = tokenService.ValidateToken(token);
            if (principal == null)
            {
                return false;
            }

            var blacklistedToken = new BlacklistedToken
            {
                Token = token,
                ExpiryDate = DateTime.UtcNow.AddDays(1)
            };
        
            context.BlackListedTokens.Add(blacklistedToken);
            await context.SaveChangesAsync();

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during logout: {ex.Message}");
            return false;
        }
    }
    
    public async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username == username);
    }
    
    public async Task<User?> GetUserByUsername(string username)
    {
        return await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == username);
    }

    
    private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using (var hmac = new HMACSHA512())
        {
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }
    
    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using (var hmac = new HMACSHA512(storedSalt))
        {
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(storedHash);
        }
    }
}