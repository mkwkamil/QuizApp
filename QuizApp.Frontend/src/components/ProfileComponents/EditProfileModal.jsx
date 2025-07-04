import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";

function EditProfileModal({open, onClose, name, bio, onNameChange, onBioChange, onSave}) {
    return (
        <Modal open={open} onClose={onClose} sx={{ backdropFilter: 'blur(2px)' }}>
            <Box sx={{
                p: 4,
                width: { xs: '90vw', sm: 500 },
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                boxShadow: (theme) =>
                    `0px 4px 16px ${
                        theme.palette.mode === 'dark'
                            ? 'rgba(0, 0, 0, 0.3)'
                            : 'rgba(0, 0, 0, 0.1)'
                    }`,
                mx: 'auto',
                my: '10vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #1976d2, #0d47a1)',
                    opacity: 0.8,
                },
            }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary',
                            transform: 'rotate(90deg)',
                            transition: 'transform 0.3s ease',
                        },
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" fontWeight={600} sx={{ mb: 1, color: 'text.primary' }}>
                    Edit Profile
                </Typography>

                <TextField
                    label="Public Name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                        },
                    }}
                />

                <TextField
                    label="Bio"
                    value={bio}
                    onChange={(e) => onBioChange(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                />

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        variant="outlined"
                        sx={{ flex: 1, py: 1 }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                            py: 1,
                            background: 'linear-gradient(90deg, #1565c0, #0d47a1)',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #0d47a1, #082f6a)',
                            },
                        }}
                        onClick={onSave}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditProfileModal;