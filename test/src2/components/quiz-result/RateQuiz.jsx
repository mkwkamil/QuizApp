import { Typography, Stack, Divider } from "@mui/material";
import { Star } from "@mui/icons-material";
import {SidebarCard} from "../quiz/StyledQuizPageComponents";
import {useQuizRating} from "../../hooks/ratings/useQuizRating";

export default function RateQuiz({ quizId }) {
    const {
        hovered,
        selected,
        handleMouseEnter,
        handleMouseLeave,
        handleClick
    } = useQuizRating({ quizId });

    return (
        <SidebarCard>
            <Typography variant="h6" fontWeight="600" gutterBottom>
                Rate this quiz
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(star)}
                        sx={{
                            color: (hovered || selected) >= star ? "#facc15" : "#555",
                            cursor: "pointer",
                            fontSize: 40,
                            transition: "color 0.2s",
                        }}
                    />
                ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="caption" color="text.secondary" justifyContent="center" display="flex">
                Your feedback helps us improve!
            </Typography>
        </SidebarCard>
    );
}

