import { styled } from "@mui/system";
import {Box, IconButton, Stack} from "@mui/material";

export const ProfileUserCardWrapper = styled(Box)({
    padding: 24,
    borderRadius: 16,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
    position: "relative"
});

export const ProfileEditIconButton = styled(IconButton)({
    position: "absolute",
    top: 8,
    right: 8,
    color: "#ccc",
});

export const ProfileStatsChips = styled(Stack)({
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
});