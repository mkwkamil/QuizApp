import {
    Modal,
    Box,
    Typography,
    Backdrop,
    Fade,
} from '@mui/material';
import { StyledCancelButton, StyledQuizNextButton} from "../StyledButtons";

function DeleteQuizModal({ open, onClose, onDelete, quizTitle }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: { backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }
                }
            }}
            aria-labelledby="delete-quiz-title"
            aria-describedby="delete-quiz-description"
        >
            <Fade in={open} unmountOnExit>
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
                        borderRadius: 5,
                        boxShadow: '0 0 5px rgba(190, 5, 0, 0.7)',
                        p: 5,
                        width: '95%',
                        maxWidth: 500,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        id="delete-quiz-title"
                        variant="h5"
                        gutterBottom
                        sx={{ mb: 3 }}
                    >
                        Are you sure you want to delete this quiz?
                    </Typography>

                    <Typography
                        id="delete-quiz-description"
                        variant="body1"
                        sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}
                    >
                        {quizTitle || 'Untitled Quiz'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                        <StyledCancelButton variant="outlined" onClick={onClose} fullWidth>
                            Cancel
                        </StyledCancelButton>
                        <StyledQuizNextButton variant="contained" onClick={onDelete} fullWidth color="error">
                            Delete
                        </StyledQuizNextButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default DeleteQuizModal;