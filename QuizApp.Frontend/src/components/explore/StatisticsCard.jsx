import {ProfileAvatar, ProfileHeader, ProfileSidebar, StatsBox, StatsChips} from "./StyledExploreComponents";
import {Box, Chip, Typography} from "@mui/material";
import {useProfileData} from "../../hooks/useProfileData";

function StatisticsCard() {
    const profileData = useProfileData();
    if (!profileData) {
        return (
            <ProfileSidebar>
                <Box sx={{ p: 4, color: '#fff', textAlign: 'center' }}>
                    <Typography variant="h6">Loading profile...</Typography>
                </Box>
            </ProfileSidebar>
        );
    }
    return (
        <ProfileSidebar>
            <ProfileHeader>
                <ProfileAvatar src={profileData.avatar ?? ''} />
                <Box>
                    <Typography variant="h6" fontWeight="bold" color="#fff">{profileData.publicName}</Typography>
                    <Typography variant="body2" color="#bbb">{profileData.bio}</Typography>
                </Box>
            </ProfileHeader>
            <StatsChips>
                <Chip label={`${profileData.stats.followers} followers`} color="primary" />
                <Chip label={`${profileData.stats.following} following`} color="secondary" />
                <Chip label={`${profileData.stats.quizzesCreated} Quizzes`} color="default" />
            </StatsChips>
            <StatsBox>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Rank</Typography>
                    <Typography variant="h6">{profileData.stats.userRank}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Favorite</Typography>
                    <Typography variant="h6">{profileData.stats.favoriteCategory}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Solved</Typography>
                    <Typography variant="h6">{profileData.stats.quizzesSolved}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Accuracy</Typography>
                    <Typography variant="h6">{profileData.stats.accuracy}</Typography>
                </Box>
            </StatsBox>
        </ProfileSidebar>
    )
}

export default StatisticsCard;