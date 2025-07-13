namespace QuizApp.Backend.Models;

public class QuizResult
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public int UserId { get; set; }
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
    public int TimeTaken { get; set; }
    public DateTime SolvedAt { get; set; } = DateTime.UtcNow;

    public Quiz Quiz { get; set; }
    public User User { get; set; }
}