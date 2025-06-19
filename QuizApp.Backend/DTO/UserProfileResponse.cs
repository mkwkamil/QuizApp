namespace QuizApp.Backend.DTO;

public class UserProfileResponse
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public DateTime CreatedAt { get; set; }

    public string Bio { get; set; }
    public string Avatar { get; set; }
    public string PublicName { get; set; }

    public int QuizzesCreated { get; set; }
    public int QuizzesSolved { get; set; }
    public string Accuracy { get; set; }
}