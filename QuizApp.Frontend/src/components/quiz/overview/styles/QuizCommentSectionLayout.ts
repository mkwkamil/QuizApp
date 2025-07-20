import { styled } from "@mui/material/styles";
import {Box, Paper, Typography} from "@mui/material";

export const QuizCommentsPaper = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: "#1e1e1e",
});

export const QuizLoadMoreCommentsButton = styled(Typography)({
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

export const QuizCommentBox = styled(Box)({
    marginBottom: 16,
    padding: 16,
    background: "#2a2a2a",
    borderRadius: 12,
});