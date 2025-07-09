import { Stack, Typography } from "@mui/material";
import { RatingBarBackground, RatingBarFill } from "./StyledQuizPageComponents";

export default function RatingBar({ stars, count, total }) {
    const percent = total ? (count / total) * 100 : 0;

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ width: 24 }}>{stars}★</Typography>
            <RatingBarBackground>
                <RatingBarFill percent={percent} />
            </RatingBarBackground>
            <Typography variant="body2" sx={{ minWidth: 40 }}>({count})</Typography>
        </Stack>
    );
}