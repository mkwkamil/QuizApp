import React, { useState } from "react";
import BaseModal from "@components/common/BaseModal";
import { Box, Typography } from "@mui/material";
import { TabContext } from "@mui/lab";
import FollowListTabPanel from "@components/profile/modal/FollowListTabPanel";
import { CloseIconButton, FollowTab, FollowTabList } from "@components/profile/modal/styles/FollowListModalLayout";
import { useAuthStore } from "@store/auth/authStore";
import { useUserFollowList } from "@hooks/users/useUserFollowList";
import { Close } from "@mui/icons-material";

type FollowListModalProps = {
    open: boolean;
    onClose: () => void;
    type: "followers" | "following";
    username: string;
};

const FollowListModal = ({ open, onClose, type, username }: FollowListModalProps) => {
    const userId = Number(useAuthStore((state) => state.user?.id));
    const [tab, setTab] = useState<"followers" | "following">(type);

    const { data: followers = [], isLoading: loadingFollowers } = useUserFollowList(userId, "followers");
    const { data: following = [], isLoading: loadingFollowing } = useUserFollowList(userId, "following");

    const handleChange = (_: React.SyntheticEvent, newValue: "followers" | "following") => {
        setTab(newValue);
    };

    return (
        <BaseModal open={open} onClose={onClose} width={400} height={500}>
            <CloseIconButton onClick={onClose}>
                <Close />
            </CloseIconButton>
            <Typography variant="h6" fontWeight={700} mb={2}>
                {username}
            </Typography>

            <TabContext value={tab}>
                <Box borderBottom={1} borderColor="divider">
                    <FollowTabList onChange={handleChange} variant="fullWidth">
                        <FollowTab label={`Followers`} value="followers"/>
                        <FollowTab label={`Following`} value="following" />
                    </FollowTabList>
                </Box>

                <FollowListTabPanel
                    value="followers"
                    users={followers}
                    emptyMessage="This user has no followers yet."
                    isLoading={loadingFollowers}
                />

                <FollowListTabPanel
                    value="following"
                    users={following}
                    emptyMessage="This user is not following anyone yet."
                    isLoading={loadingFollowing}
                />
            </TabContext>
        </BaseModal>
    );
};

export default FollowListModal;