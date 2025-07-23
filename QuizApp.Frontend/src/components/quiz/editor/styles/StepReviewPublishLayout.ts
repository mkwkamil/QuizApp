import {Box, Chip, Paper, styled, Typography} from "@mui/material";
import {type ChipProps} from "@mui/material";

export const ReviewHeader = styled(Paper)({
    padding: 32,
    borderRadius: 16,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
    display: "flex",
    minHeight: 180,
    marginBottom: 32,
    
});

export const ReviewImageBox = styled(Box)({
    aspectRatio: "16 / 9",
    height: 180,
    borderRadius: 12,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
    marginRight: 32,
});

export const ReviewHeaderText = styled(Typography)({
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    marginBottom: 16,
})

export const ReviewHeaderChip = styled(Chip)<ChipProps>(() => ({
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#ddd",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s ease",
    marginTop: 5,
    padding: 20,
}));