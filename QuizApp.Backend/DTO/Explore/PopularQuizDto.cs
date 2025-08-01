namespace QuizApp.Backend.DTO.Explore;

public class PopularQuizDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    
    public int QuestionsCount { get; set; }
    public int PlayedBy { get; set; }
    public double AverageRating { get; set; }
}