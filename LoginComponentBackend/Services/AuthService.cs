using System.Security.Cryptography;
using System.Text;
using LoginComponentBackend.Data;
using Microsoft.EntityFrameworkCore;
using LoginComponentBackend.Models;

namespace LoginComponentBackend.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    
    public AuthService(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<bool> Register(User user, string password)
    {
        CreatePasswordHash(password, out byte[] hash, out byte[] salt);
        user.PasswordHash = hash;
        user.PasswordSalt = salt;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }
    
    public async Task<string> Login(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
        if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

        return "OK";
    }
    
    public async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(x => x.Username == username);
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