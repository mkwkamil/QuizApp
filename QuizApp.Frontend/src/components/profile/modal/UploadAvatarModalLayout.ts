import { Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AvatarModalBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1e1e1e",
    padding: 32,
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    width: 400,
    color: "#fff",
});

export const AvatarPreview = styled(Avatar)({
    width: 80,
    height: 80,
    marginBottom: 16,
    alignSelf: "center",
});