import {ReviewBox} from './StyledQuizResultComponents';
import {Typography} from "@mui/material";

export default function ReviewAnswersCard() {
    return (
        <ReviewBox>
            <Typography variant="h6" fontWeight="bold">
                Review Your Answers
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
                See what you got right or wrong
            </Typography>
        </ReviewBox>
    )
}