import {Paper, Typography, Stack, Chip} from "@mui/material";

function AchievementsCard({achievements}) {
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
                Achievements
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1}>
                {achievements.map(ach => (
                    <Chip
                        key={ach.id}
                        icon={<span style={{ fontSize: '1rem' }}>{ach.icon}</span>}
                        label={ach.name}
                        color={ach.unlocked ? 'success' : 'default'}
                        sx={{
                            color: 'white',
                            opacity: ach.unlocked ? 1 : 0.6,
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}
                    />
                ))}
            </Stack>
        </Paper>
    );
}

export default AchievementsCard;