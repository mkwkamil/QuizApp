import { styled } from "@mui/material/styles";
import { Paper, Button, TextField } from "@mui/material";

export const QuizCommentSection = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: "#1e1e1e",
});

export const QuizCommentField = styled(TextField)({
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    "& .MuiOutlinedInput-root": {
        padding: "10px",
        fontSize: 14,
        color: "#fff",
        borderRadius: 12,
        "& fieldset": {
            borderColor: "rgba(255,255,255,0.1)",
        },
        "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.25)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#8e2de2",
        },
    },
    "& textarea": {
        resize: "none",
    },
});

export const QuizCommentSubmitButton = styled(Button)({
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    padding: "16px 20px",
    fontSize: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    alignSelf: "flex-start",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "#333",
        borderColor: "rgba(255,255,255,0.3)",
    },
});
