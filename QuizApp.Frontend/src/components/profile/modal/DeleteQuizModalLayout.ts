import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const ConfirmDeleteModalBox = styled(Box)({
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#121212',
    borderRadius: 16,
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    padding: 40,
    width: '90%',
    maxWidth: 460,
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#fff',
});

export const ConfirmCancelButton = styled(Button)({
    borderColor: '#b71c1c',
    color: '#b71c1c',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.25s ease, color 0.25s ease',
    "&:hover": {
        backgroundColor: 'rgba(183, 28, 28, 0.08)',
        borderColor: '#d32f2f',
        color: '#d32f2f',
    },
    "&:active": {
        backgroundColor: 'rgba(183, 28, 28, 0.12)',
    }
});

export const ConfirmDeleteButton = styled(Button)({
    background: "linear-gradient(135deg, #0d47a1, #1565c0)",
    color: "#fff",
    boxShadow: "0 0 3px rgba(21, 101, 192, 0.4)",
    fontWeight: 500,
    textTransform: "none",
    borderRadius: "5px",
    transition: "all 0.25s ease",
    "&:hover": {
        background: "linear-gradient(135deg, #1565c0, #1e88e5)",
        boxShadow: "0 0 6px rgba(30, 136, 229, 0.6)"
    }
});