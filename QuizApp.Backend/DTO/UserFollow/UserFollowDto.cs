namespace QuizApp.Backend.DTO.UserFollow;

public class UserFollowDto
{
    public int UserId { get; set; }
    public string Username { get; set; } = default!;
    public string? PublicName { get; set; }
    public string? AvatarUrl { get; set; }
}