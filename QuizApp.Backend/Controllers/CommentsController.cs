using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO;
using QuizApp.Backend.Services;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentsController(CommentsService commentsService) : ControllerBase 
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Content)) 
            return BadRequest("Comment content cannot be empty.");
        
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        var userId = int.Parse(userIdClaim);

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