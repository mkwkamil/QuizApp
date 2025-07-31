using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.QuizSolve;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class QuizSolveService(AppDbContext context, ICommentsService commentsService) : IQuizSolveService
{
    public async Task<QuizOverviewDto?> GetQuizOverviewAsync(int quizId)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Author)
            .Include(q => q.Category)
            .Include(q => q.Difficulty)
            .Include(q => q.Questions)
            .Where(q => q.Id == quizId && q.IsPublic && !q.IsDraft)
            .FirstOrDefaultAsync();

        if (quiz == null) return null;

        var comments = await commentsService.GetCommentsForQuizAsync(quizId, 3);

        return new QuizOverviewDto
        {
            Id = quiz.Id,
            Title = quiz.Title,
            Description = quiz.Description,
            ThumbnailUrl = quiz.ThumbnailUrl ?? "/thumbnails/default.png",
            Category = quiz.Category?.Name ?? "General",
            Difficulty = quiz.Difficulty?.Name ?? "Unknown",
            QuestionCount = quiz.Questions.Count,
            Plays = quiz.Plays,
            AverageScore = quiz.AverageScore,
            Author = new AuthorDto
            {
                Id = quiz.Author.Id,
                Name = quiz.Author.PublicName ?? quiz.Author.Username,
                AvatarUrl = quiz.Author.Avatar ?? "default-avatar.png",
                JoinedAt = quiz.Author.CreatedAt
            },
            Comments = comments
        };
    }

    public async Task<QuizSolveDto?> GetQuizForSolvingAsync(int quizId)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == quizId && q.IsPublic && !q.IsDraft);

        if (quiz == null) return null;

        return new QuizSolveDto
        {
            Id = quiz.Id,
            Title = quiz.Title,
            Description = quiz.Description,
            ThumbnailUrl = quiz.ThumbnailUrl ?? "/thumbnails/default.png",
            Questions = quiz.Questions.Select(q => new QuestionDto
            {
                Id = q.Id,
                Text = q.Text,
                Type = q.Type,
                Answers = q.Answers.Select(a => new AnswerDto
                {
                    Id = a.Id,
                    Text = a.Text,
                }).ToList()
            }).ToList()
        };
    }

    public async Task<QuizSubmissionResultDto?> SubmitQuizResultAsync(int userId, QuizSubmissionDto submission)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == submission.QuizId && q.IsPublic && !q.IsDraft);
        
        if (quiz == null) return null;
        
        int correctAnswers = 0;

        foreach (var submitted in submission.Answers)
        {
            var question = quiz.Questions.FirstOrDefault(q => q.Id == submitted.QuestionId);
            if (question == null) continue;

            var correctIds = question.Answers.Where(a => a.IsCorrect).Select(a => a.Id).ToHashSet();
            var selectedIds = submitted.SelectedAnswerIds.ToHashSet();
            
            if (correctIds.SetEquals(selectedIds)) correctAnswers++;
        }

        var result = new QuizResult
        {
            QuizId = quiz.Id,
            UserId = userId,
            TotalQuestions = quiz.Questions.Count,
            CorrectAnswers = correctAnswers,
            TimeTaken = submission.TimeTaken,
            SolvedAt = DateTime.UtcNow
        };

        context.QuizResults.Add(result);

        quiz.Plays++;
        await context.SaveChangesAsync();

        return new QuizSubmissionResultDto
        {
            CorrectAnswers = correctAnswers,
            TotalQuestions = quiz.Questions.Count,
            TimeTaken = submission.TimeTaken,
        };
    }
}