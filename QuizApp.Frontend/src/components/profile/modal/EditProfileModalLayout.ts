import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const EditProfileModalBox = styled(Box)({
    maxWidth: 420,
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    padding: 32,
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
});