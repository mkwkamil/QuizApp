import { Typography } from "@mui/material";
import { QuizInfoThumbnail, QuizSolveSidebarCard } from "@components/quiz/solve/styles/QuizSolvePageLayout";

interface QuizInfoCardProps {
    quizData: {
        thumbnailUrl: string;
        title: string;
        description: string;
    };
    th?: number;
}

const QuizInfoCard = ({ quizData, th = 180 }: QuizInfoCardProps) => {
    return (
        <QuizSolveSidebarCard>
            <QuizInfoThumbnail sx={{ backgroundImage: `url(${quizData.thumbnailUrl})`, height: th }} />
            <Typography variant="subtitle1" fontWeight={700}>{quizData.title}</Typography>
            <Typography variant="body2" color="text.secondary">
                {quizData.description}
            </Typography>
        </QuizSolveSidebarCard>
    );
};

export default QuizInfoCard;