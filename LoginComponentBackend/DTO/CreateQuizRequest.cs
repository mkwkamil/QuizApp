namespace LoginComponentBackend.DTO;

public class CreateQuizRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public List<CreateQuestion> Questions { get; set; }
}