namespace QuizApp.Backend.Models;

public class Question
{
    public int Id { get; set; }
    public string? Text { get; set; }
    public string? Type { get; set; }
    
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
    
    public List<Answer> Answers { get; set; }
}