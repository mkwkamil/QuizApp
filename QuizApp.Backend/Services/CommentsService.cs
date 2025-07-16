using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.Comments;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class CommentsService(AppDbContext context) : ICommentsService
{
    public async Task<List<CommentDto>> GetCommentsForQuizAsync(int quizId, int? limit = null)
    {
        var query = context.Comments
            .Where(c => c.QuizId == quizId)
            .Include(c => c.Author)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CommentDto
            {
                Id = c.Id,
                AuthorName = c.Author.PublicName ?? c.Author.Username,
                Content = c.Content,
                CreatedAt = c.CreatedAt
            });

        if (limit.HasValue)
        {
            query = query.Take(limit.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<CommentDto> AddCommentAsync(int userId, CreateCommentDto dto)
    {
        var comment = new Comment
        {
            QuizId = dto.QuizId,
            AuthorId = userId,
            Content = dto.Content,
            CreatedAt = DateTime.UtcNow
        };

        context.Comments.Add(comment);
        await context.SaveChangesAsync();

        var user = await context.Users.FindAsync(userId);
        
        return new CommentDto
        {
            Id = comment.Id,
            AuthorName = user?.PublicName ?? user?.Username ?? "Unknown",
            Content = comment.Content,
            CreatedAt = comment.CreatedAt
        };
    }
}