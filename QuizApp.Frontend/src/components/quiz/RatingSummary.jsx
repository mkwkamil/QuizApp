import { Typography, Stack } from "@mui/material";
import { SidebarCard } from "./StyledQuizPageComponents";
import RatingBar from "./RatingBar";
import {useRatingSummary} from "../../hooks/ratings/useRatingSummary";

export default function RatingSummary({ quizId}) {
    const { data: ratingSummary, isLoading } = useRatingSummary(quizId);

    if (isLoading || !ratingSummary) return null;
    
    const {average, breakdown} = ratingSummary;
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return (
        <SidebarCard>
            <Typography variant="h6">User Ratings</Typography>
            <Typography variant="h4" my={1} fontWeight={700}>{average.toFixed(1)}</Typography>
            <Stack spacing={1}>
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