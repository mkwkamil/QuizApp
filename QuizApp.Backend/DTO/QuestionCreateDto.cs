namespace QuizApp.Backend.DTO;

public class QuestionCreateDto
{
    public string Text { get; set; }
    public string Type { get; set; }
    public List<string> Options { get; set; }
    public List<int> CorrectAnswers { get; set; }
}