import { Typography, Chip, Box } from "@mui/material";

export default function QuestionHeader({ questionIndex, question }) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h6" fontWeight={700}>
                {questionIndex + 1}. {question.text}
            </Typography>
            <Chip
                label={
                    question.type === "multiple" ? "Multiple Choice" :
                        question.type === "truefalse" ? "True/False" : "Single Choice"
                }
                size="small"
                color={
                    question.type === "multiple"
                        ? "error"
                        : question.type === "truefalse"
                            ? "success"
                            : "secondary"
                }
                variant="outlined"
            />
        </Box>
    );
}