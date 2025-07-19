import {styled} from "@mui/material/styles";
import {Box, Button, LinearProgress, Paper} from "@mui/material";

export const LayoutWrapper = styled(Box)({
    display: "flex",
    gap: 24,
    padding: 32,
});

export const QuestionBox = styled(Paper)({
    padding: 32,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
});

export const AnswerOption = styled(Button, {
    shouldForwardProp: (prop) => prop !== "selected"
})(({ selected }) => ({
    textTransform: "none",
    justifyContent: "flex-start",
    padding: "16px 24px",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    background: selected ? "linear-gradient(90deg, #4e00c2, #8e2de2)" : "#2a2a2a",
    border: "1px solid rgba(255,255,255,0.1)",
    '&:hover': {
        background: selected ? "#3d00a4" : "#333",
        borderColor: "rgba(255,255,255,0.2)"
    }
}));

export const SidebarWrapper = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
});

export const MainWrapper = styled(Box)({
    flex: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2
});

export const ThumbnailBox = styled(Box)({
    width: "100%",
    height: 180,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
});

export const LinearProgressBar = styled(LinearProgress)({
    height: 10,
    marginBottom: "25px",
    borderRadius: 5,
    backgroundColor: "#333",
    "& .MuiLinearProgress-bar": {
        background: "linear-gradient(90deg, #4e00c2, #8e2de2)"
    },
})

export const StyledSubmitQuizButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '10px 20px',
    fontSize: 16,
    background: 'linear-gradient(90deg, #4e00c2, #8e2de2)',
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(90deg, #3d00a4, #7b24c4)',
    }
})

export const StyledPrevButton = styled(Button)(({ current }) => ({
    fontWeight: 600,
    fontSize: '15px',
    padding: '10px 32px',
    minWidth: '160px',
    borderRadius: '8px',
    background: current === 0 ? '#444' : 'linear-gradient(135deg, #7B2CBF, #5A189A)',
    color: '#fff',
    boxShadow: current === 0 ? 'none' : '0 2px 6px rgba(125, 45, 255, 0.3)',
    transition: 'background 0.3s ease',
    '&:hover': {
        background: current === 0 ? '#444' : 'linear-gradient(135deg, #4C1D95, #3B0A67)',
    },
}));


export const StyledNextButton = styled(Button)(({ current, total }) => ({
    fontWeight: 600,
    fontSize: '15px',
    padding: '10px 32px',
    minWidth: '160px',
    borderRadius: '8px',
    background: current === total - 1 ? '#444' : 'linear-gradient(135deg, #3c58d6, #3A0CA3)',
    color: '#fff',
    boxShadow: current === 0 ? 'none' : '0 2px 6px rgba(125, 45, 255, 0.3)',
    transition: 'background 0.3s ease',
    '&:hover': {
        background: current === total - 1 ? '#444' : 'linear-gradient(135deg, #203691, #29087A)',
    },
}));