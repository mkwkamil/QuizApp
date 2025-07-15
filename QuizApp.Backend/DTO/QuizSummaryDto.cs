namespace QuizApp.Backend.DTO;

public class QuizSummaryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string ThumbnailUrl { get; set; } = default!;
    public string Category { get; set; } = default!;
    public string Difficulty { get; set; } = default!;
    
    public double Rating { get; set; }
    public Dictionary<int, int> RatingsBreakdown { get; set; } = new();
    
    public int QuestionCount { get; set; }
    public int Plays { get; set; }
    public double AverageScore { get; set; }
    
    public AuthorDto Author { get; set; } = default!;
    public List<CommentDto> Comments { get; set; } = new();
}

public class AuthorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string AvatarUrl { get; set; } = default!;
    public DateTime JoinedAt { get; set; } = default!;
}

public class CommentDto
{
    public int Id { get; set; }
    public string AuthorName { get; set; } = default!;
    public string Content { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
}