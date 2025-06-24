import useAuthStore from "../store/authStore";
import LoginPage from "./Auth/LoginPage";
import {Box, Typography} from "@mui/material";
import { useState } from "react";
import QuizStepper from "../components/QuizComponents/QuizStepper";
import FirstStage from "../components/QuizComponents/FirstStage";
import SecondStage from "../components/QuizComponents/SecondStage";

function QuizPage() {
    const user = useAuthStore(state => state.user);
    const [activeStep, setActiveStep] = useState(1);
    const [isFormValid, setIsFormValid] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {user ? (
                <Box sx={{ width: "100%", maxWidth: 1200, margin: "auto", padding: 2, alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <QuizStepper activeStep={activeStep} />

                    {activeStep === 0 && (
                        <FirstStage isFormValid={isFormValid} setIsFormValid={setIsFormValid} setActiveStep={setActiveStep} />
                    )}

                    {activeStep === 1 && (
                        <SecondStage setActiveStep={setActiveStep} />
                    )}

                    {activeStep === 2 && (
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h5">Review & Publish</Typography>
                            {/* TODO: Review summary & submission logic */}
                        </Box>
                    )}
                </Box>
            ) : (
                <LoginPage />
            )}
        </div>
    );
}

export default QuizPage;