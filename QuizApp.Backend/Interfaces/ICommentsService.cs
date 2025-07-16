using QuizApp.Backend.DTO.Comments;

namespace QuizApp.Backend.Interfaces;

public interface ICommentsService
{
    Task<List<CommentDto>> GetCommentsForQuizAsync(int quizId, int? limit = null);
    Task<CommentDto> AddCommentAsync(int userId, CreateCommentDto dto);
}