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
    [HttpGet("{id}/overview")]
    public async Task<IActionResult> GetQuizOverview(int id)
    {
        var overview = await quizSolveService.GetQuizOverviewAsync(id);
        
        return overview is not null ? Ok(overview) : NotFound();
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