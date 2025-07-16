namespace QuizApp.Backend.Models;

public class QuizDifficulty
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
}