namespace QuizApp.Backend.DTO;

public class QuizDraftDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Category { get; set; }
    public string? Difficulty { get; set; }
    
    public bool IsPublic { get; set; } = true;
    public bool IsDraft { get; set; } = true;
    public bool RevealAnswers { get; set; } = true;
    public bool ShuffleQuestions { get; set; } = false;
    
    public List<QuestionDraftDto>? Questions { get; set; }
}

public class QuestionDraftDto
{
    public string? Text { get; set; }
    public string? Type { get; set; }
    public List<string>? Options { get; set; }
    public List<int>? CorrectAnswers { get; set; }
}