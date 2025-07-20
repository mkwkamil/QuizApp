using QuizApp.Backend.DTO.Comments;

namespace QuizApp.Backend.DTO.QuizSolve;

public class QuizOverviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string ThumbnailUrl { get; set; } = default!;
    public string Category { get; set; } = default!;
    public string Difficulty { get; set; } = default!;
    
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