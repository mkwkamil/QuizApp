import { Box, Paper } from "@mui/material";
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
    padding: 15,
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
    width: 100,
    minWidth: 100,
    height: 80,
    minHeight: 80,
    borderRadius: 8,
    backgroundColor: "#444",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    overflow: "hidden",
});

export const PopularQuizInfo = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
});