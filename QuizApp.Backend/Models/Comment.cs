namespace QuizApp.Backend.Models;

public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public int AuthorId { get; set; }
    public User Author { get; set; }
    
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
}