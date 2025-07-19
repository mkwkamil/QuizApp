import { Box, CircularProgress, Typography, Fade } from '@mui/material';
 
const Loading = () => {
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
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
                    color="white"
                    sx={{
                        animation: 'pulse 1.5s infinite',
                        '@keyframes pulse': {
                            '0%': { opacity: 0.6 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.6 }
                        }
                    }}
                >
                    Loading... 
                </Typography>
            </Box>
        </Fade>
    );
};

export default Loading;