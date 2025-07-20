import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import { QuizSidebarCard } from "@components/quiz/overview/styles/QuizOverviewLayout.ts";

type QuizOverviewStatsCardProps = {
    quizData: {
        plays: number;
        category: string;
        difficulty: string;
        averageScore: number;
        questionCount: number;
    };
};

const QuizOverviewStatsCard = ({ quizData }: QuizOverviewStatsCardProps) => {
    return (
        <QuizSidebarCard>
            <Typography variant="h6" fontWeight={700} gutterBottom mb={2}>
                Quiz Info
            </Typography>
            <Stack spacing={1.5}>
                <Stat icon={<PeopleAltIcon />} label="Plays" value={quizData.plays} />
                <Stat icon={<CategoryIcon />} label="Category" value={quizData.category} />
                <Stat icon={<HelpOutlineIcon />} label="Difficulty" value={quizData.difficulty} />
                <Stat icon={<BarChartIcon />} label="Avg Score" value={`${quizData.averageScore}%`} />
                <Stat icon={<SportsScoreIcon />} label="Questions" value={quizData.questionCount} />
            </Stack>
        </QuizSidebarCard>
    );
};

export default QuizOverviewStatsCard;

type StatProps = {
    icon: React.ReactNode;
    label: string;
    value: string | number;
};

const Stat = ({ icon, label, value }: StatProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ color: 'gray' }}>{icon}</Box>
        <Typography variant="body2" sx={{ minWidth: 90 }}>{label}:</Typography>
        <Typography variant="body2" color="text.secondary">{value}</Typography>
    </Box>
);