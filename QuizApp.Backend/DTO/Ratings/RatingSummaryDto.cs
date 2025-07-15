namespace QuizApp.Backend.DTO.Ratings;

public class RatingSummaryDto
{
    public double Average { get; set; }
    public Dictionary<int, int> Breakdown { get; set; } = new();
}