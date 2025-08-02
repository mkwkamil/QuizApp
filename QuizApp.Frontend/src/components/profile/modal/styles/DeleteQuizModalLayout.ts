import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const ConfirmCancelButton = styled(Button)({
    backgroundColor: 'rgba(50, 64, 112, 0.42)',
    color: '#ddd',
    fontWeight: 600,
    textTransform: "none",
    padding: 8,
    fontSize: 14,
    borderRadius: 10,
    transition: 'background-color 0.25s ease, color 0.25s ease',
    "&:hover": {
        backgroundColor: 'rgba(50, 64, 112, 0.32)',
        borderColor: '#d32f2f',
        color: '#aaa',
    },
});

export const ConfirmDeleteButton = styled(Button)({
    backgroundColor: 'rgba(183, 28, 28, 0.22)',
    color: '#d32f2f',
    fontWeight: 600,
    textTransform: "none",
    padding: 8,
    fontSize: 14,
    borderRadius: 10,
    transition: 'background-color 0.25s ease, color 0.25s ease',
    "&:hover": {
        backgroundColor: 'rgba(183, 28, 28, 0.32)',
        borderColor: '#d32f2f',
        color: '#f41919',
    },
});