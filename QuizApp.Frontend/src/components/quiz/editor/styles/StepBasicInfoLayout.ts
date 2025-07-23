import {Button, type ButtonProps, IconButton, type IconButtonProps, Switch, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";



export const SectionSubtitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: 8,
});

export const ThumbnailPreview = styled("img")({
    width: 250,
    height: "auto",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
});

export const ThumbnailUploadButton = styled(Button)<ButtonProps>(() => ({
    background: "linear-gradient(90deg, #3E3B44, #1D1B1B)",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    padding: "12px 24px",
    fontSize: 14,
    borderRadius: 8,
    "&:hover": {
        background: "linear-gradient(90deg, #2F2C35, #151313)",
    },
}));

export const ThumbnailIconButton = styled(IconButton)<IconButtonProps>(() => ({
    border: '2px solid #444',
    width: 40,
    height: 40,
    borderRadius: 10,
}));

export const OptionSwitcher = styled(Switch)({
    width: 42,
    height: 26,
    padding: 0,
    margin: "5px 12px 5px 0px",
    "& .MuiSwitch-switchBase": {
        padding: 1,
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#3a7bd5",
                opacity: 1,
                border: 0,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "#fff",
        width: 24,
        height: 24,
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
    },
    "& .MuiSwitch-track": {
        borderRadius: 13,
        backgroundColor: "#888",
        opacity: 1,
        transition: "background-color 0.2s",
    },
});