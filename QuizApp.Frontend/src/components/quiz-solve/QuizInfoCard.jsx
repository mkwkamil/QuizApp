import {SidebarCard} from "../quiz/StyledQuizPageComponents";
import {ThumbnailBox} from "./StyledQuizSolveComponents";
import {Typography} from "@mui/material";

export default function QuizInfoCard({ quizData }) {
    return (
        <SidebarCard sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ThumbnailBox sx={{ backgroundImage: `url(${quizData.thumbnailUrl})` }} />
            <Typography variant="subtitle1" fontWeight={700}>{quizData.title}</Typography>
            <Typography variant="body2" color="text.secondary">
                {quizData.description}
            </Typography>
        </SidebarCard>
    );
}