import type { LoginFormLayoutProps } from "@interfaces/forms";
import {
    AuthFormControl, AuthInputAdornment, AuthInputLabel, AuthOutlinedInput,
    AuthErrorBox, AuthFieldErrorText, AuthFooterText,
    AuthFormBox,
    AuthFormWrapper, AuthFooterLink,
    AuthPaper,
    AuthTitle, AuthSubmitButton
} from "@components/auth/LoginFormLayoutStyles";
import { PersonOutline, LockOutlined } from '@mui/icons-material';

export const LoginFormLayout = ({
    onSubmit,
    register,
    errors,
    isSubmitting,
    serverError
}: LoginFormLayoutProps) => {
    return (
        <AuthFormWrapper component="main" maxWidth="xs">
            <AuthPaper elevation={3}>
                <AuthFormBox component="form" onSubmit={onSubmit}>
                    <AuthTitle variant="h4" component="h1">
                        Login
                    </AuthTitle>

                    {serverError && <AuthErrorBox>{serverError}</AuthErrorBox>}

                    <AuthFormControl variant="outlined" error={!!errors.username}>
                        <AuthInputLabel htmlFor="username">Username</AuthInputLabel>
                        <AuthOutlinedInput
                            id="username"
                            label="Username"
                            type="text"
                            {...register("username")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <PersonOutline sx={{ color: errors.username ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.username && <AuthFieldErrorText>{errors.username.message}</AuthFieldErrorText>}
                    </AuthFormControl>
                    
                    <AuthFormControl variant="outlined" error={!!errors.password}>
                        <AuthInputLabel htmlFor="password">Password</AuthInputLabel>
                        <AuthOutlinedInput
                            id="password"
                            label="Password"
                            type="password"
                            {...register("password")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <LockOutlined sx={{ color: errors.password ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.password && <AuthFieldErrorText>{errors.password.message}</AuthFieldErrorText>}
                    </AuthFormControl>
                    
                    <AuthSubmitButton isSubmitting={isSubmitting} label={"Login"} />
                    
                    <AuthFooterText variant="body2">
                        Don't have an account? 
                        <AuthFooterLink to="/register"> Register here</AuthFooterLink>
                    </AuthFooterText>
                </AuthFormBox>
            </AuthPaper>
        </AuthFormWrapper>
    )
};