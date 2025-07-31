namespace QuizApp.Backend.DTO.QuizManagement;

public class QuizLoadDto
{
    public int AuthorId { get; set; }
    public int QuizId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    
    public int? CategoryId { get; set; }
    public int? DifficultyId { get; set; }
    
    public bool IsPublic { get; set; }
    public bool IsDraft { get; set; }
    public bool RevealAnswers { get; set; }
    public bool ShuffleQuestions { get; set; }

    public List<QuestionLoadDto> Questions { get; set; } = new();
}

public class QuestionLoadDto
{
    public string Text { get; set; } = string.Empty;
    public string Type { get; set; } = "single";
    public List<string> Options { get; set; } = new();
    public List<int> CorrectAnswers { get; set; } = new();
}