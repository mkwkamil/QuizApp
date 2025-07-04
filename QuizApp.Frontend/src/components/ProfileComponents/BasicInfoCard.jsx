import {Typography, Stack, Box, Paper} from "@mui/material";

function BasicInfoCard({basicInfo}) {
    return (
        <Paper sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
            <Typography variant="h6" color="#fff" fontFamily="Poppins, sans-serif" gutterBottom>
                Basic Info
            </Typography>

            <Stack spacing={2}>
                {basicInfo.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#aaa' }}>
                                {item.label}
                            </Typography>
                            <Typography sx={{ color: '#fff' }}>{item.value}</Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}

export default BasicInfoCard;