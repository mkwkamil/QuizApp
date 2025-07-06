import { HeroContainer, MainContent, Sidebar} from "../components/ExploreComponents/StyledExploreComponents";
import FiltersCard from "../components/ExploreComponents/FiltersCard";
import PopularQuizzesCard from "../components/ExploreComponents/PopularQuizzesCard";
import CategoryNavbar from "../components/ExploreComponents/CategoryNavbar";
import MainQuizzesBox from "../components/ExploreComponents/MainQuizzesBox";
import CreateQuizPromo from "../components/CreatorPromoBox";
import SupportTooltip from "../components/SupportTooltip";
import StatisticsCard from "../components/ExploreComponents/StatisticsCard";
import {useEffect, useState} from "react";
import {useExploreQuizzes} from "../hooks/useExploreQuizzes";
import {useSearchParams} from "react-router-dom";

function ExplorePage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);

    const initialCategories = searchParams.get("categories")
        ?.split(",").map(Number).filter(Boolean) || [];
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);

    const initialIncludeAnswered = searchParams.get("includeAnswered") === "true";
    const [includeAnswered, setIncludeAnswered] = useState(initialIncludeAnswered);
    
    const initialSortBy = searchParams.get("sort") || "popular";
    const [sortBy, setSortBy] = useState(initialSortBy);
    
    useEffect(() => {
        const params = {};
        if (page > 1) params.page = page;
        if (selectedCategories.length > 0) params.categories = selectedCategories.join(",");
        if (sortBy !== "popular") params.sort = sortBy;
        if (includeAnswered) params.includeAnswered = true;
        
        setSearchParams(params);
    }, [page, selectedCategories, sortBy, includeAnswered, setSearchParams]);

    const { quizzes, totalPages } = useExploreQuizzes({
        page,
        categories: selectedCategories,
        sortBy,
        includeAnswered
    });

    const handlePageChange = (_, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        
        <HeroContainer>
            <Sidebar>
                <FiltersCard sortBy={sortBy} setSortBy={setSortBy} includeAnswered={includeAnswered} setIncludeAnswered={setIncludeAnswered} />
                <PopularQuizzesCard />
            </Sidebar>
            <MainContent>
                <CategoryNavbar onChange={setSelectedCategories} selectedCategories={selectedCategories} />
                <MainQuizzesBox quizzes={quizzes} totalPages={totalPages} page={page} onPageChange={handlePageChange}/>
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