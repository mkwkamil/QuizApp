using Microsoft.EntityFrameworkCore;
using QuizApp.Backend.Models;

namespace QuizApp.Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<QuizCategory> QuizCategories { get; set; }
    public DbSet<QuizDifficulty> QuizDifficulties { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<UserFollow> UserFollows { get; set; }
    public DbSet<QuizResult> QuizResults { get; set; }
    public DbSet<BlacklistedToken> BlackListedTokens { get; set; }

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

        modelBuilder.Entity<User>()
            .HasMany(u => u.Quizzes)
            .WithOne(q => q.Author)
            .HasForeignKey(q => q.AuthorId);
        
        modelBuilder.Entity<User>()
            .HasMany(u => u.Comments)
            .WithOne(c => c.Author)
            .HasForeignKey(c => c.AuthorId);
        
        modelBuilder.Entity<Quiz>()
            .HasMany(q => q.Questions)
            .WithOne(qn => qn.Quiz)
            .HasForeignKey(qn => qn.QuizId);
        
        modelBuilder.Entity<Quiz>()
            .HasMany(q => q.Comments)
            .WithOne(c => c.Quiz)
            .HasForeignKey(c => c.QuizId);
        
        modelBuilder.Entity<Question>()
            .HasMany(q => q.Answers)
            .WithOne(a => a.Question)
            .HasForeignKey(a => a.QuestionId);
        
        modelBuilder.Entity<BlacklistedToken>()
            .HasIndex(t => t.Token)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasMany(u => u.SolvedQuizzes)
            .WithOne(qr => qr.User)
            .HasForeignKey(qr => qr.UserId);

        modelBuilder.Entity<Quiz>()
            .HasMany(q => q.Results)
            .WithOne(qr => qr.Quiz)
            .HasForeignKey(qr => qr.QuizId);
        
        modelBuilder.Entity<Quiz>()
            .Property(q => q.IsDraft)
            .HasDefaultValue(true);

        modelBuilder.Entity<Quiz>()
            .Property(q => q.RevealAnswers)
            .HasDefaultValue(true);

        modelBuilder.Entity<Quiz>()
            .Property(q => q.ShuffleQuestions)
            .HasDefaultValue(false);
        
        modelBuilder.Entity<UserFollow>()
            .HasKey(uf => new { uf.FollowerId, uf.FollowingId });

        modelBuilder.Entity<UserFollow>()
            .HasOne(uf => uf.Follower)
            .WithMany(u => u.Following)
            .HasForeignKey(uf => uf.FollowerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserFollow>()
            .HasOne(uf => uf.Following)
            .WithMany(u => u.Followers)
            .HasForeignKey(uf => uf.FollowingId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Category)
            .WithMany(c => c.Quizzes)
            .HasForeignKey(q => q.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);
        
        modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Difficulty)
            .WithMany(c => c.Quizzes)
            .HasForeignKey(q => q.DifficultyId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}