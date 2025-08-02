import { Typography, Stack } from '@mui/material';
import { useDeleteQuizMutation } from '@hooks/profile/useDeleteQuizMutation';
import { toast } from 'react-toastify';
import { ConfirmCancelButton, ConfirmDeleteButton } from "@components/profile/modal/styles/DeleteQuizModalLayout";
import BaseModal from "@components/common/BaseModal.tsx";

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
        <BaseModal open={!!quiz} onClose={onClose}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Are you sure you want to delete this quiz?
                </Typography>

                <Typography variant="body2" fontWeight={600} color="#999" mb={4}>
                    {quiz?.title || null}
                </Typography>

                <Stack direction="row" spacing={3} justifyContent="center">
                    <ConfirmCancelButton onClick={onClose} fullWidth>
                        Cancel
                    </ConfirmCancelButton>
                    <ConfirmDeleteButton onClick={handleDelete} disabled={isPending} fullWidth>
                        Delete
                    </ConfirmDeleteButton>
                </Stack>
        </BaseModal>
    );
};

export default DeleteQuizModal;