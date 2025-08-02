import { styled } from "@mui/material/styles";
import {Box, Button, Slider} from "@mui/material";

export const AvatarPreviewBox = styled(Box)({
    position: "relative",
    height: "300px",
    background: "#151515",
    width: "95%",
    alignSelf: "center",
    border: "5px solid rgba(100, 100, 100, 0.2)",
    borderRadius: "16px",
    overflow: "hidden",
    "&:hover": {
        background: "#111",
    }
});

export const DarkSlider = styled(Slider)({
    color: "#90caf9",
    height: 4,
    width: "95%",
    alignSelf: "center",
    padding: "13px 0",
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "none",
        transition: "background-color 0.2s",
        '&:hover': {
            backgroundColor: "#eee",
            boxShadow: "none",
        },
        '&:focus, &:active': {
            boxShadow: "none",
        },
    },
    '& .MuiSlider-track': {
        height: 7,
        borderRadius: 2,
        backgroundColor: "#333",
        border: "1px solid transparent",
    },
    '& .MuiSlider-rail': {
        height: 4,
        opacity: 0.4,
        backgroundColor: "#ccc",
        borderRadius: 2,
    },
});

export const ConfirmCancelButton = styled(Button)({
    backgroundColor: 'rgba(183, 28, 28, 0.14)',
    color: '#CF2828FF',
    fontWeight: 600,
    textTransform: "none",
    padding: 8,
    fontSize: 14,
    borderRadius: 10,
    transition: 'background-color 0.25s ease, color 0.25s ease',
    "&:hover": {
        backgroundColor: 'rgba(183, 28, 28, 0.22)',
        borderColor: '#d32f2f',
        color: '#f41919',
    },
});

export const ConfirmUpdateButton = styled(Button)({
    backgroundColor: 'rgba(50, 62, 170, 0.18)',
    color: '#ccc',
    fontWeight: 600,
    textTransform: "none",
    padding: 8,
    fontSize: 14,
    borderRadius: 10,
    transition: 'background-color 0.25s ease, color 0.25s ease',
    "&:hover": {
        backgroundColor: 'rgba(50, 62, 170, 0.32)',
        borderColor: '#d32f2f',
        color: '#eee',
    },
});
