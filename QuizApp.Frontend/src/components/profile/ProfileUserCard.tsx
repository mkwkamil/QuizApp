import {Stack, Chip, Typography} from "@mui/material";
import { Edit, EmojiEvents, Quiz } from "@mui/icons-material";
import { useState } from "react";
import {
    ProfileEditIconButton,
    ProfileStatsChips,
    ProfileUserCardWrapper
} from "@components/profile/styles/ProfileUserCardLayout.ts";
import ProfileAvatar from "@components/profile/ProfileAvatar.tsx";
import EditProfileModal from "@components/profile/modal/EditProfileModal.tsx";
import type { ProfileSummary } from "@interfaces/profile.ts";



const ProfileUserCard = ({ profileData }: { profileData: ProfileSummary }) => {
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <>
            <ProfileUserCardWrapper>
                <ProfileEditIconButton onClick={() => setOpenEdit(true)}>
                    <Edit />
                </ProfileEditIconButton>
                
                <Stack spacing={2} alignItems="center">
                    <ProfileAvatar src={profileData.avatarUrl} />
                    <Typography variant="h5" fontWeight={600}>
                        {profileData.publicName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", textAlign: "center", fontStyle: "italic" }}>
                        {profileData.bio || "This user has not set a bio yet."}
                    </Typography>
                    
                    <ProfileStatsChips>
                        <Chip
                            icon={<Quiz />}
                            label={`Quizzes Created: ${profileData.quizzesCreated}`}
                            color="primary"
                        />
                        <Chip
                            icon={<EmojiEvents />}
                            label={`Accuracy: ${profileData.accuracy}`}
                            color="secondary"
                        />
                    </ProfileStatsChips>
                </Stack>
            </ProfileUserCardWrapper>
            
            <EditProfileModal
                initialBio={profileData.bio}
                initialName={profileData.publicName}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            />
        </>
    );
};

export default ProfileUserCard;