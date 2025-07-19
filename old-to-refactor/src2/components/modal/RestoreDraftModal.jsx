import {
    Modal,
    Box,
    Typography,
    Backdrop,
    Fade
} from '@mui/material';
import {StyledCancelButton, StyledQuizNextButton} from "../common/StyledButtons";

function RestoreDraftModal({ open, onClose, onRestore, draft }) {
    if (!draft) return null;

    const { basicInfo, questions, savedAt } = draft;

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: { backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }
                }
            }}>
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: 5,
                    boxShadow: '0 0 15px rgba(48, 123, 200, 0.7)', 
                    p: 5,
                    width: '95%',
                    maxWidth: 500,
                    textAlign: 'center',
                  }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Do you want to restore your saved draft?
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 4, textAlign: 'left', lineHeight: 2.2 }}>
                    <strong>Title:</strong> {basicInfo?.title || '—'}<br />
                    <strong>Description:</strong> {basicInfo?.description || '—'}<br />
                    <strong>Questions:</strong> {questions?.length || 0}<br />
                    <strong>Saved at:</strong> {savedAt ? new Date(savedAt).toLocaleString() : '—'}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                      <StyledCancelButton variant="outlined" onClick={onClose} fullWidth>
                          No
                      </StyledCancelButton>
                    <StyledQuizNextButton variant="contained" onClick={onRestore} fullWidth>
                        Yes
                    </StyledQuizNextButton>
                  </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default RestoreDraftModal;