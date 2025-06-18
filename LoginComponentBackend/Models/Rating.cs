namespace LoginComponentBackend.Models;

public class Rating
{
    public int Id { get; set; }
    public int Value { get; set; }
    
    public int AuthorId { get; set; }
    public User Author { get; set; }
    
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
}