namespace QuizApp.Backend.DTO;

public class QuizResponseDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public AuthorDTO Author { get; set; }
    public List<QuestionResponseDTO> Questions { get; set; }
}

public class AuthorDTO
{
    public int Id { get; set; }
    public string Username { get; set; }
}

public class QuestionResponseDTO
{
    public int Id { get; set; }
    public string Text { get; set; }
    public List<AnswerResponseDTO> Answers { get; set; }
}

public class AnswerResponseDTO
{
    public int Id { get; set; }
    public string Text { get; set; }
    public bool IsCorrect { get; set; }
}
