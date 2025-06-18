using LoginComponentBackend.Data;
using LoginComponentBackend.DTO;
using LoginComponentBackend.Extensions;
using LoginComponentBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoginComponentBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<QuizController> _logger;
    
    public QuizController(AppDbContext context, ILogger<QuizController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("public")]
    public async Task<IActionResult> GetPublicQuizzes()
    {
        var quizzes = await _context.Quizzes
            .Where(q => q.IsPublic)
            .Select(q => new
            {
                q.Id,
                q.Title,
                q.Description,
            })
            .ToListAsync();

        return Ok(quizzes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuizById(int id)
    {
        var quiz = await _context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .Include(q => q.Author)
            .FirstOrDefaultAsync(q => q.Id == id);

        if (quiz == null)
        {
            return NotFound();
        }

        return Ok(quiz.ToQuizResponseDto());
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateQuiz([FromBody] CreateQuizRequest request)
    {
        var username = User.Identity?.Name;
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
        {
            return Unauthorized();
        }

        var quiz = new Quiz
        {
            Title = request.Title,
            Description = request.Description,
            IsPublic = request.IsPublic,
            AuthorId = user.Id,
            Questions = request.Questions.Select(q => new Question
            {
                Text = q.Text,
                Answers = q.Answers.Select(a => new Answer
                {
                    Text = a.Text,
                    IsCorrect = a.IsCorrect
                }).ToList()
            }).ToList()
        };

        _context.Quizzes.Add(quiz);
        await _context.SaveChangesAsync();

        var createdQuiz = await _context.Quizzes
            .Include(q => q.Author)
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync();

        return CreatedAtAction(nameof(GetQuizById), new { id = quiz.Id }, createdQuiz.ToQuizResponseDto());
    }
}