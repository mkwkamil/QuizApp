import { Divider, Stack, Typography } from "@mui/material";
import { Edit, Group, Person } from "@mui/icons-material";
import { useState } from "react";
import {
    ProfileChip,
    ProfileEditIconButton,
    ProfileStatsChips,
    ProfileUserCardWrapper
} from "@components/profile/styles/ProfileUserCardLayout.ts";
import ProfileAvatar from "@components/profile/ProfileAvatar.tsx";
import EditProfileModal from "@components/profile/modal/EditProfileModal.tsx";
import FollowListModal from "@components/profile/modal/FollowListModal.tsx";
import type { ProfileSummary } from "@interfaces/profile.ts";

const ProfileUserCard = ({ profileData }: { profileData: ProfileSummary }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [followListState, setFollowListState] = useState<{ open: boolean, type: "followers" | "following" | null }>({
        open: false,
        type: null
    });

    const openFollowModal = (type: "followers" | "following") => {
        setFollowListState({ open: true, type });
    };

    const closeFollowModal = () => {
        setFollowListState({ open: false, type: null });
    };

    return (
        <>
            <ProfileUserCardWrapper>
                <ProfileEditIconButton onClick={() => setOpenEdit(true)}>
                    <Edit />
                </ProfileEditIconButton>

                <Stack spacing={2} alignItems="center">
                    <ProfileAvatar src={profileData.avatarUrl} />
                    <Typography variant="h5" fontWeight={600} paddingTop="4px">
                        {profileData.publicName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", textAlign: "center", fontStyle: "italic" }}>
                        {profileData.bio || "This user has not set a bio yet."}
                    </Typography>

                    <Divider sx={{ width: "100%", opacity: 0.6, paddingTop: "4px" }} />

                    <ProfileStatsChips>
                        <ProfileChip onClick={() => openFollowModal("followers")}>
                            <Group sx={{ fontSize: 20 }} />
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                Followers: {profileData.followersCount}
                            </Typography>
                        </ProfileChip>
                        <ProfileChip onClick={() => openFollowModal("following")}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                Following: {profileData.followingCount}
                            </Typography>
                        </ProfileChip>
                    </ProfileStatsChips>
                </Stack>
            </ProfileUserCardWrapper>

            <EditProfileModal
                initialBio={profileData.bio}
                initialName={profileData.publicName}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            />

            {followListState.type && (
                <FollowListModal
                    open={followListState.open}
                    type={followListState.type}
                    onClose={closeFollowModal}
                    username={profileData.publicName}
                />
            )}
        </>
    );
};

export default ProfileUserCard;