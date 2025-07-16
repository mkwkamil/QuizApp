import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useUpdateProfileMutation} from "../../../hooks/profile/useUpdateProfileMutation";
import {toast} from "react-toastify";

export default function EditProfileModal({ initialName, initialBio, open, onClose }) {
    const [name, setName] = useState(initialName || '');
    const [bio, setBio] = useState(initialBio || '');

    const { mutate: updateProfile, isLoading } = useUpdateProfileMutation();

    useEffect(() => {
        if (open){
            setName(initialName || '');
            setBio(initialBio || '');
        }
    }, [open, initialName, initialBio]);
    
    const handleSave = () => {
        updateProfile({ publicName: name, bio }, {
            onSuccess: () => {
                toast.success("Profile updated successfully!");
                onClose();
            },
            onError: () => {
                toast.error("Failed to update profile. Please try again.");
            }
        });
    };
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                maxWidth: 400,
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 24,
                p: 4,
                mx: 'auto',
                mt: '10vh'
            }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Edit Your Profile</Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Display Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}