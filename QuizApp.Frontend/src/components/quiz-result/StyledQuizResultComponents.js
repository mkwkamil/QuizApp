import {styled} from "@mui/system";
import {Box, Button} from "@mui/material";

export const ReviewBox = styled(Box)({
    textAlign: "center",
    padding: 30,
    border: "1px solid #333",
    borderRadius: 16,
    backgroundColor: "#111",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "#1b1b1b",
    },
});

export const ResultBox = styled(Box)(({ passed }) => ({
    textAlign: "center",
    background: passed
        ? "linear-gradient(135deg, #1e3a8a, #1e293b)"
        : "linear-gradient(135deg, #7f1d1d, #111827)",
    color: "white",
    borderRadius: "24px",
    padding: "48px 32px",
    marginBottom: "32px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
}));

export const TryAgainButton = styled(Button)({
    minWidth: "160px",
    padding: "10px 24px",
    fontWeight: 500,
    fontSize: "15px",
    borderRadius: "12px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#fef2f2",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    boxShadow: "none",
    textTransform: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    "&:hover": {
        backgroundColor: "rgba(239, 68, 68, 0.25)",
        borderColor: "rgba(239, 68, 68, 0.6)",
        transform: "translateY(-1px)",
        boxShadow: "0 2px 12px rgba(239, 68, 68, 0.15)"
    },
    "&:active": {
        transform: "scale(0.98) translateY(0)",
        backgroundColor: "rgba(239, 68, 68, 0.2)"
    },
    "&:focus-visible": {
        outline: "2px solid rgba(239, 68, 68, 0.5)",
        outlineOffset: "2px"
    }
});

export const ExploreButton = styled(Button)({
    minWidth: "160px",
    padding: "10px 24px",
    fontWeight: 500,
    fontSize: "15px",
    borderRadius: "12px",
    backgroundColor: "rgba(96, 165, 250, 0.15)",
    color: "#f0f9ff",
    border: "1px solid rgba(96, 165, 250, 0.4)",
    boxShadow: "none",
    textTransform: "none",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    "&:hover": {
        backgroundColor: "rgba(96, 165, 250, 0.25)",
        borderColor: "rgba(96, 165, 250, 0.6)",
        transform: "translateY(-1px)",
        boxShadow: "0 2px 12px rgba(96, 165, 250, 0.15)"
    },
    "&:active": {
        transform: "scale(0.98) translateY(0)",
        backgroundColor: "rgba(96, 165, 250, 0.2)"
    },
    "&:focus-visible": {
        outline: "2px solid rgba(96, 165, 250, 0.5)",
        outlineOffset: "2px"
    }
});