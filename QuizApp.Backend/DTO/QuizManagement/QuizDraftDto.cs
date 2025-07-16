namespace QuizApp.Backend.DTO.QuizManagement;

public class QuizDraftDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; } = string.Empty;
    
    public int? CategoryId { get; set; }
    public int? DifficultyId { get; set; }
    
    public bool IsPublic { get; set; }
    public bool RevealAnswers { get; set; }
    public bool ShuffleQuestions { get; set; }
    
    public List<QuestionDraftDto> Questions { get; set; } = new();
}

public class QuestionDraftDto
{
    public string Text { get; set; } = string.Empty;
    public string Type { get; set; } = "single";
    public List<string> Options { get; set; } = new();
    public List<int> CorrectAnswers { get; set; } = new();
}