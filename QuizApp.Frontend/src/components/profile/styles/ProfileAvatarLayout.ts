import { Box, Avatar, styled } from "@mui/material";

export const ProfileAvatarWrapper = styled(Box)({
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: "50%",
    overflow: "visible",
    boxShadow: "0 0 30px rgba(70, 130, 255, 0.9)",
    border: "3px solid",
    borderColor: "#1976d2",
    cursor: "pointer"
});

export const ProfileAvatarHover = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    bgcolor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    zIndex: 2
});

export const AvatarModalBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#1e1e1e",
    p: 4,
    borderRadius: 12,
    boxShadow: "0 0 30px rgba(0,0,0,0.4)",
    width: 400,
    color: "#fff"
});

export const AvatarPreview = styled(Avatar)({
    width: 80,
    height: 80,
    marginBottom: 16
});