namespace QuizApp.Backend.DTO.Profile;

public class ExploreUserSummaryDto
{
    public string PublicName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    
    public int Followers { get; set; }
    public int Following { get; set; }
    
    public int QuizzesCreated { get; set; }
    public int QuizzesSolved { get; set; }
    
    public string Accuracy { get; set; } = "0%";
    public string FavoriteCategory { get; set; } = "Technology";
    public string UserRank { get; set; } = "Beginner";
}