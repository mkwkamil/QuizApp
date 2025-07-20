import { useState } from "react";
import { Typography, Stack } from "@mui/material";
import {useAddComment} from "@hooks/comments/useAddComment";
import {
    QuizCommentField,
    QuizCommentSection,
    QuizCommentSubmitButton
} from "@components/quiz/overview/styles/QuizCommentFormLayout";

export default function QuizCommentForm({ quizId }: { quizId: number }) {
    const [text, setText] = useState("");
    const { mutate: addComment, isPending } = useAddComment();

    const isValid = text.trim().length > 0;

    const handleSubmit = () => {
        if (!isValid) return;

        addComment(
            { quizId: Number(quizId), content: text.trim() },
            {
                onSuccess: () => setText(""),
            }
        );
    };

    return (
        <QuizCommentSection>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Add a comment
            </Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <QuizCommentField
                    fullWidth
                    placeholder="Write your comment..."
                    multiline
                    minRows={2}
                    maxRows={6}
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <QuizCommentSubmitButton onClick={handleSubmit} disabled={!isValid || isPending}>
                    {isPending ? "Sending..." : "Submit"}
                </QuizCommentSubmitButton>
            </Stack>
        </QuizCommentSection>
    );
}