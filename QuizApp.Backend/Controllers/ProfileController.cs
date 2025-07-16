using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Profile;
using QuizApp.Backend.Extensions;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController(IProfileService profileService) : ControllerBase
{
    [Authorize]
    [HttpPut]
    public async Task<IActionResult> UpdateProfileData([FromBody] ProfileUpdateDto request)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var result = await profileService.UpdatePublicDataAsync(userId.Value, request);
        
        return result is not null ? Ok(result) : BadRequest("Failed to update profile data");
    }

    [Authorize]
    [HttpPost("avatar")]
    public async Task<IActionResult> UpdateAvatar([FromForm] UploadAvatarDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var result = await profileService.UpdateAvatarAsync(userId.Value, dto.AvatarFile);
        
        return result is not null ? Ok(result) : BadRequest("Failed to update avatar");
    }

    [Authorize]
    [HttpGet("summary")]
    public async Task<IActionResult> GetProfileSummary()
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();
        
        var summary = await profileService.GetProfileSummaryAsync(userId.Value);
        
        return summary is not null ? Ok(summary) : NotFound("Profile summary not found");
    }
}