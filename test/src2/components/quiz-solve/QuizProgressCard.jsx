import {SidebarCard} from "../quiz/StyledQuizPageComponents";
import {Typography} from "@mui/material";
import {LinearProgressBar, StyledSubmitQuizButton} from "./StyledQuizSolveComponents";

export default function QuizSidebar({ progress, current, total, time, onSubmit }) {
    
    return (
        <SidebarCard sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" fontWeight={700}>Quiz Progress</Typography>
            <Typography variant="body2">Question: {current} / {total}</Typography>
            <Typography variant="body2">Time: {time}</Typography>
            <LinearProgressBar variant="determinate" value={progress} sx={{marginY: 1.5}} />
            <StyledSubmitQuizButton onClick={onSubmit} disabled={progress < 100}>
                Submit Quiz
            </StyledSubmitQuizButton>
        </SidebarCard>
    );
}