import { styled } from "@mui/system";
import {Box, IconButton, Paper, Stack} from "@mui/material";

export const ProfileUserCardWrapper = styled(Paper)({
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
    position: "relative",
});

export const ProfileEditIconButton = styled(IconButton)({
    position: "absolute",
    top: 10,
    right: 10,
    color: "#ccc",
});

export const ProfileStatsChips = styled(Stack)({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    paddingTop: 6,
    width: "100%"
});

export const ProfileChip = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 16px",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#ccc",
    border: "1px solid rgba(255,255,255,0.15)",
    cursor: "pointer",
    flexGrow: 1,
    minWidth: 100,
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
    }
});