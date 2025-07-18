import { Modal, Box, Typography, Backdrop, Fade, Stack } from '@mui/material';
import {StyledCancelButton, StyledQuizNextButton} from "../../common/StyledButtons";
import {useDeleteQuizMutation} from "../../../hooks/profile/useDeleteQuizMutation";
import {toast} from "react-toastify";

export default function DeleteQuizModal({ quiz, onClose }) {
    const { mutate: deleteQuiz, isLoading } = useDeleteQuizMutation();
    
    const handleDelete = () => {
        deleteQuiz(quiz.id, {
            onSuccess: () => {
                toast.success("Quiz deleted successfully!");
                onClose();
            },
            onError: () => {
                toast.error("Failed to delete quiz. Please try again.");
            }
        });
    };
    
    return (
        <Modal
            open={!!quiz}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 300,
                    sx: { backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.3)' }
                }
            }}
            aria-labelledby="delete-quiz-title"
        >
            <Fade in={!!quiz} unmountOnExit>
                <Box
                    role="dialog"
                    aria-modal="true"
                    tabIndex={-1}
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        p: 5,
                        width: '90%',
                        maxWidth: 460,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Are you sure you want to delete this quiz?
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="bold" color="error" mb={4}>
                        {quiz?.title || "Untitled Quiz"}
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <StyledCancelButton onClick={onClose} fullWidth>
                            Cancel
                        </StyledCancelButton>
                        <StyledQuizNextButton
                            color="error"
                            onClick={handleDelete}
                            fullWidth
                            disabled={isLoading}
                        >
                            Delete
                        </StyledQuizNextButton>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    )
}