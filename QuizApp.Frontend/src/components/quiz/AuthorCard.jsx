import { Typography, Stack, Avatar, Box } from "@mui/material";
import {SidebarCard, StyledFollowButton, StyledMessageButton, UserInfoBox} from "./StyledQuizPageComponents";

export default function AuthorCard({ author }) {
    return (
        <SidebarCard>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Author
            </Typography>
            <UserInfoBox>
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
                    <StyledFollowButton variant="outlined" size="medium">
                        Follow
                    </StyledFollowButton>
                    <StyledMessageButton variant="contained" size="medium">
                        Message
                    </StyledMessageButton>
                </Stack>
            </UserInfoBox>
        </SidebarCard>
    );
}