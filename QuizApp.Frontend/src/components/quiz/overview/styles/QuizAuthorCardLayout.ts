import {Box, Button, styled} from "@mui/material";

export const QuizAuthorInfo = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

export const UserFollowButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '4px 20px',
    fontSize: 14
});

export const UserMessageButton = styled(Button)({
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
