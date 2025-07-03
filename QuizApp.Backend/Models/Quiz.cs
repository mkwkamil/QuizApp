namespace QuizApp.Backend.Models;

public class Quiz
{
    public int Id { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ThumbnailUrl { get; set; }

    public string? Category { get; set; }
    public string? Difficulty { get; set; }

    public bool IsPublic { get; set; }
    public bool IsDraft { get; set; } = true;
    public bool RevealAnswers { get; set; } = true;
    public bool ShuffleQuestions { get; set; } = false;

    public int AuthorId { get; set; }
    public User Author { get; set; }

    public List<Question> Questions { get; set; } = new();
    public List<Comment> Comments { get; set; } = new();
    public List<Rating> Ratings { get; set; } = new();
    public List<QuizResult> Results { get; set; } = new();
}