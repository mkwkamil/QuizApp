import { styled } from '@mui/material/styles';
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress,
    Paper
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

export const AuthContainer = styled(Container)({
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '32px',
    paddingBottom: '32px',
    marginTop: '-5vh',
});

export const StyledPaper = styled(Paper)({
    padding: '32px',
    borderRadius: '12px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const AuthFormBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const AuthTitle = styled(Typography)({
    marginBottom: '24px',
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
});

export const AuthFooterText = styled(Typography)({
    marginTop: '16px',
    textAlign: 'center',
    color: '#ccc',
});

export const AuthLink = styled('a')({
    color: '#90caf9',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
        textDecoration: 'underline',
    },
});

export const GradientButton = styled(Button)({
    marginTop: '24px',
    padding: '14px',
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
});

export const MainErrorBox = ({ error }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
        }}
    >
        <ErrorIcon />
        <Typography variant="body2">{error}</Typography>
    </Box>
);

export const CaptionError = ({ error }) => (
    <Typography
        variant="caption"
        color="error"
        sx={{
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        }}
    >
        {error}
    </Typography>
);

export const AuthFormButton = ({ isSubmitting, buttonLabel }) => (
    <GradientButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
        {isSubmitting ? (
            <>
                <CircularProgress
                    size={22}
                    thickness={5}
                    sx={{
                        color: 'rgba(255,255,255,0.8)',
                        marginRight: '16px',
                        '& circle': { strokeLinecap: 'round' }
                    }}
                />
                Authenticating...
            </>
        ) : (
            <span style={{ position: 'relative', zIndex: 1 }}>{buttonLabel || 'Submit'}</span>
        )}
    </GradientButton>
);