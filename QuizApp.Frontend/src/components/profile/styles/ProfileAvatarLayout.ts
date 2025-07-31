import { Box, styled } from "@mui/material";

export const ProfileAvatarWrapper = styled(Box)({
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: "50%",
    overflow: "visible",
    boxShadow: "0 0 20px rgba(0, 130, 255, 0.7)",
    border: "2px solid",
    borderColor: "#1976d2",
    cursor: "pointer"
});

export const ProfileAvatarHover = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    zIndex: 2
});