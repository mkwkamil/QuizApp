import { styled } from "@mui/material/styles";
import { Avatar, Box, Button, Paper, Stack } from "@mui/material";

export const UserStatsCardWrapper = styled(Paper)({
    padding: "35px 20px 25px 20px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    overflowY: "auto",
});

export const UserStatsHeader = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "0px 10px"
});

export const UserStatsAvatar = styled(Avatar)({
    width: 64,
    height: 64,
    boxShadow: "0 0 10px rgba(0,144,255,0.6)",
});

export const UserStatsChipRow = styled(Stack)({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    width: "90%",
    margin: "0 auto",
    paddingTop: 30
});

export const UserStatsChip = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "6px 8px",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#ccc",
    border: "1px solid rgba(255,255,255,0.15)",
    cursor: "pointer",
    flexGrow: 1,
    minWidth: 80,
});

export const UserStatsGrid = styled(Paper)({
    padding: 16,
    borderRadius: 12,
    background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    height: 180,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#ddd",
    fontStyle: "italic",
});

export const UserStatsLoginPrompt = styled(Paper)({
    padding: "30px 30px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    overflowY: "auto",
    textAlign: "center",
    color: "#fff",
});

export const UserStatsLoginButton = styled(Button)({
    border: "2px solid #3949ab",
    color: "#fff",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: "600",
    letterSpacing: "1px",
    "&:hover": {
        border: "2px solid #5c6bc0",
        background: "rgba(57, 73, 171, 0.1)",
        boxShadow: "0 0 15px rgba(92, 107, 192, 0.4)",
    },
});