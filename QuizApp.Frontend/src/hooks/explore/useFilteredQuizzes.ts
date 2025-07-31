import type {ExploreFilters, FilteredQuizzesResponse} from "@interfaces/explore.ts";
import {useQuery} from "@tanstack/react-query";
import api from "@config/axiosConfig.ts";

export const useFilteredQuizzes = (filters: ExploreFilters) => {
    const {
        page = 1,
        selectedCategories = [],
        sortBy = "popular",
        includeAnswered = true,
        selectedDifficulties = [],
        selectedLengths = [],
        selectedRatings = null
    } = filters;
    
    return useQuery<FilteredQuizzesResponse>({
        queryKey: ['quizzes', 'filtered', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            
            if (selectedCategories.length)
                params.append("categories", selectedCategories.join(","));
            
            if (sortBy && sortBy !== "popular")
                params.append("sort", sortBy.toLowerCase());
            
            if (!includeAnswered)
                params.append("includeAnswered", "false");
            
            if (selectedDifficulties.length)
                params.append("difficulties", selectedDifficulties.join(","));
            
            if (selectedLengths.length)
                params.append("lengths", selectedLengths.join(","));
            
            if (selectedRatings !== null)
                params.append("ratings", selectedRatings.toString());
            
            const { data } = await api.get<FilteredQuizzesResponse>(`/explore/page/${page}?${params.toString()}`);
            return data;
        }
    });
};