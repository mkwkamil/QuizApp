using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly AppDbContext _context;
    
    public UserController(ILogger<UserController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [Authorize]
    [HttpGet("data")]
    [Produces("application/json")]
    public async Task<ActionResult<UserDataDto>> GetCurrentUser()
    {
        var username = User.Identity?.Name;

        if (string.IsNullOrEmpty(username))
            return Unauthorized("Invalid or missing token");

        var user = await _context.Users
            .Include(u => u.Quizzes)
            .Include(u => u.SolvedQuizzes)
            .ThenInclude(sq => sq.Quiz)
            .Include(u => u.Followers)
            .Include(u => u.Following)
            .FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            _logger.LogWarning("User not found: {Username}", username);
            return NotFound("User not found");
        }

        int totalScore = user.SolvedQuizzes.Sum(q => q.Score);
        int totalQuestions = user.SolvedQuizzes.Sum(q => q.TotalQuestions);

        var favoriteCategory = user.SolvedQuizzes
            .Where(sq => sq.Quiz.CategoryId != null)
            .GroupBy(sq => sq.Quiz.CategoryId)
            .OrderByDescending(g => g.Count())
            .Select(g => g.First().Quiz.Category!.Name)
            .FirstOrDefault() ?? "Technology";

        var response = new UserDataDto
        {
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            CreatedAt = user.CreatedAt,
            Bio = user.Bio ?? "I create and solve challenging quizzes daily!",
            Avatar = user.Avatar,
            PublicName = user.PublicName ?? user.Username,
            QuizzesCreated = user.Quizzes.Count,
            QuizzesSolved = user.SolvedQuizzes.Count,
            Accuracy = totalQuestions > 0 ? $"{Math.Round((double)totalScore / totalQuestions * 100)}%" : "0%",
            Followers = user.Followers.Count,
            Following = user.Following.Count,
            FavoriteCategory = favoriteCategory,
            UserRank = user.UserRank ?? "Beginner"
        };

        return Ok(response);
    }

    [Authorize]
    [HttpPost("avatar")]
    public async Task<IActionResult> UpdateAvatar(IFormFile file)
    {
        var username = User.Identity?.Name;
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        
        if (user == null || file.Length == 0)
        {
            _logger.LogWarning("User not found or invalid file: {Username}", username);
            return BadRequest("Invalid user or file");
        }
        
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine("wwwroot/avatars", fileName);
        
        Directory.CreateDirectory("wwwroot/avatars");
        
        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        
        user.Avatar = $"/avatars/{fileName}";
        await _context.SaveChangesAsync();
        
        return Ok(new {avatarUrl = user.Avatar});
    }
    
    [Authorize]
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var username = User.Identity?.Name;

        if (string.IsNullOrEmpty(username))
        {
            return Unauthorized("Invalid or missing token");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
        {
            _logger.LogWarning("User not found for profile update: {Username}", username);
            return NotFound("User not found");
        }

        user.PublicName = request.PublicName;
        user.Bio = request.Bio;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Profile updated successfully",
            publicName = user.PublicName,
            bio = user.Bio
        });
    }
}