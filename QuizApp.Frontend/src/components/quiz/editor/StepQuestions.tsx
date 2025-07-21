import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
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
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEditableQuestions} from "@hooks/quizzes/mutation/useEditableQuestions.ts";
import { StyledDraftButton, StyledQuizBackButton, StyledQuizNextButton} from "@components/quiz/editor/styles/QuizEditorLayout.ts";

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
        <TextField
            value={opt}
            onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
            fullWidth
            required
            InputProps={{
                endAdornment:
                    q.type !== "truefalse" && q.options.length > 2 ? (
                        <InputAdornment position="end">
                            <IconButton onClick={() => removeOption(q.id, i)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
            }}
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
        <Box sx={{ p: 4, width: "80%", mx: "auto" }}>
            <Typography variant="h3" fontWeight={700} mb={3}>
                Add Questions
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">Total questions: {questions.length}</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={addNewQuestion}>
                    Add Question
                </Button>
            </Box>

            {questions.length === 0 && (
                <Box
                    sx={{
                        textAlign: "center",
                        p: 4,
                        border: "2px dashed #ccc",
                        borderRadius: 2,
                        mb: 4,
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        No questions yet. Add one to begin.
                    </Typography>
                </Box>
            )}

            {questions.map((q) => (
                <Accordion
                    key={q.id}
                    expanded={expandedId === q.id}
                    onChange={() => handleAccordionToggle(q.id!)}
                    sx={{ mb: 2, position: 'relative' }} 
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${q.id}-content`}
                        id={`${q.id}-header`}
                    >
                        <Typography flex={1}>{q.text || "New Question"}</Typography>
                    </AccordionSummary>

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteQuestion(q.id!);
                        }}
                        sx={{
                            position: 'absolute',
                            top: 4,
                            right: 8,
                            zIndex: 1,
                        }}
                    >
                        <DeleteIcon color="error" />
                    </IconButton>

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
                                        <Button startIcon={<AddIcon />} onClick={() => addOption(q.id!)}>
                                            Add Option
                                        </Button>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
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
        </Box>
    );
};

export default StepQuestions;