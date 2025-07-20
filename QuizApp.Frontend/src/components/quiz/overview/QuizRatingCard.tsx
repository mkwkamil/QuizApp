import { Typography, Stack } from "@mui/material";
import { useRatingSummary } from "@hooks/ratings/useRatingSummary";
import { QuizSidebarCard } from "@components/quiz/overview/styles/QuizOverviewLayout";
import RatingBreakdownBar from "@components/quiz/overview/RatingBreakdownBar";

type Props = {
    quizId: number;
};

const QuizRatingCard = ({ quizId }: Props) => {
    const { data: ratingSummary, isLoading } = useRatingSummary(quizId);

    if (isLoading || !ratingSummary) return null;

    const { average, breakdown } = ratingSummary;
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return (
        <QuizSidebarCard>
            <Typography variant="h6" fontWeight={700}>
                User Ratings
            </Typography>
            <Typography variant="h4" my={1} fontWeight={700}>
                {average.toFixed(1)}
            </Typography>
            <Stack spacing={1}>
                {[5, 4, 3, 2, 1].map((stars) => (
                    <RatingBreakdownBar
                        key={stars}
                        stars={stars}
                        count={breakdown[stars] || 0}
                        total={total}
                    />
                ))}
            </Stack>
        </QuizSidebarCard>
    );
};

export default QuizRatingCard;