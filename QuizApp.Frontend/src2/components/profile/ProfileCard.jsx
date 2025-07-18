import {Typography, Stack, IconButton, Chip, Paper} from "@mui/material";
import {Edit, EmojiEvents, Quiz} from "@mui/icons-material";
import AvatarWithUpload from "./AvatarWithUpload";
import { StatsChips} from "../explore/StyledExploreComponents";
import {useState} from "react";
import EditProfileModal from "./modal/EditProfileModal";

function ProfileCard({ profileData }) {
    const [openEdit, setOpenEdit] = useState(false);
    
    return (
        <>
            <Paper sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                position: 'relative'
            }}>
                <IconButton
                    onClick={() => setOpenEdit(true)}
                    sx={{ position: 'absolute', top: 8, right: 8, color: '#ccc' }}
                >
                    <Edit />
                </IconButton>

                <Stack alignItems="center" spacing={2}>
                    <AvatarWithUpload src={profileData.avatar} />
                    <Typography variant="h5" fontWeight="bold" fontFamily="Poppins, sans-serif" color="#fff">
                        {profileData.publicName}
                    </Typography>
                    <Typography variant="body2" color="#aaa" textAlign="center" sx={{ fontStyle: 'italic' }}>
                        {profileData.bio}
                    </Typography>

                    <StatsChips>
                        <Chip
                            label={`${profileData.quizzesCreated} quizzes`}
                            icon={<Quiz fontSize="small" />}
                            sx={{ bgcolor: 'rgba(100,100,255,0.2)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)' }}
                        />
                        <Chip
                            label={`${profileData.quizzesAccuracy} accuracy`}
                            icon={<EmojiEvents fontSize="small" />}
                            sx={{ bgcolor: 'rgba(100,255,100,0.2)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)' }}
                        />
                    </StatsChips>
                </Stack>
            </Paper>
            
            <EditProfileModal 
                initialBio={profileData.bio} 
                initialName={profileData.publicName} 
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            />
        </>
    );
}

export default ProfileCard;