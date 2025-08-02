import {Box, Paper, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";

export const FilteredQuizListWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 20,
});

export const FilteredQuizCard = styled(Paper)({
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

export const FilteredQuizThumbnail = styled(Box)({
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

export const FilteredQuizHeader = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "flex-start",
    overflow: "hidden",
});

export const FilteredQuizDescription = styled(Typography)({
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


export const FilteredQuizPaginationBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    paddingBottom: 40,
    marginTop: 50,
    zIndex: 100,
});