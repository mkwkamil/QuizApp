using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentsController(ICommentsService commentsService) : ControllerBase 
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Content)) 
            return BadRequest("Comment content cannot be empty.");
        
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        try
        {
            var created = await commentsService.AddCommentAsync(userId, dto);
            return StatusCode(201, created);
        }
        catch (Exception ex)
        {
            Console.WriteLine("❌ Error adding comment: " + ex.Message);
            return StatusCode(500, "An unexpected error occurred.");
        }
    }
}