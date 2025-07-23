import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText, Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useQuizStore } from "@store/quiz/quizStore";
import { useCreateQuiz } from "@hooks/quizzes/mutation/useCreateQuiz";
import { useUpdateQuiz } from "@hooks/quizzes/mutation/useUpdateQuiz";
import {
    SectionTitle, StepContainer,
    StyledQuizBackButton,
    StyledQuizNextButton
} from "@components/quiz/editor/styles/QuizEditorLayout.ts";
import {useUploadThumbnail} from "@hooks/quizzes/mutation/useUploadThumbnail.ts";
import {
    ReviewHeader,
    ReviewHeaderChip, ReviewHeaderText,
    ReviewImageBox
} from "@components/quiz/editor/styles/StepReviewPublishLayout.ts";
import {useCategories} from "@hooks/meta/useCategories.ts";
import {useDifficulties} from "@hooks/meta/useDifficulties.ts";
import Loading from "@components/common/Loading.tsx";

type StepReviewPublishProps = {
    onBack: () => void;
};

const StepReviewPublish = ({ onBack }: StepReviewPublishProps) => {
    const { basicInfo, questions, quizId, thumbnailFile, reset } = useQuizStore();
    const { mutateAsync: createQuiz, isPending: createPending } = useCreateQuiz();
    const { mutateAsync: updateQuiz, isPending: updatePending } = useUpdateQuiz();
    const { mutateAsync: uploadThumbnail } = useUploadThumbnail();
    const { data: categories } = useCategories();
    const { data: difficulties } = useDifficulties();

    if (!basicInfo.thumbnailUrl && !thumbnailFile) {
        basicInfo.thumbnailUrl = `${window.location.origin}/thumbnails/default-thumb.png`;
    }
    
    const handlePublish = async () => {
        const thumbnailUrl = await uploadThumbnail(thumbnailFile ?? undefined);
        
        const payload = {
            ...basicInfo,
            thumbnailUrl,
            categoryId: basicInfo.categoryId!,
            difficultyId: basicInfo.difficultyId!,
            questions,
        };
        
        if (quizId) {
            await updateQuiz({ quizId, payload });
        } else {
            await createQuiz(payload);
        }

        reset();
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

    if (!categories || !difficulties) return <Loading />;
    
    const category = categories.find(c => c.id === basicInfo.categoryId);
    const difficulty = difficulties.find(c => c.id === basicInfo.difficultyId);
    
    return (
        <StepContainer>
            <SectionTitle variant="h3">
                Final review
            </SectionTitle>
            
            <Divider sx={{ mb: 4 }} />

            <ReviewHeader>
                <ReviewImageBox sx={{ backgroundImage: `url(${basicInfo.thumbnailUrl})` }} />
                <Stack flex={1} spacing={2} justifyContent="space-between">
                    <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                        <Box>
                            <ReviewHeaderText variant="h4" fontWeight={700}>
                                {basicInfo.title}
                            </ReviewHeaderText>
                            <ReviewHeaderText variant="body1" color="text.secondary">
                                {basicInfo.description}
                            </ReviewHeaderText>
                        </Box>
                    </Box>
                    <Divider />
                    <Box display="flex" gap={2}>
                        <ReviewHeaderChip
                            label={`Category: ${category?.name ?? "None"}`}
                            sx={{ backgroundColor: "rgba(0, 123, 255, 0.1)" }}
                        />
                        <ReviewHeaderChip
                            label={`Difficulty: ${difficulty?.name ?? "None"}`}
                            sx={{ backgroundColor: "rgba(40, 167, 69, 0.1)" }}
                        />
                    </Box>
                </Stack>
            </ReviewHeader>

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
                <StyledQuizBackButton onClick={onBack}>
                    Back to Questions
                </StyledQuizBackButton>

                <StyledQuizNextButton onClick={handlePublish} disabled={updatePending || createPending}>
                    {quizId 
                        ? updatePending ? "Updating..." : "Update Quiz"
                        : createPending ? "Publishing..." : "Publish Quiz"}
                </StyledQuizNextButton>
            </Box>
        </StepContainer>
    );
};

export default StepReviewPublish;