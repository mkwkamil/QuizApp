namespace QuizApp.Backend.DTO.QuizManagement;

public class UserQuizSummaryDto
{
    public int Id { get; set; }
    public string? Title { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    
    public bool IsDraft { get; set; }
    public int QuestionsCount { get; set; }
    public int PlayedBy { get; set; }
    public double AverageRating { get; set; }
}