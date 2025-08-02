import {Box, Paper, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";

export const PopularQuizListWrapper = styled(Paper)({
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    borderRadius: 12,
    padding: "20px 16px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    overflowY: "auto",
});

export const PopularQuizCard = styled(Paper)({
    display: "flex",
    gap: 16,
    padding: "15px 10px",
    borderRadius: 12,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
        transform: "translateY(-2px)",
    },
});

export const PopularQuizThumbnail = styled(Box)({
    aspectRatio: "16 / 11",
    height: 80,
    borderRadius: 12,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
});

export const PopularQuizInfo = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
    gap: 15
});

export const PopularQuizTitle = styled(Typography)({
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    maxWidth: "100%",
    fontWeight: 600,
    fontSize: 16
});