import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCancelButton = styled(Button)(({ theme }) => ({
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
}));

export const StyledDraftButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
    color: "#333",
    boxShadow: "0 0 6px rgba(160, 160, 160, 0.3)",
    fontWeight: 500,
    textTransform: "none",
    borderRadius: "5px",
    transition: "all 0.25s ease",
    "&:hover": {
        background: "linear-gradient(135deg, #e0e0e0, #d6d6d6)",
        boxShadow: "0 0 10px rgba(180, 180, 180, 0.5)"
    }
}));

export const StyledQuizNextButton = styled(Button)(({ theme }) => ({
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
}));

export const StyledQuizBackButton = styled(Button)(({ theme }) => ({
    
}));

export const StyledMainGlowButton = styled(Button)({
    background: 'linear-gradient(90deg, #1a237e, #283593)',
    color: '#fff',
    padding: '12px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    // minWidth: '220px',
    letterSpacing: '1px',
    boxShadow: '0 0 15px rgba(48, 79, 254, 0.5)',
    '&:hover': {
        boxShadow: '0 0 15px rgba(48, 79, 254, 0.7)'
    }
});

export const StyledMainOutlinedButton = styled(Button)({
    border: '2px solid #3949ab',
    color: '#fff',
    padding: '12px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    letterSpacing: '1px',
    '&:hover': {
        border: '2px solid #5c6bc0',
        background: 'rgba(57, 73, 171, 0.1)',
        boxShadow: '0 0 15px rgba(92, 107, 192, 0.4)'
    }
});