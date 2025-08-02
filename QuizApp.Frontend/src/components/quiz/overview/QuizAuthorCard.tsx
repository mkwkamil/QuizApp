import {Typography, Stack, Avatar, Box, CircularProgress} from "@mui/material";
import { QuizSidebarCard } from "@components/quiz/overview/styles/QuizOverviewLayout";
import {
    QuizAuthorInfo,
    UserFollowButton,
    UserUnfollowButton
} from "@components/quiz/overview/styles/QuizAuthorCardLayout";
import {useIsFollowingUser} from "@hooks/users/userIsFollowingUser.ts";
import {useFollowUser} from "@hooks/users/useFollowUser.ts";
import {useAuthStore} from "@store/auth/authStore.ts";

type QuizAuthorCardProps = {
    author: {
        id: number;
        name: string;
        avatarUrl: string;
        joinedAt: string;
    };
};

const QuizAuthorCard = ({ author }: QuizAuthorCardProps) => {
    const userId = useAuthStore((state) => state.user?.id);
    const { data: isFollowing, isLoading } = useIsFollowingUser(author.id);
    const { follow, unfollow } = useFollowUser(author.id);
    
    const handleClick = () => {
        if (isFollowing) unfollow.mutate();
        else follow.mutate();
    };
    
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

                {userId !== author.id && (
                    <Stack direction="row" spacing={1}>
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            isFollowing ? (
                                <UserUnfollowButton onClick={handleClick}>
                                    Following
                                </UserUnfollowButton>
                            ) : (
                                <UserFollowButton onClick={handleClick}>
                                    Follow
                                </UserFollowButton>
                            )
                        )}
                    </Stack>
                )}
            </QuizAuthorInfo>
        </QuizSidebarCard>
    );
};

export default QuizAuthorCard;