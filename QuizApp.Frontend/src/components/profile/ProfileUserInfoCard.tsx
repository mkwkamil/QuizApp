import { Stack, Box, Typography } from "@mui/material";
import { Email, Person, Cake } from "@mui/icons-material";
import type { ProfileSummary } from "@interfaces/profile.ts";
import { BasicInfoCardWrapper, BasicInfoItem } from "@components/profile/styles/ProfileUserInfoCardLayout.ts";

const ProfileUserInfoCard = ({ profileData }: { profileData: ProfileSummary }) => {
    const infoRows = [
        {
            id: "email",
            label: "Email",
            value: profileData.email,
            icon: <Email fontSize="small" />
        },
        {
            id: "username",
            label: "Username",
            value: profileData.username,
            icon: <Person fontSize="small" />
        },
        {
            id: "joinDate",
            label: "Member Since",
            value: new Date(profileData.joinDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            }),
            icon: <Cake fontSize="small" />
        }
    ];

    return (
        <BasicInfoCardWrapper>
            <Typography variant="h6" gutterBottom>
                Basic Info
            </Typography>

            <Stack spacing={2}>
                {infoRows.map((item) => (
                    <BasicInfoItem key={item.id}>
                        <Box>{item.icon}</Box>
                        <Box>
                            <Typography variant="caption" color="#aaa">{item.label}</Typography>
                            <Typography>{item.value}</Typography>
                        </Box>
                    </BasicInfoItem>
                ))}
            </Stack>
        </BasicInfoCardWrapper>
    );
};

export default ProfileUserInfoCard;