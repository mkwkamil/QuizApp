using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.QuizSolve;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/quiz")]
public class QuizSolveController(IQuizSolveService quizSolveService) : ControllerBase
{
    [HttpGet("{id}/summary")]
    public async Task<IActionResult> GetQuizSummary(int id)
    {
        var summary = await quizSolveService.GetQuizSummaryAsync(id);
        
        if (summary == null) return NotFound(new { message = "Quiz not found or unavailable." });

        return Ok(summary);
    }
    
    [HttpGet("{id}/solve")]
    public async Task<ActionResult<QuizSolveDto>> GetQuizForPlay(int id)
    {
        var quiz = await quizSolveService.GetQuizForSolvingAsync(id);

        if (quiz == null)
            return NotFound(new { message = "Quiz not found or unavailable." });

        return Ok(quiz);
    }

    [Authorize]
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitQuiz([FromBody] QuizSubmissionDto submission)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var result = await quizSolveService.SubmitQuizResultAsync(userId, submission);

        if (result == null)
            return NotFound(new { message = "Quiz not found or unavailable." });

        return Ok(result);
    }
}