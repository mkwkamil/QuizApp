using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Comments;
using QuizApp.Backend.Extensions;
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

        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var created = await commentsService.AddCommentAsync(userId.Value, dto);

        return Created(string.Empty, created);
    }
}