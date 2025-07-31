import {Avatar, Box, Chip, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardWrapper = styled(Paper)({
    padding: "18px",
    marginBottom: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
});

export const QuestionHeader = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
});

export const QuestionAvatar = styled(Avatar)({
    backgroundColor: "rgba(64, 180, 170, 0.25)",
    color: "#fff",
    marginRight: "16px",
    fontSize: "17px",
    fontWeight: 600,
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
});

export const QuestionText = styled(Typography)({
    fontWeight: 600,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    flex: 1,
});

export const OptionItem = styled(ListItem)({
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "12px",
    paddingBottom: "12px",
    borderRadius: "8px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
});

export const OptionText = styled(ListItemText, {
    shouldForwardProp: (prop) => prop !== "correct",
})<{ correct?: boolean }>(({ correct }) => ({
    "& .MuiListItemText-primary": {
        fontSize: 15,
        color: correct ? "#4caf50" : "inherit",
        fontWeight: correct ? 600 : 400,
    },
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
}));

export const TypeChip = styled(Chip)({
    color: "#ccc",
    borderColor: "#555",
    fontWeight: 500,
    fontSize: "13px",
    marginLeft: "15px",
});
