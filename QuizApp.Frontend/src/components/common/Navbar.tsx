import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Typography, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuthStore } from "@store/auth/authStore";
import {
    NavbarWrapper,
    NavbarInner,
    NavbarLogo,
    SearchBar,
    SearchIconWrapper,
    StyledInputBase,
    ActionStack,
    UserBox,
    UserInitial,
    NotificationButton
} from "@components/layouts/NavbarLayout";
import { useLogout } from "@hooks/auth/useLogout";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const { mutate: handleLogout } = useLogout();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <NavbarWrapper>
            <NavbarInner>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <NavbarLogo>QuizApp</NavbarLogo>
                </Link>

                <SearchBar>
                    <SearchIconWrapper />
                    <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                </SearchBar>

                <ActionStack>
                    {user && (
                        <NotificationButton>
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon sx={{ fontSize: 22 }} />
                            </Badge>
                        </NotificationButton>
                    )}

                    {user ? (
                        <>
                            <UserBox
                                onClick={handleMenuOpen}
                                aria-controls={open ? "user-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <Typography variant="body2">{user.username}</Typography>
                                <UserInitial>{user.username[0].toUpperCase()}</UserInitial>
                            </UserBox>

                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                sx={{
                                    "& .MuiPaper-root": {
                                        backgroundColor: "#1a1a1a",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "8px",
                                        minWidth: "180px",
                                        color: "#ccc",
                                    },
                                }}
                            >
                                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
                                    Settings
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        handleLogout();
                                    }}
                                    sx={{ color: "#ff5252" }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Typography
                            component={Link}
                            to="/login"
                            sx={{
                                textDecoration: "none",
                                color: "#fff",
                                border: "1px solid rgba(255,255,255,0.2)",
                                padding: "6px 16px",
                                borderRadius: "8px",
                                fontWeight: 500,
                                letterSpacing: "0.5px",
                                "&:hover": {
                                    borderColor: "#3a7bd5",
                                    backgroundColor: "rgba(58, 123, 213, 0.1)",
                                },
                            }}
                        >
                            Login
                        </Typography>
                    )}
                </ActionStack>
            </NavbarInner>
        </NavbarWrapper>
    );
};

export default Navbar;