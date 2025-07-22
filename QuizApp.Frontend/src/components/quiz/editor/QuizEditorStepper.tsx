import { Step, StepLabel, Box } from "@mui/material";
import { StyledStepper } from "@components/quiz/editor/styles/QuizEditorLayout.ts";

const steps = ["Quiz Info", "Add Questions", "Review & Publish"];

const QuizEditorStepper = ({ activeStep }: { activeStep: number; }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <StyledStepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </StyledStepper>
        </Box>
    );
};

export default QuizEditorStepper;