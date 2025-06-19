import React from 'react';
import {
    Box,
    CircularProgress,
    Typography,
    Fade,
    useTheme
} from '@mui/material';

const Loading = ({ message = "Loading..." }) => {
    const theme = useTheme();

    return (
        <Fade in={true} timeout={500}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.8)'
                        : 'rgba(255, 255, 255, 0.9)',
                    zIndex: 9999
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={5}
                    color="primary"
                    sx={{
                        mb: 3,
                        animationDuration: '800ms'
                    }}
                />

                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                        animation: 'pulse 1.5s infinite',
                        '@keyframes pulse': {
                            '0%': { opacity: 0.6 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.6 }
                        }
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Fade>
    );
};

export default Loading;