import { Typography, Chip, Box } from "@mui/material";
import type { SolveQuestion } from "@interfaces/quizzes";

interface QuizSolveHeaderProps {
    questionIndex: number;
    question: SolveQuestion;
}

const QuizSolveHeader = ({ questionIndex, question }: QuizSolveHeaderProps) => {
    const label =
        question.type === "multiple"
            ? "Multiple Choice"
            : question.type === "truefalse"
                ? "True/False"
                : "Single Choice";
    
    const color =
        question.type === "multiple"
            ? "error"
            : question.type === "truefalse"
                ? "success"
                : "secondary";

    return (
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Typography variant="h6" fontWeight={700}>
                {questionIndex + 1}. {question.text}
            </Typography>
            <Chip label={label} size="small" color={color} variant="outlined" />
        </Box>
    );
};

export default QuizSolveHeader;