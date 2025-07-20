import { Stack } from "@mui/material";
import { QuizSolveNextButton, QuizSolvePrevButton } from "@components/quiz/solve/styles/QuizSolvePageLayout";

interface QuizNavigationHeaderProps {
    current: number;
    total: number;
    setCurrent: (value: number) => void;
}

const QuizNavigationHeader = ({ current, total, setCurrent }: QuizNavigationHeaderProps) => {
    const handlePrev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    const handleNext = () => {
        if (current < total - 1) setCurrent(current + 1);
    };

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <QuizSolvePrevButton onClick={handlePrev} disabled={current === 0}>
                Previous
            </QuizSolvePrevButton>
            <QuizSolveNextButton onClick={handleNext} disabled={current === total - 1}>
                Next
            </QuizSolveNextButton>
        </Stack>
    );
}

export default QuizNavigationHeader;