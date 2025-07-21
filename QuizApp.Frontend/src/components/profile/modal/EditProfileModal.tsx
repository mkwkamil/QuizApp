import { Modal, Stack, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "@hooks/profile/useUpdateProfileMutation";
import {EditProfileModalBox} from "@components/profile/modal/EditProfileModalLayout.ts";

type EditProfileModalProps = {
    initialName: string;
    initialBio: string;
    open: boolean;
    onClose: () => void;
};

const EditProfileModal = ({ initialName, initialBio, open, onClose }: EditProfileModalProps) => {
    const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);

    const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

    useEffect(() => {
        if (open) {
            setName(initialName);
            setBio(initialBio);
        }
    }, [open, initialName, initialBio]);

    const handleSave = () => {
        updateProfile(
            { publicName: name, bio },
            { onSuccess: onClose }
        );
    };

    return (
        <Modal open={open} onClose={onClose}>
            <EditProfileModalBox>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Edit Your Profile
                </Typography>
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
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSave} disabled={isPending}>
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </EditProfileModalBox>
        </Modal>
    );
};

export default EditProfileModal;