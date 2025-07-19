import { useAuthStore } from "@store/auth/authStore";
import { useExploreUserStats } from "@hooks/explore/useExploreUserStats";
import {
    UserStatsAvatar,
    UserStatsCardWrapper, UserStatsChipRow, UserStatsGrid, UserStatsHeader,
    UserStatsLoginButton,
    UserStatsLoginPrompt
} from "@components/explore/UserStatsCardLayout";
import { Box, Chip, Typography } from "@mui/material";
import { Link}  from "react-router-dom";

const UserStatsCard = () => {
    const token = useAuthStore((state) => state.token);
    const isAuthenticated = Boolean(token);
    const { data: profileData, isLoading } = useExploreUserStats();

    if (!isAuthenticated) {
        return (
            <UserStatsLoginPrompt>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Want to track your progress?
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                    Log in to view your profile, check stats, follow other users and more!
                </Typography>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <UserStatsLoginButton>
                        Log in to view stats
                    </UserStatsLoginButton>
                </Link>
            </UserStatsLoginPrompt>
        );
    }

    if (isLoading || !profileData) {
        return (
            <UserStatsCardWrapper>
                <Box sx={{ p: 4, color: "#fff", textAlign: "center" }}>
                    <Typography variant="h6">Loading profile...</Typography>
                </Box>
            </UserStatsCardWrapper>
        );
    }

    return (
        <UserStatsCardWrapper>
            <UserStatsHeader>
                <UserStatsAvatar src={profileData.avatarUrl || ""} />
                <Box>
                    <Typography variant="h6" fontWeight="bold" color="#fff">
                        {profileData.publicName}
                    </Typography>
                    <Typography variant="body2" color="#bbb">
                        {profileData.bio}
                    </Typography>
                </Box>
            </UserStatsHeader>

            <UserStatsChipRow>
                <Chip label={`${profileData.followers} followers`} color="primary" />
                <Chip label={`${profileData.following} following`} color="secondary" />
                <Chip label={`${profileData.quizzesCreated} Quizzes`} color="default" />
            </UserStatsChipRow>

            <UserStatsGrid>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                        Rank
                    </Typography>
                    <Typography variant="h6">{profileData.userRank}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                        Favorite
                    </Typography>
                    <Typography variant="h6">{profileData.favoriteCategory}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                        Solved
                    </Typography>
                    <Typography variant="h6">{profileData.quizzesSolved}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                        Accuracy
                    </Typography>
                    <Typography variant="h6">{profileData.accuracy}</Typography>
                </Box>
            </UserStatsGrid>
        </UserStatsCardWrapper>
    );
};

export default UserStatsCard;