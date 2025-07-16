using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.QuizManagement;
using QuizApp.Backend.Extensions;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Authorize]
[Route("api/quiz-management")]
public class QuizManagementController(IQuizManagementService quizManagementService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateQuiz([FromBody] QuizCreateDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var quizId = await quizManagementService.CreateQuizAsync(userId.Value, dto);
        
        return Ok(new { quizId });
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateQuiz(int id, [FromBody] QuizCreateDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var result = await quizManagementService.UpdateQuizAsync(userId.Value, id, dto);

        return result is null ? NotFound() : Ok(new { quizId = result });
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteQuiz(int id)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var success = await quizManagementService.DeleteQuizAsync(userId.Value, id);

        return success ? NoContent() : NotFound();
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetQuizForEdit(int id)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var quiz = await quizManagementService.GetQuizForEditAsync(id, userId.Value);
        
        return quiz is null ? NotFound() : Ok(quiz);
    }
    
    [HttpPost("draft")]
    public async Task<IActionResult> CreateDraft([FromBody] QuizDraftDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var draftId = await quizManagementService.CreateDraftAsync(userId.Value, dto);
        
        return Ok(new { draftId });
    }
    
    [HttpPut("draft/{id:int}")]
    public async Task<IActionResult> UpdateDraft(int id, [FromBody] QuizDraftDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var result = await quizManagementService.UpdateDraftAsync(userId.Value, id, dto);
        
        return result is null ? NotFound() : Ok(new { draftId = result });
    }
    
    [HttpGet("my-quizzes")]
    public async Task<IActionResult> GetMyQuizzes()
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var quizzes = await quizManagementService.GetMyQuizzesAsync(userId.Value);
        
        return Ok(quizzes);
    }
}