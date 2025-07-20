import { Typography, Stack, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import {
    QuizExploreButton,
    QuizResultSummaryBox,
    QuizRetryButton
} from "@components/quiz/result/QuizResultPageLayout.ts";

interface QuizResultProps {
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
    formattedTime: string;
}

const QuizResultSummaryCard = ({ correctAnswers, totalQuestions, percentage, formattedTime }: QuizResultProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const passed = percentage >= 50;

    return (
        <QuizResultSummaryBox passed={passed}>
            <Box display="flex" justifyContent="center" mb={2}>
                {passed ? (
                    <EmojiEventsIcon sx={{ fontSize: 56 }} />
                ) : (
                    <SentimentDissatisfiedIcon sx={{ fontSize: 56 }} />
                )}
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
                <QuizRetryButton onClick={() => navigate(`/quiz/${id}/play`)}>
                    Try Again
                </QuizRetryButton>
                <QuizExploreButton onClick={() => navigate("/explore")}>
                    Find More Quizzes
                </QuizExploreButton>
            </Stack>
        </QuizResultSummaryBox>
    );
};

export default QuizResultSummaryCard;