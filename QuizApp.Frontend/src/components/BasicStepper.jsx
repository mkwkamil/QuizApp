import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";

const steps = ["Quiz Info", "Add Questions", "Review & Publish"];

function BasicStepper({ activeStep, setActiveStep, isFormValid }) {
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 2 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Button
                    disabled={activeStep === steps.length - 1 || !isFormValid}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}

export default BasicStepper;