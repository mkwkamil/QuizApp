namespace LoginComponentBackend.DTO;

public class CreateQuizRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public List<CreateQuestionDTO> Questions { get; set; }
}

public class CreateQuestionDTO
{
    public string Text { get; set; }
    public List<CreateAnswerDTO> Answers { get; set; }
}

public class CreateAnswerDTO
{
    public string Text { get; set; }
    public bool IsCorrect { get; set; }
}