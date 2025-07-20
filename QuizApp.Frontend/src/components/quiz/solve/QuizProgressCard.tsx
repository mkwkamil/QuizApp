import { Typography } from "@mui/material";
import {
    QuizSolveProgress,
    QuizSolveSidebarCard,
    QuizSubmitButton
} from "@components/quiz/solve/styles/QuizSolvePageLayout";


interface QuizProgressCardProps {
    progress: number;
    current: number;
    total: number;
    time: string;
    onSubmit: () => void;
}

const QuizProgressCard = ({ progress, current, total, time, onSubmit }: QuizProgressCardProps) => {
    return (
        <QuizSolveSidebarCard>
            <Typography variant="h6" fontWeight={700}>Quiz Progress</Typography>
            <Typography variant="body2">Question: {current} / {total}</Typography>
            <Typography variant="body2">Time: {time}</Typography>
            <QuizSolveProgress variant="determinate" value={progress} sx={{ marginY: 1.5 }} />
            <QuizSubmitButton onClick={onSubmit} disabled={progress < 100}>
                Submit Quiz
            </QuizSubmitButton>
        </QuizSolveSidebarCard>
    );
};

export default QuizProgressCard;