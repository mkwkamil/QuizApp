using LoginComponentBackend.DTO;
using LoginComponentBackend.Models;
using LoginComponentBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoginComponentBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;
    
    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Password is required" });
            }

            if (await _authService.UserExists(request.Username))
            {
                return Conflict(new { message = "Username already exists" });
            }
            
            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                Role = "User"
            };
            
            var registrationResult = await _authService.Register(user, request.Password);
            
            if (!registrationResult)
            {
                return StatusCode(500, "An error occurred while registering the user");
            }
            
            _logger.LogInformation($"New user registered: {user.Username}");
            return Ok(new AuthResponse
            {
                Username = user.Username,
                Role = user.Role,
            });

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during registration");
            return StatusCode(500, "An internal server error occurred");
        }
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var token = await _authService.Login(request.Username, request.Password);
            
            if (token == null)
            {
                return Unauthorized("Invalid credentials");
            }
            
            var user = await _authService.GetUserByUsername(request.Username);
            
            _logger.LogInformation($"User logged in: {user?.Username ?? request.Username}");
            return Ok(new AuthResponse
            {
                Token = token,
                Username = user?.Username ?? request.Username,
                Role = user?.Role ?? "User",
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during login");
            return StatusCode(500, "An internal server error occurred");
        }
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var username = User.Identity?.Name;
        if (string.IsNullOrEmpty(username))
        {
            return Unauthorized("User not authenticated");
        }

        var user = await _authService.GetUserByUsername(username);
        if (user == null)
        {
            return NotFound("User not found");
        }
        
        return Ok(new
        {
            user.Username,
            user.Email,
            user.Role,
            JoinDate = user.CreatedAt.ToString("yyyy-MM-dd")
        });
    }
}