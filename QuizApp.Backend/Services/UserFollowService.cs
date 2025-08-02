using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Data;
using QuizApp.Backend.DTO.UserFollow;
using QuizApp.Backend.Interfaces;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Services;

public class UserFollowService(AppDbContext context) : IUserFollowService
{
    public async Task FollowUserAsync(int userId, int followingId)
    {
        if (userId == followingId)
            throw new ArgumentException("You cannot follow yourself.");
        
        var alreadyFollowing = await context.UserFollows
            .AnyAsync(f => f.FollowerId == userId && f.FollowingId == followingId);

        if (alreadyFollowing) return;
        
        var followerExists = await context.Users.AnyAsync(u => u.Id == userId);
        var followingExists = await context.Users.AnyAsync(u => u.Id == followingId);
        if (!followerExists || !followingExists)
            throw new InvalidOperationException("User does not exist.");
        
        context.UserFollows.Add(new UserFollow
        {
            FollowerId = userId,
            FollowingId = followingId
        });

        await context.SaveChangesAsync();
    }

    public async Task UnfollowUserAsync(int userId, int followingId)
    {
        var follow = await context.UserFollows
            .FirstOrDefaultAsync(f => f.FollowerId == userId && f.FollowingId == followingId);

        if (follow != null)
        {
            context.UserFollows.Remove(follow);
            await context.SaveChangesAsync();
        }    
    }

    public async Task<bool> IsFollowingAsync(int userId, int followingId)
    {
        return await context.UserFollows
            .AnyAsync(f => f.FollowerId == userId && f.FollowingId == followingId);
    }
    
    public async Task<List<UserFollowDto>> GetFollowersAsync(int userId)
    {
        return await context.UserFollows
            .Where(f => f.FollowingId == userId)
            .Select(f => new UserFollowDto
            {
                UserId = f.FollowerId,
                Username = f.Follower.Username,
                PublicName = f.Follower.PublicName,
                AvatarUrl = f.Follower.Avatar
            })
            .ToListAsync();
    }

    public async Task<List<UserFollowDto>> GetFollowingAsync(int userId)
    {
        return await context.UserFollows
            .Where(f => f.FollowerId == userId)
            .Select(f => new UserFollowDto
            {
                UserId = f.FollowingId,
                Username = f.Following.Username,
                PublicName = f.Following.PublicName,
                AvatarUrl = f.Following.Avatar
            })
            .ToListAsync();
    }
}