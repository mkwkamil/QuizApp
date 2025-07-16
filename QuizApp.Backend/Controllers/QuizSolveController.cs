using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.QuizSolve;
using QuizApp.Backend.Extensions;
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
        
        return summary is not null ? Ok(summary) : NotFound();
    }
    
    [HttpGet("{id}/solve")]
    public async Task<ActionResult<QuizSolveDto>> GetQuizForPlay(int id)
    {
        var quiz = await quizSolveService.GetQuizForSolvingAsync(id);

        return quiz is not null ? Ok(quiz) : NotFound();
    }

    [Authorize]
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitQuiz([FromBody] QuizSubmissionDto submission)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();

        var result = await quizSolveService.SubmitQuizResultAsync(userId.Value, submission);

        return result is not null ? Ok(result) : NotFound();
    }
}