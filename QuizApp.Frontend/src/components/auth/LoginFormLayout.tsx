import type {LoginFormLayoutProps} from "@interfaces/forms.ts";
import {
    AuthFormControl, AuthInputAdornment, AuthInputLabel, AuthOutlinedInput,
    ErrorBox, FieldErrorText, LoginFooterText,
    LoginFormBox,
    LoginFormWrapper, LoginLink,
    LoginPaper,
    LoginTitle, SubmitButton
} from "@components/auth/LoginFormLayoutStyles.tsx";
import { PersonOutline, LockOutlined } from '@mui/icons-material';

export const LoginFormLayout = ({
    onSubmit,
    register,
    errors,
    isSubmitting,
    serverError
}: LoginFormLayoutProps) => {
    return (
        <LoginFormWrapper component="main" maxWidth="xs">
            <LoginPaper elevation={3}>
                <LoginFormBox component="form" onSubmit={onSubmit}>
                    <LoginTitle variant="h4" component="h1">
                        Login
                    </LoginTitle>

                    {serverError && <ErrorBox>{serverError}</ErrorBox>}

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
                        {errors.username && <FieldErrorText>{errors.username.message}</FieldErrorText>}
                    </AuthFormControl>
                    
                    <AuthFormControl variant="outlined" error={!!errors.password}>
                        <AuthInputLabel htmlFor="password">Password</AuthInputLabel>
                        <AuthOutlinedInput
                            id="password"
                            label="Password"
                            type="text"
                            {...register("password")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <LockOutlined sx={{ color: errors.password ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.password && <FieldErrorText>{errors.password.message}</FieldErrorText>}
                    </AuthFormControl>
                    
                    <SubmitButton isSubmitting={isSubmitting} label={"Login"} />
                    
                    <LoginFooterText variant="body2">
                        Don't have an account? 
                        <LoginLink to="/register"> Register here</LoginLink>
                    </LoginFooterText>
                </LoginFormBox>
            </LoginPaper>
        </LoginFormWrapper>
    )
};