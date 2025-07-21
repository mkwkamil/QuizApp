import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useAvatarUpload } from '@hooks/profile/useAvatarUpload';
import { ProfileAvatarHover, ProfileAvatarWrapper } from "@components/profile/styles/ProfileAvatarLayout.ts";
import UploadAvatarModal from "@components/profile/modal/UploadAvatarModal.tsx";

const ProfileAvatar = ({ src }: { src: string }) => {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { mutate: uploadAvatar } = useAvatarUpload();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = () => {
        if (!file) return;

        uploadAvatar(file, { onSuccess: () => setOpen(false) });
    };

    return (
        <>
            <ProfileAvatarWrapper onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Avatar src={src} sx={{ width: '100%', height: '100%' }} />
                {hover && (
                    <ProfileAvatarHover onClick={() => setOpen(true)}>
                        <PhotoCamera />
                    </ProfileAvatarHover>
                )}
            </ProfileAvatarWrapper>

            <UploadAvatarModal
                open={open}
                onClose={() => setOpen(false)}
                preview={preview}
                file={file}
                handleFileChange={handleFileChange}
                handleUpload={handleUpload}
            />
        </>
    );
};

export default ProfileAvatar;