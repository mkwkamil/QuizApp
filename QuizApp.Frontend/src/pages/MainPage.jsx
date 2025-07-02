import { Box, Typography, Button, Stack, styled } from '@mui/material';
import {useNavigate} from "react-router-dom";

const HeroContainer = styled(Box)({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: '#0a0a0a',
    color: '#fff',
    padding: '0 20px'
});

const GlowButton = styled(Button)({
    background: 'linear-gradient(90deg, #1a237e, #283593)',
    color: '#fff',
    padding: '12px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    letterSpacing: '1px',
    boxShadow: '0 0 15px rgba(48, 79, 254, 0.5)',
    '&:hover': {
        background: 'linear-gradient(90deg, #283593, #1a237e)',
        boxShadow: '0 0 20px rgba(48, 79, 254, 0.8)'
    }
});

const OutlineGlowButton = styled(Button)({
    border: '2px solid #3949ab',
    color: '#fff',
    padding: '12px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    letterSpacing: '1px',
    '&:hover': {
        border: '2px solid #5c6bc0',
        background: 'rgba(57, 73, 171, 0.1)',
        boxShadow: '0 0 15px rgba(92, 107, 192, 0.4)'
    }
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
                <GlowButton onClick={() => navigate('/quiz')} variant="contained">Quiz Creator</GlowButton>
                <OutlineGlowButton variant="outlined">Explore quizzes</OutlineGlowButton>
            </Stack>
        </HeroContainer>
    );
}

export default MainPage;