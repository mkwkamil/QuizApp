using LoginComponentBackend.DTO;
using LoginComponentBackend.Models;
using LoginComponentBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoginComponentBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (await _authService.UserExists(request.Username))
        {
            return BadRequest("User already exists");
        }

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            Role = "User"
        };
        
        await _authService.Register(user, request.Password);
        return Ok("User registered successfully");
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.Login(request.Username, request.Password);
        if (result == null)
        {
            return Unauthorized("Invalid username or password");
        }

        return Ok(new AuthResponse
        {
            Token = result,
            Username = request.Username,
            Role = "User"
        });
    }
}