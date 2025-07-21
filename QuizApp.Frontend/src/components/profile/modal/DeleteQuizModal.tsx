import { Modal, Typography, Backdrop, Fade, Stack } from '@mui/material';
import { useDeleteQuizMutation } from '@hooks/profile/useDeleteQuizMutation';
import { toast } from 'react-toastify';
import {
    ConfirmCancelButton,
    ConfirmDeleteButton,
    ConfirmDeleteModalBox
} from "@components/profile/modal/DeleteQuizModalLayout.ts";

type ConfirmDeleteQuizModalProps = {
    quiz: { id: number; title?: string } | null;
    onClose: () => void;
};

const DeleteQuizModal = ({ quiz, onClose }: ConfirmDeleteQuizModalProps) => {
    const { mutate: deleteQuiz, isPending } = useDeleteQuizMutation();

    const handleDelete = () => {
        if (!quiz) return;
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
            aria-labelledby="confirm-delete-quiz"
        >
            <Fade in={!!quiz} unmountOnExit>
                <ConfirmDeleteModalBox>
                    <Typography variant="h6" mb={2}>
                        Are you sure you want to delete this quiz?
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="bold" color="error" mb={4}>
                        {quiz?.title || "Untitled Quiz"}
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <ConfirmCancelButton onClick={onClose} fullWidth>
                            Cancel
                        </ConfirmCancelButton>
                        <ConfirmDeleteButton color="error" onClick={handleDelete} fullWidth disabled={isPending}>
                            Delete
                        </ConfirmDeleteButton>
                    </Stack>
                </ConfirmDeleteModalBox>
            </Fade>
        </Modal>
    );
};

export default DeleteQuizModal;