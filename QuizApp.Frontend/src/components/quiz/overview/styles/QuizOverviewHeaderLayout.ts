import { Box, Button, Paper, styled } from "@mui/material";

export const QuizOverviewHeaderContainer = styled(Paper)({
    padding: 32,
    borderRadius: 16,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
    display: "flex",
    gap: 32,
    minHeight: 240,
});

export const QuizOverviewImageBox = styled(Box)({
    minWidth: 350,
    borderRadius: 12,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
});

export const QuizOverviewStartButton = styled(Button)({
    background: "linear-gradient(90deg, #4e00c2, #8e2de2)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    padding: "12px 32px",
    borderRadius: 16,
    textTransform: "none",
    transition: "0.3s",
    "&:hover": {
        background: "linear-gradient(90deg, #3d00a4, #7b24c4)",
    },
});