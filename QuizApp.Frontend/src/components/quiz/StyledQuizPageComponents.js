import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainColumn = styled(Box)({
    flex: 3,
    minWidth: 950,
    display: "flex",
    flexDirection: "column",
    gap: 24,
});

export const QuizHeaderBox = styled(Paper)({
    padding: 32,
    borderRadius: 16,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
    display: "flex",
    gap: 32,
    minHeight: 240,
});

export const QuizImage = styled(Box)({
    minWidth: 350,
    borderRadius: 12,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
});

export const StartQuizButton = styled(Button)({
    background: "linear-gradient(90deg, #4e00c2, #8e2de2)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    padding: "12px 32px",
    borderRadius: 16,
    textTransform: "none",
    transition: "0.3s",
    "&:hover": {
        background: "linear-gradient(90deg, #3d00a4, #7b24c4)",
    },
});

export const SectionBox = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: "#1e1e1e",
});

export const CommentBox = styled(Box)({
    marginBottom: 16,
    padding: 16,
    background: "#2a2a2a",
    borderRadius: 12,
});

export const SidebarBox = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
});

export const SidebarCard = styled(Paper)({
    padding: 28,
    minWidth: 450,
    borderRadius: 12,
    background: "#1c1c1c",
});

export const RatingBarBackground = styled(Box)({
    flex: 1,
    height: 8,
    background: "#333",
    borderRadius: 4,
    overflow: "hidden",
});

export const RatingBarFill = styled(Box)(({ percent }) => ({
    width: `${percent}%`,
    height: "100%",
    background: "#ffd700",
}));

export const StyledFollowButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '4px 20px',
    fontSize: 14
});

export const StyledMessageButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '4px 20px',
    fontSize: 14,
    background: 'linear-gradient(90deg, #4e00c2, #8e2de2)',
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(90deg, #3d00a4, #7b24c4)',
    }
});

export const UserInfoBox = styled(Box)({
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
})

export const MatchedCommentField = styled(TextField)({
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    '& .MuiOutlinedInput-root': {
        padding: '10px',
        fontSize: 14,
        color: '#fff',
        borderRadius: 12,
        '& fieldset': {
            borderColor: 'rgba(255,255,255,0.1)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255,255,255,0.25)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#8e2de2',
        }
    },
    '& textarea': {
        resize: 'none',
    }
});

export const StyledCommentButton = styled(Button)({
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'none',
    padding: '16px 20px',
    fontSize: 14,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    alignSelf: 'flex-start',
    transition: '0.3s',
    '&:hover': {
        backgroundColor: '#333',
        borderColor: 'rgba(255,255,255,0.3)',
    }
});

export const LoadMoreText = styled(Typography)({
    marginTop: 25,
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover': {
        color: '#fff',
        textDecoration: 'underline'
    }
});