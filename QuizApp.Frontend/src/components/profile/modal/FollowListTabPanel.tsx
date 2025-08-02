import { TabPanel } from "@mui/lab";
import { Typography, Box, CircularProgress } from "@mui/material";
import FollowUserItem from "@components/profile/modal/FollowUserItem.tsx";

type FollowListTabPanelProps = {
    value: "followers" | "following";
    users: {
        userId: number;
        username: string;
        publicName?: string;
        avatarUrl?: string
    }[];
    emptyMessage: string;
    isLoading: boolean;
}

const FollowListTabPanel = ({ value, users, emptyMessage, isLoading }: FollowListTabPanelProps) => {
    return (
        <TabPanel value={value} sx={{ padding: 1 }}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                    <CircularProgress size={24} />
                </Box>
            ) : users.length === 0 ? (
                <Typography color="text.secondary" fontStyle="italic" pt={3}>
                    {emptyMessage}
                </Typography>
            ) : (
                users.map((user, index) => (
                    <FollowUserItem
                        key={index}
                        userId={user.userId}
                        username={user.username}
                        publicName={user.publicName}
                        avatarUrl={user.avatarUrl}
                        type={value}
                    />
                ))
            )}
        </TabPanel>
    );
};

export default FollowListTabPanel;