import { Stepper, Step, StepLabel, Box } from "@mui/material";

const steps = ["Quiz Info", "Add Questions", "Review & Publish"];

function QuizStepper({ activeStep }) {
    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default QuizStepper;