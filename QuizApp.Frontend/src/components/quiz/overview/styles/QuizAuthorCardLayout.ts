import {Box, Button, styled} from "@mui/material";

export const QuizAuthorInfo = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

export const UserFollowButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '5px',
    width: '120px',
    fontSize: 14,
    fontWeight: 600,
    background: 'linear-gradient(90deg, #4e00c2, #8e2de2)',
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(90deg, #3d00a4, #7b24c4)',
    }
});

export const UserUnfollowButton = styled(Button)({
    borderRadius: 8,
    textTransform: 'none',
    padding: '5px',
    width: '120px',
    fontSize: 14,
    fontWeight: 600,
    background: 'linear-gradient(90deg, #2d2e30, #424543)',
    color: '#ddd',
    '&:hover': {
        background: 'linear-gradient(90deg, #232728, #313439)',
    }
});