namespace QuizApp.Backend.Models;

public class QuizCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
}