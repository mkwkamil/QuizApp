import {CustomSwitch, FiltersBox, FiltersButton} from "./StyledExploreComponents";
import {Box, Divider, Stack, Typography, Switch} from "@mui/material";

function FiltersCard({ sortBy, setSortBy, includeAnswered, setIncludeAnswered }) {
    const filterSections = [
        {
            title: "Difficulty",
            options: ["Easy", "Medium", "Hard", "Expert"]
        },
        {
            title: "Question Count",
            options: ["Short", "Medium", "Long"]
        },
        {
            title: "Rating",
            options: ["4+", "3+", "2+"]
        }
    ];
    const sortOptions = ["Popular", "Recent", "Trending"];
    return (
        <FiltersBox>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Stack spacing={2}>
                    {filterSections.map(section => (
                        <Box key={section.title}>
                            <Typography variant="subtitle1" gutterBottom>
                                {section.title}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {section.options.map(option => (
                                    <FiltersButton
                                        key={option}
                                        label={option}
                                        selected={false}
                                        onClick={() => {}}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Box>
            <Divider sx={{ my: 3, mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
                Sorting
            </Typography>
            <Stack direction="row" spacing={2}>
                {sortOptions.map(option => (
                    <FiltersButton
                        key={option}
                        label={option}
                        selected={sortBy === option.toLowerCase()}
                        onClick={() => setSortBy(option.toLowerCase())}
                    />
                ))}
            </Stack>
            <Divider sx={{ my: 3, mb: 2 }} />
            <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Show only unanswered quizzes</Typography>
                    <CustomSwitch
                        checked={!includeAnswered}
                        onChange={() => setIncludeAnswered(prev => !prev)}
                    />
                </Stack>
            </Box>
        </FiltersBox>
    )
}

export default FiltersCard;