using LoginComponentBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace LoginComponentBackend.Middleware;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext context, AppDbContext dbContext)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token != null && await dbContext.BlackListedTokens.AnyAsync(t => t.Token == token))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Token revoked");
            return;
        }

        await _next(context);
    }
}