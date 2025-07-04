import {Box, Typography, Stack, Chip, IconButton, Divider, Tooltip} from '@mui/material';
import {ChevronLeft, ChevronRight, SupportAgent} from '@mui/icons-material';
import {StyledMainGlowButton} from "../components/StyledButtons";
import {useNavigate} from "react-router-dom";
import {
    CategoryButton,
    CategoryNav,
    FiltersBox,
    FiltersButton,
    HeroContainer, MainContent,
    PopularQuizzesBox, ProfileAvatar, ProfileHeader, ProfileSidebar, PromoBox,
    QuizCard, QuizInfo, QuizThumbnail,
    Sidebar, StatsBox, StatsChips, SupportFeb
} from "../components/ExploreComponents";

function ExploreQuizzesPage() {
    const navigate = useNavigate();
    
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
        description: 'A passionate quiz creator and taker, always eager to learn and share knowledge.',
        stats: {
            followers: 150,
            following: 75,
            quizzesCreated: 12,
            quizzesSolved: 45,
            userRank: 'Beginner',
            favoriteCategory: 'Technology',
            averageScore: '87%',
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
                    <PromoBox>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Start creating your own quiz!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, mt: 2, color: '#bbb' }}>
                            Unleash your creativity and share your knowledge with the world. It's easy and fun!
                        </Typography>
                        <StyledMainGlowButton onClick={() => navigate('/quiz/create')}>Create Quiz</StyledMainGlowButton>
                    </PromoBox>
            </Sidebar>
            <Tooltip title="Contact Support" arrow>
                <SupportFeb color="primary" aria-label="contact support">
                    <SupportAgent />
                </SupportFeb>
            </Tooltip>
        </HeroContainer>
    );
}

export default ExploreQuizzesPage;