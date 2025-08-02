import { styled} from "@mui/material/styles";
import {Avatar, Box, Button, IconButton, Tab} from "@mui/material";
import {TabList} from "@mui/lab";

export const FollowUserItemWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    width: "100%",
});

export const CloseIconButton = styled(IconButton)({
    position: "absolute",
    top: 10,
    right: 10,
    color: "#aaa",
    "&:hover": {
        background: "transparent",
        color: "#fff",
    }
});

export const UserInfo = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 16,
});

export const StyledAvatar = styled(Avatar)({
    width: 48,
    height: 48,
});

export const NameColumn = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 2,
});

export const ActionButton = styled(Button)({
    minWidth: 100,
    borderRadius: 12,
    fontWeight: 600,
    textTransform: "none",
    backgroundColor: "rgba(255,255,255,0.04)",
    color: "#fff",
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.1)",
    },
});

export const FollowTabList = styled(TabList)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    ".MuiTabs-indicator": {
        backgroundColor: "white",
    },
});

export const FollowTab = styled(Tab)({
    flex: 1,
    fontWeight: 600,
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    "&.Mui-selected": {
        color: "white",
    },
});