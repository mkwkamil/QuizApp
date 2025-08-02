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

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setPreview(null);
    };

    const onUpload = (blob: Blob) => {
        uploadAvatar(new File([blob], "avatar.jpg", { type: "image/jpeg" }), {
            onSuccess: () => {
                setOpen(false);
                setFile(null);
                setPreview(null);
            }
        });
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
                onClose={handleClose}
                preview={preview}
                file={file}
                handleFileChange={onFileChange}
                handleUpload={onUpload}
            />
        </>
    );
};

export default ProfileAvatar;