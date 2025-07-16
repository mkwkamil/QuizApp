namespace QuizApp.Backend.DTO.Explore;

public class QuizFilterRequestDto
{
    public int PageId { get; set; }
    public string? CategoryIds { get; set; }
    public string? Sort { get; set; }
    public string? DifficultyIds { get; set; }
    public string? Lengths { get; set; }
    public int? MinRating { get; set; }
    public bool IncludeAnswered { get; set; } = true;
    public int? UserId { get; set; }
}