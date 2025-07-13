import { Stack } from "@mui/material";
import {StyledPrevButton, StyledNextButton} from "./StyledQuizSolveComponents";

export default function NavigationButtons({ current, total, setCurrent, setSelected }) {

    const handlePrev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const handleNext = () => {
        if (current < total - 1) {
            setCurrent(current + 1);
        }
    };
    
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <StyledPrevButton onClick={handlePrev} disabled={current === 0} current={current}>
                Previous
            </StyledPrevButton>
            <StyledNextButton onClick={handleNext} disabled={current === total - 1} current={current} total={total}>
                Next
            </StyledNextButton>
        </Stack>
    );
}