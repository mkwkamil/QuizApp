namespace QuizApp.Backend.Models;

public class UserFollow
{
    public int FollowerId { get; set; }
    public User Follower { get; set; }

    public int FollowingId { get; set; }
    public User Following { get; set; }
}