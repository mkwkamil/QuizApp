namespace QuizApp.Backend.Models;

public class Quiz
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int? CategoryId { get; set; }
    public QuizCategory? Category { get; set; }
    
    public int? DifficultyId { get; set; }
    public QuizDifficulty? Difficulty { get; set; }

    public bool IsPublic { get; set; }
    public bool IsDraft { get; set; } = true;
    public bool RevealAnswers { get; set; } = true;
    public bool ShuffleQuestions { get; set; } = false;
    
    public int Plays { get; set; } = 0;
    public double AverageScore { get; set; } = 0.0;
    public int RatingCount { get; set; } = 0;

    public int AuthorId { get; set; }
    public User Author { get; set; } = default!;

    public List<Question> Questions { get; set; } = new();
    public List<Comment> Comments { get; set; } = new();
    public List<Rating> Ratings { get; set; } = new();
    public List<QuizResult> Results { get; set; } = new();
}