using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Ratings;
using QuizApp.Backend.Extensions;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RatingsController(IRatingService ratingService) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> RateQuiz([FromBody] RatingRequestDto request)
    {
        if (request.Value is < 1 or > 5)
            return BadRequest("Rating value must be between 1 and 5.");

        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();

        await ratingService.RateQuizAsync(userId.Value, request);
        
        return Ok();
    }
    
    [HttpGet("{quizId}/summary")]
    [AllowAnonymous]
    public async Task<IActionResult> GetRatingSummary(int quizId)
    {
        var summary = await ratingService.GetRatingSummaryAsync(quizId);
        return Ok(summary);
    }
}