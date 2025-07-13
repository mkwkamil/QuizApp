namespace QuizApp.Backend.DTO;

public class QuizSubmissionResultDto
{
    public int CorrectAnswers { get; set; }
    public int TotalQuestions { get; set; }
    public int TimeTaken { get; set; }
    public double ScorePercentage => TotalQuestions == 0 ? 0 : (double)CorrectAnswers / TotalQuestions * 100;
}