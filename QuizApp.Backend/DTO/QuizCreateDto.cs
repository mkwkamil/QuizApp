namespace QuizApp.Backend.DTO;

public class QuizCreateDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string? ThumbnailUrl { get; set; }

    public int? CategoryId { get; set; }
    public int? DifficultyId { get; set; }

    public bool IsPublic { get; set; }
    public bool IsDraft { get; set; }
    public bool RevealAnswers { get; set; }
    public bool ShuffleQuestions { get; set; }

    public List<QuestionCreateDto> Questions { get; set; }
}