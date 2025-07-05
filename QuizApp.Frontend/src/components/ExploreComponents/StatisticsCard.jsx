import {ProfileAvatar, ProfileHeader, ProfileSidebar, StatsBox, StatsChips} from "./StyledExploreComponents";
import {Box, Chip, Typography} from "@mui/material";

function StatisticsCard({ profile }) {
    return (
        <ProfileSidebar>
            <ProfileHeader>
                <ProfileAvatar src={profile.avatar} />
                <Box>
                    <Typography variant="h6" fontWeight="bold" color="#fff">{profile.name}</Typography>
                    <Typography variant="body2" color="#bbb">{profile.description}</Typography>
                </Box>
            </ProfileHeader>
            <StatsChips>
                <Chip label={`${profile.stats.followers} followers`} color="primary" />
                <Chip label={`${profile.stats.following} following`} color="secondary" />
                <Chip label={`${profile.stats.quizzesCreated} Quizzes`} color="default" />
            </StatsChips>
            <StatsBox>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Rank</Typography>
                    <Typography variant="h6">{profile.stats.userRank}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Favorite</Typography>
                    <Typography variant="h6">{profile.stats.favoriteCategory}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Solved</Typography>
                    <Typography variant="h6">{profile.stats.quizzesSolved}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Accuracy</Typography>
                    <Typography variant="h6">{profile.stats.averageScore}</Typography>
                </Box>
            </StatsBox>
        </ProfileSidebar>
    )
}

export default StatisticsCard;