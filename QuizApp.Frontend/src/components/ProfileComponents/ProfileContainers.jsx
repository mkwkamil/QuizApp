import {Box} from "@mui/material";
import { styled } from "@mui/system";
export const ProfileSidebarContainer = styled(Box)({
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
});

export const ProfileMainContainer = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    overflow: 'auto',
});

export const ProfilePageWrapper = styled(Box)({
    display: 'flex',
    minHeight: 'calc(100vh - 130px)',
    padding: 32,
    gap: 32,
    background: 'radial-gradient(circle at top right, #202020 0%, #121212 100%)',
    color: '#ffffff',
});