import { HeroContainer, MainContent, Sidebar} from "../components/ExploreComponents/StyledExploreComponents";
import FiltersCard from "../components/ExploreComponents/FiltersCard";
import PopularQuizzesCard from "../components/ExploreComponents/PopularQuizzesCard";
import CategoryNavbar from "../components/ExploreComponents/CategoryNavbar";
import MainQuizzesBox from "../components/ExploreComponents/MainQuizzesBox";
import CreateQuizPromo from "../components/CreatorPromoBox";
import SupportTooltip from "../components/SupportTooltip";
import StatisticsCard from "../components/ExploreComponents/StatisticsCard";

function ExplorePage() {
    const popularQuizzes = [
        { id: 1, title: 'CSS Grid Mastery', questions: 15, plays: 342, rating: 4.8 },
        { id: 2, title: 'TypeScript Basics', questions: 10, plays: 128, rating: 4.5 },
        { id: 3, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
        { id: 4, title: 'CSS Grid Mastery', questions: 15, plays: 342, rating: 4.8 },
        { id: 5, title: 'TypeScript Basics', questions: 10, plays: 128, rating: 4.5 },
        { id: 6, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
        { id: 7, title: 'World History', questions: 20, plays: 211, rating: 4.7 },
    ];

    return (
        <HeroContainer>
            <Sidebar>
                <FiltersCard />
                <PopularQuizzesCard popularQuizzes={popularQuizzes} />
            </Sidebar>
            <MainContent>
                <CategoryNavbar />
                <MainQuizzesBox mainQuizzes={popularQuizzes} />
            </MainContent>
            <Sidebar>
                <StatisticsCard />
                <CreateQuizPromo />
            </Sidebar>
            <SupportTooltip />
        </HeroContainer>
    );
}

export default ExplorePage;