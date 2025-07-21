import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import {AvatarModalBox, AvatarPreview} from "@components/profile/modal/UploadAvatarModalLayout.ts";

interface UploadAvatarModalProps {
    open: boolean;
    onClose: () => void;
    preview: string | null;
    file: File | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: () => void;
}

const UploadAvatarModal = ({ open, onClose, preview, file, handleFileChange, handleUpload}: UploadAvatarModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <AvatarModalBox>
                <Typography variant="h6" gutterBottom>
                    Change Profile Picture
                </Typography>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: 16 }}
                />

                {preview && <AvatarPreview src={preview} />}

                <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button onClick={handleUpload} variant="contained" disabled={!file}>
                        Upload
                    </Button>
                </Box>
            </AvatarModalBox>
        </Modal>
    );
};

export default UploadAvatarModal;