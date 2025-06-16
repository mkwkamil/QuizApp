using LoginComponentBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LoginComponentBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}
    
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
        
        modelBuilder.Entity<User>()
            .Property(u => u.Username)
            .IsRequired();
        
        modelBuilder.Entity<User>()
            .Property(u => u.Email)
            .IsRequired();
        
        modelBuilder.Entity<User>()
            .Property(u => u.PasswordHash)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.PasswordSalt)
            .IsRequired();
    }
}