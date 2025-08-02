using QuizApp.Backend.DTO.UserFollow;

namespace QuizApp.Backend.Interfaces;

public interface IUserFollowService
{
    Task FollowUserAsync(int userId, int followingId);
    Task UnfollowUserAsync(int userId, int followingId);
    Task<bool> IsFollowingAsync(int userId, int followingId);
    Task<List<UserFollowDto>> GetFollowersAsync(int userId);
    Task<List<UserFollowDto>> GetFollowingAsync(int userId);
}