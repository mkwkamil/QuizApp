namespace LoginComponentBackend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string Role { get; set; } = "User";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? Bio { get; set; }
    public string? Avatar { get; set; }
    public string? PublicName { get; set; }
    
    public List<Quiz> Quizzes { get; set; }
    public List<QuizResult> SolvedQuizzes { get; set; }
    public List<Comment> Comments { get; set; }
    public List<Rating> Ratings { get; set; }
}