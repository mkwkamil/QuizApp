import { styled } from "@mui/material/styles";
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress,
    Paper,
    type ContainerProps,
    type BoxProps,
    type TypographyProps,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl
} from "@mui/material";
import {Link} from "react-router-dom";

export const AuthFormWrapper = styled(Container)<ContainerProps>(() => ({
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    paddingTop: "32px",
    paddingBottom: "32px",
    marginTop: "-5vh"
}));

export const AuthPaper = styled(Paper)({
    padding: "32px",
    borderRadius: 12,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
});

export const AuthFormBox = styled(Box)<BoxProps>(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
}));

export const AuthTitle = styled(Typography)<TypographyProps>(() => ({
    marginBottom: "24px",
    fontWeight: 700,
    textAlign: "center",
    color: "#fff"
}));

export const AuthFormControl = styled(FormControl)(() => ({
    width: "100%",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
}));

export const AuthInputLabel = styled(InputLabel)(() => ({
    color: "#aaa",
    "&.Mui-focused": {
        color: "#ccc",
    },
    "&.Mui-error": {
        color: "#ff6b6b",
    },
}));

export const AuthOutlinedInput = styled(OutlinedInput)(() => ({
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    color: "#fff",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#444",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#666",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#888",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ff6b6b",
    },
}));

export const AuthInputAdornment = styled(InputAdornment)(() => ({
    color: "#aaa",
}));

export const AuthFooterText = styled(Typography)({
    marginTop: "16px",
    textAlign: "center",
    color: "#ccc"
});

export const AuthFooterLink = styled(Link)({
    color: "#90caf9",
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": {
        textDecoration: "underline",
    },
});

export const AuthErrorBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#f8d7da",
    color: "#721c24"
});

export const AuthFieldErrorText = styled(Typography)({
    marginTop: "8px",
    fontSize: "0.75rem",
    color: "#f44336"
});

export const AuthSubmitButton = ({ isSubmitting, label }: { isSubmitting: boolean; label: string }) => (
    <AuthStyledLoginButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
        {isSubmitting ? (
            <>
                <CircularProgress
                    size={22}
                    thickness={5}
                    sx={{
                        color: "rgba(255,255,255,0.8)",
                        marginRight: "16px",
                        "& circle": { strokeLinecap: "round" }
                    }}
                />
                Authenticating...
            </>
        ) : (
            <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
        )}
    </AuthStyledLoginButton>
);

const AuthStyledLoginButton = styled(Button)({
    marginTop: "24px",
    padding: "14px",
    borderRadius: "8px",
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "none",
    fontSize: "1rem",
    color: "#fff",
    background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    boxShadow: "0 4px 15px rgba(11, 35, 47, 0.4)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&:before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)"
    },
    "&:hover": {
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 60%, #2c5364 100%)",
        boxShadow: "0 6px 20px rgba(11, 35, 47, 0.6)",
        transform: "translateY(-1px)"
    },
    "&:active": {
        transform: "translateY(0)"
    },
    "&.Mui-disabled": {
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        opacity: 0.7
    }
});