namespace QuizApp.Backend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = default!;
    public string Email { get; set; } = default!;
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string Role { get; set; } = "User";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? Bio { get; set; }
    public string? Avatar { get; set; }
    public string? PublicName { get; set; }
    public string? UserRank { get; set; }

    public List<Quiz> Quizzes { get; set; } = new();
    public List<QuizResult> SolvedQuizzes { get; set; } = new();
    public List<Comment> Comments { get; set; } = new();
    public List<Rating> Ratings { get; set; } = new();

    public List<UserFollow> Followers { get; set; } = new();
    public List<UserFollow> Following { get; set; } = new();
}