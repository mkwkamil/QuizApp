import {
    LoginSidebar,
    ProfileAvatar,
    ProfileHeader,
    ProfileSidebar,
    StatsBox,
    StatsChips
} from "./StyledExploreComponents";
import {Box, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../store/authStore";
import {StyledMainOutlinedButton} from "../common/StyledButtons";
import {useUserSummary} from "../../hooks/explore/useUserSummary";

export default function ProfileStatsBox() {
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    const isAuthenticated = Boolean(token);
    
    const { data: profileData, isLoading } = useUserSummary();

    if (!isAuthenticated) {
        return (
            <LoginSidebar>
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                        Want to track your progress?
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={2}>
                        Log in to view your profile, check stats, follow other users and more!
                    </Typography>

                    <StyledMainOutlinedButton onClick={() => navigate('/login')} fullWidth>
                        Log in to view stats
                    </StyledMainOutlinedButton>
            </LoginSidebar>
        );
    }

    if (isLoading || !profileData) {
        return (
            <ProfileSidebar>
                <Box sx={{ p: 4, color: "#fff", textAlign: "center" }}>
                    <Typography variant="h6">Loading profile...</Typography>
                </Box>
            </ProfileSidebar>
        );
    }
    
    return (
        <ProfileSidebar>
            <ProfileHeader>
                <ProfileAvatar src={profileData.avatar || ''} />
                <Box>
                    <Typography variant="h6" fontWeight="bold" color="#fff">{profileData.publicName}</Typography>
                    <Typography variant="body2" color="#bbb">{profileData.bio}</Typography>
                </Box>
            </ProfileHeader>
            <StatsChips>
                <Chip label={`${profileData.followers} followers`} color="primary" />
                <Chip label={`${profileData.following} following`} color="secondary" />
                <Chip label={`${profileData.quizzesCreated} Quizzes`} color="default" />
            </StatsChips>
            <StatsBox>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Rank</Typography>
                    <Typography variant="h6">{profileData.userRank}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Favorite</Typography>
                    <Typography variant="h6">{profileData.favoriteCategory}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Solved</Typography>
                    <Typography variant="h6">{profileData.quizzesSolved}</Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold">Accuracy</Typography>
                    <Typography variant="h6">{profileData.accuracy}</Typography>
                </Box>
            </StatsBox>
        </ProfileSidebar>
    )
}