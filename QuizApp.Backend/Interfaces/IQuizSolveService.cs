using QuizApp.Backend.DTO.QuizSolve;

namespace QuizApp.Backend.Interfaces;

public interface IQuizSolveService
{
    Task<QuizOverviewDto?> GetQuizOverviewAsync(int quizId);
    Task<QuizSolveDto?> GetQuizForSolvingAsync(int quizId);
    Task<QuizSubmissionResultDto?> SubmitQuizResultAsync(int userId, QuizSubmissionDto submission);
}