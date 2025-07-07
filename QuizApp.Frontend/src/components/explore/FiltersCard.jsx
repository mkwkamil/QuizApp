import {CustomSwitch, FiltersBox, FiltersButton} from "./StyledExploreComponents";
import {Box, Divider, Stack, Typography} from "@mui/material";

function FiltersCard({ filters, setFilters }) {
    const sortOptions = ["Popular", "Recent", "Trending"];
    return (
        <FiltersBox>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
                Difficulty
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {[1, 2, 3, 4].map(id => (
                    <FiltersButton
                        key={id}
                        label={["Easy", "Medium", "Hard", "Expert"][id - 1]}
                        selected={filters.selectedDifficulties.includes(id)}
                        onClick={() =>
                            setFilters(prev => ({
                                ...prev,
                                selectedDifficulties: prev.selectedDifficulties.includes(id)
                                    ? prev.selectedDifficulties.filter(d => d !== id)
                                    : [...prev.selectedDifficulties, id]
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
                    <FiltersButton
                        key={id}
                        label={["Short", "Medium", "Long"][id - 1]}
                        selected={filters.selectedLengths.includes(id)}
                        onClick={() =>
                            setFilters(prev => ({
                                ...prev,
                                selectedLengths: prev.selectedLengths.includes(id)
                                    ? prev.selectedLengths.filter(l => l !== id)
                                    : [...prev.selectedLengths, id]
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
                    <FiltersButton
                        key={id}
                        label={["4+", "3+", "2+"][id - 1]}
                        selected={filters.selectedRatings === id}
                        onClick={() =>
                            setFilters(prev => ({
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
                    <FiltersButton
                        key={option}
                        label={option}
                        selected={filters.sortBy === option.toLowerCase()}
                        onClick={() => setFilters(prev => ({ ...prev, sortBy: option.toLowerCase() }))}
                    />
                ))}
            </Stack>
            <Divider sx={{ my: 3, mb: 2 }} />
            <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Show only unanswered quizzes</Typography>
                    <CustomSwitch
                        checked={!filters.includeAnswered}
                        onChange={() => setFilters(prev => ({ ...prev, includeAnswered: !prev.includeAnswered }))}
                    />
                </Stack>
            </Box>
        </FiltersBox>
    )
}

export default FiltersCard;