import { Stack, Typography } from "@mui/material";
import { RatingBarBackground, RatingBarFill } from "./StyledQuizPageComponents";
import StarIcon from "@mui/icons-material/Star";

export default function RatingBar({ stars, count, total }) {
    const percent = total ? (count / total) * 100 : 0;

    return (
        <Stack direction="row" alignItems="center" spacing={1} paddingLeft={1}>
            <Typography sx={{ width: 12, textAlign: "center" }}>{stars}</Typography>
            <StarIcon sx={{ fontSize: 16, color: "#facc15", mt: "1px" }} />
            <RatingBarBackground>
                <RatingBarFill percent={percent} />
            </RatingBarBackground>
            <Typography variant="body2" sx={{ minWidth: 40 }}>({count})</Typography>
        </Stack>
    );
}