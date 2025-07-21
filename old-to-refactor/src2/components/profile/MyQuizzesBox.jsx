import { Paper, Typography, Stack, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function MyQuizzesBox({userQuizzes, onDeleteClick}) {
    return (
        <Paper sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            flex: 1
        }}>
            <Typography
                variant="h6"
                color="#fff"
                fontFamily="Poppins, sans-serif"
                gutterBottom
            >
                My Quizzes
            </Typography>

            <Stack spacing={2}>
                {userQuizzes.map(quiz => (
                    <Paper
                        key={quiz.id}
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.05)',
                            transition: 'all 0.3s',
                            '&:hover': {
                                background: 'rgba(255,255,255,0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <Box>
                            <Typography fontWeight="bold" sx={{ color: '#fff', mb: 0.5 }}>
                                {quiz.title}
                            </Typography>

                            {quiz.isDraft && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'orange',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                    }}
                                >
                                    DRAFT
                                </Typography>
                            )}

                            <Stack direction="row" spacing={1} sx={{ color: '#aaa' }}>
                                <Typography variant="caption">{quiz.questionsCount} questions</Typography>
                                <Typography variant="caption">• {quiz.plays} plays</Typography>
                                <Typography variant="caption">• ⭐ {quiz.averageRating.toFixed(1)}</Typography>
                            </Stack>
                        </Box>

                        <Stack direction="row" spacing={1}>
                            <Link to={`/quiz/edit/${quiz.id}`}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        color: '#00e5ff',
                                        borderColor: '#00e5ff',
                                        '&:hover': { bgcolor: 'rgba(0, 229, 255, 0.1)' }
                                    }}
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => onDeleteClick(quiz)}
                                sx={{
                                    color: '#AF1323FF',
                                    borderColor: '#AF1323FF',
                                    '&:hover': { bgcolor: 'rgba(175, 19, 35, 0.2)' }
                                }}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Paper>
    );
}

export default MyQuizzesBox;