import { Typography } from "@mui/material";
import { QuizAnswerReviewBox } from "@components/quiz/result/QuizResultPageLayout";

const QuizAnswerReviewCard = () => {
    return (
        <QuizAnswerReviewBox>
            <Typography variant="h6" fontWeight="bold">
                Review Your Answers
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
                See what you got right or wrong
            </Typography>
        </QuizAnswerReviewBox>
    );
};

export default QuizAnswerReviewCard;