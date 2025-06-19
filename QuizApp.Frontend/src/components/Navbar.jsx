import React from 'react';
import { Link } from "react-router-dom";
import useAuthStore from '../store/authStore';
import { useAuth } from "../hooks/useAuth";
import {
    AppBar, Toolbar, Typography, Button, IconButton, InputBase, Badge,
    Menu, MenuItem, Box, Stack, Drawer, List, ListItem, ListItemText, useMediaQuery
} from '@mui/material';
import {
    Search as SearchIcon, Notifications as NotificationsIcon, Menu as MenuIcon
} from '@mui/icons-material';
import { styled, alpha, useTheme } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.15) },
    marginLeft: theme.spacing(2),
    width: '300px',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

function Navbar() {
    const user = useAuthStore(state => state.user);
    const { handleLogout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const toggleDrawer = (open) => () => setDrawerOpen(open);

    return (
        <AppBar position="sticky" sx={{
            background: '#0f0f0f',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: { xs: '100%', md: '100%' },
                mx: 'auto',
                px: { xs: 1.5, sm: 3 }
            }}>

                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 2 }}>
                    <Typography variant="h6" noWrap sx={{
                        fontWeight: 700,
                        letterSpacing: '1px',
                        color: '#fff',
                        '&:hover': { opacity: 0.9 }
                    }}>QuizApp</Typography>
                </Box>

                <Search>
                    <SearchIconWrapper><SearchIcon fontSize="small" /></SearchIconWrapper>
                    <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
                </Search>

                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            onClick={toggleDrawer(true)}
                            sx={{ml: 1, mr: 1.5, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                            <List>
                                {user ? (
                                    <>
                                        <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
                                            <ListItemText primary="Profil" sx={{ color: '#fff' }} />
                                        </ListItem>
                                        <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
                                            <ListItemText primary="Settings" sx={{ color: '#fff' }} />
                                        </ListItem>
                                        <ListItem button onClick={() => { toggleDrawer(false)(); handleLogout(); }}>
                                            <ListItemText primary="Logout" sx={{ color: '#ff5252' }} />
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
                                            <ListItemText primary="Login" sx={{ color: '#fff' }} />
                                        </ListItem>
                                        <ListItem button component={Link} to="/register" onClick={toggleDrawer(false)}>
                                            <ListItemText primary="Register" sx={{ color: '#3a7bd5' }} />
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <Stack direction="row" spacing={2} marginRight={6} alignItems="center">
                        {user ? (
                            <>
                                <IconButton color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                                    <Badge badgeContent={4} color="error"><NotificationsIcon sx={{ fontSize: 22 }} /></Badge>
                                </IconButton>
                                <Box
                                    onClick={handleMenuOpen}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        ml: 2,
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: '8px',
                                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            boxShadow: '0 0 8px rgba(58, 123, 213, 0.6)'
                                        },
                                        maxWidth: 180,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}
                                    aria-controls={open ? 'user-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 500,
                                            mr: 1,
                                            minWidth: 0, // important for truncation inside flex
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {user?.username || 'User'}
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: '#2d2d2d',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {user?.username?.[0]?.toUpperCase() || 'U'}
                                    </Box>
                                </Box>

                                <Menu
                                    id="user-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  // poniżej boxa
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}   // menu rozwija się od góry
                                    sx={{
                                        '& .MuiPaper-root': {
                                            backgroundColor: '#1a1a1a',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '8px',
                                            minWidth: '180px',
                                        }
                                    }}
                                >
                                    <MenuItem
                                        component={Link}
                                        to="/profile"
                                        onClick={handleMenuClose}
                                        sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}
                                    >
                                        Profil
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/settings"
                                        onClick={handleMenuClose}
                                        sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}
                                    >
                                        Settings
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            handleLogout();
                                        }}
                                        sx={{ color: '#ff5252', '&:hover': { backgroundColor: 'rgba(255, 82, 82, 0.08)' } }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" variant="outlined" sx={{
                                    color: '#fff', borderColor: 'rgba(255,255,255,0.2)', px: 3, borderRadius: '8px', textTransform: 'none', fontWeight: 500, letterSpacing: '0.5px',
                                    '&:hover': { borderColor: '#3a7bd5', backgroundColor: 'rgba(58, 123, 213, 0.1)' }
                                }}>Login</Button>
                            </>
                        )}
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;