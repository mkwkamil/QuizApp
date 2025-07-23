import {styled} from "@mui/system";
import {Box, Button, Stepper, Typography} from "@mui/material";

export const QuizEditorWrapper = styled(Box)({
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
    marginTop: 32,
    padding: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
})

export const StepContainer = styled(Box)({
    minWidth: "75%",
    padding: "32px",
    margin: "0 auto",
});

export const StyledStepper = styled(Stepper)({
    backgroundColor: "transparent",
    "& .MuiStepIcon-root": {
        color: "#999",
        borderRadius: "6px",
        background: "#999",
        padding: "2px"
    },
    "& .MuiStepIcon-root.Mui-active": {
        color: "#2196f3",
        borderRadius: "6px",
        background: "#2196f3",
        boxShadow: "0 0 8px rgba(33, 150, 243, 0.6)",
        padding: "2px"
    },
    "& .MuiStepIcon-root.Mui-completed": {
        color: "#4caf50",
        background: "none",
    },
    "& .MuiStepLabel-label": {
        color: "#aaa"
    },
    "& .MuiStepLabel-label.Mui-active": {
        color: "#2196f3",
        fontWeight: 600
    },
    "& .MuiStepLabel-label.Mui-completed": {
        color: "#4caf50",
        fontWeight: 600,
    },
})

export const SectionTitle = styled(Typography)({
    fontWeight: 700,
    paddingBottom: "30px"
});

export const QuizFieldErrorText = styled(Typography)({
    fontSize: "0.75rem",
    color: "#f44336"
});

export const StyledCancelButton = styled(Button)({
    backgroundColor: 'rgba(183, 28, 28, 0.12)',
    color: '#b71c1c',
    fontWeight: 600,
    textTransform: "none",
    padding: "12px 24px",
    fontSize: 14,
    borderRadius: 10,
    transition: 'background-color 0.25s ease, color 0.25s ease',
    "&:hover": {
        backgroundColor: 'rgba(183, 28, 28, 0.18)',
        borderColor: '#d32f2f',
        color: '#d32f2f',
    },
});

export const StyledDraftButton = styled(Button)({
    background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
    color: "#333",
    boxShadow: "0 0 6px rgba(160, 160, 160, 0.3)",
    fontWeight: 600,
    textTransform: "none",
    padding: "12px 24px",
    fontSize: 14,
    borderRadius: 10,
    transition: "all 0.25s ease",
    "&:hover": {
        background: "linear-gradient(135deg, #e0e0e0, #d6d6d6)",
        boxShadow: "0 0 10px rgba(180, 180, 180, 0.5)"
    }
});

export const StyledQuizBackButton = styled(Button)({
    background: "linear-gradient(135deg, #4A4A4A, #2E2E2E)",
    color: "#fff",
    boxShadow: "0 0 3px rgba(80, 80, 80, 0.4)",
    fontWeight: 600,
    textTransform: "none",
    padding: "12px 24px",
    fontSize: 14,
    borderRadius: 10,
    transition: "all 0.25s ease",
    "&:hover": {
        background: "linear-gradient(135deg, #3A3A3A, #1F1F1F)",
    }
});

export const StyledQuizNextButton = styled(Button)({
    background: "linear-gradient(135deg, #1B55AC, #094180)",
    color: "#fff",
    boxShadow: "0 0 3px rgba(21, 101, 192, 0.4)",
    fontWeight: 600,
    textTransform: "none",
    padding: "12px 24px",
    fontSize: 14,
    borderRadius: 10,
    transition: "all 0.25s ease",
    "&:hover": {
        background: "linear-gradient(135deg, #163F84, #04274E)",
    }
});