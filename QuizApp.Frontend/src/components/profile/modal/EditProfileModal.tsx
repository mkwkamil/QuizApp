import { Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "@hooks/profile/useUpdateProfileMutation";
import BaseModal from "@components/common/BaseModal.tsx";
import {ConfirmCancelButton, ConfirmUpdateButton} from "@components/profile/modal/styles/EditProfileModalLayout.ts";

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
        <BaseModal open={open} onClose={onClose}>
            <Stack spacing={3}>
                <Typography variant="h6" fontWeight={600}>
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
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <ConfirmCancelButton onClick={onClose} fullWidth>
                        Cancel
                    </ConfirmCancelButton>
                    <ConfirmUpdateButton onClick={handleSave} disabled={isPending} fullWidth>
                        Update
                    </ConfirmUpdateButton>
                </Stack>
            </Stack>
        </BaseModal>
    );
};

export default EditProfileModal;