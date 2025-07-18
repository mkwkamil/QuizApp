import {SidebarCard} from "../quiz/StyledQuizPageComponents";
import {ThumbnailBox} from "./StyledQuizSolveComponents";
import {Typography} from "@mui/material";

export default function QuizInfoCard({ quizData, th = 180 }) {
    return (
        <SidebarCard>
            <ThumbnailBox sx={{ backgroundImage: `url(${quizData.thumbnailUrl})`, height: th }} />
            <Typography variant="subtitle1" fontWeight={700}>{quizData.title}</Typography>
            <Typography variant="body2" color="text.secondary">
                {quizData.description}
            </Typography>
        </SidebarCard>
    );
}