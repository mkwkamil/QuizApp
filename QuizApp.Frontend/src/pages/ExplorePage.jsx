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
    const categoryParam = searchParams.get("categories");
    const initialCategories = categoryParam
        ? categoryParam.split(",").map((id) => parseInt(id))
        : [];

    const [page, setPage] = useState(initialPage);
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);

    useEffect(() => {
        const params = {};
        if (page > 1) params.page = page;
        if (selectedCategories.length > 0) params.categories = selectedCategories.join(",");
        setSearchParams(params);
    }, [page, selectedCategories]);

    const { quizzes, totalPages } = useExploreQuizzes({
        page,
        categories: selectedCategories,
    });

    const handlePageChange = (_, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        
        <HeroContainer>
            <Sidebar>
                <FiltersCard />
                <PopularQuizzesCard />
            </Sidebar>
            <MainContent>
                <CategoryNavbar onChange={setSelectedCategories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
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