import {Box} from "@mui/material";
import { styled } from "@mui/system";
export const ProfileSidebarContainer = styled(Box)({
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    minWidth: '350px',
});

export const ProfileMainContainer = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    minWidth: '600px',
    overflow: 'auto',
});

export const ProfilePageWrapper = styled(Box)({
    display: 'flex',
    minHeight: 'calc(100vh - 130px)',
    padding: 32,
    gap: 32,
    background: 'radial-gradient(circle at top right, #202020 0%, #121212 100%)',
    color: '#ffffff',
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