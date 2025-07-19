import { styled } from "@mui/material/styles";
import { Box, Chip, Stack } from "@mui/material";

export const QuizCategoryNavWrapper = styled(Stack)({
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: "8px 16px",
    overflowX: "auto",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    scrollBehavior: "smooth",
    "&.centered": {
        justifyContent: "center",
    },
    "&.leftAligned": {
        justifyContent: "flex-start",
    },
    "&::-webkit-scrollbar": {
        height: 6,
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 3,
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
});

export const QuizCategoryChip = styled(Chip)<{ selected?: boolean }>(({ selected }) => ({
    cursor: "pointer",
    userSelect: "none",
    borderRadius: 24,
    fontWeight: 600,
    fontSize: 14,
    padding: "8px 16px",
    backgroundColor: selected ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.05)",
    color: selected ? "#fff" : "#aaa",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.15)",
        color: "#fff",
    },
}));

export const QuizCategoryNavContainer = styled(Box)({
    flexGrow: 1,
    maxWidth: "100%",
});