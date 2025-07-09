import { Typography, Stack } from "@mui/material";
import { QuizHeaderBox, QuizImage, StartQuizButton } from "./StyledQuizPageComponents";

export default function QuizHeader({ quiz, mock }) {
    return (
        <QuizHeaderBox>
            <QuizImage sx={{ backgroundImage: `url(${quiz.thumbnailUrl})` }} />
            <Stack flex={1} justifyContent="space-between">
                <div>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {quiz.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {quiz.description}
                    </Typography>
                </div>
                <StartQuizButton>Start Quiz</StartQuizButton>
            </Stack>
        </QuizHeaderBox>
    );
}