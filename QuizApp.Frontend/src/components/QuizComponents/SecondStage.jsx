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

function SecondStage({ setActiveStep }) {
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    const addNewQuestion = () => {
        const newId = `q${Date.now()}`;
        const newQuestion = {
            id: newId,
            text: "New Question",
            type: "single",
            options: ["Option 1", "Option 2"],
            correctAnswers: []
        };
        setQuestions([...questions, newQuestion]);
        setExpanded(newId);
    };

    const handleQuestionTextChange = (id, text) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, text } : q
        ));
    };

    const handleQuestionTypeChange = (questionId, newType) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const options = newType === "truefalse"
                    ? ["True", "False"]
                    : q.type === "truefalse"
                        ? ["Option 1", "Option 2"]
                        : q.options;

                const correctAnswers = newType === "single"
                    ? q.correctAnswers.slice(0, 1)
                    : newType === "truefalse"
                        ? []
                        : q.correctAnswers;

                return {
                    ...q,
                    type: newType,
                    options,
                    correctAnswers
                };
            }
            return q;
        }));
    };

    const handleOptionChange = (questionId, optionIndex, newValue) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const newOptions = [...q.options];
                newOptions[optionIndex] = newValue;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const addOption = (questionId) => {
        setQuestions(questions.map(q =>
            q.id === questionId && q.options.length < 6
                ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
                : q
        ));
    };

    const removeOption = (questionId, optionIndex) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const newOptions = q.options.filter((_, i) => i !== optionIndex);
                const newCorrectAnswers = q.correctAnswers
                    .filter(ans => ans !== optionIndex)
                    .map(ans => ans > optionIndex ? ans - 1 : ans);
                return { ...q, options: newOptions, correctAnswers: newCorrectAnswers };
            }
            return q;
        }));
    };

    const handleCorrectAnswerChange = (questionId, answerIndex, isChecked) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                if (q.type === "single") {
                    return { ...q, correctAnswers: isChecked ? [answerIndex] : [] };
                } else {
                    const newCorrectAnswers = isChecked
                        ? [...q.correctAnswers, answerIndex]
                        : q.correctAnswers.filter(ans => ans !== answerIndex);
                    return { ...q, correctAnswers: newCorrectAnswers };
                }
            }
            return q;
        }));
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
        if (expanded === id) setExpanded(null);
    };

    const handleSubmit = () => {
        console.log("Questions to submit:", questions);
        setActiveStep(2);
    };

    return (
        <Box component="form" sx={{ padding: 2, width: "80%" }}>
            <Typography variant="h4" component="h1" gutterBottom>Add Questions</Typography>

            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                    Total questions: {questions.length}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addNewQuestion}
                    sx={{
                        background: "linear-gradient(135deg, #0d47a1, #1565c0)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                        }
                    }}
                >
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
                <Accordion
                    key={question.id}
                    expanded={expanded === question.id}
                    onChange={handleAccordionChange(question.id)}
                    sx={{ mb: 2 }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ flex: 1 }}>
                            {question.text || "New Question"}
                        </Typography>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteQuestion(question.id);
                            }}
                            sx={{ mr: 1 }}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Stack spacing={3}>
                            <TextField
                                label="Question Text"
                                value={question.text}
                                onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                                fullWidth
                                required
                            />

                            <FormControl fullWidth>
                                <InputLabel>Question Type</InputLabel>
                                <Select variant="outlined"
                                    value={question.type}
                                    onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
                                    label="Question Type"
                                >
                                    <MenuItem value="single">Single Choice</MenuItem>
                                    <MenuItem value="multiple">Multiple Choice</MenuItem>
                                    <MenuItem value="truefalse">True/False</MenuItem>
                                </Select>
                            </FormControl>

                            <Box>
                                <FormLabel component="legend">Options</FormLabel>
                                <Stack spacing={2} sx={{ mt: 1 }}>
                                    {question.options.map((option, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                            {question.type === "single" ? (
                                                <Radio
                                                    checked={question.correctAnswers.includes(index)}
                                                    onChange={(e) => handleCorrectAnswerChange(
                                                        question.id,
                                                        index,
                                                        e.target.checked
                                                    )}
                                                />
                                            ) : (
                                                <Checkbox
                                                    checked={question.correctAnswers.includes(index)}
                                                    onChange={(e) => handleCorrectAnswerChange(
                                                        question.id,
                                                        index,
                                                        e.target.checked
                                                    )}
                                                />
                                            )}

                                            <TextField
                                                value={option}
                                                onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                                                fullWidth
                                                required
                                                sx={{ my: 1 }}
                                                slotProps={{
                                                    input: {
                                                        endAdornment: question.type !== "truefalse" && (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    edge="end"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeOption(question.id, index);
                                                                    }}
                                                                    disabled={question.options.length <= 2}
                                                                    size="small"
                                                                    sx={{ mr: -1 }}
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                            />
                                        </Box>
                                    ))}

                                    {question.type !== "truefalse" && question.options.length < 6 && (
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

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                    variant="outlined"
                    onClick={() => setActiveStep(0)}
                    sx={{ width: '48%' }}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={questions.length === 0}
                    sx={{
                        width: '48%',
                        background: "linear-gradient(135deg, #0d47a1, #1565c0)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                        }
                    }}
                >
                    Next Step
                </Button>
            </Box>
        </Box>
    );
}

export default SecondStage;