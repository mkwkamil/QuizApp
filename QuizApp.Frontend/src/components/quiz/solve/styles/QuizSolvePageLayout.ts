import { styled } from "@mui/material/styles";
import { Box, Button, LinearProgress, Paper } from "@mui/material";

export const QuizSolveWrapper = styled(Box)({
    display: "flex",
    gap: 24,
    padding: 32,
});

export const QuizSolveMain = styled(Box)({
    flex: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2
});

export const QuizSolveSidebar = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
});

export const QuizSolveSidebarCard = styled(Paper)({
    padding: 28,
    minWidth: 350,
    borderRadius: 12,
    background: "#1c1c1c",
    display: "flex",
    flexDirection: "column",
    gap: 14,
});

export const QuizSolveProgress = styled(LinearProgress)({
    height: 10,
    marginBottom: "25px",
    borderRadius: 5,
    backgroundColor: "#333",
    "& .MuiLinearProgress-bar": {
        background: "linear-gradient(90deg, #4e00c2, #8e2de2)"
    },
})

export const QuizSolveQuestionBox = styled(Paper)({
    padding: 32,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
});

export const QuizSolvePaginationBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    paddingBottom: 40,
    marginTop: 50,
    zIndex: 100,
});

export const QuizSolvePrevButton = styled(Button)({
    padding: "10px 24px",
    borderRadius: 8,
    fontWeight: 600,
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.1)",
    textTransform: "none",
    transition: "0.2s",
    "&:hover": {
        backgroundColor: "#333",
        borderColor: "rgba(255,255,255,0.3)",
    },
    "&:disabled": {
        opacity: 0.3,
    },
});

export const QuizSolveNextButton = styled(Button)({
    padding: "10px 24px",
    borderRadius: 8,
    fontWeight: 600,
    background: "linear-gradient(90deg, #4e00c2, #8e2de2)",
    color: "#fff",
    textTransform: "none",
    transition: "0.2s",
    "&:hover": {
        background: "linear-gradient(90deg, #3d00a4, #7b24c4)",
    },
    "&:disabled": {
        opacity: 0.3,
    },
});

export const QuizInfoThumbnail = styled(Box)({
    width: "100%",
    height: 180,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
});

export const QuizSubmitButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '10px 20px',
    fontSize: 16,
    fontWeight: 600,
    background: 'linear-gradient(90deg, #4e00c2, #8e2de2)',
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(90deg, #3d00a4, #7b24c4)',
    }
})

export const QuizAnswerOption = styled(Button, {
    shouldForwardProp: (prop) => prop !== "selected"
})<{ selected: boolean }>(({ selected }) => ({
    textTransform: "none",
    justifyContent: "flex-start",
    padding: "16px 24px",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    background: selected
        ? "linear-gradient(90deg, #4e00c2, #8e2de2)"
        : "#2a2a2a",
    border: "1px solid rgba(255,255,255,0.1)",
    "&:hover": {
        background: selected ? "#3d00a4" : "#333",
        borderColor: "rgba(255,255,255,0.2)"
    }
}));
