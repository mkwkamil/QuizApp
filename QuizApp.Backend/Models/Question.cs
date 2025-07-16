namespace QuizApp.Backend.Models;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Type { get; set; } = "single";
    
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; } = default!;

    public List<Answer> Answers { get; set; } = new();
}