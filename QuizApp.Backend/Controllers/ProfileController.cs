using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Profile;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController(IProfileService profileService) : ControllerBase
{
    [Authorize]
    [HttpGet("explore-summary")]
    public async Task<IActionResult> GetExploreUserSummary()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var summary = await profileService.GetExploreUserSummaryAsync(userId);
        
        if (summary == null) return NotFound("User not found or summary not available");
        
        return Ok(summary);
    }
    
    [Authorize]
    [HttpPut]
    public async Task<IActionResult> UpdateProfileData([FromBody] ProfileUpdateDto request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var result = await profileService.UpdatePublicDataAsync(userId, request);
        
        if (result == null) return BadRequest("Failed to update profile data");

        return Ok(result);
    }

    [Authorize]
    [HttpPost("avatar")]
    public async Task<IActionResult> UpdateAvatar([FromForm] UploadAvatarDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var result = await profileService.UpdateAvatarAsync(userId, dto.AvatarFile);
        
        if (result == null) return BadRequest("Failed to update avatar");

        return Ok(result);
    }
}