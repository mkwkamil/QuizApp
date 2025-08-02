import { styled } from "@mui/material/styles";
import {Box, Paper, Typography} from "@mui/material";

export const UserQuizListWrapper = styled(Box)({
    padding: "12px 24px",
    borderRadius: 12,
    flex: 1,
});

export const UserQuizCard = styled(Paper)({
    display: "flex",
    gap: 16,
    padding: 15,
    borderRadius: 12,
    background: "linear-gradient(145deg, #1b1b1b, #262626)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
        transform: "translateY(-1px)",
    },
});

export const UserQuizThumbnail = styled(Box)({
    aspectRatio: "16 / 9",
    height: 80,
    borderRadius: 12,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
    marginRight: 8,
});

export const UserQuizHeader = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "flex-start",
    overflow: "hidden",
});

export const UserQuizDescription = styled(Typography)({
    color: "#aaa",
    fontSize: 11,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    maxWidth: "100%",
});

export const TagTypography = styled(Typography)({
    color: "orange",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
})