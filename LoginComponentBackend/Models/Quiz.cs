namespace LoginComponentBackend.Models;

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    
    public int AuthorId { get; set; }
    public User Author { get; set; }
    
    public List<Question> Questions { get; set; }
    public List<Comment> Comments { get; set; }
    public List<Rating> Ratings { get; set; }
    
    public List<QuizResult> Results { get; set; }
}