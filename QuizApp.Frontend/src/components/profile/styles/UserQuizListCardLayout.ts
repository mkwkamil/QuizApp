import { styled } from "@mui/material/styles";
import { Box, Button, Paper } from "@mui/material";

export const UserQuizListWrapper = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    flex: 1,
});

export const UserQuizCard = styled(Paper)({
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    transition: "all 0.3s",
    "&:hover": {
        background: "rgba(255,255,255,0.1)",
        transform: "translateY(-2px)",
    },
});

export const UserQuizInfoBox = styled(Box)({});

export const EditQuizButton = styled(Button)({
    color: "#00e5ff",
    borderColor: "#00e5ff",
    "&:hover": {
        backgroundColor: "rgba(0, 229, 255, 0.1)",
    },
});

export const DeleteQuizButton = styled(Button)({
    color: "#AF1323FF",
    borderColor: "#AF1323FF",
    "&:hover": {
        backgroundColor: "rgba(175, 19, 35, 0.2)",
    },
});