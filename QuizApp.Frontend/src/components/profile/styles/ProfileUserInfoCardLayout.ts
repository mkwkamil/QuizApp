import { styled } from "@mui/system";
import { Box, Paper } from "@mui/material";

export const BasicInfoCardWrapper = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
});

export const BasicInfoItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 16
});