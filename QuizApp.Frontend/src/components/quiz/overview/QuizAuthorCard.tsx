import { Typography, Stack, Avatar, Box } from "@mui/material";
import { QuizSidebarCard } from "@components/quiz/overview/styles/QuizOverviewLayout";
import { QuizAuthorInfo, UserFollowButton, UserMessageButton } from "@components/quiz/overview/styles/QuizAuthorCardLayout";

type QuizAuthorCardProps = {
    author: {
        name: string;
        avatarUrl: string;
        joinedAt: string;
    };
};

const QuizAuthorCard = ({ author }: QuizAuthorCardProps) => {
    return (
        <QuizSidebarCard>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Author
            </Typography>

            <QuizAuthorInfo>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={author.avatarUrl} sx={{ width: 56, height: 56 }} />
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {author.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Joined on {new Date(author.joinedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <UserFollowButton variant="outlined" size="medium">
                        Follow
                    </UserFollowButton>
                    <UserMessageButton variant="contained" size="medium">
                        Message
                    </UserMessageButton>
                </Stack>
            </QuizAuthorInfo>
        </QuizSidebarCard>
    );
};

export default QuizAuthorCard;