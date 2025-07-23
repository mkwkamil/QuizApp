import {
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    FormControl,
    InputLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Radio,
    Select,
    Stack,
    TextField,
    Typography, OutlinedInput,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEditableQuestions} from "@hooks/quizzes/mutation/useEditableQuestions.ts";
import {
    SectionTitle, StepContainer,
    StyledDraftButton,
    StyledQuizBackButton,
    StyledQuizNextButton
} from "@components/quiz/editor/styles/QuizEditorLayout.ts";
import {
    AddOptionButton,
    AddQuestionButton, EmptyQuestionBox,
    QuestionAccordion,
    QuestionAddBox
} from "@components/quiz/editor/styles/StepQuestionsLayout.ts";

const QUESTION_TYPES = [
    { value: "single", label: "Single Choice" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "truefalse", label: "True/False" },
];

type StepQuestionsProps = {
    onBack: () => void;
    onComplete: () => void;
};

const StepQuestions = ({ onBack, onComplete }: StepQuestionsProps) => {
    const {
        questions,
        expandedId,
        handleAccordionToggle,
        addNewQuestion,
        handleQuestionFieldChange,
        handleOptionChange,
        addOption,
        removeOption,
        handleCorrectAnswerChange,
        deleteQuestion,
    } = useEditableQuestions();

    const renderAnswerInput = (q: any, i: number) => {
        const Comp = q.type === "multiple" ? Checkbox : Radio;
        return (
            <Comp
                checked={q.correctAnswers.includes(i)}
                onChange={(e) => handleCorrectAnswerChange(q.id, i, e.target.checked)}
            />
        );
    };

    const renderOptionField = (q: any, opt: string, i: number) => (
        <OutlinedInput
            value={opt}
            onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
            fullWidth
            required
            endAdornment={
                q.type !== "truefalse" && q.options.length > 2 ? (
                    <InputAdornment position="end">
                        <IconButton onClick={() => removeOption(q.id, i)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ) : null
            }
        />
    );

    const handleSubmit = () => {
        const isValid = questions.every(
            (q) =>
                q.text.trim() &&
                q.options.length >= 2 &&
                q.options.every((o) => o.trim()) &&
                q.correctAnswers.length > 0
        );

        if (!isValid) {
            alert("Please complete all questions correctly before proceeding.");
            return;
        }

        onComplete();
    };

    return (
        <StepContainer>
            <SectionTitle variant="h3">
                Add Questions
            </SectionTitle>

            <QuestionAddBox>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", fontWeight: 600}}>Total questions: {questions.length}</Typography>
                <AddQuestionButton variant="contained" startIcon={<AddIcon />} onClick={addNewQuestion}>
                    Add Question
                </AddQuestionButton>
            </QuestionAddBox>

            {questions.length === 0 && (
                <EmptyQuestionBox>
                    <Typography variant="body1" color="text.secondary">
                        No questions yet. Add one to begin.
                    </Typography>
                </EmptyQuestionBox>
            )}

            {questions.map((q) => (
                <Box display="flex" alignItems="center" key={q.id} paddingY={1}>
                    <DragIndicatorIcon sx={{ color: "#777", cursor: "grab", mr: 2, mb: "4px" }} />
                    <QuestionAccordion expanded={expandedId === q.id} onChange={() => handleAccordionToggle(q.id!)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${q.id}-content`} id={`${q.id}-header`}>
                            <Typography fontWeight={600} flex={1}>{q.text || "New Question"}</Typography>
                        </AccordionSummary>
                        
                        <AccordionDetails>
                            <Stack spacing={3}>
                                <TextField
                                    label="Question Text"
                                    value={q.text}
                                    onChange={(e) => handleQuestionFieldChange(q.id!, "text", e.target.value)}
                                    fullWidth
                                    required
                                />

                                <FormControl fullWidth>
                                    <InputLabel>Question Type</InputLabel>
                                    <Select
                                        variant="outlined"
                                        value={q.type}
                                        label="Question Type"
                                        onChange={(e) => handleQuestionFieldChange(q.id!, "type", e.target.value)}
                                    >
                                        {QUESTION_TYPES.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Box>
                                    <FormLabel>Options</FormLabel>
                                    <Stack spacing={2} mt={1}>
                                        {q.options.map((opt, i) => (
                                            <Box key={i} display="flex" alignItems="center" gap={1}>
                                                {renderAnswerInput(q, i)}
                                                {renderOptionField(q, opt, i)}
                                            </Box>
                                        ))}
                                        {q.type !== "truefalse" && q.options.length < 6 && (
                                            <AddOptionButton startIcon={<AddIcon />} onClick={() => addOption(q.id!)}>
                                                Add Option
                                            </AddOptionButton>
                                        )}
                                    </Stack>
                                </Box>
                            </Stack>
                        </AccordionDetails>
                    </QuestionAccordion>
                    <DeleteIcon color="error" sx={{ ml: 2, cursor: "pointer" }} onClick={(e) => {
                        e.stopPropagation();
                        deleteQuestion(q.id!);
                    }} />
                </Box>
            ))}

            <Box mt={4} display="flex" flexDirection="column" gap={2} alignItems="center">
                <StyledQuizNextButton fullWidth onClick={handleSubmit}>
                    Next Step
                </StyledQuizNextButton>
                <Box display="flex" gap={2} width="100%">
                    <StyledQuizBackButton fullWidth onClick={onBack}>Back</StyledQuizBackButton>
                    <StyledDraftButton fullWidth>Save Draft</StyledDraftButton>
                </Box>
            </Box>
        </StepContainer>
    );
};

export default StepQuestions;