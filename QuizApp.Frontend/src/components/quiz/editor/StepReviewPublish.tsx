import {Box, Typography, Divider, Stack, AccordionSummary, AccordionDetails, Tooltip} from "@mui/material";
import { useQuizStore } from "@store/quiz/quizStore";
import { useCreateQuiz } from "@hooks/quizzes/mutation/useCreateQuiz";
import { useUpdateQuiz } from "@hooks/quizzes/mutation/useUpdateQuiz";
import { SectionTitle, StepContainer, StyledQuizBackButton, StyledQuizNextButton } from "@components/quiz/editor/styles/QuizEditorLayout.ts";
import { useUploadThumbnail } from "@hooks/quizzes/mutation/useUploadThumbnail.ts";
import {
    ReviewAccordion,
    ReviewHeader,
    ReviewHeaderChip,
    ReviewHeaderText,
    ReviewImageBox,
    ReviewPaperBox, ReviewSettingsChip
} from "@components/quiz/editor/styles/StepReviewPublishLayout.ts";
import { useCategories } from "@hooks/meta/useCategories.ts";
import { useDifficulties } from "@hooks/meta/useDifficulties.ts";
import Loading from "@components/common/Loading.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Reorder from "@mui/icons-material/Reorder";
import QuestionResultCard from "@components/quiz/editor/QuestionResultCard.tsx";

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

    const finalThumbnailUrl = basicInfo.thumbnailUrl?.trim()
        || (thumbnailFile ? URL.createObjectURL(thumbnailFile) : `${window.location.origin}/thumbnails/default.png`);

    const handlePublish = async () => {
        const thumbnailUrl = thumbnailFile
            ? await uploadThumbnail(thumbnailFile)
            : (basicInfo.thumbnailUrl?.trim() || null);

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

    if (!categories || !difficulties) return <Loading />;

    const category = categories.find(c => c.id === basicInfo.categoryId);
    const difficulty = difficulties.find(c => c.id === basicInfo.difficultyId);

    return (
        <StepContainer>
            <SectionTitle variant="h3">Final review</SectionTitle>

            <ReviewHeader>
                <ReviewImageBox sx={{ backgroundImage: `url(${finalThumbnailUrl})` }} />
                <Stack flex={1} spacing={2} justifyContent="space-between">
                    <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                        <Box>
                            <ReviewHeaderText variant="h4">
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

            <Box display="flex" mb={2} mt={1.5} justifyContent="center" gap={3}>
                <Tooltip title="This quiz will be visible to everyone" arrow>
                    <ReviewSettingsChip
                        label={`Public: ${basicInfo.isPublic ? "Yes" : "No"}`}
                        value={basicInfo.isPublic}
                    />
                </Tooltip>

                <Tooltip title="Questions will appear in random order each time" arrow>
                    <ReviewSettingsChip
                        label={`Shuffle Questions: ${basicInfo.shuffleQuestions ? "Yes" : "No"}`}
                        value={basicInfo.shuffleQuestions}
                    />
                </Tooltip>

                <Tooltip title="Correct answers will be shown after submission" arrow>
                    <ReviewSettingsChip
                        label={`Reveal Answers: ${basicInfo.revealAnswers ? "Yes" : "No"}`}
                        value={basicInfo.revealAnswers}
                    />
                </Tooltip>
            </Box>

            <ReviewPaperBox>
                <ReviewAccordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
                        <Typography variant="h5" display="flex" alignItems="center">
                            <Reorder sx={{ mr: 1.5 }} />
                            Questions ({questions.length})
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 3, pb: 1 }}>
                        <Divider sx={{ mb: 3 }} />
                        {questions.length > 0 ? (
                            questions.map((q, index) => (
                                <QuestionResultCard key={index} index={index} q={q} />
                            ))
                        ) : (
                            <Typography color="text.secondary" textAlign="center" py={4}>
                                No questions added.
                            </Typography>
                        )}
                    </AccordionDetails>
                </ReviewAccordion>
            </ReviewPaperBox>

            <Box display="flex" justifyContent="space-between" mt={4}>
                <StyledQuizBackButton onClick={onBack}>
                    Back to Questions
                </StyledQuizBackButton>

                <StyledQuizNextButton onClick={handlePublish} disabled={updatePending || createPending}>
                    {(quizId && !basicInfo.isDraft)
                        ? updatePending ? "Updating..." : "Update Quiz"
                        : createPending ? "Publishing..." : "Publish Quiz"}
                </StyledQuizNextButton>
            </Box>
        </StepContainer>
    );
};

export default StepReviewPublish;