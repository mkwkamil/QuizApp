using QuizApp.Backend.DTO.Profile;

namespace QuizApp.Backend.Interfaces;

public interface IProfileService
{
    Task<PublicProfileDto?> UpdatePublicDataAsync(int userId, ProfileUpdateDto dataDto);
    Task<ProfileSummaryDto?> GetProfileSummaryAsync(int userId);
}