using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Backend.DTO.Auth;
using QuizApp.Backend.Interfaces;

namespace QuizApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
    {
        var result = await authService.RegisterAsync(dto);
        if (result == null)
            return BadRequest(new { message = "Registration failed. Username might already exist or password is invalid." });

        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
    {
        var result = await authService.LoginAsync(dto);
        if (result == null)
            return Unauthorized(new { message = "Invalid username or password" });

        return Ok(result);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        
        if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { message = "Missing or malformed token" });
        
        var token = authHeader["Bearer ".Length..];
        var success = await authService.LogoutAsync(token);
        
        return success
            ? Ok(new { message = "Logged out successfully" })
            : BadRequest(new { message = "Logout failed" });
    }
}