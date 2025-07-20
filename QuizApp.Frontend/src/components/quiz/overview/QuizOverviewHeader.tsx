import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
    QuizOverviewHeaderContainer,
    QuizOverviewImageBox,
    QuizOverviewStartButton
} from "@components/quiz/overview/styles/QuizOverviewHeaderLayout";

interface QuizOverviewHeaderProps {
    quizData: {
        id: number;
        title: string;
        description: string;
        thumbnailUrl: string;
    };
}

export default function QuizOverviewHeader({ quizData }: QuizOverviewHeaderProps) {
    return (
        <QuizOverviewHeaderContainer>
            <QuizOverviewImageBox sx={{ backgroundImage: `url(${quizData.thumbnailUrl})` }} />
            <Stack flex={1} justifyContent="space-between">
                <div>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {quizData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {quizData.description}
                    </Typography>
                </div>
                <Link to={`/quiz/${quizData.id}/solve`}>
                    <QuizOverviewStartButton fullWidth>
                        Start Quiz
                    </QuizOverviewStartButton>
                </Link>
            </Stack>
        </QuizOverviewHeaderContainer>
    );
}