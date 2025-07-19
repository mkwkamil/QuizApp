import { Typography, Stack, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { ResultBox, TryAgainButton, ExploreButton} from "./StyledQuizResultComponents";

export default function QuizResultCard({ correctAnswers, totalQuestions, percentage, formattedTime }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const passed = percentage >= 50;

    return (
        <ResultBox passed={passed}>
            <Box display="flex" justifyContent="center" mb={2}>
                {passed ? <EmojiEventsIcon sx={{ fontSize: 56 }} /> : <SentimentDissatisfiedIcon sx={{ fontSize: 56 }} />}
            </Box>

            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {passed ? "Congratulations!" : "Better luck next time!"}
            </Typography>

            <Typography variant="h6" mt={2}>
                You scored {correctAnswers} out of {totalQuestions}
            </Typography>

            <Typography variant="h5" mt={1}>
                {percentage}%
            </Typography>

            <Typography variant="body1" mt={1}>
                Time taken: {formattedTime}
            </Typography>

            <Stack direction="row" spacing={3} justifyContent="center" mt={5}>
                <TryAgainButton onClick={() => navigate(`/quiz/${id}/play`)}>
                    Try Again
                </TryAgainButton>
                <ExploreButton onClick={() => navigate("/explore")}>
                    Find More Quizzes
                </ExploreButton>
            </Stack>
        </ResultBox>
    );
}