namespace QuizApp.Backend.Models;

public class Rating
{
    public int Id { get; set; }
    public int Value { get; set; }
    public int QuizId { get; set; }
    public int UserId { get; set; }
}