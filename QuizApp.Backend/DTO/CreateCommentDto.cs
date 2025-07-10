namespace QuizApp.Backend.DTO;

public class CreateCommentDto
{
    public int QuizId { get; set; }
    public string Content { get; set; } = string.Empty;
}