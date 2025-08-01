using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.QuizManagement;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class QuizManagementService(AppDbContext context) : IQuizManagementService
{
    public async Task<int> CreateQuizAsync(int userId, QuizCreateDto dto)
    {
        var quiz = new Quiz
        {
            Title = dto.Title,
            Description = dto.Description,
            ThumbnailUrl = string.IsNullOrWhiteSpace(dto.ThumbnailUrl) ? null : dto.ThumbnailUrl,
            CategoryId = dto.CategoryId,
            DifficultyId = dto.DifficultyId,
            IsPublic = dto.IsPublic,
            IsDraft = false,
            RevealAnswers = dto.RevealAnswers,
            ShuffleQuestions = dto.ShuffleQuestions,
            AuthorId = userId,
            Questions = dto.Questions.Select(q => new Question
            {
                Text = q.Text,
                Type = string.IsNullOrEmpty(q.Type) ? "single" : q.Type,
                Answers = q.Options.Select((option, index) => new Answer
                {
                    Text = option,
                    IsCorrect = q.CorrectAnswers.Contains(index)
                }).ToList()
            }).ToList()
        };
        
        context.Quizzes.Add(quiz);
        await context.SaveChangesAsync();

        return quiz.Id;
    }

    public async Task<int?> UpdateQuizAsync(int userId, int quizId, QuizCreateDto dto)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == quizId && q.AuthorId == userId);
        
        if (quiz == null) return null;
        
        quiz.Title = dto.Title;
        quiz.Description = dto.Description;
        quiz.ThumbnailUrl = string.IsNullOrWhiteSpace(dto.ThumbnailUrl) ? null : dto.ThumbnailUrl;
        quiz.CategoryId = dto.CategoryId;
        quiz.DifficultyId = dto.DifficultyId;
        quiz.IsPublic = dto.IsPublic;
        quiz.IsDraft = false;
        quiz.RevealAnswers = dto.RevealAnswers;
        quiz.ShuffleQuestions = dto.ShuffleQuestions;
        
        context.Answers.RemoveRange(quiz.Questions.SelectMany(q => q.Answers));
        context.Questions.RemoveRange(quiz.Questions);
        
        quiz.Questions = dto.Questions.Select(q => new Question
        {
            Text = q.Text,
            Type = string.IsNullOrWhiteSpace(q.Type) ? "single" : q.Type,
            Answers = q.Options.Select((option, index) => new Answer
            {
                Text = option,
                IsCorrect = q.CorrectAnswers.Contains(index)
            }).ToList()
        }).ToList();

        await context.SaveChangesAsync();
        
        return quiz.Id;
    }

    public async Task<bool> DeleteQuizAsync(int userId, int quizId)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == quizId && q.AuthorId == userId);
        
        if (quiz == null) return false;
        
        context.Answers.RemoveRange(quiz.Questions.SelectMany(q => q.Answers));
        context.Questions.RemoveRange(quiz.Questions);
        context.Quizzes.Remove(quiz);

        await context.SaveChangesAsync();
        
        return true;
    }

    public async Task<QuizLoadDto?> GetQuizForEditAsync(int userId, int quizId)
    {
        var quiz = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == quizId && q.AuthorId == userId);
        
        if (quiz == null) return null;

        return new QuizLoadDto
        {
            AuthorId = userId,
            QuizId = quizId,
            Title = quiz.Title,
            Description = quiz.Description,
            ThumbnailUrl = quiz.ThumbnailUrl,
            CategoryId = quiz.CategoryId,
            DifficultyId = quiz.DifficultyId,
            IsPublic = quiz.IsPublic,
            IsDraft = quiz.IsDraft,
            RevealAnswers = quiz.RevealAnswers,
            ShuffleQuestions = quiz.ShuffleQuestions,
            Questions = quiz.Questions.Select(q => new QuestionLoadDto
            {
                Text = q.Text,
                Type = q.Type,
                Options = q.Answers.Select(a => a.Text).ToList(),
                CorrectAnswers = q.Answers
                    .Select((a, index) => new { a.IsCorrect, Index = index })
                    .Where(x => x.IsCorrect)
                    .Select(x => x.Index)
                    .ToList()
            }).ToList()
        };
    }

    public async Task<int> CreateDraftAsync(int userId, QuizDraftDto dto)
    {
        var draft = new Quiz
        {
            Title = dto.Title,
            Description = dto.Description ?? string.Empty,
            ThumbnailUrl = string.IsNullOrWhiteSpace(dto.ThumbnailUrl) ? null : dto.ThumbnailUrl,
            CategoryId = dto.CategoryId ?? null,
            DifficultyId = dto.DifficultyId ?? null,
            IsPublic = dto.IsPublic,
            IsDraft = true,
            RevealAnswers = dto.RevealAnswers,
            ShuffleQuestions = dto.ShuffleQuestions,
            AuthorId = userId,
            Questions = dto.Questions.Select(q => new Question
            {
                Text = q.Text,
                Type = string.IsNullOrWhiteSpace(q.Type) ? "single" : q.Type,
                Answers = q.Options.Select((option, index) => new Answer
                {
                    Text = option,
                    IsCorrect = q.CorrectAnswers.Contains(index)
                }).ToList()
            }).ToList()
        };
        
        context.Quizzes.Add(draft);
        await context.SaveChangesAsync();
        
        return draft.Id;
    }

    public async Task<int?> UpdateDraftAsync(int userId, int draftId, QuizDraftDto dto)
    {
        var draft = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(qn => qn.Answers)
            .FirstOrDefaultAsync(q => q.Id == draftId && q.AuthorId == userId && q.IsDraft);
        
        if (draft == null) return null;
        
        draft.Title = dto.Title;
        draft.Description = dto.Description ?? string.Empty;
        draft.ThumbnailUrl = string.IsNullOrWhiteSpace(dto.ThumbnailUrl) ? null : dto.ThumbnailUrl;
        draft.CategoryId = dto.CategoryId ?? draft.CategoryId;
        draft.DifficultyId = dto.DifficultyId ?? draft.DifficultyId;
        draft.IsPublic = dto.IsPublic;
        draft.RevealAnswers = dto.RevealAnswers;
        draft.ShuffleQuestions = dto.ShuffleQuestions;
        
        context.Answers.RemoveRange(draft.Questions.SelectMany(q => q.Answers));
        context.Questions.RemoveRange(draft.Questions);

        draft.Questions = dto.Questions.Select(q => new Question
        {
            Text = q.Text,
            Type = string.IsNullOrWhiteSpace(q.Type) ? "single" : q.Type,
            Answers = q.Options.Select((option, index) => new Answer
            {
                Text = option,
                IsCorrect = q.CorrectAnswers.Contains(index)
            }).ToList()
        }).ToList();

        await context.SaveChangesAsync();
        
        return draft.Id;
    }

    public async Task<List<UserQuizSummaryDto>> GetMyQuizzesAsync(int userId)
    {
        return await context.Quizzes
            .Where(q => q.AuthorId == userId)
            .Select(q => new UserQuizSummaryDto
            {
                Id = q.Id,
                Title = q.Title,
                Description = q.Description,
                ThumbnailUrl = q.ThumbnailUrl ?? "/thumbnails/default.png",
                IsDraft = q.IsDraft,
                QuestionsCount = q.Questions.Count,
                PlayedBy = q.Plays,
                AverageRating = q.RatingCount > 0 ? q.AverageScore : null
            })
            .ToListAsync();
    }
}
