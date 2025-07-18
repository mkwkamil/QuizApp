using QuizApp.Backend.DTO.QuizManagement;

namespace QuizApp.Backend.Interfaces;

public interface IQuizManagementService
{
    Task<int> CreateQuizAsync(int userId, QuizLoadDto dto);
    Task<int?> UpdateQuizAsync(int userId, int quizId, QuizLoadDto dto);
    Task<bool> DeleteQuizAsync(int userId, int quizId);
    Task<QuizLoadDto?> GetQuizForEditAsync(int userId, int quizId);
    
    Task<int> CreateDraftAsync(int userId, QuizDraftDto dto);
    Task<int?> UpdateDraftAsync(int userId, int draftId, QuizDraftDto dto);
    
    Task<List<UserQuizSummaryDto>> GetMyQuizzesAsync(int userId);
}