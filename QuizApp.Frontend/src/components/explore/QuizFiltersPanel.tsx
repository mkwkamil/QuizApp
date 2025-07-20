import { Box, Divider, Stack, Typography } from "@mui/material";
import type { ExploreFilters, FiltersCardProps } from "@interfaces/explore";
import { QuizFiltersChip, QuizFiltersToggle, QuizFiltersWrapper } from "@components/explore/styles/QuizFiltersPanelLayout";

const QuizFiltersPanel = ({ filters, setFilters }: FiltersCardProps) => {
    const sortOptions = ["Popular", "Recent", "Trending"];

    return (
        <QuizFiltersWrapper>
            <Typography variant="h5" gutterBottom>
                Filters
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
                Difficulty
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {[1, 2, 3, 4].map(id => (
                    <QuizFiltersChip
                        key={id}
                        label={["Easy", "Medium", "Hard", "Expert"][id - 1]}
                        selected={filters.selectedDifficulties.includes(id)}
                        onClick={() =>
                            setFilters((prev: ExploreFilters) => ({
                                ...prev,
                                selectedDifficulties: (prev.selectedDifficulties ?? []).includes(id)
                                    ? (prev.selectedDifficulties ?? []).filter((d: number) => d !== id)
                                    : [...(prev.selectedDifficulties ?? []), id]
                            }))
                        }
                    />
                ))}
            </Stack>

            <Typography variant="subtitle1" gutterBottom>
                Question Count
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {[1, 2, 3].map(id => (
                    <QuizFiltersChip
                        key={id}
                        label={["Short", "Medium", "Long"][id - 1]}
                        selected={filters.selectedLengths.includes(id)}
                        onClick={() =>
                            setFilters((prev: ExploreFilters) => ({
                                ...prev,
                                selectedLengths: (prev.selectedLengths ?? []).includes(id)
                                    ? (prev.selectedLengths ?? []).filter((l: number) => l !== id)
                                    : [...(prev.selectedLengths ?? []), id]
                            }))
                        }
                    />
                ))}
            </Stack>

            <Typography variant="subtitle1" gutterBottom>
                Rating
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {[1, 2, 3].map(id => (
                    <QuizFiltersChip
                        key={id}
                        label={["4+", "3+", "2+"][id - 1]}
                        selected={filters.selectedRatings === id}
                        onClick={() =>
                            setFilters((prev: ExploreFilters) => ({
                                ...prev,
                                selectedRatings: prev.selectedRatings === id ? null : id
                            }))
                        }
                    />
                ))}
            </Stack>

            <Divider sx={{ my: 3, mb: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
                Sorting
            </Typography>
            <Stack direction="row" spacing={2}>
                {sortOptions.map(option => (
                    <QuizFiltersChip
                        key={option}
                        label={option}
                        selected={filters.sortBy === option.toLowerCase()}
                        onClick={() => setFilters((prev: ExploreFilters) => ({ ...prev, sortBy: option.toLowerCase() }))}
                    />
                ))}
            </Stack>

            <Divider sx={{ my: 3, mb: 2 }} />

            <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Show only unanswered quizzes</Typography>
                    <QuizFiltersToggle
                        checked={!filters.includeAnswered}
                        onChange={() =>
                            setFilters((prev: ExploreFilters) => ({ ...prev, includeAnswered: !prev.includeAnswered }))
                        }
                    />
                </Stack>
            </Box>
        </QuizFiltersWrapper>
    );
};

export default QuizFiltersPanel;