import { HeroContainer, MainContent, Sidebar} from "../components/explore/StyledExploreComponents";
import FiltersCard from "../components/explore/FiltersCard";
import PopularQuizzesCard from "../components/explore/PopularQuizzesCard";
import CategoryNavbar from "../components/explore/CategoryNavbar";
import MainQuizzesBox from "../components/explore/MainQuizzesBox";
import StatisticsCard from "../components/explore/StatisticsCard";
import CreateQuizPromo from "../components/common/CreatorPromoBox";
import SupportTooltip from "../components/common/SupportTooltip";
import {useEffect, useState} from "react";
import {useExploreQuizzes} from "../hooks/useExploreQuizzes";
import {useSearchParams} from "react-router-dom";
import { toast } from 'react-toastify';

export default function ExplorePage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get("page")) || 1;
    const initialCategories = searchParams.get("categories")?.split(",").map(Number).filter(Boolean) || [];

    const initialDifficulties = searchParams.get("difficulties")?.split(",").map(Number).filter(Boolean) || [];
    const initialLengths = searchParams.get("lengths")?.split(",").map(Number).filter(Boolean) || [];
    const initialRatings = searchParams.get("ratings") ? parseInt(searchParams.get("ratings")) : null;
    const initialSortBy = searchParams.get("sort") || "popular";
    const initialIncludeAnswered = searchParams.get("includeAnswered") === "true";

    const [filters, setFilters] = useState({
        page: initialPage,
        selectedCategories: initialCategories,
        includeAnswered: initialIncludeAnswered,
        sortBy: initialSortBy,
        selectedDifficulties: initialDifficulties,
        selectedLengths: initialLengths,
        selectedRatings: initialRatings
    });
    
    useEffect(() => {
        const params = {};
        if (filters.page > 1) params.page = filters.page;
        if (filters.selectedCategories.length > 0) params.categories = filters.selectedCategories.join(",");

        if (filters.selectedDifficulties.length > 0) params.difficulties = filters.selectedDifficulties.join(",");
        if (filters.selectedLengths.length > 0) params.lengths = filters.selectedLengths.join(",");
        if (filters.sortBy !== "popular") params.sort = filters.sortBy;
        if (filters.includeAnswered) params.includeAnswered = true;
        if (filters.selectedRatings !== null) params.ratings = filters.selectedRatings.toString();

        setSearchParams(params);
    }, [filters, setSearchParams]);

    const { quizzes, totalPages, loading, error } = useExploreQuizzes(filters);

    useEffect(() => {
        if (error) {
            toast.error("Failed to load quizzes. Please try again later.", { autoClose: 3000 });
        }
    }, [error]);

    const handlePageChange = (_, value) => {
        setFilters(prev => ({
            page: value,
            selectedCategories: prev.selectedCategories,
            includeAnswered: prev.includeAnswered,
            sortBy: prev.sortBy,
            selectedDifficulties: prev.selectedDifficulties,
            selectedLengths: prev.selectedLengths,
            selectedRatings: prev.selectedRatings
        }))
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <HeroContainer>
            <Sidebar>
                <FiltersCard filters={filters} setFilters={setFilters} />
                <PopularQuizzesCard />
            </Sidebar>
            <MainContent>
                <CategoryNavbar loading={loading} filters={filters} setFilters={setFilters} />
                <MainQuizzesBox loading={loading} quizzes={quizzes} totalPages={totalPages} page={filters.page} onPageChange={handlePageChange}/>
            </MainContent>
            <Sidebar>
                <StatisticsCard />
                <CreateQuizPromo />
            </Sidebar>
            <SupportTooltip />
        </HeroContainer>
    );
}