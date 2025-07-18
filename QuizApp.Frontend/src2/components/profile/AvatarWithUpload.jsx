import { useState } from 'react';
import {
    Avatar,
    Box,
    Modal,
    Typography,
    Button,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { toast } from "react-toastify";
import useAuthStore from "../../store/authStore";
import api from '../../config/axiosConfig';

export default function AvatarWithUpload({ avatarUrl }) {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [hover, setHover] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await api.post("/profile/avatar", formData);

            useAuthStore.getState().setUser({ avatar: res.data.avatar });
            toast.success("Avatar updated!");
            setOpen(false);
        } catch (err) {
            toast.error("Upload failed");
        }
    };

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    overflow: 'visible', 
                    boxShadow: '0 0 30px rgba(70, 130, 255, 0.9)',
                    border: '3px solid',
                    borderColor: 'primary.main'
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Avatar
                    src={avatarUrl}
                    sx={{
                        width: '100%',
                        height: '100%'
                    }}
                />
                {hover && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            zIndex: 2
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <PhotoCamera sx={{ color: '#fff', fontSize: 32 }} />
                    </Box>
                )}
            </Box>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: '#1e1e1e',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    width: 400,
                    color: '#fff'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Change Profile Picture
                    </Typography>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginBottom: 16 }}
                    />

                    {preview && (
                        <Avatar src={preview} sx={{ width: 80, height: 80, mb: 2 }} />
                    )}

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
                        <Button onClick={handleUpload} variant="contained" disabled={!file}>
                            Upload
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}