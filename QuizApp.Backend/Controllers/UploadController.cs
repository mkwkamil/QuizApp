using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Upload;
using QuizApp.Backend.Extensions;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController(IUploadService uploadService) : ControllerBase
{
    [Authorize]
    [HttpPost("avatar")]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadAvatarDto dto)
    {
        var userId = User.GetUserId();
        if (userId == null) return Unauthorized();

        var result = await uploadService.UploadAvatarAsync(userId.Value, dto.AvatarFile);
        return result != null ? Ok(result) : BadRequest("Invalid avatar upload");
    }

    [Authorize]
    [HttpPost("quiz-thumbnail")]
    public async Task<IActionResult> UploadThumbnail([FromForm] UploadThumbnailDto dto)
    {
        var result = await uploadService.UploadThumbnailAsync(dto.ThumbnailFile);
        return result != null ? Ok(result) : BadRequest("Invalid thumbnail upload");
    }
}