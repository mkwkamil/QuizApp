import { Typography, Stack } from "@mui/material";
import { SectionBox, LoadMoreText } from "./StyledQuizPageComponents";
import { formatDistanceToNow } from "date-fns";
import QuizComment from "./QuizComment";

export default function CommentsSection({ comments }) {
    return (
        <SectionBox>
            <Typography variant="h6" mb={2}>User Comments</Typography>
            {comments.length === 0 ? (
                <Typography variant="body2" color="#bbb">No comments yet. Be the first to share your thoughts!</Typography>
            ) : (
                <>
                    <Stack spacing={2}>
                        {comments.map(c => (
                            <QuizComment
                                key={c.id}
                                author={c.authorName}
                                text={c.content}
                                postedAt={`${formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}`}
                            />
                        ))}
                    </Stack>
                    <LoadMoreText>
                        Load more comments
                    </LoadMoreText>
                </>
            )}
        </SectionBox>
    );
}