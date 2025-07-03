import {Box, Typography, Stack, Paper, Chip, Avatar, IconButton, Divider, Tooltip, Fab} from '@mui/material';
import {BarChart, ChevronLeft, ChevronRight, SupportAgent} from '@mui/icons-material';
import { styled } from '@mui/system';
import {StyledMainGlowButton} from "../components/StyledButtons";

export const HeroContainer = styled(Box)({
    display: 'flex',
    minHeight: "calc(100vh - 135px)",
    gap: 55,
    padding: 35,
    backgroundColor: '#0a0a0a',
    color: '#fff',
    fontFamily: '"Poppins", sans-serif',
});

export const Sidebar = styled(Box)({
    width: 450,
    padding: 16,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 34,
    overflowY: 'auto',
});
export const FiltersBox = styled(Paper)({
    padding: 16,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
});

export const PopularQuizzesBox = styled(Paper)({
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    borderRadius: 12,
    padding: '20px 16px',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    overflowY: 'auto',
});

export const MainContent = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
});

export const CategoryNav = styled(Stack)({
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: '8px 16px',
    justifyContent: 'center',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
        height: 6,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    }
});

export const CategoryButton = styled(Chip)({
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#aaa',
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 16px',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: '#fff',
    },
});

export const FiltersButton = styled(Chip)({
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#aaa',
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 16px',
    width: '50%',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: '#fff',
    },
});

export const QuizCard = styled(Paper)({
    display: 'flex',
    gap: 16,
    padding: 15,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
    }
});

export const QuizThumbnail = styled(Box)({
    width: 100,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#444',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

export const QuizInfo = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const ProfileSidebar = styled(Paper)({
    padding: 16,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: 34,
    overflowY: 'auto',
});

export const ProfileHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
});

export const ProfileAvatar = styled(Avatar)({
    width: 64,
    height: 64,
    boxShadow: '0 0 10px rgba(0,255,255,0.6)',
});

export const StatsChips = styled(Stack)({
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
});

export const ChartBox = styled(Paper)({
    padding: 16,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontStyle: 'italic',
});

export const PromoBox = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    textAlign: 'center',
});

function ExploreQuizzesPage() {
    const categories = ['Business', 'Technology', 'Science', 'Arts', 'Math', 'History', 'Sports', 'Literature'];
    const popularQuizzes = [
        { id: 1, title: 'CSS Grid Mastery', questions: 15, plays: 342, rating: 4.8 },
        { id: 2, title: 'TypeScript Basics', questions: 10, plays: 128, rating: 4.5 },
        { id: 3, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
        { id: 4, title: 'CSS Grid Mastery', questions: 15, plays: 342, rating: 4.8 },
        { id: 5, title: 'TypeScript Basics', questions: 10, plays: 128, rating: 4.5 },
        { id: 6, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
    ];
    const profile = {
        avatar: '',
        name: 'Test User',
        stats: {
            quizzesCreated: 12,
            accuracy: '87%',
        },
    };

    return (
        <HeroContainer>
            <Sidebar>
                <FiltersBox>
                    <Typography variant="h6" gutterBottom>
                        Filters
                    </Typography>
                    <Box sx={{ height: 200, bgcolor: '#333', borderRadius: 2 }} />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        Other Filters
                    </Typography>
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{ flexWrap: 'wrap', height: 80 }}
                    >
                        <Stack direction="row" spacing={2}>
                            <FiltersButton label="Popular" />
                            <FiltersButton label="Recent" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <FiltersButton label="Trending" />
                            <FiltersButton label="Unanswered" />
                        </Stack>
                    </Stack>
                </FiltersBox>

                <PopularQuizzesBox>
                    <Typography variant="h6" gutterBottom marginBottom={2}>
                        Most Popular Quizzes
                    </Typography>
                    <Stack spacing={2}>
                        {popularQuizzes.slice(0, 4).map((quiz) => (
                            <QuizCard key={quiz.id}>
                                <QuizThumbnail sx={{ backgroundImage: `url(https://picsum.photos/seed/${quiz.id}/100/80)` }} />
                                <QuizInfo>
                                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                        {quiz.title}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ color: '#aaa' }}>
                                        <Typography variant="caption">{quiz.questions} questions</Typography>
                                        <Typography variant="caption">• {quiz.plays} plays</Typography>
                                        <Typography variant="caption">• ⭐ {quiz.rating}</Typography>
                                    </Stack>
                                </QuizInfo>
                            </QuizCard>
                        ))}
                    </Stack>
                </PopularQuizzesBox>
            </Sidebar>

            <MainContent>
                <CategoryNav>
                    <IconButton><ChevronLeft sx={{ color: '#888' }} /></IconButton>
                    {categories.map((cat) => (
                        <CategoryButton key={cat} label={cat} />
                    ))}
                    <IconButton><ChevronRight sx={{ color: '#888' }} /></IconButton>
                </CategoryNav>

                <Box>
                    <Typography variant="h5" marginBottom={3} gutterBottom>
                        Quizzes Below
                    </Typography>
                    <Stack spacing={2}>
                        {popularQuizzes.map((quiz) => (
                            <QuizCard key={quiz.id}>
                                <QuizThumbnail sx={{ backgroundImage: `url(https://picsum.photos/seed/${quiz.id}/100/80)` }} />
                                <QuizInfo>
                                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                        {quiz.title}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ color: '#aaa' }}>
                                        <Typography variant="caption">{quiz.questions} questions</Typography>
                                        <Typography variant="caption">• {quiz.plays} plays</Typography>
                                        <Typography variant="caption">• ⭐ {quiz.rating}</Typography>
                                    </Stack>
                                </QuizInfo>
                            </QuizCard>
                        ))}
                    </Stack>
                </Box>
            </MainContent>
            <Sidebar>

                <ProfileSidebar>
                    <ProfileHeader>
                        <ProfileAvatar src={profile.avatar} />
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="#fff">{profile.name}</Typography>
                            <StatsChips spacing={1}>
                                <Chip label={`${profile.stats.quizzesCreated} quizzes`} color="primary" />
                                <Chip label={`${profile.stats.accuracy} accuracy`} color="success" />
                            </StatsChips>
                        </Box>
                    </ProfileHeader>

                    <ChartBox>
                        <BarChart sx={{ fontSize: 40, mb: 1 }} />
                        Analytics chart placeholder
                    </ChartBox>
                </ProfileSidebar>

                    <PromoBox>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Featured Quiz
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Dive into our most popular quiz and test your knowledge!
                        </Typography>
                        <StyledMainGlowButton>Play Now</StyledMainGlowButton>
                    </PromoBox>
            </Sidebar>
            <Tooltip title="Contact Support" arrow>
                <Fab
                    color="primary"
                    sx={{
                        position: 'fixed',
                        bottom: 40,
                        right: 40,
                        zIndex: 1300,
                        backgroundColor: 'rgba(24,42,159)',
                        '&:hover': {
                            backgroundColor: 'rgba(24,42,159,0.7)',
                        },
                        }}
                    aria-label="contact support"
                >
                    <SupportAgent />
                </Fab>
            </Tooltip>
        </HeroContainer>
    );
}

export default ExploreQuizzesPage;