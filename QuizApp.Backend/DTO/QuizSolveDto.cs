namespace QuizApp.Backend.DTO;

public class QuizSolveDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public List<QuestionDto> Questions { get; set; } = new();
}

public class QuestionDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Type { get; set; } = "single";
    public List<AnswerDto> Answers { get; set; } = new();
}

public class AnswerDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
}