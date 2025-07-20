import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFilteredQuizzes } from "@hooks/explore/useFilteredQuizzes";
import { toast } from "react-toastify";
import { ExploreLayoutWrapper, ExploreMainContent, ExploreSidebar } from "@components/explore/styles/ExplorePageLayout";
import QuizFiltersPanel from "@components/explore/QuizFiltersPanel";
import PopularQuizList from "@components/explore/PopularQuizList";
import CreateQuizBanner from "@components/common/CreateQuizBanner";
import SupportTooltip from "@components/common/SupportTooltip";
import UserStatsCard from "@components/explore/UserStatsCard";
import QuizCategoryNav from "@components/explore/QuizCategoryNav";
import FilteredQuizList from "@components/explore/FilteredQuizList";

const ExplorePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const initialCategories = searchParams.get("categories")?.split(",").map(Number).filter(Boolean) || [];
    const initialDifficulties = searchParams.get("difficulties")?.split(",").map(Number).filter(Boolean) || [];
    const initialLengths = searchParams.get("lengths")?.split(",").map(Number).filter(Boolean) || [];
    const initialRatings = searchParams.get("ratings") ? parseInt(searchParams.get("ratings")!) : null;
    const initialSortBy = searchParams.get("sort") || "popular";
    const initialIncludeAnswered = searchParams.get("includeAnswered") === "true";

    const [filters, setFilters] = useState({
        page: initialPage,
        selectedCategories: initialCategories,
        includeAnswered: initialIncludeAnswered,
        sortBy: initialSortBy,
        selectedDifficulties: initialDifficulties,
        selectedLengths: initialLengths,
        selectedRatings: initialRatings,
    });

    useEffect(() => {
        const params: Record<string, string | number | boolean> = {};
        
        if (filters.page > 1) params.page = filters.page;
        if (filters.selectedCategories.length) params.categories = filters.selectedCategories.join(",");
        if (filters.selectedDifficulties.length) params.difficulties = filters.selectedDifficulties.join(",");
        if (filters.selectedLengths.length) params.lengths = filters.selectedLengths.join(",");
        if (filters.sortBy !== "popular") params.sort = filters.sortBy;
        if (filters.includeAnswered) params.includeAnswered = true;
        if (filters.selectedRatings !== null) params.ratings = filters.selectedRatings;

        setSearchParams(params as any);
    }, [filters, setSearchParams]);

    const { data, isLoading, error } = useFilteredQuizzes(filters);

    const quizzes = data?.quizzes ?? [];
    const totalPages = data?.totalPages ?? 0;

    useEffect(() => {
        if (error) toast.error("Failed to load quizzes. Please try again later.", { autoClose: 3000 });
    }, [error]);
    
    return (
        <ExploreLayoutWrapper>
            <ExploreSidebar>
                <QuizFiltersPanel filters={filters} setFilters={setFilters} />
                <PopularQuizList />
            </ExploreSidebar>

            <ExploreMainContent>
                <QuizCategoryNav filters={filters} setFilters={setFilters} />
                <FilteredQuizList
                    loading={isLoading}
                    quizzes={quizzes}
                    totalPages={totalPages}
                    page={filters.page}
                    setFilters={setFilters}
                />
            </ExploreMainContent>

            <ExploreSidebar>
                <UserStatsCard />
                <CreateQuizBanner />
            </ExploreSidebar>

            <SupportTooltip />
        </ExploreLayoutWrapper>
    )
}

export default ExplorePage;