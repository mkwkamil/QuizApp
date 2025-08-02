using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.UserFollow;
using QuizApp.Backend.Extensions;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/user-follow")]
public class UserFollowController(IUserFollowService followService) : ControllerBase
{
    [HttpPost("follow")]
    [Authorize]
    public async Task<IActionResult> FollowUser([FromBody] FollowRequestDto request)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();

        await followService.FollowUserAsync(userId.Value, request.FollowingId);
        return Ok();
    }

    [HttpPost("unfollow")]
    [Authorize]
    public async Task<IActionResult> UnfollowUser([FromBody] FollowRequestDto request)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();

        await followService.UnfollowUserAsync(userId.Value, request.FollowingId);
        return Ok();
    }
    
    [HttpPost("remove-follower")]
    [Authorize]
    public async Task<IActionResult> RemoveFollower([FromBody] RemoveFollowerDto request)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId == null) return Unauthorized();

        await followService.UnfollowUserAsync(request.FollowerId, currentUserId.Value);
        return Ok();
    }

    [HttpGet("is-following/{userId}")]
    [Authorize]
    public async Task<IActionResult> IsFollowing(int userId)
    {
        var followerId = User.GetUserId();
        if (followerId == null) return Unauthorized();

        var isFollowing = await followService.IsFollowingAsync(followerId.Value, userId);
        return Ok(isFollowing);
    }
    
    [HttpGet("{userId}/followers")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFollowers(int userId)
    {
        var followers = await followService.GetFollowersAsync(userId);
        return Ok(followers);
    }

    [HttpGet("{userId}/following")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFollowing(int userId)
    {
        var following = await followService.GetFollowingAsync(userId);
        return Ok(following);
    }
}