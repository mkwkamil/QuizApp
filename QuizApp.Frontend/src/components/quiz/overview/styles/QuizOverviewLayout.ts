import {Box, Paper, styled} from "@mui/material";

export const QuizOverviewWrapper = styled(Box)({
    display: "flex",
    minHeight: "calc(100vh - 135px)",
    gap: 55,
    padding: 35,
    backgroundColor: "#0a0a0a",
    color: "#fff",
    fontFamily: '"Poppins", sans-serif',
    overflow: "auto",
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

export const QuizOverviewMain = styled(Box)({
    flex: 3,
    minWidth: 950,
    display: "flex",
    flexDirection: "column",
    gap: 24,
});

export const QuizOverviewSidebar = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
});

export const QuizSidebarCard = styled(Paper)({
    padding: 28,
    minWidth: 350,
    borderRadius: 12,
    background: "#1c1c1c",
    display: "flex",
    flexDirection: "column",
    gap: 14,
});