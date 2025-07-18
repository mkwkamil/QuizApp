import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { QuizHeaderBox, QuizImage, StartQuizButton } from "./StyledQuizPageComponents";

export default function QuizHeader({ quizData }) {
    return (
        <QuizHeaderBox>
            <QuizImage sx={{ backgroundImage: `url(${quizData.thumbnailUrl})` }} />
            <Stack flex={1} justifyContent="space-between">
                <div>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {quizData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {quizData.description}
                    </Typography>
                </div>
                <Link to={`/quiz/${quizData.id}/play`}>
                    <StartQuizButton fullWidth>
                        Start Quiz
                    </StartQuizButton>
                </Link>
            </Stack>
        </QuizHeaderBox>
    );
}