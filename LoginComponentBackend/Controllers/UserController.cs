using LoginComponentBackend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoginComponentBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly AppDbContext _context;
    
    public UserController(ILogger<UserController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [Authorize]
    [HttpGet("profile")]
    [Produces("application/json")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var username = User.Identity?.Name;

        if (string.IsNullOrEmpty(username))
        {
            return Unauthorized("Invalid or missing token");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
        {
            _logger.LogWarning("User not found: {Username}", username);
            return NotFound("User not found");
        }

        return Ok(new
        {
            user.Username,
            user.Email,
            user.Role
        });
    }
    
}