namespace QuizApp.Backend.DTO.Comments;

public class CommentDto
{
    public int Id { get; set; }
    public string AuthorName { get; set; } = default!;
    public string Content { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
}