import { Typography, Stack } from "@mui/material";
import { SidebarCard } from "./StyledQuizPageComponents";
import RatingBar from "./RatingBar";

export default function RatingSummary({ breakdown, average }) {
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return (
        <SidebarCard>
            <Typography variant="h6" mb={2}>User Ratings</Typography>
            <Typography variant="h4" fontWeight={700}>{average.toFixed(1)}</Typography>
            <Stack spacing={1} mt={2}>
                {[5, 4, 3, 2, 1].map(stars => (
                    <RatingBar
                        key={stars}
                        stars={stars}
                        count={breakdown[stars] || 0}
                        total={total}
                    />
                ))}
            </Stack>
        </SidebarCard>
    );
}