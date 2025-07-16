using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Explore;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExploreController(IExploreService exploreService) : ControllerBase
{
    [Authorize]
    [HttpGet("user-summary")]
    public async Task<IActionResult> GetExploreUserSummary()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var summary = await exploreService.GetExploreUserSummaryAsync(userId);
        
        if (summary == null) return NotFound("User not found or summary not available");
        
        return Ok(summary);
    }

    [HttpGet("popular")]
    public async Task<IActionResult> GetPopularQuizzes()
    {
        var quizzes = await exploreService.GetPopularQuizzesAsync();
        return Ok(quizzes);
    }
    
    [HttpGet("page/{pageId:int}")]
    public async Task<IActionResult> GetQuizzesByPage(
        int pageId,
        [FromQuery] string? categories,
        [FromQuery] string? sort,
        [FromQuery] string? difficulties,
        [FromQuery] string? lengths,
        [FromQuery] int? ratings,
        [FromQuery] bool includeAnswered = true
    )
    {
        int? userId = null;
        if (User.Identity?.IsAuthenticated == true)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userIdClaim, out var parsedId))
                userId = parsedId;
        }

        var dto = new QuizFilterRequestDto
        {
            PageId = Math.Max(pageId, 1),
            CategoryIds = categories,
            Sort = sort,
            DifficultyIds = difficulties,
            Lengths = lengths,
            MinRating = ratings,
            IncludeAnswered = includeAnswered,
            UserId = userId
        };

        var result = await exploreService.GetFilteredQuizzesAsync(dto);
        return Ok(result);
    }
}