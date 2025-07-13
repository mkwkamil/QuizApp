using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO;
using QuizApp.Backend.Models;
using QuizApp.Backend.Services;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController(AppDbContext context, QuizService quizService) : ControllerBase
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
            CategoryId = dto.CategoryId,
            DifficultyId = dto.DifficultyId,
            IsPublic = dto.IsPublic,
            IsDraft = dto.IsDraft,
            RevealAnswers = dto.RevealAnswers,
            ShuffleQuestions = dto.ShuffleQuestions,
            AuthorId = authorId,
            Questions = dto.Questions.Select(q => new Question
            {
                Text = q.Text,
                Type = string.IsNullOrEmpty(q.Type) ? "single" : q.Type,
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
        quiz.CategoryId = dto.CategoryId;
        quiz.DifficultyId = dto.DifficultyId;
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

    [Authorize]
    [HttpPost("draft")]
    public async Task<IActionResult> CreateDraft([FromBody] QuizDraftDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var draft = new Quiz
        {
            Title = dto.Title,
            Description = dto.Description,
            ThumbnailUrl = dto.ThumbnailUrl,
            CategoryId = dto.CategoryId,
            DifficultyId = dto.DifficultyId,
            IsPublic = dto.IsPublic,
            IsDraft = true,
            RevealAnswers = dto.RevealAnswers,
            ShuffleQuestions = dto.ShuffleQuestions,
            AuthorId = userId,
            Questions = dto.Questions?.Select(q => new Question
            {
                Text = q.Text,
                Type = string.IsNullOrEmpty(q.Type) ? "single" : q.Type,
                Answers = q.Options?.Select((opt, index) => new Answer
                {
                    Text = opt,
                    IsCorrect = q.CorrectAnswers?.Contains(index) ?? false
                }).ToList() ?? new List<Answer>()
            }).ToList() ?? new List<Question>()
        };

        context.Quizzes.Add(draft);
        await context.SaveChangesAsync();

        return Ok(new { draftId = draft.Id });
    }

    [Authorize]
    [HttpPut("draft/{id}")]
    public async Task<IActionResult> UpdateDraft(int id, [FromBody] QuizDraftDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var draft = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId && q.IsDraft);

        if (draft == null)
            return NotFound();

        draft.Title = dto.Title;
        draft.Description = dto.Description;
        draft.ThumbnailUrl = dto.ThumbnailUrl;
        draft.CategoryId = dto.CategoryId;
        draft.DifficultyId = dto.DifficultyId;
        draft.IsPublic = dto.IsPublic;
        draft.IsDraft = true;
        draft.RevealAnswers = dto.RevealAnswers;
        draft.ShuffleQuestions = dto.ShuffleQuestions;

        context.Answers.RemoveRange(draft.Questions.SelectMany(q => q.Answers));
        context.Questions.RemoveRange(draft.Questions);

        draft.Questions = dto.Questions?.Select(q => new Question
        {
            Text = q.Text,
            Type = string.IsNullOrEmpty(q.Type) ? "single" : q.Type,
            Answers = q.Options?.Select((opt, index) => new Answer
            {
                Text = opt,
                IsCorrect = q.CorrectAnswers?.Contains(index) ?? false
            }).ToList() ?? new List<Answer>()
        }).ToList() ?? new List<Question>();

        await context.SaveChangesAsync();

        return Ok(new { draftId = draft.Id });
    }

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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuiz(int id)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == id && q.IsPublic && !q.IsDraft);

        if (quiz == null)
            return NotFound();

        return Ok(new
        {
            quiz.Id,
            quiz.Title,
            quiz.Description,
            quiz.ThumbnailUrl,
            quiz.CategoryId,
            quiz.DifficultyId,
            quiz.IsPublic,
            quiz.IsDraft,
            quiz.AuthorId,
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

    [HttpGet("{id}/summary")]
    public async Task<IActionResult> GetQuizSummary(int id)
    {
        var summary = await quizService.GetQuizSummaryAsync(id);
        
        if (summary == null)
            return NotFound(new { message = "Quiz not found or unavailable." });

        return Ok(summary);
    }

    [HttpGet("{id}/play")]
    public async Task<ActionResult<QuizSolveDto>> GetQuizForPlay(int id)
    {
        var quiz = await quizService.GetQuizForSolvingAsync(id);
        
        if (quiz == null) return NotFound( new { message = "Quiz not found or unavailable." });

        return Ok(quiz);
    }

    [Authorize]
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitQuiz([FromBody] QuizSubmissionDto submission)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        
        var result = await quizService.SubmitQuizResultAsync(userId, submission);
        
        if (result == null)
            return NotFound(new { message = "Quiz not found or unavailable." });

        return Ok(result);
    }
}