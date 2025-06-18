using LoginComponentBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LoginComponentBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Rating> Ratings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

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

        modelBuilder.Entity<Rating>()
            .HasIndex(r => new { r.AuthorId, r.QuizId })
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasMany(u => u.Quizzes)
            .WithOne(q => q.Author)
            .HasForeignKey(q => q.AuthorId);
        
        modelBuilder.Entity<User>()
            .HasMany(u => u.Comments)
            .WithOne(c => c.Author)
            .HasForeignKey(c => c.AuthorId);
        
        modelBuilder.Entity<User>()
            .HasMany(u => u.Ratings)
            .WithOne(r => r.Author)
            .HasForeignKey(r => r.AuthorId);
        
        modelBuilder.Entity<Quiz>()
            .HasMany(q => q.Questions)
            .WithOne(qn => qn.Quiz)
            .HasForeignKey(qn => qn.QuizId);
        
        modelBuilder.Entity<Quiz>()
            .HasMany(q => q.Comments)
            .WithOne(c => c.Quiz)
            .HasForeignKey(c => c.QuizId);
        
        modelBuilder.Entity<Quiz>()
            .HasMany(q => q.Ratings)
            .WithOne(r => r.Quiz)
            .HasForeignKey(r => r.QuizId);
        
        modelBuilder.Entity<Question>()
            .HasMany(q => q.Answers)
            .WithOne(a => a.Question)
            .HasForeignKey(a => a.QuestionId);
    }
}