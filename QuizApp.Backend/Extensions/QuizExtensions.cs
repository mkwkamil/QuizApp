using QuizApp.Backend.DTO;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Extensions;

public static class QuizExtensions
{
    public static QuizResponseDTO ToQuizResponseDto(this Quiz quiz)
    {
        return new QuizResponseDTO
        {
            Id = quiz.Id,
            Title = quiz.Title,
            Description = quiz.Description,
            IsPublic = quiz.IsPublic,
            Author = quiz.Author != null
                ? new AuthorDTO
                {
                    Id = quiz.Author.Id,
                    Username = quiz.Author.Username,
                }
                : null,
            Questions = quiz.Questions?.Select(q => new QuestionResponseDTO
            {
                Id = q.Id,
                Text = q.Text,
                Answers = q.Answers.Select(a => new AnswerResponseDTO
                {
                    Id = a.Id,
                    Text = a.Text,
                    IsCorrect = a.IsCorrect
                }).ToList()
            }).ToList() ?? new List<QuestionResponseDTO>()
        };
    }
}