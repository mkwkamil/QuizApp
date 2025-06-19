import {styled} from "@mui/system";
import {Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import {ErrorOutline as ErrorIcon} from "@mui/icons-material";


export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    background: theme.palette.mode === 'dark' ?
        'linear-gradient(145deg, #1a1a1a 0%, #222 100%)' :
        'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    maxWidth: '450px',
    width: '100%',
    margin: 'auto'
}));

export const MainErrorBox = ({error}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                p: 2,
                borderRadius: '8px',
                backgroundColor: 'error.light',
                color: 'error.contrastText'
            }}>
            <ErrorIcon />
            <Typography variant="body2">{error}</Typography>
        </Box>
    )
}

export const CaptionError = ({error}) => {
    return (
        <Typography variant="caption" color="error"
                    sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
            {error}
        </Typography>
    )
}

const CryptoStyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.8),
    borderRadius: '8px',
    fontWeight: 700,
    letterSpacing: '0.8px',
    textTransform: 'none',
    fontSize: '1rem',
    color: '#fff',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    boxShadow: '0 4px 15px rgba(11, 35, 47, 0.4)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    },
    '&:hover': {
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 60%, #2c5364 100%)',
        boxShadow: '0 6px 20px rgba(11, 35, 47, 0.6)',
        transform: 'translateY(-1px)',
    },
    '&:active': {
        transform: 'translateY(0)',
    },
    '&.Mui-disabled': {
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        opacity: 0.7,
    }
}));

export const AuthFormButton = ({ isSubmitting, buttonLabel }) => {
    return (
        <CryptoStyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <CircularProgress
                        size={22}
                        thickness={5}
                        sx={{
                            color: 'rgba(255,255,255,0.8)',
                            mr: 2,
                            '& circle': {
                                strokeLinecap: 'round',
                            }
                        }}
                    />
                    Authenticating...
                </>
            ) : (
                <span style={{ position: 'relative', zIndex: 1 }}>
            {buttonLabel || 'Submit'}
        </span>
            )}
        </CryptoStyledButton>
    );
};