import { Typography, Stack } from "@mui/material";
import { SectionBox, StyledCommentButton, MatchedCommentField } from "./StyledQuizPageComponents";

export default function CommentForm() {
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
                />
                <StyledCommentButton>
                    Submit
                </StyledCommentButton>
            </Stack>
        </SectionBox>
    );
}