using QuizApp.Backend.DTO.Explore;

namespace QuizApp.Backend.Interfaces;

public interface IExploreService
{
    Task<ExploreUserSummaryDto?> GetExploreUserSummaryAsync(int userId);
    Task<List<PopularQuizDto>> GetPopularQuizzesAsync();
    Task<FilteredQuizzesResultDto> GetFilteredQuizzesAsync(QuizFilterRequestDto dto);
}