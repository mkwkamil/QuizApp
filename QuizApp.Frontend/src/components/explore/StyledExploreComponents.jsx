import {styled} from "@mui/system";
import {Avatar, Box, Chip, Fab, Paper, Stack, Switch} from "@mui/material";

export const HeroContainer = styled(Box)({
    display: 'flex',
    minHeight: "calc(100vh - 135px)",
    gap: 55,
    padding: 35,
    backgroundColor: '#0a0a0a',
    color: '#fff',
    fontFamily: '"Poppins", sans-serif',
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

export const Sidebar = styled(Box)({
    minWidth: 450,
    maxWidth: 450,
    padding: 16,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 34,
    overflowY: 'auto',
});

export const FiltersBox = styled(Paper)({
    padding: 16,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
});

export const PopularQuizzesBox = styled(Paper)({
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    borderRadius: 12,
    padding: '20px 16px',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    overflowY: 'auto',
});

export const MainContent = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 600,
    maxWidth: 1500,
    gap: 20,
});

export const CategoryNav = styled(Stack)(({ centered }) => ({
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: '8px 16px',
    justifyContent: centered ? "center" : "flex-start",
    overflowX: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    scrollBehavior: 'smooth',
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
}));

export const CategoryButton = styled(Chip)(({ selected }) => ({
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: 24,
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 16px',
    backgroundColor: selected ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.05)',
    color: selected ? '#fff' : '#aaa',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: '#fff',
    },
}));

export const FiltersButton = styled(Chip)(({ selected }) => ({
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: selected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
    color: selected ? '#fff' : '#aaa',
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 16px',
    width: '50%',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: '#fff',
    },
}));

export const QuizCard = styled(Paper)({
    display: 'flex',
    gap: 16,
    padding: 15,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
    }
});

export const QuizThumbnail = styled(Box)({
    width: 100,
    minWidth: 100,
    height: 80,
    minHeight: 80,
    borderRadius: 8,
    backgroundColor: '#444',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
});

export const QuizInfo = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
});

export const ProfileSidebar = styled(Paper)({
    padding: "35px 20px",
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: 34,
    overflowY: 'auto',
});

export const ProfileHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
});

export const ProfileAvatar = styled(Avatar)({
    width: 64,
    height: 64,
    boxShadow: '0 0 10px rgba(0,144,255,0.6)',
});

export const StatsChips = styled(Stack)({
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
});

export const StatsBox = styled(Paper)({
    padding: 16,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    height: 180,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ddd',
    fontStyle: 'italic',
});

export const PromoBox = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    textAlign: 'center',
});

export const SupportFeb = styled(Fab)({
    position: 'fixed',
    bottom: 40,
    right: 40,
    zIndex: 1300,
    backgroundColor: 'rgba(24,42,159)',
    '&:hover': {
        backgroundColor: 'rgba(24,42,159,0.7)',
    },
});

export const PaginationBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 40,
    marginTop: 50,
    zIndex: 100,
});

export const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 1,
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#1976d2',
                opacity: 1,
                border: 0,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',
        width: 24,
        height: 24,
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
    },
    '& .MuiSwitch-track': {
        borderRadius: 13,
        backgroundColor: '#888',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 200,
        }),
    },
}));