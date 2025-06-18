namespace LoginComponentBackend.DTO;

public class CreateQuestion
{
    public string Text { get; set; }
    public List<CreateAnswer> Answers { get; set; }
}