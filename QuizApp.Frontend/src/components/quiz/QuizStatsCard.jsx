import { Typography, Stack, Box } from "@mui/material";
import { SidebarCard } from "./StyledQuizPageComponents";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function QuizStatsCard({ quizData }) {
    return (
        <SidebarCard>
            <Typography variant="h6" fontWeight={700} gutterBottom mb={2}>
                Quiz Info
            </Typography>
            <Stack spacing={1.5}>
                <InfoRow icon={<PeopleAltIcon />} label="Plays" value={quizData.plays} />
                <InfoRow icon={<CategoryIcon />} label="Category" value={quizData.category} />
                <InfoRow icon={<HelpOutlineIcon />} label="Difficulty" value={quizData.difficulty} />
                <InfoRow icon={<BarChartIcon />} label="Avg Score" value={`${quizData.averageScore}%`} />
                <InfoRow icon={<SportsScoreIcon />} label="Questions" value={quizData.questionCount} />
            </Stack>
        </SidebarCard>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ color: 'gray' }}>{icon}</Box>
            <Typography variant="body2" sx={{ minWidth: 90 }}>{label}:</Typography>
            <Typography variant="body2" color="text.secondary">{value}</Typography>
        </Box>
    );
}