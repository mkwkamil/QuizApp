using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Explore;
using QuizApp.Backend.Extensions;
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
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var summary = await exploreService.GetExploreUserSummaryAsync(userId.Value);
        
        return summary is not null ? Ok(summary) : NotFound("User summary not found");
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
        int? userId = User.GetUserId();
        
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