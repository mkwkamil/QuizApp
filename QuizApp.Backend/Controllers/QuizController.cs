using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                Type = q.Type,
                Answers = q.Options.Select((opt, index) => new Answer
                {
                    Text = opt,
                    IsCorrect = q.CorrectAnswers.Contains(index)
                }).ToList()
            }).ToList()
        };

        
        Console.WriteLine($"UpdateQuiz calle");
        
        context.Quizzes.Add(quiz);
        await context.SaveChangesAsync();

        return Ok(new { quizId = quiz.Id });
    }
    
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetQuiz(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);

        if (quiz == null)
            return NotFound();

        return Ok(new
        {
            quiz.Id,
            quiz.Title,
            quiz.Description,
            quiz.ThumbnailUrl,
            quiz.Category,
            quiz.Difficulty,
            quiz.IsPublic,
            quiz.IsDraft,
            quiz.RevealAnswers,
            quiz.ShuffleQuestions,
            Questions = quiz.Questions.Select(qn => new
            {
                qn.Id,
                qn.Text,
                qn.Type,
                Options = qn.Answers.Select(a => a.Text).ToList(),
                CorrectAnswers = qn.Answers
                    .Select((a, i) => new { a.IsCorrect, Index = i })
                    .Where(x => x.IsCorrect)
                    .Select(x => x.Index)
                    .ToList()
            }).ToList()
        });
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateQuiz(int id, [FromBody] QuizCreateDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);

        if (quiz == null)
            return NotFound();

        quiz.Title = dto.Title;
        quiz.Description = dto.Description;
        quiz.ThumbnailUrl = dto.ThumbnailUrl;
        quiz.Category = dto.Category;
        quiz.Difficulty = dto.Difficulty;
        quiz.IsPublic = dto.IsPublic;
        quiz.IsDraft = dto.IsDraft;
        quiz.RevealAnswers = dto.RevealAnswers;
        quiz.ShuffleQuestions = dto.ShuffleQuestions;

        context.Answers.RemoveRange(quiz.Questions.SelectMany(q => q.Answers));
        context.Questions.RemoveRange(quiz.Questions);

        quiz.Questions = dto.Questions.Select(q => new Question
        {
            Text = q.Text,
            Type = q.Type,
            Answers = q.Options.Select((opt, index) => new Answer
            {
                Text = opt,
                IsCorrect = q.CorrectAnswers.Contains(index)
            }).ToList()
        }).ToList();
        
        Console.WriteLine($"UpdateQuiz called with id={id}, userId={userId}");

        await context.SaveChangesAsync();

        return Ok(new { quizId = quiz.Id });
    }
    
    [HttpGet("mine")]
    [Authorize]
    public async Task<IActionResult> GetMyQuizzes()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var quizzes = await context.Quizzes
            .Where(q => q.AuthorId == userId)
            .Select(q => new
            {
                q.Id,
                q.Title,
                q.IsDraft,
                QuestionsCount = q.Questions.Count,
                Plays = q.Results.Count,
                AverageRating = q.Ratings.Any() ? q.Ratings.Average(r => r.Value) : 5.0
            })
            .ToListAsync();

        return Ok(quizzes);
    }
    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteQuiz(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);

        if (quiz == null)
            return NotFound();

        context.Answers.RemoveRange(quiz.Questions.SelectMany(q => q.Answers));
        context.Questions.RemoveRange(quiz.Questions);

        context.Quizzes.Remove(quiz);

        await context.SaveChangesAsync();

        return NoContent();
    }
}