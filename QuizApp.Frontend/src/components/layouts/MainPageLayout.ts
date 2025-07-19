import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const MainPageWrapper = styled(Box)({
    minHeight: "calc(100vh - 65px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "#0a0a0a",
    color: "#fff",
});

export const MainPageHeading = styled(Typography)({
    fontSize: "4rem",
    fontWeight: 700,
    marginBottom: "24px",
    textShadow: "0 0 10px rgba(255,255,255,0.3)",
});

export const MainPageSubtext = styled(Typography)({
    marginBottom: "40px",
    maxWidth: 600,
    color: "rgba(255,255,255,0.8)",
});

export const StartCreateButton = styled(Button)({
    background: 'linear-gradient(90deg, #1a237e, #283593)',
    color: '#fff',
    padding: '14px 34px',
    borderRadius: '8px',
    fontWeight: '600',
    letterSpacing: '1px',
    boxShadow: '0 0 15px rgba(48, 79, 254, 0.5)',
    '&:hover': {
        boxShadow: '0 0 15px rgba(48, 79, 254, 0.7)'
    },
    marginRight: "16px",
});

export const ExploreButton = styled(Button)({
    border: "2px solid #3949ab",
    color: "#fff",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: 600,
    letterSpacing: "1px",
    "&:hover": {
        border: "2px solid #5c6bc0",
        background: "rgba(57, 73, 171, 0.1)",
        boxShadow: "0 0 15px rgba(92, 107, 192, 0.4)",
    }
});
