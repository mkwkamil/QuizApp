import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ExploreLayoutWrapper = styled(Box)({
    minHeight: "100vh",
    display: "flex",
    gap: 25,
    padding: 15,
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

export const ExploreSidebar = styled(Box)({
    minWidth: 470,
    maxWidth: 470,
    padding: 16,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 34,
    overflowY: "auto",
});

export const ExploreMainContent = styled(Box)({
    paddingTop: 16,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 600,
    maxWidth: 1500,
    gap: 20,
});