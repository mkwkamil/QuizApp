import { styled } from "@mui/system";
import { Box, Paper } from "@mui/material";

export const BasicInfoCardWrapper = styled(Paper)({
    padding: "20px 25px",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
});

export const BasicInfoItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 16
});