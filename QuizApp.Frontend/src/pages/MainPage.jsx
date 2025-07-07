import { Box, Typography, Stack, styled } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {StyledMainGlowButton, StyledMainOutlinedButton} from "../components/common/StyledButtons";

const HeroContainer = styled(Box)({
    minHeight: "calc(100vh - 65px)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: '#0a0a0a',
    color: '#fff',
});

function MainPage() {
    const navigate = useNavigate();
    return (
        <HeroContainer>
            <Typography variant="h1" sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 700,
                mb: 3,
                textShadow: '0 0 10px rgba(255,255,255,0.3)'
            }}>
                Welcome to QuizApp
            </Typography>

            <Typography variant="h5" sx={{
                mb: 5,
                maxWidth: '600px',
                color: 'rgba(255,255,255,0.8)'
            }}>
                The ultimate platform for creating and taking quizzes
            </Typography>

            <Stack direction="row" spacing={3} sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                '& .MuiButton-root': { mb: { xs: 2, sm: 0 } }
            }}>
                <StyledMainGlowButton onClick={() => navigate('/quiz/create')} variant="contained">Quiz Creator</StyledMainGlowButton>
                <StyledMainOutlinedButton onClick={() => navigate('/explore')} variant="outlined">Explore quizzes</StyledMainOutlinedButton>
            </Stack>
        </HeroContainer>
    );
}

export default MainPage;