import {Paper, Typography, Stack, Box, Chip} from "@mui/material";

function RecentActivityBox({activityData}) {
    return (
        <Paper sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            flex: 1
        }}>
            <Typography
                variant="h6"
                color="#fff"
                fontFamily="Poppins, sans-serif"
                gutterBottom
            >
                Recent Activity
            </Typography>

            <Stack spacing={2}>
                {activityData.map(item => (
                    <Box
                        key={item.id}
                        sx={{
                            p: 2,
                            '&:hover': {
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 1
                            }
                        }}
                    >
                        <Box sx={{ color: '#fff', fontSize: 18 }}>
                            <strong>{item.action}:</strong> {item.title}
                            {item.score && (
                                <Chip
                                    label={item.score}
                                    size="small"
                                    sx={{
                                        ml: 1,
                                        bgcolor: 'rgba(70,130,255,0.3)',
                                        boxShadow: '0 0 8px rgba(70,130,255,0.8)'
                                    }}
                                />
                            )}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#aaa' }}>
                            {item.time}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}

export default RecentActivityBox;