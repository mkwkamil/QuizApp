import { Typography, Stack } from "@mui/material";
import { SectionBox, StyledCommentButton, MatchedCommentField } from "./StyledQuizPageComponents";
import {useState} from "react";
import {useAddComment} from "../../hooks/useAddComment";

export default function CommentForm({ quizId }) {
    const [text, setText] = useState("");
    const { mutate: addComment, isLoading } = useAddComment();

    const handleSubmit = () => {
        if (text.trim()) {
            addComment(
                { quizId, content: text },
                {
                    onSuccess: () => setText("")
                }
            );
        }
    };
    
    return (
        <SectionBox>
            <Typography variant="h6" mb={2}>Add a comment</Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <MatchedCommentField
                    fullWidth
                    placeholder="Write your comment..."
                    multiline
                    minRows={2}
                    maxRows={6}
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <StyledCommentButton onClick={handleSubmit} disabled={isLoading || !text.trim()}>
                    {isLoading ? "Sending..." : "Submit"}
                </StyledCommentButton>
            </Stack>
        </SectionBox>
    );
}