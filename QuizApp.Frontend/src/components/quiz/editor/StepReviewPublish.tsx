import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    Divider,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useQuizStore } from "@store/quiz/quizStore";
import { useCreateQuiz } from "@hooks/quizzes/mutation/useCreateQuiz";
import { useUpdateQuiz } from "@hooks/quizzes/mutation/useUpdateQuiz";
import { useState } from "react";

type StepReviewPublishProps = {
    onBack: () => void;
};

const StepReviewPublish = ({ onBack }: StepReviewPublishProps) => {
    const { basicInfo, questions, quizId, reset } = useQuizStore();
    const { mutateAsync: createQuiz } = useCreateQuiz();
    const { mutateAsync: updateQuiz } = useUpdateQuiz();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handlePublish = async () => {
        setIsSubmitting(true);
        setError("");

        const payload = {
            ...basicInfo,
            categoryId: basicInfo.categoryId!,
            difficultyId: basicInfo.difficultyId!,
            questions,
        };

        try {
            if (quizId) {
                await updateQuiz({ quizId, payload });
            } else {
                await createQuiz(payload);
            }

            reset();
        } catch (err) {
            setError("Failed to publish quiz. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (q: typeof questions[number], index: number) => (
        <Paper key={index} sx={{ p: 3, mb: 3, borderLeft: "4px solid #3f51b5" }}>
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>{index + 1}</Avatar>
                <Typography variant="h6">{q.text}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List dense>
                {q.options.map((opt, i) => (
                    <ListItem
                        key={i}
                        sx={{
                            pl: 4,
                            bgcolor: q.correctAnswers.includes(i)
                                ? "action.hover"
                                : "inherit",
                        }}
                    >
                        {q.correctAnswers.includes(i) ? (
                            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                        ) : (
                            <RadioButtonUncheckedIcon color="disabled" sx={{ mr: 1 }} />
                        )}
                        <ListItemText
                            primary={opt}
                            sx={{
                                textDecoration: q.correctAnswers.includes(i)
                                    ? "underline"
                                    : "none",
                                color: q.correctAnswers.includes(i)
                                    ? "success.main"
                                    : "inherit",
                            }}
                        />
                    </ListItem>
                ))}
            </List>

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Chip
                    label={`Type: ${
                        q.type === "single"
                            ? "Single Choice"
                            : q.type === "multiple"
                                ? "Multiple Choice"
                                : "True/False"
                    }`}
                    variant="outlined"
                />
                <Chip
                    label={`${q.correctAnswers.length} correct answer(s)`}
                    color="success"
                />
            </Box>
        </Paper>
    );

    return (
        <Box sx={{ p: 4, width: "80%", mx: "auto" }}>
            <Typography variant="h3" gutterBottom fontWeight="bold">
                Final Review
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom display="flex" alignItems="center">
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    Quiz Details
                </Typography>

                <Box display="flex" alignItems="center" mb={3}>
                    {basicInfo.thumbnailUrl && (
                        <Avatar
                            src={basicInfo.thumbnailUrl}
                            variant="rounded"
                            sx={{ width: 100, height: 100, mr: 3 }}
                        />
                    )}
                    <Box>
                        <Typography variant="h4">{basicInfo.title}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {basicInfo.description}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" flexWrap="wrap" gap={2}>
                    <Chip
                        label={`Category: ${basicInfo.categoryId ?? "None"}`}
                        variant="outlined"
                    />
                    <Chip
                        label={`Difficulty: ${basicInfo.difficultyId ?? "None"}`}
                        variant="outlined"
                    />
                    <Chip
                        label={basicInfo.isPublic ? "Public" : "Private"}
                        variant="outlined"
                    />
                    <Chip
                        label={
                            basicInfo.revealAnswers
                                ? "Answers visible"
                                : "Answers hidden"
                        }
                        variant="outlined"
                    />
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom display="flex" alignItems="center">
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    Questions ({questions.length})
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {questions.length > 0 ? (
                    questions.map(renderQuestion)
                ) : (
                    <Typography color="text.secondary" textAlign="center" py={4}>
                        No questions added.
                    </Typography>
                )}
            </Paper>

            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                    variant="outlined"
                    onClick={onBack}
                    size="large"
                    sx={{ minWidth: 200 }}
                >
                    Back to Questions
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    size="large"
                    sx={{ minWidth: 200 }}
                >
                    {quizId
                        ? isSubmitting
                            ? "Updating..."
                            : "Update Quiz"
                        : isSubmitting
                            ? "Publishing..."
                            : "Publish Quiz"}
                </Button>
            </Box>

            {error && (
                <Typography color="error" mt={2} textAlign="center">
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default StepReviewPublish;