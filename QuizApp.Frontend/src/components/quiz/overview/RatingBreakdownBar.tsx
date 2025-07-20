import { Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

type Props = {
    stars: number;
    count: number;
    total: number;
};

const RatingBreakdownBar = ({ stars, count, total }: Props) => {
    const percent = total ? (count / total) * 100 : 0;

    return (
        <Stack direction="row" alignItems="center" spacing={1} pl={1}>
            <Typography sx={{ width: 12, textAlign: "center" }}>{stars}</Typography>
            <StarIcon sx={{ fontSize: 16, color: "#facc15", mt: "1px" }} />
            <Box sx={{ flex: 1, height: 8, background: "#333", borderRadius: 4, overflow: "hidden" }}>
                <Box sx={{ width: `${percent}%`, height: "100%", background: "#ffd700" }} />
            </Box>
            <Typography variant="body2" sx={{ minWidth: 40 }}>({count})</Typography>
        </Stack>
    );
};

export default RatingBreakdownBar;