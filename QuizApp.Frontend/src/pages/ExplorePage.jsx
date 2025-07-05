import { HeroContainer, MainContent, Sidebar} from "../components/ExploreComponents/StyledExploreComponents";
import FiltersCard from "../components/ExploreComponents/FiltersCard";
import PopularQuizzesCard from "../components/ExploreComponents/PopularQuizzesCard";
import CategoryNavbar from "../components/ExploreComponents/CategoryNavbar";
import MainQuizzesBox from "../components/ExploreComponents/MainQuizzesBox";
import CreateQuizPromo from "../components/CreatorPromoBox";
import SupportTooltip from "../components/SupportTooltip";
import StatisticsCard from "../components/ExploreComponents/StatisticsCard";

function ExplorePage() {
    const categories = ['Business', 'Technology', 'Science', 'Arts', 'Math', 'History', 'Sports', 'Literature'];
    const popularQuizzes = [
        { id: 1, title: 'CSS Grid Mastery', questions: 15, plays: 342, rating: 4.8 },
        { id: 2, title: 'TypeScript Basics', questions: 10, plays: 128, rating: 4.5 },
        { id: 3, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
        { id: 4, title: 'CSS Grid Mastery', questions: 15, plays: 342, rating: 4.8 },
        { id: 5, title: 'TypeScript Basics', questions: 10, plays: 128, rating: 4.5 },
        { id: 6, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
        { id: 7, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
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
                <FiltersCard />
                <PopularQuizzesCard popularQuizzes={popularQuizzes} />
            </Sidebar>
            <MainContent>
                <CategoryNavbar categories={categories} />
                <MainQuizzesBox mainQuizzes={popularQuizzes} />
            </MainContent>
            <Sidebar>
                <StatisticsCard profile={profile} />
                <CreateQuizPromo />
            </Sidebar>
            <SupportTooltip />
        </HeroContainer>
    );
}

export default ExplorePage;