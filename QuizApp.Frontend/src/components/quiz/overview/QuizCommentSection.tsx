import { Typography, Stack } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { QuizCommentsPaper, QuizLoadMoreCommentsButton } from "@components/quiz/overview/styles/QuizCommentSectionLayout";
import QuizComment from "@components/quiz/overview/QuizComment";

interface QuizCommentsSectionProps {
    comments: {
        id: number;
        authorName: string;
        content: string;
        createdAt: string;
    }[];
}

const QuizCommentsSection = ({ comments }: QuizCommentsSectionProps) => {
    return (
        <QuizCommentsPaper>
            <Typography variant="h6" mb={2}>User Comments</Typography>
            {comments.length === 0 ? (
                <Typography variant="body2" color="#bbb">
                    No comments yet. Be the first to share your thoughts!
                </Typography>
            ) : (
                <>
                    <Stack spacing={2}>
                        {comments.map((c) => (
                            <QuizComment
                                key={c.id}
                                author={c.authorName}
                                text={c.content}
                                postedAt={formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                            />
                        ))}
                    </Stack>
                    <QuizLoadMoreCommentsButton>
                        Load more comments
                    </QuizLoadMoreCommentsButton>
                </>
            )}
        </QuizCommentsPaper>
    );
};

export default QuizCommentsSection;