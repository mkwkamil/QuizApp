import { Box, Paper } from "@mui/material";
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

export const FilteredQuizContent = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
});

export const FilteredQuizPaginationBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    paddingBottom: 40,
    marginTop: 50,
    zIndex: 100,
});