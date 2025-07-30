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
        
        return Created(string.Empty, new { quizId });
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateQuiz(int id, [FromBody] QuizCreateDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var result = await quizManagementService.UpdateQuizAsync(userId.Value, id, dto);

        return result is not null ? Ok(new { quizId = result }) : NotFound();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteQuiz(int id)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var success = await quizManagementService.DeleteQuizAsync(userId.Value, id);

        return success ? NoContent() : NotFound();
    }
    
    [HttpGet("{quizId:int}")]
    public async Task<IActionResult> GetQuizForEdit(int quizId)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var quiz = await quizManagementService.GetQuizForEditAsync(userId.Value, quizId);
        
        return quiz is not null ? Ok(quiz) : NotFound();
    }
    
    [HttpPost("draft")]
    public async Task<IActionResult> CreateDraft([FromBody] QuizDraftDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var draftId = await quizManagementService.CreateDraftAsync(userId.Value, dto);
        
        return Created(string.Empty, new { draftId });

    }
    
    [HttpPut("draft/{draftId:int}")]
    public async Task<IActionResult> UpdateDraft(int draftId, [FromBody] QuizDraftDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var result = await quizManagementService.UpdateDraftAsync(userId.Value, draftId, dto);
        
        return result is not null ? Ok(new { draftId = result }) : NotFound();
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