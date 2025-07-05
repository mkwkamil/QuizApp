namespace QuizApp.Backend.Models;

public class QuizCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
}