import {
    Box,
    Typography,
    Button,
    Divider,
    Chip,
    List,
    ListItem,
    ListItemText,
    Paper,
    Avatar
} from '@mui/material';
import { useQuizStore } from '../../store/quizStore';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {clearQuizDraft} from "../../store/quizDraft";

function ThirdStage({ onBack, editMode, quizId }) {
    const { basicInfo, questions, submitQuiz, reset } = useQuizStore();
    const { title, description, category, difficulty, thumbnailUrl, options } = basicInfo;
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    
    const handlePublish = async () => {
        setIsSubmitting(true);
        try {
            const result = await submitQuiz(editMode, quizId);
            if (result.success) {
                await clearQuizDraft();
                reset();
            }
        } catch (err) {
            setError("Failed to publish quiz. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (question, index) => (
        <Paper key={question.id} sx={{ p: 3, mb: 3, borderLeft: '4px solid #3f51b5' }}>
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{index + 1}</Avatar>
                <Typography variant="h6">{question.text}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List dense>
                {question.options.map((option, i) => (
                    <ListItem key={i} sx={{
                        pl: 4,
                        bgcolor: question.correctAnswers.includes(i) ? 'action.hover' : 'inherit'
                    }}>
                        {question.correctAnswers.includes(i) ? (
                            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                        ) : (
                            <RadioButtonUncheckedIcon color="disabled" sx={{ mr: 1 }} />
                        )}
                        <ListItemText
                            primary={option}
                            sx={{
                                textDecoration: question.correctAnswers.includes(i) ? 'underline' : 'none',
                                color: question.correctAnswers.includes(i) ? 'success.main' : 'inherit'
                            }}
                        />
                    </ListItem>
                ))}
            </List>

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Chip
                    label={`Type: ${question.type === 'single' ? 'Single Choice' :
                        question.type === 'multiple' ? 'Multiple Choice' : 'True/False'}`}
                    variant="outlined"
                />
                <Chip
                    label={`${question.correctAnswers.length} correct answer(s)`}
                    color="success"
                />
            </Box>
        </Paper>
    );

    return (
        <Box sx={{ p: 4, width: '80%', mx: 'auto' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Final Review
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    Quiz Details
                </Typography>

                <Box display="flex" alignItems="center" mb={3}>
                    {thumbnailUrl && (
                        <Avatar
                            src={thumbnailUrl}
                            variant="rounded"
                            sx={{ width: 100, height: 100, mr: 3 }}
                        />
                    )}
                    <Box>
                        <Typography variant="h4">{title}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {description}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" flexWrap="wrap" gap={2}>
                    <Chip label={`Category: ${category}`} color="primary" variant="outlined" />
                    <Chip
                        label={`Difficulty: ${difficulty}`}
                        color={
                            difficulty === 'Easy' ? 'success' :
                                difficulty === 'Medium' ? 'warning' : 'error'
                        }
                    />
                    <Chip
                        label={options.isPublic ? 'Public' : 'Private'}
                        variant="outlined"
                    />
                    <Chip
                        label={options.revealAnswers ? 'Answers visible' : 'Answers hidden'}
                        variant="outlined"
                    />
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    Questions ({questions.length})
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {questions.length > 0 ? (
                    questions.map(renderQuestion)
                ) : (
                    <Typography color="text.secondary" textAlign="center" py={4}>
                        No questions added
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

                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        disabled={isSubmitting}
                        size="large"
                        sx={{ minWidth: 200 }}
                    >
                    {editMode
                        ? (isSubmitting ? 'Updating...' : 'Update Quiz')
                        : (isSubmitting ? 'Publishing...' : 'Publish Quiz')
                    }
                    </Button>
                </Box>
            </Box>

            {error && (
                <Typography color="error" mt={2} textAlign="center">
                    {error}
                </Typography>
            )}
        </Box>
    );
}

export default ThirdStage;