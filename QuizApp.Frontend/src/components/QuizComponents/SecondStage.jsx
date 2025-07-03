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
    Typography
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useQuizStore} from "../../store/quizStore";
import {StyledCancelButton, StyledDraftButton, StyledQuizBackButton, StyledQuizNextButton} from "../StyledButtons";

const QUESTION_TYPES = [
    { value: 'single', label: 'Single Choice' },
    { value: 'multiple', label: 'Multiple Choice' },
    { value: 'truefalse', label: 'True/False' }
];

const INITIAL_QUESTION = {
    text: "",
    type: "single",
    options: ["", ""],
    correctAnswers: []
};

function SecondStage({ onBack, onComplete }) {
    const { questions, setQuestions } = useQuizStore();
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    const addNewQuestion = () => {
        const newQuestion = {
            ...INITIAL_QUESTION,
            id: `q${Date.now()}`
        };
        setQuestions([...questions, newQuestion]);
        setExpanded(newQuestion.id);
    };
    
    const updateQuestion = (id, updates) => {
        setQuestions(questions.map(q => 
            q.id === id ? { ...q, ...updates} : q
        ));
    }
    
    const handleQuestionChange = (id, field, value) => {
        if (field === 'type') {
            const updates = { type: value };

            if (value === 'truefalse') {
                updates.options = ['True', 'False'];
                updates.correctAnswers = [];
            } else if (value === 'single') {
                updates.correctAnswers = questions.find(q => q.id === id)?.correctAnswers.slice(0, 1) || [];
            } else if (questions.find(q => q.id === id)?.type === 'truefalse') {
                updates.options = ['', ''];
            }

            updateQuestion(id, updates);
        } else {
            updateQuestion(id, { [field]: value });
        }
    };
    
    const handleOptionChange = (questionId, index, value) => {
        setQuestions(questions.map(q => {
            if (q.id !== questionId) return q;

            const newOptions = [...q.options];
            newOptions[index] = value;
            return { ...q, options: newOptions };
        }));
    };

    const addOption = (questionId) => {
        setQuestions(questions.map(q =>
            q.id === questionId && q.options.length < 6
                ? { ...q, options: [...q.options, ''] }
                : q
        ));
    };

    const removeOption = (questionId, index) => {
        setQuestions(questions.map(q => {
            if (q.id !== questionId) return q;

            const newOptions = q.options.filter((_, i) => i !== index);
            const newCorrectAnswers = q.correctAnswers
                .filter(ans => ans !== index)
                .map(ans => ans > index ? ans - 1 : ans);

            return { ...q, options: newOptions, correctAnswers: newCorrectAnswers };
        }));
    };

    const handleCorrectAnswer = (questionId, index, checked) => {
        setQuestions(questions.map(q => {
            if (q.id !== questionId) return q;
            
            if (q.type === 'truefalse') {
                return { ...q, correctAnswers: [index] }
            }
            
            if (q.type === 'single') {
                return { ...q, correctAnswers: checked ? [index] : [] };
            }

            return {
                ...q,
                correctAnswers: checked
                    ? [...q.correctAnswers, index]
                    : q.correctAnswers.filter(i => i !== index)
            };
        }));
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
        if (expanded === id) setExpanded(null);
    };

    const renderAnswerInput = (question, index) => {
        const InputComponent = question.type === 'multiple' ? Checkbox : Radio;
        return (
            <InputComponent
                checked={question.correctAnswers.includes(index)}
                onChange={(e) => handleCorrectAnswer(question.id, index, e.target.checked)}
            />
        );
    };

    const renderOptionField = (question, option, index) => (
        <TextField
            value={option}
            onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
            fullWidth
            required
            slotProps={{
                endAdornment: question.type !== 'truefalse' && (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => removeOption(question.id, index)}
                            disabled={question.options.length <= 2}
                            edge="end"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );

    const handleSubmit = () => {
        const allValid = questions.every(q =>
            q.text.trim() !== "" &&
            q.options.length >= 2 &&
            q.options.every(opt => opt.trim() !== "") &&
            q.correctAnswers.length > 0
        );

        if (!allValid) {
            alert("Please complete all questions, provide at least 2 options and select correct answers.");
            return;
        }

        console.log("Questions to submit:", questions);
        onComplete();
    };
    
    const handleDraft = () => {

        console.log("Saving draft with questions:", questions);
    }

    return (
        <Box sx={{ p: 4, width: '80%', mx: 'auto' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Add Questions
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total questions: {questions.length}</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={addNewQuestion}>
                    Add Question
                </Button>
            </Box>

            {questions.length === 0 && (
                <Box sx={{
                    textAlign: 'center',
                    p: 4,
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    mb: 4
                }}>
                    <Typography variant="body1" color="text.secondary">
                        No questions added yet. Click the button above to add your first question.
                    </Typography>
                </Box>
            )}

            {questions.map((question) => (
                <Accordion key={question.id} expanded={expanded === question.id} onChange={handleAccordionChange(question.id)} sx={{ mb: 2 }}>
                    <AccordionSummary
                        expandIcon={
                            <IconButton
                                component="div"
                                onClick={(e) => e.stopPropagation()}
                                size="small"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        }
                    >
                        <Typography sx={{ flex: 1 }}>
                            {question.text || 'New Question'}
                        </Typography>
                        <IconButton
                            component="div"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteQuestion(question.id);
                            }}
                            sx={{ ml: 1 }}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Stack spacing={3}>
                            <TextField label="Question Text" value={question.text} onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)} fullWidth required/>

                            <FormControl fullWidth>
                                <InputLabel>Question Type</InputLabel>
                                <Select variant="outlined"
                                    value={question.type}
                                    onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                                    label="Question Type"
                                >
                                    {QUESTION_TYPES.map(type => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box>
                                <FormLabel component="legend">Options</FormLabel>
                                <Stack spacing={2} sx={{ mt: 1 }}>
                                    {question.options.map((option, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {renderAnswerInput(question, index)}
                                            {renderOptionField(question, option, index)}
                                        </Box>
                                    ))}
                                    {question.type !== 'truefalse' && question.options.length < 6 && (
                                        <Button
                                            startIcon={<AddIcon />}
                                            onClick={() => addOption(question.id)}
                                            sx={{ alignSelf: 'flex-start' }}
                                        >
                                            Add Option
                                        </Button>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
            
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, gap: 2 }}>
                <StyledQuizNextButton fullWidth variant="contained" onClick={handleSubmit}>
                    Next Step
                </StyledQuizNextButton>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, width: "100%" }}>
                    <StyledQuizBackButton fullWidth onClick={onBack} variant="outlined">
                        Back
                    </StyledQuizBackButton>
                    <StyledDraftButton fullWidth variant="contained" onClick={handleDraft}>Save draft</StyledDraftButton>
                </Box>
            </Box>
        </Box>
    );
}

export default SecondStage;