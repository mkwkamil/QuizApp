import { styled } from "@mui/material/styles";
import { Chip, Paper, Switch } from "@mui/material";

export const QuizFiltersWrapper = styled(Paper)({
    padding: 16,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
});

export const QuizFiltersToggle = styled(Switch)({
    width: 42,
    height: 26,
    padding: 0,
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

export const QuizFiltersChip = styled(Chip)<{ selected?: boolean }>(({ selected }) => ({
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: selected ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
    color: selected ? "#fff" : "#aaa",
    fontWeight: 600,
    fontSize: 14,
    padding: "8px 16px",
    width: "50%",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.15)",
        color: "#fff",
    },
}));