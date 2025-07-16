using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/quiz/meta")]
public class QuizMetaController(AppDbContext context) : ControllerBase
{
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await context.QuizCategories
            .Select(c => new { c.Id, c.Name })
            .ToListAsync();

        return Ok(categories);
    }
    
    [HttpGet("difficulties")]
    public async Task<IActionResult> GetDifficulties()
    {
        var difficulties = await context.QuizDifficulties
            .Select(c => new { c.Id, c.Name })
            .ToListAsync();

        return Ok(difficulties);
    }
}