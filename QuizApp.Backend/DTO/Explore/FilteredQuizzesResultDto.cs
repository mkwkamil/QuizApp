namespace QuizApp.Backend.DTO.Explore;

public class FilteredQuizzesResultDto
{
    public int TotalPages { get; set; }
    public List<FilteredQuizDto> Quizzes { get; set; } = new();
}