using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController(AppDbContext context) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateQuiz([FromBody] QuizCreateDto dto)
    {
        var authorId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var quiz = new Quiz
        {
            Title = dto.Title,
            Description = dto.Description,
            ThumbnailUrl = dto.ThumbnailUrl,
            Category = dto.Category,
            Difficulty = dto.Difficulty,
            IsPublic = dto.IsPublic,
            IsDraft = dto.IsDraft,
            RevealAnswers = dto.RevealAnswers,
            ShuffleQuestions = dto.ShuffleQuestions,
            AuthorId = authorId,
            Questions = dto.Questions.Select(q => new Question
            {
                Text = q.Text,
                Answers = q.Options.Select((opt, index) => new Answer
                {
                    Text = opt,
                    IsCorrect = q.CorrectAnswers.Contains(index)
                }).ToList()
            }).ToList()
        };

        context.Quizzes.Add(quiz);
        await context.SaveChangesAsync();

        return Ok(new { quizId = quiz.Id });
    }
}