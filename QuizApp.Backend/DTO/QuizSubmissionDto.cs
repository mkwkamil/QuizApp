namespace QuizApp.Backend.DTO;

public class QuizSubmissionDto
{
    public int QuizId { get; set; }
    public int TimeTaken { get; set; }
    public List<SubmittedAnswerDto> Answers { get; set; } = new();
}

public class SubmittedAnswerDto
{
    public int QuestionId { get; set; }
    public List<int> SelectedAnswerIds { get; set; } = new();
}