import {FiltersBox, FiltersButton} from "./StyledExploreComponents";
import {Box, Divider, Stack, Typography} from "@mui/material";

function FiltersCard({ sortBy, setSortBy, includeAnswered, setIncludeAnswered }) {

    return (
        <FiltersBox>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>
            <Box sx={{ height: 200, bgcolor: '#333', borderRadius: 2 }} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
                Other Filters
            </Typography>
            <Stack direction="column" spacing={2} sx={{ flexWrap: 'wrap', height: 80 }}>
                <Stack direction="row" spacing={2}>
                    <FiltersButton
                        label="Popular"
                        selected={sortBy === "popular"}
                        onClick={() => setSortBy("popular")}
                    />
                    <FiltersButton
                        label="Recent"
                        selected={sortBy === "recent"}
                        onClick={() => setSortBy("recent")}
                    />
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FiltersButton
                        label="Trending"
                        selected={sortBy === "trending"}
                        onClick={() => setSortBy("trending")}
                    />
                    <FiltersButton
                        label="Unanswered"
                        selected={!includeAnswered}
                        onClick={() => setIncludeAnswered(!includeAnswered)}
                    />
                </Stack>
            </Stack>
        </FiltersBox>
    )
}

export default FiltersCard;