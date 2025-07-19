import { styled, alpha } from "@mui/material/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    InputBase,
    Stack,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";

export const NavbarWrapper = styled(AppBar)({
    background: "#0f0f0f",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
});

export const NavbarInner = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    marginInline: "auto",
    paddingInline: "24px",
});

export const NavbarLogo = styled(Typography)({
    fontWeight: 700,
    fontSize: "21px",
    letterSpacing: "1px",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
        opacity: 0.9,
    },
});

export const SearchBar = styled("div")({
    position: "relative",
    borderRadius: "20px",
    backgroundColor: alpha("#fff", 0.1),
    "&:hover": { backgroundColor: alpha("#fff", 0.15) },
    marginLeft: "16px",
    width: "300px",
});

export const SearchIconWrapper = styled("div")({
    paddingInline: "16px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const StyledInputBase = styled(InputBase)({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: "8px 8px 8px 0",
        paddingLeft: "calc(1em + 32px)",
        width: "100%",
    },
});

export const ActionStack = styled(Stack)({
    flexDirection: "row",
    gap: "16px",
    marginRight: "48px",
    alignItems: "center",
});

export const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    paddingInline: "8px",
    paddingBlock: "4px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 8px rgba(58, 123, 213, 0.6)",
    },
    maxWidth: 180,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
});

export const UserInitial = styled(Box)({
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#2d2d2d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    flexShrink: 0,
    marginLeft: 8,
});

export const DropdownMenu = styled(Menu)({
    "& .MuiPaper-root": {
        backgroundColor: "#1a1a1a",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "8px",
        minWidth: "180px",
    },
});

export const DropdownItem = styled(MenuItem)({
    color: "#fff",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
});

export const LogoutItem = styled(MenuItem)({
    color: "#ff5252",
    ":hover": {
        backgroundColor: "rgba(255, 82, 82, 0.08)",
    },
});

export const NotificationButton = styled(IconButton)({
    color: "#ccc",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
});