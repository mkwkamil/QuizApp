import { Typography, Stack } from "@mui/material";
import { SectionBox, LoadMoreText } from "./StyledQuizPageComponents";
import QuizComment from "./QuizComment";

export default function CommentsSection({ comments }) {
    return (
        <SectionBox>
            <Typography variant="h6" mb={2}>User Comments</Typography>
            <Stack spacing={2}>
                {comments.map(c => (
                    <QuizComment
                        key={c.id}
                        author={c.author}
                        text={c.text}
                        postedAt="2d ago"
                    />
                ))}
            </Stack>
            <LoadMoreText>
                Load more comments
            </LoadMoreText>
        </SectionBox>
    );
}