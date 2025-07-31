import {Box} from "@mui/material";
import { styled } from "@mui/system";
export const ProfilePageWrapper = styled(Box)({
    display: 'flex',
    padding: 32,
    gap: 32,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        height: 6,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    }
});

export const ProfilePageSidebar = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 24,
});

export const ProfilePageMain = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
    gap: 24,
});
